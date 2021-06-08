const express = require('express');
const app = express();
const mysql = require('./dbcon.js');
const port = 52183;

app.use(express.static('public'));
app.use(express.json());

/**  QUERIES  **/

//Reservations
const selectReservations = `SELECT * FROM Reservations;`;
const insertReservations = `INSERT into Reservations (customerID, bedID, resDate, checkInDate, checkOutDate, nights) VALUES(?);`

//Customers
const selectCustomers =  `SELECT customerID, email, firstName, lastName, phone, student, genderRoom FROM Customers;`
const insertCustomers = `INSERT INTO Customers (email, firstName, lastName, phone, student, genderRoom) VALUES(?);`;
const deleteCustomers = `DELETE FROM Customers WHERE customerID = ? AND firstName = ? AND lastName = ?;`;


//Beds
const selectBeds =  `SELECT * FROM Beds;`;
const insertBeds = `INSERT INTO Beds(roomID, bedSize, bedPrice, bedDiscount) VALUES(?);`;


//Rooms
const selectRooms =  `SELECT * FROM Rooms;`;
const insertRooms = `INSERT INTO Rooms(roomName, roomPrice, roomDiscount, roomSize, roomGender) VALUES(?);`;

//MealsPurchased
const selectMealsPurchased =  `SELECT mealsPurchasedID, customerID, mealID FROM MealsPurchased;`;

//Meals 
const selectMeals = `SELECT mealID, meal, capacity FROM Meals;`;
const insertMeals = `INSERT INTO Meals(meal, capacity) VALUES(?);`;




/** API ROUTES*/

app.get('/', function(req,res){

    res.send('/index');
});


/**CUSTOMERS */
app.get("/customers", function(req, res, next) {
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


app.post("/customers", function(req, res, next) {
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

/**BEDS*/
app.get("/beds", function(req, res, next) {
    let context = {};
    mysql.pool.query(selectBeds, function(err, rows){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.type('json');
    res.send(context.results);
  });
});


app.post("/beds", function(req, res, next) {
    let body = req.body;
    let data = [[body.roomID, body.bedSize, body.bedPrice, body.bedDiscount]];
    mysql.pool.query(insertBeds, data, function(err,rows){
        if(err){
            next(err);
            return;
        }else{
            let entry = JSON.stringify(rows)
            res.send(entry)
        }
    })
  })

/**MEALS*/
app.get("/meals", function(req, res, next) {
    let context = {};
    mysql.pool.query(selectMeals, function(err, rows){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.type('json');
    res.send(context.results);
  });
});


app.post("/meals", function(req, res, next) {
    let body = req.body;
    let data = [[body.meal, body.capacity]];
    mysql.pool.query(insertMeals, data, function(err,rows){
        if(err){
            next(err);
            return;
        }else{
            let entry = JSON.stringify(rows)
            res.send(entry)
        }
    })
  })

/**Reservations*/
app.get("/reservations", function(req, res, next) {
    let context = {};
    mysql.pool.query(selectReservations, function(err, rows){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.type('json');
    res.send(context.results);
  });
});


app.post("/reservations", function(req, res, next) {
    let body = req.body;
    let data = [[body.customerID, body.bedID, body.resDate, body.checkInDate, body.checkOutDate, body.nights]];
    mysql.pool.query(insertReservations, data, function(err,rows){
        if(err){
            next(err);
            return;
        }else{
            let entry = JSON.stringify(rows)
            res.send(entry)
        }
    })
  })

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

/**ROOMS*/
app.get("/rooms", function(req, res, next) {
    let context = {};
    mysql.pool.query(selectRooms, function(err, rows){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.type('json');
    res.send(context.results);
  });
});


app.post("/rooms", function(req, res, next) {
    let body = req.body;
    let data = [[body.roomName, body.roomPrice, body.roomDiscount, body.roomSize, body.roomGender]];
    mysql.pool.query(insertRooms, data, function(err,rows){
        if(err){
            next(err);
            return;
        }else{
            let entry = JSON.stringify(rows)
            res.send(entry)
        }
    })
  })

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

