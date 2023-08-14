const db = require("../db/db");
const { validationResult } = require("express-validator");
// const bcrypt=require('bcrypt')

//getAll
const getAll = (req, res) => {
  try {
    const sql = "select * from tb_customer";
    db.query(sql, (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Not found customer",
        });
      return res.status(200).json({ customer: result });
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
    const cus_id = req.params.id;
    const sql = "select * from tb_customer where cus_id=?";
    db.query(sql, [cus_id], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Not found customer",
        });
      return res.status(200).json({ customer: result[0] });
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
    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //   return res.status(400).send({
    //     err: error.array(),
    //   });
    // }
 
    //var cus_id = "cus" + date.slice(2, date.length) + time;
    // let file = req.file.path;
    // let hashPss = bcrypt.hashSync(req.body.password, 10);
    //console.log(file);
    let status='customer'
    const values = [
      req.body.cus_id,
      req.body.fullName,
      req.body.tel,
      req.body.email,
      req.body.village,
      req.body.district,
      req.body.province,
      req.body.profile,
      // hashPss,
      // status,
    ];
    const sql = `insert into tb_customer(cus_id,fullName,tel,email,
       village,district,province,profile) values(?)`;
    db.query(sql, [values], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Bad request",
          err:err.message
        });
      return res.status(200).json({
        message: "Insert customer Successfully",
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
  
    const {fullName,tel,email,village,district,province,profile} = req.body
    const cus_id = req.params.id;
    const sql = `update tb_customer set fullName=?,tel=?,email=?,village=?,district=?,province=?,profile=? where
          cus_id=?`;
    db.query(sql, [fullName,tel,email,village,district,province,profile, cus_id], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Bad Request",
        });
      return res.status(200).json({ message: "Update customer Successfully" });
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
    const cus_id = req.params.id;
    const sql = `delete from tb_customer where cus_id=?`;
    db.query(sql, [cus_id], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found customer",
        });
      return res.status(200).json({ message: "delete customer Successfully" });
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
};
