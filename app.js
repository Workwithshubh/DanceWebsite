const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser")
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/contactDance');
}
const port = 800;
// define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
const Contact = mongoose.model('Contact', contactSchema);

//For serving static stuff
app.use('/static', express.static('static')) //for serving static files
app.use(express.urlencoded())

//Pug specific stuff
app.set('view engine','pug') //set the template engine as pug
app.set ('views',path.join(__dirname,'views'))//set the views directory

//endpoints
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params);
}) 

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body); //create new contact object through req.body
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
    // res.status(200).render('contact.pug');
})
//start the server
app.listen(port,()=>{
    console.log(`Application Submited on port ${port}`);
})
