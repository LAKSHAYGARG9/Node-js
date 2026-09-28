const { log } = require('console');
const express = require('express');
const http = require('http')
const {Server} = require("socket.io")


const app = express();
const server = http.createServer(app);
const io = new Server(server)



// Socket.io
io.on('connection', (socket) => {
    socket.on("user-message", (message) => {
        // console.log(message)
        io.emit("message", message);
    });
})
 


app.use(express.static('public'));
 

app.get('/', (req, res) => {
    res.sendFile("./public/index.html");

});  

const port = 8000;
server.listen(port, () => {
    console.log(`server start at port ${port}`)
}) 