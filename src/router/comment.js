const express = require("express");
const router = express.Router();

const commentController = require("../controllers/comment");
// const { validType } = require("../validations/type");

router.get("/", commentController.getAll);
router.get("/commentCus/:id", commentController.getByIdCus_id);
router.get("/commentOrder/:id", commentController.getByIds);
router.get("/getcount-item/:id", commentController.getCommentCount_Item);
router.put("/see_notification/:id", commentController.Edit_Receive_Status);
router.post("/", commentController.create);
router
  .route("/:id")
  .get(commentController.getById)
  .put(commentController.update)
  .delete(commentController.deleteType);

module.exports = router;
