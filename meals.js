
module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getMeals(res, mysql, context, complete){
        mysql.pool.query("SELECT mealID AS id, meal, capacity FROM meals", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.meals  = results;
            complete();
        });
    }


    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getMeals(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('meals', context);
            }

        }
    });
}