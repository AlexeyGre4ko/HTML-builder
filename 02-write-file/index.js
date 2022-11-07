const { Console } = require('console');
const { on } = require('events');
const fs = require('fs');
const path = require('path');
const readline = require('readline')
let data = ('')

const absPathToTextFile = path.join(__dirname, 'new-file.txt');

const addf = fs.createWriteStream(absPathToTextFile);
addf.write(data, 'utf8');
console.log('Please, input text for new .txt file. Enter exit for stop.');

addf.on('error', function(error) {
    console.log(error);
});

const rl = readline.createInterface({
    input: process.stdin,
});
rl.on('line', function(line) {
    if (line === 'exit') process.exit(0);
    addf.write(line);
});

