import { Tenant, MenuItem } from "@/types/game";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";
import { getTagIcon } from "@/utils/tagIcons";

interface ReferencePhaseProps {
  selectedTenants: Tenant[];
  onStartExecution: () => void;
  playerMenu: MenuItem[];
}

export const ReferencePhase = ({ selectedTenants, onStartExecution, playerMenu }: ReferencePhaseProps) => {
  const allMenuItems = [...playerMenu, ...selectedTenants.flatMap((tenant) => tenant.items)];

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Get Ready to Serve!</h2>
        <p className="text-muted-foreground">Memorize your menu for the upcoming rush.</p>
      </div>

      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>Pro Tip!</AlertTitle>
        <AlertDescription>
          Remember the tags for each menu item. Matching them to customer preferences quickly is the key to a high score!
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Today's Menu</CardTitle>
          <CardDescription>These are the items from your selected tenants.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allMenuItems.map((item) => (
            <div key={item.name} className="p-4 border rounded-lg bg-background shadow-sm">
              <p className="font-semibold text-lg">{item.name}</p>
              <div className="flex flex-wrap gap-2 mt-2">
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

      <div className="text-center">
        <Button onClick={onStartExecution} size="lg">
          Ready!
        </Button>
      </div>
    </div>
  );
};