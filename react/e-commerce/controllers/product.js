const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");

// required product will be stored in req
exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.product = product;
        next();
    });
};

// Get a single product
exports.read = (req, res) => {
    // photo will not be sent because it may have a big size that can cause performance issues
    req.product.photo = undefined;
    return res.status(200).json(req.product);
};

// Create a new product
exports.create = (req, res) => {
    // formidable will help to handle from requests
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }

        const { name, description, price, category, quantity, shipping } = fields;

        // all fields should be filled
        if ( !name || !description || !price || !category || !quantity || !shipping ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let product = new Product(fields);

        // 1kb = 1000
        // 1mb = 1000000
        
        // Validation for image upload
        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        
        // new product is created in DB
        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.status(201).json(result);
        });
    });
};

// Delete a product
exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.status(204).json({
            message: "Product deleted successfully"
        });
    });
};

// Update a product
exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        // check for all fields
        const { name, description, price, category, quantity, shipping } = fields;

        if ( !name || !description || !price || !category || !quantity || !shipping ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let product = req.product;
        // use of lodash extends method
        product = _.extend(product, fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.status(202).json(result);
        });
    });
};

// Display most popular products
/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */

exports.list = (req, res) => {
    // if we get order from req query we use it otherwise we use ascending by default
    let order = req.query.order ? req.query.order : "asc";
    // if we get sortBy from req query we use it otherwise we use _id by default
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    // if we get limit from req query we use it otherwise we use 6 by default
    // It's necessary to parse limit because it's sent as string
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        // When returning all products we dont want to send the photo altogether.
        // It's going to be very slow
        .select("-photo")
        // Since category in producto is an ObjectId type, populate will display the category name instead of the Id
        .populate("category")
        // sort order
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.status(200).json(products);
        });
};

/**
 * it will find the products based on the req product category
 * other products that has the same category, will be returned
 */

exports.listRelated = (req, res) => {
    // if we get limit from req query we use it otherwise we use 6 by default
    // It's necessary to parse limit because it's sent as string
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    // Find all the products based on the category that matches the request product category 
    Product.find({ _id: { $ne: req.product }, category: req.product.category })
        .limit(limit)
        // We want to populate only the id_name
        .populate("category", "_id name")
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.status(200).json(products);
        });
};

// Return all the categories based on products
exports.listCategories = (req, res) => {
    // We use distinct to get all the categories that are used in the product more distinct to product
    Product.distinct("category", {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "Categories not found"
            });
        }
        res.status(200).json(categories);
    });
};

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    // findArgs will contain the category id's & the price range
    // The object will populate based on what we ge in the request body
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        // select all but the photo
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.status(200).json({
                size: data.length,
                data
            });
        });
};

// With this we can view any product photo
exports.photo = (req, res, next) => {
    // IF we have the product in the request then we can send it
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};