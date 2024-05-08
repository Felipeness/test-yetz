export interface Planet {
  forEach(arg0: (planet: { population: string }) => void): unknown;
  name: string;
  climate: string;
  terrain: string;
  population: string;
  films: string[];
  residents: string[];
  imageUrl?: string;
}
