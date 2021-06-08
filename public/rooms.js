const baseURL = '/rooms'; // for added code below
let form = document.getElementById('roomsForm'); //for post reques


/** ANTHONY's ADDED CODE */
async function fetchData(){
    const res = await fetch("/rooms");
    const data = await res.json(); //returns a promise resolved to a JSON object
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
            roomName: null,
            roomPrice: null,
            roomDiscount: null,
            roomSize: null,
            roomGender: null,
        };
        payload.roomName = document.getElementById('inputName').value;
        payload.roomPrice = document.getElementById('inputRoomPrice').value;
        payload.roomDiscount = document.getElementById('inputDiscount').value;
        roomSize = document.getElementById('size');
        payload.roomSize = roomSize.options[roomSize.selectedIndex].text.toLowerCase();
        gender = document.getElementById('genderRoom');
        payload.roomGender = gender.options[gender.selectedIndex].text.toLowerCase();


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
                createTdElem(payload.roomName, newRow);
                createTdElem(payload.roomPrice, newRow);
                createTdElem(payload.roomDiscount, newRow);
                createTdElem(payload.roomSize, newRow);
                createTdElem(payload.genderRoom, newRow);
            }
        })
        req.send(JSON.stringify(payload));

        
    })
}

document.addEventListener('DOMContentLoaded', bindSubmitButton);

fetchData();


 function buildTable(response){
    const table = document.getElementById('roomsTableBody');
    table.innerHTML = "";
    const properties = ['roomName', "roomPrice", "roomDiscount", "roomSize", "roomGender", "genderRoom"];
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
