# Node.js User API

This is a RESTful API for user management, built with Node.js, Express, and MongoDB.

## Features

- User Registration
- User Login
- User Profile 
- User Logout
- Fetch a Random Joke with given api
- Secure Password Hashing

## Installation

1. Clone the repository:
   git clone <https://github.com/Shubhijain17/company_tasks.git>
   npm install
## Create a .env file and add the following environment variables:
PORT=8100
MONGODB_URI=mongodb://localhost:27017
CORS_ORIGIN=*
JWT_SECRET=123445shubhiahjshsdhshdvhsvhh
## Running the Application
npm run dev
##  API Endpoints
POST /api/v1/users/register: Register a new user.
POST /api/v1/users/login: Login a user.
GET /api/v1/users/me: Get the logged-in user's profile.
GET /api/v1/users/random-joke: Get a random joke (authenticated users only).
POST /api/v1/users/logout: Logout the user.
## postman 
https://task66.postman.co/workspace/task-Workspace~09ecd2b9-392a-48af-8ae0-7754f29fe109/collection/30822141-6af76387-5177-4a77-8e5f-42581fa2c026?action=share&creator=30822141
