const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/crudDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// Schema
const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number
});

// Model -> products collection
const Product = mongoose.model("Product", ProductSchema);

// CREATE
app.post("/products", async(req,res)=>{
    const {name, price} = req.body;
    const p = await Product.create({name, price});
    res.json(p);
});

// READ
app.get("/products", async(req,res)=>{
    const data = await Product.find();
    res.json(data);
});

// UPDATE
app.put("/products/:id", async(req,res)=>{
    const {id} = req.params;
    const {name, price} = req.body;

    const updated = await Product.findByIdAndUpdate(id,{name,price},{new:true});
    res.json(updated);
});

// DELETE
app.delete("/products/:id", async(req,res)=>{
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.json({message:"deleted"});
});

app.listen(5000, ()=> console.log("Server running on port 5000"));
