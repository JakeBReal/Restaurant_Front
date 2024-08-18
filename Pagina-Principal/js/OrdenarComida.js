// occupiedTables.js

document.querySelector('a[href="#add-rooms"]').addEventListener('click', function(event) {
  event.preventDefault(); // Previene el comportamiento predeterminado del enlace

  // Oculta todas las secciones
  document.querySelectorAll('div[id^="add-"]').forEach(function(section) {
    section.style.display = 'none';
  });

  // Muestra la sección de "Agregar Mesas"
  document.getElementById('add-rooms').style.display = 'block';
});




const loadOccupiedTables = async () => {
    try {
      const response = await fetch('http://localhost:3000/mesaOcupada');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const menuItems = await response.json();
      const occupiedTablesSelect = document.getElementById("occupied-tables");
      occupiedTablesSelect.innerHTML = "";
  
      menuItems.forEach((table) => {
        const option = document.createElement("option");
        option.value = table.id_cliente;
        option.textContent = `Mesa ${table.id_mesa} - ${table.nombre}`;
        occupiedTablesSelect.appendChild(option);
      });
    } catch (err) {
      console.error('Error loading occupied tables:', err);
    }
  };
                
                const addTables = async () => {
                  const capacidadtableInput = document.getElementById("capacity-table");
                  const tabaleImageInput = document.getElementById("table-image");
                
                  // Obtener los valores de los inputs
                  const capacidadtable = capacidadtableInput.value;
                  const tabaleImage = tabaleImageInput.value;
                  
                
                  const disponibilidad = true;
                
                  try {
                    let response = await fetch('', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        capacidad: foodName,
                        imagen: foodImage,
                        
                      }), // Enviar datos en JSON
                    });
                
                    if (!response.ok) {
                      throw new Error('Network response was not ok');
                    }
                
                    response = await response.json();
                    console.log('Table added :', response);
                    
                  } catch (err) {
                    console.error('Error adding table:', err);
                  }
                };




                
    
  
  const addFoodToTable = async () => {
    const foodNameInput = document.getElementById("food-name");
    const foodDescriptionInput = document.getElementById("food-description");
    const cantidad = document.getElementById("food-cantidad");
    const foodPriceInput = document.getElementById("food-price");
    const foodImageInput = document.getElementById("food-image");
    const foodTypeSelect = document.getElementById("food-type");
  
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
  
  // Exportar las funciones para que puedan ser utilizadas en otros archivos
  export { loadOccupiedTables, addFoodToTable };
  