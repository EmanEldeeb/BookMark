const form = document.querySelector("form");
const siteName = document.getElementById("sitename");
const siteUrl = document.getElementById("siteurl");
const addBtn = form.querySelector("button");
const tableBody = document.querySelector("table tbody");
const exit = document.querySelector(".exit");
const failModel = document.querySelector(".fail-model-container");
const checkUrl =
  /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
const checkName = /\w{3,}/i;
let sitesContainer = [];

if (localStorage.getItem("sites") != null) {
  sitesContainer = JSON.parse(localStorage.getItem("sites"));
  displaySites();
}

form.addEventListener("submit", (event) => event.preventDefault());

siteName.oninput = function () {
  this.classList.add("is-invalid");
  if (checkName.test(siteName.value)) {
    this.classList.add("is-valid");
    this.classList.remove("is-invalid");
  }
};
siteUrl.oninput = function () {
  this.classList.add("is-invalid");
  if (checkUrl.test(siteUrl.value)) {
    this.classList.add("is-valid");
    this.classList.remove("is-invalid");
  }
};

addBtn.addEventListener("click", () => {
  createSite();
  displaySites();
  clearInputs();
});
function SiteBlueprint(sitename, url) {
  this.name = sitename;
  this.url = url;
}
// show alert model if input doesn't meet the rules
function showModel() {
  //control input to retrieve it to its original state after fail
  siteName.classList.remove("is-invalid");
  siteUrl.classList.remove("is-invalid");
  failModel.classList.remove("hide-disapper");
}
exit.addEventListener("click", () => {
  failModel.classList.add("hide-disapper");
});
// create object for site if it meet the rules and not exist before or show a model
function createSite() {
  if (checkName.test(siteName.value) && checkUrl.test(siteUrl.value)) {
    const site = new SiteBlueprint(siteName.value, siteUrl.value);
    for (const psite of sitesContainer) {
      if (psite.name === site.name) {
        alert("exist");
        return;
      }
    }
    sitesContainer.push(site);
    console.log(sitesContainer, "out");
    localStorage.setItem("sites", JSON.stringify(sitesContainer));
  } else {
    showModel();
  }
}

// display the object in the table after creation
function displaySites() {
  //control input to retrieve it to its original state after success
  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");

  let tableContent = "";
  for (let i = 0; i < sitesContainer.length; i++) {
    tableContent += `
    <tr>
            <td>${i + 1}</td>
            <td>${sitesContainer[i].name}</td>
            <td>
              <a href="${
                sitesContainer[i].url
              }" target="_blank" class="btn visit"
                ><i class="fa-regular fa-eye"></i> Visit</a
              >
            </td>
            <td>
              <button class="btn btn-danger"   onclick="deleteSite(${i})">
                <i class="fa-solid fa-trash"></i> Delete
              </button>
            </td>
          </tr>
    
    `;
  }
  tableBody.innerHTML = tableContent;
}

function clearInputs() {
  siteName.value = "";
  siteUrl.value = "";
}

function deleteSite(index) {
  sitesContainer.splice(index, 1);
  displaySites();
  localStorage.setItem("sites", JSON.stringify(sitesContainer));
}
