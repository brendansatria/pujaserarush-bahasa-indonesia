import { useState, useEffect, useMemo, useCallback } from "react";
import { GameState, Tenant, Customer } from "@/types/game";
import { menuItems, customerTypes, threats } from "@/data/gameData";
import { ScoreBoard } from "@/components/ScoreBoard";
import { PreparingPhase } from "@/components/PreparingPhase";
import { ReferencePhase } from "@/components/ReferencePhase";
import { ExecutionPhase } from "@/components/ExecutionPhase";
import { SummaryPhase } from "@/components/SummaryPhase";
import { VictoryPhase } from "@/components/VictoryPhase";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { showError, showSuccess } from "@/utils/toast";
import { PreExecutionFeedbackModal } from "@/components/PreExecutionFeedbackModal";

// Helper function to shuffle an array
const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const TOTAL_ROUNDS = 4;

const roundTagOptions: Record<number, string[][]> = {
  1: [
    ["Savory", "Cold"],
    ["Cold", "Trendy"],
    ["Trendy", "Savory"],
  ],
  2: [
    ["Sweet", "Cheap"],
    ["Cheap", "Hot"],
    ["Hot", "Sweet"],
  ],
  3: [
    ["Spicy", "Healthy"],
    ["Healthy", "Warm"],
    ["Warm", "Spicy"],
  ],
  4: [
    ["Fresh", "Light"],
    ["Light", "Traditional"],
    ["Traditional", "Fresh"],
  ],
};

const valueMenuItems = ["Nasi Goreng", "Es Teh Manis", "Sate Ayam", "Ayam Geprek", "Martabak Manis"];

