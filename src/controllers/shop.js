const db = require("../db/db");
const { validationResult } = require("express-validator");

//getAll
const getAll = (req, res) => {
  try {
    const sql = "select * from tb_shop";
    db.query(sql, (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Not found User",
        });
      return res.status(200).json({ user: result });
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
    const user_id = req.params.id;
    const sql = "select * from tb_shop where shop_id=?";
    db.query(sql, [user_id], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Not found User",
        });
      return res.status(200).json({ user: result[0] });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};
const getByIdUser = (req, res) => {
  try {
    const user_id = req.params.id;
    const sql = "select * from tb_shop where user_id=?";
    db.query(sql, [user_id], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Not found User",
        });
      return res.status(200).json({ shop: result[0] });
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
    const {
      shop_id,
      shop_name,
      tel,
      village,
      district,
      province,
      profile,
      user_id,
      note,
    } = req.body;
    const values = [
      req.body.shop_id,
      req.body.shop_name,
      req.body.tel,
      req.body.village,
      req.body.district,
      req.body.province,
      req.body.profile,
      req.body.user_id,
      req.body.note,
    ];
    const sql = `insert into tb_shop(shop_id,shop_name,tel,village,district,province,profile,user_id,note) values(?)`;
    db.query(sql, [values], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Bad request",
          err: err.message,
        });
      return res.status(200).json({
        message: "Insert Shop Successfully",
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
    const {
      shop_name,
      tel,
      village,
      district,
      province,
      profile,
      user_id,
      note,
    } = req.body;

    const shop_id = req.params.id;
    const sql = `update tb_shop set shop_name=?,tel=?,village=?,district=?,province=?,profile=?,user_id=?,note=? where shop_id=?`;
    db.query(
      sql,
      [
        shop_name,
        tel,
        village,
        district,
        province,
        profile,
        user_id,
        note,
        shop_id,
      ],
      (err, result) => {
        if (err)
          return res.status(404).json({
            message: "Bad Request",
            err:err.message
          });
        return res.status(200).json({ message: "Update Shop Successfully" });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};
const deletes = (req, res) => {
  try {
    const shop_id = req.params.id;
    const sql = `delete from tb_shop where shop_id=?`;
    db.query(sql, [shop_id], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found unit",
        });
      return res.status(200).json({ message: "delete shop Successfully" });
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
  deletes,
  getByIdUser,
};
