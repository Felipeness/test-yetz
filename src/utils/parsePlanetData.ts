import { Planet } from "../types/planet";
import { findClosestPopulation } from "./findClosestPopulation";

export function parsePlanetData(
  planets: Planet[],
  searchType: "name" | "population",
  value: string
): Planet | null {
  const planet =
    searchType === "name" ? planets[0] : findClosestPopulation(planets, value);
  return planet || null;
}
