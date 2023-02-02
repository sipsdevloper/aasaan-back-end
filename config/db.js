const sql = require("mssql");

 // config for your database
    const config = {
        user: 'sipsapp',
        password: 's|psApp',
        server: '192.168.1.158', 
        database: 'VTS',
        options: { encrypt: false }
    };
    // connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);
    })
     // create Request object
    const con = new sql.Request();



module.exports = con;