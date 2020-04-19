const router = require('express').Router()
const User = require('../model/User')
const { registerValidation, loginValidation } = require('../validation')
const bcrypt = require('bcryptjs')

//Register
router.post('/register', async (req, res) => {
    //Validate before saving User to DB
    const {error} = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //Check if user already exist
    const emailExist = await User.findOne({email: req.body.email})
    if (emailExist) return res.status(400).send('Error: user with email already exists')

    //Hashhhhh Password!
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Create & Save User 
    const user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save()
        // res.send(savedUser) //return whole json content
        res.send({ user: user._id }) //returns id
    } catch(err) {
        res.status(400).send(err) 
    }
})

//Login
router.post('/login', async (req, res) => {
    //Validate before login
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //Check if user already exist
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send('Error: incorrect email or password!')
    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Error: Password Incorrect')

    res.send('Success login')
})

module.exports = router