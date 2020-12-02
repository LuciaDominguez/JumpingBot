const express = require("express");
const path    = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

const PORT = 4000;

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database: 'jb_base'
});

connection.connect(error=>{
    if(error) throw error;
    console.log('Database server is running');
});


app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname,'public')));
app.get('/', function (req, res) {
    res.sendFile('./public/index.html')
  });



app.post('/add',(req,res)=>{
    const sql = 'INSERT INTO jugador set ?';

    const playerObj={
        apodo: req.body.apodo,
        puntuacion: req.body.puntuacion
    }

    connection.query(sql,playerObj, error=>{
        if(error) throw error;
        res.redirect('/');
    });
    
});


app.listen(PORT, '0.0.0.0',()=>{
    console.log(`El servidor esta siendo escuchado en el puerto ${PORT}`);
} );

