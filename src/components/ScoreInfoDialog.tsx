import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface ScoreInfoDialogProps {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
}

export const ScoreInfoDialog = ({ title, description, icon }: ScoreInfoDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6 cursor-pointer">
          <Info className="h-4 w-4 text-muted-foreground hover:text-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
            <div className="flex items-center gap-4">
                <div className="text-3xl">{icon}</div>
                <div>
                    <DialogTitle className="text-2xl">{title}</DialogTitle>
                </div>
            </div>
        </DialogHeader>
        <div className="py-4 text-sm text-muted-foreground">
            {description}
        </div>
      </DialogContent>
    </Dialog>
  );
};