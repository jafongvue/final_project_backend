const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment");
//const { validUnit } = require("../validations/unit");
//const {verifyToken}=require("../middlewares/verifyToken.middlewares")


router.get("/", paymentController.getAll);
router.post("/",paymentController.create);
router
  .route("/:id")
  .get(paymentController.getById)
  .put(paymentController.update)
  .delete(paymentController.deleteType)

  module.exports=router
