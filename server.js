// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var tableCount = 0;

// function tableIds() {
//   tableCount++
//   return tableCount;
// }
//
// function Table(name, phoneNum, email) {
//   this.name = name;
//   this.phoneNum = phoneNum;
//   this.email = email;
//   this.uid = tableIds();
// };
//
// console.log(test = new Table('test', '5555', 'test@13.com'));

// Tables (DATA)
// =============================================================
const tables = [
  {
    name: 'Test Person',
    phoneNum: '555-555-1234',
    email: 'test@yay.com',
    uid: '55',
    isCurrent: true
  }
];

const isOverBooked = () => {

  let currentCount = 0;
  for (let i = 0; i < tables.length; i++) {
    if (tables[i].isCurrent) {
      currentCount++;
      console.log(`${tables[i].uid} Is Current` )
    }
  }
  console.log(`Table Length: ${tables.length}. Current Count: ${currentCount}`);
  if (currentCount > 4) {
    return true;
  } else {
    return false;
  }
};

console.log(isOverBooked());

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "assets/index.html"));
});

app.get("/assets/css/style.css", function(req, res) {
  res.sendFile(path.join(__dirname, "assets/css/style.css"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "assets/view.html"));
});

app.get("/api/table-data", function(req, res) {
  res.json(tables);
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "assets/add.html"));
});


// Create New Tables - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newTable = req.body;
  newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();
  newTable.isCurrent = !isOverBooked();

  console.log(newTable);

  tables.push(newTable);

  console.log(tables);

  res.json(newTable);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
