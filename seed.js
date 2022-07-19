const stream = require('fs').createReadStream('airtable_wallets.csv');
const reader = require('readline').createInterface({ input: stream });
// const arr = [];
reader.on('line', (row) => {
  require('fs').appendFile('wallets.txt', row, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('success');
    }
  });
});
