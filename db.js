const mysql = require("mysql");

const db = mysql.createConnection({
  user: "sqlserver",
  host: "localhost",
  password: "password",
  port: "3306",
  database: "dfinancely",
  timezone: "utc",
});

db.connect((err) => {
  if (err) throw err;
});

module.exports = db;
