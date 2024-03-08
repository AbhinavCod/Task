import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import authRoutes from "./routes/auth";
import path from "path";

mongoose.connect("mongodb+srv://admin:AKPzufqXcD8TK4Zw@cluster0.4krj7mm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connection Successfull");
}).catch((e)=>{
    console.log(e);
    console.log("NO Connection")
});
const app = express();
const port = 3000;


app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"../../frontend/dist")));

app.use("/api/auth",authRoutes);

app.get("/",(req,res)=>{
    res.json({message:"Hello world"});
})


app.listen(port,()=>{
    console.log(`Listening at port no ${port}`);
})