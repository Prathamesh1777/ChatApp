const express=require('express');
const app=express();
const port=3030;
const condb=require('./config/db');
const User=require('./models/User');

app.use(express.json());
condb();


app.get('/api/test',(req,res)=>{
res.json({
    message:'Hello  from backend',
    data :['Prathamesh','aarv']   
});  

});


app.post('/register',(req,res)=>{

    try{   
   const newUser= new User({
   username : req.body.username,
   password : req.body.username
   
   }) ;   
   
   newUser.save();
   
   res.status(201).json({
       message : "registration successfull"
   })
   
    } catch(error){
        res.status(500).json({
            error:"internal server error"
        })

    }
   
   });



app.listen(port,()=>{

console.log(`Server listening to ${port}`);
});