import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center bg-card/80 backdrop-blur-sm p-6 sm:p-10 rounded-lg shadow-xl border">
        <img src="/tittle.png" alt="Pujasera Rush Title" className="mx-auto mb-4 max-w-full h-auto" />
        <p className="text-sm sm:text-base text-muted-foreground mb-8">
          A game-based learning experience in managing a vibrant Indonesian food court.
        </p>
        <Button asChild size="lg">
          <Link to="/how-to-play">Start Game</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;