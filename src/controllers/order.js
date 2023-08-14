const db = require("../db/db");
const { validationResult } = require("express-validator");

//getAll by status=waiting
const getAllOrder = (req, res) => {
  try {
    const sql = "SELECT th_order.order_id,th_order.admin_id,th_order.cus_id,th_order.date,th_order.update_date,th_order.status,th_order.image,tb_customer.fullName,tb_customer.tel FROM th_order INNER JOIN tb_customer ON tb_customer.cus_id=th_order.cus_id where th_order.status='waiting' ORDER BY th_order.date DESC";
    db.query(sql, (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Not found order",
        });
      return res.status(200).json({ order: result });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};
// get order all
const getAllOrders = (req, res) => {
  try {
    const sql = "SELECT th_order.order_id,th_order.admin_id,th_order.cus_id,th_order.date,th_order.update_date,th_order.status,th_order.image,tb_customer.fullName,tb_customer.tel FROM th_order INNER JOIN tb_customer ON tb_customer.cus_id=th_order.cus_id ORDER BY th_order.date DESC";
    db.query(sql, (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Not found order",
        });
      return res.status(200).json({ order: result });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};

// get all order to shop
const getOrderShowToShop = (req, res) => {
  try {
    const shop_id=req.params.id
    const sql = `SELECT th_order.order_id,th_order.admin_id,th_order.cus_id,th_order.date,th_order.update_date,
    th_order.status,th_order.image,tb_customer.fullName,tb_customer.tel,tb_orderdetails.shop_id FROM th_order INNER JOIN tb_customer
     ON tb_customer.cus_id=th_order.cus_id inner join tb_orderdetails on tb_orderdetails.order_id=th_order.order_id
      where tb_orderdetails.shop_id=? and (th_order.status='confirm' and tb_orderdetails.status='new') ORDER BY th_order.date DESC`;
    db.query(sql,[shop_id], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Not found order",
        });
      return res.status(200).json({ order: result });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};
// get all order to customer
const getOrderShowToCus = (req, res) => {
  try {
    const cus_id=req.params.id
    const sql = `SELECT th_order.order_id,th_order.admin_id,th_order.cus_id,th_order.date,th_order.update_date,
    th_order.status,th_order.image,tb_customer.fullName,tb_customer.tel,tb_orderdetails.shop_id FROM th_order INNER JOIN tb_customer
     ON tb_customer.cus_id=th_order.cus_id inner join tb_orderdetails on tb_orderdetails.order_id=th_order.order_id
      where th_order.cus_id=? ORDER BY th_order.date DESC`;
    db.query(sql,[cus_id], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Not found order",
          err:err.message
        });
      return res.status(200).json({ order: result });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};
// get all history orderDetail to customer
// const getAllOldOrderShowToCus = (req, res) => {
//   try {
//     const {order_id}=req.params.id;
//       const sql = `SELECT tb_orderdetails.id,tb_orderdetails.order_id,tb_orderdetails.shop_id,
//       tb_orderdetails.pro_id,tb_orderdetails.qty,tb_orderdetails.price,tb_product.proName,tb_product.profile,
//       tb_product.type_id,tb_product.unit_id,tb_type.typeName,tb_unit.unitName FROM tb_orderdetails
//        INNER JOIN tb_shop ON tb_shop.shop_id=tb_orderdetails.shop_id INNER JOIN tb_product ON 
//        tb_product.pro_id=tb_orderdetails.pro_id INNER JOIN tb_type ON tb_type.type_id=tb_product.type_id
//         INNER JOIN tb_unit ON tb_unit.unit_id=tb_product.unit_id where tb_shop.shop_id=? and 
//         tb_orderdetails.order_id=?`;
//       db.query(sql,[order_id], (err, result) => {
//         if (err)
//           return res.status(404).json({
//             message: "Not found orderDetail",
//             err:err.message
//           });orderDetail
//         return res.status(200).json({ : result });
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(400).json({
//         err: error.message,
//       });
//     }
// };
// get all history order to shop
const getAllOldOrderShowToShop = (req, res) => {
  try {
    const shop_id=req.params.id
    const sql = `SELECT th_order.order_id,th_order.admin_id,th_order.cus_id,th_order.date,th_order.update_date,
    th_order.status,th_order.image,tb_customer.fullName,tb_customer.tel,tb_orderdetails.shop_id,tb_orderdetails.status as detail_status FROM th_order INNER JOIN tb_customer
     ON tb_customer.cus_id=th_order.cus_id inner join tb_orderdetails on tb_orderdetails.order_id=th_order.order_id
      where tb_orderdetails.shop_id=? and th_order.status='confirm' ORDER BY th_order.date DESC`;
    db.query(sql,[shop_id], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Not found order",
        });
      return res.status(200).json({ order: result });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};

const getAllOrderDetail = (req, res) => {
  try {
    const sql = `SELECT tb_orderdetails.id,tb_orderdetails.order_id,tb_orderdetails.shop_id,
    tb_orderdetails.pro_id,tb_orderdetails.qty,tb_orderdetails.price,tb_product.proName,
    tb_product.type_id,tb_product.unit_id,tb_type.typeName,tb_unit.unitName FROM tb_orderdetails
     INNER JOIN tb_shop ON tb_shop.shop_id=tb_orderdetails.shop_id INNER JOIN tb_product ON 
     tb_product.pro_id=tb_orderdetails.pro_id INNER JOIN tb_type ON tb_type.type_id=tb_product.type_id
      INNER JOIN tb_unit ON tb_unit.unit_id=tb_product.unit_id`;
    db.query(sql, (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Not found orderDetail",
        });
      return res.status(200).json({ orderDetail: result });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};
// get new orderDetail to shop
const getAllOrderDetailToShop = (req, res) => {
  try {
  const {shop_id,order_id}=req.query;
    const sql = `SELECT tb_orderdetails.id,tb_orderdetails.order_id,tb_orderdetails.shop_id,
    tb_orderdetails.pro_id,tb_orderdetails.qty,tb_orderdetails.price,tb_product.proName,tb_product.profile,
    tb_product.type_id,tb_product.unit_id,tb_type.typeName,tb_unit.unitName FROM tb_orderdetails
     INNER JOIN tb_shop ON tb_shop.shop_id=tb_orderdetails.shop_id INNER JOIN tb_product ON 
     tb_product.pro_id=tb_orderdetails.pro_id INNER JOIN tb_type ON tb_type.type_id=tb_product.type_id
      INNER JOIN tb_unit ON tb_unit.unit_id=tb_product.unit_id where tb_shop.shop_id=? and 
      tb_orderdetails.order_id=? and tb_orderdetails.status='new'`;
    db.query(sql,[shop_id,order_id], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Not found orderDetail",
          err:err.message
        });
      return res.status(200).json({ orderDetail: result });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};
// get all history order detail to shop
const getAllOldOrderDetailToShop = (req, res) => {
  try {
  const {shop_id,order_id}=req.query;
    const sql = `SELECT tb_orderdetails.id,tb_orderdetails.order_id,tb_orderdetails.shop_id,
    tb_orderdetails.pro_id,tb_orderdetails.qty,tb_orderdetails.price,tb_product.proName,tb_product.profile,
    tb_product.type_id,tb_product.unit_id,tb_type.typeName,tb_unit.unitName FROM tb_orderdetails
     INNER JOIN tb_shop ON tb_shop.shop_id=tb_orderdetails.shop_id INNER JOIN tb_product ON 
     tb_product.pro_id=tb_orderdetails.pro_id INNER JOIN tb_type ON tb_type.type_id=tb_product.type_id
      INNER JOIN tb_unit ON tb_unit.unit_id=tb_product.unit_id where tb_shop.shop_id=? and 
      tb_orderdetails.order_id=?`;
    db.query(sql,[shop_id,order_id], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Not found orderDetail",
          err:err.message
        });
      return res.status(200).json({ orderDetail: result });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};

//getById
const getById = (req, res) => {
  try {
    const order_id = req.params.id;
    const sql = `SELECT th_order.order_id,th_order.admin_id,th_order.cus_id,th_order.date,
    th_order.update_date,th_order.status,th_order.image,tb_customer.fullName,tb_customer.tel
     FROM th_order INNER JOIN tb_customer ON tb_customer.cus_id=th_order.cus_id where order_id=?`;
    db.query(sql, [order_id], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Not found order",
        });
      return res.status(200).json({ order: result[0] });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};
// get order detail by id
const getDetailById = (req, res) => {
  try {
    const order_id = req.params.id;
    const sql = `SELECT tb_orderdetails.id,tb_orderdetails.order_id,tb_orderdetails.shop_id,tb_shop.shop_name,
    tb_orderdetails.pro_id,tb_orderdetails.qty,tb_orderdetails.price,tb_product.proName,tb_product.profile,
    tb_product.type_id,tb_product.unit_id,tb_type.typeName,tb_unit.unitName FROM tb_orderdetails
     INNER JOIN tb_shop ON tb_shop.shop_id=tb_orderdetails.shop_id INNER JOIN tb_product ON 
     tb_product.pro_id=tb_orderdetails.pro_id INNER JOIN tb_type ON tb_type.type_id=tb_product.type_id
      INNER JOIN tb_unit ON tb_unit.unit_id=tb_product.unit_id where order_id=?`;
    db.query(sql, [order_id], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Not found order",
        });
      return res.status(200).json({ order: result });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};
// sum money shop
const getSumAllMoney = (req, res) => {
  try {
    const order_id = req.params.id;
    const sql = `SELECT tb_orderdetails.shop_id,tb_shop.shop_name,
    SUM(tb_orderdetails.qty*tb_orderdetails.price) AS sumMoney FROM tb_orderdetails
      INNER JOIN tb_shop ON tb_shop.shop_id=tb_orderdetails.shop_id where order_id=? GROUP BY tb_orderdetails.shop_id`;
    db.query(sql, [order_id], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Not found order",
        });
      return res.status(200).json({ order: result });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};

//create
const createOrder = (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({
        err: error.array(),
      });
    }
    var date = new Date().toJSON().slice(0, 10);
    var update_date = new Date().toJSON().slice(0, 10);
    let status = "waiting";
    const values = [
      req.body.order_id,
      req.body.admin_id,
      req.body.cus_id,
      date,
      update_date,
      status,
      req.body.image
    ];
    const sql = `insert into th_order(order_id,admin_id,cus_id,date,update_date,status,image) values(?)`;
    db.query(sql, [values], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Bad request",
          err:err.message 
        });
      return res.status(200).json({
        message: "Insert order Successfully",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};
const createOrderDetail = (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({
        err: error.array(),
      });
    }
     const status="new"
    const values = [
      req.body.order_id,
      req.body.shop_id,
      req.body.pro_id,
      req.body.qty,
      req.body.price,
      status
    ];
    const sql = `insert into tb_orderdetails(order_id,shop_id,pro_id,qty,
       price,status) values(?)`;
    db.query(sql, [values], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Bad request",
          err:err.message
        });
      return res.status(200).json({
        message: "Insert order Successfully",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};

//update
const updateOrder = (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({
        err: error.array(),
      });
    }
    const {admin_id,update_date, status}=req.body;
    const order_id = req.params.id;
    const sql = `update th_order set admin_id=?,update_date=?,status=? where order_id=?`;
    db.query(sql, [admin_id,update_date, status, order_id], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Bad Request",
          err:err.message
        });
      return res.status(200).json({ message: "Update order Successfully" });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};
//update status of orderDetail
const updateOrderDetail_status = (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({
        err: error.array(),
      });
    }
    // const {status}=req.body;
    const status="confirm"
    const id = req.params.id;
    const sql = `update tb_orderdetails set status=? where id=?`;
    db.query(sql, [status, id], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Bad Request",
          err:err.message
        });
      return res.status(200).json({ message: "Update orderDetail Successfully" });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};
const deleteOrder = (req, res) => {
  try {
    const order_id = req.params.id;
    const sql = `delete from th_order where order_id=?`;
    db.query(sql, [order_id], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found customer",
        });
      return res.status(200).json({ message: "delete order Successfully" });
    });
  } catch (error) {
    console.log(error);
    return res.json({
      err: error.message,
    });
  }
};
const deleteOrderDetail = (req, res) => {
  try {
    const order_id = req.params.id;
    const sql = `delete from tb_orderdetails where order_id=?`;
    db.query(sql, [order_id], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found orderDetail",
        });
      return res.status(200).json({ message: "delete orderDetail Successfully" });
    });
  } catch (error) {
    console.log(error);
    return res.json({
      err: error.message,
    });
  }
};

