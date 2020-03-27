'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cctv = sequelize.define('Cctv', {
    nama_cctv: DataTypes.STRING,
    ip_cctv: DataTypes.STRING,
    video: DataTypes.STRING,
    perumahanId: DataTypes.INTEGER,
    pertamananId: DataTypes.INTEGER
  }, {});
  Cctv.associate = function(models) {
    // associations can be defined here
    Cctv.belongsTo(models.Perumahan, {foreignKey: 'perumahanId', as: 'perumahan'});
    Cctv.belongsTo(models.Pertamanan, {foreignKey: 'pertamananId', as: 'pertamanan'});
  };
  return Cctv;
};
