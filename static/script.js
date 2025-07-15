document.addEventListener("DOMContentLoaded", () => {

  // Filter toggle (only on recipes.html)
  const toggleFiltersBtn = document.querySelector('.toggle-filters');
  if (toggleFiltersBtn) {
    toggleFiltersBtn.addEventListener('click', function () {
      const filters = document.querySelector('.filters');
      const isVisible = filters.style.display === 'block';
      filters.style.display = isVisible ? 'none' : 'block';
      this.textContent = isVisible ? 'Show Filters' : 'Hide Filters';
    });
  }

  // Escape key closes modals and menus
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
      closeMobileMenu();
    }
  });
});

// Login modal
function openModal() {
  const modal = document.getElementById("loginModal");
  if (modal) modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("loginModal");
  if (modal) modal.style.display = "none";
}

// Mobile menu
function openMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu) mobileMenu.style.display = "block";
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu) mobileMenu.style.display = "none";
}

async function syncLocalRecipes() {
  const recipes = JSON.parse(localStorage.getItem("recipes") || "[]");

  if (!recipes.length) {
    alert("No local recipes found.");
    return;
  }

  for (const recipe of recipes) {
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: recipe.title,
          instructions: recipe.steps.join("\n"),
          ingredients: JSON.stringify(recipe.ingredients),
          cooking_time: recipe.cookingTime,
          image: recipe.image || "",
          created_at: recipe.createdAt || new Date().toISOString()
        })
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Failed to sync:", error);
      }
    } catch (err) {
      console.error("Sync error:", err);
    }
  }

  alert("All recipes synced to server!");
}