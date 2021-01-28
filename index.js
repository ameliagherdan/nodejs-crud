const mysql = require('mysql');
const express = require('express');

const app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'employeedb',
    multipleStatements: true
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
    //Get an employee by id
    app.get('/employees/:id', (req,res)=>{
    mysqlConnection.query('SELECT * FROM Employee WHERE EmpID= ?',(req.params.id), (err, rows, fields)=> {
        if(!err)
        res.send(rows);
        else console.log(err);
    })
});

 //Delete an employee
 app.delete('/employees/:id', (req,res)=>{
    mysqlConnection.query('DELETE FROM Employee WHERE EmpID= ?',(req.params.id), (err, rows, fields)=> {
        if(!err)
        res.send('Deleted Successfully.');
        else console.log(err);
    })
});

//Insert an employee 
app.post('/employees', (req,res)=>{
    let emp= req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode =?; SET @Salary =?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
        mysqlConnection.query(sql,[emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields)=> {
        if(!err)
        rows.forEach(element =>{
            if(element.constructor ==Array)
            res.send('Inserted Employee id :'+ element[0].EmpID);
     })
        else console.log(err);
    })
});

//Update an employee 
app.put('/employees', (req,res)=>{
    let emp= req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode =?; SET @Salary =?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
        mysqlConnection.query(sql,[emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields)=> {
        if(!err)
        res.send('Update Successfully');
        else console.log(err);
    })
});