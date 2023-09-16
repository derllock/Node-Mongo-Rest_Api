const express=require('express');
const app=express();                  
app.use(express.json());                                       //posting json data
require('dotenv').config();
const createHttpError=require('http-errors');
require('./initDB')();
const PORT=process.env.PORT || 3000;


const productRoute=require('./Routes/Product.route');            // /products/*
app.use('/products',productRoute);

app.all('/test',(req,res)=>{
    /*console.log(req.query);
    res.send(req.query.name);
     console.log(req.params.id);
    res.send(req.params);
    console.log(req.body);
    res.send(req.body);*/
});

app.use((req,res,next)=>{                                         //wrong url
    /*const err=new Error("Not Found");
     err.status=404*/
    next(createHttpError(404,"not found"))
});

app.listen(PORT,()=>{
    console.log("Server started on Port "+ PORT+'...');
});

//error handler wherever u use next(...) this funt, will be called
app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status:err.status || 500,
            message:err.message
        }
    })
});