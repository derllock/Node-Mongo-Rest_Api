const express=require('express');
const router=express.Router();
const Product=require('../Models/Product.model');
const createHttpError = require('http-errors');

//get all products
router.get('/',async (req,res,next)=>{
    try{
        const results=await Product.find({},{ name:1, _id:1, price:1});  //.find({query or where field:value},{projection or exclude these})
        res.send(results);
    }catch(error){
        console.log(error.message);
        next(error);
    }
   
});

//save single product
router.post('/',async (req,res,next)=>{        // using async post
    try{
        const product=new Product(req.body);
        const result=await product.save();
        res.send(result);
    }catch(error){
        console.log(error.message);
    }
/* router.post('/', (req,res,next)=>{
    res.send("product created")     
    const product=new Product(req.body);
    product.save()
    .then(result=>{                    //using promises 
        console.log(result);
    })
    .catch(err=>{
        console.log(err.message);
    });*/
});

//get single product
router.get('/:id',async (req,res,next)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product)throw createHttpError(404,"Product does not exist");
        res.send(product);
    }catch(error){
       next(error);
    }
});
router.patch('/:id',async (req,res,next)=>{
    try{
        const product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.send(product);
    }catch(error){
        res.send(error.message);
    }
});

//delete product
router.delete('/:id',async(req,res,next)=>{
    try{
        const product=await Product.findByIdAndDelete(req.params.id)
        res.send(product);
    }catch(error){
        res.send(error.message);
    }
});


module.exports=router;
