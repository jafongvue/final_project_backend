const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
//const { validUnit } = require("../validations/unit");
//const {verifyToken}=require("../middlewares/verifyToken.middlewares")


router.get("/", userController.getAll);
router.post("/",userController.create);
router.post("/login",userController.login);
router
  .route("/:id")
  .get(userController.getById)
  .put(userController.update)
  .delete(userController.deletes);

  module.exports=router
