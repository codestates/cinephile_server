'use strict';

const crypto = require('crypto');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 외래키를 comment(target) 모델이 가지고 있다. 그래서 hasOne
      models.user.hasOne(models.comment)
    }
  };
  user.init({
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    sex: DataTypes.STRING,
  }, {
    hooks: {
      // 가입할 때
      beforeCreate: (data, options) => {
        var shasum = crypto.createHmac('sha1', 'secret');
        shasum.update(data.password);
        data.password = shasum.digest('hex');
      },
      // 로그인할 때
      beforeFind: (data, options) => {
        if (data.where.password) {
          var shasum = crypto.createHmac('sha1', 'secret');
          shasum.update(data.where.password);
          data.where.password = shasum.digest('hex')
        }
      }
    },
    sequelize,
    modelName: 'user',
  });
  return user;
};