const express = require("express");
const router = express.Router();

const AdminPaymentController = require("../controllers/AdminPayment");
// const { validType } = require("../validations/type");

router.get("/", AdminPaymentController.getAll);
router.get("/payment", AdminPaymentController.getByOrder_id);
router.post("/",AdminPaymentController.create);
router
  .route("/:id")
  .get(AdminPaymentController.getById)
  .put(AdminPaymentController.update)
  .delete(AdminPaymentController.deleteType);

  module.exports=router
