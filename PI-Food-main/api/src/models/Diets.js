const { DataTypes } = require('sequelize');
const { getApiData } = require('../helpers/getApiData');

module.exports = (sequelize) => {
  const Diet = sequelize.define(
    'diet', 
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
     },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  

  return Diet;
};
