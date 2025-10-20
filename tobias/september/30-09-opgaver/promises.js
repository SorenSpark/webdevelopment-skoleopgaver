const fs = require('fs').promises;
const filename = 'C:\\Users\\Søren Spark\\Desktop\\opgaveInput\\folderA\\testA.txt';

async function countLetters(filename) {
  try {
    // Indlæs filens indhold som tekst
    const data = await fs.readFile(filename, 'utf8');

    // Brug regex til kun at matche bogstaver (a-z og A-Z)
    const letters = data.match(/[a-zA-ZÆØÅæøå]/g) || [];

    console.log(`Antal bogstaver i filen: ${letters.length}`);
  } catch (err) {
    console.error('Kunne ikke indlæse filen:', err.message);
  }
}


countLetters(filename);

