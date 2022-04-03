const express = require('express')
const router = express.Router();
const authenticateJWT = require('../auth')
const { getAll, getById, addProduct, updateProductById, deleteProductById  } = require('../controllers/product.controller')

router.get('/', getAll)

router.get("/:id", getById);

router.post("/", authenticateJWT, addProduct);

router.put("/:id", authenticateJWT, updateProductById);

router.delete("/:id", authenticateJWT, deleteProductById);

module.exports = router;
