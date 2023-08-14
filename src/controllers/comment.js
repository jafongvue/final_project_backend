const db = require("../db/db");
const { validationResult } = require("express-validator");

const getAll = (req, res) => {
  try {
    db.query(
      `SELECT tb_comment.id,tb_comment.order_id,tb_comment.admin_id,tb_comment.cus_id,
    tb_comment.cus_content,tb_comment.recieve,tb_comment.date,tb_comment.time,tb_comment.status,
    tb_user.fullName FROM tb_comment INNER JOIN tb_user ON tb_user.user_id=tb_comment.admin_id`,
      (error, result) => {
        if (error)
          return res.status(404).json({
            message: "Not found type",
          });
        return res.status(200).json({ comment: result });
      }
    );
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
    const id = req.params.id;
    const sql = `SELECT tb_comment.id,tb_comment.order_id,tb_comment.admin_id,tb_comment.cus_id,
    tb_comment.cus_content,tb_comment.recieve,tb_comment.date,tb_comment.time,tb_comment.status,
    tb_user.fullName FROM tb_comment INNER JOIN tb_user ON tb_user.user_id=tb_comment.admin_id where id=?`;
    db.query(sql, [id], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found type",
        });
      return res.status(200).json({ comment: result[0] });
    });
  } catch (error) {
    return res.json({
      err: error.message,
    });
  }
};
// get comment by order_id
const getByIds = (req, res) => {
  try {
    const id = req.params.id;
    const sql = `SELECT * from tb_comment inner join th_order on tb_comment.order_id=th_order.order_id where th_order.order_id=?`;
    db.query(sql, [id], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found type",
          err:error.message
        });

      return res.status(200).json({ comment: result[0] });
    });
  } catch (error) {
    return res.json({
      err: error.message,
    });
  }
};
const getByIdCus_id = (req, res) => {
  try {
    const cus_id = req.params.id;
    const sql = `SELECT tb_comment.id,tb_comment.order_id,tb_comment.admin_id,tb_comment.cus_id,
    tb_comment.cus_content,tb_comment.recieve,tb_comment.date,tb_comment.time,tb_comment.status,
    tb_user.fullName,tb_user.profile FROM tb_comment INNER JOIN tb_user ON tb_user.user_id=tb_comment.admin_id 
    WHERE tb_comment.cus_id = ? and tb_comment.status>0 ORDER BY tb_comment.date DESC,tb_comment.time DESC`;
    db.query(sql, [cus_id], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found comment",
          err: error.message,
        });
      return res.status(200).json({ comment: result });
    });
  } catch (error) {
    return res.json({
      err: error.message,
    });
  }
};
//get count Nofitication on customer
const getCommentCount_Item = (req, res) => {
  try {
    const cus_id = req.params.id;
    const sql =
      "SELECT COUNT(id) as item FROM tb_comment WHERE cus_id=? AND status='1'";
    db.query(sql, [cus_id], (error, result) => {
      if (error) {
        return res.status(404).json({
          message: "Not found comment1",
          err: error.message,
        });
      }
      return res.status(200).json(result);
    });
  } catch (err) {
    return res.status(400).send({
      message: "Bad Request",
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
    var date = new Date().toJSON().slice(0, 10).replace(/-/g, "");
    var time = new Date()
      .toTimeString()
      .replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1", "")
      .replace(":", "")
      .replace(":", "");
    var status = 0;
    const values = [
      req.body.order_id,
      req.body.admin_id,
      req.body.cus_id,
      req.body.cus_content,
      req.body.receive_content,
      date,
      time,
      status,
    ];
    const sql =
      "insert into tb_comment(order_id,admin_id,cus_id,cus_content,recieve,date,time,status) values(?)";
    db.query(sql, [values], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found type",
          err: error.message,
        });
      return res.status(200).json({ message: "Insert type Successfully" });
    });
  } catch (error) {
    console.log(error);
    return res.json({
      err: error.message,
    });
  }
};
//update
const update = (req, res) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ err: err.array()[0] });
    }
    const { admin_id, receive_content, status } = req.body;

    const order_id = req.params.id;
    const sql = `update tb_comment set admin_id=?,recieve=?,status=? where order_id=?`;
    db.query(
      sql,
      [admin_id, receive_content, status, order_id],
      (error, result) => {
        if (error)
          return res.status(404).json({
            message: "Not found comment",
            err:err.message
          });
        return res.status(200).json({ message: "Update comment Successfully" });
      }
    );
  } catch (error) {
    console.log(error);
    return res.json({
      err: error.message,
    });
  }
};
// update status after customer confirm
const Edit_Receive_Status = (req, res) => {
  try {
    const { status } = req.body;
    const cus_id = req.params.id;
    //  console.log(status);
    const sql =
      "Update tb_comment set status='" +
      status +
      "' Where cus_id='" +
      cus_id +
      "' and status=1";
    db.query(sql, function (err, result) {
      if (err) {
        return res.status(404).json({
          message: "Not found comment22",
          err: err.message,
        });
      }
      return res.status(200).json({ message: "success" });
    });
  } catch (error) {
    console.log(error);
    return;
  }
};
//delete
const deleteType = (req, res) => {
  try {
    const type_id = req.params.id;
    const sql = `delete from tb_type where type_id=?`;
    db.query(sql, [type_id], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found type",
        });
      return res.status(200).json({ message: "delete type Successfully" });
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
  create,
  update,
  deleteType,
  getByIdCus_id,
  getCommentCount_Item,
  Edit_Receive_Status,
  getByIds
};
