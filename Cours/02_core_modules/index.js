const fs = require("fs");

// Blocking code : Sync
// const txt = fs.readFileSync("./test.txt", "utf-8");

// console.log(txt);

// const output = `Hello : ${txt}.\n Created at ${Date.now()}`;
// fs.writeFileSync("output.txt", output);

// Non-Blocking code : Async

fs.readFile("output.txt", "utf-8", (err, data) => {
    console.log(data);
    console.log(err);
});

console.log("Reading file ....");
