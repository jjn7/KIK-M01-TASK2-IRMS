function adjustIngredients(baseQuantity, baseServings, newServings) {
  return (baseQuantity / baseServings) * newServings;
}

document.addEventListener("DOMContentLoaded", function() {
  const recipe = document.querySelector(".recipe-page");
  if (!recipe) return;

  const baseServings = parseInt(recipe.getAttribute("data-base-servings"));
  if (isNaN(baseServings)) {
    console.warn("Base servings missing on recipe page.");
    return;
  }

  let currentServings = baseServings;
  const servingsDisplay = document.getElementById("servingsDisplay");
  const decreaseBtn = document.getElementById("decreaseServings");
  const increaseBtn = document.getElementById("increaseServings");

  function updateIngredients() {
    document.querySelectorAll("#ingredients .qty").forEach(qtyEl => {
      const baseQty = parseFloat(qtyEl.getAttribute("data-base"));
      if (isNaN(baseQty)) return;
      const newQty = adjustIngredients(baseQty, baseServings, currentServings);
      qtyEl.textContent = newQty % 1 === 0 ? newQty : newQty.toFixed(2);
    });
  }

  decreaseBtn.addEventListener("click", function() {
    if (currentServings > 1) {
      currentServings--;
      servingsDisplay.textContent = currentServings;
      updateIngredients();
    }
  });

  increaseBtn.addEventListener("click", function() {
    currentServings++;
    servingsDisplay.textContent = currentServings;
    updateIngredients();
  });

  // Initial display update
  servingsDisplay.textContent = currentServings;
});