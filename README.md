
Description
This is the backend code for managing order inventory written in Nest JS typescript framework

Project Setup
Follow these steps to set up and run the project:

1. Clone the Repository

git clone https://github.com/eswarbalisetty7777/backendDPWorld.git

cd backendDPWorld

3. Create a Database
   
Create a database with the name DPWorld in MySQL

5. Install Dependencies
Run the following command to install the necessary dependencies:

npm install

4. Configure Environment Variables
Change the username and password for the Database in app.module.ts 
Replacee the <YOUR DB USERNAME> with your root username
Replace the <YOUR DB PASSWORD> with your root password

Ensure these variables match your database setup.

5. Compile and Run the Project
Use the following commands to compile and run the project:

npm run start

6. Access the Application
Once the server is running, you can access the application at http://localhost:3000 (assuming the default port 3000 is used).

<img width="921" alt="eer" src="https://github.com/user-attachments/assets/591babbb-1570-43b0-9a0b-bf9bc463f401">


Design :- 
1) A customer can place multiple orders (One to Many)
2) Each order can have multiple items and each item can be present in multiple orders (Many to Many)
3) A customer can have multiple addresses (One to many)

Features :-
You can edit an order  
   1) add/delete number of items in it.
   2) edit the customer details
   3) edit the address associated with the order
   
You can add an order 
   1) To an existing customer
   2) To a new customer

You can add an item 
   1) This appears on the items dropdown list


   





