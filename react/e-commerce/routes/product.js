const express = require("express");
const router = express.Router();

const {
    create,
    productById,
    read,
    remove,
    update,
    list,
    listRelated,
    listCategories,
    listBySearch,
    photo
} = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete("/product/:productId/:userId", requireSignin, isAuth, isAdmin, remove);
router.put("/product/:productId/:userId", requireSignin, isAuth, isAdmin, update);

// List of all the products
router.get("/products", list);
// Based on the productId related products will be fetched
router.get("/products/related/:productId", listRelated);
// Return all the categories that are not being used on products
router.get("/products/categories", listCategories);
// list products by search
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);

// anytime we find a parameter called userId in the route userById will run and make the user info available in the request object
router.param("userId", userById);
// anytime we find a parameter called productId in the route productById will run
router.param("productId", productById);

module.exports = router;