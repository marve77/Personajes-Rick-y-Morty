document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cards-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const filtersForm = document.getElementById('filters-form');
    const filterName = document.getElementById('filter-name');
    const filterStatus = document.getElementById('filter-status');
    const filterGender = document.getElementById('filter-gender');
    let currentPage = 1;
    let totalPages = 1;
    let lastFilters = { name: '', status: '', gender: '' };

    async function cargarPersonajes(page = 1, filters = {}) {
        try {
            container.innerHTML = '<p class="text-gray-500">Cargando...</p>';
            let url = `https://rickandmortyapi.com/api/character?page=${page}`;
            if (filters.name) url += `&name=${encodeURIComponent(filters.name)}`;
            if (filters.status) url += `&status=${encodeURIComponent(filters.status)}`;
            if (filters.gender) url += `&gender=${encodeURIComponent(filters.gender)}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('No se pudo cargar la página');
            const data = await response.json();
            totalPages = data.info.pages;
            container.innerHTML = '';
            data.results.forEach(personaje => {
                const card = document.createElement('div');
                card.className = 'bg-white rounded-lg shadow-md p-4 flex flex-col items-center max-w-xs m-4';
                card.innerHTML = `
                    <img src="${personaje.image}" alt="${personaje.name}" class="w-32 h-32 rounded-full mb-4 object-cover">
                    <h2 class="text-xl font-bold mb-2">${personaje.name}</h2>
                    <p class="text-gray-700 mb-1">Status: <span class="font-semibold">${personaje.status}</span></p>
                    <p class="text-gray-700 mb-1">Species: <span class="font-semibold">${personaje.species}</span></p>
                    <p class="text-gray-700">Origin: <span class="font-semibold">${personaje.origin.name}</span></p>
                `;
                container.appendChild(card);
            });
            prevBtn.disabled = page <= 1;
            nextBtn.disabled = page >= totalPages;
        } catch (error) {
            container.innerHTML = '<p class="text-red-500">No se encontraron personajes con esos filtros.</p>';
            prevBtn.disabled = true;
            nextBtn.disabled = true;
        }
    }


    filterName.addEventListener('focus', () => {
        filterStatus.selectedIndex = 0;
        filterGender.selectedIndex = 0;
    });

    filtersForm.addEventListener('submit', (e) => {
        e.preventDefault();
        currentPage = 1;
        lastFilters = {
            name: filterName.value.trim(),
            status: filterStatus.value,
            gender: filterGender.value
        };
        cargarPersonajes(currentPage, lastFilters);
    });

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            cargarPersonajes(currentPage, lastFilters);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            cargarPersonajes(currentPage, lastFilters);
        }
    });

    cargarPersonajes(currentPage, lastFilters);
});
