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

    const saltRounds = 10;
    const plainPassword = req.body.password;
    
    
    bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
      if (err) {
        console.log('password encryption failed');
      } else {
        
        
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



   app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ message: "User does not exist. Please check username or register." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            return res.status(200).json({ message: "Login successful!" });
        } else {
            return res.status(401).json({ message: "Incorrect password." });
        }

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});



app.listen(port,()=>{

console.log(`Server listening to ${port}`);
});