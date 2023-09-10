const contentWrapper = document.querySelector("#recipe-list");
const intializeApps = async () => {
  const resp = await fetch("http://localhost:7000/api/v1/cook-book/recipes");
  const jsonResp = await resp.json();
  const recipe = jsonResp.data.recipe;

  contentWrapper.innerHTML = "";
  recipe.forEach((element) => {
    const recipeInfo = generatorHtml(element.id, element.title, element.ingredients, element.instruction, element.caption);

    contentWrapper.innerHTML += recipeInfo;
  });

  //event listener untuk tombol "Delete"
  const deleteButtons = document.querySelectorAll(".btn-danger");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", handleDelete);
  });

  //event listener untuk tombol "Edit"
  const editButtons = document.querySelectorAll(".btn-primary");
  editButtons.forEach((button) => {
    button.addEventListener("click", handleEdit);
  });

  //event listener untuk tombol "Save Changes"
  const saveEditButton = document.getElementById("saveEditButton");
  saveEditButton.addEventListener("click", handleSaveEdit);
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

  const resp = await fetch("http://localhost:7000/api/v1/cook-book/add", requestOptions);
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

const handleDelete = async (event) => {
  const recipeId = event.target.getAttribute("data-id");
  const confirmDelete = confirm("Apakah Anda yakin ingin menghapus resep ini?");

  if (confirmDelete) {
    try {
      const resp = await fetch(`http://localhost:7000/api/v1/cook-book/delete/${recipeId}`, {
        method: "DELETE",
      });

      if (resp.status === 200) {
        // Hapus tampilan resep dari halaman
        event.target.closest(".col-md-4").remove();
        alert("Resep berhasil dihapus.");
      } else {
        alert("Gagal menghapus resep. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi nanti.");
    }
  }
};

const handleEdit = async (event) => {
  const recipeId = event.target.getAttribute("data-id");

  try {
    // Kirim permintaan GET ke endpoint API untuk mengambil data resep yang akan diedit
    const resp = await fetch(`http://localhost:7000/api/v1/cook-book/recipes/${recipeId}`);
    if (resp.status === 200) {
      const data = await resp.json();

      // Mengisi data resep ke dalam form edit
      const formTitleEl = document.getElementById("editTitleInput");
      const formIngredientsEl = document.getElementById("editIngredientsInput");
      const formInstructionEl = document.getElementById("editInstructionInput");
      const formCaptionEl = document.getElementById("editCaptionInput");

      // Mengatur nilai-nilai form berdasarkan data yang diterima dari respons API
      const recipeData = data.data[0]; // Mengambil data pertama dari array
      formTitleEl.value = recipeData.title;
      formIngredientsEl.value = recipeData.ingredients;
      formInstructionEl.value = recipeData.instruction;
      formCaptionEl.value = recipeData.caption;

      // Setel nilai ID resep ke dalam atribut data-id pada tombol "Save Changes"
      document.getElementById("saveEditButton").setAttribute("data-id", recipeId);

      // Tampilkan modal edit
      var editModal = new bootstrap.Modal(document.getElementById("editRecipeForm"));
      editModal.show();
    } else {
      alert("Gagal mengambil data resep. Silakan coba lagi.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan. Silakan coba lagi nanti.");
  }
};

const handleSaveEdit = async () => {
  const formTitleEl = document.getElementById("editTitleInput");
  const formIngredientsEl = document.getElementById("editIngredientsInput");
  const formInstructionEl = document.getElementById("editInstructionInput");
  const formCaptionEl = document.getElementById("editCaptionInput");

  const title = formTitleEl.value;
  const ingredients = formIngredientsEl.value;
  const instruction = formInstructionEl.value;
  const caption = formCaptionEl.value;

  const reqBody = {
    title,
    ingredients,
    instruction,
    caption,
  };

  const body = JSON.stringify(reqBody);

  var headers = new Headers();
  headers.append("Content-Type", "application/json");

  const requestOptions = {
    method: "PUT",
    headers,
    body,
  };

  try {
    const recipeId = document.getElementById("saveEditButton").getAttribute("data-id");
    const resp = await fetch(`http://localhost:7000/api/v1/cook-book/edit/${recipeId}`, requestOptions);
    if (resp.status === 200) {
      // notif berhasil
      alert("Resep berhasil diperbarui.");
      setTimeout(() => {
        intializeApps();
      }, 1000);
      location.reload();
    } else {
      // notif gagal
      alert("Gagal menyimpan perubahan resep. Silakan coba lagi.");
    }
  } catch (error) {
    console.error("Error:", error);
    // notif gagal simpan
    alert("Terjadi kesalahan saat menyimpan perubahan resep. Silakan coba lagi nanti.");
  }
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
