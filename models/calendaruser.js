'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class calendaruser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //models.calendaruser.belongsTo(models.user)
      //models.calendaruser.belongsTo(models.calendar)
    }
  };
  calendaruser.init({
    calendarId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'calendaruser',
  });
  return calendaruser;
};