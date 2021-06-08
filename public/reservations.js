const baseURL = '/reservations'; // for added code below
let form = document.getElementById('reservationsForm'); //for post request

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
            resDate: null,
            checkInDate: null,
            checkOutDate: null,
            nights: null,
        };
        payload.resDate = document.getElementById('resDate').value;
        payload.checkInDate = document.getElementById("checkInDate").value;
        payload.checkOutDate = document.getElementById("checkOutDate").value;
        payload.nights = document.getElementById("nights").value;
        payload.email = document.getElementById('email').value;
        
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