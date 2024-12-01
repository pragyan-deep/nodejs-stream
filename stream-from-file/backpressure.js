import { createReadStream, createWriteStream } from "node:fs";

const inputStream = createReadStream("./files/large_server_logs.txt");

const outputStream = createWriteStream("./files/output.txt");

inputStream.on("data", (chunk) => {

    const canWriteMore = outputStream.write(chunk);

    if(!canWriteMore) inputStream.pause();
});

outputStream.on("drain", () => {
    inputStream.resume();
})
