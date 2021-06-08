const express = require('express');
//const { nextTick } = require('node:process');
const app = express();
const mysql = require('./dbcon.js');
const port = 52183;

app.use(express.static('public'));
app.use(express.json());

/**  QUERIES  **/

//Reservations
const selectReservations = `SELECT reservationID, customerID, bedID, resDate, checkInDate, checkOutDate, nights FROM Reservations;`;
const insertReservations = `INSERT into Reservations (resDate, checkInDate, checkOutDate, nights) VALUES(?,?,?,?);`
const deleteReservations = `DELETE FROM Reservations WHERE reservationID = ? AND customerID = ? `;

//Customers
const selectCustomers =  `SELECT customerID, email, firstName, lastName, phone, student, genderRoom FROM Customers;`
const insertCustomers = `INSERT INTO Customers (email, firstName, lastName, phone, student, genderRoom) VALUES(?);`;
const deleteCustomers = `DELETE FROM Customers WHERE customerID = ? AND firstName = ? AND lastName = ?;`;


//Beds
const selectBeds =  `SELECT bedID, roomID, bedSize, bedPrice, bedDiscount FROM Beds;`;
const insertBeds = `INSERT INTO Beds(bedSize, bedPrice, bedDiscount) VALUES(?,?,?);`;
const deleteBeds = `DELETE FROM Beds WHERE bedID = ? AND roomID = ?;`;


//Rooms
const selectRooms =  `SELECT roomID, roomName, roomPrice, roomDiscount, roomSize, roomGender;`;
const insertRooms = `INSERT INTO Beds(bedSize, bedPrice, bedDiscount) VALUES(?, ?, ?);`;
const deleteRooms = `DELETE FROM Rooms WHERE roomID = ?;`;

//MealsPurchased
const selectMealsPurchased =  `SELECT mealsPurchasedID, customerID, mealID FROM MealsPurchased;`;

//Meals 
const selectMeals = `SELECT mealID, meal, capacity FROM Meals;`;
const insertMeals = `INSERT INTO Meals(meal, capacity) VALUES(?, ?);`;
const deleteMeals = `DELETE FROM Meals WHERE mealID = ?;`;



/** API ROUTES*/

app.get('/', function(req,res){

    res.send('/index');
});


/**CUSTOMERS */
app.get("/queryCustomers", function(req, res, next) {
    let context = {};
    mysql.pool.query(selectCustomers, function(err, rows){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.type('json');
    res.send(context.results);
  });
});


app.post("/insertCustomers", function(req, res, next) {
    let body = req.body;
    let data = [[body.email, body.firstName, body.lastName, body.phone, body.student, body.genderRoom]];
    mysql.pool.query(insertCustomers, data, function(err,rows){
        if(err){
            next(err);
            return;
        }else{
            let entry = JSON.stringify(rows)
            res.send(entry)
        }
    })
  })

/** BEDS **/
app.get('/beds', (req,res) =>{
    let context = {};
    mysql.pool.query(selectBeds, function(err, rows){
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

/** MEALS */
app.get('/meals', (req,res) =>{
    let context = {};
    mysql.pool.query(selectMeals, function(err, rows){
        if(err){
            console.log(err);
            next(err);
            return;
        }
        context.results = JSON.stringify(rows);
        res.type('json');
        res.send(context.results)
    })
    res.send('/meals');
});

/** RESERVATIONS **/
app.get('/reservations', (req,res) =>{
    let context = {};
    mysql.pool.query(selectMeals, function(err, rows){
        if(err){
            console.log(err);
            next(err);
            return;
        }
        context.results = JSON.stringify(rows);
        res.type('json');
        res.send(context.results)
    })
    res.send('/reservations');
});

/** MEALS PURCHASED**/
app.get('/meals_purchased', (req,res) =>{
    let context = {};
    mysql.pool.query(selectMeals, function(err, rows){
        if(err){
            console.log(err);
            next(err);
            return;
        }
        context.results = JSON.stringify(rows);
        res.type('json');
        res.send(context.results)
    })
    res.send('/meals_purchased');
});

/** ROOMS */
app.get('/rooms', (req,res) =>{
    let context = {};
    mysql.pool.query(selectMeals, function(err, rows){
        if(err){
            console.log(err);
            next(err);
            return;
        }
        context.results = JSON.stringify(rows);
        res.type('json');
        res.send(context.results)
    })
    res.send('/rooms');
});

app.use(function(req,res,err){
    res.status(404);
    res.json({ error: err });
  });
  
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.json({ error: err });
});

app.listen(port, () => console.log(`listening on port ${port}...`));

