const mysql = require('mysql');

module.exports = () => {
  return mysql.createConnection({
    host: 'us-cdbr-iron-east-03.cleardb.net',
    user: "b80c1cf6028c33",
    password: "bfcb00f3",
    database : 'heroku_11da21993396667'
  })
};
