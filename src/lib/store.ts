import { create } from 'zustand';
type Store = { symbol: string; setSymbol: (s: string) => void };
export const useStore = create<Store>(set => ({
    symbol: 'AAPL',
    setSymbol: (s) => set({ symbol: s })
}));