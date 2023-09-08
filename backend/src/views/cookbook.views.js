const express = require("express");
const router = express.Router();
const controller = require("../controllers/cookbook.controller");

// routing group
const prefixPath = "api/v1/cook-book";

// register router
router.get(`/${prefixPath}/recipes`, controller.getCookBookRecipes); //melihat semua resep
router.get(`/${prefixPath}/recipes/:id`, controller.getCookBookRecipesById); //melihat resep berdasarkan id
router.post(`/${prefixPath}/add`, controller.addCookBookRecipes); //menambah resep
router.put(`/${prefixPath}/edit/:id`, controller.editCookBookRecipesById); //mengedit resep
router.delete(`/${prefixPath}/delete/:id`, controller.deleteCookBookRecipesById); //menghapus resep

module.exports = router;
