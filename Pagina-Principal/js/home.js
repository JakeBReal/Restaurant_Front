document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.querySelector('a[href="#home"]');
    const sections = document.querySelectorAll('.section');
    const homeTitle = document.querySelector('.content h1');

    homeLink.addEventListener('click', (event) => {
        event.preventDefault();

        // Ocultar todas las secciones
        sections.forEach(section => {
            section.style.display = 'none';
        });

        // Mostrar mensaje de bienvenida
        homeTitle.style.display = 'block';
    });
});

