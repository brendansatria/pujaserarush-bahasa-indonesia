import { Tenant } from "@/types/game";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getTagIcon } from "@/utils/tagIcons";
import { useClickSound } from "@/hooks/useClickSound";

interface TenantCardProps {
  tenant: Tenant;
  isSelected: boolean;
  onSelect: () => void;
}

export const TenantCard = ({ tenant, isSelected, onSelect }: TenantCardProps) => {
  const playClickSound = useClickSound();

  const handleClick = () => {
    playClickSound();
    onSelect();
  };

  return (
    <Card
      onClick={handleClick}
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        isSelected ? "border-primary ring-2 ring-primary" : "border-border"
      )}
      style={{ backgroundColor: '#274754' }}
    >
      <CardHeader>
        <CardTitle>{tenant.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tenant.items.map((item) => (
          <div key={item.name} className="p-2 border-l-4 border-secondary rounded">
            <p className="font-semibold">{item.name}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {item.tags.map((tag) => {
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
        ))}
      </CardContent>
    </Card>
  );
};