const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");
//const { validUnit } = require("../validations/unit");
//const {verifyToken}=require("../middlewares/verifyToken.middlewares")


router.get("/", productController.getAll);
router.get("/getAllLimit", productController.getAllLimit);
router.post("/",productController.create);
router
  .route("/:id")
  .get(productController.getById)
  .put(productController.update)
  .delete(productController.deletes);
  router.get('/byUser/:id',productController.getByUser)
  router.put('/updateQty/:id',productController.updateQty)

  module.exports=router
