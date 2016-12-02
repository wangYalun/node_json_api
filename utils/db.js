var mysql = require('mysql');
var dbConfig = require('../config/database');

// module.exports={
//     connect:function(){
//         var connect=mysql.createConnection()
//     }
// }

function DB(config) {
    this.config = config;
}

DB.prototype.connect = function () {
    var connection = mysql.createConnection(this.config);
    connection.connect();
    return connection;
};

DB.prototype.query = function (sql) {
    var connection = this.connect();
    var promise = new Promise(function (resolve, reject) {
        connection.query(sql, function (err, rows, fields) {
            if (err) {
                reject(err);
            } else {
                //console.log();
                resolve(rows);
            }
        });
        connection.end();
    });
    return promise;
};

var db = {};
for (var index in dbConfig) {
    db[index] = new DB(dbConfig[index]);
}

module.exports = db;