const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const mysql = require('mysql');
const env = require("./env");
const pug = require('pug');

app.set('views', './views');
app.set('view engine', 'pug');
app.engine('pug', pug.__express);

app.use('/src', express.static(__dirname + '/src'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
 
function reconnect_db(){
    db = mysql.createConnection({
        host: `${env.data.HOST}`,
        user: `${env.data.USER}`,
        password: `${env.data.PASSWORD}`,
        database: `${env.data.DB}`
    });
    db.on('error', function(err){
        console.log(err.code);
		if(err.code == 'PROTOCOL_CONNECTION_LOST') db = reconnect_db();
		else throw err;
	});
	return db;
}
var db = reconnect_db();

app.get('/', function (req, res) {
    return res.render('index');
});

app.post("/add", urlencodedParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    let msg = req.body.msg;

    db.query("INSERT INTO tasks SET ? ", { name: msg }, function (err, results, fields) {
        if (err) throw err;
        return res.redirect('/data');
    });
});

app.get('/delete/:id', function(req, res, next) {
    let id = req.params.id;

    db.query("DELETE FROM tasks WHERE ? ", { id: id }, function (err, results, fields) {
        if (err) throw err;
        return res.redirect('/data');
    });
});

app.get('/edit/:id', function(req, res, next) {
    let id = req.params.id;
    let msg = req.body.msg;

    db.query("UPDATE tasks SET name = ? WHERE id = ?", {id: id, name: msg}, function (error, results, fields) {
        if (err) throw err;
        return res.redirect('/data');
    });
});

app.get('/data', function (req, res) {
    db.query('SELECT * FROM tasks', function (err, results, fields) {
        if (err) throw err;
        return res.render('data', {results: results});
    });
});

// all other requests redirect to 404
app.all("*", function (req, res, next) {
    return res.send('page not found');
    next();
});
 
// port must be set to 3000 because incoming http requests are routed from port 80 to port 8080
app.listen(process.env.PORT || 3000, function () {
    console.log('Server start. http://localhost:3000');
});
