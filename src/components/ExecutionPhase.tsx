import { useState, useEffect } from "react";
import { GameState } from "@/types/game";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getTagIcon } from "@/utils/tagIcons";
import { TimerIcon, Sparkles, Smile, Frown, UserX, User } from "lucide-react";
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

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
        <div
          className={cn(
            "flex items-center gap-2 text-lg sm:text-xl font-bold",
            timer <= 10 && "text-red-500"
          )}
        >
          <TimerIcon className="h-5 w-5 sm:h-6 sm-w-6 animate-bounce" />
          <span className="animate-pulse">Time Left: {timer}s</span>
        </div>
        <div className="w-full sm:w-2/5">
          <Progress value={(customersServed / customers.length) * 100} />
          <p className="text-xs text-center text-muted-foreground mt-1">
            {customersServed} / {customers.length} Customers Served
          </p>
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200 relative overflow-hidden">
        <CardHeader>
          <CardTitle>Next in Line: {currentCustomer.name}</CardTitle>
          <CardDescription>They are looking for something with these qualities:</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {currentCustomer.preferences.map((pref) => {
              const Icon = getTagIcon(pref);
              return (
                <Badge key={pref} variant="secondary" className="text-base p-2">
                  <Icon className="mr-2 h-4 w-4" />
                  {pref}
                </Badge>
              );
            })}
          </div>
        </CardContent>
        <User className="absolute top-1/2 right-4 -translate-y-1/2 h-16 w-16 text-blue-200/80" />
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
              variant="secondary"
              className={cn("w-full h-auto py-2 px-3", currentCustomerIndex === 0 && !hasActed && "animate-pulse")}
              disabled={hasActed}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center text-left">
                  <Sparkles className="mr-2 h-5 w-5 text-yellow-400 flex-shrink-0" />
                  <span className="text-sm">Yes! we have a perfect menu for you!</span>
                </div>
                <span className="text-xs font-normal text-muted-foreground hidden sm:inline ml-2">(2 match tags)</span>
              </div>
            </Button>
            <Button
              onClick={() => handleAction(onServePartialMatch)}
              variant="secondary"
              className={cn("w-full h-auto py-2 px-3", currentCustomerIndex === 0 && !hasActed && "animate-pulse")}
              disabled={hasActed}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center text-left">
                  <Smile className="mr-2 h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-sm">Currently we only have menu that partially match for you.</span>
                </div>
                <span className="text-xs font-normal text-muted-foreground hidden sm:inline ml-2">(1 match tag)</span>
              </div>
            </Button>
            <Button
              onClick={() => handleAction(onApologize)}
              variant="secondary"
              className={cn("w-full h-auto py-2 px-3", currentCustomerIndex === 0 && !hasActed && "animate-pulse")}
              disabled={hasActed}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center text-left">
                  <Frown className="mr-2 h-5 w-5 text-blue-400 flex-shrink-0" />
                  <span className="text-sm">We are sorry... currently no menu that match to your taste.</span>
                </div>
                <span className="text-xs font-normal text-muted-foreground hidden sm:inline ml-2">(0 match tag)</span>
              </div>
            </Button>
            {round > 1 && (
              <Button
                onClick={() => handleAction(onKickCustomer)}
                variant="destructive"
                className={cn("w-full h-auto py-2 px-3", currentCustomerIndex === 0 && !hasActed && "animate-pulse")}
                disabled={hasActed}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center text-left">
                    <UserX className="mr-2 h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">Please get into the line or get out of here!</span>
                  </div>
                  <span className="text-xs font-normal text-muted-foreground hidden sm:inline ml-2">(cut in line customer)</span>
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