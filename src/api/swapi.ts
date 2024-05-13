import axios, { AxiosError } from "axios";
import { Planet } from "../types/planet";
import { Person } from "../types/person";
import { Film } from "../types/films";
import { API_URLS } from "./api";
import { generatePlanetImageUrl } from "../utils/generatePlanetImageUrl";
import { parsePlanetData } from "../utils/parsePlanetData";

async function fetchPersonDetails(url: string): Promise<Person> {
  const response = await axios.get(url);
  return response.data;
}

async function fetchFilmDetails(url: string): Promise<Film> {
  const response = await axios.get(url);
  return response.data;
}

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
    if (planet) {
      const peopleDetails = await Promise.all(
        planet.residents.map((residentUrl) => fetchPersonDetails(residentUrl))
      );
      const filmDetails = await Promise.all(
        planet.films.map((filmUrl) => fetchFilmDetails(filmUrl))
      );
      return {
        ...planet,
        imageUrl: generatePlanetImageUrl(planet.name),
        residents: peopleDetails.map((person) => person.name),
        films: filmDetails.map((film) => film.title),
      };
    }
    return null;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("API Access Error:", error.message);
      throw new Error(`Erro ao acessar a API: ${error.message}`);
    }
    console.error("Unknown Error:", error);
    throw new Error(
      "Ocorreu um erro desconhecido durante a busca de planetas."
    );
  }
};
