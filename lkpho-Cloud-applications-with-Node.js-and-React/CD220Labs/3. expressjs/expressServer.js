const express = require('express');
const app = new express();

let loginDetails = [];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];


app.get("/",(req,res)=>{
    res.send("Welcome to the express server")
})

app.get("/loginDetails",(req,res)=>{
    res.send(JSON.stringify(loginDetails));
})

/* curl "http://localhost:3333/login/Jason" -Method Post */
app.post("/login/:name",(req,res)=>{
    loginDetails.push({"name":req.params.name,"login_time":new Date()});
    res.send(req.params.name + ", You are logged in!")
})

app.get("/:name",(req,res)=>{
    res.send("Hello "+req.params.name)
})

app.get("/fetchMonth/:num",(req,res)=>{
    let num = parseInt(req.params.num)
    if (num >= 1 & num <= 12) {
        res.send("The month is : " + months[num-1])
    } else {
        res.send("Error, introduce a valid month")
    }
})

app.listen(3333, () => {
    console.log(`Listening at http://localhost:3333`)
})

