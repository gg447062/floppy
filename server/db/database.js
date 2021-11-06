const chalk = require('chalk');
const Sequelize = require('sequelize');
const pkg = require('../../package.json');

const dbName = pkg.name;
console.log(chalk.blueBright(`opening connection to ${dbName}`));

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
  {
    logging: false,
    sequelizeConfig: {
      dialect: 'postgres',
      ssl: true,
      dialectOptions: { ssl: { require: true } },
    },
  }
);

module.exports = db;
