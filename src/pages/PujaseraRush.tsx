import { useState, useEffect, useMemo } from "react";
import { GameState, Tenant, Customer, MenuItem } from "@/types/game";
import { menuItems, customerTypes, threats, allTags, indonesianNames } from "@/data/gameData";
import { ScoreBoard } from "@/components/ScoreBoard";
import { PreparingPhase } from "@/components/PreparingPhase";
import { ReferencePhase } from "@/components/ReferencePhase";
import { ExecutionPhase } from "@/components/ExecutionPhase";
import { SummaryPhase } from "@/components/SummaryPhase";
import { VictoryPhase } from "@/components/VictoryPhase";
import { showError, showSuccess } from "@/utils/toast";
import { PreExecutionFeedbackModal } from "@/components/PreExecutionFeedbackModal";

// Helper function to shuffle an array
const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

// Helper function to shuffle customers while avoiding consecutive identical preferences
const deDupeShuffle = (customers: Customer[]): Customer[] => {
  if (!customers || customers.length === 0) return [];

  const result: Customer[] = [];
  const remaining = [...customers];

  // Pick a random first customer
  let firstIndex = Math.floor(Math.random() * remaining.length);
  result.push(remaining.splice(firstIndex, 1)[0]);

  while (remaining.length > 0) {
    const lastPrefs = result[result.length - 1].preferences.slice().sort().join(',');
    
    // Find all candidates that don't match the last preference
    const candidates = remaining.map((c, i) => ({ customer: c, index: i }))
                                .filter(item => item.customer.preferences.slice().sort().join(',') !== lastPrefs);

    if (candidates.length > 0) {
      // Pick a random candidate
      const randomCandidate = candidates[Math.floor(Math.random() * candidates.length)];
      result.push(remaining.splice(randomCandidate.index, 1)[0]);
    } else {
      // If no candidates, it means all remaining customers have the same preference as the last one.
      // This is a forced repeat. Just pick the first one from remaining.
      result.push(remaining.splice(0, 1)[0]);
    }
  }
  return result;
};

const TOTAL_ROUNDS = 4;

const roundTagOptions: Record<number, string[][]> = {
  1: [["Gurih", "Dingin"], ["Dingin", "Kekinian"], ["Kekinian", "Gurih"]],
  2: [["Manis", "Murah"], ["Murah", "Panas"], ["Panas", "Manis"]],
  3: [["Pedas", "Sehat"], ["Sehat", "Hangat"], ["Hangat", "Pedas"]],
  4: [["Segar", "Ringan"], ["Ringan", "Tradisional"], ["Tradisional", "Segar"]],
};

const valueMenuItems = ["Nasi Goreng", "Es Teh Manis", "Sate Ayam", "Ayam Geprek", "Martabak Manis"];

const baseMenu = menuItems.filter(item => item.name === "Nasi Goreng" || item.name === "Es Teh Manis");

const generateCustomersForRound = (
  round: number,
  trendingTags: string[],
): { customers: Customer[]; lineCutters: string[] } => {
  const newCustomers: Customer[] = [];
  const shuffledNameObjects = shuffle(indonesianNames);

  // Generate 5 customers with trending tags
  for (let i = 0; i < 5; i++) {
    const customerType = shuffle(customerTypes)[0];
    const primaryTag = shuffle(trendingTags)[0];
    const otherTags = allTags.filter(tag => !trendingTags.includes(tag));
    const secondaryTag = shuffle(otherTags)[0];
    const preferences = shuffle([primaryTag, secondaryTag]);
    const nameObject = shuffledNameObjects[i];
    newCustomers.push({ name: `${nameObject.name} - ${customerType.name}`, preferences, gender: nameObject.gender });
  }

  // Generate 5 other customers
  for (let i = 0; i < 5; i++) {
    const customerType = shuffle(customerTypes)[0];
    const nameObject = shuffledNameObjects[i + 5];
    newCustomers.push({ name: `${nameObject.name} - ${customerType.name}`, preferences: shuffle(allTags).slice(0, 2), gender: nameObject.gender });
  }

  let lineCutters: string[] = [];
  if (round > 1) {
    const lineCutterCount = round - 1; // R2: 1, R3: 2, R4: 3
    const trendingCustomers = newCustomers.filter(c => c.preferences.some(p => trendingTags.includes(p)));
    const selectedLineCutters = shuffle(trendingCustomers).slice(0, lineCutterCount);
    
    selectedLineCutters.forEach(cutter => {
      const customerIndex = newCustomers.findIndex(c => c.name === cutter.name);
      if (customerIndex !== -1) {
        newCustomers[customerIndex].isLineCutter = true;
        lineCutters.push(newCustomers[customerIndex].name);
      }
    });
  }

  return { customers: deDupeShuffle(newCustomers), lineCutters };
};

