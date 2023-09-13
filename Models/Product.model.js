const mongoose= require('mongoose');
const Schema =mongoose.Schema;

const ProductSchema= new Schema({ //new model created`
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }

});
const Product=mongoose.model('product',ProductSchema);
module.exports=Product;