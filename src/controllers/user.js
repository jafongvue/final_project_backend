const db = require("../db/db");
const { validationResult } = require("express-validator");


//getAll
const getAll = (req, res) => {
  try {
    const sql = "select * from tb_user inner join tb_login log on log.user_id=tb_user.user_id where log.status='user'";
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
    const sql = "select * from tb_user where user_id=?";
    db.query(sql, [user_id], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Not found User",
          err:err.message
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

//create
const create = (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({
        err: error.array(),
      });
    }
    //console.log(file);
    let status = "user";
    const values = [
      req.body.user_id,
      req.body.fullName,
      req.body.gender,
      req.body.dob,
      req.body.tel,
      req.body.email,
      req.body.village,
      req.body.district,
      req.body.province,
      req.body.profile,
      req.body.QRcode,
      req.body.personal_id,
      req.body.personal_image,
    ];
    const sql = `insert into tb_user(user_id,fullName,gender,dob,tel,
        email,village,district,province,profile,QRcode,personal_id,personal_image) values(?)`;
    db.query(sql, [values], (err, result) => {
      if (err)
        return res.status(404).json({
          message: "Bad request",
          err: err.message,
        });
      return res.status(200).json({
        message: "Insert User Successfully",
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
      fullName,
      gender,
      dob,
      tel,
      email,
      village,
      district,
      province,
      // password,
      // status,
      profile,
      QRcode,
    } = req.body;

    const user_id = req.params.id;
    const sql = `update tb_user set fullName=?,gender=?,dob=?,tel=?,email=?
          ,village=?,district=?,province=?,profile=?,QRcode=? where
           user_id=?`;
    db.query(
      sql,
      [
        fullName,
        gender,
        dob,
        tel,
        email,
        village,
        district,
        province,
        profile,
        QRcode,
        user_id,
      ],
      (err, result) => {
        if (err)
          return res.status(404).json({
            message: "Bad Request",
            err: err.message,
          });
        return res.status(200).json({ message: "Update User Successfully" });
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
    const user_id = req.params.id;
    const sql = `delete from tb_user where user_id=?`;
    db.query(sql, [user_id], (error, result) => {
      if (error)
        return res.status(404).json({
          message: "Not found unit",
        });
      return res.status(200).json({ message: "delete user Successfully" });
    });
  } catch (error) {
    console.log(error);
    return res.json({
      err: error.message,
    });
  }
};
const login = (req, res) => {
  try {
    const { email, password } = req.body;
    db.query(`SELECT * FROM tb_user  WHERE email=?`, [email], (err, users) => {
      if (err) {
        return json({
          message: "Internal Server",
          err,
        });
      } else {
        if (users.length > 0) {
          const valid = bcrypt.compareSync(password, users[0].password);
          if (!valid) {
            res.status(404).json({ message: "Invalid password" });
          } else {
            const token = jwt.sign(
              {
                user_id: users[0].user_id,
                email: users[0].email,
                status: users[0].status,
                fullName: users[0].fullName,
              },
              "secret",
              {
                expiresIn: "24h",
              }
            );
            res.json({
              status: "ok",
              message: "login successful",
              token,
              user: users[0],
            });
          }
        } else {
          return res
            .status(404)
            .json({ message: "Email or Password is wrong" });
        }
      }
    });
  } catch (err) {
    return res.status(400).send({
      message: "Bad request",
      error: err.message,
    });
  }
};
module.exports = {
  getAll,
  getById,
  create,
  update,
  deletes,
  login,
};
