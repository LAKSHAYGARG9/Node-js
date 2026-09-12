
const fs = require("fs");

// sync... Blocking 
// fs.writeFileSync('./text.txt', 'hey there')

// async... Non - BLocking
// fs.writeFile('./text.txt', 'Hey there async', (errr) => {}) 


    // sync..
// const result = fs.readFileSync("./contacts.txt", "utf-8")
// console.log(result);

// async

/* fs.readFile("./contacts.txt", "utf-8", (err, result) => {
    if (err) {
        console.log("error", err)
    } else {
        console.log(result);
    }
}) */


// +++++++++++++++++++++++++++++++++++ node js works +++++++++++++++++++++++++++++++====

const os = require('os')
console.log(os.cpus());

const result = fs.readFileSync("contacts.txt", "utf-8")
console.log(result)


// Default Thread Pool size = 4
// Max? - 8core cpu at server - 8 