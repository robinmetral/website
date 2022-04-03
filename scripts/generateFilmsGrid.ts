import { cwd } from "process";
import { readFile } from "fs/promises";

type Film = {
  /**
   * TMDB movie ID
   */
  tmdbId: string;
  /**
   * The movie's English language name
   */
  title: string;
  /**
   * A summary of the film's synopsis
   */
  summary: string;
  /**
   * The movie's release date as an ISO date string
   */
  releaseDate: string;
  /**
   * Original language code
   */
  language: string;
  /**
   * Array of production countries in ISO 3166-1
   */
  countries: string[];
  /**
   * Array of genres
   */
  genres: string[];
  /**
   * Array of genres
   */
  keywords: string[];
  /**
   * Array of directors
   */
  directors: string;
  /**
   * Poster URL on TMDB
   */
  posterUrl: string;
  /**
   * Watch date as ISO date string
   */
  watchDate: string;
  /**
   * Rating between 1 and 10, as a string
   */
  rating: string;
  /**
   * Review URL
   */
  reviewUrl: string;
};

async function getFilms(): Promise<Film[]> {
  const file = await readFile(`${cwd()}/public/films.json`, "utf-8");
  return JSON.parse(file);
}

export async function buildPage(html: string): Promise<string> {
  try {
    const films = await getFilms();
    const filmsHtml = films
      .sort(
        (a, b) =>
          new Date(b.watchDate).getTime() - new Date(a.watchDate).getTime()
      )
      .map(
        (film) =>
          `<li>
            <img src="${film.posterUrl}" width="250" height="375" alt="" loading="lazy" />
            ${film.title}
          </li>`
      )
      .join("");
    return html.replace("<li>Films grid</li>", filmsHtml);
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
