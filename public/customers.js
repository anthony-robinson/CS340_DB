
const baseURL = '/customers'; // for added code below
let form = document.getElementById('customersForm'); //for post request

module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getCustomers(res, mysql, context, complete){
        mysql.pool.query("SELECT customerID AS id, email, firstName, lastName, phone, student, genderRoom AS RoomType FROM customers", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers  = results;
            complete();
        });
    }


    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getCustomers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('customers', context);
            }

        }
    });
}


/** ANTHONY's ADDED CODE */
async function fetchData(){
    const res = await fetch(baseURL);
    const data = await res.json(); //returns a promise resolved to a JSON object
    //waits until request completes
    //return the response/ do something with response data.
    return res;
}

//For populating new table
function createTdElem(input, row){
    let elem = document.createElement('td');
    elem.textContent = input;
    row.appendChild(elem);
}

//For deleting an entry in the table
function deleteEntry(id){
    let table = document.getElementById("customerTable");
    let length = document.getElementById("customerTable").rows.length;
    key = "delete" + id;

    
    for(let j=1; j < length; j++){
        let row = table.rows[j];
        let data = row.getElementsByTagName("td");
        let deleteEntry = data[data.length - 1];
        if(deleteEntry.children[1].id === key){
            document.getElementById("customerTable").deleteRow(j);
            length--;
            j--;
        }
    }
    let req = new XMLHttpRequest();

    req.open("DELETE", "/delete", true);
    req.send("/delete" + id);
    
}

//implement Submit functionality
function bindSubmitButton(){
    form.addEventListener('submit', function(event){
        let req = new XMLHttpRequest();
        let payload = {
            email: null,
            firstName: null,
            lastName: null,
            phone: null,
            student: 0,
            genderRoom: null
        };
        payload.email = document.getElementById('email').value;
        payload.firstName = document.getElementById('firstName').value;
        payload.lastName = document.getElementById('lastName').value;
        payload.phone = document.getElementById('phone').value;
        payload.student = document.getElementById('student').value;
        payload.genderRoom = document.getElementById('genderRoom').value;

        //open post request
        req.open('POST', baseURL, true);
        req.setRequestHeader('Content-Type','application/json');
        req.addEventListener('load', function(){
            if(req.status >= 200 && req.status <= 400){
                //add to table on load
                let response = JSON.parse(req.responseText);
                let insertId = response.insertId;//for deletion
                let table = document.getElementById("customerTable");
                let newRow = table.insertRow(-1);

                createTdElem(payload.email, newRow);
                createTdElem(payload.firstName, newRow);
                createTdElem(payload.lastName, newRow);
                createTdElem(payload.phone, newRow);
                createTdElem(payload.student, newRow);
                createTdElem(payload.genderRoom, newRow);

                //Buttons 

                //edit button
                let editData = document.createElement('td');
        
                let editBtn = document.createElement('input');
                editBtn.type="submit";
                editBtn.value = "Edit";
                editData.appendChild(editBtn);
                newRow.appendChild(editData);
                
                //Delete Button
                let deleteData = document.createElement('td');
                let deleteBtn = document.createElement('input');
                deleteBtn.type = "button";
                deleteBtn.value = "Delete";
                deleteBtn.onclick = function(){deleteEntry(insertId);};

                let hidden = document.createElement('input');
                hidden.type = "hidden";
                hidden.id = "delete" + insertId;
                
                deleteData.appendChild(deleteBtn);
                deleteData.appendChild(hidden);
                newRow.appendChild(deleteData);
            }
        })
        req.send(JSON.stringify(input));

        event.preventDefault();
    })
}

document.addEventListener('DOMContentLoaded', bindSubmitButton);

