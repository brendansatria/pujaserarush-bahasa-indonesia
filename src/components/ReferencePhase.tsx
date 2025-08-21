import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, Sparkles, Smile, Frown, UserX } from "lucide-react";

interface ReferencePhaseProps {
  onStartExecution: () => void;
}

const DetailedScoreInfo = ({ icon, text, correct, incorrect }: { icon: React.ReactNode; text: string; correct: string; incorrect: string }) => (
    <div className="p-2 bg-muted/50 rounded-md">
        <div className="flex items-center gap-2">
            {icon}
            <p className="font-medium text-sm">{text}</p>
        </div>
        <div className="text-xs font-mono text-muted-foreground mt-1 pl-6 space-y-1 text-left">
            <p>Dengan Benar: <span className="font-semibold">{correct}</span></p>
            <p>Dengan Salah: <span className="font-semibold">{incorrect}</span></p>
        </div>
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
        <h2 className="text-2xl font-bold">Bersiap untuk Melayani!</h2>
        <p className="text-muted-foreground">Jam sibuk makan siang akan segera dimulai...</p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <img src="/pan.png" alt="Memasak sedang berlangsung" className="h-24 w-auto animate-bounce" />
        <Progress value={progress} className="w-full max-w-md" />
      </div>

      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>Tips Pro!</AlertTitle>
        <AlertDescription>
          Ingat tag untuk setiap item menu. Mencocokkannya dengan preferensi pelanggan dengan cepat adalah kunci untuk skor tinggi!
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Contekan Skor</CardTitle>
          <CardDescription>Poin dasar untuk setiap tindakan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <DetailedScoreInfo icon={<Sparkles className="h-4 w-4 text-yellow-500" />} text="Cocok Sempurna" correct="P+10 S+10" incorrect="S-5 R+5" />
          <DetailedScoreInfo icon={<Smile className="h-4 w-4 text-green-500" />} text="Cocok Sebagian" correct="P+2 S+2" incorrect="S-2 R+1" />
          <div className="p-2 bg-muted/50 rounded-md">
            <div className="flex items-center gap-2">
                <Frown className="h-4 w-4 text-blue-500" />
                <p className="font-medium text-sm">Minta Maaf</p>
            </div>
            <div className="text-xs font-mono text-muted-foreground mt-1 pl-6 space-y-1 text-left">
                <p><span className="font-semibold">S+1 R+1</span></p>
            </div>
          </div>
          <DetailedScoreInfo icon={<UserX className="h-4 w-4 text-red-500" />} text="Usir Pelanggan" correct="S+5 R+1" incorrect="P-5 S-5 R+5" />
          
          <div className="text-xs text-muted-foreground pt-2 text-center">
            <p><span className="font-bold">P</span>=Profit, <span className="font-bold">S</span>=Satisfaction, <span className="font-bold">R</span>=Risk</p>
            <p>Ingat untuk memeriksa penyerobot antrean!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};