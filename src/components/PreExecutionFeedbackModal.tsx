import { Tenant, Threat } from "@/types/game";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, TrendingUp, Lightbulb } from "lucide-react";
import { getTagIcon } from "@/utils/tagIcons";

interface PreExecutionFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  threat: Threat | null;
  trendingTags: string[];
  selectedTenants: Tenant[];
}

export const PreExecutionFeedbackModal = ({
  isOpen,
  onClose,
  threat,
  trendingTags,
  selectedTenants,
}: PreExecutionFeedbackModalProps) => {
  if (!isOpen) return null;

  const allSelectedItems = selectedTenants.flatMap((t) => t.items);

  const impactedItems = threat
    ? allSelectedItems.filter((item) =>
        item.tags.some((tag) => threat.eliminates.includes(tag))
      )
    : [];

  const trendingItems = allSelectedItems.filter((item) =>
    item.tags.some((tag) => trendingTags.includes(tag))
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" />
            Pre-Round Briefing
          </DialogTitle>
          <DialogDescription>
            Here's a quick analysis of your choices for this round.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {threat && (
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Threat Analysis: {threat.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                This threat reduces demand for items with the following tags:{" "}
                {threat.eliminates.map(tag => <Badge key={tag} variant="destructive">{tag}</Badge>)}
              </p>
              {impactedItems.length > 0 ? (
                <div>
                  <p className="text-sm font-medium">Your impacted menu items:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {impactedItems.map((item) => (
                      <li key={item.name}>{item.name}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-sm text-green-600">
                  Good job! None of your selected menu items are directly impacted by this threat.
                </p>
              )}
            </div>
          )}
          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Market Synergy
            </h4>
            <p className="text-sm text-muted-foreground">
              Trending tags for today are:{" "}
              {trendingTags.map(tag => {
                const Icon = getTagIcon(tag);
                return <Badge key={tag}><Icon className="h-3 w-3 mr-1"/>{tag}</Badge>
              })}
            </p>
            {trendingItems.length > 0 ? (
                <div>
                  <p className="text-sm font-medium">Your menu items matching the trend:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {trendingItems.map((item) => (
                      <li key={item.name}>{item.name}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-sm text-yellow-600">
                  Warning: None of your selected menu items match the current trends. This might be a tough round.
                </p>
              )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Start the Rush!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};