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
      models.movie.hasMany(models.comment)
      models.movie.hasMany(models.expert)
    }
  };
  movie.init({
    title: DataTypes.STRING,
    actor: DataTypes.STRING,
    runtime: DataTypes.STRING,
    story: DataTypes.STRING,
    description: DataTypes.STRING,
    genre: DataTypes.STRING,
    release_date: DataTypes.STRING,
    rating: DataTypes.STRING,
    director: DataTypes.STRING,
    poster: DataTypes.STRING,
    thumnail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'movie',
  });
  return movie;
};