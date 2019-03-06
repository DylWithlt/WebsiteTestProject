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
    res.render('login', { title: 'Login', user: req.session.user });
});

router.post('/', function(req, res, next) {
    let user = req.body.username;
    let pass = req.body.password;
    //con.connect(function(err){});
    con.query('SELECT * FROM users WHERE username="' + user +'";', function(err, result) {
        if (err) throw err;
        if (result.length > 0) {
            console.log(result[0].pass);
            if (result[0].pass === pass) {
                req.session.user = user;
                res.redirect('/');

            } else {
                res.render('login', {error: 'Invalid email or password'});

            }
        } else {
            res.render('login', {error: 'Invalid email or password'});
        }
        con.end();
        console.log(result);
        //con.end()
    });
});

module.exports = router;