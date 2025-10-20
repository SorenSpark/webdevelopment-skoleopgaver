let data, tjekStatusId, semafor = false;
function promiseFetch () {
    const myRequest = new Request("https://ordnet.dk/ddo/ordbog?query=" + ord);
    myRequest.method = "GET";
    fetch(myRequest)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);}
        return response.text();
        })
        .then((response) => {
            data = response; semafor = true;
        });
}
async function awaitFetch() {
    const myRequest = new Request("https://ordnet.dk/ddo/ordbog?query=" + ord);
    myRequest.method = "GET";
    let response = await fetch(myRequest);
    if (response.ok) {
        let tekst = await response.text();
        data = tekst; semafor = true;
    }
    else throw new Error(`HTTP error! Status: ${response.status}`);
}
function tjekStatus() {
    console.log("Semafor periodisk: " + semafor);
    if (semafor) {
        console.log("Data til sidst: " + data);
        clearInterval(tjekStatusId);
    }
}
tjekStatusId = setInterval(tjekStatus, 50);
awaitFetch();
console.log("semafor i starten: " + semafor);
console.log("Data først: " + data);
