const express = require("express");
const router = express.Router();

const {
    create,
    categoryById,
    read,
    update,
    remove,
    list
} = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/category/:categoryId", read);

// Only admin can create new categories
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
router.put("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, update );
router.delete("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, remove );
router.get("/categories", list);

router.param("categoryId", categoryById);
// Anytime we find a parameter called userId in the route userById will run and make the user info available in the request object
router.param("userId", userById);

module.exports = router;