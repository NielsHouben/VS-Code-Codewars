const express = require('express')
const http = require('http').Server(express)
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
})



io.on("connection", socket => {
    socket.on("inData", data => {
        // console.log(data.result.output[0].items)
        console.log("emitting")
        io.emit("outData", data)
        // console.log("hej")
    })
})

port = 5000
http.listen(port, () => {
    console.log(`Listening at :${port}...`)

})


