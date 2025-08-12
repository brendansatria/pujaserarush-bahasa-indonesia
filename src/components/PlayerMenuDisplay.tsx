import { MenuItem } from "@/types/game";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getTagIcon } from "@/utils/tagIcons";
import { ChevronsUpDown, BookMarked } from "lucide-react";

interface PlayerMenuDisplayProps {
  menu: MenuItem[];
}

export const PlayerMenuDisplay = ({ menu }: PlayerMenuDisplayProps) => {
  if (menu.length === 0) return null;

  return (
    <Collapsible className="w-full space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center">
            <BookMarked className="mr-2 h-4 w-4" />
            View Your Current Menu ({menu.length} items)
          </div>
          <ChevronsUpDown className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 p-4 border rounded-lg max-h-60 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {menu.map((item) => (
            <div key={item.name} className="p-2 border-l-4 border-secondary rounded bg-background">
              <p className="font-semibold">{item.name}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {item.tags.map((tag) => {
                  const Icon = getTagIcon(tag);
                  return (
                    <Badge key={tag} variant="secondary" className="flex items-center font-normal">
                      <Icon className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};