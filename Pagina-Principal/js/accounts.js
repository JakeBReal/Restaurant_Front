document.addEventListener('DOMContentLoaded', () => {
    const accountsContainer = document.getElementById('accounts-container');

    // Ejemplo de datos de clientes y sus cuentas
    const clients = [
        { id: 1, name: 'Cliente 1', total: 30, items: [{ name: 'Pizza', price: 10 }, { name: 'Pasta', price: 20 }] },
        { id: 2, name: 'Cliente 2', total: 20, items: [{ name: 'Ensalada', price: 10 }, { name: 'Sopa', price: 10 }] }
    ];

    // Función para renderizar cuentas
    function renderAccounts() {
        accountsContainer.innerHTML = '';
        clients.forEach(client => {
            const clientDiv = document.createElement('div');
            clientDiv.className = 'client-account';
            clientDiv.innerHTML = `
                <h3>${client.name}</h3>
                <ul>
                    ${client.items.map(item => `<li>${item.name} - $${item.price}</li>`).join('')}
                </ul>
                <p>Total: $${client.total}</p>
                <button class="pay-button" data-client-id="${client.id}">Pagar</button>
            `;
            accountsContainer.appendChild(clientDiv);
        });

        // Añadir evento a los botones de pagar
        document.querySelectorAll('.pay-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const clientId = event.target.getAttribute('data-client-id');
                handlePayment(clientId);
            });
        });
    }

    // Función para manejar el pago
    function handlePayment(clientId) {
        const clientIndex = clients.findIndex(client => client.id === parseInt(clientId, 10));
        if (clientIndex !== -1) {
            clients[clientIndex].total = 0;
            clients[clientIndex].items = [];
            alert(`La cuenta de ${clients[clientIndex].name} ha sido pagada.`);
            renderAccounts();
        }
    }

    renderAccounts();
});
