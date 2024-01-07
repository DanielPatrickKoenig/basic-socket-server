import { createServer } from "http"
import { Server } from "socket.io"

const httpServer = createServer()

const io = new Server(httpServer, {
    
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5173", "http://127.0.0.1:5173"]
    }
})

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)

    socket.on('message', data => {
        console.log(data)
        io.emit('message', `${socket.id.substring(0, 5)}: ${data}`)
    })
})

replaceImage();

function replaceImage () {
    if (io) io.emit('message', { value: Math.round(Math.random() * 100), type: 'card' });
    setTimeout(replaceImage, 3000);
}

httpServer.listen(3500, () => console.log('listening on port 3500'))