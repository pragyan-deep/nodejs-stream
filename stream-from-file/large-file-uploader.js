import { createServer } from "node:http";
import { createReadStream, createWriteStream, mkdirSync } from "node:fs";
import multer from "multer";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const upload = multer({ dest: "./files/" });

const server = createServer((req, res) => {
  if (req.method === "POST") {
    upload.single("file")(req, res, (err) => {
      if (err) {
        res.statusCode = 500;
        res.end("Error uploading file.");
        return;
      }

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);

      const uploadedFilePath = req.file.path;
      const destinationDir = join(__dirname, "..", "files");

      // Make sure the destination directory exists
      mkdirSync(destinationDir, { recursive: true });

      const destinationFilePath = join(destinationDir, req.file.originalname);

      const readableStream = createReadStream(uploadedFilePath);
      const writableStream = createWriteStream(destinationFilePath);

      readableStream.pipe(writableStream);

      readableStream.on("error", (error) => {
        console.error("Error while reading file:", error);
        res.statusCode = 500;
        res.end("Error reading file.");
      });

      writableStream.on("finish", () => {
        res.statusCode = 200;
        res.end("File uploaded and saved!");
      });

      writableStream.on("error", (error) => {
        console.error("Error while writing file:", error);
        res.statusCode = 500;
        res.end("Error saving file.");
      });
    });
  } else {
    res.statusCode = 405;
    res.end("Method Not Allowed");
  }
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
