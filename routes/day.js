const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user : 'admin',
    password : 'Thequickbrownf0x',
    database : 'moise'
});

/* GET home page. */
router.get('/', function(req, res, next) {
    let d = new Date(req.query.date || '');
    let day = req.query.day || 1;
    con.query('SELECT * FROM appointments WHERE aDay='+req.query.day+'; ', function(err, result) {
        if (err) throw err;
        console.log("Day check 2" + result);
        res.render('day', {title: 'Appointments', user: req.session.user , date:d, appointments: result, day: req.query.day});
    });
});

module.exports = router;
