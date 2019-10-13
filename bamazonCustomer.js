let mysql = require("mysql");
let inquirer = require("inquirer");

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
    productSearch();
  })
};

//prompt to ask for desired product info
function productSearch(){
  inquirer
    .prompt([
      
      {//askes for ID
      name: "product id",
      type: "number",
      message: "What is the Item ID of the product you are looking for?"
    },
    {//asks for purchase quantity 
      name: "quantity",
      type: "number",
      message: "How many would you like to purchase?"
    }
  ])
}

//check if there is enough in stock
  //insufficient alert 
        //or
  //fulfill customer order
    //update inventory count
    //show cost of purchase