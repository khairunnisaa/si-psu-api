const express = require('express');
const router = express.Router();
const model = require('../models/index');
const multer = require('multer');
var path = require('path');
const multerStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, path.join(__dirname + './../public/images/'));
  },
  filename: (req,file, callBack) =>{
    callBack(null, `FormDataPerumahan_`+ Date.now()+`_ ${file.originalname}`);
  }

});

var upload = multer({storage: multerStorage});
// POST foto
router.post('/mutipleFiles', upload.array('files'), async function(req, res, next) {
  try {
    console.log("upload", upload);
    const files = req.files;
    console.log("filename:", files);
    if (!files) {
      const error = new Error('no file');
      error.httpStatusCode = 400;
      return next(error)
    }
    if (upload) {
      res.status(201).json({
        'status': 'OK',
        'messages': 'Foto Perumahan berhasil ditambahkan',
        'data': files,
      })
    }
  } catch (err) {
    res.status(400).json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {},
    })
  }
});
// UPDATE perumahan
router.patch('/:id', function(req, res, next) {
});
// DELETE perumahan
router.delete('/:id', function(req, res, next) {
});
module.exports = router;
