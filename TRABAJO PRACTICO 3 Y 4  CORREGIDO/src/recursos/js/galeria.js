export function inicializarGaleria() {
    const btnVerMasGaleria = document.getElementById('btn-ver-mas-galeria');
    const itemsGaleriaOcultos = document.querySelectorAll('.galeria__item--oculto, .galeria__item--oculto-pc'); 
    const lightbox = document.getElementById('lightbox-galeria');
    const lightboxImg = document.getElementById('lightbox-img');
    const btnCerrarLightbox = document.getElementById('cerrar-lightbox');
    const todasLasImagenesGaleria = document.querySelectorAll('.galeria__item img');

    if (btnVerMasGaleria) {
        btnVerMasGaleria.addEventListener('click', () => {
            const expandir = btnVerMasGaleria.textContent.trim() === 'VER MÁS';
            
            itemsGaleriaOcultos.forEach(item => {
                if (expandir) {
                    item.classList.add('mostrar');
                } else {
                    item.classList.remove('mostrar');
                }
            });
            
            btnVerMasGaleria.textContent = expandir ? 'VER MENOS' : 'VER MÁS';
        });
    }

    todasLasImagenesGaleria.forEach(img => {
        img.addEventListener('click', () => {
            if(lightbox && lightboxImg) {
                lightboxImg.src = img.src;
                if (typeof lightbox.showModal === 'function') lightbox.showModal();
                else lightbox.setAttribute('open', '');
            }
        });
    });

    if (btnCerrarLightbox && lightbox) {
        btnCerrarLightbox.addEventListener('click', () => {
            if (typeof lightbox.close === 'function') lightbox.close();
            else lightbox.removeAttribute('open');
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (evento) => {
            if (evento.target === lightbox) {
                if (typeof lightbox.close === 'function') lightbox.close();
                else lightbox.removeAttribute('open');
            }
        });
    }
}