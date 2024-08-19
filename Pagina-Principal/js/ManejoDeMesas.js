document.addEventListener('DOMContentLoaded', () => {
    const tablesContainer = document.getElementById('tables-container');
    const tableSelect = document.getElementById('table-select');
    const addClientForm = document.getElementById('add-client-form');
    const clientNameInput = document.getElementById('client-name');



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


    addClientForm.addEventListener('submit', async (e) => {
        const tableId = parseInt(tableSelect.value, 10);
        const clientName = clientNameInput.value.trim();

        if (tableId && clientName) {

            let response = await fetch('http://localhost:3000/cliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre: clientName, mesa_id: tableId }), // Enviar datos en JSON
            });
            response = await response.json()
            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }

            const responseMesa= await fetch('http://localhost:3000/mesa', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_mesa: tableId,id_cliente:response.id_cliente, status: false }), // Enviar datos en JSON
            });

         


            
            const responseMesa2= await fetch('http://localhost:3000/addCuenta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_cliente:response.id_cliente}), // Enviar datos en JSON
            });

         

            clientNameInput.value = '';
        }
    renderTables();

    });

});
