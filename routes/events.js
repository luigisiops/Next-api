const express = require("express")
const { start } = require("repl")
const router = express.Router()
const models = require("../models")

router.post('/calendar/:calendarId/events', async(req, res) => {
    let calendarId = req.params.calendarId
    let title = req.body.title
    let description = req.body.description
    let start = req.body.start
    let end = req.body.end

    if (calendarId) {
        const newEvent = await models.events.create({
            title: title,
            description: description,
            start: start,
            end: end
        })

        let eventId = newEvent.eventId
        const eventUser = await models.calendarevents.create({
            calendarId: calendarId,
            eventId: eventId
        })

        res.send(newEvent)
    }    
})

