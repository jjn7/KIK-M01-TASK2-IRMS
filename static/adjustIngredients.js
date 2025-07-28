function adjustIngredients(baseQuantity, baseServings, newServings) {
  return (baseQuantity / baseServings) * newServings;
}

document.addEventListener("DOMContentLoaded", function () {
  const interval = setInterval(() => {
    const recipe = document.querySelector(".recipe-page");
    const baseServings = parseInt(recipe?.getAttribute("data-base-servings"));
    const servingsDisplay = document.getElementById("servingsDisplay");
    const decreaseBtn = document.getElementById("decreaseServings");
    const increaseBtn = document.getElementById("increaseServings");
    const qtyEls = document.querySelectorAll(".qty");

    // Exit if still not ready
    if (!recipe || isNaN(baseServings) || !servingsDisplay || !decreaseBtn || !increaseBtn || qtyEls.length === 0) {
      return;
    }

    clearInterval(interval); // All ready, stop checking

    let currentServings = baseServings;
    servingsDisplay.textContent = currentServings;

    function updateIngredients() {
      qtyEls.forEach(qtyEl => {
        const baseQty = parseFloat(qtyEl.getAttribute("data-base"));
        if (isNaN(baseQty)) return;
        const newQty = adjustIngredients(baseQty, baseServings, currentServings);
        qtyEl.textContent = newQty % 1 === 0 ? newQty : newQty.toFixed(2);
      });
    }

    decreaseBtn.addEventListener("click", () => {
      if (currentServings > 1) {
        currentServings--;
        servingsDisplay.textContent = currentServings;
        updateIngredients();
      }
    });

    increaseBtn.addEventListener("click", () => {
      currentServings++;
      servingsDisplay.textContent = currentServings;
      updateIngredients();
    });

    updateIngredients();
  }, 100);
});
