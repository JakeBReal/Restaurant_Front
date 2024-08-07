document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.querySelector('a[href="#home"]');
    const sections = document.querySelectorAll('.section');
    const homeTitle = document.querySelector('.content h1');

    homeLink.addEventListener('click', (event) => {
        event.preventDefault();

        // Ocultar todas las secciones
        sections.forEach(section => {
            section.style.display = 'none';
        });

        // Mostrar mensaje de bienvenida
        homeTitle.style.display = 'block';
    });
});

// document.addEventListener('DOMContentLoaded', async () => {
//     await loadMenu();
// });

// const loadMenu = async () => {
//     try {
//         const menuContainer = document.getElementById('menu-container');

//         const response = await fetch('http://localhost:3000/menutype');
//         if (!response.ok) throw new Error('Network response was not ok');
//         const menuItems = await response.json();

//         // Group menu items by type
//         const sections = menuItems.reduce((acc, item) => {
//             if (!acc[item.tipo]) acc[item.tipo] = [];
//             acc[item.tipo].push(item);
//             return acc;
//         }, {});

//         // Create and add sections to the container
//         for (const [category, items] of Object.entries(sections)) {
//             const sectionDiv = document.createElement('div');
//             sectionDiv.className = 'menu-section';

//             const sectionTitle = document.createElement('h2');
//             sectionTitle.textContent = category;
//             sectionDiv.appendChild(sectionTitle);

//             items.forEach(item => {
//                 const itemDiv = document.createElement('div');
//                 itemDiv.className = 'menu-item';

//                 const img = document.createElement('img');
//                 img.src = item.imagen;
//                 img.alt = item.nombre;

//                 const name = document.createElement('h3');
//                 name.textContent = item.nombre;

//                 const price = document.createElement('p');
//                 price.textContent = `$${item.precio}`;

//                 const statusSpan = document.createElement('span');
//                 statusSpan.className = 'menu-status';
//                 statusSpan.textContent = item.disponibilidad ? 'Disponible' : 'No Disponible';
//                 statusSpan.style.backgroundColor = item.disponibilidad ? 'green' : 'red';

//                 itemDiv.appendChild(img);
//                 itemDiv.appendChild(name);
//                 itemDiv.appendChild(price);
//                 itemDiv.appendChild(statusSpan);
//                 sectionDiv.appendChild(itemDiv);
//             });
//             menuContainer.appendChild(sectionDiv);
//         }
//     } catch (error) {
//         console.error('Error fetching menu data:', error);
//     }
// };

