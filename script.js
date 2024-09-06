recipes = []

const render = () => {
    let content = document.querySelector('#content');
    content.innerHTML = '';
    content.innerHTML += /*html*/ `
        <div class="header">
            <h1>Recipe Keeper</h1>
        </div>
    `;

    content.innerHTML += /*html*/ `
        <div class="recipe-container">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Recipe Name:</h5>
                    <input type="text" id="recipeName" class="form-control">
                    <h5 class="card-title mt-3">Ingredients:</h5>
                    <textarea type="text" id="ingredients" class="form-control"></textarea>
                    <h5 class="card-title mt-3">Steps for preperation:</h5>
                    <textarea type="text" id="steps" class="form-control"></textarea>
                    <h5 class="card-title mt-3">Image url:</h5>
                    <input type="url" id="url" class="form-control">
                    <button href="#" class="btn btn-primary mt-3" onclick="addRecipe()">Add Recipe</button>
                </div>
            </div>
        </div>
    `;

    content.innerHTML += /*html*/ `
        <div class="recipes-display" id="recipesDisplay" style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2rem;">
        </div>
`;
}

const addRecipe = () => {
    let recipeName = document.getElementById('recipeName').value;
    let ingredients = document.getElementById('ingredients').value;
    let steps = document.getElementById('steps').value;
    let imgUrl = document.getElementById('url').value;

    const validateRecipe = { recipeName, ingredients, steps, imgUrl }

    if (validateRecipe) {
        try {
            const newRecipe = {
                "recipeName": recipeName,
                "ingredients": ingredients,
                "steps": steps,
                "url": imgUrl,
            }
            recipes.push(newRecipe)
            save(recipes)
        } catch {
            alert('Please fill in all fields!');
        }

    }
}


const save = (recipes) => {
    let recipesAsText = JSON.stringify(recipes);
    localStorage.setItem('recipes', recipesAsText);
}

const loadRecipes = () => {
    let recipesAsText = localStorage.getItem('recipes');

    if (recipesAsText) {
        try {
            const loadedRecipes = JSON.parse(recipesAsText);
            recipes = loadedRecipes;
            renderLoadedRecipes(loadedRecipes);
        } catch {
            return [];
        }
    }
}

const renderLoadedRecipes = (recipes) => {
    let recipesDisplay = document.getElementById('recipesDisplay');
    recipesDisplay.innerHTML = '';

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];

        const recipeCard = /*html*/`
            <div class="card" style="width: 18rem;">
                <img src="${recipe.imgUrl}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${recipe.recipeName}</h5>
                    <p class="card-text"><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                    <p class="card-text"><strong>Steps:</strong> ${recipe.steps}</p>
                    <button class="btn btn-danger" onclick="removeRecipe(${i})">Remove recipe</button>
                </div>
            </div>
        `;
        recipesDisplay.innerHTML += recipeCard;
    }
};

const removeRecipe = (index) => {
    if (index) {
        try {
            recipes.splice(index, 1);
            save(recipes);
        }
        catch {
            alert("Error deleting recipe!")
        }
    }

    renderLoadedRecipes(recipes);
};


render();
loadRecipes()


