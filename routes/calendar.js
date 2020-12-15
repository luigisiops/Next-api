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

module.exports = router