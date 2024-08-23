const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
  port: 3306,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// Creates an express object

// It listens to HTTP get request.
// Here it listens to the root i.e '/'
// app.get("/", (req, res) => {

//   // Using send function we send
//   // response to the client
//   // Here we are sending html
//   res.send("<h1> Hello World </h1>");
// });

app.get("/", (req, res) => {
  let disp = "no message";
  con.query("SELECT user FROM tablee", function (err, result) {
    if (err) throw err;
    if (result[0] === undefined) {
      console.log(err);
      return res.json("No Items Yet");
    }

    disp = result[0].user;
    console.log(result[0].user);

    //return res.json(JSON.stringify(result))
  });

  res.status(200).send("<h1>" + disp + "</h1>");
});

// It configures the system to listen
// to port 3000. Any number can be
// given instead of 3000, the only
// condition is that no other server
// should be running at that port
app.listen(3000, () => {
  // Print in the console when the
  // servers starts to listen on 3000
  console.log("Listening to port 3000");
});

module.exports = { app, con };
