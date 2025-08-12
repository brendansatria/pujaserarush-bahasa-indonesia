import { useState, useEffect, useMemo } from "react";
import { GameState, Tenant, Customer } from "@/types/game";
import { menuItems, customerTypes, allTags, threats } from "@/data/gameData";
import { ScoreBoard } from "@/components/ScoreBoard";
import { PreparingPhase } from "@/components/PreparingPhase";
import { ReferencePhase } from "@/components/ReferencePhase";
import { ExecutionPhase } from "@/components/ExecutionPhase";
import { MadeWithDyad } from "@/components/made-with-dyad";

// Helper function to shuffle an array
const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

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

  const generateRound = () => {
    const trendingTags = shuffle(allTags).slice(0, 3);
    const valueItem = shuffle(menuItems)[0].name;
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
  };

  useEffect(() => {
    generateRound();
  }, [gameState.round]);

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

  const handleProceedToReference = () => {
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
      if (matchCount >= 3) isBestMatchAvailable = true;
      if (matchCount >= 1 && matchCount <= 2) isPartialMatchAvailable = true;
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
    setGameState(prev => ({
      ...prev,
      profit: prev.profit + 5,
      satisfaction: prev.satisfaction + 5,
      ...advanceToNextCustomer(prev),
    }));
  };

  const handleServePartialMatch = () => {
    setGameState(prev => ({
      ...prev,
      profit: prev.profit + 2,
      satisfaction: prev.satisfaction + 2,
      ...advanceToNextCustomer(prev),
    }));
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
            onStartExecution={handleProceedToReference}
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
            isBestMatchAvailable={matchAvailability.best}
            isPartialMatchAvailable={matchAvailability.partial}
          />
        );
      case "summary":
        return <div className="text-center p-8">Summary Phase (To be implemented)</div>;
      case "victory":
        return <div className="text-center p-8">Victory! (To be implemented)</div>;
      default:
        return <div className="text-center p-8">Loading...</div>;
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-orange-50">
      <header className="text-center my-6">
        <h1 className="text-4xl font-bold text-red-600">🍜 Pujasera Rush 🍜</h1>
        <p className="text-muted-foreground">Manage your Indonesian food court to success!</p>
      </header>
      <main className="space-y-8">
        <ScoreBoard
          profit={gameState.profit}
          risk={gameState.risk}
          satisfaction={gameState.satisfaction}
        />
        <div className="bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg border">
          {renderPhase()}
        </div>
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default PujaseraRush;