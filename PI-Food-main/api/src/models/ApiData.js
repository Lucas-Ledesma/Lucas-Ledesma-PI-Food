const { DataTypes } = require('sequelize');
const { getApiData } = require('../helpers/getApiData');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const ApiData = sequelize.define(
    'apiData',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      data: {
        type: DataTypes.JSONB,
        allowNull: false,
        async get() {
          const apiResult = await getApiData();
          return apiResult;
        },
      },
    },
  );
  
  return ApiData;

};

