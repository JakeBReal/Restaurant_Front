// document.addEventListener('DOMContentLoaded', () => {
//     const welcomeHeading = document.getElementById('welcome');
//     const sections = document.querySelectorAll('.section');
//     const body = document.body;

//     welcomeHeading.addEventListener('click', () => {
//         // Ocultar todas las secciones
//         sections.forEach(section => {
//             section.classList.remove('active');
//         });

//         // Mostrar el fondo inicial
//         body.style.backgroundImage = "url('restaurantFONDO.jpg')";
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const welcomeHeading = document.getElementById('welcome');
    const sections = document.querySelectorAll('.section');
    const body = document.body;

    welcomeHeading.addEventListener('click', () => {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show the initial background
        body.style.backgroundImage = "url('restaurantFONDO.jpg')";
    });
});
