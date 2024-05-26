// File logics for db connections

const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://ahemraj82:dwyTYkmaGFh05UlQ@todocluster.1njbk5v.mongodb.net/todoDB")

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  isComplete: Boolean
})

const todoModels = mongoose.model('todos', todoSchema)
module.exports = {
  todoModels
}
