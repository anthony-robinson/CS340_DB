const addButton = document.getElementById('add-button')

addButton.addEventListener('click', function(event){
    event.preventDefault();
    //check if roomID is NULL
    const roomID = document.getElementById('inputRoomID').value;
    if(roomID.length === 0){
        //write code to show error
        document.getElementById('output').textContent = 'roomID cannot be null';
        document.getElementById('output').classList.remove('hidden'); 
        return;
    }
    if(document.getElementById("gridRadios1").checked) {
        const bedSize = document.getElementById('gridRadios1').value
    } else {
        const bedSize = document.getElementById('gridRadios2').value
    }
    const bedPrice = document.getElementById('bedPrice').value
    if(document.getElementById('gridCheck').checked) {
        //if discount is checked
        const bedDiscount = 1
    } else {
        const bedDiscount = 0
    }

    //start HTTP request
    let req = new XMLHttpRequest();

    req.open('POST', '/insert', true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.addEventListener('load', function(){
        if(req.status >= 200 && req.status < 400){
            console.log("Insert done.");
            getData(); //not sure what this is
        } else {
            //display error message
            document.getElementById('output').textContent = 'Error in network request' ;
            document.getElemetnById('output').classList.remove('hidden'); 
            console.log(req.statusText);
        }
    });
    //putting together the request for insert
    req.send(
        'roomId=' + roomID +'&' +
        'bedSize' + bedSize + '&' +
        'bedPrice' + bedPrice + '&' +
        'bedDiscount' + bedDiscount
    );
});

function getData();
