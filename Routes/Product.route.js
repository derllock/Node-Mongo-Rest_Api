const express=require('express');
const router=express.Router();

router.get('/',(req,res,next)=>{
    res.send("showing all products")
    next(new Error("getting a list of all products"))
});
router.post('/',(req,res,next)=>{
    res.send("product created")
});
router.get('/:id',(req,res,next)=>{
    res.send("getting the specific product details")
});
router.patch('/:id',(req,res,next)=>{
    res.send("product details modified")
});
router.delete('/:id',(req,res,next)=>{
    res.send("Product deleted")
});

module.exports=router;
