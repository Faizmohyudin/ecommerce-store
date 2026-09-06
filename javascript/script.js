let productGrid = document.querySelector("#productGrid");
let cartCount = document.querySelector("#cartCount");
let cartBtn = document.querySelector("#cartBtn");
let cartSidebar = document.querySelector("#cartSidebar");
let closeCartBtn = document.querySelector("#closeCart");
let catBtn = document.querySelectorAll(".cat-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function productCard(data) {
  productGrid.innerHTML = ""
  data.forEach((element) => {
    productGrid.innerHTML += `
      <div class="product-card">
      <div class="img-container">
      <img src="${element.imageURL}" alt="${element.catagory}">
      </div>
      <h3>${element.name}</h3>
      <p>RS. ${element.price.toLocaleString()}</p>
      <button data_id="${element.id}">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="margin-right: 6px; vertical-align: middle;">
      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </svg> Add to Cart</button>
      </div>
      `;
  });
}

function addToCart(data) {
  cartCount.textContent = `${cart.reduce((acc, val) => {
    return (acc += val.quantity);
  }, 0)}`;

  let allBtn = productGrid.querySelectorAll("button");
  allBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let productId = btn.getAttribute("data_id");
      let ClickedProduct = data.find((element) => {
        return element.id == productId;
      });
      let found = false;
      if (cart.length === 0) {
        cart.push({ ...ClickedProduct, quantity: 1 });
        cartCount.textContent = `${cart.reduce((acc, val) => {
          return (acc += val.quantity);
        }, 0)}`;
      } else {
        cart.forEach((element) => {
          if (element.id === ClickedProduct.id) {
            element.quantity++;
            cartCount.textContent = `${cart.reduce((acc, val) => {
              return (acc += val.quantity);
            }, 0)}`;
            found = true;
          }
        });

        if (!found) {
          cart.push({ ...ClickedProduct, quantity: 1 });
          console.log(cart);
          cartCount.textContent = `${cart.reduce((acc, val) => {
            return (acc += val.quantity);
          }, 0)}`;
        }
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });
}

function filterCategory(data) {
  catBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      catBtn.forEach((btnClass) => {
        btnClass.classList.remove("active");
      });
      btn.classList.add("active");

      if (btn.getAttribute("data-category") === "all") {
        productGrid.innerHTML = "";
        productCard(data);
        addToCart(data);
      } else {
        let arr = data.filter((element) => {
          return element.catagory === btn.getAttribute("data-category");
        });
        productGrid.innerHTML = "";
        productCard(arr);
        addToCart(arr);
      }
    });
  });
}

async function render() {
  try {
    let response = await fetch("products.json");
    let data = await response.json();

    productCard(data);
    filterCategory(data);
    addToCart(data);
  } catch (error) {
    console.log(error.message);
  }
}

render();

// localStorage.clear()
