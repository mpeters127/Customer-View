let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "",

  port: "",

  user: "",

  password: "",

  database: "bamazonDB"
});

connection.connect(function (error) {
  if (error) throw error;
  console.log("connected as ID " + connection.threadId);
  displayInventory();
});

function displayInventory() {
  connection.query('SELECT * FROM inventory', function (err, res) {
    if (err) throw (err);
    console.log(res);
    productSearch();
  })
};

//prompt to ask for desired product info
function productSearch() {
  inquirer
    .prompt(

      {//askes for ID
        name: "product",
        type: "number",
        message: "What is the Item ID of the product you are looking for?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }

    )
    .then(function (productChoice) {
      let selectedItem = productChoice.product;
      connection.query(' SELECT * FROM inventory WHERE item_id= ? ', selectedItem, function (err, res) {
        if (err) throw err;
        if (res.length === 0) {
          console.log("------------------------------------------------------------------------------------------------------------------------");
          console.log("Product does not exist. Please review our inventory and select again.");
          console.log("");
          productSearch()
        }
        else {
          inquirer
            .prompt({
              // {//asks for purchase quantity 
              name: "quantity",
              type: "number",
              message: "How many would you like to purchase?"
            })
            //check if there is enough in stock
            .then(function (quantityChoice) {
              let quantity = quantityChoice.quantity;
              if (quantity > res[0].stock_quantity) {
                //insufficient alert 

                console.log("------------------------------------------------------------------------------------------------------------------------");
                console.log("Sorry, we only have " + res[0].stock_quantity + " on hand. Please reselect your item at a lower quantity.");
                console.log("");
                productSearch();
                //or
              }
              else {
                //fulfill customer order
                console.log("------------------------------------------------------------------------------------------------------------------------");
                console.log("You have selected " + quantity + " " + res[0].product_name + "(s) for a price of $" + res[0].price + " each.");
                //show cost of purchase
                console.log("Your total comes to $" + quantity * res[0].price);
              }
            })


          //update inventory count
          
        }
      })
    })
}