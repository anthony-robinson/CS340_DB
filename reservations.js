
module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getReservations(res, mysql, context, complete){
        mysql.pool.query("SELECT reservationID AS ID, customers.customerID AS customer, beds.bedID AS bed, resDate AS reservation_date, checkInDate AS check_in, checkOutDate AS check_out, nights FROM Reservations INNER JOIN reservations ON customer = customers.customerID ON bed = beds.bedID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.rooms  = results;
            complete();
        });
    }


    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getReservations(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('reservations', context);
            }

        }
    });