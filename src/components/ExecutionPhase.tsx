import { useState, useEffect } from "react";
import { GameState } from "@/types/game";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getTagIcon } from "@/utils/tagIcons";
import { TimerIcon, Sparkles, Smile, Frown, UserX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClickSound } from "@/hooks/useClickSound";

interface ExecutionPhaseProps {
  gameState: GameState;
  onServeBestMatch: () => void;
  onServePartialMatch: () => void;
  onApologize: () => void;
  onKickCustomer: () => void;
}

export const ExecutionPhase = ({
  gameState,
  onServeBestMatch,
  onServePartialMatch,
  onApologize,
  onKickCustomer,
}: ExecutionPhaseProps) => {
  const {
    round,
    timer,
    customers,
    currentCustomerIndex,
    selectedTenants,
    customersServed,
    playerMenu,
  } = gameState;

  const [hasActed, setHasActed] = useState(false);
  const playClickSound = useClickSound();

  useEffect(() => {
    setHasActed(false);
  }, [currentCustomerIndex]);

  const handleAction = (action: () => void) => {
    if (hasActed) return;
    playClickSound();
    setHasActed(true);
    // Add a small delay so the user can see the button state change before the next customer appears
    setTimeout(() => {
      action();
    }, 300);
  };

  const currentCustomer = customers[currentCustomerIndex];
  const allMenuItems = [...playerMenu, ...selectedTenants.flatMap((tenant) => tenant.items)];

  if (!currentCustomer) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold">Semua pelanggan telah dilayani hari ini!</h2>
        <p>Menghitung hasil...</p>
      </div>
    );
  }

  const [customerName, customerType] = currentCustomer.name.split(" - ");
  const customerImage = currentCustomer.gender === 'female' ? '/customer_b.png' : '/customer_a.png';

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
        <div
          className={cn(
            "flex items-center gap-3 text-2xl sm:text-4xl font-bold",
            timer <= 10 && "text-destructive"
          )}
        >
          <TimerIcon className="h-7 w-7 sm:h-9 sm:w-9 animate-pulse" />
          <span>{timer}s</span>
        </div>
        <div className="w-full sm:w-2/5">
          <Progress value={(customersServed / customers.length) * 100} />
          <p className="text-xs text-center text-muted-foreground mt-1">
            {customersServed} / {customers.length} Pelanggan Dilayani
          </p>
        </div>
      </div>

      <Card className="bg-accent text-accent-foreground border-accent/30 relative overflow-hidden flex items-center" style={{ backgroundColor: '#2A9D90' }}>
        <div className="flex-shrink-0 pl-2">
          <img src={customerImage} alt="Customer" className="h-32 w-auto" />
        </div>
        <div className="flex-grow p-4">
          <p className="text-sm text-accent-foreground/80">Berikutnya dalam antrean:</p>
          <h3 className="text-xl font-bold text-accent-foreground">{customerName} - {customerType}</h3>
          <p className="text-accent-foreground/80 pt-2">Sarankan menu untuk saya dengan kualitas seperti ini:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {currentCustomer.preferences.map((pref) => {
              const Icon = getTagIcon(pref);
              return (
                <Badge key={pref} variant="secondary" className="text-sm px-2 py-1">
                  <Icon className="mr-1 h-3 w-3" />
                  {pref}
                </Badge>
              );
            })}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pilih Tindakan Anda</CardTitle>
            <CardDescription>Pilih tindakan untuk pelanggan ini.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-3">
            <Button
              onClick={() => handleAction(onServeBestMatch)}
              className="w-full h-20 py-2 px-3 bg-[#2A9D90] text-accent-foreground hover:bg-[#248a7f] active:bg-[#207c72]"
              disabled={hasActed}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full h-full text-left">
                <div className="flex items-start min-w-0">
                  <Sparkles className="mr-2 h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Tentu! Kami punya menu seperti
                    <br />
                    yang anda inginkan!
                  </span>
                </div>
                <span className="text-xs font-normal text-muted-foreground self-start sm:self-center flex-shrink-0 pl-7 sm:pl-0">(2 tag cocok)</span>
              </div>
            </Button>
            <Button
              onClick={() => handleAction(onServePartialMatch)}
              className="w-full h-20 py-2 px-3 bg-[#2A9D90] text-accent-foreground hover:bg-[#248a7f] active:bg-[#207c72]"
              disabled={hasActed}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full h-full text-left">
                <div className="flex items-start min-w-0">
                  <Smile className="mr-2 h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Mungkin Anda bisa coba menu
                    <br />
                    lain yang mirip selera Anda.
                  </span>
                </div>
                <span className="text-xs font-normal text-muted-foreground self-start sm:self-center flex-shrink-0 pl-7 sm:pl-0">(1 tag cocok)</span>
              </div>
            </Button>
            <Button
              onClick={() => handleAction(onApologize)}
              className="w-full h-20 py-2 px-3 bg-[#2A9D90] text-accent-foreground hover:bg-[#248a7f] active:bg-[#207c72]"
              disabled={hasActed}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full h-full text-left">
                <div className="flex items-start min-w-0">
                  <Frown className="mr-2 h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Maaf... kami tidak punya menu
                    <br />
                    yang sesuai selera Anda saat ini.
                  </span>
                </div>
                <span className="text-xs font-normal text-muted-foreground self-start sm:self-center flex-shrink-0 pl-7 sm:pl-0">(0 tag cocok)</span>
              </div>
            </Button>
            {round > 1 && (
              <Button
                onClick={() => handleAction(onKickCustomer)}
                variant="destructive"
                className="w-full h-20 py-2 px-3"
                disabled={hasActed}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full h-full text-left">
                  <div className="flex items-start min-w-0">
                    <UserX className="mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      Silakan antre atau
                      <br />
                      keluar dari sini!
                    </span>
                  </div>
                  <span className="text-xs font-normal text-muted-foreground self-start sm:self-center flex-shrink-0 pl-7 sm:pl-0">(pelanggan menyerobot antrean)</span>
                </div>
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Referensi Menu</CardTitle>
            <CardDescription>Item Menu yang tersedia.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 max-h-60 overflow-y-auto pr-3">
            {allMenuItems.map((item) => (
              <div key={item.name} className="p-3 border rounded-lg bg-background">
                <p className="font-semibold">{item.name}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.map((tag, index) => {
                    const Icon = getTagIcon(tag);
                    let tagText = tag;

                    if (round === 2 || round === 3) {
                      if (index === 1) {
                        tagText = "???";
                      }
                    } else if (round === 4) {
                      tagText = "???";
                    }

                    return (
                      <Badge key={`${tag}-${index}`} variant="secondary" className="font-normal">
                        <Icon className="mr-1 h-3 w-3" />
                        {tagText}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};