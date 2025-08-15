import { Card } from "@/components/ui/card";
import { ScoreInfoDialog } from "./ScoreInfoDialog";
import { DollarSign, ShieldAlert, Heart } from "lucide-react";

interface ScoreBoardProps {
  profit: number;
  risk: number;
  satisfaction: number;
}

const ScoreCard = ({ icon, value, colorClass, infoTitle, infoDescription, title }: { icon: React.ReactNode; value: number; colorClass: string; infoTitle: string; infoDescription: React.ReactNode; title: string; }) => (
  <Card className="p-3 flex flex-col">
    <div className="flex items-center justify-center gap-1 mb-1">
      <span className="text-sm font-medium text-muted-foreground">{title}</span>
      <ScoreInfoDialog title={infoTitle} description={infoDescription} icon={icon} />
    </div>
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {icon}
      <div className={`text-3xl sm:text-4xl font-bold ${colorClass}`}>{value}</div>
    </div>
  </Card>
);

export const ScoreBoard = ({ profit, risk, satisfaction }: ScoreBoardProps) => {
  const profitInfo = (
    <>
      <p>Represents your total earnings. Your goal is to reach a profit of 100.</p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li><strong className="text-green-500">Best Match:</strong> +10 Profit</li>
        <li><strong className="text-yellow-500">Partial Match:</strong> +2 Profit</li>
        <li><strong className="text-red-500">Failed Match:</strong> -1 Profit</li>
        <li><strong className="text-red-500">Kick Customer:</strong> -2 Profit</li>
      </ul>
    </>
  );

  const riskInfo = (
    <>
      <p>Represents business challenges. Keep it below 50 to win!</p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li>Starts at <strong>50</strong>. Strategic choices can lower it.</li>
        <li><strong className="text-green-500">Trending Item Bonus:</strong> -2 Risk</li>
        <li><strong className="text-green-500">High Value Menu Bonus:</strong> -5 Risk</li>
        <li><strong className="text-green-500">Existing High Value Menu:</strong> -2 Risk</li>
        <li><strong className="text-red-500">Threatened Item Penalty:</strong> +10 Risk</li>
        <li><strong className="text-yellow-500">Apology/Failed Serve:</strong> +1-2 Risk</li>
      </ul>
    </>
  );

  const satisfactionInfo = (
    <>
      <p>Represents customer happiness. Your goal is to reach a satisfaction score of 100.</p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li><strong className="text-green-500">Best Match:</strong> +10 Satisfaction</li>
        <li><strong className="text-yellow-500">Partial Match:</strong> +2 Satisfaction</li>
        <li><strong className="text-blue-500">Apology:</strong> +1 Satisfaction</li>
        <li><strong className="text-red-500">Failed/Kicked:</strong> -2-3 Satisfaction</li>
      </ul>
    </>
  );

  return (
    <div className="grid gap-2 grid-cols-3">
      <ScoreCard 
        title="Profit"
        icon={<DollarSign className="h-7 w-7 text-blue-500" />} 
        value={profit} 
        colorClass="text-blue-500"
        infoTitle="Profit"
        infoDescription={profitInfo}
      />
      <ScoreCard 
        title="Risk"
        icon={<ShieldAlert className="h-7 w-7 text-primary" />} 
        value={risk} 
        colorClass="text-primary"
        infoTitle="Risk"
        infoDescription={riskInfo}
      />
      <ScoreCard 
        title="Satisfaction"
        icon={<Heart className="h-7 w-7 text-pink-500" />} 
        value={satisfaction} 
        colorClass="text-pink-500"
        infoTitle="Customer Satisfaction"
        infoDescription={satisfactionInfo}
      />
    </div>
  );
};