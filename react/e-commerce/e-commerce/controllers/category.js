const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

// required category will be stored in req
exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Category does not exist"
            });
        }
        req.category = category;
        next();
    });
};

// Create a new category
exports.create = (req, res) => {
    // New category is created based on data send from req.body
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                // dbErrorHandler from helpers is used to make errors more understandable
                error: errorHandler(err)
            });
        }
        // If there is no error new category is created and sent as response
        res.json({ data });
    });
};

// Send category received as parameter in URI
exports.read = (req, res) => {
    return res.json(req.category);
};

// Update a category
exports.update = (req, res) => {
    const category = req.category;
    // Category has only a field
    category.name = req.body.name;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.status(202).json(data);
    });
};

// Delete a category
exports.remove = (req, res) => {
    const category = req.category;
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.status(202).json({
            message: "Category deleted"
        });
    });
};

// View all categories
exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.status(200).json(data);
    });
};