const express = require("express")
const router = express.Router()
const models = require("../models")

router.post("/register", async(req,res) => {
    let email = req.body.email
    let password = req.body.password
    let firstName = req.body.firstname
    let lastName = req.body.lastname

    if (email){
    let newUser = await models.user.create({
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastName,
    })
        res.send(newUser)            
    }  

    else{
        res.status(404).send({
            message: 'Error: email cannot be null'
         })
    }
})

module.exports = router