let titleInp = document.getElementById("title");
let priceInp = document.getElementById("price");
let totalPrice = document.getElementById("total");
let taxesInp = document.getElementById("taxes");
let adsInp = document.getElementById("ads");
let discountInp = document.getElementById("discount");
let countInp = document.getElementById("count");
let categoryInp = document.getElementById("category");
let deleteAllBtn = document.getElementById("deleteAll");
let createBtn = document.getElementById("create");
let searchBar = document.getElementById("search");
let searchType = document.getElementById("searchTitle");
let searchResults = document.getElementById("searchResults");
let dark = document.getElementById("dark");
let sortBtn = document.getElementById("sort");

let table = document.getElementsByTagName("h5");

let state = "create";
var tmp;
// ----------------------------------------------------- light and dark Mood ---------------------------------------------------
checkedBtn = document.getElementById("onOff");

function change() {
  if (checkedBtn.checked === true) {
    document
      .getElementsByClassName("dash")[0]
      .setAttribute("style", `color: white;background-color: black   `);

    dark.innerHTML = "light mood";
    dark.style.color = "blue";
    $('th[name="head"]').css("color", "white");
    $('td[name="tHead"]').css("color", "red");
    var TextElements = document.getElementsByTagName("button");

    for (var i = 0, max = TextElements.length; i < max; i++) {
      TextElements[i].style.color = "black";
      TextElements[i].style.backgroundColor = "white";
    }
  } else {
    document
      .getElementsByClassName("dash")[0]
      .setAttribute(
        "style",
        `color: black;background-color: rgb(172, 170, 170);`
      );
    dark.innerHTML = "dark mood";
    dark.style.color = "black";
    totalPrice.style.background = "black";
    totalPrice.style.color = "white";
    $('th[name="head"]').css("color", "black");
    $('td[name="tHead"]').css("color", "green");
    $('button[class="btn"]').css("color", "black");
    var TextElements = document.getElementsByTagName("button");

    for (var i = 0, max = TextElements.length; i < max; i++) {
      TextElements[i].style.color = "white";
      TextElements[i].style.backgroundColor = "black";
      totalPrice.style.background = "white";
      totalPrice.style.color = "black";
    }
  }
}
checkedBtn.addEventListener("change", change);
//------------------------------------------get total --------------------------

function getTotal() {
  if (priceInp.value != "") {
    let total =
      Number(priceInp.value) +
      Number(taxesInp.value) +
      Number(adsInp.value) -
      Number(discountInp.value);

    totalPrice.innerHTML = `total= ${total}`;
    totalPrice.style.background = "white";
    totalPrice.style.color = "black";
  } else {
    totalPrice.innerHTML = `total: ${""}`;
    totalPrice.style.background = "rgb(148, 185, 204)";
    alert("please enter a price");
  }
}
//--------------------------------------------create product-----------------------------
let products;
if (localStorage.product != null) {
  //34an yzwd 3la ly mwgod
  products = JSON.parse(localStorage.product);
} else {
  products = [];
}

function createProduct() {
  let productObj = {
    title: titleInp.value.toLowerCase(),
    price: priceInp.value,
    taxes: taxesInp.value,
    ads: adsInp.value,
    discount: discountInp.value,
    count: countInp.value,
    category: categoryInp.value.toLowerCase(),
    total: totalPrice.innerHTML,
  };

  // console.log(typeof Number(productObj.count));
  if (state === "create") {
    deleteAllBtn.disabled = false;
    // console.log(state);
    if (
      titleInp.value != "" &&
      priceInp.value != "" &&
      countInp.value != "" &&
      productObj.count < 100
    ) {
      if (Number(productObj.count) > 1) {
        for (let i = 0; i < Number(productObj.count); i++) {
          products.push(productObj);
          // console.log(products);
        }
      } else {
        products.push(productObj);

        // console.log(products);
      }
      clearInputs();
    }
  } else {
    products[tmp] = productObj;
    console.log(state);

    // deleteAllBtn.disabled = true;
    state = "create";
    deleteAllBtn.disabled = false;

    console.log(state);

    createBtn.innerHTML = "create";
    countInp.style.display = "block";
  }

  // console.log(productObj, products);
  localStorage.setItem("product", JSON.stringify(products)); // l localStorage bta5od string bs

  show();
}

//------------------------------- clear inputs-------------------------------------

function clearInputs() {
  titleInp.value = "";
  priceInp.value = "";
  totalPrice.innerHTML = "total:";
  taxesInp.value = "";
  adsInp.value = "";
  discountInp.value = "";
  countInp.value = "";
  categoryInp.value = "";
}

//----------------------------------------- show the data----------------------------

function show() {
  let data = "";

  for (let i = 0; i < products.length; i++) {
    // console.log(data);
    data += products[i];
    data += `<tr class="p-4">
      <td name = "tHead">${i + 1}</td>
  
      <td name = "tHead">${products[i].title}</td>
      <td name = "tHead">${products[i].price}</td>
      <td name = "tHead">${products[i].taxes}</td>
      <td name = "tHead">${products[i].ads}</td>
      <td name = "tHead">${products[i].discount}</td>
      <td  name = "tHead">${products[i].count}</td>
      <td name = "tHead">${products[i].total}</td>

      <td name = "tHead">${products[i].category}</td>
      <td name = "tHead"><button onclick="someFun(${i})" class="btn btn-primary">Delete</button>
      <td name = "tHead"><button onclick="updateProduct(${i})" class="btn btn-primary">update</button></td>

    </tr>`;

    deleteAllBtn.innerHTML = `delete All (${products.length})`;
    document.getElementById("tbody").innerHTML = data;
  }

  if (products.length > 0) {
    deleteAllBtn.style.display = "block";
  } else {
    deleteAllBtn.style.display = "none";
  }
  // getTotal();
  change();
}

