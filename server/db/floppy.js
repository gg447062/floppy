const Sequelize = require('sequelize');
const db = require('./database');

const Floppy = db.define('floppy', {
  color: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false,
    },
  },
});

module.exports = Floppy;
