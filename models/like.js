'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 외래키를 like(source) 모델이 가지고 있다. 그래서 belongsTo
      models.like.belongsTo(models.user)
    }
  };
  like.init({
    userId: DataTypes.INTEGER,
    idliked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'like',
  });
  return like;
};