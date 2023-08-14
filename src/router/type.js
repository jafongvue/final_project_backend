const express = require("express");
const router = express.Router();

const typeController = require("../controllers/type");
const { validType } = require("../validations/type");

router.get("/", typeController.getAll);
router.post("/", validType, typeController.create);
router
  .route("/:id")
  .get(typeController.getById)
  .put(validType, typeController.update)
  .delete(typeController.deleteType);

  module.exports=router
