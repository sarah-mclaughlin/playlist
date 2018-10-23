const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

// allow cross-origin requests
app.use(cors())

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/practice-app')
  .then(() => { console.log('Connected to MongoDB')})

// bind express with graphql
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Listening on port 4000')
})
