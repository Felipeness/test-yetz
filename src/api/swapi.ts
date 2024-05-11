import axios, { AxiosError } from "axios";
import { Planet } from "../types/planet";
import { API_URLS } from "./api";
import { generatePlanetImageUrl } from "../utils/generatePlanetImageUrl";
import { parsePlanetData } from "../utils/parsePlanetData";

export const fetchPlanets = async (
  searchType: "name" | "population",
  value: string
): Promise<Planet | null> => {
  const url = `${API_URLS.base}/planets/?search=${
    searchType === "name" ? value : ""
  }`;
  try {
    const response = await axios.get(url);
    const planet = parsePlanetData(response.data.results, searchType, value);
    return planet
      ? { ...planet, imageUrl: generatePlanetImageUrl(planet.name) }
      : null;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        console.error("API Access Error:", error.response.data);
        throw new Error(`Erro ao acessar a API: ${error.response.data}`);
      }
      console.error("API Access Error:", error.message);
      throw new Error(`Erro ao acessar a API: ${error.message}`);
    }
    console.error("Unknown Error:", error);
    throw new Error(
      "Ocorreu um erro desconhecido durante a busca de planetas."
    );
  }
};
