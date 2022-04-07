const express = require("express");
const router = express.Router();
const authenticateJWT = require("../auth");

const {
  getAll,
  getByID,
  addUser,
  addUserLogin,
  updateUser,
  deleteUser,
  logoutUser
} = require("../controllers/user.controller");

router.get("/", authenticateJWT, getAll);
router.get("/:id", authenticateJWT, getByID);
router.post("/register", addUser);
router.post("/login", addUserLogin);
router.put("/:id", authenticateJWT, updateUser);
router.delete("/:id", authenticateJWT, deleteUser);

module.exports = router;
