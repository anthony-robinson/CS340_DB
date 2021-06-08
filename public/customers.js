
const baseURL = '/customers'; // for added code below
let form = document.getElementById('customersForm'); //for post request


// module.exports = function(){
//     var express = require('express');
//     var router = express.Router();

//     function getCustomers(res, mysql, context, complete){
//         mysql.pool.query("SELECT customerID AS id, email, firstName, lastName, phone, student, genderRoom AS RoomType FROM customers", function(error, results, fields){
//             if(error){
//                 res.write(JSON.stringify(error));
//                 res.end();
//             }
//             context.customers  = results;
//             complete();
//         });
//     }


//     router.get('/', function(req, res){
//         var callbackCount = 0;
//         var context = {};
//         context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
//         var mysql = req.app.get('mysql');
//         getCustomers(res, mysql, context, complete);
//         function complete(){
//             callbackCount++;
//             if(callbackCount >= 1){
//                 res.render('customers', context);
//             }

//         }
//     });
// }


/** ANTHONY's ADDED CODE */
async function fetchData(){
    const res = await fetch(baseURL);
    const data = await res.json(); //returns a promise resolved to a JSON object
    //waits until request completes
    buildTable(data);
    //return the response/ do something with response data.
    //return res;
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
        event.preventDefault();
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
        gender = document.getElementById('genderRoom');
        payload.genderRoom = gender.options[gender.selectedIndex].text.toLowerCase();
        //open post request
        req.open('POST', baseURL, true);
        req.setRequestHeader('Content-Type','application/json');
        req.addEventListener('load', function(){
            if(req.status >= 200 && req.status <= 400){
                //create table on successful load
                console.log("success");
                fetchData();
            }else{
                console.log("failure " + req.statusText);
            }
        })
        req.send(JSON.stringify(payload));
        
    })
}

document.addEventListener('DOMContentLoaded', bindSubmitButton);

fetchData();



function buildTable(response){
    let table = document.getElementById("customerTable");

    const properties = ['email', "firstName", "lastName", "phone", "student", "genderRoom"];
    let row, cell, deleteBtn, editBtn, form;
    let createdTableBody;
    //clear table
    if(document.querySelector("tbody") !== null){
        table.removeChild(document.querySelector("tbody"));
    }
    createdTableBody = document.createElement("tbody");
    for(i = 0; i<response.length; i++) {
       row = document.createElement("tr");
       for(j= 0; j < properties.length; j++){
        cell = document.createElement("td");
        cell.appendChild(document.createTextNode(response[i][properties[j]]));
        row.appendChild(cell);
    };
       createdTableBody.appendChild(row);
        
       let insertId = response.insertId;//for deletion
 
        //Buttons 

        //edit button
        let editData = document.createElement('td');

        let editBtn = document.createElement('input');
        editBtn.type="submit";
        editBtn.value = "Edit";
        editData.appendChild(editBtn);
        row.appendChild(editData);
        createdTableBody.appendChild(row);
        
        //Delete Button
        let deleteData = document.createElement('td');
        let deleteBtn = document.createElement('input');
        deleteBtn.type = "button";
        deleteBtn.value = "Delete";
        deleteBtn.onclick = function(){deleteEntry(insertId);};

        let hidden = document.createElement('input');
        hidden.type = "hidden";
        hidden.id = "delete" + i;
        
        deleteData.appendChild(deleteBtn);
        deleteData.appendChild(hidden);
        row.appendChild(deleteData);
        createdTableBody.appendChild(row);
        
    }
    table.appendChild(createdTableBody);
 }

 

