const form = document.querySelector("form");
const result = document.querySelector(".search-result");
const container = document.querySelector(".container");
const message = document.querySelector(".message");
const section = document.querySelector("section");
const searchResult = document.querySelector(".search-result");
let searchQuery = "";
const APP_ID = "ca3b214f";
const APP_KEY = "cc9f253fb9be492821966232f1994346";

form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("input").value;
    fetchAPI();
});

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();

    if (data.hits.length == 0) {
        const errorMessage = `<p class="error-message">Invalid Input</p>`;
        message.innerHTML = errorMessage;
        searchResult.innerHTML = "";
    } else {
        message.innerHTML = "";
        generateHTML(data.hits);
    }
    console.log(data);
}

function generateHTML(results) {
    container.classList.remove("initial");
    let generatedHTML = "";
    results.map((result) => {
        generatedHTML += `<div class="item">
        <img src="${result.recipe.image}" alt="">
        <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a href="${
                result.recipe.url
            }" class="view-button" target="_blank">View Button</a>
        </div>
        <p class="item-data">Calorie: ${Math.round(result.recipe.calories)}</p>
        <p class="item-data cuisine">Cuisine Type: ${
            result.recipe.cuisineType
        }</p>
        <p class="item-data">Diet Label: ${
            result.recipe.dietLabels.length > 0
                ? result.recipe.dietLabels
                : "No Data Found"
        }</p>
    </div>
    `;
    });
    searchResult.innerHTML = generatedHTML;
}
