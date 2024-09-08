const express=require('express');

const app=express();

app.set("view engine","ejs");

app.listen(8000,()=>{
    console.log("app is running at 8000 port");
});