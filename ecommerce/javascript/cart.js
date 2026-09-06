let cartList = document.querySelector("#cartList");
let grandTotal = document.querySelector("#grandTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];


function productRow() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((element) => {
    cartList.innerHTML += `
        <div class="cart-item-row">
            <div class="cart-item-info">
                <img src="${element.imageURL}" alt="${element.catagory}">
                <h4>${element.name}</h4>
                <p>${element.price.toLocaleString()}</p>
            </div>
            <div class="quantity-controls">
                <button class="decrease-btn">-</button>
                <span class="item-quantity">${element.quantity}</span>
                <button class="increase-btn">+</button>
            </div>
            <button class="remove-btn" data_id="${element.id}">Remove</button>
        </div>
        `;
  });
}

function remove() {
  let removeBtn = document.querySelectorAll(".remove-btn");
  removeBtn.forEach((btn , index) => {
    btn.addEventListener("click", () => {
      // idx = btn.getAttribute("data_id");
      cart.splice(index, 1);
      render();
    });
  });
}

function quantityControl() {
  let decreaseBtn = document.querySelectorAll(".decrease-btn");
  let increaseBtn = document.querySelectorAll(".increase-btn");
  
  increaseBtn.forEach((btn , index)=>{
    btn.addEventListener("click" , ()=>{
      cart[index].quantity++
      render();
    })
  })
  decreaseBtn.forEach((btn , index)=>{
    btn.addEventListener("click" , ()=>{
      if (cart[index].quantity > 1) {
          cart[index].quantity--
          render();
      }
      else{
        cart.splice(index, 1);
        render();
      }
    })
  })

}

function grandTotalFn() {
  let total = cart.reduce((acc,val)=>{
      return acc += (val.price*val.quantity)
  },0)
  console.log(total);
  grandTotal.textContent = `${total.toLocaleString()}`;
}

function render() {
  
  productRow();
  quantityControl();
  remove();
  grandTotalFn();

 
  localStorage.setItem("cart", JSON.stringify(cart));
}

render();
