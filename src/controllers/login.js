const db = require("../db/db");
const { validationResult } = require("express-validator");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {json}=require('body-parser')

const getAll = (req, res) => {
  try {
    db.query(`select tb_login.id,tb_login.user_id,tb_login.cus_id,tb_login.tel,tb_login.status,tb_login.password,
    tb_customer.fullName as cus_name,tb_customer.profile as cus_profile, tb_user.fullName
    as user_name,tb_user.profile as user_profile,tb_login.active from tb_login left join tb_customer on
    tb_customer.cus_id=tb_login.cus_id left join tb_user on tb_user.user_id=tb_login.user_id order by tb_login.active desc`, (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found type",
        });
      return res.status(200).json({ userLogin: result });
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
    //let hashPss = bcrypt.hashSync(req.body.password, 10);
    let active="waiting"

    const typeName = [
        req.body.user_id,
        req.body.cus_id,
        req.body.tel,
        req.body.status,
        active,
        req.body.password,
    ];
    const sql = "insert into tb_login(user_id,cus_id,tel,status,active,password) values(?)";
    db.query(sql, [typeName], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found type",
        });
      return res.status(200).json({ message: "Insert login Successfully" });
    });
  } catch (error) {
    console.log(error);
    return res.json({
      err: error.message,
    });
  }
};
//update
const updateCustomer=(req,res)=>{
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ err: err.array()[0] });
    }
    // const typeName = [req.body.email,req.body.password];
    const {tel} = req.body
    const cus_id=req.params.id;
    const sql = `update tb_login set tel=? where cus_id=?`;
    db.query(sql, [tel,cus_id], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found login",
          err:error.message
        });
      return res.status(200).json({ message: "Update login Successfully" });
    });
  } catch (error) {
    console.log(error);
    return res.json({
      err: error.message,
    });
  }
}
const update=(req,res)=>{
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ err: err.array()[0] });
    }
    // const typeName = [req.body.email,req.body.password];
    const active="actived"
    const {password} = req.body
    const id=req.params.id;
    const sql = `update tb_login set active=?,password=? where id=?`;
    db.query(sql, [active,password,id], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found login",
          err:error.message
        });
      return res.status(200).json({ message: "Update login Successfully" });
    });
  } catch (error) {
    console.log(error);
    return res.json({
      err: error.message,
    });
  }
}
const updateUser=(req,res)=>{
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ err: err.array()[0] });
    }
    const {tel} = req.body
    const user_id=req.params.id;
    const sql = `update tb_login set tel=? where user_id=?`;
    db.query(sql, [tel,user_id], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found login",
          err:error.message
        });
      return res.status(200).json({ message: "Update login Successfully" });
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
    const id=req.params.id;
    const sql=`delete from tb_login where id=?`
    db.query(sql,[id],(error,result)=>{
        if (error)
        return res.status(404).json({
          message: "Not found userLogin",
        });
      return res.status(200).json({ message: "delete userLogin Successfully" });
    })
} catch (error) {
    console.log(error);
    return res.json({
      err: error.message,
    });
}
}
const deleteUser=(req,res)=>{
try {
    const id=req.params.id;
    const sql=`delete from tb_login where user_id=?`
    db.query(sql,[id],(error,result)=>{
        if (error)
        return res.status(404).json({
          message: "Not found userLogin",
        });
      return res.status(200).json({ message: "delete userLogin Successfully" });
    })
} catch (error) {
    console.log(error);
    return res.json({
      err: error.message,
    });
}
}
const SignIn=async (req,res)=>{
  try {
    const {tel,password}=req.body
  const sql=`select tb_login.user_id,tb_login.cus_id,tb_login.tel,tb_login.status,tb_login.password,
              tb_customer.fullName as cus_name,tb_customer.profile as cus_profile, tb_user.fullName
              as user_name,tb_user.profile as user_profile from tb_login left join tb_customer on
              tb_customer.cus_id=tb_login.cus_id left join tb_user on tb_user.user_id=tb_login.user_id
              where (tb_login.tel='${tel}' and tb_login.password='${password}') and tb_login.active='actived'`
        db.query(sql,(err,result)=>{
          if (err)
          return res.status(404).json({
            message: "Not found type",
            err:err.message
          });
          if(result.length<=0){
            return res.status(201).json({
              message:"No have data"
            })
          }
          const token = jwt.sign({ tel: tel, password: password,active:"actived" },'CLINIC',{expiresIn:"24h"});
          return res.status(200).json({
            user:result[0],
            message:"user is logined",
           token:token,
          })
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
    updateCustomer,
    updateUser,
    deleteType,
    SignIn,
    update,
    deleteUser
}
