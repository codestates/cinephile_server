'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  movie.init({
    title: DataTypes.STRING,
    sub_title: DataTypes.STRING,
    genre: DataTypes.STRING,
    nation: DataTypes.STRING,
    runtime: DataTypes.STRING,
    pubdate: DataTypes.STRING,
    director: DataTypes.STRING,
    actor: DataTypes.STRING,
    rating: DataTypes.STRING,
    poster: DataTypes.STRING,
    story1: DataTypes.STRING,
    story2: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'movie',
  });
  return movie;
};