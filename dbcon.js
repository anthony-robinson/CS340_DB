var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_jonesl7',
  password        : '2361',
  database        : 'cs340_jonesl7'
});
module.exports.pool = pool;

