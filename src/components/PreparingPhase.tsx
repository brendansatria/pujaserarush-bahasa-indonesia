import { Tenant, Threat, MenuItem } from "@/types/game";
import { TenantCard } from "./TenantCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Users, ChevronsUpDown } from "lucide-react";
import { getTagIcon } from "@/utils/tagIcons";
import { PlayerMenuDisplay } from "./PlayerMenuDisplay";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface PreparingPhaseProps {
  round: number;
  trendingTags: string[];
  valueItems: string[];
  threat: Threat | null;
  availableTenants: Tenant[];
  selectedTenants: Tenant[];
  onSelectTenant: (tenant: Tenant) => void;
  onStartExecution: () => void;
  playerMenu: MenuItem[];
  lineCutters: string[];
}

export const PreparingPhase = ({
  round,
  trendingTags,
  valueItems,
  threat,
  availableTenants,
  selectedTenants,
  onSelectTenant,
  onStartExecution,
  playerMenu,
  lineCutters,
}: PreparingPhaseProps) => {
  const [isMarketOpen, setIsMarketOpen] = useState(true);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Round {round}</h2>
        <p className="text-muted-foreground">Prepare your food court for the day!</p>
      </div>

      <Collapsible open={isMarketOpen} onOpenChange={setIsMarketOpen}>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="flex flex-row items-center justify-between cursor-pointer">
              <div className="text-left">
                <CardTitle>🎯 Today's Market Trends</CardTitle>
                <CardDescription>Use these clues to select the best tenants.</CardDescription>
              </div>
              <ChevronsUpDown className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Trending Tags:</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {trendingTags.map((tag) => {
                    const Icon = getTagIcon(tag);
                    return (
                      <Badge key={tag} variant="secondary" className="flex items-center">
                        <Icon className="mr-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    );
                  })}
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Threat:</h4>
                <Badge variant="outline" className="mt-2 mb-1">{threat?.name}</Badge>
                <p className="text-sm text-muted-foreground">{threat?.description}</p>
              </div>
              <div>
                <h4 className="font-semibold">High Value Menu:</h4>
                <p className="text-sm text-muted-foreground">These menu items will be in high demand across all rounds.</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {valueItems.map((item) => (
                    <Badge key={item} variant="destructive">{item}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {round > 1 && lineCutters.length > 0 && (
        <Alert variant="destructive">
          <Users className="h-4 w-4" />
          <AlertTitle>Watch Out for Line-Cutters!</AlertTitle>
          <AlertDescription>
            The following customers will try to cut in line. Remember their names and choose to 'Kick' them to maintain order!
            <div className="flex flex-wrap gap-2 mt-2">
              {lineCutters.map(name => (
                <Badge key={name} variant="secondary">{name}</Badge>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      <PlayerMenuDisplay menu={playerMenu} />

      <div>
        <h3 className="text-xl font-semibold text-center mb-4">
          {round === 1 ? "🏪 Select 2 Tenants For Join Your Pujasera" : "➕ Select 2 New Items for your Menu"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {availableTenants.map((tenant) => (
            <TenantCard
              key={tenant.name}
              tenant={tenant}
              isSelected={selectedTenants.some(t => t.name === tenant.name)}
              onSelect={() => onSelectTenant(tenant)}
            />
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button
          onClick={onStartExecution}
          disabled={selectedTenants.length !== 2}
          size="lg"
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};