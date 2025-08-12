export interface MenuItem {
  name: string;
  tags: string[];
}

export interface Tenant {
  name: string;
  items: MenuItem[];
}

export interface Customer {
  name: string;
  preferences: string[];
  served?: boolean;
  isLineCutter?: boolean;
}

export interface Threat {
  name: string;
  description: string;
  eliminates: string[];
}

export type GamePhase = "preparing" | "reference" | "execution" | "summary" | "victory";

export interface GameState {
  round: number;
  profit: number;
  risk: number;
  satisfaction: number;
  phase: GamePhase;
  selectedTenants: Tenant[];
  currentCustomerIndex: number;
  customers: Customer[];
  timer: number;
  trendingTags: string[];
  valueItems: string[];
  currentThreat: Threat | null;
  customersServed: number;
  availableTenants: Tenant[];
  playerMenu: MenuItem[];
  lineCutters: string[];
  usedThreats: string[];
}