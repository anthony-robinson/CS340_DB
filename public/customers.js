
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
        req.send(JSON.stringify(payload));

        
    })
}

document.addEventListener('DOMContentLoaded', bindSubmitButton);

fetchData();


// document.getElementById('submitBtn').addEventListener('click', function(event){
//     event.preventDefault();
//     const firstName = document.getElementById('inputName1').value;
//     const lastName = document.getElementById('inputName2').value;
//     const email = document.getElementById('inputEmail').value;
//     const phone = document.getElementById('inputNumber').value;
//     var student = document.getElementById('gridCheck');
//     var genderRoom = document.getElementById('inputGender').value;

//     //checking if student is false
//     if (student.checked){
//         student = 1
//     } else {
//         student = 0
//     }


//     let req = new XMLHttpRequest();
 
//     req.open('POST', '/insert', true);
//     req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     req.addEventListener('load',function(){
//        if(req.status >= 200 && req.status < 400){
//           console.log("Insert done.");
//           document.getElementById('addForm').reset();
//           query();
//        }});
 
//     req.send(
//        'firstName=' + firstName + '&' +
//        'lastName=' + lastName + '&' +
//        'email=' + email + '&' +
//        'phone=' + phone + '&' +
//        'student=' + student + '&' +
//        'genderRoom=' + genderRoom
//     );
//  });

// function query(){
//     let req = new XMLHttpRequest();
//     req.open('GET', '/query', true);
//     req.addEventListener('load',function(){
//        if(req.status >= 200 && req.status < 400){
//           const response = JSON.parse(req.responseText);
//           console.log(response);
//           buildTable(response);
//        } else {
//           console.log(req.statusText);
//     }});
//     req.send(null);
//  }

//  function buildTable(response){
//     const table = document.getElementById('results');
//     table.innerHTML = "";
//     const properties = ['customerID', 'email', "firstName", "lastName", "phone", "student", "genderRoom"];
//     let row, cell, deleteBtn, editBtn, form;
//     for(i = 0; i<response.length; i++) {
//        row = document.createElement("tr");
//        for(j = 0; j<6; j++) {
//           cell = document.createElement("td");
//           cell.textContent = response[i][properties[j]];
//           row.appendChild(cell);
//        }
 
//        form = document.createElement("form");
//        cell.appendChild(form);
//        editBtn = document.createElement("button");
//        editBtn.textContent = "Edit";
//        editBtn.classList.add("editBtn");
//        editBtn.classList.add("btn");
//        editBtn.classList.add("btn-info");
//        editBtn.type = "button";
//        form.appendChild(editBtn);
       
//        deleteBtn = document.createElement("button");
//        deleteBtn.textContent = "Delete";
//        deleteBtn.classList.add("deleteBtn");
//        deleteBtn.classList.add("btn");
//        deleteBtn.classList.add("btn-danger");
//        deleteBtn.type = "button";
//        form.appendChild(deleteBtn);
 
//        table.appendChild(row);
//     }
//  }



