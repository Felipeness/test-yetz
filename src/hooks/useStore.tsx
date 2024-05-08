import create from "zustand";

interface PlanetState {
  planets: string[];
  setPlanets: (planets: string[]) => void;
}

export const useStore = create<PlanetState>((set) => ({
  planets: [],
  setPlanets: (planets) => set({ planets }),
}));
