'use strict';
module.exports = (sequelize, DataTypes) => {
  const Foto = sequelize.define('Foto', {
    nama_foto: DataTypes.STRING,
    path_foto: DataTypes.STRING,
    perumahanId: DataTypes.INTEGER,
    pertamananId: DataTypes.INTEGER
  }, {});
  Foto.associate = function(models) {
    // associations can be defined here
    Foto.Perumahan = Foto.belongsTo(models.Perumahan, {foreignKey: 'perumahanId', as: 'perumahan'});
    Foto.Pertamanan = Foto.belongsTo(models.Pertamanan, {foreignKey: 'pertamananId', as: 'pertamanan'})
  };
  return Foto;
};
