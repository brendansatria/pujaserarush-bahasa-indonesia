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
import { AlertCircle, TrendingUp, Lightbulb, ShieldCheck, ArrowUp, ArrowDown } from "lucide-react";
import { getTagIcon } from "@/utils/tagIcons";

interface PreExecutionFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  threat: Threat | null;
  trendingTags: string[];
  selectedTenants: Tenant[];
  strategicRisk: { total: number; breakdown: { item: string; reason: string; value: number }[] } | null;
}

export const PreExecutionFeedbackModal = ({
  isOpen,
  onClose,
  threat,
  trendingTags,
  selectedTenants,
  strategicRisk,
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" />
            Pre-Round Briefing
          </DialogTitle>
          <DialogDescription>
            An analysis of your choices for this round.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
          {strategicRisk && (
            <div className="space-y-2 rounded-lg border p-3">
              <h4 className="font-semibold flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-purple-500" />
                Strategic Risk Assessment
              </h4>
              <div className="flex justify-between items-center bg-muted p-2 rounded-md">
                  <p className="font-bold">Total Risk Change:</p>
                  <div className={`flex items-center font-bold text-lg ${strategicRisk.total > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {strategicRisk.total > 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                    {strategicRisk.total > 0 ? '+' : ''}{strategicRisk.total}
                  </div>
              </div>
              <p className={`text-xs text-center font-medium ${strategicRisk.total > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {strategicRisk.total < 0 && "Excellent! Your choices have lowered your business risk."}
                {strategicRisk.total > 0 && "Heads up! Your choices have increased your business risk."}
                {strategicRisk.total === 0 && "Your choices have no immediate impact on your risk."}
              </p>
              <div className="space-y-1">
                {strategicRisk.breakdown.map((entry, index) => (
                  <div key={index} className="flex justify-between items-center text-sm p-1 bg-muted/50 rounded">
                    <p>{entry.item} <span className="text-xs text-muted-foreground">({entry.reason})</span></p>
                    <span className={`font-medium ${entry.value > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {entry.value > 0 ? '+' : ''}{entry.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {threat && (
            <div className="space-y-2 rounded-lg border p-3">
              <h4 className="font-semibold flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Threat Analysis: {threat.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                Reduces demand for:{" "}
                {threat.eliminates.map(tag => <Badge key={tag} className="bg-white text-black hover:bg-gray-200">{tag}</Badge>)}
              </p>
              {impactedItems.length > 0 ? (
                <div>
                  <p className="text-sm font-medium">Your impacted items:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {impactedItems.map((item) => (
                      <li key={item.name}>{item.name}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-sm text-green-600">
                  Good job! None of your items are directly impacted by this threat.
                </p>
              )}
            </div>
          )}
          <div className="space-y-2 rounded-lg border p-3">
            <h4 className="font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Market Synergy
            </h4>
            <p className="text-sm text-muted-foreground">
              Trending tags:{" "}
              {trendingTags.map(tag => {
                const Icon = getTagIcon(tag);
                return <Badge key={tag} variant="secondary"><Icon className="h-3 w-3 mr-1"/>{tag}</Badge>
              })}
            </p>
            {trendingItems.length > 0 ? (
                <div>
                  <p className="text-sm font-medium">Your items matching the trend:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {trendingItems.map((item) => (
                      <li key={item.name}>{item.name}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-sm text-yellow-600">
                  Warning: None of your items match current trends.
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