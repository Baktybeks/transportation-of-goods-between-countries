const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' }
});

const Country = sequelize.define('Country', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  country: { type: DataTypes.STRING, allowNull: false },
});

const Application = sequelize.define('Application', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  processed: { type: DataTypes.BOOLEAN, defaultValue: false },
  fromCountryId: { type: DataTypes.INTEGER, allowNull: false },
  toCountryId: { type: DataTypes.INTEGER, allowNull: false }

});

Country.hasMany(Application, { as: 'fromCountry', foreignKey: 'fromCountryId' });
Country.hasMany(Application, { as: 'toCountry', foreignKey: 'toCountryId' });
Application.belongsTo(Country, { as: 'fromCountry', foreignKey: 'fromCountryId'});
Application.belongsTo(Country, { as: 'toCountry', foreignKey: 'toCountryId' });

module.exports = {
  User, Application, Country
};





