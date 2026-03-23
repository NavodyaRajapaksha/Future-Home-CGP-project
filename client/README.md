# Future Home – Construction Project Management System

## Project Overview

Future Home is a web-based Construction Project Management System developed to manage construction projects, properties, contractors, materials, sustainability tracking, cost estimation, and customer inquiries in a centralized platform.

The system helps construction companies manage projects efficiently, track materials, estimate costs, monitor sustainability metrics, and handle customer inquiries.

## System Architecture

The system follows a three-tier architecture:

* Frontend – React.js (Material UI)
* Backend – Node.js with Express.js
* Database – Microsoft SQL Server

The frontend communicates with the backend through REST APIs, and the backend connects to the SQL Server database.

## Technologies Used

Frontend:

* React.js
* Material UI
* Vite

Backend:

* Node.js
* Express.js

Database:

* Microsoft SQL Server

Tools:

* GitHub
* Visual Studio Code
* SQL Server Management Studio
* Postman

## Main Modules

* User Management
* Property Management
* Project Management
* Material Management
* Sustainability Management
* Cost Estimation Module
* Inquiry Management
* AR Visualization Module
* Dashboard & Reports

## How to Run the System

### Frontend

Open terminal inside client folder:
npm install
npm run dev

### Backend

Open terminal inside server folder:
npm install
node index.js

Backend runs on:
http://localhost:5000

## Database Setup

1. Open SQL Server Management Studio
2. Create a database named:
   FutureHomeDB
3. Run the SQL file inside the Data base folder:
   FutureHome_Database.sql

## Project Structure

Future-Home-CGP-project
│
├── client (React Frontend)
├── server (Node.js Backend)
├── Data base (SQL Database)
├── README.md
└── .gitignore

## Developed For

Final Year Group Project – Construction Project Management System
