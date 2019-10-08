let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localHost",

  port: 3306,

  user: "root",

  password: "14spaceman69",
  
  database: "bamazonDB"
});

connection.connect(function(error) {
  if (error) throw error;
  console.log("connected as ID " + connection.threadId);
});