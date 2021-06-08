const baseURL = '/reservations'; // for added code below
let form = document.getElementById('resForm'); //for post reques


/** ANTHONY's ADDED CODE */
async function fetchData(){
    const res = await fetch("/reservations");
    const data = await res.json(); //returns a promise resolved to a JSON object
    console.log(data);
    buildTable(data);
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
    let table = document.getElementById("resTable");
    let length = document.getElementById("resTable").rows.length;
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
            customerID: null,
            resDate: null,
            checkInDate: null,
            checkOutDate: null,
            nights: null,
        };
        payload.customerID = document.getElementById('inputCustomer').value;
        payload.bedID = document.getElementById('inputBed').value;
        payload.resDate = document.getElementById('inputResDate').value;
        payload.checkIn = document.getElementById('inputCheckInDate').value;
        payload.checkOut = document.getElementById('inputCheckOutDate').value;
        payload.nights = document.getElementById('inputNights').value;




        //open post request
        req.open('POST', baseURL, true);
        req.setRequestHeader('Content-Type','application/json');
        req.addEventListener('load', function(){
            if(req.status >= 200 && req.status <= 400){
                //add to table on load
                let response = JSON.parse(req.responseText);
                let insertId = response.insertId;//for deletion
                let table = document.getElementById("roomsTable");
                let newRow = table.insertRow(-1);
                createTdElem(payload.customerID, newRow);
                createTdElem(payload.bedID, newRow);
                createTdElem(payload.resDate, newRow);
                createTdElem(payload.checkInDate, newRow);
                createTdElem(payload.checkOutDate, newRow);
                createTdElem(payload.nights, newRow);
            }
        })
        req.send(JSON.stringify(payload));

        
    })
}

document.addEventListener('DOMContentLoaded', bindSubmitButton);

fetchData();


 function buildTable(response){
    const table = document.getElementById('resBody');
    const properties = ['customerID', "bedID", "resDate", "checkInDate", "checkOutDate", "nights"];
    let row, cell, deleteBtn, editBtn, form;
    for(i = 0; i<response.length; i++) {
       row = document.createElement("tr");
       for(j = 0; j<6; j++) {
          cell = document.createElement("td");
          cell.textContent = response[i][properties[j]];
          row.appendChild(cell);
       }

        table.appendChild(row);
    }
 }
