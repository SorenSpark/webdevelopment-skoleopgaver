const fs = require("node:fs");
const path = require("node:path")
const dirPath = "C:/Users/Søren Spark/Desktop/test/";

const getDirSize = (dir) => {
    let size = 0;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
            size += stats.size;
        } else if (stats.isDirectory()){
            size += getDirSize(filePath);
        }
    }
    return size;
};

const total = getDirSize(dirPath);
console.log(total + ' bytes')

/* fs.stat(dirPath, (err, stats)=> {
    if(err){
        console.log('mappen eksistere ikke');
    } else {
        console.log(stats.size + ' bytes');
    }
}); */