const db = require("../db/db");
const { validationResult } = require("express-validator");

const getAll = (req, res) => {
  try {
    db.query("select * from tb_image", (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found image",
        });
      return res.status(200).json({ image: result });
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
    const sql = "select * from tb_image where pro_id=?";
    db.query(sql, [unit_id], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found image",
        });
      return res.status(200).json({ image: result });
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
    const values = [
        req.body.url,
        req.body.pro_id,
    ];
    const sql = "insert into tb_image(url,pro_id) values(?)";
    db.query(sql, [values], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Fails to insert image",
        });
      return res.status(200).json({ message: "Insert image Successfully" });
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
    const url=req.body
    const pro_id=req.params.id;
    const sql = `update tb_image set url='${url}' where pro_id='${pro_id}'`;
    db.query(sql, (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found image",
        });
      return res.status(200).json({ message: "Update image Successfully" });
    });
  } catch (error) {
    console.log(error);
    return res.json({
      err: error.message,
    });
  }
}
//delete
const deleteImage=(req,res)=>{
try {
    const image_id=req.params.id;
    const sql=`delete from tb_image where image_id=?`
    db.query(sql,[image_id],(error,result)=>{
        if (error)
        return res.status(404).json({
          message: "Not found unit",
        });
      return res.status(200).json({ message: "delete image Successfully" });
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
    deleteImage
}
