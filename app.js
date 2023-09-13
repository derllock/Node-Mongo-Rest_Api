const express=require('express');
const app=express();                  
app.use(express.json());
const mongoose=require('mongoose');
const createHttpError=require('http-errors');
mongoose.connect(
    'mongodb+srv://cluster0.sw6gpyp.mongodb.net/',
    {
        dbname:'RestApi_Youtube',
        user:'derllock',
        pass:'derllock',
        useNewUrlParser:true,
        useUnifiedTopology:true
    })

.then(()=>{                                                       //promise
    console.log('mongodb connected yeah...')
});

const productRoute=require('./Routes/Product.route');            // /products/*
app.use('/products',productRoute);

app.all('/test',(req,res)=>{
    //console.log(req.query);
   // res.send(req.query.name);
    // console.log(req.params.id);
    // res.send(req.params);
    console.log(req.body);
    res.send(req.body);
});

app.use((req,res,next)=>{                                         //wrong url
    // const err=new Error("Not Found");
    // err.status=404
    next(createHttpError(404,"not found"))
});
app.listen(3000,()=>{
    console.log("Server 3000 begins");
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