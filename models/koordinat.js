'use strict';
module.exports = (sequelize, DataTypes) => {
  const Koordinat = sequelize.define('Koordinat', {
    longitude: DataTypes.STRING,
    latitude: DataTypes.STRING,
    saranaId: DataTypes.INTEGER,
    jalanSaluranId: DataTypes.INTEGER,
    perumahanId: DataTypes.INTEGER,
    tamanId : DataTypes.INTEGER
  }, {});
  Koordinat.associate = function(models) {
    // associations can be defined here
    Koordinat.belongsTo(models.Sarana, {foreignKey: 'saranaId', as: 'sarana'})
    Koordinat.belongsTo(models.JalanSaluran, {foreignKey: 'jalanSaluranId', as: 'jalansaluran'})
    Koordinat.belongsTo(models.Perumahan,{foreignKey:'perumahanId', as:'perumahan'})
    Koordinat.belongsTo(models.Taman,{foreignKey:'tamanId', as:'taman'})
  };
  return Koordinat;
};
