const express = require('express');
const router = express.Router();
const model = require('../models/index');

// GET perumahan listing.
router.get('/',async function(req, res, next) {
  try {
    const perumahan = await model.Perumahan.findAll({
      include: [
      {
        model: model.Foto, as: 'fotos'
      },
      {
        model: model.Sarana, as: 'saranas'
      },]
    });
    if (perumahan.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': perumahan
      })
    } else {
      res.json({
        'status': 'ERROR',
        'messages': 'EMPTY',
        'data': {}
      })
    }
  } catch (err) {
    res.json({
      'status': 'ERROR',
      'messages': err.messages,
      'data': {}
    })
  }
});
// POST perumahan
router.post('/', async function(req, res, next) {
  try {
    const {
      nama_perumahan,
      nama_pengembang,
      luas_perumahan,
      jumlah_rumah,
      kecamatan,
      kelurahan,
      RT,
      RW,
      status,
      no_bast,
      sph,
      jumlah_psu,
      keterangan,
      fotos,
      saranas,
      jalansalurans,
      koordinats,
      tamans,
      cctvs,
    } = req.body;
    const perumahan = await model.Perumahan.create({
      nama_perumahan,
      nama_pengembang,
      luas_perumahan,
      jumlah_rumah,
      kecamatan,
      kelurahan,
      RT,
      RW,
      status,
      no_bast,
      sph,
      jumlah_psu,
      keterangan,
      fotos,
      saranas,
      jalansalurans,
      koordinats,
      tamans,
      cctvs
    },{
      include: [{
        model: model.Foto,
        as: 'fotos'
      },
      {
        model: model.Sarana,
        as: 'saranas',
        include: [{
          model: model.Koordinat,
          as : 'koordinatsaranas'
        }]
      },
      {
        model: model.JalanSaluran,
        as: 'jalansalurans',
        include: [{
          model: model.Koordinat,
          as : 'koordinatjalansalurans'
        }]
      },
      {
        model: model.Koordinat,
        as: 'koordinats'
      },
      {
        model: model.Taman,
        as: 'tamans',
        include: [{
          model: model.Koordinat,
          as : 'koordinattamans'
        }]
      },
      {
        model: model.Cctv,
        as: 'cctvs'
      },
      ]
    });
    if (perumahan) {
      res.status(201).json({
        'status': 'OK',
        'messages': 'Perumahan berhasil ditambahkan',
        'data': perumahan,
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
