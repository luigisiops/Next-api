'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class calendarevents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.calendarevents.belongsTo(models.calendar)
      models.calendarevents.belongsTo(models.event)
    }
  };
  calendarevents.init({
    eventId: DataTypes.INTEGER,
    calendarId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'calendarevents',
  });
  return calendarevents;
};