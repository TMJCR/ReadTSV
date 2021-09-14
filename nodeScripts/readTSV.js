import fs from "fs";
import readLine from "readline";

export default async function readTSVFile(filepath) {
  const extractedData = [];
  const fileStream = fs.createReadStream(filepath);
  const readLineByLine = readLine.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of readLineByLine) {
    const extractedLine = line.split("\t");
    const [seriesName, ...seriesValues] = extractedLine;
    const processedLine = { name: seriesName, values: seriesValues };
    extractedData.push(processedLine);
  }
  // Make sure the top row contains dates
  const [periods, ...extractedDataseries] = extractedData;

  const processedData = extractedDataseries.map((series) => {
    return { ...series, periods: periods.values };
  });

  processedData.push(periods);
}
