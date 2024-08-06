// document.addEventListener('DOMContentLoaded', () => {
//     console.log('accounts.js cargado');

//     const accounts = [];

//     function renderAccounts() {
//         const accountsContainer = document.getElementById('accounts-container');
//         accountsContainer.innerHTML = '';
//         accounts.forEach(account => {
//             const accountDiv = document.createElement('div');
//             accountDiv.className = 'account';
//             accountDiv.innerHTML = `
//                 <h3>Cliente: ${account.name} (Mesa ${account.tableId})</h3>
//                 <ul>
//                     ${account.orders.map(order => `<li>${order.name} - ${getCurrencySymbol(account.currency)}${order.price}</li>`).join('')}
//                 </ul>
//                 <p>Total: ${getCurrencySymbol(account.currency)}${account.orders.reduce((total, order) => total + order.price, 0)}</p>
//                 <button class="pay-button" data-account-id="${account.id}">Pagar</button>
//             `;
//             accountsContainer.appendChild(accountDiv);
//         });

//         document.querySelectorAll('.pay-button').forEach(button => {
//             button.addEventListener('click', (e) => {
//                 const accountId = parseInt(e.target.getAttribute('data-account-id'), 10);
//                 payAccount(accountId);
//             });
//         });
//     }

//     function getCurrencySymbol(currency) {
//         switch (currency) {
//             case 'USD':
//                 return '$';
//             case 'DOP':
//                 return 'RD$';
//             case 'EUR':
//                 return '€';
//             default:
//                 return '';
//         }
//     }

//     function payAccount(accountId) {
//         const accountIndex = accounts.findIndex(account => account.id === accountId);
//         if (accountIndex !== -1) {
//             accounts.splice(accountIndex, 1);
//             renderAccounts();
//             updateClientSelect();
//             alert('Cuenta pagada exitosamente');
//         }
//     }

//     function updateClientSelect() {
//         const clientSelect = document.getElementById('client-select');
//         clientSelect.innerHTML = '<option value="">Seleccione un cliente</option>';
//         accounts.forEach(account => {
//             const option = document.createElement('option');
//             option.value = account.id;
//             option.textContent = `${account.name} (Mesa ${account.tableId})`;
//             clientSelect.appendChild(option);
//         });
//     }

//     document.getElementById('pay-form').addEventListener('submit', (e) => {
//         e.preventDefault();
//         const clientSelect = document.getElementById('client-select');
//         const currencySelect = document.getElementById('currency-select');

//         const clientId = parseInt(clientSelect.value, 10);
//         const currency = currencySelect.value;

//         if (clientId && currency) {
//             const account = accounts.find(account => account.id === clientId);
//             if (account) {
//                 account.currency = currency;
//                 renderAccounts();
//             }
//         }
//     });

//     // Example client added event listener for testing
//     document.addEventListener('clientAdded', (e) => {
//         accounts.push({
//             id: accounts.length + 1,
//             name: e.detail.clientName,
//             tableId: e.detail.tableId,
//             orders: [],
//             currency: 'USD' // Default currency
//         });
//         updateClientSelect();
//         renderAccounts();
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const accountsContainer = document.getElementById('accounts-container');
    const payButton = document.getElementById('pay-button');
    let accounts = [];

    const renderAccounts = () => {
        accountsContainer.innerHTML = '';
        accounts.forEach(account => {
            const accountDiv = document.createElement('div');
            accountDiv.className = 'account-item';

            const name = document.createElement('h3');
            name.textContent = `Cliente: ${account.nombre}`;

            const tableNumber = document.createElement('p');
            tableNumber.textContent = `Número de Mesa: ${account.numero_mesa}`;

            const total = document.createElement('p');
            total.textContent = `Total: $${account.total}`;

            accountDiv.appendChild(name);
            accountDiv.appendChild(tableNumber);
            accountDiv.appendChild(total);
            accountsContainer.appendChild(accountDiv);
        });
    };

    const fetchAccounts = async () => {
        try {
            const response = await fetch('http://localhost:3000/cuentas');
            if (!response.ok) throw new Error('Network response was not ok');
            accounts = await response.json();
            renderAccounts();
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };

    const payAccount = async () => {
        const selectedAccount = accounts.find(acc => acc.selected);
        if (selectedAccount) {
            try {
                const response = await fetch('http://localhost:3000/pagar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id_cuenta: selectedAccount.id_cuenta }),
                });

                if (!response.ok) throw new Error('Network response was not ok');
                await fetchAccounts(); // Refresh accounts after payment
            } catch (error) {
                console.error('Error paying account:', error);
            }
        }
    };

    payButton.addEventListener('click', payAccount);
    fetchAccounts();
});
