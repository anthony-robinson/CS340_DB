const express = require('express');
const { nextTick } = require('node:process');
const app = express();
const mysql = require('./dbcon.js');
const port = 52183;

const getBeds = `SELECT bed `;

app.use(express.static('./index.html'));

app.get('/', (req,res)=>{
    res.sendFile('./index.html', {root: __dirname})
});

app.get('/index.html', (req, res) =>{
    res.sendFile('./index.html', {root: __dirname})
})

app.get('/beds', (req,res) =>{
    let context = {};
    mysql.pool.query(getBeds, function(err, rows){
        if(err){
            console.log(err);
            next(err);
            return;
        }
        context.results = JSON.stringify(rows);
        res.type('json');
        res.send(context.results)
    })
    res.send('/beds');
});

app.get('/customers.html', (req,res)=>{
    res.sendFile('./customers.html', {root: __dirname})
});

app.get('/meals.html', (req,res)=>{
    res.sendFile('./meals.html', {root: __dirname})
});

app.get('/meals_purchased.html', (req,res)=>{
    res.sendFile('./meals_purchased.html', {root: __dirname})
});

app.get('/reservations.html', (req,res)=>{
    res.sendFile('./reservations.html', {root: __dirname})
});

app.get('/rooms.html', (req,res)=>{
    res.sendFile('./rooms.html', {root: __dirname})
});

app.listen(port, () => console.log(`listening on port ${port}...`));
