import { createWriteStream } from "node:fs";

// Helper function to generate a random name
const getRandomName = () => {
  const firstNames = ['John', 'Jane', 'Alex', 'Chris', 'Emily', 'Michael', 'Sarah', 'David', 'Laura', 'Robert'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${firstName} ${lastName}`;
};

// Function to generate CSV data
const generateCSV = (filename, recordCount) => {
  const writeStream = createWriteStream(filename);

  // Write CSV header
  writeStream.write('name\n');

  let recordsGenerated = 0;

  const writeRecords = () => {
    let ok = true;
    while (recordsGenerated < recordCount && ok) {
      const name = getRandomName();
      const data = `${name}\n`;

      // Write data to the file
      ok = writeStream.write(data);
      recordsGenerated += 1;
    }

    if (recordsGenerated < recordCount) {
      writeStream.once('drain', writeRecords); // Wait for the stream to drain
    } else {
      writeStream.end(); // End the stream once all records are written
    }
  };

  writeRecords();

  writeStream.on('finish', () => {
    console.log(`${recordCount} records written to ${filename}`);
  });

  writeStream.on('error', (err) => {
    console.error('Error writing file:', err);
  });
};

// Generate 1 million records
generateCSV('./files/data.csv', 1000000);
