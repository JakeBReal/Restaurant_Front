// Esperar a que el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", async () => {
  // Cargar datos iniciales
  loadOccupiedTables();
  loadMenuOptions();
  loadClients();
  loadMenuOptions1();

  // Configurar el formulario para añadir alimentos a la mesa
  const form = document.getElementById("add-food-form");
  form.addEventListener("submit", async (e) => {
      // e.preventDefault(); // Evita la recarga de la página (descomentarlo si es necesario)
      await addFoodToTable(); // Añadir alimento a la mesa
      form.reset(); // Limpiar el formulario
      await loadClients(); // Refrescar la lista de clientes
      // Mantener la pestaña activa
      // document.querySelector('.navbar ul li a[href="#clients"]').click();
  });

  // Configurar el formulario para añadir alimentos a la mesa (alternativa)
  const form1 = document.getElementById("add-food-form1");
  form1.addEventListener("submit", async (e) => {
      // e.preventDefault(); // Evita la recarga de la página (descomentarlo si es necesario)
      await addFoodToTable(); // Añadir alimento a la mesa
      form1.reset(); // Limpiar el formulario
      await loadClients(); // Refrescar la lista de clientes
      // Mantener la pestaña activa
      // document.querySelector('.navbar ul li a[href="#clients"]').click();
  });
});

// Cargar opciones del menú (alternativa) desde el servidor
const loadMenuOptions1 = async () => {
  try {
      const response = await fetch('http://localhost:3000/menuDisponible');
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const menuItems = await response.json();

      const menuSelection = document.getElementById("menu-selection1");
      if (!menuSelection) {
          console.error("El contenedor #menu-selection no se encuentra");
          return;
      }

      menuSelection.innerHTML = ""; // Limpia el contenedor antes de agregar nuevos checkboxes

      menuItems.forEach((item) => {
          // Crear el contenedor del checkbox
          const checkboxContainer = document.createElement("div");
          checkboxContainer.className = "menu-item";

          // Crear el checkbox
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.id = `menu-item-${item.id_menu}`;
          checkbox.value = item.id_menu;
          checkbox.checked = false;

          // Configurar evento para cuando se cambie el estado del checkbox
          checkbox.addEventListener('change', async (event) => {
              const occupiedTablesSelect = document.getElementById("occupied-tables");
              const id_menu = event.target.value;
              const disponibilidad = event.target.checked;

              // Enviar datos al servidor para actualizar el estado de disponibilidad
              await fetch('http://localhost:3000/addComidaCliente', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      id_cliente: occupiedTablesSelect.value,
                      id_menu,
                      disponibilidad
                  }), // Enviar datos en JSON
              });

              // Refrescar la lista de clientes
              loadClients();
          });

          // Crear la etiqueta para el checkbox
          const label = document.createElement("label");
          label.htmlFor = checkbox.id;
          label.textContent = `${item.nombre} - $${item.precio}`;

          // Agregar el checkbox y la etiqueta al contenedor
          checkboxContainer.appendChild(checkbox);
          checkboxContainer.appendChild(label);

          // Agregar el contenedor al contenedor principal
          menuSelection.appendChild(checkboxContainer);
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

// Cargar opciones del menú desde el servidor
const loadMenuOptions = async () => {
  console.log("loadMenuOptions called"); // Verifica si la función se está ejecutando

  try {
      const response = await fetch('http://localhost:3000/menu');
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const menuItems = await response.json();

      const menuSelection = document.getElementById("menu-selection");
      if (!menuSelection) {
          console.error("El contenedor #menu-selection no se encuentra");
          return;
      }

      menuSelection.innerHTML = ""; // Limpia el contenedor antes de agregar nuevos checkboxes

      menuItems.forEach((item) => {
          // Crear el contenedor del checkbox
          const checkboxContainer = document.createElement("div");
          checkboxContainer.className = "menu-item";

          // Crear el checkbox
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.id = `menu-item-${item.id_menu}`;
          checkbox.value = item.id_menu;
          checkbox.checked = item.disponibilidad;

          // Configurar evento para cuando se cambie el estado del checkbox
          checkbox.addEventListener('change', async (event) => {
              const id_menu = event.target.value;
              const disponibilidad = event.target.checked;

              // Enviar datos al servidor para actualizar el estado del menú
              await fetch('http://localhost:3000/updateStatusMenu', {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      id_menu,
                      disponibilidad
                  }), // Enviar datos en JSON
              });

              // Refrescar las opciones del menú
              loadMenuOptions();
          });

          // Crear la etiqueta para el checkbox
          const label = document.createElement("label");
          label.htmlFor = checkbox.id;
          label.textContent = `${item.nombre} - $${item.precio}`;

          // Agregar el checkbox y la etiqueta al contenedor
          checkboxContainer.appendChild(checkbox);
          checkboxContainer.appendChild(label);

          // Agregar el contenedor al contenedor principal
          menuSelection.appendChild(checkboxContainer);
      });
  } catch (error) {
      console.error('Error loading menu options:', error);
  }
};

