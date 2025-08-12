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
}

export interface Threat {
  name: string;
  eliminates: string[];
}

export type GamePhase = "preparing" | "execution" | "summary" | "victory";

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
  valueItem: string;
  currentThreat: Threat | null;
  customersServed: number;
  availableTenants: Tenant[];
}