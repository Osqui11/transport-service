const mysql = require('mysql');
const MySQLConnection = mysql.createConnection({
    // host:'',
    // user:'',
    // password:'',
    // database:''
})

MySQLConnection.connect(function (err){
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('SERVICIO transportUnity CONECTADO A LA BD');
    }
});

module.exports = MySQLConnection;