const db = require("../db/db");
const { validationResult } = require("express-validator");

const getAll = (req, res) => {
  try {
    db.query("select * from tb_type", (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found type",
        });
      return res.status(200).json({ type: result });
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
    const type_id = req.params.id;
    const sql = "select * from tb_type where type_id=?";
    db.query(sql, [type_id], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found type",
        });
      return res.status(200).json({ type: result[0] });
    });
  } catch (error) {
    console.log(error);
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
    const typeName = [req.body.typeName];
    const sql = "insert into tb_type(typeName) values(?)";
    db.query(sql, [typeName], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found type",err: error.message,
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
const update=(req,res)=>{
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ err: err.array()[0] });
    }
    const typeName = [req.body.typeName];
    const type_id=req.params.id;
    const sql = `update tb_type set typeName=? where type_id=?`;
    db.query(sql, [typeName,type_id], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found type",
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
    const type_id=req.params.id;
    const sql=`delete from tb_type where type_id=?`
    db.query(sql,[type_id],(error,result)=>{
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
    deleteType
}
