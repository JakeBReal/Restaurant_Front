document.addEventListener("DOMContentLoaded", async () => {
    // Cargar datos iniciales
    await loadOccupiedTables();
    await loadMenuOptions();
    await loadClients();

    // Configurar el formulario para añadir alimentos a la mesa
    const form1 = document.getElementById("add-food-form1");
    form1.addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita la recarga de la página
        await addFoodToTable(); // Añadir alimento a la mesa
        form1.reset(); // Limpiar el formulario
        await loadClients(); // Refrescar la lista de clientes
    });

    // Configurar controles de cantidad
    const minusButton = document.getElementById("minus-button");
    const plusButton = document.getElementById("plus-button");
    const quantityDisplay = document.getElementById("quantity-display");

    minusButton.addEventListener("click", () => {
        let currentQuantity = parseInt(quantityDisplay.textContent);
        if (currentQuantity > 0) {
            quantityDisplay.textContent = currentQuantity - 1;
        }
    });

    plusButton.addEventListener("click", () => {
        let currentQuantity = parseInt(quantityDisplay.textContent);
        quantityDisplay.textContent = currentQuantity + 1;
    });

    // Mostrar controles cuando se selecciona un alimento
    const foodSelection = document.getElementById("food-selection");
    foodSelection.addEventListener("change", () => {
        const selectedFoodName = foodSelection.options[foodSelection.selectedIndex].text;
        document.getElementById("selected-food-name").textContent = selectedFoodName;
        document.getElementById("food-controls").style.display = selectedFoodName ? "block" : "none";
    });
});

// Cargar opciones del menú en el <select>
const loadMenuOptions = async () => {
    try {
        const response = await fetch('http://localhost:3000/menu');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const menuItems = await response.json();

        const foodSelection = document.getElementById("food-selection");
        if (!foodSelection) {
            console.error("El contenedor #food-selection no se encuentra");
            return;
        }

        foodSelection.innerHTML = "<option value=''>--Selecciona un alimento--</option>"; // Limpiar opciones anteriores

        menuItems.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.id_menu;
            option.textContent = `${item.nombre} - $${item.precio}`;
            foodSelection.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading menu options:', error);
    }
};

// Cargar mesas ocupadas desde el servidor
const loadOccupiedTables = async () => {
    try {
        const response = await fetch('http://localhost:3000/mesaOcupada');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const tables = await response.json();

        const occupiedTablesSelect = document.getElementById("occupied-tables");
        occupiedTablesSelect.innerHTML = "";

        tables.forEach((table) => {
            const option = document.createElement("option");
            option.value = table.id_cliente;
            option.textContent = `Mesa ${table.id_mesa} - ${table.nombre}`;
            occupiedTablesSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading occupied tables:', error);
    }
};

// Añadir un alimento a la mesa
const addFoodToTable = async () => {
    const foodSelection = document.getElementById("food-selection");
    const occupiedTablesSelect = document.getElementById("occupied-tables");
    const quantityDisplay = document.getElementById("quantity-display");

    const id_menu = foodSelection.value;
    const id_cliente = occupiedTablesSelect.value;
    const cantidad = parseInt(quantityDisplay.textContent);

    if (!id_menu || !id_cliente || cantidad <= 0) {
        alert("Por favor, selecciona un alimento, una mesa y una cantidad mayor a 0.");
        return;
    }

    try {
        let response = await fetch('http://localhost:3000/addFoodToTable', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_cliente,
                id_menu,
                cantidad
            }), // Enviar datos en JSON
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        response = await response.json();
        console.log('Food added to table:', response);
    } catch (err) {
        console.error('Error adding food to table:', err);
    }
};
