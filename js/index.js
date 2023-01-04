// As a user i should be able to add products to cart
// As a use I should be able to filter products
// As a user I should see product details

// As a user i should be able to create an account
// As a user i should be able to login to the platform

// As a user I should be able to see a list of products
let products;
let cartArray = [];

function showNewProducts(productsObj) {
  const list = document.getElementById("products");
  list.innerHTML = "";

  for (let i = 0; i < productsObj.products.length; i++) {
    const product = productsObj.products[i];
    const productItem = document.createElement("li");
    productItem.classList.add("productListItem");
    productItem.innerHTML = ` <aside class="productImgWrapper">
       <div class="productLabel">
         Best Seller
       </div>
       <img class="productImg" src="${product.thumbnail}" />
       <button  class="cartbtn productCardBtn"> Add to cart</button>
    
     </aside>
    
     <div>
       <h4 class="category">${product.category}</h4>
       <h2 class="title">${product.title}</h2>
       <span class="price">$${product.price}</span>
     </div>`;

    list.appendChild(productItem);
  }
}

function showHeader(productHeader) {
  const header = document.querySelector(".showcase__header_title");
  header.innerHTML = productHeader.title;

  const sectionHeading = document.querySelector(".sectionHeading");
  sectionHeading.innerHTML = `About The ${productHeader.title}`;

  const sectionDescription = document.querySelector(".sectionLead");
  sectionDescription.innerHTML = productHeader.description;
}

function generateRandom(maxLimit = 10) {
  let rand = Math.random() * maxLimit;
  rand = Math.floor(rand); // 0 - 9
  return rand;
}

function showBannerImage(productImages) {
  console.log(productImages);
  const bannerWrapper = document.querySelector(".banner__wrapper");
  const image = document.createElement("img");
  image.classList.add("banner__img");

  if (productImages.products.length) {
  
    setInterval(function () {
      let idx = generateRandom();
      const presentImage = productImages.products[idx]
      image.src = presentImage.thumbnail;
      showHeader(presentImage);
    }, 10000);
  }

    bannerWrapper.appendChild(image);
} 

function fetchProductImages() {
  fetch("https://dummyjson.com/products?limit=10")
    .then((res) => res.json())
    .then((product) => {
      products = product;
      showBannerImage(product);
    });
}

fetchProductImages();

function filterProductByCategory() {
  const select = document.getElementById("category");
  const valueSelectedByUser = select.value;
  fetch(`https://dummyjson.com/products/category/${valueSelectedByUser}`)
    .then((res) => res.json())
    .then((products) => {
      showNewProducts(products);
    });
}

function showCategories(categories) {
  const select = document.getElementById("category");
  for (let i = 0; i < categories.length; i++) {
    const option = document.createElement("option");
    option.value = categories[i];
    option.innerHTML = categories[i];
    select.appendChild(option);
  }
}

function showProductsInCart() {
  document.getElementById("cartproduct_count").innerText = cartArray.length;
}

function addToCart(event) {
const product = event.target.getAttribute("data-product");
  cartArray.push(product);
  window.localStorage.setItem("cart", JSON.stringify(cartArray));
  showProductsInCart();
}

function addEventToBtns() {
  const buttons = document.querySelectorAll('.cartbtn');
  for(let i = 0; i < buttons.length; i++) { 
    const button = buttons[i];
    button.addEventListener("click", addToCart);
  }
}

function showProducts(productsObj) {
  for (let i = 0; i < productsObj.products.length; i++) {

    const product = productsObj.products[i];
    const stringProduct = JSON.stringify(product);

    const productItem = document.createElement("li");
    productItem.classList.add("productListItem");
    productItem.innerHTML = ` <aside class="productImgWrapper">
     <div class="productLabel">
       Best Seller
     </div>
     <img class="productImg" src="${product.thumbnail}" />
     <button data-product='${stringProduct}' class="cartbtn productCardBtn"> Add to cart</button>
  
   </aside>
  
   <div>
     <h4 class="category">${product.category}</h4>
     <h2 class="title">${product.title}</h2>
     <span class="price">$${product.price}</span>
   </div>`;

    const list = document.getElementById("products");
    list.appendChild(productItem);
  }

  addEventToBtns();
}

function getProducts() {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((products) => {
      showProducts(products);
    });
}

function getCategories() {
  fetch("https://dummyjson.com/products/categories")
    .then((res) => res.json())
    .then((categories) => {
      showCategories(categories);
    });
}

document
  .getElementById("category")
  .addEventListener("change", filterProductByCategory);

getProducts();
getCategories();