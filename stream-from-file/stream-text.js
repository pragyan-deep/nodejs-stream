// const { getReadLineInterface } = require("./handler");

// const rl = getReadLineInterface("./files/large_server_logs.txt")

// rl.on('line', (line) => {
//     if (line.includes("ERROR")) {
//       // Process the error line (e.g., print, save, etc.)
//     //   console.log(line);
//     }
//   });

// rl.on('close', () => {
//     console.log('File processing complete');
// });

// rl.on('error', (err) => {
//     console.error('Error reading the file:', err);
// });

const fs = require('fs');

function processLargeFile(filePath) {
  try {
    // Read the entire file into memory
    const data = fs.readFileSync(filePath, 'utf8');
    
    // Split the file into lines
    const lines = data.split('\n');
    
    // Process each line
    lines.forEach((line) => {
      if (line.includes("ERROR")) {
        // Process the error line (e.g., print, save, etc.)
        console.log(line);
      }
    });

    console.log('File processing complete.');
  } catch (err) {
    console.error('Error reading the file:', err);
  }
}

// Example: Call the function with your log file
processLargeFile('./files/large_server_logs.txt');
