document.addEventListener('DOMContentLoaded', async () => {
    loadOccupiedTables();
    loadMenuOptions();
    loadClients();

    const form = document.getElementById('add-food-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita la recarga de la página
        addFoodToTable();
        form.reset();
        loadClients(); // Refresca la lista de clientes
        // Mantener la pestaña activa
        document.querySelector('.navbar ul li a[href="#clients"]').click();
    });
});

// Cargar mesas ocupadas (datos estáticos)
const loadOccupiedTables = () => {
    const tables = [
        { id_mesa: 1, nombre_cliente: 'Cliente A', estado: 'no disponible' },
        { id_mesa: 2, nombre_cliente: 'Cliente B', estado: 'no disponible' }
    ];

    const occupiedTablesSelect = document.getElementById('occupied-tables');
    occupiedTablesSelect.innerHTML = '';

    tables.forEach(table => {
        const option = document.createElement('option');
        option.value = table.id_mesa;
        option.textContent = `Mesa ${table.id_mesa} - ${table.nombre_cliente}`;
        occupiedTablesSelect.appendChild(option);
    });
};

// Cargar opciones del menú (datos estáticos)
const loadMenuOptions = () => {
    console.log('loadMenuOptions called'); // Verifica si la función se está ejecutando

    const menuItems = [
        { id_menu: 1, nombre: 'Pizza', precio: 10.00 },
        { id_menu: 2, nombre: 'Hamburguesa', precio: 8.00 },
        { id_menu: 3, nombre: 'Ensalada', precio: 5.00 },
        { id_menu: 4, nombre: 'Refresco', precio: 2.00 }
    ];

    const menuSelection = document.getElementById('menu-selection');
    if (!menuSelection) {
        console.error('El contenedor #menu-selection no se encuentra');
        return;
    }

    menuSelection.innerHTML = ''; // Limpia el contenedor antes de agregar nuevos checkboxes

    menuItems.forEach(item => {
        // Crear el contenedor del checkbox
        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'menu-item';

        // Crear el checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `menu-item-${item.id_menu}`;
        checkbox.value = item.id_menu;

        // Crear la etiqueta para el checkbox
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;

        // Agregar el checkbox y la etiqueta al contenedor
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);

        // Agregar el contenedor al contenedor principal
        menuSelection.appendChild(checkboxContainer);
    });
};

// Cargar clientes (datos estáticos)
const loadClients = () => {
    const clients = [
        { nombre: 'Cliente A', numero_mesa: 1, descripcion: 'Sin comentarios', orden: [
            { nombre: 'Pizza', precio: 10.00 }
        ] },
        { nombre: 'Cliente B', numero_mesa: 2, descripcion: 'Pedido especial', orden: [
            { nombre: 'Hamburguesa', precio: 8.00 },
            { nombre: 'Refresco', precio: 2.00 }
        ] }
    ];

    const clientList = document.getElementById('client-container');
    clientList.innerHTML = '';

    clients.forEach(client => {
        const clientDiv = document.createElement('div');
        clientDiv.className = 'client-item';

        const name = document.createElement('h3');
        name.textContent = `Cliente: ${client.nombre}`;

        const tableNumber = document.createElement('p');
        tableNumber.textContent = `Número de Mesa: ${client.numero_mesa}`;

        const description = document.createElement('p');
        description.textContent = `Descripción: ${client.descripcion ? client.descripcion : 'N/A'}`;

        const orderList = document.createElement('ul');
        orderList.textContent = 'Orden:';
        client.orden.forEach(orderItem => {
            const listItem = document.createElement('li');
            listItem.textContent = `${orderItem.nombre} - $${orderItem.precio.toFixed(2)}`;
            orderList.appendChild(listItem);
        });

        clientDiv.appendChild(name);
        clientDiv.appendChild(tableNumber);
        clientDiv.appendChild(description);
        clientDiv.appendChild(orderList);
        clientList.appendChild(clientDiv);
    });
};

// Agregar alimentos a la mesa
const addFoodToTable = () => {
    const tableNumber = document.getElementById('occupied-tables').value;
    const selectedMenuItems = Array.from(document.querySelectorAll('#menu-selection input:checked')).map(checkbox => checkbox.value);
    const note = document.getElementById('client-note').value;

    if (selectedMenuItems.length === 0) {
        console.error('No menu items selected');
        return;
    }

    console.log('Food added to table', { id_mesa: tableNumber, orden: selectedMenuItems, nota: note });
};
