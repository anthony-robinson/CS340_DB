-- Data Definition Queries

DROP TABLE IF EXISTS `Customers`;
DROP TABLE IF EXISTS `Reservations`;
DROP TABLE IF EXISTS `Beds`;
DROP TABLE IF EXISTS `Rooms`;
DROP TABLE IF EXISTS `Meals`;
DROP TABLE IF EXISTS `MealsPurchased`;

-- Customer Table Creation
CREATE TABLE Customers (customerID INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
email VARCHAR(255) NOT NULL,
firstName VARCHAR(255) NOT NULL,
lastName VARCHAR(255) NOT NULL,
phone VARCHAR(25),
student BIT(1), 
genderRoom ENUM('m','f','co-ed') NOT NULL);

-- Rooms Table Creation
CREATE TABLE Rooms (roomID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
roomName VARCHAR(20),
roomPrice FLOAT(5,2) NOT NULL,
roomDiscount FLOAT(5,2) NOT NULL,
roomSize INT NOT NULL,
roomGender ENUM('m','f','co-ed') NOT NULL); 

-- Beds Table Creation
CREATE TABLE Beds (bedID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
roomID int NOT NULL,
bedSize ENUM('single','double'),
bedPrice FLOAT(5,2),
bedDiscount FLOAT(5,2),
FOREIGN KEY (roomID) REFERENCES Rooms(roomsID));

-- Reservations Table Creation
CREATE TABLE Reservations(reservationsID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
customerID INT NOT NULL,
bedID INT NOT NULL,
resDate DATE,
checkInDate DATE NOT NULL,
checkOutDate DATE NOT NULL,
nights INT NOT NULL,
FOREIGN KEY(customerID) REFERENCES Customers(customerID),
FOREIGN KEY (bedID) REFERENCES Beds(bedID));

-- Meals Table Creation
CREATE TABLE Meals (mealID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
meal VARCHAR(11),
capacity INT NOT NULL);

-- MealsPurchased Table Creation
CREATE TABLE MealsPurchased (mealsPurchasedID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
mealID INT,
customerID INT,
FOREIGN KEY (mealID) REFERENCES Meals(mealID),
FOREIGN KEY (customerID) REFERENCES Customers(customerID));


-- SAMPLE DATE Rooms
INSERT INTO Rooms(roomName, roomPrice, roomDiscount, roomSize, roomGender) VALUES ("Men 8-Person A", 60*8, (60*.85)*8, 8, 1);
INSERT INTO Rooms(roomName, roomPrice, roomDiscount, roomSize, roomGender) VALUES ("Men 6-Person A", 70*6, (70*.85)*6, 6, 1);
INSERT INTO Rooms(roomName, roomPrice, roomDiscount, roomSize, roomGender) VALUES ("Men Quad A", 80*4, (80*.85)*4, 4, 1);
INSERT INTO Rooms(roomName, roomPrice, roomDiscount, roomSize, roomGender) VALUES ("Men Double A", 90*2, (90*.85)*2, 2, 1);
INSERT INTO Rooms(roomName, roomPrice, roomDiscount, roomSize, roomGender) VALUES ("Women 8-Person A", 60*8, (60*.85)*8, 8, 2);
INSERT INTO Rooms(roomName, roomPrice, roomDiscount, roomSize, roomGender) VALUES ("Women 6-Person A", 70*6, (70*.85)*6, 6, 2);
INSERT INTO Rooms(roomName, roomPrice, roomDiscount, roomSize, roomGender) VALUES ("Women Quad A", 80*4, (80*.85)*4, 4, 2);
INSERT INTO Rooms(roomName, roomPrice, roomDiscount, roomSize, roomGender) VALUES ("Women Double A", 90*2, (90*.85)*2, 2, 2);
INSERT INTO Rooms(roomName, roomPrice, roomDiscount, roomSize, roomGender) VALUES ("Co-ed 8-Person A", 60*8, (60*.85)*8, 8, 3);
INSERT INTO Rooms(roomName, roomPrice, roomDiscount, roomSize, roomGender) VALUES ("Co-ed 6-Person A", 70*6, (70*.85)*6, 6, 3);
INSERT INTO Rooms(roomName, roomPrice, roomDiscount, roomSize, roomGender) VALUES ("Co-ed Quad A", 80*4, (80*.85)*4, 4, 3);
INSERT INTO Rooms(roomName, roomPrice, roomDiscount, roomSize, roomGender) VALUES ("Co-ed Double A", 90*2, (90*.85)*2, 2, 3);
INSERT INTO Rooms(roomName, roomPrice, roomDiscount, roomSize, roomGender) VALUES ("Single A", 60*1, (60*.85)*1, 1, 3);
INSERT INTO Rooms(roomName, roomPrice, roomDiscount, roomSize, roomGender) VALUES ("Single B", 60*1, (60*.85)*1, 1, 3);
INSERT INTO Rooms(roomName, roomPrice, roomDiscount, roomSize, roomGender) VALUES ("Single C", 60*1, (60*.85)*1, 1, 3);
