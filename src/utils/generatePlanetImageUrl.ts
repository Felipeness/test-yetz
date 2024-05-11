import { API_URLS, PLANET_IMAGE_MAP } from "../api/api";

export function generatePlanetImageUrl(planetName: string): string {
  const normalizedPlanetName = planetName.toLowerCase().replace(/\s/g, "_");
  const planetId = PLANET_IMAGE_MAP[planetName];
  return `${API_URLS.imageBase}/planeta_${planetId}_${normalizedPlanetName}.png`;
}
