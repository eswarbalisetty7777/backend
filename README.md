# Demo
https://www.youtube.com/watch?v=sn53zIYN8oM

# This is the backend code for managing order inventory written in Nest JS typescript framework

## Project Setup
Follow these steps to set up and run the project:

## Clone the Repository

- git clone 
```
https://github.com/eswarbalisetty7777/backendDPWorld.git
```

- cd 
```
backendDPWorld
```

## Create a Database
   
Create a database with the name DPWorld in MySQL

## Install Dependencies
Run the following command to install the necessary dependencies:
```
npm install
```

## Configure Environment Variables
### Change the username and password for the Database in app.module.ts 
- Replacee the <YOUR DB USERNAME> with your root username
- Replace the <YOUR DB PASSWORD> with your root password

- Ensure these variables match your database setup.

## Compile and Run the Project
Use the following commands to compile and run the project:
```
npm run start
```

## Access the Application
Once the server is running, you can access the application at http://localhost:3000 (assuming the default port 3000 is used).

<img width="921" alt="eer" src="https://github.com/user-attachments/assets/591babbb-1570-43b0-9a0b-bf9bc463f401">


## Design :- 
- A customer can place multiple orders (One to Many)
- Each order can have multiple items and each item can be present in multiple orders (Many to Many)
- A customer can have multiple addresses (One to many)

## Features :-
You can edit an order  
   - add/delete number of items in it.
   - edit the customer details
   - edit the address associated with the order
   
## You can add an order 
   - To an existing customer
   -  To a new customer

## You can add an item 
   - This appears on the items dropdown list


   





