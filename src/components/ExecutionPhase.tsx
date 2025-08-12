import { GameState, MenuItem } from "@/types/game";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getTagIcon } from "@/utils/tagIcons";
import { TimerIcon } from "lucide-react";

interface ExecutionPhaseProps {
  gameState: GameState;
  onServeItem: (item: MenuItem) => void;
}

export const ExecutionPhase = ({ gameState, onServeItem }: ExecutionPhaseProps) => {
  const {
    timer,
    customers,
    currentCustomerIndex,
    selectedTenants,
    customersServed,
    currentThreat,
  } = gameState;

  const currentCustomer = customers[currentCustomerIndex];
  const allMenuItems = selectedTenants.flatMap((tenant) => tenant.items);

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
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-xl font-bold">
          <TimerIcon className="h-6 w-6" />
          <span>Time Left: {timer}s</span>
        </div>
        <div className="w-1/3">
          <Progress value={(customersServed / customers.length) * 100} />
          <p className="text-sm text-center text-muted-foreground mt-1">
            {customersServed} / {customers.length} Customers Served
          </p>
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle>Next in Line: {currentCustomer.name}</CardTitle>
          <CardDescription>They are looking for something with these qualities:</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {currentCustomer.preferences.map((pref) => {
              const Icon = getTagIcon(pref);
              return (
                <Badge key={pref} variant="default" className="text-base p-2">
                  <Icon className="mr-2 h-4 w-4" />
                  {pref}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Menu</CardTitle>
          <CardDescription>Select an item to serve to the customer.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allMenuItems.map((item) => {
            const isEliminated = currentThreat && item.tags.some(tag => currentThreat.eliminates.includes(tag));
            return (
              <Button
                key={item.name}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start text-left"
                onClick={() => onServeItem(item)}
                disabled={isEliminated}
              >
                <p className="font-bold text-base">{item.name}</p>
                {isEliminated && <p className="text-xs text-destructive">(Unavailable due to {currentThreat?.name})</p>}
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
              </Button>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};