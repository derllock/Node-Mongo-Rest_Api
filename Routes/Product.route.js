const express=require('express');
const router=express.Router();
const ProductController=require('../Controllers/Product.controllers')

//find and paginate
router.get('/find',ProductController.findProduct);
//get all products
router.get('/',ProductController.showAllProducts);

//save single product
router.post('/',ProductController.addNewProduct);

//get single product
router.get('/:id',ProductController.getProductById);

//update product
router.patch('/:id',ProductController.updateProduct);

//delete product
router.delete('/:id',ProductController.deleteProduct);




module.exports=router;
