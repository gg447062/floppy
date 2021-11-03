const Sequelize = require('sequelize');
const db = require('./database');

const Sample = db.define('sample', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false,
    },
  },
  bpm: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: false,
    },
  },
  playType: {
    type: Sequelize.ENUM('loop', 'one-shot'),
    allowNull: false,
    validate: {
      notEmpty: false,
    },
  },
  url: {
    type: Sequelize.TEXT,
  },
  unlocked: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Sample;
