import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Requirement {
  id: string;
  productType: string;
  packagingType: string;
  quantity: number;
  budget: number;
  material: string;
  location: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  text: string;
  date: string;
}

export interface AppState {
  isDemoMode: boolean;
  userOrders: number;
  currentPackaging: string;
  currentCostPerOrder: number;
  
  joinedGroupBuys: Record<string, number>; // groupBuyId -> quantity
  requirements: Requirement[];
  activities: Activity[];
  comparisonList: string[]; // product ids

  setDemoMode: (active: boolean) => void;
  resetDemo: () => void;
  joinGroupBuy: (id: string, quantity: number) => void;
  addRequirement: (req: Requirement) => void;
  addActivity: (text: string) => void;
  addToComparison: (productId: string) => void;
  removeFromComparison: (productId: string) => void;
  updateBaseStats: (orders: number, cost: number, packaging: string) => void;
}

const defaultState = {
  isDemoMode: false,
  userOrders: 500,
  currentPackaging: "Plastic packaging",
  currentCostPerOrder: 8.00,
  joinedGroupBuys: {},
  requirements: [],
  activities: [],
  comparisonList: [],
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...defaultState,

      setDemoMode: (active) => set({ isDemoMode: active }),
      resetDemo: () => set({ ...defaultState, isDemoMode: false }),

      joinGroupBuy: (id, quantity) => {
        set((state) => ({
          joinedGroupBuys: { ...state.joinedGroupBuys, [id]: quantity },
        }));
        get().addActivity(`Joined Group Buy for ${quantity} units`);
      },

      addRequirement: (req) => {
        set((state) => ({
          requirements: [req, ...state.requirements],
        }));
        get().addActivity(`Created Requirement for ${req.packagingType}`);
      },

      addActivity: (text) => set((state) => ({
        activities: [{ id: Date.now().toString(), text, date: new Date().toISOString() }, ...state.activities].slice(0, 10),
      })),

      addToComparison: (productId) => set((state) => {
        if (state.comparisonList.length >= 3 || state.comparisonList.includes(productId)) {
          return state;
        }
        return { comparisonList: [...state.comparisonList, productId] };
      }),

      removeFromComparison: (productId) => set((state) => ({
        comparisonList: state.comparisonList.filter(id => id !== productId),
      })),

      updateBaseStats: (orders, cost, packaging) => set({
        userOrders: orders,
        currentCostPerOrder: cost,
        currentPackaging: packaging,
      }),
    }),
    {
      name: 'packloop-storage',
    }
  )
);
