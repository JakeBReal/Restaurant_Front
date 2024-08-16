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




                document.getElementById('addTableForm').addEventListener('submit', function(event) {
                  event.preventDefault(); // Previene el comportamiento por defecto del formulario
                
                  const capacidad = document.getElementById('capacidad').value;
                  const estado = document.getElementById('estado').value;
                  const imagen = document.getElementById('imagen').value || 'https://via.placeholder.com/100'; // Imagen por defecto
                
                  // Crear un nuevo elemento de lista para la mesa añadida
                  const newMesa = document.createElement('li');
                  newMesa.innerHTML = `
                    <strong>Capacidad:</strong> ${capacidad} <br>
                    <strong>Estado:</strong> ${estado} <br>
                    <img src="${imagen}" alt="Imagen de la mesa" style="width: 100px; height: 100px;"><br>
                  `;
                
                  // Añadir la nueva mesa a la lista
                  document.getElementById('mesas').appendChild(newMesa);
                
                  // Limpiar el formulario después de añadir la mesa
                  document.getElementById('addTableForm').reset();
                });
                
                  













  
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
          disponibilidad: disponibilidad,
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
  };
  
  // Exportar las funciones para que puedan ser utilizadas en otros archivos
  export { loadOccupiedTables, addFoodToTable };
  