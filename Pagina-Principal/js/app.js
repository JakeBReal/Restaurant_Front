

document.addEventListener('DOMContentLoaded', async () => {
    console.log('app.js cargado');


          
    const response1 = await fetch('http://localhost:3000/mesa');
    if (!response1.ok) {
        throw new Error('Network response was not ok');
    }
    const mesas1 = await response1.json();
    const mesasContainer = document.getElementById('mesas');
    mesasContainer.innerHTML = '';

    for (const mesa of mesas1) {

        const newMesa = document.createElement('li');
        newMesa.innerHTML = `
            <strong>Capacidad:</strong> ${mesa.capacidad} <br>
            <strong>Estado:</strong> ${mesa.estado} <br>
            <img src="${mesa.imagen}" alt="Imagen de la mesa" style="width: 100px; height: 100px;"><br>
        `;

        // Añadir la nueva mesa a la lista
        mesasContainer.appendChild(newMesa);
    }

  const p = document.getElementById('addTableForm');
    document.getElementById('addTableForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario
        const capacidad = document.getElementById('capacidad').value;
        const imagen = document.getElementById('imagen').value 
        const responseMesa = await fetch('http://localhost:3000/addMenus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              capacidad,
                imagen

            }), // Enviar datos en JSON
        });

        
    const response = await fetch('http://localhost:3000/mesa');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const mesas = await response.json();
    const mesasContainer = document.getElementById('mesas');
    mesasContainer.innerHTML = '';

    for (const mesa of mesas) {

        const newMesa = document.createElement('li');
        newMesa.innerHTML = `
            <strong>Capacidad:</strong> ${mesa.capacidad} <br>
            <strong>Estado:</strong> ${mesa.estado} <br>
            <img src="${mesa.imagen}" alt="Imagen de la mesa" style="width: 100px; height: 100px;"><br>
        `;

        // Añadir la nueva mesa a la lista
        mesasContainer.appendChild(newMesa);
    }

    p.reset();

    });
      


    const accountsMenu = document.getElementById('mesas1');

    accountsMenu.addEventListener('click', () => {
        renderTables();
    });

   

    const tablesContainer = document.getElementById('tables-container');
    const tableSelect = document.getElementById('table-select');
    const addClientForm = document.getElementById('add-client-form');
    const clientNameInput = document.getElementById('client-name');
    const clientsContainer = document.getElementById('clients-container');
    const accountsContainer = document.getElementById('accounts-container');

    // Datos iniciales de ejemplo
   

    const response = await fetch('http://localhost:3000/mesa');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const mesas = await response.json();

    const tables = mesas

    const clients = [];
    const menu = [
        { id: 1, name: 'Pizza', price: 10 },
        { id: 2, name: 'Pasta', price: 8 },
        { id: 3, name: 'Ensalada', price: 6 }
    ];

    const renderTables=async () =>{

        const response = await fetch('http://localhost:3000/mesa');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const mesas = await response.json();
    
        const tables = mesas

        tablesContainer.innerHTML = '';
        tableSelect.innerHTML = '<option value="">Seleccione una mesa</option>';
        tables.forEach(table => {
            const tableElement = document.createElement('div');
            tableElement.className = 'table';
            tableElement.innerHTML = `
                <img src="${table.imagen}" alt="Mesa">
                <p>Mesa ${table.id_mesa} - ${table.estado ? 'Disponible' : 'Ocupada'}</p>
                ${table?.cliente ? `<p>Cliente: ${table.cliente}</p>` : ''}
            `;
            tablesContainer.appendChild(tableElement);
            if (table.estado) {
                const option = document.createElement('option');
                option.value = table.id_mesa;
                option.textContent = `Mesa ${table.id_mesa}`;
                tableSelect.appendChild(option);
            }
        });
    }

    function renderClients() {
        clientsContainer.innerHTML = '';
        clients.forEach(client => {
            const clientElement = document.createElement('div');
            clientElement.className = 'client';
            clientElement.innerHTML = `
                <p>${client.name} - Mesa ${client.tableId}</p>
                <button data-client="${client.name}" class="view-menu">Ver Menú</button>
            `;
            clientsContainer.appendChild(clientElement);
        });

        // Agregar eventos a los botones "Ver Menú"
        document.querySelectorAll('.view-menu').forEach(button => {
            button.addEventListener('click', function () {
                const clientName = this.dataset.client;
                showMenuForClient(clientName);
            });
        });
    }

    function renderAccounts() {
        renderTables();
        accountsContainer.innerHTML = '';
        tables.forEach(table => {
            if (table.cliente) {
                const accountElement = document.createElement('div');
                accountElement.className = 'account';
                accountElement.innerHTML = `
                    <p>Cliente: ${table.cliente} - Total: $${table.total.toFixed(2)}</p>
                    <button data-table-id="${table.id}" class="pay-button">Pagar</button>
                `;
                accountsContainer.appendChild(accountElement);
            }
        });

        // Agregar eventos a los botones "Pagar"
        document.querySelectorAll('.pay-button').forEach(button => {
            button.addEventListener('click', function () {
                const tableId = parseInt(this.dataset.tableId, 10);
                payForTable(tableId);
            });
        });
    }

    function addItemToClientOrder(clientName, itemId) {
        const item = menu.find(i => i.id === itemId);
        if (item) {
            const table = tables.find(t => t.cliente === clientName);
            if (table) {
                table.total += item.price;
                renderClients();
                renderAccounts();
            }
        }
    }

    function payForTable(tableId) {
        const table = tables.find(t => t.id === tableId);
        if (table) {
            // Restaurar la mesa a disponible y limpiar el cliente y total
            table.estado = 'Disponible';
            table.cliente = null;
            table.total = 0;
            renderTables();
            renderClients();
            renderAccounts();
        }
    }

    function showMenuForClient(clientName) {
        const menuContainer = document.getElementById('menu-container');
        menuContainer.innerHTML = '<h2>Menú</h2>';
        menu.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item';
            itemElement.innerHTML = `
                <p>${item.name} - $${item.price.toFixed(2)}</p>
                <button data-client="${clientName}" data-item-id="${item.id}" class="add-to-order">Agregar</button>
            `;
            menuContainer.appendChild(itemElement);
        });

        // Agregar eventos a los botones "Agregar"
        document.querySelectorAll('.add-to-order').forEach(button => {
            button.addEventListener('click', function () {
                const clientName = this.dataset.client;
                const itemId = parseInt(this.dataset.itemId, 10);
                addItemToClientOrder(clientName, itemId);
            });
        });
    }

    addClientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const tableId = parseInt(tableSelect.value, 10);
        const clientName = clientNameInput.value.trim();

        if (!tableId || !clientName) return;

        const table = tables.find(t => t.id === tableId);
        if (table && table.estado === 'Disponible') {
            table.estado = 'No Disponible';
            table.cliente = clientName;
            clients.push({ name: clientName, tableId });
            clientNameInput.value = '';
            renderTables();
            renderClients();
            renderAccounts();
        }
    });

    renderTables();

    // main.js


document.addEventListener("DOMContentLoaded", async () => {
  loadOccupiedTables();
  loadMenuOptions1();
  loadClients();

  const form = document.getElementById("add-food-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita la recarga de la página
    await addFoodToTable();
    form.reset();
    await loadClients(); // Refresca la lista de clientes
  });

  const form1 = document.getElementById("add-food-form1");
  form1.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita la recarga de la página
    await addFoodToTable();
    form1.reset();
    await loadClients(); // Refresca la lista de clientes
  });
});

});