const PujaseraRush = () => {
  const [gameState, setGameState] = useState<GameState>({
    round: 1,
    profit: 0,
    risk: 50,
    satisfaction: 0,
    phase: "preparing",
    selectedTenants: [],
    currentCustomerIndex: 0,
    customers: [],
    timer: 60,
    trendingTags: [],
    valueItems: [],
    currentThreat: null,
    customersServed: 0,
    availableTenants: [],
    playerMenu: baseMenu,
    lineCutters: [],
    usedThreats: [],
    missedOpportunities: 0,
    wrongDecisions: 0,
  });

  const [roundStartStats, setRoundStartStats] = useState({ profit: 0, risk: 0, satisfaction: 0 });
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [strategicRisk, setStrategicRisk] = useState<{ total: number; breakdown: { item: string; reason: string; value: number }[] } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [gameState.phase]);

  useEffect(() => {
    const { round, playerMenu, usedThreats: usedThreatNames } = gameState;

    const tagOptions = roundTagOptions[round] || roundTagOptions[1];
    const trendingTags = shuffle(tagOptions)[0];
    const valueItemCount = round < 4 ? 2 : 1;
    const valueItems = shuffle(valueMenuItems).slice(0, valueItemCount);
    
    const availableThreats = threats.filter(t => !usedThreatNames.includes(t.name));
    const currentThreat = shuffle(availableThreats.length > 0 ? availableThreats : threats)[0];

    const { customers, lineCutters } = generateCustomersForRound(round, trendingTags);

    const availableMenuItems = shuffle(menuItems.filter(item => !playerMenu.some(playerItem => playerItem.name === item.name)));
    const availableTenants: Tenant[] = [];
    const tenantNamePrefix = round === 1 ? "Warung" : "Kios";
    for (let i = 0; i < 4; i++) {
      availableTenants.push({ name: `${tenantNamePrefix} ${String.fromCharCode(65 + i)}`, items: availableMenuItems.slice(i, i + 1) });
    }

    setGameState(prev => ({
      ...prev,
      phase: "preparing",
      trendingTags,
      valueItems,
      currentThreat,
      availableTenants,
      selectedTenants: [],
      customers,
      lineCutters,
      currentCustomerIndex: 0,
      customersServed: 0,
      usedThreats: [...new Set([...prev.usedThreats, currentThreat.name])],
    }));
  }, [gameState.round]);

  useEffect(() => {
    if (gameState.phase !== "execution" || gameState.timer <= 0 || gameState.currentCustomerIndex >= gameState.customers.length) {
      if (gameState.phase === "execution") setGameState(prev => ({ ...prev, phase: "summary" }));
      return;
    }
    const interval = setInterval(() => setGameState(prev => ({ ...prev, timer: prev.timer - 1 })), 1000);
    return () => clearInterval(interval);
  }, [gameState.phase, gameState.timer, gameState.customers.length, gameState.currentCustomerIndex]);

  const handleSelectTenant = (tenant: Tenant) => {
    setGameState(prev => {
      const isSelected = prev.selectedTenants.some(t => t.name === tenant.name);
      if (isSelected) return { ...prev, selectedTenants: prev.selectedTenants.filter(t => t.name !== tenant.name) };
      if (prev.selectedTenants.length < 2) return { ...prev, selectedTenants: [...prev.selectedTenants, tenant] };
      return prev;
    });
  };

  const handleOpenFeedbackModal = () => {
    const { selectedTenants, trendingTags, valueItems, currentThreat, playerMenu } = gameState;
    let totalRiskChange = 0;
    const breakdown: { item: string; reason: string; value: number }[] = [];
    const allSelectedItems = selectedTenants.flatMap(t => t.items);

    allSelectedItems.forEach(item => {
      if (valueItems.includes(item.name)) {
        totalRiskChange -= 5;
        breakdown.push({ item: item.name, reason: "High Value Menu Bonus", value: -5 });
      }
      if (item.tags.some(tag => trendingTags.includes(tag))) {
        totalRiskChange -= 2;
        breakdown.push({ item: item.name, reason: "Trending Tag Bonus", value: -2 });
      }
      if (currentThreat && item.tags.some(tag => currentThreat.eliminates.includes(tag))) {
        totalRiskChange += 10;
        breakdown.push({ item: item.name, reason: "Threat Impact", value: 10 });
      }
    });

    playerMenu.forEach(item => {
      if (valueItems.includes(item.name)) {
        totalRiskChange -= 2;
        breakdown.push({ item: item.name, reason: "Existing High Value Menu", value: -2 });
      }
    });

    setStrategicRisk({ total: totalRiskChange, breakdown });
    setGameState(prev => ({ ...prev, risk: prev.risk + totalRiskChange }));
    setIsFeedbackModalOpen(true);
  };

  const handleProceedToReference = () => {
    setIsFeedbackModalOpen(false);
    setGameState(prev => ({ ...prev, phase: "reference" }));
  };

  const handleStartExecution = () => {
    setRoundStartStats({ profit: gameState.profit, risk: gameState.risk, satisfaction: gameState.satisfaction });
    setGameState(prev => ({ ...prev, phase: "execution", timer: 60 }));
  };

  const matchAvailability = useMemo(() => {
    const { customers, currentCustomerIndex, selectedTenants, playerMenu } = gameState;
    const customer = customers[currentCustomerIndex];
    if (!customer) return { best: false, partial: false };
    const allMenuItems = [...playerMenu, ...selectedTenants.flatMap((t) => t.items)];
    let isBestMatchAvailable = false, isPartialMatchAvailable = false;
    for (const item of allMenuItems) {
      const matchCount = item.tags.filter(tag => customer.preferences.includes(tag)).length;
      if (matchCount >= 2) isBestMatchAvailable = true;
      if (matchCount === 1) isPartialMatchAvailable = true;
    }
    return { best: isBestMatchAvailable, partial: isPartialMatchAvailable };
  }, [gameState.customers, gameState.currentCustomerIndex, gameState.selectedTenants, gameState.playerMenu]);

  const advanceToNextCustomer = (prevState: GameState): Partial<GameState> => {
    const nextCustomerIndex = prevState.currentCustomerIndex + 1;
    return {
      customersServed: prevState.customersServed + 1,
      currentCustomerIndex: nextCustomerIndex,
      phase: nextCustomerIndex >= prevState.customers.length ? "summary" : prevState.phase,
    };
  };

  const handleServeBestMatch = () => {
    setGameState(prev => {
      const customer = prev.customers[prev.currentCustomerIndex];
      if (customer?.isLineCutter) {
        showError("Melayani Penyerobot! +2 Profit, -5 Sat, +5 Risk");
        return { ...prev, profit: prev.profit + 2, satisfaction: Math.max(0, prev.satisfaction - 5), risk: prev.risk + 5, ...advanceToNextCustomer(prev) };
      }
      if (matchAvailability.best) {
        showSuccess("Perfect Match! +10 Profit, +10 Satisfaction");
        return { ...prev, profit: prev.profit + 10, satisfaction: prev.satisfaction + 10, ...advanceToNextCustomer(prev) };
      }
      showError("Tidak ada Perfect Match! -5 Satisfaction, +5 Risk");
      return { ...prev, satisfaction: Math.max(0, prev.satisfaction - 5), risk: prev.risk + 5, wrongDecisions: prev.wrongDecisions + 1, ...advanceToNextCustomer(prev) };
    });
  };

  const handleServePartialMatch = () => {
    setGameState(prev => {
      const customer = prev.customers[prev.currentCustomerIndex];
      let missedOpp = prev.missedOpportunities;
      if (customer?.isLineCutter) {
        showError("Melayani Penyerobot! +2 Profit, -5 Sat, +5 Risk");
        return { ...prev, profit: prev.profit + 2, satisfaction: Math.max(0, prev.satisfaction - 5), risk: prev.risk + 5, ...advanceToNextCustomer(prev) };
      }
      if (matchAvailability.partial) {
        if (matchAvailability.best) {
          missedOpp++;
          showError("Keliru! Ada Menu yang lebih cocok. +2 Profit, +2 Sat");
        } else {
          showSuccess("Saran diterima! +2 Profit, +2 Satisfaction");
        }
        return { ...prev, profit: prev.profit + 2, satisfaction: prev.satisfaction + 2, missedOpportunities: missedOpp, ...advanceToNextCustomer(prev) };
      }
      showError("Tidak ada Menu yang Mirip! -2 Satisfaction, +1 Risk");
      return { ...prev, satisfaction: Math.max(0, prev.satisfaction - 2), risk: prev.risk + 1, wrongDecisions: prev.wrongDecisions + 1, ...advanceToNextCustomer(prev) };
    });
  };

  const handleApologize = () => {
    setGameState(prev => {
      const customer = prev.customers[prev.currentCustomerIndex];
      let missedOpp = prev.missedOpportunities;

      if (customer?.isLineCutter) {
        showError("Melayani Penyerobot! +2 Profit, -5 Sat, +5 Risk");
        return { ...prev, profit: prev.profit + 2, satisfaction: Math.max(0, prev.satisfaction - 5), risk: prev.risk + 5, ...advanceToNextCustomer(prev) };
      }

      if (matchAvailability.best || matchAvailability.partial) {
        missedOpp++;
        showError("Missed! Ada Menu yang lebih cocok. +1 Sat, +1 Risk");
      } else {
        showSuccess("Permohonan maaf diterima! +1 Sat, +1 Risk");
      }

      return { ...prev, risk: prev.risk + 1, satisfaction: prev.satisfaction + 1, missedOpportunities: missedOpp, ...advanceToNextCustomer(prev) };
    });
  };

  const handleKickCustomer = () => {
    setGameState(prev => {
      const customer = prev.customers[prev.currentCustomerIndex];
      if (customer?.isLineCutter) {
        showSuccess("Keputusan Bagus! Penyerobot pergi. +5 Satisfaction, +1 Risk");
        return {
          ...prev,
          satisfaction: prev.satisfaction + 5,
          risk: prev.risk + 1,
          ...advanceToNextCustomer(prev),
        };
      } else {
        showError("Mengusir Pelanggan Tidak Bersalah! -5 Profit, -5 Sat, +5 Risk");
        return {
          ...prev,
          profit: Math.max(0, prev.profit - 5),
          satisfaction: Math.max(0, prev.satisfaction - 5),
          risk: prev.risk + 5,
          wrongDecisions: prev.wrongDecisions + 1,
          ...advanceToNextCustomer(prev),
        };
      }
    });
  };

  const handleNextRound = () => {
    setGameState(prev => ({ ...prev, round: prev.round + 1, playerMenu: [...prev.playerMenu, ...prev.selectedTenants.flatMap(t => t.items)], missedOpportunities: 0, wrongDecisions: 0 }));
  };

  const handleFinishGame = () => setGameState(prev => ({ ...prev, phase: "victory" }));

  const renderPhase = () => {
    switch (gameState.phase) {
      case "preparing": return <PreparingPhase round={gameState.round} trendingTags={gameState.trendingTags} valueItems={gameState.valueItems} threat={gameState.currentThreat} availableTenants={gameState.availableTenants} selectedTenants={gameState.selectedTenants} onSelectTenant={handleSelectTenant} onStartExecution={handleOpenFeedbackModal} playerMenu={gameState.playerMenu} lineCutters={gameState.lineCutters} />;
      case "reference": return <ReferencePhase onStartExecution={handleStartExecution} />;
      case "execution": return <ExecutionPhase gameState={gameState} onServeBestMatch={handleServeBestMatch} onServePartialMatch={handleServePartialMatch} onApologize={handleApologize} onKickCustomer={handleKickCustomer} />;
      case "summary": return <SummaryPhase gameState={gameState} roundStartStats={roundStartStats} onNextRound={handleNextRound} onFinishGame={handleFinishGame} totalRounds={TOTAL_ROUNDS} />;
      case "victory": return <VictoryPhase gameState={gameState} />;
      default: return <div className="text-center p-8">Loading...</div>;
    }
  };

  return (
    <div className="container mx-auto p-2 sm:p-4 min-h-screen">
      <main className="space-y-4 sm:space-y-6">
        {gameState.phase !== "reference" && (
          <ScoreBoard profit={gameState.profit} risk={gameState.risk} satisfaction={gameState.satisfaction} />
        )}
        <div className="bg-card/60 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg border">
          {renderPhase()}
        </div>
      </main>
      <PreExecutionFeedbackModal isOpen={isFeedbackModalOpen} onClose={handleProceedToReference} threat={gameState.currentThreat} trendingTags={gameState.trendingTags} selectedTenants={gameState.selectedTenants} strategicRisk={strategicRisk} />
    </div>
  );
};

export default PujaseraRush;