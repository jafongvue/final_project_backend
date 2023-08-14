const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");
// const { validUnit } = require("../validations/");

router.get("/", shopController.getAll);
router.get("/byUser/:id", shopController.getByIdUser);
router.post("/", shopController.create);
router
  .route("/:id")
  .get(shopController.getById)
  .put( shopController.update)
  .delete(shopController.deletes);

  module.exports=router
