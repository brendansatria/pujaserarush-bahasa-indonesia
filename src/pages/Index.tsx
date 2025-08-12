import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 p-4">
      <div className="text-center bg-white/80 backdrop-blur-sm p-6 sm:p-10 rounded-lg shadow-xl border">
        <h1 className="text-4xl sm:text-5xl font-bold text-red-600 mb-4">🍜 Pujasera Rush 🍜</h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8">
          A game-based learning experience in managing a vibrant Indonesian food court.
        </p>
        <Button asChild size="lg">
          <Link to="/pujasera-rush">Start Game</Link>
        </Button>
      </div>
      <div className="absolute bottom-4">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;