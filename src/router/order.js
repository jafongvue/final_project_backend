const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order");
//const { validUnit } = require("../validations/unit");
//const {verifyToken}=require("../middlewares/verifyToken.middlewares")

// get to admin
router.get("/", orderController.getAllOrder);
router.get("/allOrder", orderController.getAllOrders);
router.get("/detail", orderController.getAllOrderDetail);
router.get("/detail/:id", orderController.getDetailById);
router.get("/getMoney/:id", orderController.getSumAllMoney);
router.get("/get-reportOrder", orderController.reportOrder);
//  report to shop
router.get("/get/ProductOrderBuy", orderController.getProductBestOrderBuy);
router.get("/reportTopOrderByShop/:id", orderController.reportTopOrderByShop);
router.get("/reportOrderByShop/:id", orderController.reportOrderByShop);
router.get("/best/OrderByShop", orderController.BestOrderByShop);
// getHistoryOrderToCustomer
router.get("/getOrderShowToCus/:id", orderController.getOrderShowToCus);
// router.get("/getAllOldOrderShowToCus/:id", orderController.getAllOldOrderShowToCus);
// end
// getOrderShowToShop
router.get("/getOrderShowToShop/:id", orderController.getOrderShowToShop);
router.get("/getHistoryOrderShowToShop/:id", orderController.getAllOldOrderShowToShop);
router.get("/getAllOrderDetailToShop", orderController.getAllOrderDetailToShop);
router.get("/getHistoryOrderDetailToShop", orderController.getAllOldOrderDetailToShop);
router.put("/updateOrderDetail_status/:id", orderController.updateOrderDetail_status);

router.post("/",orderController.createOrder);
router.post("/detail",orderController.createOrderDetail);
router
  .route("/:id")
  .get(orderController.getById)
  .put(orderController.updateOrder)
  .delete(orderController.deleteOrder)
router
  .route("/detail/:id")
  .delete(orderController.deleteOrderDetail);

  module.exports=router
