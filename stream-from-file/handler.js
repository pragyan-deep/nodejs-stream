const fs = require('fs');
const readline = require('readline');

const getReadLineInterface = (filePath) => {
    const stream = fs.createReadStream(filePath, {encoding: 'utf8'});
    return readline.createInterface({
        input: stream,
        crlfDelay: Infinity
    })
}

module.exports = {getReadLineInterface}