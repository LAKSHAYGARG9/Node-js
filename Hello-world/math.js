function add(num1, num2) {
    return num1 + num2
}

function sub(a, b) {
    return a - b;
}


// exports function -> overwrites the value
module.exports = {
    addfn :  add,
     subfn : sub
};


