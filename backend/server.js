const express=require('express');
const app=express();
const port=3030;
const condb=require('./config/db');


condb();


app.get('/',(req,res)=>{
res.send('hello');    


});

app.listen(port,()=>{

console.log(`Server listening to ${port}`);

});