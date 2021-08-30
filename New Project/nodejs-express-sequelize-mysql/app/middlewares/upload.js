const multer = require("multer");

const excelFilter = (req, file, cb) => {
    console.log(file);
  if (file.mimetype.includes("excel") || file.mimetype.includes("spreadsheetml")) {
      console.log(file)
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-RM-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: excelFilter });
module.exports = uploadFile;