// API ດຶງຂໍ້ມູນສິນຄ້າຍອດນິຍົມຂອງແຕ່ຮ້ານ
const reportTopOrderByShop = (req, res) => {
  try {
    const shop_id = req.params.id;
    const {first_date,end_date}=req.query
    if(first_date && end_date){
      db.query(
        `SELECT tb_orderdetails.pro_id, tb_product.proName, SUM(tb_orderdetails.qty) AS qty,SUM(tb_orderdetails.price) AS price, tb_type.typeName,tb_product.shop_id,tb_shop.shop_name,tb_unit.unitName,tb_product.profile
        FROM tb_orderdetails
        INNER JOIN tb_product ON tb_product.pro_id = tb_orderdetails.pro_id
        INNER JOIN tb_type ON tb_type.type_id = tb_product.type_id
        INNER JOIN tb_shop ON tb_shop.shop_id=tb_product.shop_id
        INNER JOIN tb_unit ON tb_unit.unit_id=tb_product.unit_id
        INNER JOIN th_order ON th_order.order_id = tb_orderdetails.order_id
        WHERE tb_product.shop_id='${shop_id}' AND th_order.date BETWEEN '${first_date}' AND '${end_date}'
        GROUP BY tb_orderdetails.pro_id, tb_product.proName, tb_type.typeName
        ORDER BY qty DESC
        LIMIT 10`,
        (err, result) => {
            if (err) throw err.message;
             res.json(result);
        }
    );
    }else{
       db.query(
          `SELECT tb_orderdetails.pro_id, tb_product.proName, SUM(tb_orderdetails.qty) AS qty,SUM(tb_orderdetails.price) AS price, tb_type.typeName,tb_product.shop_id,tb_shop.shop_name,tb_unit.unitName,tb_product.profile
          FROM tb_orderdetails
          INNER JOIN tb_product ON tb_product.pro_id = tb_orderdetails.pro_id
          INNER JOIN tb_type ON tb_type.type_id = tb_product.type_id
          INNER JOIN tb_shop ON tb_shop.shop_id=tb_product.shop_id
          INNER JOIN tb_unit ON tb_unit.unit_id=tb_product.unit_id
          INNER JOIN th_order ON th_order.order_id = tb_orderdetails.order_id
          WHERE tb_product.shop_id='${shop_id}' AND th_order.date > (NOW() - INTERVAL 3 MONTH)
          GROUP BY tb_orderdetails.pro_id, tb_product.proName, tb_type.typeName
          ORDER BY qty DESC
          LIMIT 10`,
          (err, result) => {
              if (err) throw err;
              res.json(result);
          }
      );
    }
  } catch (error) {
    return res.json({
      err: error.message,
    });
  }
};
// API ດຶງຂໍ້ມູນorderສິນຄ້າຂອງແຕ່ຮ້ານ
const reportOrderByShop = (req, res) => {
  try {
    const shop_id = req.params.id;
    const {first_date,end_date}=req.query
    if(first_date && end_date){
      const sql = `SELECT tb_orderdetails.id,tb_orderdetails.order_id,tb_orderdetails.shop_id,tb_shop.shop_name,
    tb_orderdetails.pro_id,tb_orderdetails.qty AS order_qty,tb_orderdetails.price AS priceSale,tb_product.proName,tb_product.priceIn,tb_product.profile,
    tb_product.type_id,tb_product.unit_id,tb_type.typeName,tb_unit.unitName,th_order.date FROM tb_orderdetails
     LEFT JOIN tb_shop ON tb_shop.shop_id=tb_orderdetails.shop_id LEFT JOIN tb_product ON 
     tb_product.pro_id=tb_orderdetails.pro_id LEFT JOIN tb_type ON tb_type.type_id=tb_product.type_id
      LEFT JOIN tb_unit ON tb_unit.unit_id=tb_product.unit_id LEFT JOIN th_order ON 
      th_order.order_id=tb_orderdetails.order_id where tb_shop.shop_id=? AND th_order.date BETWEEN ? AND ? ORDER BY order_qty DESC`;
    db.query(sql,[shop_id,first_date,end_date], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found orderDetail",
          err:error.message
        });
      return res.status(200).json({ message: "fetch orderDetail Successfully",result});
    });
    }else{
      const sql = `SELECT tb_orderdetails.id,tb_orderdetails.order_id,tb_orderdetails.shop_id,tb_shop.shop_name,
    tb_orderdetails.pro_id,tb_orderdetails.qty AS order_qty,tb_orderdetails.price AS priceSale,tb_product.proName,tb_product.priceIn,tb_product.profile,
    tb_product.type_id,tb_product.unit_id,tb_type.typeName,tb_unit.unitName,th_order.date FROM tb_orderdetails
     LEFT JOIN tb_shop ON tb_shop.shop_id=tb_orderdetails.shop_id LEFT JOIN tb_product ON 
     tb_product.pro_id=tb_orderdetails.pro_id LEFT JOIN tb_type ON tb_type.type_id=tb_product.type_id
      LEFT JOIN tb_unit ON tb_unit.unit_id=tb_product.unit_id LEFT JOIN th_order ON 
      th_order.order_id=tb_orderdetails.order_id where tb_shop.shop_id=?`;
    db.query(sql,[shop_id], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found orderDetail",
          err:error.message
        });
      return res.status(200).json({ message: "fetch orderDetail Successfully",result});
    });
    }
  } catch (error) {
    return res.json({
      err: error.message,
    });
  }
};
const BestOrderByShop = (req, res) => {
  try {
      db.query(
          `SELECT tb_orderdetails.id,tb_orderdetails.order_id,tb_orderdetails.shop_id,tb_shop.shop_name,
          tb_orderdetails.pro_id,tb_orderdetails.qty AS order_qty,tb_orderdetails.price AS priceSale,tb_product.proName,tb_product.priceIn,tb_product.profile,
          tb_product.type_id,tb_product.unit_id,tb_type.typeName,tb_unit.unitName,th_order.date FROM tb_orderdetails
           LEFT JOIN tb_shop ON tb_shop.shop_id=tb_orderdetails.shop_id LEFT JOIN tb_product ON 
           tb_product.pro_id=tb_orderdetails.pro_id LEFT JOIN tb_type ON tb_type.type_id=tb_product.type_id
            LEFT JOIN tb_unit ON tb_unit.unit_id=tb_product.unit_id LEFT JOIN th_order ON 
            th_order.order_id=tb_orderdetails.order_id where tb_shop.shop_id=? AND th_order.date BETWEEN ? AND ? ORDER BY order_qty DESC`,
          (err, result) => {
              if (err) throw err;
              res.json(result);
          }
      );
  } catch (err) {
      return res.status(400).send({
          message: "Bad request",
          error: err.message,
      });
  }
};



