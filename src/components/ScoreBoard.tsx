import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScoreInfoDialog } from "./ScoreInfoDialog";
import { DollarSign, ShieldAlert, Heart } from "lucide-react";

interface ScoreBoardProps {
  profit: number;
  risk: number;
  satisfaction: number;
}

const ScoreCard = ({ icon, value, colorClass, infoTitle, infoDescription }: { icon: React.ReactNode; value: number; colorClass: string; infoTitle: string; infoDescription: React.ReactNode; }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div className="flex items-center">
        {icon}
        <ScoreInfoDialog title={infoTitle} description={infoDescription} icon={icon} />
      </div>
    </CardHeader>
    <CardContent>
      <div className={`text-xl sm:text-2xl font-bold ${colorClass}`}>{value}</div>
    </CardContent>
  </Card>
);

export const ScoreBoard = ({ profit, risk, satisfaction }: ScoreBoardProps) => {
  const profitInfo = (
    <>
      <p>Represents your total earnings from serving customers.</p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li><strong className="text-green-500">Best Match:</strong> +5 Profit</li>
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
        <li><strong className="text-green-500">Value Item Bonus:</strong> -5 Risk</li>
        <li><strong className="text-red-500">Threatened Item Penalty:</strong> +10 Risk</li>
        <li><strong className="text-yellow-500">Apology/Failed Serve:</strong> +1-2 Risk</li>
      </ul>
    </>
  );

  const satisfactionInfo = (
    <>
      <p>Represents overall customer happiness with your food court.</p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li><strong className="text-green-500">Best Match:</strong> +5 Satisfaction</li>
        <li><strong className="text-yellow-500">Partial Match:</strong> +2 Satisfaction</li>
        <li><strong className="text-blue-500">Apology:</strong> +1 Satisfaction</li>
        <li><strong className="text-red-500">Failed/Kicked:</strong> -2-3 Satisfaction</li>
      </ul>
    </>
  );

  return (
    <div className="grid gap-2 grid-cols-3">
      <ScoreCard 
        icon={<DollarSign className="h-5 w-5 text-green-500" />} 
        value={profit} 
        colorClass="text-green-500"
        infoTitle="Profit"
        infoDescription={profitInfo}
      />
      <ScoreCard 
        icon={<ShieldAlert className="h-5 w-5 text-yellow-500" />} 
        value={risk} 
        colorClass="text-yellow-500"
        infoTitle="Risk"
        infoDescription={riskInfo}
      />
      <ScoreCard 
        icon={<Heart className="h-5 w-5 text-blue-500" />} 
        value={satisfaction} 
        colorClass="text-blue-500"
        infoTitle="Customer Satisfaction"
        infoDescription={satisfactionInfo}
      />
    </div>
  );
};