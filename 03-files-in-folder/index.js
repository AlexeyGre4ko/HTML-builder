const fs = require('fs');
const path = require('path');

const PathDirFiles = path.join(__dirname, 'secret-folder');

const allNames = fs.readdirSync(PathDirFiles);
allNames.forEach(data => {
    let way = path.join(PathDirFiles, data);

    const allSizes = fs.statSync(way, (err, stats) => {
        if (err) {
          console.error(err)
        }
    });

    const extension = path.extname(way);

    console.log(data.split('.').slice(0, -1).join('.'), '-', `${extension.slice(1)}`.padEnd(2), '-', `${allSizes.size}`.padEnd(1),'bytes');

});
process.exit(0);