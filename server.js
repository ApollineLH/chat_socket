const express= require ('express')
const app = express()
const http = require('http')
const server =  http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server)

const port = 8080

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

io.on('connection', (socket)=>{
//user auth possible
    io.emit('notify', 'newclient')

    // socket.broadcast.emit(`notify', 'Brodcast from socket: ${socket.id}`)

    console.log(`user connected , socket: ${socket.id}`)

    socket.on('disconnect',()=>{
        console.log(`user disconnected , socket: ${socket.id}`)
    })
    socket.on('message', (data)=>{
        const date = new Date().toLocaleString('fr-FR')
       
        io.emit('message',`[${date}] ${socket.id} : ${data}`)
    })  
    
    
    
})


server.listen(port, ()=>{
console.log(`listening on: ${port}`)
})