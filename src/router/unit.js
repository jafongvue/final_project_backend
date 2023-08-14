const express = require("express");
const router = express.Router();

const unitController = require("../controllers/unit");
const { validUnit } = require("../validations/unit");

router.get("/", unitController.getAll);
router.post("/", validUnit, unitController.create);
router
  .route("/:id")
  .get(unitController.getById)
  .put(validUnit, unitController.update)
  .delete(unitController.deleteUnit);

  module.exports=router
