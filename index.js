const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')

//Import Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

dotenv.config();

//Connect DB
mongoose.connect(process.env.DB_CONNECT, 
    { useUnifiedTopology: true , useNewUrlParser: true})
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });

//Middleware
app.use(express.json())

//Route Middlewares
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

app.listen(8001, () => console.log('Server[/root/index.js]: Running @port 8001'))