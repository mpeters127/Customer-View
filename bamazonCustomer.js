let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",

  port: 6969,

  user: "sozeb",

  password: "money",
  database: "bamazonDB"
});

connection.connect(function(error) {
  if (error) throw error;
});