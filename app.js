const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});


const mysql = require('mysql');
const env = require("./env");

const pug = require('pug');

 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
 
// connection configurations
const client = mysql.createConnection({
    host: `${env.data.HOST}`,
    user: `${env.data.USER}`,
    password: `${env.data.PASSWORD}`,
    database: `${env.data.DB}`
});
 
// connect to database
// client.connect();
 
// default route
app.get('/', function (req, res) {
    return res.send({ 
        error: true, 
        message: 'hello world' 
    })
});

app.get('/pug', function (req, res) {
    const index = './views/index.pug'
    const compiledFunction = pug.compileFile(index);
    return res.write(compiledFunction());
});

app.post("/add", urlencodedParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    // console.log(req.body.msg);
    let msg = req.body.msg;

    client.query("INSERT INTO tasks SET ? ", { name: msg }, function (error, results, fields) {
        if (error) throw error;
        return res.send(`${req.body.msg}`);
    });




    // res.send(`${req.body.msg}`);
});

app.get('/data', function (req, res) {
    client.query('SELECT * FROM tasks', function (error, results, fields) {
        if (error) throw error;

        // Выводит в консоли
        // console.log(results); 
        
        return res.send({ 
            // error: false, 
            data: results, 
            // message: 'Todos list.' 
        });
    });
});





// Retrieve all todos 
// app.get('/todos', function (req, res) {
//     client.query('SELECT * FROM tasks', function (error, results, fields) {
//         if (error) throw error;
//         console.log(results); // Выводит в консоли
//         return res.send({ error: false, data: results, message: 'Todos list.' });
//     });
// });
 
// Search for todos with ‘bug’ in their name
// app.get('/todos/search/:keyword', function (req, res) {
//     let keyword = req.params.keyword;
//     client.query("SELECT * FROM tasks WHERE task LIKE ? ", ['%' + keyword + '%'], function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'Todos search list.' });
//     });
// });
 
// Retrieve todo with id 
// app.get('/todo/:id', function (req, res) {
 
//     let task_id = req.params.id;
 
//     client.query('SELECT * FROM tasks where id=?', task_id, function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results[0], message: 'Todos list.' });
//     });
 
// });
 
// Add a new todo  
// app.post('/todo', function (req, res) {
 
//     let task = req.body.task;
 
//     if (!task) {
//         return res.status(400).send({ error:true, message: 'Please provide task' });
//     }
 
//     client.query("INSERT INTO tasks SET ? ", { task: task }, function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'New task has been created successfully.' });
//     });
// });
 
//  Update todo with id
// app.put('/todo', function (req, res) {
 
//     let task_id = req.body.task_id;
//     let task = req.body.task;
 
//     if (!task_id || !task) {
//         return res.status(400).send({ error: task, message: 'Please provide task and task_id' });
//     }
 
//     client.query("UPDATE tasks SET task = ? WHERE id = ?", [task, task_id], function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'Task has been updated successfully.' });
//     });
// });
 
//  Delete todo
// app.delete('/todo/:id', function (req, res) {
 
//     let task_id = req.params.id;
 
//     client.query('DELETE FROM tasks WHERE id = ?', [task_id], function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'Task has been updated successfully.' });
//     });
 
// });
 
// all other requests redirect to 404
app.all("*", function (req, res, next) {
    return res.send('page not found');
    next();
});
 
// port must be set to 3000 because incoming http requests are routed from port 80 to port 8080
app.listen(process.env.PORT || 3000, function () {
    console.log('Server start. http://localhost:3000');
});
 
// allows "grunt dev" to create a development server with livereload
module.exports = app;