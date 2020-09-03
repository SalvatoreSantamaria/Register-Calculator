let total = 0;
let taxTotal = 0;


function purchasedItem(str) {
  itemName = str.replace(/[0-9.'at']/g, '');
  return(itemName)
}

function salesTax(str) {
  arr = str.split('at');
  cost = arr[1]
  let salesTaxTotal = cost * 0.15;
  add(salesTaxTotal);
  addTax(salesTaxTotal);
  return salesTaxTotal;
}

function itemCost(str) {
  arr = str.split('at');
  cost = arr[1]
  add(cost)
  return cost;
}

function quantity(str){
  arr = str.split(" ");
  let qty = arr.shift()
}

function add(cost){
  total = parseInt(cost) + parseInt(total);
  return total;
}

function addTax(tax) {
  taxTotal = parseInt(tax) + parseInt(taxTotal);
  return taxTotal;
  
}


document.getElementById("submitText").addEventListener("click", function () {
  //input = parseInt(document.getElementById("inputText").value);
  input = document.getElementById("inputText").value;
  document.getElementById("items").innerHTML = purchasedItem(input);
  document.getElementById("salesTaxes").innerHTML = salesTax(input);
  //document.getElementById("total").innerHTML = x(input);
});

// <!-- input 
// 1 Music CD at 14.99 
// 1 Book at 12.49

// Output
// Music CD: 16.49
// Sales Taxes: 1.50
// Total: 16.49 -->


function Basket(itemInput) {
  // this.item = item;
  // this.price = 1;
  // this.tax = 2;

  this.item = purchasedItem(itemInput)
  this.tax = salesTax(itemInput)
  this.price = itemCost(itemInput)
  this.total = add(0)
  this.taxTotal = addTax(0)
}

//UI Constructor
function UI() {}

//Adds basket to list.
//Adds "addBasketToList to prototype"
UI.prototype.addBasketToList = function(basket) {
  const list = document.getElementById('basket-list');
  //Creates tr Element
  const row = document.createElement('tr');
  //Inserts cols with template literal
  row.innerHTML = `
    <td>${basket.item}</td>
    <td>${basket.price}</td>
    <td>${basket.tax}</td>
  `;
  list.appendChild(row);

  const itemsTax = document.getElementById('basket-list-tax') //
  itemsTax.innerText = `${basket.taxTotal}`

  const itemsTotal = document.getElementById('basket-list-total') //
  itemsTotal.innerText = `${basket.total}`


  // listTotal.appendChild('')
  // //Creates tr Element
  // const listTotalRow = document.createElement('tr');
  // listTotalRow.innerHTML = `
  //   <td>${basket.total}</td>
  //   `;
  // listTotal.replaceChild(listTotalRow);

}

// Shows alert when one of the fields is left blank
UI.prototype.showAlert = function(themessage, className) {
  //Constructs Element for the error message
  let div = document.createElement('div');
  //Add classes to div. Below adds the class name "alert", and also adds in the classname that is passed in by the function
  div.className = `alert ${className}`;
  //Adds text by adding a text node. Actual text is the text coming in from the function
  div.appendChild(document.createTextNode(themessage));
  //Insert into the DOM. 
  //Get parent, which is the containter
  const container = document.querySelector('.container');
  //Get the form, because we want to put the error before the form
  const form = document.querySelector('#basket-form');
  //Take container, which is parent, and insert div and what we want to insert before, which is form.
  container.insertBefore(div, form);
  //Set timeout after 3 seconds. Set timeout is part of the window object. Second parameter is number of milliseconds
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

//Delete basket
// UI.prototype.deleteBasket = function(target){
//   if(target.className === 'delete') {
//     //First parent element is td, second parent element is tr
//     target.parentElement.parentElement.remove();
//   }
// }

//Clears field method
UI.prototype.clearfields = function(){
  document.getElementById('item').value = '';
  // document.getElementById('price').value = '';
  // document.getElementById('tax').value = '';
}

//Event Listeners
//Event Listener for adding a basket
document.getElementById('basket-form').addEventListener('submit', 
  function(e) {

    //Gets form values
    let item = document.getElementById('item').value
    // a = document.getElementById('price').value,
    // i = document.getElementById('tax').value

   //Creates basket
   //let basket = new Basket(t, a, i);
   let basket = new Basket(item);
   //Creates a UI object
   const ui = new UI();
   console.log(ui);
   // Uncomment to see the dynamically added classes we have added as prototypes
   
   //Validate that the forms have content
   if(item === '') {
   
   //Error Alert
   ui.showAlert('Please fill in the field', 'error');

   } else {

   //Adds basket to list
   ui.addBasketToList(basket);
   //Shows success message when basket is successfully added
   ui.showAlert('Item Scanned', 'success');

   //Clears input fields
   ui.clearfields();

   }

//prevents initial behavior
  e.preventDefault();
});

//Event Listener for deleting a basket. Function takes in event, which is e.
// document.getElementById('basket-list').addEventListener('click', function(e){
// //Target delete X from within prototype method in the UI
// //creates "ui"
// const ui = new UI();
// //calls ui method of deleteBasket and passes in the target
// // ui.deleteBasket(e.target);
// //Shows alert of 'Basket removed' using the class of success
// ui.showAlert('Basket Removed', 'success');

//   e.preventDefault();
// });