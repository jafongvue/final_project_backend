const express = require("express");
const router = express.Router();

const loginController = require("../controllers/login");
//const { validlogin } = require("../validations/login");

router.get("/", loginController.getAll);
router.post("/",loginController.create);
router.post("/signIn",loginController.SignIn);
router
  .route("/:id")
  .get(loginController.getById)
  .put(loginController.update)
  .delete(loginController.deleteType);
router.put('/customer/:id',loginController.updateCustomer)
router.put('/user/:id',loginController.updateUser)
router.delete('/user/:id',loginController.deleteUser)
   

  module.exports=router
