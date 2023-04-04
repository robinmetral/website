import { writeFile } from "fs/promises";
import fetch from "node-fetch";

const PUBLIC_DIR = "./public";

export default async function getFilmsData() {
  try {
    const response = await fetch("https://logger.robinmetral.workers.dev/");
    const json = await response.json();
    await writeFile(`${PUBLIC_DIR}/films.json`, JSON.stringify(json), "utf8");
    console.log("Pulled data from GitHub.");
  } catch (error) {
    console.log(error);
  }
}
