// document.addEventListener('DOMContentLoaded', () => {
//     const navbarLinks = document.querySelectorAll('.navbar a:not([href="#home"])');
//     const sections = document.querySelectorAll('.section');
//     const homeTitle = document.querySelector('.content h1');

//     navbarLinks.forEach(link => {
//         link.addEventListener('click', (event) => {
//             event.preventDefault();

//             const targetId = event.target.getAttribute('href').substring(1);
//             sections.forEach(section => {
//                 if (section.id === targetId) {
//                     section.style.display = 'block';
//                 } else {
//                     section.style.display = 'none';
//                 }
//             });

//             // Ocultar el mensaje de bienvenida cuando se selecciona una sección
//             homeTitle.style.display = 'none';
//         });
//     });

//     // Mostrar solo el mensaje de bienvenida por defecto
//     sections.forEach(section => section.style.display = 'none');
//     homeTitle.style.display = 'block';
// });


document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = section.id === targetId ? 'block' : 'none';
        });
    });
});



    // // Mostrar la primera sección por defecto
    // if (sections.length > 0) {
    //     sections[0].style.display = 'block';
    // }



// document.addEventListener('DOMContentLoaded', () => {
//     const navLinks = document.querySelectorAll('.navbar ul li a');
//     const sections = document.querySelectorAll('.section');

//     navLinks.forEach(link => {
//         link.addEventListener('click', (event) => {
//             event.preventDefault();
//             const sectionId = event.target.getAttribute('href').substring(1); // Extrae el id sin el #

//             // Ocultar todas las secciones
//             sections.forEach(section => {
//                 section.classList.remove('active');
//             });

//             // Mostrar la sección seleccionada
//             const activeSection = document.getElementById(sectionId);
//             if (activeSection) {
//                 activeSection.classList.add('active');
//             }
//         });
//     });

    

    // Mostrar la primera sección por defecto (opcional)
    // if (sections.length > 0) {
    //     sections[0].classList.add('active');
    // }
