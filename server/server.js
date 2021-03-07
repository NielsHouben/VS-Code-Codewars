let express = require('express')
let app = express()
app.use(express.json())
const http = require('http').Server(app)
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
})


const util = require("util");
function log(stuff) {
  console.log(util.inspect(stuff, false, null, true));
}



io.on("connection", socket => {
    console.log(`${socket.id} connected`);
    socket.on("inData", data => {
        // console.log(data.result.output[0].items)
        console.log("emitting")
        // io.emit("outData", data)
        // console.log("hej")
    })
    
})
app.post('/update', (req, res) => {
    // log(req.body)
    io.emit("outData", req.body)
    res.sendStatus(200)
    
})

app.get('/', (req, res) => {
    console.error('express connection');
    // res.sendFile(path.join(__dirname, 'si.html'));
    io.emit("test", "testinfo")
    res.status(200).json({h: 5})
});



http.listen(3000, () => console.log('listening on http://localhost:3000/'));
// console.error('socket.io ERROR');



// io.on("connection", socket => {
//     socket.on("inData", data => {
//         // console.log(data.result.output[0].items)
//         console.log("emitting")
//         io.emit("outData", data)
//         // console.log("hej")
//     })
// })

// require('./startup/routes.js')(app)

// port = 5000
// http.listen(port, () => {
//     console.log(`Listening at :${port}...`)
// })


