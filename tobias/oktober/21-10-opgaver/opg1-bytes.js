const fs = require("node:fs");
const sti = "C:/Users/Søren Spark/Desktop/test";

fs.stat(sti, (err, stats)=> {
    if(err){
        console.log('mappen eksistere ikke')
    } else {
        console.log(stats)
        console.log(stats.isDirectory)
        console.log(stats.isFile)
    }
});