document.addEventListener('DOMContentLoaded', () => {
    
    // Datos locales de ejemplo

    const accountsMenu = document.getElementById('cuadre1');

    accountsMenu.addEventListener('click', () => {
        loadSummary();
    });



    const  loadSummary=async ()=> {

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

        localData.forEach(item => {
            const accountDiv = document.createElement('div');
            accountDiv.classList.add('account');
            
            accountDiv.innerHTML = `
                <h3>Cuenta #${item.id_cuenta}</h3>
                <p><strong>Nombre del Cliente:</strong> ${item.nombre}</p>
                <p><strong>Mesa:</strong> ${item.id_mesa}</p>
                <p><strong>Fecha:</strong> ${item.fecha}</p>
                <p><strong>Valor_de_la_cuenta:</strong> ${item.total}</p>
            `;

            container.appendChild(accountDiv);
        });
    }

    loadSummary();
});
