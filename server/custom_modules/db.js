const mysql = require('mysql');
const pwd = require('./security/pwd');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: pwd,
  database: 'libmanage',
  multipleStatements: true,
  dateStrings: true
});
db.connect();

module.exports = db;
