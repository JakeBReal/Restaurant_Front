document.addEventListener('DOMContentLoaded', () => {
    loadMenu();
});

function loadMenu() {
    const menuContainer = document.getElementById('menu-container');

    // Ejemplo de datos del menú
    const menuItems = [
        { id: 1, name: 'Hamburguesa Clásica', price: 8.99, availability: 'available', imageUrl: 'https://via.placeholder.com/250x150.png?text=Hamburguesa' },
        { id: 2, name: 'Pizza Margarita', price: 12.99, availability: 'unavailable', imageUrl: 'https://via.placeholder.com/250x150.png?text=Pizza' },
        { id: 3, name: 'Ensalada César', price: 7.99, availability: 'available', imageUrl: 'https://via.placeholder.com/250x150.png?text=Ensalada' },
        { id: 4, name: 'Pasta Alfredo', price: 11.99, availability: 'available', imageUrl: 'https://via.placeholder.com/250x150.png?text=Pasta' },
        // Más items del menú aquí
    ];

    // Cargar los elementos del menú
    menuItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'menu-item';

        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.name;

        const name = document.createElement('h3');
        name.textContent = item.name;

        const price = document.createElement('p');
        price.textContent = `$${item.price.toFixed(2)}`;

        const statusSpan = document.createElement('span');
        statusSpan.className = 'menu-status';
        statusSpan.textContent = item.availability === 'available' ? 'Disponible' : 'No Disponible';
        statusSpan.style.backgroundColor = item.availability === 'available' ? 'green' : 'red';

        itemDiv.appendChild(img);
        itemDiv.appendChild(name);
        itemDiv.appendChild(price);
        itemDiv.appendChild(statusSpan);
        menuContainer.appendChild(itemDiv);
    });
}
