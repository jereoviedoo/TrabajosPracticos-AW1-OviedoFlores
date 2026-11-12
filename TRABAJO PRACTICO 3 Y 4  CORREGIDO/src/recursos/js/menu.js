export function inicializarMenu() {
    const btnMenu = document.getElementById('btn-menu');
    const navMenu = document.getElementById('nav-menu');
    const enlacesMenu = document.querySelectorAll('.header__enlace');

    if (btnMenu && navMenu) {
        btnMenu.addEventListener('click', () => {
            navMenu.classList.toggle('activo');
        });

        enlacesMenu.forEach(enlace => {
            enlace.addEventListener('click', () => {
                navMenu.classList.remove('activo');
            });
        });
    }
}