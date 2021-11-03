/* eslint-disable no-console */

const chalk = require('chalk');
const { db } = require('./server/db');
const app = require('./server');
const PORT = process.env.PORT || 3000;

db.sync().then(() => {
  app.listen(PORT, () => {
    console.log(chalk.yellow(`listening on port ${PORT}`));
  });
});
