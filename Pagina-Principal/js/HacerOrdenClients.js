document.addEventListener("DOMContentLoaded", async () => {
  loadOccupiedTables();
  loadMenuOptions();
  loadClients();
  loadMenuOptions1()

  const editButton = document.getElementById('edit-button');

  editButton.addEventListener('click', async () => {
    const userConfirmed = confirm('¿Estás seguro que deseas eliminar ese alimento?');
    if (userConfirmed) {
      const id_cliente = document.getElementById("occupied-tables").value
      const id_menu = document.getElementById("food-selection").value

      const responseMesa = await fetch(`http://localhost:3000/deleteComidaCliente?id_cliente=${id_cliente}&id_menu=${id_menu}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!responseMesa.ok) {
        throw new Error('Network response was not ok');
    }

    const result = await responseMesa.json();
    if(result.ok){
      alert('El alimento se eliminó correctamente')
    }else{
      alert('El cliente no tiene agregado es alimento')
    }
    
    loadOccupiedTables();
    loadMenuOptions();
    loadClients();
    loadMenuOptions1()

    } 

  });


  const accountsMenu = document.getElementById('clients');

  accountsMenu.addEventListener('click', () => {
    loadOccupiedTables();
    loadMenuOptions();
    loadClients();
    loadMenuOptions1()
  });



  const form = document.getElementById("add-food-form");
  form.addEventListener("submit", async (e) => {
   // e.preventDefault(); // Evita la recarga de la página
    addFoodToTable();
    form.reset();
    loadClients(); // Refresca la lista de clientes
    // Mantener la pestaña activa
    // document.querySelector('.navbar ul li a[href="#clients"]').click();
  });

  const addFoodToCliente= async () => {

   const occupiedTablesSelect = document.getElementById("occupied-tables")
   const foodSelection = document.getElementById("food-selection")

   let cantidad = prompt("¿Cuántas cantidad de esta comida quieres pedir?");
   cantidad = parseInt(cantidad, 10);

   const responseMesa= await fetch('http://localhost:3000/addComidaCliente', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id_cliente:occupiedTablesSelect.value,id_menu:foodSelection.value,disponibilidad:true,cantidad}), // Enviar datos en JSON
});

loadClients()

    
  };
  


  const form1 = document.getElementById("add-food-form1");
  form1.addEventListener("submit", async (e) => {
    e.preventDefault();
    addFoodToCliente();
 
    // addFoodToTable();
    // form1.reset();
    // loadClients(); // Refresca la lista de clientes
    // Mantener la pestaña activa
    // document.querySelector('.navbar ul li a[href="#clients"]').click();
  });

});




const loadMenuOptions1 = async () => {
    const response = await fetch('http://localhost:3000/menuDisponible');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const menuItems = await response.json();
    const menuSelection = document.getElementById("food-selection");
    if (!menuSelection) {
      console.error("El contenedor #menu-selection no se encuentra");
      return;
    }
  
    menuSelection.innerHTML = ""; // Limpia el contenedor antes de agregar nuevos checkboxes
  
    menuItems.forEach((item) => {


        const option = document.createElement("option");
            option.value = item.id_menu;
            option.textContent = `${item.nombre}`;
            menuSelection.appendChild(option);
      // Crear el contenedor del checkbox
      const checkboxContainer = document.createElement("div");
      checkboxContainer.className = "menu-item";
  
      // Crear el checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `menu-item-${item.id_menu}`;
      checkbox.value = item.id_menu;
      checkbox.checked = false
  
      checkbox.addEventListener('change', async (event) => {

        const occupiedTablesSelect = document.getElementById("occupied-tables")
          const id_menu = event.target.value; 
          const disponibilidad = event.target.checked; 
  
          const responseMesa= await fetch('http://localhost:3000/addComidaCliente', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id_cliente:occupiedTablesSelect.value,id_menu,disponibilidad}), // Enviar datos en JSON
          });
  
          loadClients()
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
  };
  
// Cargar mesas ocupadas (datos estáticos)
const loadOccupiedTables = async () => {

      
  const response = await fetch('http://localhost:3000/mesaOcupada');
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  const menuItems = await response.json();


  const tables = menuItems
  const occupiedTablesSelect = document.getElementById("occupied-tables");
  occupiedTablesSelect.innerHTML = "";

  tables.forEach((table) => {
    const option = document.createElement("option");
    option.value = table.id_cliente;
    option.textContent = `Mesa ${table.id_mesa} - ${table.nombre}`;
    occupiedTablesSelect.appendChild(option);
  });
};

// Cargar opciones del menú (datos estáticos)
const loadMenuOptions = async () => {
  console.log("loadMenuOptions called"); // Verifica si la función se está ejecutando

  
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

    checkbox.addEventListener('change', async (event) => {
        const id_menu = event.target.value; 
        const disponibilidad = event.target.checked; 

        const responseMesa= await fetch('http://localhost:3000/updateStatusMenu', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_menu,disponibilidad}), // Enviar datos en JSON
        });

        loadMenuOptions()
        
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
};




// Cargar clientes (datos estáticos)
const loadClients = async () => {


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

    const name = document.createElement("h3");
    name.textContent = `Cliente: ${client.nombre}`;

    const tableNumber = document.createElement("p");
    tableNumber.textContent = `Número de Mesa: ${client.numero_mesa}`;

    const description = document.createElement("p");
    description.textContent = `Descripción: ${
      client.descripcion ? client.descripcion : "N/A"
    }`;

    const orderList = document.createElement("ul");
    orderList.textContent = "Orden:";
    client.orden.forEach((orderItem) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${orderItem.nombre} - $${orderItem.precio.toFixed(
        2
      )} cantidad: ${orderItem.cantidad}`;
      orderList.appendChild(listItem);
    });

    clientDiv.appendChild(name);
    clientDiv.appendChild(tableNumber);
    clientDiv.appendChild(description);
    clientDiv.appendChild(orderList);
    clientList.appendChild(clientDiv);
  });
};

// Agregar alimentos a la mesa
const addFoodToTable = async () => {
  const foodNameInput = document.getElementById("food-name");
  const foodDescriptionInput = document.getElementById("food-description");
  const foodPriceInput = document.getElementById("food-price");
  const foodImageInput = document.getElementById("food-image");
  const foodTypeSelect = document.getElementById("food-type");
  const cantidad = document.getElementById("food-cantidad");


  // Obtener los valores de los inputs
  const foodName = foodNameInput.value;
  const foodDescription = foodDescriptionInput.value;
  const foodPrice = foodPriceInput.value;
  const foodImage = foodImageInput.value;
  const foodType = foodTypeSelect.value;
  const foodCantidad = cantidad.value;



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
        disponibilidad: disponibilidad,
        imagen: foodImage,
        tipo: foodType,
        cantidad: foodCantidad
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

};
