const express = require("express");
const router = express.Router();

const imageProductController = require("../controllers/imageProduct");
//const { validimageProduct } = require("../validations/imageProduct");

router.get("/", imageProductController.getAll);
router.post("/",imageProductController.create);
router
  .route("/:id")
  .get(imageProductController.getById)
  .put(imageProductController.update)
  .delete(imageProductController.deleteImage);

  module.exports=router
