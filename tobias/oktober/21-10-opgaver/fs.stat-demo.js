const fs = require("node:fs");
const path = "C:/Users/Søren Spark/Desktop/test/"
let s = fs.statSync(path);
for (let o in s) console.log(o, s[o]);