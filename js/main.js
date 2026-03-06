import menuData from "./data.js";

const menuContainer = document.getElementById("menu-container");
const categoryTitle = document.getElementById("current-category");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderMenu(filter = "todos") {
    menuContainer.innerHTML = "";

    let filteredData = filter === "todos"
        ? menuData
        : menuData.filter((item) => item.categoria === filter);

    // Priorizar promociones en la vista "TODOS"
    if (filter === "todos") {
        filteredData = [
            ...filteredData.filter(item => item.categoria === 'promos'),
            ...filteredData.filter(item => item.categoria !== 'promos')
        ];
    }

    filteredData.forEach((item) => {
        const isPromo = item.categoria === 'promos';
        const productHTML = `
            <div class="flex items-center gap-4 group animate-in fade-in duration-500 ${isPromo ? 'bg-accent/5 p-2 rounded-2xl border border-accent/20' : ''}">
                <div class="w-24 h-20 flex-shrink-0 relative">
                    <img src="assets/img/productos/${item.id}.jpg" 
                         alt="${item.nombre}"
                         class="w-full h-full object-cover img-oval border-2 ${isPromo ? 'border-accent shadow-[0_0_10px_rgba(255,195,0,0.3)]' : 'border-zinc-800'} group-hover:border-primary transition-all duration-300"
                         onerror="this.src='https://placehold.co/200x150/1a1a1a/D90429?text=${isPromo ? 'PROMO' : 'Gordito'}'">
                </div>

                <div class="flex-grow border-b border-zinc-800/50 pb-3">
                    <div class="flex justify-between items-start gap-2">
                        <h3 class="font-display text-xl ${isPromo ? 'text-accent' : 'text-white'} uppercase leading-tight tracking-tight">
                            <span class="text-primary mr-1">${isPromo ? '★' : '•'}</span>${item.nombre}
                        </h3>
                    </div>
                    <p class="text-[10px] font-bold ${isPromo ? 'text-gray-300' : 'text-gray-500'} uppercase mt-1 tracking-tighter leading-none italic">
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

    if (categoryTitle) {
        categoryTitle.innerHTML =
            selectedCategory === "todos"
                ? 'Nuestro <span class="text-primary">Menú</span>'
                : `Sección <span class="text-primary">${selectedCategory}</span>`;
    }

    renderMenu(selectedCategory);
}

// Funciones del Modal vinculadas al objeto window para que el HTML las encuentre
window.closePromoModal = () => {
    const modal = document.getElementById('promo-modal');
    if (modal) modal.classList.add('hidden');
};

window.scrollToPromos = () => {
    window.closePromoModal();
    const promoBtn = document.querySelector('[data-category="promos"]');
    if (promoBtn) promoBtn.click();
};

// Único bloque de inicialización
document.addEventListener("DOMContentLoaded", () => {
    renderMenu();

    // Asignar eventos de clic a los botones
    filterButtons.forEach((button) => {
        button.addEventListener("click", handleFilterClick);
    });

    // Mostrar modal con retraso
    setTimeout(() => {
        const modal = document.getElementById('promo-modal');
        if (modal) modal.classList.remove('hidden');
    }, 1000);
});