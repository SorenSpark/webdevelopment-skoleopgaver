//Løsningen er sat til at læse 100 bytes - ikke nødvendigvis én linje - så der mangler noget..


const fs = require("fs");
const path = "/Users/beast/Library/Mobile Documents/com~apple~CloudDocs/Multimediedesigner/IBA/PBA - Webudvikling/Javascript/Studiegruppe/webdevelopment-skoleopgaver/Maja/tekst.txt";

function tekst() {
    try{
        // 1. Åbn fil ("r" = read)
        let fh = fs.openSync(path, "r");

        // 2. Opret buffer med plads til 100 bytes
        let buffer = Buffer.alloc(100);

        // 3. Læs fra filen ind i bufferen - fs.readSync(fh, buffer, offset, length, position). Her har jeg blot anget 42 bytes, som svarer til den første linje. Men det er selvfølgelig ikke måden...
        fs.readSync(fh, buffer, 0, 42, 0);

        // 4. Udskriv resultatet
        console.log(buffer.toString());

        // 5. Luk filen
        fs.closeSync(fh);

    } catch(err){
        console.log("Noget gik vidst galt");
    }
    }

    tekst();
