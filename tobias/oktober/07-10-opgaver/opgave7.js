const http = require("http"), port = 3000, hostname = "127.0.0.1";
const fs = require("fs");
const server = http.createServer();
const kage = "kage";
server.on("request", callback);
server.listen(port, hostname, function () {
  console.log("Lokalserveren kører");
});
function callback(request, response) {
  let filnavn = sti(request.url); console.log(filnavn);
  let filMappe = "C:/Users/Søren Spark/OneDrive/Dokumenter/javascript/oktober/07-10-opgaver/";
  //filMappe skal ændres afhængigt af hvor du har filerne henne i dit system
  if (filnavn === "") filnavn = "index";
  switch (filnavn) {
    case "index": {
      response.setHeader("Set-Cookie", [`kage=${kage}; path=/`]);
      t = fs.readFileSync(filMappe + filnavn + ".html", "utf-8"); break;
    }
    case "farvel":
    case "om": {
      if (request.headers.cookie === `kage=${kage}`) t = fs.readFileSync(filMappe + filnavn + ".html", "utf-8");
      else t = "<h1>Der mangler en cookie</h1>";
      break;
    }
    default: t = fs.readFileSync(filMappe + "ajax-form.html", "utf-8");
  }
  response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
  response.write(t);
  response.end();
}
function sti(url) {
  let spørgsmålstegn = url.indexOf("?");
  if (spørgsmålstegn < 0) spørgsmålstegn = url.length;
  let dobbeltSkråstreg = url.indexOf("//");
  if (dobbeltSkråstreg > -1) dobbeltSkråstreg += 2; else dobbeltSkråstreg = 0;
  let skråstreg = url.indexOf("/", dobbeltSkråstreg);
  return url.substring(skråstreg + 1, spørgsmålstegn);
}