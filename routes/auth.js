const router = require('express').Router()
const User = require('../model/User')

//Validation
const Joi = require('@hapi/joi')  //npm install it first Linda 

const schema = Joi.object({
    name: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required()
})

router.post('/register', async (req, res) => {
    //Validate entry before we make a User 
    const validation = schema.validate(req.body)
    res.send(validation)

    // const user = new User({
    //     name: req.body.name,
    //     lastname: req.body.lastname,
    //     email: req.body.email,
    //     password: req.body.password
    // })
    // try {
    //     const savedUser = await user.save()
    //     res.send(savedUser)
    // } catch(err) {
    //     res.status(400).send(err) 
    // }
})

module.exports = router