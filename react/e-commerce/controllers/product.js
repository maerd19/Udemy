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

// Read a single product
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