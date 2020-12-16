const cors = require("cors")
const bodyParser = require("body-parser")
const express = require("express")

const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, {  
     cors: {
    origin: '*',
  }})

const models = require("./models");

const calendarRouter = require("./routes/calendar")
const authRouter = require("./routes/auth")


const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/auth', authRouter)
app.use("/calendar", calendarRouter)

/*
io.on('connection', (socket) => {
    //console.log('a user has connected')
    socket.emit("your Id", socket.id);
    socket.on("send message" , (body) => {
        io.emit("message", body)
    })
    socket.on('disconnect',() =>{
        console.log('user disconnected')
    } )
})
*/

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})