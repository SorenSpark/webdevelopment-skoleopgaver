const fs = require("fs");
const sti = './30-09-opgaver/tekst.txt';
const data = fs.readFileSync(sti, 'utf8');
function analyse(data) {
    for (let i = 0, cntr = 0; i < data.length; i++) {
        if (data[i].toLowerCase() !==  data[i].toUpperCase()) cntr++;
        console.log('filen indeholder ${cntr} bogstaver');
    }
}
analyse(data);
console.log(data);