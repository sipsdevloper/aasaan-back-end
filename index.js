const express = require('express');
const app = express();

const con = require('./config/db')

app.use(express.json())

app.get('/', function (req, res) {
    // query to the database and get the records

    con.query(`select * from register_user order by user_id asc`, function (err, result) {

        if (err) console.log(err)
        // send records as a response
        res.send(result.recordsets[0]);

    });
});

app.post('/login', function (req, res) {
    let mobile = req.body.mobile;
    let imeino = req.body.imeino;
    con.query(`select * from register_user where contact_no=${mobile}`, function (err, result) {

        if (err) console.log(err)
        if (result.recordsets[0][0]) {
            let isImeino = result.recordsets[0][0].imeino;
            if (!isImeino) {
                let data = [imeino, mobile];

                con.query(`update register_user set imeino = '${imeino}' where contact_no = '${mobile}'`,(error, result2, field) => {
                    if(error){
                        res.status(404).send(error)
                    }else{
                        let data = {
                            'data': result.recordsets[0][0],
                            'msg': "Data found successfully"
                        }
                            res.status(200).send(data)
                    }
                })
            }else{
                if(isImeino==imeino){
                    let data = {
                        'data': result.recordsets[0][0],
                        'msg': "Data found successfully"
                    }
                        res.status(200).send(data)
                }else{
                    let data = {
                        'msg': "IMEI number did not match. please contact to admin."
                    }
                        res.status(404).send(data)
                }
            }
            
        } else {
            let data = {
                'msg': "This number is not found."
            }
            res.send(404, data);
        }


    });
});

app.post('/test', function (req, res) {

    const data = {
        user_id: 'E-2333',
        user_name: 'Shobhit',
        user_type: 'S',
        contact_no: '9898989898',
        imeino: 'lkjlk32jlkjlkj',
        active_status: '1',
        create_date: '2022-10-11 00:00:00.000'
    };

    con.query("INSERT INTO register_user (user_id,user_name,user_type,contact_no,active_status,create_date) VALUES ('E-2321','Rahul','S','8989898989',1,'2022-10-11 00:00:00.000')", (error, result, field) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    })

});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});