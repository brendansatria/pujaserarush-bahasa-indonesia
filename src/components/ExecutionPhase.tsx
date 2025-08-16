import { useState, useEffect } from "react";
import { GameState } from "@/types/game";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getTagIcon } from "@/utils/tagIcons";
import { TimerIcon, Sparkles, Smile, Frown, UserX } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExecutionPhaseProps {
  gameState: GameState;
  onServeBestMatch: () => void;
  onServePartialMatch: () => void;
  onApologize: () => void;
  onKickCustomer: () => void;
}

export const ExecutionPhase = ({
  gameState,
  onServeBestMatch,
  onServePartialMatch,
  onApologize,
  onKickCustomer,
}: ExecutionPhaseProps) => {
  const {
    round,
    timer,
    customers,
    currentCustomerIndex,
    selectedTenants,
    customersServed,
    playerMenu,
  } = gameState;

  const [hasActed, setHasActed] = useState(false);

  useEffect(() => {
    setHasActed(false);
  }, [currentCustomerIndex]);

  const handleAction = (action: () => void) => {
    if (hasActed) return;
    setHasActed(true);
    // Add a small delay so the user can see the button state change before the next customer appears
    setTimeout(() => {
      action();
    }, 300);
  };

  const currentCustomer = customers[currentCustomerIndex];
  const allMenuItems = [...playerMenu, ...selectedTenants.flatMap((tenant) => tenant.items)];

  if (!currentCustomer) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold">All customers served for today!</h2>
        <p>Calculating results...</p>
      </div>
    );
  }

  const [customerName, customerType] = currentCustomer.name.split(" - ");
  const customerImage = currentCustomer.gender === 'female' ? '/customer_b.png' : '/customer_a.png';

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
        <div
          className={cn(
            "flex items-center gap-2 text-lg sm:text-xl font-bold",
            timer <= 10 && "text-destructive"
          )}
        >
          <TimerIcon className="h-5 w-5 sm:h-6 sm-w-6" />
          <span>Time Left: {timer}s</span>
        </div>
        <div className="w-full sm:w-2/5">
          <Progress value={(customersServed / customers.length) * 100} />
          <p className="text-xs text-center text-muted-foreground mt-1">
            {customersServed} / {customers.length} Customers Served
          </p>
        </div>
      </div>

      <Card className="bg-accent text-accent-foreground border-accent/30 relative overflow-hidden flex items-center" style={{ backgroundColor: '#2A9D90' }}>
        <div className="flex-shrink-0 pl-2">
          <img src={customerImage} alt="Customer" className="h-32 w-auto" />
        </div>
        <div className="flex-grow p-4">
          <p className="text-sm text-accent-foreground/80">Next in-line:</p>
          <h3 className="text-xl font-bold text-accent-foreground">{customerName} - {customerType}</h3>
          <p className="text-accent-foreground/80 pt-2">Suggest menu for me for something with these qualities:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {currentCustomer.preferences.map((pref) => {
              const Icon = getTagIcon(pref);
              return (
                <Badge key={pref} variant="secondary" className="text-sm px-2 py-1">
                  <Icon className="mr-1 h-3 w-3" />
                  {pref}
                </Badge>
              );
            })}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Choose Your Action</CardTitle>
            <CardDescription>Select an action for this customer.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-3">
            <Button
              onClick={() => handleAction(onServeBestMatch)}
              className="w-full h-20 py-2 px-3 bg-[#2A9D90] text-accent-foreground hover:bg-[#248a7f] active:bg-[#207c72]"
              disabled={hasActed}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full h-full text-left">
                <div className="flex items-start min-w-0">
                  <Sparkles className="mr-2 h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Yes! we have a perfect menu for you!</span>
                </div>
                <span className="text-xs font-normal text-muted-foreground self-start sm:self-center flex-shrink-0 pl-7 sm:pl-0">(2 match tags)</span>
              </div>
            </Button>
            <Button
              onClick={() => handleAction(onServePartialMatch)}
              className="w-full h-20 py-2 px-3 bg-[#2A9D90] text-accent-foreground hover:bg-[#248a7f] active:bg-[#207c72]"
              disabled={hasActed}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full h-full text-left">
                <div className="flex items-start min-w-0">
                  <Smile className="mr-2 h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Currently we only have menu
                    <br />
                    that partially match for you.
                  </span>
                </div>
                <span className="text-xs font-normal text-muted-foreground self-start sm:self-center flex-shrink-0 pl-7 sm:pl-0">(1 match tag)</span>
              </div>
            </Button>
            <Button
              onClick={() => handleAction(onApologize)}
              className="w-full h-20 py-2 px-3 bg-[#2A9D90] text-accent-foreground hover:bg-[#248a7f] active:bg-[#207c72]"
              disabled={hasActed}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full h-full text-left">
                <div className="flex items-start min-w-0">
                  <Frown className="mr-2 h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    We’re sorry… we don’t have menus
                    <br />
                    that matches your taste right now.
                  </span>
                </div>
                <span className="text-xs font-normal text-muted-foreground self-start sm:self-center flex-shrink-0 pl-7 sm:pl-0">(0 match tag)</span>
              </div>
            </Button>
            {round > 1 && (
              <Button
                onClick={() => handleAction(onKickCustomer)}
                variant="destructive"
                className="w-full h-20 py-2 px-3"
                disabled={hasActed}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full h-full text-left">
                  <div className="flex items-start min-w-0">
                    <UserX className="mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Please get into the line or get out of here!</span>
                  </div>
                  <span className="text-xs font-normal text-muted-foreground self-start sm:self-center flex-shrink-0 pl-7 sm:pl-0">(cut in line customer)</span>
                </div>
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reference Menu</CardTitle>
            <CardDescription>Your available items.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 max-h-60 overflow-y-auto pr-3">
            {allMenuItems.map((item) => (
              <div key={item.name} className="p-3 border rounded-lg bg-background">
                <p className="font-semibold">{item.name}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.map((tag) => {
                    const Icon = getTagIcon(tag);
                    return (
                      <Badge key={tag} variant="secondary" className="font-normal">
                        <Icon className="mr-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};