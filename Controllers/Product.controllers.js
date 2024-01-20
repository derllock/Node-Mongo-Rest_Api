const Products = require('../Models/Product.model');
const createHttpError = require('http-errors');
const mongoose = require('mongoose');

const getPagination = (page, size) => {
    var limit = 2;
    if (size === "all") limit = 100000;   //all is only good if total courses in db are less than 100000
    else limit = size ? +size : 2;
    currPage = page ? +page : 1;
    const offset = currPage > -1 ? (currPage - 1) * limit : -limit;
    return { limit, offset, currPage };
};
module.exports = {
    showAllProducts:
        async (req, res, next) => {
            try {
                const results = await Products.find({}, { name: 1, _id: 1, price: 1 });  //.find({query or where field:value},{projection or exclude these})
                res.status(200).json({
                    status: 'success',
                    data: results,
                    message: 'All products fetched successfully'
                  });
            } catch (error) {
                console.log(error.message);
                next(error);
            }
        },
    addNewProduct:
        async (req, res, next) => {        // using async post
            try {
                const product = new Products(req.body);
                const result = await product.save();
                res.status(200).json({
                    status: 'success',
                    data: result,
                    message: 'Product added successfully'
                  });
            } catch (error) {
                if (error.name = 'ValidationError') {    //if one of the 2 required values is missing in post{} 
                    next(createHttpError(422, error.message));
                    return;
                }
                console.log(error.message);
            }
        },
    getProductById:
        async (req, res, next) => {
            try {
                const product = await Products.findById(req.params.id);
                if (!product) throw createHttpError(404, "Product does not exist");
                res.status(200).json({
                    status: 'success',
                    data: product,
                    message: 'Product fetched successfully'
                  })    ;
            } catch (error) {
                if (error instanceof mongoose.CastError) {
                    next(createHttpError(400, "Invalid Product ID"));
                    return;
                }
                next(error);
            }
        },
    updateProduct:
        async (req, res, next) => {
            try {
                const product = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!product) throw createHttpError(404, "Product does not exist");
                res.status(200).json({
                    status: 'success',
                    data: product,
                    message: 'Product updated successfully'
                  });
            } catch (error) {
                if (error instanceof mongoose.CastError) {                  // error when id is provided but it not recognised by mongo as 'id' field, different than does not exist.
                    next(createHttpError(400, "Invalid Product ID"));
                    return;
                }
                next(error);
            }
        },
    deleteProduct: async (req, res, next) => {
        try {
            const product = await Products.findByIdAndDelete(req.params.id)
            if (!product) throw createHttpError(404, "Product does not exist");
            res.status(200).json({
                status: 'success',
                data: product,
                message: 'Product deleted successfully'
              });
        } catch (error) {
            if (error instanceof mongoose.CastError) {                  // error when id is provided but it not recognised by mongo as 'id' field, different than does not exist.
                next(createHttpError(400, "Invalid Product ID"));
                return;
            }
            next(error);
        }
    },
    findProduct:
        async (req, res, next) => {
            try {
                var { page, size, keyword, order, column } = req.query;
                const { limit, offset, currPage } = getPagination(page, size);
                var sort = {};
                if (order && column) {
                    sort[column] = order === "desc" ? -1 : 1;
                }
                else if(order && !column){
                    sort["name"] = order === "desc" ? -1 : 1;
                }
                else if(!order && column){
                    sort[column] = 1;
                }
                else{
                    sort["name"] = 1;
                }
                var query = {};
                if (keyword) {
                    query = { name: { $regex: keyword, $options: "i" } };
                }
                const products = await Products.find(query).sort(sort).limit(limit).skip(offset);
                const total = await Products.countDocuments(query);
                res.status(200).json({
                    status: 'success',
                    totalItems: total,
                    data: products,
                    totalPages: Math.ceil(total / limit),//convert to int
                    currentPage: currPage,
                    message: 'All products fetched successfully'
                  });

            } catch (error) {
                if (error instanceof mongoose.CastError) {
                    next(createHttpError(400, "Invalid Product ID"));
                    return;
                }
                next(error);
            }
        },

};