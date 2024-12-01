const fs = require('fs');
const mysql = require('mysql2');
const csv = require('csv-parser');
const { Transform } = require('stream');

// Create a connection pool for MySQL to reuse connections
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password', // Replace with your MySQL root password
  database: 'db_master_node', // Use your database name
});

// Create a stream that reads from the CSV and processes data in batches
const processCSVStream = new Transform({
  objectMode: true, // Process data as objects
  transform(chunk, encoding, callback) {
    console.log(chunk)
    // Transform and validate data (if needed)
    const transformedData = {
      name: chunk.name.trim(), // Assuming the CSV has a `name` column
    };

    // Add the transformed data to a batch
    this.batch.push(transformedData);

    // If batch reaches 1000, insert into DB and reset batch
    if (this.batch.length >= 1000) {
      this.insertBatch(callback);
    } else {
      callback();
    }
  },
  flush(callback) {
    // Insert any remaining data in the batch when the stream finishes
    if (this.batch.length > 0) {
      this.insertBatch(callback);
    } else {
      callback();
    }
  }
});

// Add an empty array to hold the batch of data
processCSVStream.batch = [];

// Add a method to insert the batch into the database
processCSVStream.insertBatch = function (callback) {
  const values = this.batch.map(item => [item.name]);
//   const query = 'INSERT INTO users (name) VALUES ?';
  const query = 'SELECT * FROM users';

  pool.query(query, [values], (err, results) => {
    if (err) {
      callback(err); // Handle database errors
      return;
    }

    // Clear the batch after successful insertion
    this.batch.length = 0;
    callback();
  });
};

// Create a readable stream from the CSV file
const inputFile = fs.createReadStream('./files/data.csv')
  .pipe(csv()) // Parse CSV data
  .pipe(processCSVStream); // Process data through the stream

// Handle stream events
inputFile.on('finish', () => {
  console.log('CSV file has been processed and data inserted into DB');
  pool.end(); // Close the MySQL pool
});

inputFile.on('error', (err) => {
  console.error('Error during processing:', err);
  pool.end();
});
