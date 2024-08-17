document.addEventListener('DOMContentLoaded', () => {
    console.log('accounts.js cargado');
    let accounts = [];

    const accountsMenu = document.getElementById('prueba');

    accountsMenu.addEventListener('click', () => {
        renderAccounts();
    });

    const renderAccounts=async() =>{
        const response = await fetch('http://localhost:3000/getTotalCuenta');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        accounts = await response.json();

        const accountsContainer = document.getElementById('accounts-container');
        accountsContainer.innerHTML = '';
        accounts.forEach(account => {
            const accountDiv = document.createElement('div');
            accountDiv.className = 'account';
            accountDiv.innerHTML = `
                <h3>Cliente: ${account.nombre} (Mesa ${account.tableId})</h3>
                <ul>
                    ${account.orders.map(order => `<li>${order.nombre} - ${getCurrencySymbol(account.currency)}${order.precio}</li>`).join('')}
                </ul>
                <p>Total: ${getCurrencySymbol(account.currency)}${account.total}</p>
                <button class="pay-button" data-mesa-id="${account.tableId}" data-account-id="${account.id_cuenta}" data-cliente-id="${account.id}" data-total-id="${account.total}">Pagar</button>
            `;
            accountsContainer.appendChild(accountDiv);
        });

        document.querySelectorAll('.pay-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const accountId = parseInt(e.target.getAttribute('data-account-id'), 10);
                const cliente = parseInt(e.target.getAttribute('data-cliente-id'), 10);
                const total = parseInt(e.target.getAttribute('data-total-id'), 10);
                const tableId = parseInt(e.target.getAttribute('data-mesa-id'), 10);


               payAccount(accountId,cliente,total,tableId);
            });
        });
    }

    function getCurrencySymbol(currency) {
        switch (currency) {
            case 'USD':
                return '$';
            case 'DOP':
                return 'RD$';
            case 'EUR':
                return '€';
            default:
                return '';
        }
    }

    function payAccount(accountId,cliente,total,id_mesa) {
        fetch('http://localhost:3000/pagarCuenta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_cuenta: accountId, id_cliente: cliente,total,id_mesa }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Cuenta pagada:', data);
            renderAccounts();
        })
        .catch(error => {
            console.error('Error paying account:', error);
        });
      
    }

    function updateClientSelect() {
        const clientSelect = document.getElementById('client-select');
        clientSelect.innerHTML = '<option value="">Seleccione un cliente</option>';
        accounts.forEach(account => {
            const option = document.createElement('option');
            option.value = account.id;
            option.textContent = `${account.name} (Mesa ${account.tableId})`;
            clientSelect.appendChild(option);
        });
    }

    document.getElementById('pay-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const clientSelect = document.getElementById('client-select');
        const currencySelect = document.getElementById('currency-select');

        const clientId = parseInt(clientSelect.value, 10);
        const currency = currencySelect.value;

        if (clientId && currency) {
            const account = accounts.find(account => account.id === clientId);
            if (account) {
                account.currency = currency;
                renderAccounts();
            }
        }
    });

    // Example client added event listener for testing
    document.addEventListener('clientAdded', (e) => {
        accounts.push({
            id: accounts.length + 1,
            name: e.detail.clientName,
            tableId: e.detail.tableId,
            orders: [],
            currency: 'USD' // Default currency
        });
        updateClientSelect();
        renderAccounts();
    });

renderAccounts()

});

