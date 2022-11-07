const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;


async function main() {
    const dirSrc = path.join(__dirname, 'files');
    const dirDst = path.join(__dirname, 'files-copy');
    await syncFolder(dirSrc, dirDst);
}


async function syncFolder(src, dst) {
    await fsPromises.mkdir(dst, { recursive: true });

    const unwantedFiles = await fsPromises.readdir(dst);
    for (const file of unwantedFiles) {
        const pathSrc = path.join(src, file);
        const isFileMissingWithinSrc = await fsPromises.access(pathSrc, fs.constants.F_OK).then(() => false).catch(() => true);
        if (isFileMissingWithinSrc) {
            console.log(`  Removing unwanted dst file: ${file}`);
            await fsPromises.rm(path.join(dst, file));
        }
    }

    const files = await fsPromises.readdir(src);
    for (const file of files) {
        const fileSrc = path.join(src, file);
        const fileDst = path.join(dst, file);
        console.log(`  Copying file: ${file}`);
        await fsPromises.copyFile(fileSrc, fileDst);
    }
};


main();

