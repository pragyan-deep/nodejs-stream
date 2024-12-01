const fs = require('fs');

function generateLargeLogFile(filePath, lines) {
  const stream = fs.createWriteStream(filePath);
  for (let i = 0; i < lines; i++) {
    const isError = Math.random() > 0.8; // Randomly generate error lines ~20% chance
    const logLevel = isError ? 'ERROR' : 'INFO';
    const logMessage = `${logLevel} [${new Date().toISOString()}] This is log message #${i + 1}`;
    stream.write(logMessage + '\n');
  }
  stream.end(() => {
    console.log(`Large log file created at ${filePath}`);
  });
}

// Generate a log file with 1 million lines
generateLargeLogFile('./files/large_server_logs.txt', 1000000);
