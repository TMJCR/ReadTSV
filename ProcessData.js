import readTSVFile from "./nodeScripts/readTSV.js";
const filepath = `${process.cwd()}/Data.tsv`;

const test = readTSVFile(filepath).then((data) => console.log("DATA", data));
