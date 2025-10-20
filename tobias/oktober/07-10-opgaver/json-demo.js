const tal = 42;
const string = "godmorgen";
const bool = true;
const arr = [1, 2, 3];
const obj = { navn: "Lars", alder: 30 };


const json = JSON.stringify({ tal, string, bool, arr, obj });

console.log(typeof json);
console.log(json);