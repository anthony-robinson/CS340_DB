const express = require('express');
const app = express();
const port = 52183;

app.use(express.static('./index.html'));

app.get('/', (req,res)=>{
    res.sendFile('./index.html', {root: __dirname})
});

app.get('/index.html', (req, res) =>{
    res.sendFile('./index.html', {root: __dirname})
})

app.get('/beds.html', (req,res)=>{
    res.sendFile('./beds.html', {root: __dirname})
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
