const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({
  name: String,
  age: Number
})

module.exports = mongoose.model('Author', authorSchema)


// var authorSchema = new Schema({
//   name: String,
//   age: Number,
//   books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
// })