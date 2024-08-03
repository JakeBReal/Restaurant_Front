document.addEventListener('DOMContentLoaded', () => {
    console.log('clients.js cargado');

    const tables = [
        { id: 1, status: 'available', capacidad: 4, cliente: null, imageUrl: 'https://via.placeholder.com/200x150.png?text=Mesa+1' },
        { id: 2, status: 'available', capacidad: 2, cliente: null, imageUrl: 'https://via.placeholder.com/200x150.png?text=Mesa+2' },
        { id: 3, status: 'available', capacidad: 6, cliente: null, imageUrl: 'https://via.placeholder.com/200x150.png?text=Mesa+3' },
        { id: 4, status: 'available', capacidad: 4, cliente: null, imageUrl: 'https://via.placeholder.com/200x150.png?text=Mesa+4' },
    ];

    const menuItems = [
        { id: 1, name: 'd', price: 10, available: true },
        { id: 2, name: 'Pizza', price: 15, available: true },
        { id: 3, name: 'Ensalada', price: 7, available: true },
        { id: 4, name: 'Sopa', price: 5, available: true },
    ];

    const clients = [];

    function renderClients() {
        const clientsContainer = document.getElementById('clients-container');
        clientsContainer.innerHTML = '';
        clients.forEach(client => {
            const clientDiv = document.createElement('div');
            clientDiv.className = 'client-account';
            clientDiv.innerHTML = `
                <h3>Cliente: ${client.name} (Mesa ${client.tableId})</h3>
                <ul>
                    ${client.orders.map(order => `<li>${order.name} - $${order.price}</li>`).join('')}
                </ul>
                <p>Total: $${client.orders.reduce((total, order) => total + order.price, 0)}</p>
            `;
            clientsContainer.appendChild(clientDiv);
        });
    }

    function updateClientSelect() {
        const clientSelect = document.getElementById('client-select');
        clientSelect.innerHTML = '<option value="">Seleccione un cliente</option>';
        clients.forEach(client => {
            const option = document.createElement('option');
            option.value = client.id;
            option.textContent = `${client.name} (Mesa ${client.tableId})`;
            clientSelect.appendChild(option);
        });
    }

    function updateFoodSelect() {
        const foodSelect = document.getElementById('food-select');
        foodSelect.innerHTML = '<option value="">Seleccione una comida</option>';
        menuItems.forEach(item => {
            if (item.available) {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = `${item.name} - $${item.price}`;
                foodSelect.appendChild(option);
            }
        });
    }

    updateClientSelect();
    updateFoodSelect();

    document.getElementById('add-food-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const clientSelect = document.getElementById('client-select');
        const foodSelect = document.getElementById('food-select');

        const clientId = parseInt(clientSelect.value, 10);
        const foodId = parseInt(foodSelect.value, 10);

        if (clientId && foodId) {
            const client = clients.find(c => c.id === clientId);
            const food = menuItems.find(f => f.id === foodId);
            if (client && food) {
                client.orders.push(food);
                renderClients();
            }
        }
    });

    document.addEventListener('clientAdded', (e) => {
        clients.push({
            id: clients.length + 1,
            name: e.detail.clientName,
            tableId: e.detail.tableId,
            orders: []
        });
        updateClientSelect();
        renderClients();
    });
});
