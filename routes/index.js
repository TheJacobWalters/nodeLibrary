var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});


const db = mongoose.connection;
var bookSchema = null;
var Model = null;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  const bookSchema = new mongoose.Schema({
    title: String
  });
  Model = mongoose.model("model", bookSchema, "myCollection");
  var book = new Model({title:"sex positions"});
  book.save();
});


var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query.title);
  var book = new Model({title:req.query.title});
  book.save();
});

module.exports = router;
