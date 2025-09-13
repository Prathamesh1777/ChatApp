import User from "../models/User.js";

import bcrypt from "bcryptjs";

export const RegisterUser=async(req,res)=>{

    const saltRounds = 10;
    const plainPassword = req.body.password
    let user =await User.findOne({username:req.body.username}) 
    if(user)
    {
      return res.status(400).json({ message: "User already exists" });  
    }
    
    
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
}

export const loginUser= async (req, res) => {
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
};