const reportOrder = (req, res) => {
  try {
    const {first_date,end_date}=req.query
    if(first_date && end_date){
      const sql = `SELECT tb_orderdetails.id,tb_orderdetails.order_id,tb_orderdetails.shop_id,tb_shop.shop_name,
    tb_orderdetails.pro_id,tb_orderdetails.qty AS order_qty,tb_orderdetails.price AS priceSale,tb_product.proName,tb_product.priceIn,tb_product.profile,
    tb_product.type_id,tb_product.unit_id,tb_type.typeName,tb_unit.unitName,th_order.date FROM tb_orderdetails
     LEFT JOIN tb_shop ON tb_shop.shop_id=tb_orderdetails.shop_id LEFT JOIN tb_product ON 
     tb_product.pro_id=tb_orderdetails.pro_id LEFT JOIN tb_type ON tb_type.type_id=tb_product.type_id
      LEFT JOIN tb_unit ON tb_unit.unit_id=tb_product.unit_id LEFT JOIN th_order ON 
      th_order.order_id=tb_orderdetails.order_id where th_order.date BETWEEN ? AND ? ORDER BY order_qty DESC`;
    db.query(sql,[first_date,end_date], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found orderDetail",
          err:error.message
        });
      return res.status(200).json({ message: "fetch orderDetail Successfully",result});
    });
    }else{
      const sql = `SELECT tb_orderdetails.id,tb_orderdetails.order_id,tb_orderdetails.shop_id,tb_shop.shop_name,
    tb_orderdetails.pro_id,tb_orderdetails.qty AS order_qty,tb_orderdetails.price AS priceSale,tb_product.proName,tb_product.priceIn,tb_product.profile,
    tb_product.type_id,tb_product.unit_id,tb_type.typeName,tb_unit.unitName,th_order.date FROM tb_orderdetails
     LEFT JOIN tb_shop ON tb_shop.shop_id=tb_orderdetails.shop_id LEFT JOIN tb_product ON 
     tb_product.pro_id=tb_orderdetails.pro_id LEFT JOIN tb_type ON tb_type.type_id=tb_product.type_id
      LEFT JOIN tb_unit ON tb_unit.unit_id=tb_product.unit_id LEFT JOIN th_order ON 
      th_order.order_id=tb_orderdetails.order_id`;
    db.query(sql, (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found orderDetail",
          err:error.message
        });
      return res.status(200).json({ message: "fetch orderDetail Successfully",result});
    });
    }
    
  } catch (error) {
    return res.json({
      err: error.message,
    });
  }
};

