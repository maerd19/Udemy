const express = require("express");
const router = express.Router();

const {
    create,
    productById,
    read,
    remove,
    update
} = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete("/product/:productId/:userId", requireSignin, isAuth, isAdmin, remove);
router.put("/product/:productId/:userId", requireSignin, isAuth, isAdmin, update);

// anytime we find a parameter called userId in the route userById will run and make the user info available in the request object
router.param("userId", userById);
// anytime we find a parameter called productId in the route productById will run
router.param("productId", productById);

module.exports = router;