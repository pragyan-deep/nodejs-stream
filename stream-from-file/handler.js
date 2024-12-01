
import {createReadStream} from "node:fs"
import {createInterface} from "node:readline"

const getReadLineInterface = (filePath) => {
    const stream = createReadStream(filePath, {encoding: 'utf8'});
    return createInterface({
        input: stream,
        crlfDelay: Number.POSITIVE_INFINITY
    })
}

module.exports = {getReadLineInterface}