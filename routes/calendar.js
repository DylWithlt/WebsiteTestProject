const express = require('express');
const router = express.Router();
const mysql = require("mysql");

const con = mysql.createConnection({
    host: 'localhost',
    user : 'admin',
    password : 'Thequickbrownf0x',
    database : 'moise'
});

/* GET home page. */
router.get('/', function(req, res, next) {
    let d = new Date();
    let initD = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
    con.query("SELECT aDay, aTime FROM appointments WHERE aMonth="+d.getMonth()+" AND aYear ="+d.getFullYear()+";",
        function(err, result) {
        if (err) throw err;
        res.render('calendar', { title: 'Moise Calendar', user: req.session.user, date:d, initD: initD, appointments: result});
    });
});

router.post('/', function(req, res, next) {
    let d = new Date(req.body.date);
    let initD = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
    con.query("SELECT aDay, aTime FROM appointments WHERE aMonth="+d.getMonth()+" AND aYear ="+d.getFullYear()+";",
        function(err, result) {
        if (err) throw err;
        res.render('calendar', { title: 'Moise Calendar', user: req.session.user, date:d, initD: initD, appointments: result});
    });
});

module.exports = router;
