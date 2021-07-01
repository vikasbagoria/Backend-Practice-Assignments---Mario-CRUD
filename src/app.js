const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');
const { replaceSetter } = require('sinon');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here
app.get("/mario", async (req, res) => {
    try {
        const data = await marioModel.find();
          res.send(data);
        
    } catch (e) {
        res.send(e);
    }
})

app.get("/mario/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await marioModel.findById(_id);
       if(!_id){
        return res.status(400).send();
       }else{
           res.send(data);
       }
    } catch(e){
        var obj={
            message: e.message
        }
        res.status(400).send(obj);
    }
})


const isNullorUndefined = (val) => val === null || val === undefined;

app.post("/mario", async (req, res) => {
    try {
        const user  = new marioModel(req.body)
        // const name = new marioModel(req.body.name|| isNullorUndefine)
        // const weight = new marioModel(req.body.weight|| isNullorUndefine)
        
        if(isNullorUndefined(user.name )||isNullorUndefined(user.weight)){
            var obj = {
                message: 'either name or weight is missing'
            }
            res.status(400).send(obj)
        }else{
        const data = await user.save();
            res.status(201).send(data);
        }
    } catch (e) {
        var obj = {
            message: 'either name or weight is missing'
        }
        res.status(400).send(obj);
    }
    //    console.log(req.body);  

})

app.patch("/mario/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const user = new marioModel(req.body)
        const updateData= await marioModel.findByIdAndUpdate(_id,req.body,{new:true});
        if(!_id){
            return res.status(400).send();
        }else{
        
        res.send(updateData);
        }
    } catch (e) {
        var obj={
            message:e.message
        }
        res.status(400).send(obj);
    }
})

app.delete("/mario/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteData = await marioModel.findByIdAndDelete(_id);
        if(!_id){
            return res.status(400).send();
        }else{
       
            var obj = { message: 'character deleted' };
            res.status(200).send(obj);
        }
        
    } catch (e) {
        var obj={
            message: e.message
        }
        res.status(400).send(obj);
    }
})


module.exports = app;