import { GameState } from "@/types/game";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Minus, Lightbulb, DollarSign, ShieldAlert, Heart } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useClickSound } from "@/hooks/useClickSound";

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
  const playClickSound = useClickSound();

  const profitChange = profit - roundStartStats.profit;
  const riskChange = risk - roundStartStats.risk;
  const satisfactionChange = satisfaction - roundStartStats.satisfaction;

  const isLastRound = round >= totalRounds;

  const getSummaryMessage = () => {
    if (profitChange > 15) return "Kerja bagus! Uang mengalir deras!";
    if (profitChange > 5) return "Performa yang solid. Pelanggan senang dan dompet Anda juga!";
    if (profitChange >= 0) return "Anda berhasil melewati hari ini. Mari kita targetkan keuntungan lebih besar lain kali.";
    return "Hari yang berat. Mari kita analisis apa yang salah dan bangkit kembali!";
  };

  const handleClick = () => {
    playClickSound();
    if (isLastRound) {
      onFinishGame();
    } else {
      onNextRound();
    }
  };

  return (
    <div className="space-y-6 text-center animate-in fade-in-50">
      <h2 className="text-3xl font-bold">Ringkasan Ronde {round}</h2>
      <p className="text-muted-foreground">{getSummaryMessage()}</p>

      {(missedOpportunities > 0 || wrongDecisions > 0) && (
        <Alert variant="default" className="text-left">
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>Ada Ruang untuk Peningkatan!</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1">
              {missedOpportunities > 0 && (
                <li>
                  Anda memiliki <strong>{missedOpportunities}</strong> kesempatan yang terlewat dengan tidak memilih tindakan terbaik yang tersedia.
                </li>
              )}
              {wrongDecisions > 0 && (
                <li>
                  Anda membuat <strong>{wrongDecisions}</strong> keputusan yang salah dengan memilih tindakan yang tidak tersedia.
                </li>
              )}
            </ul>
            <p className="mt-2">Analisis kebutuhan pelanggan dengan lebih cermat untuk memaksimalkan Profit dan Satisfaction!</p>
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Performa Ronde</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <StatDisplay label="Perubahan Profit" change={profitChange} icon={DollarSign} iconColor="text-blue-500" />
          <StatDisplay label="Perubahan Risk" change={riskChange} icon={ShieldAlert} iconColor="text-primary" invertColorLogic={true} />
          <StatDisplay label="Perubahan Satisfaction" change={satisfactionChange} icon={Heart} iconColor="text-pink-500" />
        </CardContent>
      </Card>

      <Button onClick={handleClick} size="lg">
        {isLastRound ? "Lihat Hasil Akhir" : "Mulai Ronde Berikutnya"}
      </Button>
    </div>
  );
};