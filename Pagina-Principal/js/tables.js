// document.addEventListener('DOMContentLoaded', () => {
//     const tablesContainer = document.getElementById('tables-container');
//     const tableSelect = document.getElementById('table-select');
//     const addClientForm = document.getElementById('add-client-form');
//     const clientNameInput = document.getElementById('client-name');



//     const renderTables = async()=> {
//         const response = await fetch('http://localhost:3000/mesa');
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const mesas = await response.json();
    
//         const tables = mesas
//         tablesContainer.innerHTML = '';
//         tableSelect.innerHTML = '<option value="">Seleccione una mesa</option>';
//         tables.forEach(table => {
//             const tableDiv = document.createElement('div');
//             tableDiv.className = 'table-image';

//             const img = document.createElement('img');
//             img.src = table.imageUrl;
//             img.alt = `Mesa ${table.id_mesa}`;

//             const statusSpan = document.createElement('span');
//             statusSpan.className = 'table-status';
//             statusSpan.textContent = table.estado ? 'Disponible' : 'No Disponible';
//             statusSpan.style.backgroundColor = table.estado  ? 'green' : 'red';
//             tableDiv.appendChild(img);
//             tableDiv.appendChild(statusSpan);
//             tablesContainer.appendChild(tableDiv);

//             if (table.estado) {
//                 const option = document.createElement('option');
//                 option.value = table.id_mesa;
//                 option.textContent = `Mesa ${table.id_mesa}`;
//                 tableSelect.appendChild(option);
//             }
//         });
//     }

//     addClientForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         const tableId = parseInt(tableSelect.value, 10);
//         const clientName = clientNameInput.value.trim();

//         if (tableId && clientName) {

//             const response = await fetch('http://localhost:3000/cliente', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ nombre: clientName, mesa_id: tableId }), // Enviar datos en JSON
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const responseMesa= await fetch('http://localhost:3000/mesa', {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ id_mesa: tableId, status: false }), // Enviar datos en JSON
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const result = await response.json();
//             clientNameInput.value = '';

//             const table = tables.find(t => t.id === tableId);
//             if (table) {
//                 table.cliente = clientName;
//                 table.status = 'unavailable';
//                 renderTables();
//                 addClientForm.reset();
                
//                 // Despachar evento de cliente agregado
//                 const event = new CustomEvent('clientAdded', {
//                     detail: { clientName, tableId }
//                 });
//                 document.dispatchEvent(event);
//             }
//         }
//     });

//     renderTables();
// });


document.addEventListener('DOMContentLoaded', () => {
    const tablesContainer = document.getElementById('tables-container');
    const tableSelect = document.getElementById('table-select');
    const addClientForm = document.getElementById('add-client-form');
    const clientNameInput = document.getElementById('client-name');
    let tables = [];

    const renderTables = async () => {
        try {
            const response = await fetch('http://localhost:3000/mesa');
            if (!response.ok) throw new Error('Network response was not ok');
            tables = await response.json();
        
            tablesContainer.innerHTML = '';
            tableSelect.innerHTML = '<option value="">Seleccione una mesa</option>';
            tables.forEach(table => {
                const tableDiv = document.createElement('div');
                tableDiv.className = 'table-image';

                const img = document.createElement('img');
                img.src = table.imageUrl;
                img.alt = `Mesa ${table.id_mesa}`;

                const statusSpan = document.createElement('span');
                statusSpan.className = 'table-status';
                statusSpan.textContent = table.estado ? 'Disponible' : 'No Disponible';
                statusSpan.style.backgroundColor = table.estado ? 'green' : 'red';
                tableDiv.appendChild(img);
                tableDiv.appendChild(statusSpan);
                tablesContainer.appendChild(tableDiv);

                if (table.estado) {
                    const option = document.createElement('option');
                    option.value = table.id_mesa;
                    option.textContent = `Mesa ${table.id_mesa}`;
                    tableSelect.appendChild(option);
                }
            });
        } catch (error) {
            console.error('Error fetching tables:', error);
        }
    };

    addClientForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const tableId = parseInt(tableSelect.value, 10);
        const clientName = clientNameInput.value.trim();

        if (tableId && clientName) {
            try {
                const response = await fetch('http://localhost:3000/cliente', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nombre: clientName, mesa_id: tableId }),
                });

                if (!response.ok) throw new Error('Network response was not ok');

                const responseMesa = await fetch('http://localhost:3000/mesa', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id_mesa: tableId, estado: false }),
                });

                if (!responseMesa.ok) throw new Error('Network response was not ok');

                clientNameInput.value = '';
                await renderTables(); // Refresh tables after adding client

                // Dispatch client added event
                const event = new CustomEvent('clientAdded', {
                    detail: { clientName, tableId }
                });
                document.dispatchEvent(event);
            } catch (error) {
                console.error('Error adding client:', error);
            }
        }
    });

    renderTables();
});
