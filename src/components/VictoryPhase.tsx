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
        highlight: "Kerja bagus, Tim!",
        narrative: "Pujasera Anda berkembang pesat, mencapai semua target. Integritas, kolaborasi, dan fokus Anda telah membuahkan hasil yang cemerlang!",
      };
      break;
    case 2:
      outcome = {
        trophyColor: "text-gray-400",
        highlight: "Usaha yang hebat, Tim!",
        narrative: "Beberapa target tercapai, tetapi beberapa masih tersisa. Renungkan, berkolaborasi, dan berkembang untuk menyempurnakan keahlian Anda!",
      };
      break;
    case 1:
      outcome = {
        trophyColor: "text-amber-600",
        highlight: "Usaha yang bagus, Tim!",
        narrative: "Anda mencapai satu target, tetapi dua lainnya perlu perhatian. Belajar dengan integritas dan bidik lebih tinggi lain kali!",
      };
      break;
    default: // case 0
      outcome = {
        trophyColor: "text-muted-foreground",
        highlight: "Ronde yang sulit, Tim...",
        narrative: "Pujasera sedang berjuang—gunakan kemunduran ini untuk tumbuh, berkolaborasi, dan kembali lebih kuat!",
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
          <CardTitle>Hasil Akhir</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FinalScoreCard 
                    icon={DollarSign}
                    title="Total Profit"
                    value={profit}
                    description="Uang adalah raja!"
                    colorClass="text-blue-500"
                />
                <FinalScoreCard 
                    icon={ShieldAlert}
                    title="Total Risk"
                    value={risk}
                    description="Semakin rendah, semakin baik."
                    colorClass="text-yellow-500"
                />
                <FinalScoreCard 
                    icon={Heart}
                    title="Total Satisfaction"
                    value={satisfaction}
                    description="Pelanggan senang, hidup bahagia."
                    colorClass="text-pink-500"
                />
            </div>
        </CardContent>
      </Card>

      <Button asChild size="lg">
        <Link to="/">Main Lagi</Link>
      </Button>

      <div className="text-center pt-8">
        <a 
          href="https://kummara.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          kunjungi kami: kummara.com
        </a>
      </div>
    </div>
  );
};