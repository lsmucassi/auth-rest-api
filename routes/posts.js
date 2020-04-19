const router = require('express').Router()
const verify = require('./verifyToken')

router.get('/', verify, (req, res) => {
    res.json({ posts: {
        title: 'Post 1',
        desc: 'some dat you shouldn\'t access mate, you must be logged in if you are seeng this'
    }})
})


module.exports = router