import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useClickSound } from "@/hooks/useClickSound";

const Index = () => {
  const navigate = useNavigate();
  const playClickSound = useClickSound();

  const handleMulaiClick = () => {
    playClickSound();
    
    // Menavigasi setelah jeda singkat untuk memberi waktu suara mulai diputar.
    setTimeout(() => {
      navigate("/how-to-play");
    }, 200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 sm:p-8">
      <div className="text-center">
        <p className="text-xs text-muted-foreground">design by:</p>
        <img src="/logo-white.png" alt="Kummara Logo" className="w-32 mx-auto mt-2" />
      </div>

      <div className="text-center bg-card/80 backdrop-blur-sm p-6 sm:p-10 rounded-lg shadow-xl border">
        <img src="/title.png" alt="Pujasera Rush Title" className="w-64 sm:w-80 mx-auto mb-4" />
        <p className="text-sm sm:text-base text-muted-foreground mb-8">
          A game-based learning experience in managing a vibrant Indonesian food court.
        </p>
        <Button size="lg" onClick={handleMulaiClick}>
          Mulai
        </Button>
      </div>

      <div className="text-center">
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

export default Index;