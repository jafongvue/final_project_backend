const db = require("../db/db");
const { validationResult } = require("express-validator");

const getAll = (req, res) => {
  try {
    db.query("select * from tb_amin_payment", (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found payment",
        });
      return res.status(200).json({ payment: result });
    });
  } catch (error) {
    console.log(error);
    return res.json({
      err: error.message,
    });
  }
};
//getTypeById
const getById = (req, res) => {
  try {
    const type_id = req.params.type_id;
    const sql = "select * from tb_amin_payment where pay_id=?";
    db.query(sql, [type_id], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found payment",
        });
      return res.status(200).json({ payment: result[0] });
    });
  } catch (error) {
    console.log(error);
    return res.json({
      err: error.message,
    });
  }
};
// getby order_id and user_id
const getByOrder_id = (req, res) => {
  try {
    const {order_id,user_id} = req.query;
    const sql = "select * from tb_amin_payment where order_id=? and user_id=?";
    db.query(sql, [order_id,user_id], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found payment123",
          err:error.message
        });
      return res.status(200).json({ payment: result[0] });
    });
  } catch (error) {
    return res.json({
      err: error.message,
    });
  }
};
//create
const create = (req, res) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ err: err.array()[0] });
    }
    var date = new Date()
      .toJSON()
      .slice(0, 10)
      
    const values = [
      req.body.Admin_id,
      req.body.user_id,
      req.body.order_id,
      date,
      req.body.totalSum,
      req.body.image,
    ];
    const sql = "insert into tb_amin_payment(Admin_id,user_id,order_id,date,totalSum,image) values(?)";
    db.query(sql, [values], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found payment",
          err:error.message
        });
      return res.status(200).json({ message: "Insert payment Successfully" });
    });
  } catch (error) {
    return res.json({
      err: error.message,
    });
  }
};
//update
const update=(req,res)=>{
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ err: err.array()[0] });
    }
    const {user_id} = req.body;
    const id=req.params.type_id;
    const sql = `update tb_payment(user_id) set user_id='${user_id}' where id='${id}'`;
    db.query(sql, (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found type",
          err:error.message
        });
      return res.status(200).json({ message: "Update type Successfully" });
    });
  } catch (error) {
    console.log(error);
    return res.json({
      err: error.message,
    });
  }
}
//delete
const deleteType=(req,res)=>{
try {
    const type_id=req.params.type_id;
    const sql=`delete from tb_type where type_id=?`
    db.query(sql,[typeName],(error,result)=>{
        if (error)
        return res.status(404).json({
          message: "Not found type",
        });
      return res.status(200).json({ message: "delete type Successfully" });
    })
} catch (error) {
    console.log(error);
    return res.json({
      err: error.message,
    });
}
}

module.exports={
    getAll,
    getById,
    create,
    update,
    deleteType,
    getByOrder_id,
}
