// Importerer Node.js' indbyggede http-modul (bruges til at lave en webserver)
// Sætter port og hostname for serveren
const http = require("http"),
      port = 3000,
      hostname = "127.0.0.1";

// Importerer filsystem-modulet, så vi kan læse HTML-filer fra computeren
const fs = require("fs");

// Opretter selve server-objektet
const server = http.createServer();

// En variabel der indeholder værdien, vi gemmer i en cookie
const kage = "kage";

// Fortæller serveren hvad der skal ske, når der kommer en request
server.on("request", callback);

// Starter serveren og lytter på den angivne port og adresse
server.listen(port, hostname, function () {
  console.log("Lokalserveren kører");
});

// Callback-funktionen kører hver gang en bruger laver en request
function callback(request, response) {

  // Finder filnavnet ud fra URL'en (fx /om → "om")
  let filnavn = sti(request.url);
  console.log(filnavn);

  // Stien til mappen hvor HTML-filerne ligger
  let filMappe = "C:/Users/Søren Spark/OneDrive/Dokumenter/javascript/oktober/07-10-opgaver/";
  // Denne sti skal ændres afhængigt af hvor dine filer ligger

  // Hvis brugeren går til "/", bruges index.html
  if (filnavn === "") filnavn = "index";

  // Vælger handling baseret på hvilket filnavn der blev fundet
  switch (filnavn) {

    case "index": {
      // Sætter en cookie i browseren
      response.setHeader("Set-Cookie", [`kage=${kage}; path=/`]);

      // Læser index.html og gemmer indholdet i variablen t
      t = fs.readFileSync(filMappe + filnavn + ".html", "utf-8");
      break;
    }

    // "farvel" og "om" deler samme kode
    case "farvel":
    case "om": {

      // Tjekker om brugeren har den rigtige cookie
      if (request.headers.cookie === `kage=${kage}`) {
        // Hvis ja → vis HTML-filen
        t = fs.readFileSync(filMappe + filnavn + ".html", "utf-8");
      } else {
        // Hvis nej → vis fejlbesked
        t = "<h1>Der mangler en cookie</h1>";
      }
      break;
    }

    // Hvis URL'en ikke matcher nogen af ovenstående
    default:
      // Viser ajax-form.html
      t = fs.readFileSync(filMappe + "ajax-form.html", "utf-8");
  }

  // Sender HTTP-header med statuskode og content-type
  response.writeHead(200, {
    'Content-Type': 'text/html; charset=UTF-8'
  });

  // Sender HTML-indholdet til browseren
  response.write(t);

  // Lukker forbindelsen
  response.end();
}

// Funktion der udtrækker filnavn fra URL
function sti(url) {

  // Finder positionen af "?" (query string)
  let spørgsmålstegn = url.indexOf("?");
  if (spørgsmålstegn < 0) spørgsmålstegn = url.length;

  // Finder "//" (bruges hvis der er en fuld URL)
  let dobbeltSkråstreg = url.indexOf("//");
  if (dobbeltSkråstreg > -1) {
    dobbeltSkråstreg += 2;
  } else {
    dobbeltSkråstreg = 0;
  }

  // Finder første "/" efter evt. "//"
  let skråstreg = url.indexOf("/", dobbeltSkråstreg);

  // Returnerer teksten mellem "/" og "?"
  return url.substring(skråstreg + 1, spørgsmålstegn);
}
