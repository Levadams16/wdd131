const recipes = [
  {
    name: "Apple Crisp",
    tags: ["Dessert", "Fruit"],
    rating: 4,
    description: "This apple crisp recipe is a simple yet delicious fall dessert that's great served warm with vanilla ice cream.",
    image: "images/images/apple-crisp.jpg"
  },
  {
    name: "Chicken Curry",
    tags: ["Dinner", "Spicy"],
    rating: 5,
    description: "A deliciously juicy chicken curry with a hint of spice.",
    image: "images/images/chicken-curry.webp"
  }
];

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
  const listLength = list.length;
  const randomNum = random(listLength);
  return list[randomNum];
}

function recipeTemplate(recipe) {
  return `
    <img src="${recipe.image}" alt="Image of ${recipe.name}">
    <div class="main-details">
      <p class="descriptor">${recipe.tags[0]}</p>
      <h2 class="name">${recipe.name}</h2>
      ${ratingTemplate(recipe.rating)}
      <p>${recipe.description}</p>
    </div>
  `;
}

function ratingTemplate(rating) {
  let html = `<span
    class="rating"
    role="img"
    aria-label="Rating: ${rating} out of 5 stars"
  >`;

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
    } else {
      html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    }
  }

  html += `</span>`;
  return html;
}

function renderRecipes(recipeList) {
  const outputEl = document.querySelector("main");
  if (recipeList.length === 0) {
    outputEl.innerHTML = `<p>No recipes found.</p>`;
  } else {
    outputEl.innerHTML = recipeTemplate(recipeList[0]);
  }
}

function filterRecipes(query) {
  const filtered = recipes.filter(recipe => {
    const inName = recipe.name.toLowerCase().includes(query);
    const inDescription = recipe.description.toLowerCase().includes(query);
    const inTags = recipe.tags.find(tag => tag.toLowerCase().includes(query));
    const inIngredients = false; // No ingredients field yet
    return inName || inDescription || inTags || inIngredients;
  });

  const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));
  return sorted;
}

function filter(query) {
  const filtered = recipes.filter(recipe => {
    const inName = recipe.name.toLowerCase().includes(query);
    const inDescription = recipe.description.toLowerCase().includes(query);
    const inTags = recipe.tags.find(tag => tag.toLowerCase().includes(query));
    const inIngredients = false;
    return inName || inDescription || inTags || inIngredients;
  });

  const sorted = filtered.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return sorted;
}

function searchHandler(e) {
  e.preventDefault();
  const queryInput = document.querySelector("input[name='query']");
  const query = queryInput.value.toLowerCase();
  const filteredList = filterRecipes(query);
  renderRecipes(filteredList);
}

const searchForm = document.querySelector("form");
searchForm.addEventListener("submit", searchHandler);

function init() {
  const recipe = getRandomListEntry(recipes);
  renderRecipes([recipe]);
}


// Run init on load
init();