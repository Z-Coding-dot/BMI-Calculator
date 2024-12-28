const express = require("express");
// For creating the server and handling routes.
const bodyParser = require("body-parser");
//For parsing form data.
const fs = require("fs");
//or reading and writing files.
const path = require("path");
//For handling file paths.

const app = express();
const port = 3000;

// Path to the BMI history file
const historyFilePath = path.join(__dirname, "bmiHistory.json");

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static("public"));

// Load existing history from the file if it exists
let bmiHistory = [];
if (fs.existsSync(historyFilePath)) {
  const rawData = fs.readFileSync(historyFilePath);
  bmiHistory = JSON.parse(rawData);
}

// Route to serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// POST route to calculate BMI
app.post("/bmicalculator", (req, res) => {
  const { name, weight, height, age, gender, unit } = req.body;

  let bmi =
    unit === "metric"
      ? weight / (height / 100) ** 2
      : (weight / height ** 2) * 703;

  const timestamp = new Date().toLocaleString();

  // Determine BMI interpretation
  let interpretation = "";
  if (bmi < 18.5) {
    interpretation = "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    interpretation = "Normal weight";
  } else if (bmi >= 25 && bmi < 29.9) {
    interpretation = "Overweight";
  } else {
    interpretation = "Obesity";
  }

  // Save all inputs and the calculated BMI to the history
  const userHistory = {
    name,
    weight,
    height,
    age,
    gender,
    unit,
    bmi: bmi.toFixed(2),
    interpretation,
    timestamp,
  };

  bmiHistory.push(userHistory); // Add new entry to history

  // Save updated history to the file
  fs.writeFileSync(historyFilePath, JSON.stringify(bmiHistory, null, 2));

  res.send(`
    <body style="background :url(18.jpg) no-repeat; background-position: center;
    min-height: 100vh;
    background-size: cover; color: white; font-family: Arial, sans-serif;">
    <div style="text-align: center; margin-top: 50px; color: white; padding: 50px;">
      <h2 style="font-size: 4rem;">Hey ${name} Your BMI is <span style="color: aqua;">${bmi.toFixed(
    2
  )}</span></h2>
      <h3 style="font-size: 2.5rem;">This means you are <span style="color: ${
        interpretation === "Normal weight" ? "aqua" : "red"
      };">${interpretation}</span></h3>
      <p style="font-size: 2rem;">Good Luck ${name} 🤗</p>
    </div>
    </body>
  `);
});

// Route to view history (accessible only to you, the developer)
app.get("/history", (req, res) => {
  res.json(bmiHistory);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Route to serve the packages page
app.get("/packages-page", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "packages.html"));
});

// Import the built-in modules list from Node.js
const builtInModules = require("module").builtinModules;

app.get("/package-data", (req, res) => {
  const packageJsonPath = path.join(__dirname, "package.json");

  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    res.json({
      dependencies: packageJson.dependencies || {},
      devDependencies: packageJson.devDependencies || {},
      builtInModules, // Include built-in modules
    });
  } else {
    res.status(404).json({ error: "package.json not found" });
  }
});

