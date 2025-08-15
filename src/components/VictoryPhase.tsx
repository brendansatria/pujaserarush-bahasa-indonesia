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

export const VictoryPhase = ({ gameState }: VictoryPhaseProps) => {
  const { profit, risk, satisfaction } = gameState;

  const getVictoryMessage = () => {
    if (profit >= 100 && satisfaction >= 100 && risk < 50) return "Legendary Pujasera Tycoon!";
    if (profit >= 50 && satisfaction >= 50 && risk < 50) return "Successful Food Court Manager!";
    if (profit > 0 && risk < 75) return "You've built a promising business!";
    return "It was a tough journey, but you made it through!";
  };

  return (
    <div className="space-y-6 text-center animate-in fade-in-50">
      <Trophy className="mx-auto h-16 w-16 text-yellow-400" />
      <h2 className="text-3xl font-bold">{getVictoryMessage()}</h2>
      <p className="text-muted-foreground">You have completed all rounds. Here are your final scores.</p>

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
    </div>
  );
};