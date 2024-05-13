import axios from "axios";
import { Planet } from "../types/planet";
import { Person } from "../types/person";
import { Film } from "../types/films";
import { API_URLS } from "./api";
import { generatePlanetImageUrl } from "../utils/generatePlanetImageUrl";
import { parsePlanetData } from "../utils/parsePlanetData";

async function fetchDetails<T>(url: string): Promise<T> {
  const response = await axios.get<T>(url);
  return response.data;
}

function constructSearchUrl(
  base: string,
  type: "name" | "population",
  value: string
): string {
  return `${base}/planets/?search=${type === "name" ? value : ""}`;
}

export async function fetchPlanets(
  searchType: "name" | "population",
  value: string
): Promise<Planet | null> {
  const url = constructSearchUrl(API_URLS.base, searchType, value);

  try {
    const response = await axios.get<{ results: Planet[] }>(url);
    const planet = parsePlanetData(response.data.results, searchType, value);

    if (!planet) return null;

    const peopleDetails = await Promise.all(
      planet.residents.map((url) => fetchDetails<Person>(url))
    );
    const filmDetails = await Promise.all(
      planet.films.map((url) => fetchDetails<Film>(url))
    );

    return {
      ...planet,
      imageUrl: generatePlanetImageUrl(planet.name),
      residents: peopleDetails.map((person) => person.name),
      films: filmDetails.map((film) => film.title),
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Access Error:", error.response?.data || error.message);
      throw new Error(
        `Erro ao acessar a API: ${error.response?.data || error.message}`
      );
    }
    console.error("Unknown Error:", error);
    throw new Error(
      "Ocorreu um erro desconhecido durante a busca de planetas."
    );
  }
}
