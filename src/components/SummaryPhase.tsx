import { GameState } from "@/types/game";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface SummaryPhaseProps {
  gameState: GameState;
  roundStartStats: {
    profit: number;
    risk: number;
    satisfaction: number;
  };
  onNextRound: () => void;
  onFinishGame: () => void;
  totalRounds: number;
}

const StatDisplay = ({ label, change }: { label: string; change: number }) => {
  const isPositive = change > 0;
  const isNegative = change < 0;
  const Icon = isPositive ? ArrowUp : isNegative ? ArrowDown : Minus;
  const colorClass = isPositive ? "text-green-500" : isNegative ? "text-red-500" : "text-gray-500";

  return (
    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
      <p className="font-medium">{label}</p>
      <div className="flex items-center gap-2">
        <span className={`font-bold text-lg ${colorClass}`}>
          {isPositive ? "+" : ""}{change}
        </span>
        <Icon className={`h-5 w-5 ${colorClass}`} />
      </div>
    </div>
  );
};

export const SummaryPhase = ({ gameState, roundStartStats, onNextRound, onFinishGame, totalRounds }: SummaryPhaseProps) => {
  const { round, profit, risk, satisfaction } = gameState;

  const profitChange = profit - roundStartStats.profit;
  const riskChange = risk - roundStartStats.risk;
  const satisfactionChange = satisfaction - roundStartStats.satisfaction;

  const isLastRound = round >= totalRounds;

  const getSummaryMessage = () => {
    if (profitChange > 15) return "Excellent work! The cash is flowing!";
    if (profitChange > 5) return "A solid performance. The customers are happy and so is your wallet.";
    if (profitChange >= 0) return "You survived the day. Let's aim for more profit next time.";
    return "A tough day. Let's analyze what went wrong and bounce back!";
  };

  return (
    <div className="space-y-6 text-center animate-in fade-in-50">
      <h2 className="text-3xl font-bold">Round {round} Summary</h2>
      <p className="text-muted-foreground">{getSummaryMessage()}</p>

      <Card>
        <CardHeader>
          <CardTitle>Round Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <StatDisplay label="Profit Change" change={profitChange} />
          <StatDisplay label="Risk Added" change={riskChange} />
          <StatDisplay label="Satisfaction Change" change={satisfactionChange} />
        </CardContent>
      </Card>

      <Button onClick={isLastRound ? onFinishGame : onNextRound} size="lg">
        {isLastRound ? "See Final Results" : "Start Next Round"}
      </Button>
    </div>
  );
};