const getProductBestOrderBuy = (req, res) => {
  try {
    const {first_date,end_date}=req.query
    if(first_date && end_date){
      db.query(
        `SELECT tb_orderdetails.pro_id, tb_product.proName, SUM(tb_orderdetails.qty) AS qty,SUM(tb_orderdetails.price) AS price, tb_type.typeName,tb_product.shop_id,tb_shop.shop_name,tb_unit.unitName,tb_product.profile
        FROM tb_orderdetails
        INNER JOIN tb_product ON tb_product.pro_id = tb_orderdetails.pro_id
        INNER JOIN tb_type ON tb_type.type_id = tb_product.type_id
        INNER JOIN tb_shop ON tb_shop.shop_id=tb_product.shop_id
        INNER JOIN tb_unit ON tb_unit.unit_id=tb_product.unit_id
        INNER JOIN th_order ON th_order.order_id = tb_orderdetails.order_id
        WHERE th_order.date BETWEEN '${first_date}' AND '${end_date}'
        GROUP BY tb_orderdetails.pro_id, tb_product.proName, tb_type.typeName
        ORDER BY qty DESC
        LIMIT 10`,
        (err, result) => {
            if (err) throw err.message;
             res.json(result);
        }
    );
    }else{
       db.query(
          `SELECT tb_orderdetails.pro_id, tb_product.proName, SUM(tb_orderdetails.qty) AS qty,SUM(tb_orderdetails.price) AS price, tb_type.typeName,tb_product.shop_id,tb_shop.shop_name,tb_unit.unitName,tb_product.profile
          FROM tb_orderdetails
          INNER JOIN tb_product ON tb_product.pro_id = tb_orderdetails.pro_id
          INNER JOIN tb_type ON tb_type.type_id = tb_product.type_id
          INNER JOIN tb_shop ON tb_shop.shop_id=tb_product.shop_id
          INNER JOIN tb_unit ON tb_unit.unit_id=tb_product.unit_id
          INNER JOIN th_order ON th_order.order_id = tb_orderdetails.order_id
          WHERE th_order.date > (NOW() - INTERVAL 3 MONTH)
          GROUP BY tb_orderdetails.pro_id, tb_product.proName, tb_type.typeName
          ORDER BY qty DESC
          LIMIT 10`,
          (err, result) => {
              if (err) throw err;
              res.json(result);
          }
      );
    }
     
  } catch (err) {
      return res.status(400).send({
          message: "Bad request",
          error: err.message,
      });
  }
};

module.exports = {
  getAllOrder,
  getAllOrderDetail,
  getById,
  createOrder,
  createOrderDetail,
  updateOrder,
  deleteOrder,
  deleteOrderDetail,
  getDetailById,
  getSumAllMoney,
  reportTopOrderByShop,
  reportOrderByShop,
  getProductBestOrderBuy,
  reportOrder,
  BestOrderByShop,
  getOrderShowToShop,
  updateOrderDetail_status,
  getAllOrderDetailToShop,
  getAllOldOrderDetailToShop,
  getAllOldOrderShowToShop,
  getAllOrders,
  getOrderShowToCus,
  // getAllOldOrderShowToCus
};
