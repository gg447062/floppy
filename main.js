/* eslint-disable no-console */

const chalk = require('chalk');
const app = require('./server');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(chalk.yellow(`listening on port ${PORT}`));
});
