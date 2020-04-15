'use strict';
module.exports = (sequelize, DataTypes) => {
  const Foto = sequelize.define('Foto', {
    nama_foto: DataTypes.STRING,
    path_foto: {
      type: DataTypes.STRING,

      },
    perumahanId: DataTypes.INTEGER,
    pertamananId: DataTypes.INTEGER,
    permukimanId: DataTypes.INTEGER
  }, {});
  Foto.associate = function(models) {
    // associations can be defined here
    Foto.Perumahan = Foto.belongsTo(models.Perumahan, {foreignKey: 'perumahanId', as: 'perumahan',onDelete: 'CASCADE', onUpdate:'CASCADE'});
    Foto.Pertamanan = Foto.belongsTo(models.Pertamanan, {foreignKey: 'pertamananId', as: 'pertamanan',onDelete: 'CASCADE', onUpdate:'CASCADE', hooks: true });
    Foto.Permukiman = Foto.belongsTo(models.Permukiman, {foreignKey: 'permukimanId', as: 'permukiman',onDelete: 'CASCADE', onUpdate:'CASCADE'});
  };
  return Foto;
};
