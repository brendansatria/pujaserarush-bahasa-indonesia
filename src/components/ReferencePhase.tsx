import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, CookingPot, Sparkles, Smile, Frown, UserX, DollarSign, Heart, ShieldAlert } from "lucide-react";

interface ReferencePhaseProps {
  onStartExecution: () => void;
}

const ScoreInfo = ({ icon, text, scores }: { icon: React.ReactNode; text: string; scores: string }) => (
  <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
    <div className="flex items-center gap-2">
      {icon}
      <p className="font-medium text-sm">{text}</p>
    </div>
    <p className="text-xs font-mono text-muted-foreground">{scores}</p>
  </div>
);

export const ReferencePhase = ({ onStartExecution }: ReferencePhaseProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          onStartExecution();
          return 100;
        }
        return prev + 1;
      });
    }, 100); // 100ms * 100 = 10000ms = 10s

    return () => clearInterval(timer);
  }, [onStartExecution]);

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Get Ready to Serve!</h2>
        <p className="text-muted-foreground">The lunch rush is about to begin...</p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <CookingPot className="h-16 w-16 text-primary animate-bounce" />
        <Progress value={progress} className="w-full max-w-md" />
      </div>

      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>Pro Tip!</AlertTitle>
        <AlertDescription>
          Remember the tags for each menu item. Matching them to customer preferences quickly is the key to a high score!
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Scoring Cheat Sheet</CardTitle>
          <CardDescription>Base points for each action (vs. a regular customer).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <ScoreInfo icon={<Sparkles className="h-4 w-4 text-yellow-500" />} text="Best Match" scores="P+10 S+10" />
          <ScoreInfo icon={<Smile className="h-4 w-4 text-green-500" />} text="Partial Match" scores="P+2  S+2" />
          <ScoreInfo icon={<Frown className="h-4 w-4 text-blue-500" />} text="Apologize" scores="S+1  R+1" />
          <ScoreInfo icon={<UserX className="h-4 w-4 text-red-500" />} text="Kick Customer" scores="P-2  S-2  R+1" />
          <div className="text-xs text-muted-foreground pt-2 text-center">
            <p><span className="font-bold">P</span>=Profit, <span className="font-bold">S</span>=Satisfaction, <span className="font-bold">R</span>=Risk</p>
            <p>Handling line-cutters has different outcomes!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};