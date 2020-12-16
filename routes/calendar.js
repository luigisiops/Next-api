const express = require("express")
const router = express.Router()
const models = require("../models")

router.post("/", async(req,res) => {
    let title = req.body.title
    let userId  = 1

    if (title){
    let newCalendar = await models.calendar.create({
        title: title,
        participationtype: "Owner"
    })

    let calendarId = newCalendar.id
    let calendarUser = await models.calendaruser.create({
        userId: userId,
        calendarId: calendarId
    })
        res.send(newCalendar)            
    }  

    else{
        res.status(404).send({
            message: 'Error: title cannot be null'
         })
    }
})

router.get("/:id", async(req, res) => {
    let id = req.params.id

    if (id) {
        const data = await models.calendar.findOne({where: {id: id}})
        res.send(data)
    }
    else {
        res.status(404).send({
            message: 'Error: missing calendar Id'
        })
    }
})

router.get("/:id/users", async(req, res) => {
    let id = req.params.id

    if(id) {
        const data = await models.calendaruser.findAll
        ({where: {
            calendarId: id, 
            }
        })
        res.send(data)
    }
})

router.get("/:id/users/:userId", async(req, res) => {
    let id = req.params.id
    let userId = req.params.userId

    if(id) {
        const data = await models.calendaruser.findOne
        ({where: {
            calendarId: id, 
            userId: userId
            }
        })
        res.send(data)
    }
})

router.post('/:calendarId/events', async(req, res) => {
    let calendarId = req.params.calendarId
    let title = req.body.title
    let description = req.body.description
    let start = req.body.start
    let end = req.body.end

    if (calendarId) {
        const newEvent = await models.event.create({
            title: title,
            description: description,
            start: start,
            end: end
        })

        let eventId = newEvent.id
        console.log(eventId)
        const eventUser = await models.calendarevents.create({
            calendarId: calendarId,
            eventId: eventId
        })

        res.send(newEvent)
    }    
})

router.get('/:calendarId/events', async(req, res) => {
    let calendarId = req.params.calendarId

    if (calendarId) {
        const events = await models.calendarevents.findAll({
            where: {calendarId:calendarId}, include:[{
                model:models.event
            }]
        })
        let event = []
        let test = events.forEach((item) => {
            event.push(item.event)
        })
        console.log(event)

        res.send(event)
    }    
})

module.exports = router