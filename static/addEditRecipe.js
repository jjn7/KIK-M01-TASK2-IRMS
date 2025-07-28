// Add new ingredient row
function addIngredientRow(ingredient = {}) {
  const container = document.getElementById("ingredientsList");
  const div = document.createElement("div");
  div.className = "ingredient-row";

  div.innerHTML = `
    <input type="number" step="0.01" placeholder="Quantity" value="${ingredient.quantity || ""}" required>
    <select required>
      <option value="">Unit</option>
      <option value="g">grams</option>
      <option value="ml">ml</option>
      <option value="cup">cup</option>
      <option value="tbsp">tbsp</option>
      <option value="tsp">tsp</option>
      <option value="none">none</option>
    </select>
    <input type="text" placeholder="Ingredient name" value="${ingredient.name || ""}" required>
    <button type="button" onclick="removeIngredientRow(this)">✖</button>
  `;

  container.appendChild(div);
  if (ingredient.unit) div.querySelector("select").value = ingredient.unit;
}

function removeIngredientRow(button) {
  const row = button.closest(".ingredient-row");
  row?.remove();
}

// Preview uploaded image
document.getElementById("imageUpload").addEventListener("change", function () {
  const preview = document.getElementById("imagePreview");
  const file = this.files[0];
  if (file) {
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
  }
});

// Detect edit mode
let editingId = null;
document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const editId = params.get("edit");

  if (editId) {
    editingId = editId;

    try {
      const res = await fetch(`/api/recipes/${editId}`);
      if (!res.ok) throw new Error("Recipe not found");
      const recipe = await res.json();

      document.getElementById("title").value = recipe.title || "";
      document.getElementById("cookingTime").value = recipe.cookingTime || "";
      document.getElementById("steps").value = recipe.steps.join("\n") || "";
      document.getElementById("servings").value = recipe.servings || 1;

      const ingredientsList = document.getElementById("ingredientsList");
      ingredientsList.innerHTML = "";
      recipe.ingredients.forEach(ing => addIngredientRow(ing));

      if (recipe.image) {
        const preview = document.getElementById("imagePreview");
        preview.src = recipe.image;
        preview.style.display = "block";
      }
    } catch (err) {
      alert("Error loading recipe for editing.");
      console.error(err);
    }
  }
});

// Save form
async function validateRecipeForm(event) {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const cookingTime = parseInt(document.getElementById("cookingTime").value);
  const servings = parseInt(document.getElementById("servings").value) || 1;
  const steps = document.getElementById("steps").value.trim().split("\n").filter(Boolean);

  const ingredients = [];
  document.querySelectorAll(".ingredient-row").forEach(row => {
    const inputs = row.querySelectorAll("input, select");
    ingredients.push({
      quantity: parseFloat(inputs[0].value),
      unit: inputs[1].value,
      name: inputs[2].value
    });
  });

  const imageInput = document.getElementById("imageUpload");
  const imagePreview = document.getElementById("imagePreview");

  const recipeData = {
    title,
    cookingTime,
    servings,
    steps,
    ingredients,
    image: imagePreview?.src || null,
    createdAt: new Date().toISOString()
  };

  if (imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = async function (e) {
      recipeData.image = e.target.result;
      await submitRecipe(recipeData);
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    await submitRecipe(recipeData);
  }
}

async function submitRecipe(recipeData) {
  const method = editingId ? "PUT" : "POST";
  const url = editingId ? `/api/recipes/${editingId}` : "/api/recipes";

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipeData)
  });

  if (res.ok) {
    alert(editingId ? "Recipe updated!" : "Recipe added!");
    window.location.href = "recipes.html";
  } else {
    alert("Failed to save recipe.");
  }
}