'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class expert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  expert.init({
    estimate: DataTypes.STRING,
    expert_name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'expert',
  });
  return expert;
};