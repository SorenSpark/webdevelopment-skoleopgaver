const fs = require('fs');
let totalbytes = 0;
function getFileSize(){
    fs.readdir(__dirname, (err, files) => {
        if (err)
            console.log(err);
        else {
            files.forEach(file => {
                let s = fs.statSync(__dirname+"/"+file);
               totalbytes += s.size;
            })
            console.log(totalbytes + " bytes");
            console.log(__dirname);
        }
    })
}
 
getFileSize();