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
      // 외래키를 like(source) 모델이 가지고 있다. 그래서 belongsTo
      models.expert.belongsTo(models.movie)
    }
  };
  expert.init({
    estimate: DataTypes.STRING,
    movieId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'expert',
  });
  return expert;
};