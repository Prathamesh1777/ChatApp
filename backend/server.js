const express=require('express');
const app=express();
const port=3030;
const condb=require('./config/db');


condb();


app.get('/api/test',(req,res)=>{
res.json({
    message:'Hello  from backend',
    data :['Prathamesh','aarv']   
});  




});

app.listen(port,()=>{

console.log(`Server listening to ${port}`);

});