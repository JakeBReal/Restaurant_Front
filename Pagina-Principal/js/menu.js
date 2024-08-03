document.addEventListener('DOMContentLoaded', async () => {
    await loadMenu();
});

const  loadMenu=async ()=> {


    try {
        const menuContainer = document.getElementById('menu-container');

        // Ejemplo de datos del menú
       
        const response = await fetch('http://localhost:3000/menu');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

       menuItems = data
    // Cargar los elementos del menú
    menuItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'menu-item';

        const img = document.createElement('img');
        img.src = item.imagen
        img.alt = item.nombre;

        const name = document.createElement('h3');
        name.textContent = item.nombre;

        const price = document.createElement('p');
        price.textContent = `$${item.precio}`;

        const statusSpan = document.createElement('span');
        statusSpan.className = 'menu-status';
        statusSpan.textContent = item.disponibilidad ? 'Disponible' : 'No Disponible';
        statusSpan.style.backgroundColor = item.disponibilidad ? 'green' : 'red';

        itemDiv.appendChild(img);
        itemDiv.appendChild(name);
        itemDiv.appendChild(price);
        itemDiv.appendChild(statusSpan);
        menuContainer.appendChild(itemDiv);
    });
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}
