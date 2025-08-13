import { GameState } from "@/types/game";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Minus, Lightbulb } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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

const StatDisplay = ({ label, change, invertColorLogic = false }: { label: string; change: number; invertColorLogic?: boolean }) => {
  const isPositive = change > 0;
  const isNegative = change < 0;
  const Icon = isPositive ? ArrowUp : isNegative ? ArrowDown : Minus;

  const positiveColor = invertColorLogic ? "text-red-500" : "text-green-500";
  const negativeColor = invertColorLogic ? "text-green-500" : "text-red-500";

  const colorClass = isPositive ? positiveColor : isNegative ? negativeColor : "text-gray-500";

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
  const { round, profit, risk, satisfaction, missedOpportunities } = gameState;

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

      {missedOpportunities > 0 && (
        <Alert variant="default" className="text-left">
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>Room for Improvement!</AlertTitle>
          <AlertDescription>
            You missed <strong>{missedOpportunities}</strong> opportunity(ies) to serve a "Best Match" this round.
            Check your menu carefully next time to maximize profit and satisfaction!
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Round Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <StatDisplay label="Profit Change" change={profitChange} />
          <StatDisplay label="Risk Added" change={riskChange} invertColorLogic={true} />
          <StatDisplay label="Satisfaction Change" change={satisfactionChange} />
        </CardContent>
      </Card>

      <Button onClick={isLastRound ? onFinishGame : onNextRound} size="lg">
        {isLastRound ? "See Final Results" : "Start Next Round"}
      </Button>
    </div>
  );
};