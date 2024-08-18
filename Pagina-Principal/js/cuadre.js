document.addEventListener('DOMContentLoaded', () => {

    const accountsMenu = document.getElementById('cuadre1');
    const calculateButton = document.getElementById('calculate-total');
    const timeRangeSelect = document.getElementById('time-range');
    
    accountsMenu.addEventListener('click', () => {
        loadSummary();
    });

    calculateButton.addEventListener('click', () => {
        const selectedRange = timeRangeSelect.value;
        loadSummary(selectedRange);
    });

    const loadSummary = async (timeRange = 'all') => {

        const response = await fetch('http://localhost:3000/getCuandre');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let localData = await response.json();

        const container = document.getElementById('summary-container');

        if (!container) {
            console.error('El contenedor de resumen no se encontró.');
            return;
        }

        // Limpiar el contenedor
        container.innerHTML = '';

        // Filtrar los datos según el rango de tiempo seleccionado
        const filteredData = filterDataByTimeRange(localData, timeRange);

        let total = 0;

        filteredData.forEach(item => {
            const accountDiv = document.createElement('div');
            accountDiv.classList.add('account');
            
            accountDiv.innerHTML = `
                <h3>Cuenta #${item.id_cuenta}</h3>
                <p><strong>Nombre del Cliente:</strong> ${item.nombre}</p>
                <p><strong>Mesa:</strong> ${item.id_mesa}</p>
                <p><strong>Fecha:</strong> ${item.fecha}</p>
                <p><strong>Valor de la cuenta:</strong> ${item.total}</p>
            `;

            container.appendChild(accountDiv);

            // Sumar el total de todas las cuentas filtradas
            total += parseFloat(item.total);
        });

        // Mostrar el total en el contenedor
        const totalDiv = document.createElement('div');
        totalDiv.classList.add('total');
        totalDiv.innerHTML = `<h3>Total de las Cuentas: ${total.toFixed(2)}</h3>`;
        container.appendChild(totalDiv);
    }

    const filterDataByTimeRange = (data, timeRange) => {
        const now = new Date();
        return data.filter(item => {
            const accountDate = new Date(item.fecha);
            switch (timeRange) {
                case 'day':
                    return (now - accountDate) <= (24 * 60 * 60 * 1000); // 1 day
                case 'week':
                    return (now - accountDate) <= (7 * 24 * 60 * 60 * 1000); // 1 week
                case 'month':
                    return (now - accountDate) <= (30 * 24 * 60 * 60 * 1000); // 1 month
                case 'year':
                    return (now - accountDate) <= (365 * 24 * 60 * 60 * 1000); // 1 year
                case 'all':
                default:
                    return true;
            }
        });
    }

    loadSummary();
});
