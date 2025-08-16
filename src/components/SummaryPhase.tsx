import { GameState } from "@/types/game";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Minus, Lightbulb, DollarSign, ShieldAlert, Heart } from "lucide-react";
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

const StatDisplay = ({ label, change, icon: StatIcon, iconColor, invertColorLogic = false }: { label: string; change: number; icon: React.ElementType; iconColor: string; invertColorLogic?: boolean }) => {
  const isPositive = change > 0;
  const isNegative = change < 0;
  const ChangeIcon = isPositive ? ArrowUp : isNegative ? ArrowDown : Minus;

  const positiveColor = invertColorLogic ? "text-red-500" : "text-green-500";
  const negativeColor = invertColorLogic ? "text-green-500" : "text-red-500";

  const colorClass = isPositive ? positiveColor : isNegative ? negativeColor : "text-gray-500";

  return (
    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
      <div className="flex items-center gap-2">
        <StatIcon className={`h-5 w-5 ${iconColor}`} />
        <p className="font-medium">{label}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className={`font-bold text-lg ${colorClass}`}>
          {isPositive ? "+" : ""}{change}
        </span>
        <ChangeIcon className={`h-5 w-5 ${colorClass}`} />
      </div>
    </div>
  );
};

export const SummaryPhase = ({ gameState, roundStartStats, onNextRound, onFinishGame, totalRounds }: SummaryPhaseProps) => {
  const { round, profit, risk, satisfaction, missedOpportunities, wrongDecisions } = gameState;

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

      {(missedOpportunities > 0 || wrongDecisions > 0) && (
        <Alert variant="default" className="text-left">
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>Room for Improvement!</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1">
              {missedOpportunities > 0 && (
                <li>
                  You had <strong>{missedOpportunities}</strong> missed opportunity(ies) by not choosing the best available action.
                </li>
              )}
              {wrongDecisions > 0 && (
                <li>
                  You made <strong>{wrongDecisions}</strong> incorrect decision(s) by choosing an action that wasn't available.
                </li>
              )}
            </ul>
            <p className="mt-2">Analyze customer needs more carefully to maximize profit and satisfaction!</p>
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Round Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <StatDisplay label="Profit Change" change={profitChange} icon={DollarSign} iconColor="text-blue-500" />
          <StatDisplay label="Risk Change" change={riskChange} icon={ShieldAlert} iconColor="text-primary" invertColorLogic={true} />
          <StatDisplay label="Satisfaction Change" change={satisfactionChange} icon={Heart} iconColor="text-pink-500" />
        </CardContent>
      </Card>

      <Button onClick={isLastRound ? onFinishGame : onNextRound} size="lg">
        {isLastRound ? "See Final Results" : "Start Next Round"}
      </Button>
    </div>
  );
};