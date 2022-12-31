let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total span");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let submit = document.querySelector("#submit");
let search = document.querySelector("#search");

let mood = "create";
let i;

// Get Total Function
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
  } else {
    total.innerHTML = "0";
  }
}

// Create Products Function

let productData;
if (localStorage.products != null) {
  productData = JSON.parse(localStorage.products);
} else {
  productData = [];
}

submit.onclick = () => {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newProduct.count <= 200
  ) {
    if (mood == "create") {
      if (newProduct.count > 1) {
        for (i = 0; i < newProduct.count; i++) {
          productData.push(newProduct);
        }
      } else {
        productData.push(newProduct);
      }
    } else if (mood == "update") {
      productData[i] = newProduct;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearInputs();
  }

  localStorage.setItem("products", JSON.stringify(productData));
  showData();
};

// Clear Inputs Function
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "0";
  count.value = "";
  category.value = "";
}

// Show Data Function
function showData() {
  let table = "";
  for (i = 0; i < productData.length; i++) {
    table += `
            <tr>
              <td>${i + 1}</td>
              <td>${productData[i].title}</td>
              <td>${productData[i].price}</td>
              <td>${productData[i].taxes}</td>
              <td>${productData[i].ads}</td>
              <td>${productData[i].discount}</td>
              <td>${productData[i].total}</td>
              <td>${productData[i].category}</td>
              <td><button onclick="updateProductData(${i})" id = "update">update</button></td>
              <td><button onclick="deleteOneProduct(${i})" id="delete">delete</button></td>
            </tr>`;
  }
  document.querySelector("#tbody").innerHTML = table;
  let deleteAllBtn = document.querySelector(".deleteAllBtn");
  if (productData.length > 0) {
    deleteAllBtn.innerHTML = `<button onclick="deleteAllProducts()">Delete All (${productData.length})</button>`;
  } else {
    deleteAllBtn.innerHTML = "";
  }
}
showData();

// Delete One Product Function

function deleteOneProduct(index) {
  productData.splice(index, 1);
  localStorage.products = JSON.stringify(productData);
  showData();
}

// Delate All Products Function
function deleteAllProducts() {
  let confirm = window.confirm("Are you sure to delete all products?");
  if (confirm == true) {
    localStorage.clear();
    productData.splice(0);
    showData();
  } else {
    false;
  }
}

// Update Product Data Function
function updateProductData(index) {
  title.value = productData[index].title;
  price.value = productData[index].price;
  taxes.value = productData[index].taxes;
  ads.value = productData[index].ads;
  discount.value = productData[index].discount;
  total.innerHTML = productData[index].total;
  category.value = productData[index].category;
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  i = index;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search Functions
let searchMood = "Title";
function getSearchMood(id) {
  if (id == "searchTitle") {
    searchMood = "Title";
  } else {
    searchMood = "Category";
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (i = 0; i < productData.length; i++) {
    if (searchMood == "Title") {
      if (productData[i].title.includes(value.toLowerCase())) {
        table += `
            <tr>
              <td>${i + 1}</td>
              <td>${productData[i].title}</td>
              <td>${productData[i].price}</td>
              <td>${productData[i].taxes}</td>
              <td>${productData[i].ads}</td>
              <td>${productData[i].discount}</td>
              <td>${productData[i].total}</td>
              <td>${productData[i].category}</td>
              <td><button onclick="updateProductData(${i})" id = "update">update</button></td>
              <td><button onclick="deleteOneProduct(${i})" id="delete">delete</button></td>
            </tr>`;
      }
    } else if (searchMood == "Category") {
      if (productData[i].category.includes(value.toLowerCase())) {
        table += `
            <tr>
              <td>${i + 1}</td>
              <td>${productData[i].title}</td>
              <td>${productData[i].price}</td>
              <td>${productData[i].taxes}</td>
              <td>${productData[i].ads}</td>
              <td>${productData[i].discount}</td>
              <td>${productData[i].total}</td>
              <td>${productData[i].category}</td>
              <td><button onclick="updateProductData(${i})" id = "update">update</button></td>
              <td><button onclick="deleteOneProduct(${i})" id="delete">delete</button></td>
            </tr>`;
      }
    }

    document.querySelector("#tbody").innerHTML = table;
  }
}
