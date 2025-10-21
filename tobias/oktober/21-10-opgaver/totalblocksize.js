const fs = require("fs");
let totalSize = 0, totalBlockSize = 0, kildeDir = (__dirname);
let elementer = fs.readdirSync(kildeDir);
for (element of elementer) {
    let s = fs.statSync(kildeDir + "\\" + element);
    if (s.isFile) {
        totalSize += s.size;
        let block = Math.ceil(s.size/s.blksize);
        totalBlockSize += block+s.blksize;
    }
}

console.log(`Filerne i ${kildeDir} har en samlet størrelse på ${totalSize} bytes.`);
console.log(`Samlet blokstørrelse (afrundet til blksize): ${totalBlockSize} bytes.`);