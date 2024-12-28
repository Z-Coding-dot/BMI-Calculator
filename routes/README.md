Assignment 1: BMI Calculator Routing
Project Overview
By: Ziaulhaq Parsa Karimi & Mohammad Shahid Meyakhail
This project is a simple BMI (Body Mass Index) calculator built using Node.js and Express.js. It allows users to input their weight, height, age, gender, and unit of measurement (Metric or Imperial) to calculate their BMI. The application saves all user inputs along with the calculated BMI value for server-side storage, ensuring that user data can be reviewed later.
The project demonstrates the use of backend routing and middleware to handle HTTP requests, process user input, and serve dynamic responses.
Features
•	Dynamic BMI Calculation: Users can calculate their BMI by providing weight, height, and other details in the form.
•	Server-side Storage: All user inputs and calculated BMI values are stored in a JSON file (bmiHistory.json).
•	Responsive User Interface: The BMI result is displayed in the center of the page with a modern look, styled using Bootstrap.
•	Dedicated Routes: 
o	/ serves the BMI Calculator form.
o	/bmicalculator processes the form data and calculates the BMI.
o	/history displays the saved history of calculations (for development/debugging purposes).
Installation and Usage Instructions
Prerequisites
1.	Node.js: Ensure that Node.js is installed on your system. Download it from nodejs.org.
2.	npm: Comes pre-installed with Node.js.
Installation
1.	Clone the repository or download the project files.
2.	git clone <repository-url>
3.	cd <project-folder>
4.	Install the required npm packages:
5.	npm install
Dependencies:
o	Express.js: Used for creating the server and routing.
o	Body-parser: Middleware to parse form data.
Running the Application
1.	Start the server:
2.	node server.js
3.	Open your browser and navigate to:
4.	http://localhost:3000
5.	Use the form to input your details (weight, height, age, etc.) and calculate your BMI.
Application Workflow
1.	Form Submission:
o	The user submits weight, height, age, gender, and unit via the form on the homepage (/).
2.	BMI Calculation:
o	The server processes the form data and calculates the BMI using the appropriate formula based on the selected unit (Metric or Imperial).
o	The result is displayed on the page in a styled format.
3.	Data Storage:
o	User inputs and BMI values are stored in a JSON file (bmiHistory.json) for reference.
4.	History Retrieval (for debugging or future implementation):
o	All past calculations can be viewed by accessing the /history route (e.g., http://localhost:3000/history).
Additional Information
•	The server runs on port 3000 by default.
•	Bootstrap is used for styling the UI, ensuring a clean and modern design.
•	The project adheres to RESTful routing principles.
•	The /history route is for development purposes and can be disabled or restricted in production.
Conclusion
This project successfully implements the concepts of backend development, including routing, data processing, and server-side storage. It demonstrates the integration of Node.js and Express.js to build a functional web application while adhering to good practices like modularity and clean code. The assignment highlights the practical use of middleware, npm packages, and dynamic HTML rendering in a real-world scenario.
