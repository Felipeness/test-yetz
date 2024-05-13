import { create } from "zustand";
import { Planet } from "../types/planet";

interface PlanetState {
  planet: Planet | null;
  isLoading: boolean;
}

interface PlanetActions {
  setPlanet: (planet: Planet | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

type PlanetStore = PlanetState & PlanetActions;

const usePlanetStore = create<PlanetStore>((set) => ({
  planet: null,
  isLoading: true,
  setPlanet: (planet) => set({ planet }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default usePlanetStore;
