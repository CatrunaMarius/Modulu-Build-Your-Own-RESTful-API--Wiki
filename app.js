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

////////////////////////////////// Requests Targetting all Articles ///////////////////
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

////////////////////////////////// Requests Targetting a Specific Article ///////////////////

app.route("/articles/:articleTitle")

.get(function(req, res){

    // gaseste un singur articol  
    Article.findOne({title:req.params.articleTitle}, function(err, foundArticle){
        if(foundArticle){
            res.send(foundArticle)

        }else{
            res.send("No articles matching that title was found")
        }
    })
})

.put(function(req,res){
    Article.update(
        {title: req.params.articleTitle},
        {title: req.body.title,content: req.body.content},
        {overwrite:true},
        function(err){
            if(!err){
               res.send("Successfully update") 
            }
        })

})

.patch(function(req, res){
    Article.updateOne(
        {title: req.params.articleTitle},
        {$set: req.body},
        function(err){
            if(!err){
                res.send("Successfully update atricle")
            }else{
                res.send(err)
            }
        }
    )
})

.delete(function(req,res){
    Article.deleteOne(
        {title: req.params.articleTitle},
        function(err){
            if(!err){
                res.send("Delete article successfull")
            }else(
                res.send(err)
            )
    })
})


app.listen(9000, function() {
  console.log("Server started on port 3000");
});