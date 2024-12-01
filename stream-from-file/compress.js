import { createReadStream, createWriteStream } from "node:fs";
import { createGzip } from "node:zlib";

const inputFile = createReadStream("./files/large_server_logs.txt");

const outputFile = createWriteStream(
  "./files/large_server_logs_compress.txt.gz"
);

const gzlib = createGzip();

inputFile
  .pipe(gzlib)
  .pipe(outputFile)
  .on("finish", () => {
    console.log("File has been compressed successfully!");
  })
  .on("error", (err) => {
    console.error("Error occurred:", err);
  });
