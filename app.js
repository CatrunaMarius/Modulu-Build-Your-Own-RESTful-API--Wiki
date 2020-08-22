const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser:true, useUnifiedTopology:true})

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);


app.route("/articles")
.get(function(req, res){
    //cauta in baza de date (mangoDB)
    Article.find({}, function(err, results){
        if(!err){
            res.send(results)
        }else{
            res.send(err)
        }
        
    })
})
.post(function(req,res){
   
    // salveaza datele in baza de date(mongoDB)
    const art = new Article({
        title: req.body.title,
        content: req.body.content
    })

    art.save(function(err){
        if(!err){
            res.send("Successfully add")
        }else{
            res.send(err)
        }
    })
    // ===========================================
})
.delete(function(req, res){
    Article.deleteMany(function(err){
        if (!err){
            res.send("successfullt delete")
        }else{
            res.send(err)
        }
    })
})



app.listen(9000, function() {
  console.log("Server started on port 3000");
});