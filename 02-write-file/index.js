const { Console } = require('console');
const { on } = require('events');
const fs = require('fs');
const path = require('path');
const readline = require('readline')
let data = ('')

const absPathToTextFile = path.join(__dirname, 'new-file.txt');

const addf = fs.createWriteStream(absPathToTextFile);
addf.write(data, 'utf8');
console.log('Please, input text for new .txt file. Enter exit / ctrl+c for save.');

addf.on('error', function(error) {
    console.log(error);
});

const rl = readline.createInterface({
    input: process.stdin,
});

const stopMassage = () => {
    console.log('Massage saved)');
    process.exit(0);
}

rl.on('line', function(line) {
    if (line === 'exit') stopMassage();
    addf.write(line);
    process.on('SIGINT', () => stopMassage());
});

