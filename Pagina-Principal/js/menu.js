document.addEventListener('DOMContentLoaded', async () => {
    await loadMenu();
});

const loadMenu = async () => {
    try {
        const menuContainer = document.getElementById('menu-container');

        const response = await fetch('http://localhost:3000/mesatype');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const menuItems = await response.json();
            // Crear un objeto para agrupar los elementos del menú por clasificación
        const sections = menuItems


        // Crear y agregar las secciones al contenedor
        for (const [category, items] of Object.entries(sections)) {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'menu-section';

            const sectionTitle = document.createElement('h2');
            sectionTitle.textContent = category;
            sectionDiv.appendChild(sectionTitle);

            items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'menu-item';

                const img = document.createElement('img');
                img.src = item.imagen;
                img.alt = item.nombre;

                const name = document.createElement('h3');
                name.textContent = item.nombre;

                const price = document.createElement('p');
                price.textContent = `$${item.precio}`; // Ajustar según la moneda si es necesario

                const statusSpan = document.createElement('span');
                statusSpan.className = 'menu-status';
                statusSpan.textContent = item.disponibilidad ? 'Disponible' : 'No Disponible';
                statusSpan.style.backgroundColor = item.disponibilidad ? 'green' : 'red';

                itemDiv.appendChild(img);
                itemDiv.appendChild(name);
                itemDiv.appendChild(price);
                itemDiv.appendChild(statusSpan);
                sectionDiv.appendChild(itemDiv);
            });
            menuContainer.appendChild(sectionDiv);
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
