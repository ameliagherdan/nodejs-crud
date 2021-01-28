const mysql = require('mysql');
const express = require('express');

const app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'employeedb'
});
mysqlConnection.connect((err)=>{
    if(!err)
    console.log('Database connection succeded.');
    else console.log('Database connection failed. \n Error: '+JSON.stringify(err, undefined,2));
});

app.listen(8000,()=>console.log('Express server is running with port 8000'));

//Get all employees
app.get('/employees', (req,res)=>{
    mysqlConnection.query('SELECT * FROM Employee', (err, rows, fields)=> {
        if(!err)
        res.send(rows);
        else console.log(err);
    })
});
    //Get all employees
    app.get('/employees:id', (req,res)=>{
    mysqlConnection.query('SELECT * FROM Employee WHERE EmpID= ?',(req.params.id), (err, rows, fields)=> {
        if(!err)
        res.send(rows);
        else console.log(err);
    })
});