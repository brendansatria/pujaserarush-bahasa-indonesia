import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Heart, ShieldAlert } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useClickSound } from "@/hooks/useClickSound";

const HowToPlay = () => {
  const navigate = useNavigate();
  const playClickSound = useClickSound();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    playClickSound();
    setTimeout(() => {
      navigate("/pujasera-rush");
    }, 200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <Card className="bg-card/80 backdrop-blur-sm shadow-xl border">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl sm:text-4xl font-bold text-primary">
              Cara Bermain Pujasera Rush
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <div className="text-center">
              <p className="text-lg text-foreground">
                Tujuan Anda adalah mengelola pujasera hingga menjadi sukses selama 4 ronde.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-500/10 rounded-lg">
                <DollarSign className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                <h3 className="font-bold text-foreground">Maksimalkan Profit</h3>
                <p className="text-sm">Raih skor 100 dengan melayani pelanggan secara efisien.</p>
              </div>
              <div className="p-4 bg-primary/20 rounded-lg">
                <ShieldAlert className="mx-auto h-8 w-8 text-primary mb-2" />
                <h3 className="font-bold text-foreground">Kelola Risiko</h3>
                <p className="text-sm">Jaga skor Risk Anda di bawah 50 untuk berhasil. Pilihan strategis dapat menurunkannya!</p>
              </div>
              <div className="p-4 bg-pink-500/10 rounded-lg">
                <Heart className="mx-auto h-8 w-8 text-pink-500 mb-2" />
                <h3 className="font-bold text-foreground">Tingkatkan Satisfaction</h3>
                <p className="text-sm">Raih skor 100 dengan mencocokkan preferensi pelanggan secara sempurna.</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-2 text-center text-foreground">Fase Permainan</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary text-secondary-foreground rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Fase Persiapan</h4>
                    <p className="text-sm">Analisis tren pasar dan ancaman. Pilih 2 tenant yang menunya paling sesuai dengan tantangan hari ini.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-secondary text-secondary-foreground rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Fase Eksekusi</h4>
                    <p className="text-sm">It's Rushing Time! Layani pelanggan sebanyak mungkin sebelum waktu habis. Cocokkan preferensi mereka dengan tag menu Anda.</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <div className="bg-secondary text-secondary-foreground rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Fase Evaluasi</h4>
                    <p className="text-sm">Tinjau kinerja Anda dan lihat bagaimana pilihan Anda memengaruhi skor Anda. Bersiaplah untuk ronde berikutnya!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button asChild size="lg">
                <Link to="/pujasera-rush" onClick={handleClick}>OK</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HowToPlay;