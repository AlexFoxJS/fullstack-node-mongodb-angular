const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')

/** Routs */
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')

/** Configs */
const keys = require('./config/keys')

/** */
const app = express()

/** */
mongoose.connect(keys.mongoURI)
	.then(() => console.log('MongoDB connected.'))
	.catch(e => console.log('Error', e))

/** */
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use(passport.initialize())
require('./middleware/passport')(passport)

/** */
app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

/** */
module.exports = app