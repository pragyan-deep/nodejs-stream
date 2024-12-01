const fs = require("fs");
const zlib = require("zlib");

const inputFile = fs.createReadStream("./files/large_server_logs.txt");

const outputFile = fs.createWriteStream(
  "./files/large_server_logs_compress.txt.gz"
);

const gzlib = zlib.createGzip();

inputFile
  .pipe(gzlib)
  .pipe(outputFile)
  .on("finish", () => {
    console.log("File has been compressed successfully!");
  })
  .on("error", (err) => {
    console.error("Error occurred:", err);
  });
