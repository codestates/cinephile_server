'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 외래키를 like(source) 모델이 가지고 있다. 그래서 belongsTo
      models.comment.belongsTo(models.movie)

    }
  };
  comment.init({
    usercomment: DataTypes.STRING,
    star: DataTypes.INTEGER,
    like: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};