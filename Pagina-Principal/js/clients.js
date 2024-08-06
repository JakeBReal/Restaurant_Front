document.addEventListener('DOMContentLoaded', async () => {
    await loadOccupiedTables();
    await loadMenuOptions();
    await loadClients();

    const form = document.getElementById('add-food-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await addFoodToTable();
        form.reset();
        await loadClients(); // Refresca la lista de clientes
        // Mantener la pestaña activa
        document.querySelector('.navbar ul li a[href="#clientes"]').click();
    });
});

// Cargar mesas ocupadas
const loadOccupiedTables = async () => {
    try {
        const response = await fetch('http://localhost:3000/tables');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const tables = await response.json();

        // Filtra las mesas ocupadas
        const occupiedTables = tables.filter(table => table.estado === 'no disponible');
        const occupiedTablesSelect = document.getElementById('occupied-tables');

        // Limpia el select antes de agregar nuevas opciones
        occupiedTablesSelect.innerHTML = '';

        occupiedTables.forEach(table => {
            const option = document.createElement('option');
            option.value = table.id_mesa;
            option.textContent = `Mesa ${table.id_mesa} - ${table.nombre_cliente}`;
            occupiedTablesSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching tables:', error);
    }
};

// Cargar opciones del menú
const loadMenuOptions = async () => {
    try {
        const response = await fetch('http://localhost:3000/menu');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const menuItems = await response.json();
        const menuSelection = document.getElementById('menu-selection');

        // Limpia el select antes de agregar nuevas opciones
        menuSelection.innerHTML = '';

        menuItems.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id_menu;
            option.textContent = `${item.nombre} - $${item.precio}`;
            menuSelection.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching menu items:', error);
    }
};

// Cargar clientes
const loadClients = async () => {
    try {
        const response = await fetch('http://localhost:3000/clientes');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const clients = await response.json();
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
                listItem.textContent = `${orderItem.nombre} - $${orderItem.precio}`;
                orderList.appendChild(listItem);
            });

            clientDiv.appendChild(name);
            clientDiv.appendChild(tableNumber);
            clientDiv.appendChild(description);
            clientDiv.appendChild(orderList);
            clientList.appendChild(clientDiv);
        });
    } catch (error) {
        console.error('Error fetching clients:', error);
    }
};

// Agregar alimentos a la mesa
const addFoodToTable = async () => {
    const tableNumber = document.getElementById('occupied-tables').value;
    const selectedMenuItems = Array.from(document.getElementById('menu-selection').selectedOptions).map(option => option.value);
    const note = document.getElementById('client-note').value;

    if (selectedMenuItems.length === 0) {
        console.error('No menu items selected');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/ordenes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_mesa: tableNumber, orden: selectedMenuItems, nota: note })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Food added successfully');
    } catch (error) {
        console.error('Error adding food to table:', error);
    }
};


// document.addEventListener('DOMContentLoaded', async () => {
//     await loadOccupiedTables();
//     await loadMenuOptions();
//     await loadClients();

//     const form = document.getElementById('add-food-form');
//     form.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         await addFoodToTable();
//         form.reset();
//         await loadClients(); // Refresh the client list
//         document.querySelector('.navbar ul li a[href="#clientes"]').click(); // Keep the tab active
//     });
// });

// const loadOccupiedTables = async () => {
//     try {
//         const response = await fetch('http://localhost:3000/mesas');
//         if (!response.ok) throw new Error('Network response was not ok');
//         const tables = await response.json();
//         const occupiedTables = tables.filter(table => !table.estado);

//         const occupiedTablesSelect = document.getElementById('occupied-tables');
//         occupiedTablesSelect.innerHTML = '';

//         occupiedTables.forEach(table => {
//             const option = document.createElement('option');
//             option.value = table.id_mesa;
//             option.textContent = `Mesa ${table.id_mesa} - ${table.nombre_cliente}`;
//             occupiedTablesSelect.appendChild(option);
//         });
//     } catch (error) {
//         console.error('Error fetching tables:', error);
//     }
// };

// const loadMenuOptions = async () => {
//     try {
//         const response = await fetch('http://localhost:3000/menu');
//         if (!response.ok) throw new Error('Network response was not ok');
//         const menuItems = await response.json();
//         const menuSelection = document.getElementById('menu-selection');
//         menuSelection.innerHTML = '';

//         menuItems.forEach(item => {
//             const option = document.createElement('option');
//             option.value = item.id_menu;
//             option.textContent = `${item.nombre} - $${item.precio}`;
//             menuSelection.appendChild(option);
//         });
//     } catch (error) {
//         console.error('Error fetching menu items:', error);
//     }
// };

// const loadClients = async () => {
//     try {
//         const response = await fetch('http://localhost:3000/clientes');
//         if (!response.ok) throw new Error('Network response was not ok');
//         const clients = await response.json();
//         const clientList = document.getElementById('client-container');
//         clientList.innerHTML = '';

//         clients.forEach(client => {
//             const clientDiv = document.createElement('div');
//             clientDiv.className = 'client-item';

//             const name = document.createElement('h3');
//             name.textContent = `Cliente: ${client.nombre}`;

//             const tableNumber = document.createElement('p');
//             tableNumber.textContent = `Número de Mesa: ${client.numero_mesa}`;

//             const description = document.createElement('p');
//             description.textContent = `Descripción: ${client.descripcion ? client.descripcion : 'N/A'}`;

//             const orderList = document.createElement('ul');
//             orderList.textContent = 'Orden:';
//             client.orden.forEach(orderItem => {
//                 const listItem = document.createElement('li');
//                 listItem.textContent = `${orderItem.nombre} - $${orderItem.precio}`;
//                 orderList.appendChild(listItem);
//             });

//             clientDiv.appendChild(name);
//             clientDiv.appendChild(tableNumber);
//             clientDiv.appendChild(description);
//             clientDiv.appendChild(orderList);
//             clientList.appendChild(clientDiv);
//         });
//     } catch (error) {
//         console.error('Error fetching clients:', error);
//     }
// };

// const addFoodToTable = async () => {
//     const tableNumber = document.getElementById('occupied-tables').value;
//     const selectedMenuItems = Array.from(document.getElementById('menu-selection').selectedOptions).map(option => option.value);
//     const note = document.getElementById('client-note').value;

//     try {
//         const response = await fetch('http://localhost:3000/ordenes', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ id_mesa: tableNumber, orden: selectedMenuItems, nota: note })
//         });

//         if (!response.ok) throw new Error('Network response was not ok');
//     } catch (error) {
//         console.error('Error adding food to table:', error);
//     }
// };
