
module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getRooms(res, mysql, context, complete){
        mysql.pool.query("SELECT roomID AS id, roomName AS name, roomPrice AS price, roomDiscount AS discount, roomSize AS size, roomGender AS gender FROM Rooms", function(error, results, fields){
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
        getRooms(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('rooms', context);
            }

        }
    });