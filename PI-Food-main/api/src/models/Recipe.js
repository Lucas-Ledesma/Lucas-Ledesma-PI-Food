const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Recipe = sequelize.define(
    'recipe',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        pricePerServing: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        readyInMinutes: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        healthScore: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        summary: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        analyzedInstructions: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        diet: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
          },
    },
    {
        timestamps: false,
    }
);

  return Recipe;

};
