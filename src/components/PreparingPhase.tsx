import { Tenant, Threat } from "@/types/game";
import { TenantCard } from "./TenantCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";

interface PreparingPhaseProps {
  round: number;
  trendingTags: string[];
  valueItem: string;
  threat: Threat | null;
  availableTenants: Tenant[];
  selectedTenants: Tenant[];
  onSelectTenant: (tenant: Tenant) => void;
  onStartExecution: () => void;
}

export const PreparingPhase = ({
  round,
  trendingTags,
  valueItem,
  threat,
  availableTenants,
  selectedTenants,
  onSelectTenant,
  onStartExecution,
}: PreparingPhaseProps) => {
  const showThreatFeedback = selectedTenants.length === 2;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Round {round}</h2>
        <p className="text-muted-foreground">Prepare your food court for the day!</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🎯 Today's Market Trends</CardTitle>
          <CardDescription>Use these clues to select the best tenants.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold">Trending Tags:</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {trendingTags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Value Menu Item:</h4>
            <p className="text-sm text-muted-foreground">This menu will be in high demand across all rounds.</p>
            <Badge variant="destructive" className="mt-2">{valueItem}</Badge>
          </div>
          <div>
            <h4 className="font-semibold">Threat:</h4>
            <Badge variant="outline" className="mt-2">{threat?.name}</Badge>
          </div>
        </CardContent>
      </Card>

      {showThreatFeedback && threat && (
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>Threat Impact!</AlertTitle>
          <AlertDescription>
            {threat.name} reduces demand for: {threat.eliminates.join(", ")} items.
          </AlertDescription>
        </Alert>
      )}

      <div>
        <h3 className="text-xl font-semibold text-center mb-4">🏪 Select 2 Tenants for Today</h3>
        <div className="grid grid-cols-2 gap-4">
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
          Start Serving Customers!
        </Button>
      </div>
    </div>
  );
};