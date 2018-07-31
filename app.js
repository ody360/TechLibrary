const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const listener = () => console.log(`Listening on port ${port}`)

const app = express()
app.use(bodyParser.json())
app.disable('x-powered-by')
if(process.env.NODE_ENV === 'development') app.use(morgan('dev'))

const bookRoute = require('./src/routes/bookRoute')
app.use('/', bookRoute)

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({error: err})
})


app.listen(port, listener)

module.exoports = app
