let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localHost",

  port: 3306,

  user: "root",

  password: "14spaceman69",

  database: "bamazonDB"
});

connection.connect(function (error) {
  if (error) throw error;
  console.log("connected as ID " + connection.threadId);
  afterConnection();
});

function afterConnection (){
  connection.query('SELECT * FROM inventory', function(err, res){
    if (err) throw (err);
    console.log(res);
    connection.end()
  })
}