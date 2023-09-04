# University Session Booking System

This is a simple University Session Booking System built using Node.js, Express.js, Sequelize (MySQL), and JWT authentication.

## Project Structure

The project follows an MVC (Model-View-Controller) pattern for a clear separation of concerns.



university-session-booking/
├── app.js
├── config/
│ └── database.js
├── controllers/
│ ├── authController.js
│ ├── deanController.js
│ └── studentController.js
├── middleware/
│ └── authMiddleware.js
├── models/
│ ├── Dean.js
│ ├── Session.js
│ └── Student.js
├── routes/
│ ├── authRoutes.js
│ ├── deanRoutes.js
│ └── studentRoutes.js
├── node_modules/
├── package.json
└── README.md

bash
Copy code

## Getting Started

1. Clone this repository:

   
   git clone https://github.com/your-username/university-session-booking.git
   cd university-session-booking
Install the dependencies:

 
npm install
Set up your MySQL database by configuring config/database.js.




To create a MySQL database for your project on your local machine, follow these steps:

1. **Install MySQL**: If you don't have MySQL installed, download and install it from the official website: https://dev.mysql.com/downloads/

2. **Start MySQL Server**: After installation, start the MySQL server. The exact steps might vary depending on your operating system. You might need to start a service or run a command.

3. **Access MySQL**: Open a terminal or command prompt and access the MySQL command-line interface by typing:

   ```sh
   mysql -u root -p
   ```

   You'll be prompted to enter the root password you set during installation.

4. **Create a Database**: In the MySQL command-line interface, create a database for your project. Replace `university_session_booking` with your preferred database name:

   ```sql
   CREATE DATABASE university_session_booking;
   ```

5. **Grant Privileges**: Create a user and grant privileges to the database. Replace `yourusername` and `yourpassword` with your desired username and password:

   ```sql
   CREATE USER 'yourusername'@'localhost' IDENTIFIED BY 'yourpassword';
   GRANT ALL PRIVILEGES ON university_session_booking.* TO 'yourusername'@'localhost';
   FLUSH PRIVILEGES;
   ```

6. **Update Config**: In your project, open the `config/database.js` file and replace `'database'`, `'username'`, and `'password'` with the database name, username, and password you just created.

   ```javascript
   const sequelize = new Sequelize('university_session_booking', 'yourusername', 'yourpassword', {
     host: 'localhost',
     dialect: 'mysql',
     // ...
   });
   ```

7. **Sync Models**: Now that your database is set up, when you start your Node.js application, Sequelize will automatically create the required tables based on the model definitions in the `models/` directory.

   ```sh
   npm start
   ```

Your MySQL database is now ready for your University Session Booking System project. Remember to follow the same steps when deploying to a production environment, but make sure to set stronger security practices for your database credentials and user privileges.








Start the server:

 
npm start
The server will start at http://localhost:3000.

API Endpoints
Authentication
POST /auth/student/login: Student login. Provide university_id and password in the request body.

POST /auth/dean/login: Dean login. Provide university_id and password in the request body.

POST /auth/student-b/login: Student B login. Provide university_id and password in the request body.

Dean Routes
GET /dean/pending-sessions: Fetch pending sessions for the logged-in dean.

GET /dean/all-pending-sessions: Fetch all pending sessions for the dean.

GET /dean/pending-sessions-after-slot-time: Fetch pending sessions for the dean after slot time has passed.

Student B Routes
GET /student-b/sessions: Fetch free sessions for Student B.

POST /student-b/book: Book a session for Student B. Provide session_id in the request body.

Authentication
Authentication is implemented using JSON Web Tokens (JWT). Only logged-in users (students, deans) can access specific routes.

Database
The project uses MySQL database for storing student, dean, and session data. Configure your database in config/database.js.

Dependencies
express: Web application framework.
body-parser: Middleware to parse request bodies.
sequelize: Promise-based ORM for database interactions.
mysql2: MySQL driver for Sequelize.
jsonwebtoken: Library for generating and verifying JWTs.
Contributing
Contributions are welcome! Feel free to open issues and submit pull requests.

License
This project is licensed under the MIT License - see the LICENSE file for details.

 

Certainly, testing your project using Postman is an important step to ensure that all APIs and functionalities are working as expected. Below, I'll guide you through the process of testing the different parts of your project using Postman.

Assuming you've set up your project as per the previous discussions, here's how you can test each part of the project:

1. **Authentication**:

   - Open Postman.
   - Select the "POST" request method.
   - Enter the URL: `http://localhost:3000/auth/student/login`
   - In the "Body" tab, select "raw" and choose "JSON (application/json)".
   - Enter the following JSON in the request body:

     ```json
     {
       "university_id": "student123",
       "password": "password123"
     }
     ```

   - Click the "Send" button.
   - You should receive a response with a JWT token.
   - Repeat the same steps for dean and student B login endpoints.

2. **Dean Routes**:

   - For dean routes, you need a valid JWT token. Copy the token received from the login response.
   - Open a new request tab.
   - Select the "GET" request method.
   - Enter the URL: `http://localhost:3000/dean/pending-sessions`
   - In the "Headers" tab, add a header:
     - Key: `Authorization`
     - Value: `Bearer <your-copied-token>`
   - Click the "Send" button.
   - You should receive a response with pending session details.

3. **Student B Routes**:

   - For student B routes, you need a valid JWT token. Copy the token received from the student B login response.
   - Open a new request tab.
   - Select the "GET" request method.
   - Enter the URL: `http://localhost:3000/student-b/sessions`
   - In the "Headers" tab, add a header:
     - Key: `Authorization`
     - Value: `Bearer <your-copied-token>`
   - Click the "Send" button.
   - You should receive a response with available free session details.

4. **Booking a Session**:

   - For booking a session, you need a valid JWT token. Copy the token received from the student B login response.
   - Open a new request tab.
   - Select the "POST" request method.
   - Enter the URL: `http://localhost:3000/student-b/book`
   - In the "Headers" tab, add a header:
     - Key: `Authorization`
     - Value: `Bearer <your-copied-token>`
   - In the "Body" tab, select "raw" and choose "JSON (application/json)".
   - Enter the following JSON in the request body (replace `<session-id>` with an actual session ID):

     ```json
     {
       "session_id": "<session-id>"
     }
     ```

   - Click the "Send" button.
   - You should receive a response indicating the session booking status.



 


