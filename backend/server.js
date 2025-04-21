const express=require('express');
const app=express();
const port=3030;
const condb=require('./config/db');
const User=require('./models/User');

const bcrypt=require('bcrypt');

app.use(express.json());
condb();


app.get('/api/test',(req,res)=>{
res.json({
    message:'Hello  from backend',
    data :['Prathamesh','aarv']   
});  

});


app.post('/register',(req,res)=>{

    const saltRounds = 10; // Recommended value
    const plainPassword = req.body.password;
    
    
    bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
      if (err) {
        console.log('password encryption failed');
      } else {
        // Store the hash in your database
        
        console.log('Hashed password:', hash);


        try{   
            const newUser= new User({
            username : req.body.username,
            password : hash
            
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
      }
    });

   
   
   });



app.listen(port,()=>{

console.log(`Server listening to ${port}`);
});