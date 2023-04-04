import generateRSS from "./generateRSS.js";
import getFilmsData from "./getFilmsData.js";

Promise.all([generateRSS(), getFilmsData()]);
