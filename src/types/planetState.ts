export interface PlanetState {
  planets: string[];
  setPlanets: (planets: string[]) => void;
  addPlanet: (planet: string) => void;
  removePlanet: (planet: string) => void;
}
