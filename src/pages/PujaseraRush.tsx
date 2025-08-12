import { useState, useEffect } from "react";
import { GameState, Tenant } from "@/types/game";
import { menuItems, customerTypes, allTags, threats } from "@/data/gameData";
import { ScoreBoard } from "@/components/ScoreBoard";
import { PreparingPhase } from "@/components/PreparingPhase";
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

  const handleStartExecution = () => {
    const customers = [];
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
            onStartExecution={handleStartExecution}
          />
        );
      case "execution":
        return <div className="text-center p-8">Execution Phase (To be implemented)</div>;
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