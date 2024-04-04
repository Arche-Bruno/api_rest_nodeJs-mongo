const mongoose = require("mongoose");

const bookSchema =new mongoose.Schema({
      name_book:String,
      name_author:String,
      genred:String,
      date_publication:String,
})

module.exports = mongoose.model('Book',bookSchema)