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

// GET perumahan listing.
router.get('/', async function (req, res, next) {
  try {
    const perumahan = await model.Perumahan.findAll({
      include: [
        {
          model: model.Foto,
          as: 'fotos'
        },
        {
          model: model.Sarana,
          as: 'saranas',
          include: [{
            model: model.Koordinat,
            as: 'koordinatsaranas'
          }]
        },
        {
          model: model.JalanSaluran,
          as: 'jalansalurans',
          include: [{
            model: model.Koordinat,
            as: 'koordinatjalansalurans'
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
            as: 'koordinattamans'
          }]
        },
        {
          model: model.Cctv,
          as: 'cctvs'
        },
      ]
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
router.post('/', async function (req, res) {
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
      // fotos,
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
      // fotos,
      saranas,
      jalansalurans,
      koordinats,
      tamans,
      cctvs
    }, {
      include: [
        {
          model: model.Foto,
          as: 'fotos'
        },
        {
          model: model.Sarana,
          as: 'saranas',
          include: [{
            model: model.Koordinat,
            as: 'koordinatsaranas'
          }]
        },
        {
          model: model.JalanSaluran,
          as: 'jalansalurans',
          include: [{
            model: model.Koordinat,
            as: 'koordinatjalansalurans'
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
            as: 'koordinattamans'
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

//FINDONE perumahan
router.get('/:perumahanId', async (req, res) => {
  try {
    const {perumahanId} = req.params;
    const perumahan = await model.Perumahan.findOne({
      where: {id: perumahanId},
      include: [
        {
          model: model.Foto,
          as: 'fotos'
        },
        {
          model: model.Sarana,
          as: 'saranas',
          include: [{
            model: model.Koordinat,
            as: 'koordinatsaranas'
          }]
        },
        {
          model: model.JalanSaluran,
          as: 'jalansalurans',
          include: [{
            model: model.Koordinat,
            as: 'koordinatjalansalurans'
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
            as: 'koordinattamans'
          }]
        },
        {
          model: model.Cctv,
          as: 'cctvs'
        },
      ]
    });
    if (perumahan) {
      return res.status(200).json({perumahan});
    }
    return res.status(404).send('Perumahan with the specified ID does not'
        + ' exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// UPDATE perumahan
router.post('/:perumahanId', async function (req, res) {
  try {
    const {perumahanId} = req.params;
    const updatePerumahan = model.Perumahan.build({
      id: perumahanId,
      nama_perumahan: req.body.nama_perumahan,
      nama_pengembang: req.body.nama_pengembang,
      luas_perumahan: req.body.luas_perumahan,
      jumlah_rumah: req.body.jumlah_rumah,
      kecamatan: req.body.kecamatan,
      kelurahan: req.body.kelurahan,
      RT: req.body.RT,
      RW: req.body.RW,
      status: req.body.status,
      no_bast: req.body.no_bast,
      sph: req.body.sph,
      jumlah_psu: req.body.jumlah_psu,
      keterangan: req.body.keterangan,
      fotos: req.body.fotos,
      saranas: req.body.saranas,
      jalansalurans: req.body.jalansalurans,
      koordinats: req.body.koordinats,
      tamans: req.body.tamans,
      cctvs: req.body.cctvs,
    },
    {
      include: [
        {
          model: model.Foto,
          as: 'fotos'
        },
        {
          model: model.Sarana,
          as: 'saranas',
          include: [{
            model: model.Koordinat,
            as: 'koordinatsaranas'
          }]
        },
        {
          model: model.JalanSaluran,
          as: 'jalansalurans',
          include: [{
            model: model.Koordinat,
            as: 'koordinatjalansalurans'
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
            as: 'koordinattamans'
          }]
        },
        {
          model: model.Cctv,
          as: 'cctvs'
        },
      ]
    });
    const perumahanUpdated = await model.Perumahan.update(
        req.body,
        {
        where: {id: perumahanId}
        });
    if (perumahanUpdated) {
      await updatePerumahan.addSarana();
      // await updatePerumahan.setFotos(req.body.fotos);
      // await updatePerumahan.setJalansalurans(req.body.jalansalurans);
      return res.status(200).json({perumahanUpdate: updatePerumahan});
    }
  } catch (error) {
    res.status(500).json({
      'status': 'ERROR memperbarui data perumahan',
      'messages': error.message
    })
  }
});

// DELETE perumahan
router.delete('/:perumahanId', async (req, res) => {
      try {
        const {perumahanId} = req.params;
        const deletedPerumahan = await model.Perumahan.destroy({
          where: {id: perumahanId},
        });
        if (deletedPerumahan) {
          res.status(201).json({
            'status': 'OK',
            'messages': 'Perumahan berhasil dihapus',
            'data': {},
          })
        }
      } catch (error) {
        res.status(500).json({
          'status': 'ERROR menghapus perumahan',
          'messages': error.message
        })
      }
    }
);
module.exports = router;
