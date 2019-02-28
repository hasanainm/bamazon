var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "Hasanain1997",
  database: "bamazonApp_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connection Successful for ID " + connection.threadId + "\n");
  displayInfo();
});

function displayInfo() {
  console.log("Welcome to Bamazon...here are our top 10 best sellers!\n");
  connection.query("SELECT * FROM products", function (error, response) {
    if (error) throw error
    for (var i = 0; i < 1; i++) {
      console.table(response);
      // ("ID: " + response[i].item_id + " | " + " Name of Product: " + response[i].product_name + " | " + " Department: " + response[i].department_name + " | " + " Price: $" + response[i].price);
    }
    chooseID();
  })
}

var array = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
var price;
var totalPrice;
var itemQuantity;
var productName;
var newInventory;
var newTotalPrice = 0;
var InsufficientAlternative = ["I want to take the remaining items.", "I want to shop for another item."];
var remainingItems;
var totalCostItems;

function chooseID() {
  inquirer.prompt({

    name: "id",
    type: "input",
    message: "What is the ID number for the item you have selected?",
    choices: array

  })
    .then(function (answer) {
      connection.query("select * from products", function (error, result) {
        if (error) throw error;
        for (var i = 0; i < result.length; i++) {
          if (parseInt(answer.id) === result[i].item_id) {
            console.log("Great choice! " + result[i].product_name + " is a very popular item in our store.");
            price = result[i].price;
            itemQuantity = result[i].stock_quantity;
            productName = result[i].product_name;
            
          }
        }
        purchaseAmount();
      })

    });
}

function purchaseAmount() {
  inquirer.prompt({
    name: "quantity",
    type: "input",
    message: "How many " + productName + "'s would you like to buy?"
  })
    .then(function (answer) {
      if (answer.quantity <= itemQuantity) {
        console.log("Of course! We can place the order for you right away!");
        newInventory = itemQuantity - answer.quantity;
        // console.log(newInventory);
        totalPrice = price * answer.quantity;
        newTotalPrice = parseFloat(totalPrice).toFixed(2);
        // console.log(totalPrice);
        console.log("Your total price for the " + productName + " is $" + newTotalPrice + "!");
        updateInventory();
      }
      else if (answer.quantity > itemQuantity) {
        console.log("Insufficient quantity, we only have " + itemQuantity + " on hand.");
        pickAnotherItem();
      }
    })
}

function pickAnotherItem() {
  inquirer.prompt({
    name: "anotherItem",
    type: "list",
    message: "What would you like to do now?",
    choices:InsufficientAlternative
  })
  .then(function(answer){
    if(answer.anotherItem === InsufficientAlternative[0]) {
      remainingItems = itemQuantity * price;
      totalCostItems = parseFloat(remainingItems).toFixed(2);
      console.log("Wow! Your total now is $" + totalCostItems + ".");
      newInventory =  (itemQuantity - itemQuantity);
      updateInventory();
    }
    else{
      displayInfo();
    }
    
  })
}


function updateInventory() {
  connection.query("update products set ? where ?",
  [
    {
      stock_quantity: newInventory
    },
    {
      product_name: productName
    }
  ],
    function (err, result) {
      if (err) throw err
      console.log("Thank you for shopping at Bamazon, we'll see you again next time!!!");
      
    }
  )

}































