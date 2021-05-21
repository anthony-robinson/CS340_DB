
module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getBeds(res, mysql, context, complete){
        mysql.pool.query("SELECT bedID AS id, rooms.roomID AS roomID, bedSize AS size, bedPrice AS Price, bedDiscount AS discount  FROM Beds INNER JOIN beds ON roomID = rooms.roomID", function(error, results, fields){
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
        getBeds(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('beds', context);
            }

        }
    });