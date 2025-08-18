import { GameState } from "@/types/game";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, ShieldAlert, Heart, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const FinalScoreCard = ({ icon: Icon, title, value, description, colorClass }: any) => (
    <div className="flex items-center space-x-4 rounded-lg border p-4">
        <Icon className={`h-8 w-8 ${colorClass}`} />
        <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
        </div>
    </div>
);

interface VictoryPhaseProps {
  gameState: GameState;
}

export const VictoryPhase = ({ gameState }: VictoryPhaseProps) => {
  const { profit, risk, satisfaction } = gameState;

  const profitSuccess = profit >= 100;
  const riskSuccess = risk <= 50;
  const satisfactionSuccess = satisfaction >= 100;

  const successCount = [profitSuccess, riskSuccess, satisfactionSuccess].filter(Boolean).length;

  let outcome: { trophyColor: string; highlight: string; narrative: string; };

  switch (successCount) {
    case 3:
      outcome = {
        trophyColor: "text-yellow-400",
        highlight: "Excellent work, Team!",
        narrative: "Your food court thrives, hitting all targets. Your integrity, collaboration, and focus have paid off brilliantly!",
      };
      break;
    case 2:
      outcome = {
        trophyColor: "text-gray-400",
        highlight: "Great effort, Team!",
        narrative: "Some target hits, but some remain. Reflect, collaborate, and grow to perfect your skills!",
      };
      break;
    case 1:
      outcome = {
        trophyColor: "text-amber-600",
        highlight: "Solid try, Team!",
        narrative: "You hit a target, but two others need attention. Learn with integrity and aim higher next time!",
      };
      break;
    default: // case 0
      outcome = {
        trophyColor: "text-muted-foreground",
        highlight: "Tough round, Team...",
        narrative: "The food court struggles—use this setback to grow, collaborate, and come back stronger!",
      };
      break;
  }

  return (
    <div className="space-y-6 text-center animate-in fade-in-50">
      <Trophy className={`mx-auto h-16 w-16 ${outcome.trophyColor}`} />
      <h2 className="text-3xl font-bold">{outcome.highlight}</h2>
      <p className="text-muted-foreground">{outcome.narrative}</p>

      <Card>
        <CardHeader>
          <CardTitle>Final Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FinalScoreCard 
                    icon={DollarSign}
                    title="Total Profit"
                    value={profit}
                    description="Cash is king!"
                    colorClass="text-blue-500"
                />
                <FinalScoreCard 
                    icon={ShieldAlert}
                    title="Total Risk"
                    value={risk}
                    description="The lower, the better."
                    colorClass="text-yellow-500"
                />
                <FinalScoreCard 
                    icon={Heart}
                    title="Total Satisfaction"
                    value={satisfaction}
                    description="Happy customers, happy life."
                    colorClass="text-pink-500"
                />
            </div>
        </CardContent>
      </Card>

      <Button asChild size="lg">
        <Link to="/">Play Again</Link>
      </Button>

      <div className="text-center pt-8">
        <a 
          href="https://kummara.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          visit us: kummara.com
        </a>
      </div>
    </div>
  );
};