import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, DollarSign, Heart, ShieldAlert, Users } from "lucide-react";
import { Link } from "react-router-dom";

const HowToPlay = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-100 p-4">
      <div className="max-w-4xl w-full">
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl sm:text-4xl font-bold text-red-600">
              How to Play Pujasera Rush
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700">
            <div className="text-center">
              <p className="text-lg">
                Your goal is to manage a successful Indonesian food court over 4 rounds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-green-100 rounded-lg">
                <DollarSign className="mx-auto h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-bold">Maximize Profit</h3>
                <p className="text-sm">Aim for a score of 100 by serving customers efficiently.</p>
              </div>
              <div className="p-4 bg-blue-100 rounded-lg">
                <Heart className="mx-auto h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-bold">Boost Satisfaction</h3>
                <p className="text-sm">Aim for a score of 100 by matching preferences perfectly.</p>
              </div>
              <div className="p-4 bg-yellow-100 rounded-lg">
                <ShieldAlert className="mx-auto h-8 w-8 text-yellow-600 mb-2" />
                <h3 className="font-bold">Manage Risk</h3>
                <p className="text-sm">Keep your risk score below 50 to succeed. Strategic choices can lower it!</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-2 text-center">Game Phases</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-red-500 text-white rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold">Preparing Phase</h4>
                    <p className="text-sm">Analyze market trends and threats. Select 2 tenants whose menus best fit the day's challenges.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-red-500 text-white rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold">Execution Phase</h4>
                    <p className="text-sm">The rush is on! Serve as many customers as you can before the timer runs out. Match their preferences to your menu tags.</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <div className="bg-red-500 text-white rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold">Summary Phase</h4>
                    <p className="text-sm">Review your performance and see how your choices affected your scores. Prepare for the next round!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button asChild size="lg">
                <Link to="/pujasera-rush">Let's Go!</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HowToPlay;