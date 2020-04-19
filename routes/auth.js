const router = require('express').Router()
const User = require('../model/User')
const { registerValidation } = require('../validation')


router.post('/register', async (req, res) => {
    //Validate before saving User to DB
    const {error} = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //Save User
    const user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch(err) {
        res.status(400).send(err) 
    }
})

module.exports = router