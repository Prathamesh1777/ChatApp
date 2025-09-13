
// const authRoutes=require("./routes/authRoutes.js")
import express from "express";

import condb from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
const app=express();
const port=3030;





app.use(express.json());
condb();
app.use("/api/auth", authRoutes);






app.listen(port,()=>{

console.log(`Server listening to ${port}`);
});