show();

// -------------------------------------------delete----------------------------------------------------

function deleteProduct(i) {
  // console.log(i);
  products.splice(i, 1);
  localStorage.product = JSON.stringify(products);
  // change();
  show();
}

function deleteAll(i) {
  console.log(i);
  products.splice(i, products.length);
  localStorage.product = JSON.stringify(products);
  show();
}

// ---------------------------------------------function Update------------------------------------

function updateProduct(i) {
  console.log(i);
  change();
  sort();
  titleInp.value = products[i].title;

  priceInp.value = products[i].price;
  taxesInp.value = products[i].taxes;
  adsInp.value = products[i].ads;
  discountInp.value = products[i].discount;
  categoryInp.value = products[i].category;
  getTotal();
  countInp.style.display = "none";
  createBtn.innerHTML = "update";
  state = "update";
  deleteAllBtn.disabled = true;

  scrollTo(0, 0);
  tmp = i;
}

let searchMood = "title";
//-------------------------------------------------- search--------------------------------------
function searchBy(id) {
  console.log(id);
  if (id === "searchTitle") {
    searchMood = "title";
    searchBar.placeholder = "search By Title";
  } else {
    searchMood = "category";

    searchBar.placeholder = "search By category";
  }

  searchBar.focus();
}

function search(value) {
  let data = "";
  if (searchMood === "title") {
    for (let i = 0; i < products.length; i++) {
      if (products[i].title.toLowerCase().includes(value.toLowerCase())) {
        data += ` 
      <tr class="p-4">
      <td>${i + 1}</td>
  
      <td>${products[i].title}</td>
      <td>${products[i].price}</td>
      <td>${products[i].taxes}</td>
      <td>${products[i].ads}</td>
      <td>${products[i].discount}</td>
      <td >${products[i].count}</td>
      <td >${products[i].total}</td>

      <td>${products[i].category}</td>
      <td><button onclick=" someFun(${i})" class="btn btn-primary">delete</button></td>
      <td><button onclick="updateProduct(${i})" class="btn btn-primary">update</button></td>

    </tr>`;
      }
      let lengthOfSearch = products.filter(
        (element) => element.title === value
      );
      searchResults.innerHTML = `${lengthOfSearch.length} product`;
      console.log(lengthOfSearch.length);
    }
  } else {
    for (let i = 0; i < products.length; i++) {
      if (products[i].category.toLowerCase().includes(value.toLowerCase())) {
        data += ` 
      <tr class="p-4">
      <td>${i + 1}</td>
  
      <td>${products[i].title}</td>
      <td>${products[i].price}</td>
      <td>${products[i].taxes}</td>
      <td>${products[i].ads}</td>
      <td>${products[i].discount}</td>
      <td >${products[i].count}</td>
      <td >${products[i].total}</td>
      <td>${products[i].category}</td>
      <td><button onclick="someFun(${i})" class="btn btn-primary">delete</button></td>
      <td><button onclick="updateProduct(${i})" class="btn btn-primary">update</button></td>

    </tr>`;
      }
      let lengthOfSearch = products.filter(
        (element) => element.category === value
      );
      searchResults.innerHTML = `${lengthOfSearch.length}  product`;
      console.log(lengthOfSearch.length);
    }
  }

  document.getElementById("tbody").innerHTML = data;
}

function validation(title, count, category) {
  const titlePattern = /[\u0600-\u06FF]/;

  // titleInp.value.test();
  console.log(title);
  const titleValid = titlePattern.test(title);

  const countPattern = /^[1-9][0-9]?$|^100$/;

  // titleInp.value.test();
  console.log(countInp.value);
  const countValid = countPattern.test(countInp.vlaue);
  if (titleValid && countValid) {
    console.log("s7");

    // createBtn.disabled = false;
  } else {
    // createBtn.disabled = true;
    console.log("8lt");
  }
}

// ---------------------------------------------------------------- sort function---------------------
sortBtn.addEventListener("click", sort);
function sort() {
  products.sort((a, b) => {
    return a.price - b.price;
  });
  let data = "";

  for (let i = 0; i < products.length; i++) {
    // console.log(data);
    data += products[i];
    data += `<tr class="p-4">
    <td name = "tHead">${i + 1}</td>

    <td name = "tHead">${products[i].title}</td>
    <td name = "tHead">${products[i].price}</td>
    <td name = "tHead">${products[i].taxes}</td>
    <td name = "tHead">${products[i].ads}</td>
    <td name = "tHead">${products[i].discount}</td>
    <td  name = "tHead">${products[i].count}</td>
    <td name = "tHead">${products[i].total}</td>

    <td name = "tHead">${products[i].category}</td>
    <td name = "tHead"><button onclick="someFun(${i})" class="btn btn-primary">Delete</button>
    <td name = "tHead"><button onclick="updateProduct(${i})" class="btn btn-primary">update</button></td>

  </tr>`;
  }
  document.getElementById("tbody").innerHTML = data;
  change();
}
// ---------------------------------------------------------------- multiple function-------------------
function someFun() {
  deleteProduct();
  change();
  sort();
}
