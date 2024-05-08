import axios from "axios";
import { Planet } from "../types/planet";

const BASE_URL = "https://swapi.dev/api";
const IMAGE_BASE_URL = "https://cryptospro.com.br/planetas";

export const fetchPlanets = async (
  searchType: "name" | "population",
  value: string
): Promise<Planet | null> => {
  try {
    const url =
      searchType === "name"
        ? `${BASE_URL}/planets/?search=${value}`
        : `${BASE_URL}/planets/`;
    const response = await axios.get(url);
    if (response.data.results.length > 0) {
      const planet =
        searchType === "name"
          ? response.data.results[0]
          : findClosestPopulation(response.data.results, value);
      if (planet) {
        planet.imageUrl = generatePlanetImageUrl(planet.name);
        return planet;
      }
    }
    return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("API Access Error:", error.response || error.message);
    throw new Error("Erro ao acessar a API.");
  }
};

function findClosestPopulation(
  planets: Planet,
  targetPopulation: string | number
) {
  let closest = null;
  let minDiff = Infinity;

  planets.forEach((planet: { population: string }) => {
    const population = parseInt(planet.population, 10);
    if (!isNaN(population)) {
      const diff = Math.abs(population - Number(targetPopulation));
      if (diff < minDiff) {
        minDiff = diff;
        closest = planet;
      }
    }
  });

  return closest;
}

const planetImageMap: { [key: string]: string } = {
  Tatooine: "0000",
  Naboo: "0001",
  Mustafar: "0002",
  Kashyyyk: "0003",
  Hoth: "0004",
  Endor: "0005",
  Dagobah: "0006",
  Coruscant: "0007",
  Bespin: "0008",
  Alderaan: "0009",
};

function generatePlanetImageUrl(planetName: string): string {
  const normalizedPlanetName = planetName.toLowerCase().replace(/\s/g, "_");
  const planetId = planetImageMap[planetName];
  return `${IMAGE_BASE_URL}/planeta_${planetId}_${normalizedPlanetName}.png`;
}
