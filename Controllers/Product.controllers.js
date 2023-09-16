const Products=require('../Models/Product.model');
const createHttpError = require('http-errors');
const mongoose = require('mongoose');

module.exports={
    showAllProducts:
        async (req,res,next)=>{
            try{
                const results=await Products.find({},{ name:1, _id:1, price:1});  //.find({query or where field:value},{projection or exclude these})
                res.send(results);
            }catch(error){
                console.log(error.message);
                next(error);
            }
        },
    addNewProduct:
        async (req,res,next)=>{        // using async post
            try{
                const product=new Products(req.body);
                const result=await product.save();
                res.send(result);
            }catch(error){
                if(error.name='ValidationError'){    //if one of the 2 required values is missing in post{} 
                    next(createHttpError(422, error.message));
                    return;
                }
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
        },
    getProductById:
        async (req,res,next)=>{
            try{
                const product=await Products.findById(req.params.id);
                if(!product)throw createHttpError(404,"Product does not exist");
                res.send(product);
            }catch(error){
                if(error instanceof mongoose.CastError){
                    next(createHttpError(400,"Invalid Product ID"));
                    return;
                }
               next(error);
            }
        },
    updateProduct:
        async (req,res,next)=>{
            try{
                const product=await Products.findByIdAndUpdate(req.params.id,req.body,{new:true});
                if(!product)throw createHttpError(404,"Product does not exist");
                res.send(product);
            }catch(error){
                if(error instanceof mongoose.CastError){                  // error when id is provided but it not recognised by mongo as 'id' field, different than does not exist.
                    next(createHttpError(400,"Invalid Product ID"));
                    return;
                }
                next(error);
            }
        },
    deleteProduct:async(req,res,next)=>{
        try{
            const product=await Products.findByIdAndDelete(req.params.id)
            if(!product)throw createHttpError(404,"Product does not exist");
            res.send(product);
        }catch(error){
            if(error instanceof mongoose.CastError){                  // error when id is provided but it not recognised by mongo as 'id' field, different than does not exist.
                next(createHttpError(400,"Invalid Product ID"));
                return;
            }
            next(error);
        }
    }
    
};