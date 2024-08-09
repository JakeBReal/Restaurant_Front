document.addEventListener('DOMContentLoaded', () => {
    // Datos locales de ejemplo
    const localData = [
        {
            id_cuenta: 1,
            nombre_cliente: 'Juan Pérez',
            mesa: 5,
            fecha: '2024-08-05'
        },
        {
            id_cuenta: 2,
            nombre_cliente: 'María Gómez',
            mesa: 3,
            fecha: '2024-08-05'
        },
        {
            id_cuenta: 3,
            nombre_cliente: 'Carlos Rodríguez',
            mesa: 7,
            fecha: '2024-08-05'
        }
    ];

    function loadSummary() {
        const container = document.getElementById('summary-container');

        if (!container) {
            console.error('El contenedor de resumen no se encontró.');
            return;
        }

        // Limpiar el contenedor
        container.innerHTML = '';

        localData.forEach(item => {
            const accountDiv = document.createElement('div');
            accountDiv.classList.add('account');
            
            accountDiv.innerHTML = `
                <h3>Cuenta #${item.id_cuenta}</h3>
                <p><strong>Nombre del Cliente:</strong> ${item.nombre_cliente}</p>
                <p><strong>Mesa:</strong> ${item.mesa}</p>
                <p><strong>Fecha:</strong> ${item.fecha}</p>
            `;

            container.appendChild(accountDiv);
        });
    }

    loadSummary();
});
