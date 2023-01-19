import generateRSS from "./generateRSS.js";
import getData from "./getData.js";
import generateCategoryPages from "./generateCategoryPages.js";

Promise.all([generateRSS(), getData(), generateCategoryPages()]);
