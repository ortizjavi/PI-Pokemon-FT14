const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

//, 'height', 'weight',


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('type', {
   name: {
     type: DataTypes.STRING,
     allowNull: false,
     unique: true
   },
  }, { timestamps: false });
};
