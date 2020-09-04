let total = 0;
let taxTotal = 0;


function purchasedItem(str) {
  itemName = str.replace(/[0-9.]/g, '')
  itemName = itemName.replace('at', '');
  return(itemName)
}

function salesTax(str) {
  arr = str.split('at');
  cost = arr[1]
  let salesTax = (cost * 0.15).toFixed(2);

  roundCentsUp = salesTax.split('.')[1]


  // roundUp(parseFloat(roundCentsUp * .01))
  let salesTaxRounded = roundUp(parseFloat(roundCentsUp))


  add(salesTaxRounded);
  addTax(salesTaxRounded);
  return salesTaxRounded;
}

function roundUp(roundCentsUp) {
  return((Math.ceil(roundCentsUp/5)*5) * .01);
}

function itemCost(str) {
  arr = str.split('at');
  cost = arr[1]
  console.log(cost)
  add(cost)
  return cost;
}

function quantity(str){
  arr = str.split(" ");
  let qty = arr.shift()
}

function add(cost){
  total = parseFloat(cost) + parseFloat(total);
  
  return total.toFixed(2);
}

function addTax(tax) {
  taxTotal = parseFloat(tax) + parseFloat(taxTotal);
  return taxTotal.toFixed(2);
  
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

  this.item = purchasedItem(itemInput)
  this.tax = salesTax(itemInput)
  this.price = itemCost(itemInput)
  this.total = add(0)
  this.taxTotal = addTax(0)
}

//UI Constructor
function UI() {}
UI.prototype.addBasketToList = function(basket) {
  const list = document.getElementById('basket-list');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${basket.item}</td>
    <td>${basket.price}</td>
    <td>${basket.tax}</td>
  `;
  list.appendChild(row);
  const itemsTax = document.getElementById('basket-list-tax') //
  itemsTax.innerText = `Tax ${basket.taxTotal}`
  const itemsTotal = document.getElementById('basket-list-total') //
  itemsTotal.innerText = `Total: ${basket.total}`
}

// Shows alert when one of the fields is left blank
UI.prototype.showAlert = function(themessage, className) {
  //Constructs Element for the error message
  let div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(themessage));
  const container = document.querySelector('.container');
  const form = document.querySelector('#basket-form');
  container.insertBefore(div, form);
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}



//Clears field method
UI.prototype.clearfields = function(){
  document.getElementById('item').value = '';

}


document.getElementById('basket-form').addEventListener('submit', 
  function(e) {


    let item = document.getElementById('item').value

   //Creates basket
   let basket = new Basket(item);
   //Creates a UI object
   const ui = new UI();
   console.log(ui);
   // Uncomment to see the dynamically added classes we have added as prototypes
   
   //Validate that the forms have content
   if(item === '') {
     ui.showAlert('Please fill in the field', 'error');
   } else {
    ui.addBasketToList(basket);
    ui.showAlert('Item Added', 'success');

    //Clears input fields
    ui.clearfields();

   }

//prevents initial behavior
  e.preventDefault();
});
