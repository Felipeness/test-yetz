import { Planet } from "../types/planet";

export function findClosestPopulation(
  planets: Planet[],
  targetPopulation: string | number
): Planet | null {
  return planets.reduce(
    (closest, planet) => {
      const population = parseInt(planet.population, 10);
      if (!isNaN(population)) {
        const diff = Math.abs(population - Number(targetPopulation));
        return diff < (closest.diff ?? Infinity) ? { diff, planet } : closest;
      }
      return closest;
    },
    { planet: null as Planet | null, diff: Infinity }
  ).planet;
}
