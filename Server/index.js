// const https = require("http");
// const fs = require("fs");
// const url = require("url");

const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send("Hello from home page")
})

app.get('/about', (req, res) => {
    res.send("Hello from about page" + "hey" + req.query.name + 'you are ' + req.query.age)

})


app.listen(8000, (req, res) => {
    console.log("server started");
})


function myHandler(req, res) {
    // console.log("New req rec.");
  // console.log(req.headers);
  // console.log(req);
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()} : ${req.method} ${req.url} New req received\n`;

  const myUrl = url.parse(req.url, true);
//   console.log(myUrl);

  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        if(req.method === "GET" )  res.end("Home page");
        break;
      case "/about":
        const username = myUrl.query.myname
        res.end(`Hi, ${username}`)
        // res.end("I am lakshay garg");
        break;

      case "/search" : 
        const search = myUrl.query.search_query;
        res.end("Here are your results for" + search)
      default:
        res.end("404 not found");
    }
  });
}

// const myServer = https.createServer(app)

// myServer.listen(8000, () => console.log("Server started"));



