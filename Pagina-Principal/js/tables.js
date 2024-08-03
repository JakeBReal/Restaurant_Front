document.addEventListener('DOMContentLoaded', () => {
    const tablesContainer = document.getElementById('tables-container');
    const tableSelect = document.getElementById('table-select');
    const addClientForm = document.getElementById('add-client-form');
    const clientNameInput = document.getElementById('client-name');

    const tables = [
        { id: 1, status: 'available', capacidad: 4, cliente: null, imageUrl: 'https://via.placeholder.com/200x150.png?text=Mesa+1' },
        { id: 2, status: 'available', capacidad: 2, cliente: null, imageUrl: 'https://via.placeholder.com/200x150.png?text=Mesa+2' },
        { id: 3, status: 'available', capacidad: 6, cliente: null, imageUrl: 'https://via.placeholder.com/200x150.png?text=Mesa+3' },
        { id: 4, status: 'available', capacidad: 4, cliente: null, imageUrl: 'https://via.placeholder.com/200x150.png?text=Mesa+4' },
    ];

    function renderTables() {
        tablesContainer.innerHTML = '';
        tableSelect.innerHTML = '<option value="">Seleccione una mesa</option>';
        tables.forEach(table => {
            const tableDiv = document.createElement('div');
            tableDiv.className = 'table-image';

            const img = document.createElement('img');
            img.src = table.imageUrl;
            img.alt = `Mesa ${table.id}`;

            const statusSpan = document.createElement('span');
            statusSpan.className = 'table-status';
            statusSpan.textContent = table.status === 'available' ? 'Disponible' : 'No Disponible';
            statusSpan.style.backgroundColor = table.status === 'available' ? 'green' : 'red';

            tableDiv.appendChild(img);
            tableDiv.appendChild(statusSpan);
            tablesContainer.appendChild(tableDiv);

            if (table.status === 'available') {
                const option = document.createElement('option');
                option.value = table.id;
                option.textContent = `Mesa ${table.id}`;
                tableSelect.appendChild(option);
            }
        });
    }

    addClientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const tableId = parseInt(tableSelect.value, 10);
        const clientName = clientNameInput.value.trim();

        if (tableId && clientName) {
            const table = tables.find(t => t.id === tableId);
            if (table) {
                table.cliente = clientName;
                table.status = 'unavailable';
                renderTables();
                addClientForm.reset();
                
                // Despachar evento de cliente agregado
                const event = new CustomEvent('clientAdded', {
                    detail: { clientName, tableId }
                });
                document.dispatchEvent(event);
            }
        }
    });

    renderTables();
});
