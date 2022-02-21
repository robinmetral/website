import generateRSS from "./generateRSS.js";
import getData from "./getData.js";

Promise.all([generateRSS(), getData()]);
