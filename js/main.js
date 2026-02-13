import menuData from "./data.js";

const menuContainer = document.getElementById("menu-container");
const categoryTitle = document.getElementById("current-category");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderMenu(filter = "todos") {
  menuContainer.innerHTML = "";

  const filteredData =
    filter === "todos"
      ? menuData
      : menuData.filter((item) => item.categoria === filter);

  filteredData.forEach((item) => {
    const productHTML = `
            <div class="flex items-center gap-4 group animate-in fade-in duration-500">
                <div class="w-24 h-20 flex-shrink-0 relative">
                    <img src="assets/img/productos/${item.id}.jpg" 
                         alt="${item.nombre}"
                         class="w-full h-full object-cover img-oval border-2 border-zinc-800 group-hover:border-primary transition-all duration-300"
                         onerror="this.src='https://placehold.co/200x150/1a1a1a/D90429?text=Gordito'">
                </div>

                <div class="flex-grow border-b border-zinc-800/50 pb-3">
                    <div class="flex justify-between items-start gap-2">
                        <h3 class="font-display text-xl text-white uppercase leading-tight tracking-tight">
                            <span class="text-primary mr-1">•</span>${item.nombre}
                        </h3>
                        </div>
                    <p class="text-[10px] font-bold text-gray-500 uppercase mt-1 tracking-tighter leading-none italic">
                        ${item.descripcion}
                    </p>
                </div>
            </div>
        `;
    menuContainer.insertAdjacentHTML("beforeend", productHTML);
  });
}

function handleFilterClick(event) {
  const selectedCategory = event.currentTarget.getAttribute("data-category");

  filterButtons.forEach((btn) => {
    btn.classList.remove("bg-primary", "text-white");
    btn.classList.add("bg-zinc-800", "text-gray-400");
  });

  event.currentTarget.classList.add("bg-primary", "text-white");
  event.currentTarget.classList.remove("bg-zinc-800", "text-gray-400");

  // Actualizar título de sección (Opcional)
  if (categoryTitle) {
    categoryTitle.innerHTML =
      selectedCategory === "todos"
        ? 'Nuestro <span class="text-primary">Menú</span>'
        : `Sección <span class="text-primary">${selectedCategory}</span>`;
  }

  renderMenu(selectedCategory);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", handleFilterClick);
});

document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
});
