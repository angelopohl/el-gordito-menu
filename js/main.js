import menuData from "./data.js";

// Referencias al DOM
const menuContainer = document.getElementById("menu-container");
const categoryTitle = document.getElementById("current-category");
const filterButtons = document.querySelectorAll(".filter-btn");

/**
 * Renderiza los platos en el contenedor principal
 * @param {string} filter - Categoría a filtrar
 */
function renderMenu(filter = "todos") {
  // 1. Limpiar el contenedor antes de renderizar
  menuContainer.innerHTML = "";

  // 2. Filtrar los datos según la categoría
  const filteredData =
    filter === "todos"
      ? menuData
      : menuData.filter((item) => item.categoria === filter);

  // 3. Generar el HTML para cada plato de la lista
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
                        <span class="font-bold text-accent text-lg whitespace-nowrap">S/${item.precio}</span>
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

/**
 * Maneja el cambio de estado visual de los botones y filtra
 */
// Dentro de tu función handleFilterClick en main.js
function handleFilterClick(event) {
  const selectedCategory = event.currentTarget.getAttribute("data-category");

  // Cambiar estilos visuales
  filterButtons.forEach((btn) => {
    btn.classList.remove("bg-primary", "text-white");
    btn.classList.add("bg-zinc-800", "text-gray-400");
  });

  event.currentTarget.classList.add("bg-primary", "text-white");
  event.currentTarget.classList.remove("bg-zinc-800", "text-gray-400");

  // Renderizar (Esto buscará "hamburguesas" en tu data.js automáticamente)
  renderMenu(selectedCategory);
}

// --- INICIALIZACIÓN ---

// Asignar eventos a los botones de filtro
filterButtons.forEach((button) => {
  button.addEventListener("click", handleFilterClick);
});

// Renderizado inicial (Muestra todo al cargar)
document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
});
