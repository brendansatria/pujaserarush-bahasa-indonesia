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

const getReasonInIndonesian = (reason: string) => {
    switch (reason) {
        case "High Value Menu Bonus":
            return "Bonus Menu Bernilai Tinggi";
        case "Trending Tag Bonus":
            return "Bonus Tag Tren";
        case "Threat Impact":
            return "Dampak Ancaman";
        case "Existing High Value Menu":
            return "Menu Bernilai Tinggi yang Ada";
        default:
            return reason;
    }
};

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
            Pengarahan Pra-Ronde
          </DialogTitle>
          <DialogDescription>
            Analisis pilihan Anda untuk ronde ini.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
          {strategicRisk && (
            <div className="space-y-2 rounded-lg border p-3">
              <h4 className="font-semibold flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-purple-500" />
                Penilaian Risk Strategis
              </h4>
              <div className="flex justify-between items-center bg-muted p-2 rounded-md">
                  <p className="font-bold">Total Perubahan Risk:</p>
                  <div className={`flex items-center font-bold text-lg ${strategicRisk.total > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {strategicRisk.total > 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                    {strategicRisk.total > 0 ? '+' : ''}{strategicRisk.total}
                  </div>
              </div>
              <p className={`text-xs text-center font-medium ${strategicRisk.total > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {strategicRisk.total < 0 && "Luar biasa! Pilihan Anda telah menurunkan Risk bisnis Anda."}
                {strategicRisk.total > 0 && "Hati-hati! Pilihan Anda telah meningkatkan Risk bisnis Anda."}
                {strategicRisk.total === 0 && "Pilihan Anda tidak berdampak langsung pada Risk Anda."}
              </p>
              <div className="space-y-1">
                {strategicRisk.breakdown.map((entry, index) => (
                  <div key={index} className="flex justify-between items-center text-sm p-1 bg-muted/50 rounded">
                    <p>{entry.item} <span className="text-xs text-muted-foreground">({getReasonInIndonesian(entry.reason)})</span></p>
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
                Analisis Ancaman: {threat.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                Mengurangi permintaan untuk:{" "}
                {threat.eliminates.map(tag => <Badge key={tag} className="bg-white text-black hover:bg-gray-200">{tag}</Badge>)}
              </p>
              {impactedItems.length > 0 ? (
                <div>
                  <p className="text-sm font-medium">Item Anda yang terdampak:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {impactedItems.map((item) => (
                      <li key={item.name}>{item.name}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-sm text-green-600">
                  Kerja bagus! Tidak ada item Anda yang terdampak langsung oleh ancaman ini.
                </p>
              )}
            </div>
          )}
          <div className="space-y-2 rounded-lg border p-3">
            <h4 className="font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Sinergi Pasar
            </h4>
            <p className="text-sm text-muted-foreground">
              Tag yang sedang tren:{" "}
              {trendingTags.map(tag => {
                const Icon = getTagIcon(tag);
                return <Badge key={tag} variant="secondary"><Icon className="h-3 w-3 mr-1"/>{tag}</Badge>
              })}
            </p>
            {trendingItems.length > 0 ? (
                <div>
                  <p className="text-sm font-medium">Item Anda yang sesuai tren:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {trendingItems.map((item) => (
                      <li key={item.name}>{item.name}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-sm text-yellow-600">
                  Peringatan: Tidak ada item Anda yang cocok dengan tren saat ini.
                </p>
              )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Mulai Kesibukan!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};