const express=require('express');
const router=express.Router();
const ProductController=require('../Controllers/Product.controllers')

//find and paginate
router.get('/find',ProductController.findProduct);
//get all products
router.get('/',ProductController.showAllProducts);

//save single product
router.post('/',ProductController.addNewProduct);
//showData
router.get('/showData',ProductController.showData); 

//get single product
router.get('/:id',ProductController.getProductById);

//update product
//router.patch('/:id',ProductController.updateProduct);

//delete product
router.delete('/:id',ProductController.deleteProduct);

//modify product
router.patch('/:name',ProductController.modifyProduct);




module.exports=router;
