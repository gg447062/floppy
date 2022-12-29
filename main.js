const app = require('./server');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
