// Datos estáticos de inventario
const inventoryData = [
    { id_menu: 1, nombre: 'Hamburguesa', stock: 10 },
    { id_menu: 2, nombre: 'Pizza', stock: 8 },
    { id_menu: 3, nombre: 'Ensalada', stock: 15 },
    { id_menu: 4, nombre: 'Bebida', stock: 20 },
    // Agrega más artículos según sea necesario
];

document.addEventListener("DOMContentLoaded", () => {
    const inventoryNav = document.getElementById("inventory-nav");
    const inventorySection = document.getElementById("inventory-section");
    const navLinks = document.querySelectorAll(".navbar a"); // Selecciona todos los enlaces del menú de navegación

    // Mostrar/ocultar sección de inventario
    inventoryNav.addEventListener("click", (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del enlace
        inventorySection.style.display = inventorySection.style.display === "none" || inventorySection.style.display === "" ? "block" : "none";
    });

    // Ocultar la sección de inventario al hacer clic en cualquier otro enlace
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (link !== inventoryNav) {
                inventorySection.style.display = "none";
            }
        });
    });

    // Cargar los datos del inventario en la tabla
    loadInventory();
});

const loadInventory = () => {
    const inventoryTableBody = document.getElementById("inventory-table").getElementsByTagName("tbody")[0];
    inventoryTableBody.innerHTML = ""; // Limpia el contenido actual

    inventoryData.forEach(item => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = item.nombre;
        row.appendChild(nameCell);

        const stockCell = document.createElement("td");
        stockCell.textContent = item.stock;
        row.appendChild(stockCell);

        inventoryTableBody.appendChild(row);
    });
};
