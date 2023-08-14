const db = require("../db/db");
const { validationResult } = require("express-validator");

//getAll
const getAll = (req, res) => {
  try {
    const sql = `SELECT tb_product.pro_id,tb_product.proName,tb_product.type_id,tb_product.unit_id,
    tb_product.shop_id,tb_product.priceIn,tb_product.price,tb_product.qty,tb_product.details,
    tb_product.profile,tb_type.typeName,tb_unit.unitName FROM tb_product INNER JOIN tb_type ON 
    tb_type.type_id=tb_product.type_id INNER JOIN tb_unit ON tb_unit.unit_id=tb_product.unit_id`;
    db.query(sql, (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Not found product",
        });
      return res.status(200).json({ product: result });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};
const getAllLimit = (req, res) => {
  try {
    const { limit,search } = req.query;
    let limitValue = parseInt(limit);

    let sql = `SELECT tb_product.pro_id, tb_product.proName, tb_product.type_id, tb_product.unit_id,
    tb_product.shop_id, tb_product.priceIn, tb_product.price, tb_product.qty, tb_product.details,
    tb_product.profile, tb_type.typeName, tb_unit.unitName FROM tb_product 
    INNER JOIN tb_type ON tb_type.type_id=tb_product.type_id 
    INNER JOIN tb_unit ON tb_unit.unit_id=tb_product.unit_id`;

    if(search){
      const sql1 =`SELECT tb_product.pro_id, tb_product.proName, tb_product.type_id, tb_product.unit_id,
      tb_product.shop_id, tb_product.priceIn, tb_product.price, tb_product.qty, tb_product.details,
      tb_product.profile, tb_type.typeName, tb_unit.unitName FROM tb_product 
      INNER JOIN tb_type ON tb_type.type_id=tb_product.type_id 
      INNER JOIN tb_unit ON tb_unit.unit_id=tb_product.unit_id where tb_product.proName like '%${search}%' or tb_type .typeName like '%${search}%'`
      db.query(sql1,  (err, result) => {
        if (err)
          return res.status(404).json({
            message: "Not found product",
            err: err.message
          });
        return res.status(200).json({ product: result });
      });
    }
    else{
      if (limitValue) {
        limitValue += 8;
        sql += " LIMIT ?";
      } else {
        // Default limit if not provided
        limitValue = 8;
        sql += " LIMIT ?";
      }
      db.query(sql, [limitValue], (err, result) => {
        if (err)
          return res.status(404).json({
            message: "Not found product",
            err: err.message
          });
        return res.status(200).json({ product: result });
      });
    }

    
  } catch (error) {
    return res.status(400).json({
      err: error.message,
    });
  }
};

//getById
const getById = (req, res) => {
  try {
    const pro_id = req.params.id;
    const sql = `SELECT tb_product.pro_id,tb_product.proName,tb_product.type_id,tb_product.unit_id,
    tb_product.shop_id,tb_product.priceIn,tb_product.price,tb_product.qty,tb_product.details,
    tb_product.profile,tb_type.typeName,tb_unit.unitName FROM tb_product INNER JOIN tb_type ON 
    tb_type.type_id=tb_product.type_id INNER JOIN tb_unit ON tb_unit.unit_id=tb_product.unit_id 
    where pro_id=?`;
    db.query(sql, [pro_id], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Not found product",
        });
      return res.status(200).json({ product: result[0] });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};
const getByUser = (req, res) => {
  try {
    const shop_id = req.params.id;
    const sql = `SELECT tb_product.pro_id,tb_product.proName,tb_product.type_id,tb_product.unit_id,
    tb_product.shop_id,tb_product.priceIn,tb_product.price,tb_product.qty,tb_product.details,
    tb_product.profile,tb_type.typeName,tb_unit.unitName FROM tb_product INNER JOIN tb_type ON 
    tb_type.type_id=tb_product.type_id INNER JOIN tb_unit ON tb_unit.unit_id=tb_product.unit_id 
    where shop_id=?`;
    db.query(sql, [shop_id], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Not found product",
        });
      return res.status(200).json({ product: result });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};

//create
const create = (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({
        err: error.array(),
      });
    }
    var date = new Date().toJSON().slice(0, 10).replace(/-/g, "");
    var time = new Date()
      .toTimeString()
      .replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1", "")
      .replace(":", "")
      .replace(":", "");
    //var pro_id = "pro" + date.slice(2, date.length) + time;
    // let file = req.file.path;
    //let hashPss = bcrypt.hashSync(req.body.password, 10);
    //console.log(file);
    //let status='user'
    const values = [
      req.body.pro_id,
      req.body.proName,
      req.body.type_id,
      req.body.unit_id,
      req.body.shop_id,
      req.body.priceIn,
      req.body.price,
      req.body.qty,
      req.body.details,
      req.body.profile,
    ];
    const sql = `insert into tb_product(pro_id,proName,type_id,
       unit_id,shop_id,priceIn,price,qty,details,profile) values(?)`;
    db.query(sql, [values], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Bad request",
        });
      return res.status(200).json({
        message: "Insert product Successfully",
        // pro:pro_id
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
const update = (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({
        err: error.array(),
      });
    }
    //let file = req.file.path;
    const values = [
      req.body.proName,
      req.body.type_id,
      req.body.unit_id,
      req.body.priceIn,
      req.body.price,
      req.body.qty,
      req.body.details,
      req.body.profile,
    ];
    const { proName, type_id, unit_id, priceIn, price, qty, details, profile } =
      req.body;
    const pro_id = req.params.id;
    const sql = `update tb_product set proName='${proName}',type_id='${type_id}',unit_id='${unit_id}' 
     ,priceIn='${priceIn}',price='${price}' 
      ,qty='${qty}',details='${details}',profile='${profile}' where pro_id='${pro_id}'`;
    db.query(sql, (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Bad Request",
          err: err.message,
        });
      return res.status(200).json({ message: "Update product Successfully" });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};
const updateQty = (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({
        err: error.array(),
      });
    }
    //let file = req.file.path;
    const { qty } = req.body;
    const pro_id = req.params.id;
    const sql = `update tb_product set qty=qty-'${qty}' where
    pro_id='${pro_id}'`;
    db.query(sql, (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Bad Request",
          err:err.message
        });
      return res
        .status(200)
        .json({ message: "Update product Qty Successfully" });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};
const deletes = (req, res) => {
  try {
    const pro_id = req.params.id;
    const sql = `delete from tb_product where pro_id=?`;
    db.query(sql, [pro_id], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found product",
        });
      return res.status(200).json({ message: "delete product Successfully" });
    });
  } catch (error) {
    console.log(error);
    return res.json({
      err: error.message,
    });
  }
};

module.exports = {
  getAll,
  getById,
  getAllLimit,
  getByUser,
  create,
  update,
  updateQty,
  deletes,
};
