-- Data Manipulation Queries
-- Query for add a new character functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

-- INSERT for Customers
INSERT INTO Customers(email, firstName, lastName, phone, student, genderRoom)
VALUES (:emailInput, :firstNameInput, :lastNameInput, :phoneInput, :studentInput, :genderRoomInput);

-- INSERT for Reservations
INSERT INTO Reservations(customerID, bedID, resDate, checkInDate, checkOutDate, nights)
VALUES((SELECT customerID FROM Customers WHERE lastName = :lastNameInput), (SELECT bedID FROM Beds WHERE roomID = :roomIDInput), :resDateInput, :checkInDateInput, :checkOutDateInput, :nightsInput)

--SELECT for Reservations Customer ID Drop Down Input
SELECT firstName, lastName FROM Customers;

--SELECT for Reservations Page bed ID drop down menu
SELECT bedID, roomID FROM Beds;

-- INSERT for Beds
INSERT INTO Beds(roomID, bedSize, bedPrice, bedDiscount) 
VALUES ((SELECT roomID FROM Rooms WHERE roomID = :roomIDInput), :bedSizeInput, :bedPriceInput, :bedDiscountInput);
INSERT INTO Beds(roomID, bedSize, bedPrice, bedDiscount) VALUES ((SELECT roomsID FROM Rooms WHERE roomSize=8 AND roomGender=1), 1, (SELECT roomPrice / roomSize FROM Rooms WHERE roomSize=8 AND roomGender=1), (SELECT roomDiscount / roomSize FROM Rooms WHERE roomSize=8 AND roomGender=1));

-- INSERT for Rooms
INSERT INTO Rooms(roomName, roomPrice, roomDiscount, roomSize, roomGender) 
VALUES (:roomNameInput, :roomPriceInput, :roomDiscountInput, :roomSizeInput, :roomGender);
-- EXAMPLE: INSERT INTO Rooms(roomName, roomPrice, roomDiscount, roomSize, roomGender) VALUES ("Men 8-Person A", 60*8, (60*.85)*8, 8, 1);

-- INSERT for Meals
INSERT into Meals(meal, capacity) VALUES (:mealInput, :capacityInput);

-- INSERT for MealsPurchased
INSERT INTO MealsPurchased (customerID, mealID) 
VALUES ((SELECT customerID FROM Customers INNER JOIN MealsPurchased ON Customers.customerID = MealsPurchased.customerID WHERE customerID = :customerIDInput), 
(SELECT mealID FROM Meals INNER JOIN MealsPurchased ON Meals.mealID = MealsPurchased.mealsID WHERE mealID = :mealIDInput));



--- update customer information
UPDATE Customers SET email = :emailInput, firstName = :firstNameInput, lastName = :lastNameInput, phone= :phoneInput, student= :studentInput, genderRoom= :genderRoomInput;


--- update reservations
UPDATE Reservations SET resDate= :resDateInput, checkInDate = :checkInDateInput, checkOutDate = :checkOutDateInput, nights = :nightsInput

---- update MealsPurchased
UPDATE MealsPurchased SET mealID = (SELECT mealID FROM  )


--- delete customer
DELETE FROM Customers WHERE customerID = (SELECT customerID FROM Customers WHERE firstName= :firstNameInput AND lastName= :lastNameInput);

--- delete Reservations
DELETE FROM Reservations WHERE reservationID = :reservationIDInput;


-- Select Reservation:
SELECT * FROM Reservations WHERE checkInDate = :checkInDateInput;

--Select Customers
SELECT * FROM Customers WHERE lastName = :lastNameInput

-- Select Meal
SELECT * FROM Meals WHERE mealID = :mealIDInput;

--Select Beds
SELECT * FROM Beds WHERE roomID = :roomIDInput;

--Select Rooms
SELECT * FROM Rooms WHERE roomSize = :roomSizeInput;

-- Select Meals Purchase
SELECT * FROM MealsPurchased WHERE customerID = :customerIDInput;
