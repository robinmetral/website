import { cwd } from "process";
import { readFile } from "fs/promises";

/**
 * @typedef {Object} Film Note: this type might have too be updated, use with caution
 *
 * @property {string} tmdbId TMDB movie ID
 * @property {string} title The movie's English language name
 * @property {string} summary A summary of the film's synopsis
 * @property {string} releaseDate The movie's release date as an ISO date string
 * @property {string} language Original language code
 * @property {string[]} countries Array of production countries in ISO 3166-1
 * @property {string[]} genres Array of genres
 * @property {string[]} keywords Array of keywords
 * @property {string[]} directors Array of directors
 * @property {string} posterUrl Poster URL on TMDB
 * @property {string} watchDate Watch date as ISO date string
 * @property {string} rating Rating between 1 and 10, as a string
 * @property {string} reviewUrl Review URL
 */

/**
 * @returns {Promise<Film[]>} An array of films
 */
async function getFilms() {
  const file = await readFile(`${cwd()}/public/films.json`, "utf-8");
  return JSON.parse(file);
}

/**
 *
 * @param {string} html Original page HTML
 * @returns {Promise<string>} Processed HTML
 */
export async function buildPage(html) {
  try {
    const films = await getFilms();
    const filmsHtml = films
      .sort(
        (a, b) =>
          new Date(b.watchDate).getTime() - new Date(a.watchDate).getTime()
      )
      .map(
        (film) => `<li>
          <span class="film-name">${film.title}</span>
          <div class="film-poster">
            <img src="${film.posterUrl}" width="250" height="375" alt="" loading="lazy" />
            <div><span class="sr-only">Rating: </span>${film.rating}</div>
          </div>
        </li>`
      )
      .join("");
    return html.replace("<li>Films grid</li>", filmsHtml);
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
