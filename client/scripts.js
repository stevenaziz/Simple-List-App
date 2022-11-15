const http = new coreHTTP;

// Block Variables
let theList = [];

// setup selectors
const result = document.querySelector(".result");
const input =  document.querySelector("#listitem");
const formAlert =  document.querySelector(".form-alert");
const addButton =  document.querySelector(".add-btn");
const delButton =  document.querySelector(".del-btn");

// Listeners
addButton.addEventListener("click", httpPost);
delButton.addEventListener("click", httpDelete);

/* Helper Functions */
function ShowList() {
  let output = "<ul>";
  for (const itm of theList) {
    output += `<li>${itm}</li>`;
  }
  output += "</ul>";
  result.innerHTML = output;
}

async function GetList() {
  theList = await http.get("/api");
  ShowList();
}

async function WriteList() {
  await http.post("/api", theList);
  ShowList();
}

/* Listener Functions */
async function httpPost(e) {
  e.preventDefault();
  if (input.value == "") {
    formAlert.innerText = "Please enter a valid input.";
    setTimeout(() => {
      formAlert.innerText = "";
    }, 2000);
    return;
  }
  theList[theList.length] = input.value;
  await WriteList();
  input.value = "";
}

async function httpDelete(e) {
  e.preventDefault();
  if (input.value == "") {
    formAlert.innerText = "Please enter a valid input.";
    setTimeout(() => {
      formAlert.innerText = "";
    }, 2000);
    return;
  }
  theListOrigLength = theList.length;
  for (let i = 0; i < theList.length; i++) {
    if (theList[i] == input.value) {
      theList.splice(i, 1);
      i--;
    }
  }
  if (theListOrigLength == theList.length) {
    formAlert.innerText = "The value you entered does not exist. Please try again.";
    input.value = "";
    setTimeout(() => {
      formAlert.innerText = "";
    }, 2000);
    return;
  }
  await WriteList();
  input.value = "";
}

// Loading functions
function showLoading() {
  result.innerHTML = "Loading...";
}

async function main() {
  addButton.disabled = true;
  delButton.disabled = true;
  showLoading();

  await GetList();

  addButton.disabled = false;
  delButton.disabled = false;
}

main();