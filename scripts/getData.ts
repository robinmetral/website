import { writeFile } from "fs/promises";
import fetch from "node-fetch";

const PUBLIC_DIR = "./public/";

export default async function getData() {
  try {
    const response = await fetch("https://logger.robinmetral.workers.dev/");
    const json = (await response.json()) as Record<string, string | number>[];
    await writeFile(
      `${PUBLIC_DIR}data/films.json`,
      JSON.stringify(json),
      "utf8"
    );
    console.log("Pulled data from GitHub.");
  } catch (error) {
    console.log(error);
  }
}
