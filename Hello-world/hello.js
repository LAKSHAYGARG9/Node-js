// console.log("hey there! i am js");


const math = require('./math')

console.log("math value is", math.addFn(6, 7));

// i can destructre the marh oject
const {add, sub} = require('./math')
console.log(`Math value is, ${add(7, 8)}`);




 