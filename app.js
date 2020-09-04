let total = 0;
let taxTotal = 0;

function purchasedItem(str) {
  itemName = str.replace(/[0-9.]/g, '');
  itemName = itemName.replace('at', '');
  return(itemName)
}

function salesTax(str) {
  arr = str.split('at');
  cost = arr[1];
  let salesTax = (cost * 0.15).toFixed(2);
  roundCentsUp = salesTax.split('.')[1];
  let salesTaxRounded = roundUp(parseFloat(roundCentsUp))

  add(salesTaxRounded);
  addTax(salesTaxRounded);
  return(salesTaxRounded);
}

function roundUp(roundCentsUp) {
  return((Math.ceil(roundCentsUp/5)*5) * .01);
}

function itemCost(str) {
  arr = str.split('at');
  cost = arr[1];

  add(cost);
  return(cost);
}

function add(cost){
  total = parseFloat(cost) + parseFloat(total);
  return(total.toFixed(2));
}

function addTax(tax) {
  taxTotal = parseFloat(tax) + parseFloat(taxTotal);
  return(taxTotal.toFixed(2));
}

document.getElementById("submitText").addEventListener("click", function () {
  input = document.getElementById("inputText").value;
  document.getElementById("items").innerHTML = purchasedItem(input);
  document.getElementById("salesTaxes").innerHTML = salesTax(input);
});

function Basket(itemInput) {
  this.item = purchasedItem(itemInput);
  this.tax = salesTax(itemInput);
  this.price = itemCost(itemInput);
  this.total = add(0);
  this.taxTotal = addTax(0);
}

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
  const itemsTax = document.getElementById('basket-list-tax')
  itemsTax.innerText = `Tax ${basket.taxTotal}`
  const itemsTotal = document.getElementById('basket-list-total')
  itemsTotal.innerText = `Total: ${basket.total}`
}

UI.prototype.showAlert = function(themessage, className) {
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

UI.prototype.clearfields = function(){
  document.getElementById('item').value = '';
}

document.getElementById('basket-form').addEventListener('submit', 
  function(e) {
    let item = document.getElementById('item').value
    let basket = new Basket(item);
    const ui = new UI();

    if(item === '') {
      ui.showAlert('Please fill in the field', 'error');
    } else {
      ui.addBasketToList(basket);
      ui.showAlert('Item Added', 'success');
      ui.clearfields();
    }

  e.preventDefault();
});
