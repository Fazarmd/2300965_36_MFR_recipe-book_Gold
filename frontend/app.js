const contentWrapper = document.querySelector("#recipe-list");
const intializeApps = async () => {
  const resp = await fetch("http://localhost:9000/api/v1/cook-book/recipes");
  const jsonResp = await resp.json();
  const recipe = jsonResp.data.recipe;

  contentWrapper.innerHTML = "";
  recipe.forEach((element) => {
    const recipeInfo = generatorHtml(element.id, element.title, element.ingredients, element.instruction, element.caption);

    contentWrapper.innerHTML += recipeInfo;
  });
};

const handleSend = async () => {
  const formTitleEl = document.getElementById("titleInput");
  const formIngredientsEl = document.getElementById("ingredientsInput");
  const formInstructionEl = document.getElementById("instructionInput");
  const formCaptionEl = document.getElementById("captionInput");
  //ubah string jadi int
  const categorySelectEl = document.getElementById("categorySelect");
  const selectedCategoryAsString = categorySelectEl.value;
  const selectedCategory = parseInt(selectedCategoryAsString, 10);

  const reqBody = {
    title: formTitleEl.value,
    ingredients: formIngredientsEl.value,
    instruction: formInstructionEl.value,
    caption: formCaptionEl.value,
    category_id: selectedCategory,
  };

  const body = JSON.stringify(reqBody);

  var headers = new Headers();
  headers.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers,
    body,
  };

  const resp = await fetch("http://localhost:9000/api/v1/cook-book/add", requestOptions);
  const respJson = await resp.json();

  console.log(respJson.data);
  const contentWrapper = document.querySelector("#recipe-list");

  const newRecipe = respJson.data[0];
  contentWrapper.innerHTML += generatorHtml(newRecipe.id, newRecipe.title, newRecipe.ingredients, newRecipe.instruction, newRecipe.caption);

  var addModal = new bootstrap.Modal(document.getElementById("recipeForm"), {
    keyboard: false,
  });

  addModal.hide();
};

const generatorHtml = (id, title, ingredients, instruction, caption) => `
<div class="col-md-4 mb-3">
  <div class="card">
    <img src="img/recipe/${title}.jpg" class="card-img-top recipe-image" alt=${title} />
    <div class="card-body">
      <h5 class="card-title"><a href="link_ke_halaman_tertentu">${title}</a></h5>
      <p class="card-text">${caption}</p>
      <div class="modal-footer" data-toggle="modal" data-target="#editRecipeForm">
        <button class="btn btn-primary" data-id="${id}" data-toggle="modal" data-target="#editRecipeModal">View & Edit</button>
        <button class="btn btn-danger ms-2" data-id="${id}">Delete</button>
      </div>
    </div>
  </div>
</div>`;
