document.getElementById('submitBtn').addEventListener('click', function(event){
    event.preventDefault();
    const firstName = document.getElementById('inputName1').value;
    const lastName = document.getElementById('inputName2').value;
    const email = document.getElementById('inputEmail').value;
    const phone = document.getElementById('inputNumber').value;
    var student = document.getElementById('gridCheck');
    var genderRoom = document.getElementById('inputGender').value;

    //checking if student is false
    if (student.checked){
        var student = 1
    } else {
        var student = 0
    }


    let req = new XMLHttpRequest();
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(phone);
    console.log(student);
    console.log(genderRoom);
 
    req.open('POST', '/insertCustomers', true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.addEventListener('load',function(){
       if(req.status >= 200 && req.status < 400){
          console.log("Insert done.");
          document.getElementById('addForm').reset();
          query();
       }});
 
    req.send(
       'firstName=' + firstName + '&' +
       'lastName=' + lastName + '&' +
       'email=' + email + '&' +
       'phone=' + phone + '&' +
       'student=' + student + '&' +
       'genderRoom=' + genderRoom
    );
 });

function query(){
    let req = new XMLHttpRequest();
    req.open('GET', '/queryCustomers', true);
    req.addEventListener('load',function(){
       if(req.status >= 200 && req.status < 400){
          const response = JSON.parse(req.responseText);
          console.log(response);
          buildTable(response);
       } else {
          console.log(req.statusText);
    }});
    req.send(null);
 }

 function buildTable(response){
    const table = document.getElementById('results');
    table.innerHTML = "";
    const properties = ['customerID', 'email', "firstName", "lastName", "phone", "student", "genderRoom"];
    let row, cell, deleteBtn, editBtn, form;
    for(i = 0; i<response.length; i++) {
       row = document.createElement("tr");
       for(j = 0; j<5; j++) {
          cell = document.createElement("td");
          cell.textContent = response[i][properties[j]];
          row.appendChild(cell);
       }
       cell = document.createElement("td");
       cell.textContent = response[i][properties[5]][0].data;
       row.appendChild(cell);
       
       cell = document.createElement("td");
       cell.textContent = response[i][properties[6]];
       row.appendChild(cell);
        
 
       cell = document.createElement("td");
       form = document.createElement("form");
       cell.appendChild(form);
       editBtn = document.createElement("button");
       editBtn.textContent = "Edit";
       editBtn.classList.add("editBtn");
       editBtn.classList.add("btn");
       editBtn.classList.add("btn-info");
       editBtn.type = "button";
       form.appendChild(editBtn);
       
       deleteBtn = document.createElement("button");
       deleteBtn.textContent = "Delete";
       deleteBtn.classList.add("deleteBtn");
       deleteBtn.classList.add("btn");
       deleteBtn.classList.add("btn-danger");
       deleteBtn.type = "button";
       form.appendChild(deleteBtn);
 
       table.appendChild(row);
    }
 }

 document.addEventListener("DOMContentLoaded", function() {
    query();
  });
