const db = require("../db/db");
const { validationResult } = require("express-validator");

const getAll = (req, res) => {
  try {
    db.query("select * from tb_unit", (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found unit",
        });
      return res.status(200).json({ unit: result });
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
    const unit_id = req.params.id;
    const sql = "select * from tb_unit where unit_id=?";
    db.query(sql, [unit_id], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found unit",
        });
      return res.status(200).json({ unit: result[0] });
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
    const unitName = [req.body.unitName];
    const sql = "insert into tb_unit(unitName) values(?)";
    db.query(sql, [unitName], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found unit",
        });
      return res.status(200).json({ message: "Insert unit Successfully" });
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
    const unitName = [req.body.unitName];
    const unit_id=req.params.id;
    const sql = `update tb_unit set unitName='${unitName}' where unit_id='${unit_id}'`;
    db.query(sql, [unitName], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found unit",
        });
      return res.status(200).json({ message: "Update unit Successfully" });
    });
  } catch (error) {
    console.log(error);
    return res.json({
      err: error.message,
    });
  }
}
//delete
const deleteUnit=(req,res)=>{
try {
    const unit_id=req.params.id;
    const sql=`delete from tb_unit where unit_id=?`
    db.query(sql,[unit_id],(error,result)=>{
        if (error)
        return res.status(404).json({
          message: "Not found unit",
        });
      return res.status(200).json({ message: "delete unit Successfully" });
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
    deleteUnit
}
