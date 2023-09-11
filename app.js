const express=require('express');
const app=express();                  

const mongoose=require('mongoose');
mongoose.connect(
    'mongodb+srv://cluster0.sw6gpyp.mongodb.net/?retryWrites=true&w=majority/RestApi_Youtube',
    {
        dbname:'RestApi_Youtube',
        user:'derllock',
        pass:'derllock',
        useNewUrlParser:true,
        useUnifiedTopology:true
    })

.then(()=>{
    console.log('mongodb connected yeah...')
});

const productRoute=require('./Routes/Product.route');
app.use('/products',productRoute);

app.use((req,res,next)=>{
    const err=new Error("Not Found");
    err.status=404
    next(err)
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