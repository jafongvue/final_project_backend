const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
      cb(null, "uploads");
      console.log(file.originalname);

    }
    else if (file.mimetype === 'application/pdf'){
      cb(null, 'files')
      console.log(file.originalname);
    }
    else {
      console.log(file.mimetype)
      cb({error: 'Mime type not supported'})
    } 
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const type = (req, file, callback) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: type });

module.exports = upload;