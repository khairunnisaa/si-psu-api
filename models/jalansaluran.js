'use strict';
module.exports = (sequelize, DataTypes) => {
  const JalanSaluran = sequelize.define('JalanSaluran', {
    nama_jalan_saluran: DataTypes.STRING,
    luas_jalan_saluran: DataTypes.STRING,
    foto_jalan_saluran: DataTypes.STRING,
    kondisi: DataTypes.STRING,
  }, {});
  JalanSaluran.associate = function(models) {
    // associations can be defined here
    JalanSaluran.belongsTo(models.Perumahan, {foreignKey: 'perumahanId', as: 'perumahan'});
    JalanSaluran.hasMany(models.Koordinat, {foreignKey: 'jalanSaluranId',as: 'koordinatjalansalurans'});
  };
  return JalanSaluran;
};
