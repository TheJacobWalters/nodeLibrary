var express = require('express');
const { Int32 } = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});


const db = mongoose.connection;
var bookSchema = null;
var Model = null;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: String
  });
  Model = mongoose.model("model", bookSchema, "myCollection");
  //var book = new Model({title:"sex positions"});
  //book.save();
});


var router = express.Router();
// delete database
router.get('/delete', (req, res, next) => {
  Model.deleteMany({title:req.query.title}, (e) =>{
    console.log(e);
    return;
  });
  console.log('successful deletion');
  res.send('deleted');
})

/* GET home page. */
router.get('/add', function(req, res, next) {
  console.log(req.query);
  var book = new Model(req.query);
  book.save();
  res.render('index', {title: 'go fuck yourself'});
});

module.exports = router;
