const db = require('./database');
const Sample = require('./sample');
const Floppy = require('./floppy');

Sample.belongsTo(Floppy);
Floppy.hasMany(Sample);

module.exports = { db, Floppy, Sample };