const PujaseraRush = () => {
  const [gameState, setGameState] = useState<GameState>({
    round: 1,
    profit: 0,
    risk: 0,
    satisfaction: 0,
    phase: "preparing",
    selectedTenants: [],
    currentCustomerIndex: 0,
    customers: [],
    timer: 60,
    trendingTags: [],
    valueItem: "",
    currentThreat: null,
    customersServed: 0,
    availableTenants: [],
  });

  const shuffledValueItems = useMemo(() => shuffle(valueMenuItems), []);

  const [roundStartStats, setRoundStartStats] = useState({ profit: 0, risk: 0, satisfaction: 0 });
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const generateRound = useCallback((roundNumber: number) => {
    const tagOptions = roundTagOptions[roundNumber] || roundTagOptions[1];
    const trendingTags = shuffle(tagOptions)[0];
    const valueItem = shuffledValueItems[roundNumber - 1];
    const currentThreat = shuffle(threats)[0];

    const availableTenants: Tenant[] = [];
    const shuffledMenus = shuffle(menuItems);
    for (let i = 0; i < 4; i++) {
      const tenantItems = shuffledMenus.slice(i * 2, i * 2 + 2);
      if (tenantItems.length < 2) continue;
      availableTenants.push({
        name: `Warung ${String.fromCharCode(65 + i)}`,
        items: tenantItems,
      });
    }

    setGameState(prev => ({
      ...prev,
      phase: "preparing",
      trendingTags,
      valueItem,
      currentThreat,
      availableTenants,
      selectedTenants: [],
      customers: [],
      currentCustomerIndex: 0,
      customersServed: 0,
    }));
  }, [shuffledValueItems]);

  useEffect(() => {
    if (shuffledValueItems.length > 0) {
      generateRound(gameState.round);
    }
  }, [gameState.round, generateRound, shuffledValueItems]);

  // Timer effect for execution phase
  useEffect(() => {
    if (gameState.phase !== "execution" || gameState.timer <= 0 || gameState.currentCustomerIndex >= gameState.customers.length) {
      if (gameState.phase === "execution") {
        setGameState(prev => ({ ...prev, phase: "summary" }));
      }
      return;
    }
    const interval = setInterval(() => {
      setGameState(prev => ({ ...prev, timer: prev.timer - 1 }));
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState.phase, gameState.timer, gameState.customers.length, gameState.currentCustomerIndex]);


  const handleSelectTenant = (tenant: Tenant) => {
    setGameState(prev => {
      const isSelected = prev.selectedTenants.some(t => t.name === tenant.name);
      if (isSelected) {
        return {
          ...prev,
          selectedTenants: prev.selectedTenants.filter(t => t.name !== tenant.name),
        };
      }
      if (prev.selectedTenants.length < 2) {
        return {
          ...prev,
          selectedTenants: [...prev.selectedTenants, tenant],
        };
      }
      return prev;
    });
  };

  const handleOpenFeedbackModal = () => {
    setIsFeedbackModalOpen(true);
  };

  const handleProceedToReference = () => {
    setIsFeedbackModalOpen(false);
    setGameState(prev => ({
      ...prev,
      phase: "reference",
    }));
  };

  const handleStartExecution = () => {
    const customers: Customer[] = [];
    for (let i = 0; i < 10; i++) {
      const customerType = shuffle(customerTypes)[0];
      customers.push({
        name: `${customerType.name} #${i + 1}`,
        preferences: customerType.preferences,
      });
    }

    setRoundStartStats({
        profit: gameState.profit,
        risk: gameState.risk,
        satisfaction: gameState.satisfaction,
    });

    setGameState(prev => ({
      ...prev,
      customers,
      phase: "execution",
      timer: 60,
    }));
  };

  const matchAvailability = useMemo(() => {
    const { customers, currentCustomerIndex, selectedTenants } = gameState;
    const customer = customers[currentCustomerIndex];
    if (!customer) return { best: false, partial: false };

    const allMenuItems = selectedTenants.flatMap((t) => t.items);
    let isBestMatchAvailable = false;
    let isPartialMatchAvailable = false;

    for (const item of allMenuItems) {
      const matchCount = item.tags.filter(tag => customer.preferences.includes(tag)).length;
      if (matchCount >= 2) isBestMatchAvailable = true;
      if (matchCount === 1) isPartialMatchAvailable = true;
    }
    return { best: isBestMatchAvailable, partial: isPartialMatchAvailable };
  }, [gameState.customers, gameState.currentCustomerIndex, gameState.selectedTenants]);

  const advanceToNextCustomer = (prevState: GameState): Partial<GameState> => {
    const nextCustomerIndex = prevState.currentCustomerIndex + 1;
    const isRoundOver = nextCustomerIndex >= prevState.customers.length;
    return {
      customersServed: prevState.customersServed + 1,
      currentCustomerIndex: nextCustomerIndex,
      phase: isRoundOver ? "summary" : prevState.phase,
    };
  };

  const handleServeBestMatch = () => {
    setGameState(prev => {
      if (matchAvailability.best) {
        showSuccess("Best match served! +5 Profit, +5 Satisfaction");
        return {
          ...prev,
          profit: prev.profit + 5,
          satisfaction: prev.satisfaction + 5,
          ...advanceToNextCustomer(prev),
        };
      } else {
        showError("Best match not available! -1 Profit, -3 Sat, +2 Risk");
        return {
          ...prev,
          profit: Math.max(0, prev.profit - 1),
          satisfaction: Math.max(0, prev.satisfaction - 3),
          risk: prev.risk + 2,
          ...advanceToNextCustomer(prev),
        };
      }
    });
  };

  const handleServePartialMatch = () => {
    setGameState(prev => {
      if (matchAvailability.partial) {
        showSuccess("Partial match served! +2 Profit, +2 Satisfaction");
        return {
          ...prev,
          profit: prev.profit + 2,
          satisfaction: prev.satisfaction + 2,
          ...advanceToNextCustomer(prev),
        };
      } else {
        showError("Partial match not available! -2 Satisfaction, +1 Risk");
        return {
          ...prev,
          satisfaction: Math.max(0, prev.satisfaction - 2),
          risk: prev.risk + 1,
          ...advanceToNextCustomer(prev),
        };
      }
    });
  };

  const handleApologize = () => {
    setGameState(prev => ({
      ...prev,
      risk: prev.risk + 1,
      satisfaction: prev.satisfaction + 1,
      ...advanceToNextCustomer(prev),
    }));
  };

  const handleKickCustomer = () => {
    setGameState(prev => ({
      ...prev,
      profit: Math.max(0, prev.profit - 2),
      satisfaction: Math.max(0, prev.satisfaction - 2),
      risk: prev.risk + 1,
      ...advanceToNextCustomer(prev),
    }));
  };

  const handleNextRound = () => {
    setGameState(prev => ({
        ...prev,
        round: prev.round + 1,
    }));
  };

  const handleFinishGame = () => {
    setGameState(prev => ({
        ...prev,
        phase: "victory",
    }));
  };

  const renderPhase = () => {
    switch (gameState.phase) {
      case "preparing":
        return (
          <PreparingPhase
            round={gameState.round}
            trendingTags={gameState.trendingTags}
            valueItem={gameState.valueItem}
            threat={gameState.currentThreat}
            availableTenants={gameState.availableTenants}
            selectedTenants={gameState.selectedTenants}
            onSelectTenant={handleSelectTenant}
            onStartExecution={handleOpenFeedbackModal}
          />
        );
      case "reference":
        return (
          <ReferencePhase
            selectedTenants={gameState.selectedTenants}
            onStartExecution={handleStartExecution}
          />
        );
      case "execution":
        return (
          <ExecutionPhase
            gameState={gameState}
            onServeBestMatch={handleServeBestMatch}
            onServePartialMatch={handleServePartialMatch}
            onApologize={handleApologize}
            onKickCustomer={handleKickCustomer}
          />
        );
      case "summary":
        return (
          <SummaryPhase
            gameState={gameState}
            roundStartStats={roundStartStats}
            onNextRound={handleNextRound}
            onFinishGame={handleFinishGame}
            totalRounds={TOTAL_ROUNDS}
          />
        );
      case "victory":
        return <VictoryPhase gameState={gameState} />;
      default:
        return <div className="text-center p-8">Loading...</div>;
    }
  };

  return (
    <div className="container mx-auto p-2 sm:p-4 min-h-screen bg-orange-50">
      <header className="text-center my-4 sm:my-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-red-600">🍜 Pujasera Rush 🍜</h1>
        <p className="text-muted-foreground">Manage your Indonesian food court to success!</p>
      </header>
      <main className="space-y-4 sm:space-y-6">
        <ScoreBoard
          profit={gameState.profit}
          risk={gameState.risk}
          satisfaction={gameState.satisfaction}
        />
        <div className="bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg border">
          {renderPhase()}
        </div>
      </main>
      <PreExecutionFeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={handleProceedToReference}
        threat={gameState.currentThreat}
        trendingTags={gameState.trendingTags}
        selectedTenants={gameState.selectedTenants}
      />
      <MadeWithDyad />
    </div>
  );
};

export default PujaseraRush;