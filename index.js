import express from "express";
import mongoose ,{ model, Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app=express();

app.use(express.json());
 
const PORT=5000;

//connection mongodb import
const connectMongoDB=async()=>{
const conn = await mongoose.connect(process.env.MONGODB_URI)

connectMongoDB();

//find connection
if(conn){
    console.log('MongoDB connected successfully..');
}};

//create schema
const commerceScheme = new Schema({
    name: String,
    description: String,
    price: Number,
    productImage: String,
    brand: String,
});

//create model
const Commerce = model('Commerce',commerceScheme);

//send request from using get
app.get('/commerce',(req,res)=>{
res.json({status:"Hello E-commerce"});
});

app.get('/website',async(req,res)=>{
    const{email}=req.query;
   
    const product= await product.findOne({email:email})
    res.json({
        success:true,
        data:commerceScheme,
        message:"website visit"
    });
    });


app.post('/website',async (req,res)=>{
const{name,description,price,imageURI,brand}=req.body;

// if(!name){
//     return res.json({
//         success:false,
//         message:"name is required"
//     })
// }

// if(!description){
//     return res.json({
//         success:false,
//         message:"description is required"
//     })
// }

// if(!price){
//     return res.json({
//         success:false,
//         message:"price is required"
//     })
// }

// if(!imageURI){

//     return res.json({
//         success:false,
//         message:"imageURI is required"
//     })
// }

// if(!brand){
//     return res.json({
//         success:false,
//         message:"brand is required"
//     })
// }

const newWeb = new  Commerce({
    name: name,
    description:description,
    price:price,
    imageURI:imageURI,
    brand:brand
})

const saveWebsite = await newWeb.save();
res.json({
    success:true,
    data:saveWebsite,
    message:"successfully added new produce"
})

});

app.listen(PORT,()=>{
    console.log(`server is start ${PORT}`)
})
