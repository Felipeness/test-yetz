import { create } from "zustand";
import { PlanetState } from "../types/planetState";

export const useStore = create<PlanetState>((set) => ({
  planets: [],
  setPlanets: (planets) => set({ planets }),
  addPlanet: (planet) =>
    set((state) => ({
      planets: [...state.planets, planet],
    })),
  removePlanet: (planet) =>
    set((state) => ({
      planets: state.planets.filter((p) => p !== planet),
    })),
}));
