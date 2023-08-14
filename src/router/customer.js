const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customer");
//const { validUnit } = require("../validations/unit");
//const {verifyToken}=require("../middlewares/verifyToken.middlewares")


router.get("/", customerController.getAll);
router.post("/",customerController.create);
router
  .route("/:id")
  .get(customerController.getById)
  .put(customerController.update)
  .delete(customerController.deletes);

  module.exports=router