// Cargar clientes desde el servidor
const loadClients = async () => {
  try {
      const response = await fetch('http://localhost:3000/getComidaCliente');
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const clients = await response.json();

      const clientList = document.getElementById("client-container");
      clientList.innerHTML = "";

      clients.forEach((client) => {
          const clientDiv = document.createElement("div");
          clientDiv.className = "client-item";

          // Crear y agregar nombre del cliente
          const name = document.createElement("h3");
          name.textContent = `Cliente: ${client.nombre}`;
          clientDiv.appendChild(name);

          // Crear y agregar número de mesa
          const tableNumber = document.createElement("p");
          tableNumber.textContent = `Número de Mesa: ${client.numero_mesa}`;
          clientDiv.appendChild(tableNumber);

          // Crear y agregar descripción
          const description = document.createElement("p");
          description.textContent = `Descripción: ${client.descripcion ? client.descripcion : "N/A"}`;
          clientDiv.appendChild(description);

          // Crear y agregar lista de órdenes
          const orderList = document.createElement("ul");
          orderList.textContent = "Orden:";
          client.orden.forEach((orderItem) => {
              const listItem = document.createElement("li");
              listItem.textContent = `${orderItem.nombre} - $${orderItem.precio.toFixed(2)}`;
              orderList.appendChild(listItem);
          });
          clientDiv.appendChild(orderList);

          // Agregar el div del cliente al contenedor
          clientList.appendChild(clientDiv);
      });
  } catch (error) {
      console.error('Error loading clients:', error);
  }
};

// Añadir un alimento al menú
const addFoodToTable = async () => {
  const foodNameInput = document.getElementById("food-name");
  const foodDescriptionInput = document.getElementById("food-description");
  const foodPriceInput = document.getElementById("food-price");
  const foodImageInput = document.getElementById("food-image");
  const foodTypeSelect = document.getElementById("food-type");

  // Obtener los valores de los inputs
  const foodName = foodNameInput.value;
  const foodDescription = foodDescriptionInput.value;
  const foodPrice = foodPriceInput.value;
  const foodImage = foodImageInput.value;
  const foodType = foodTypeSelect.value;

  const disponibilidad = true;

  try {
      let response = await fetch('http://localhost:3000/addMenu', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              nombre: foodName,
              descripcion: foodDescription,
              precio: foodPrice,
              disponibilidad,
              imagen: foodImage,
              tipo: foodType
          }), // Enviar datos en JSON
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      response = await response.json();
      console.log('Food added to menu:', response);
  } catch (err) {
      console.error('Error adding food to menu:', err);
  }

  // El código adicional para actualizar el inventario y manejar la mesa ha sido comentado
  // await actualizarInventario(response.id_menu, 1); // Suponiendo que añadimos 1 unidad
};
