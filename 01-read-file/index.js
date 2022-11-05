const fs = require('fs');
const path = require('path');
let data = '';

const absPathToTextFile = path.join(__dirname, 'text.txt');
//console.log(absPathToTextFile); process.exit(0);
const readf = fs.createReadStream(absPathToTextFile, {encoding: 'utf8'});

readf.on('data', function(chunk) {
    data += chunk;
});

readf.on('end', function() {
    console.log(data);
});

readf.on('error', function(error) {
    console.log(error);
});