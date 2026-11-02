import { datosCabanas } from './cabanas.js';
import { renderizarCabanas, filtrarPorCapacidad } from './funciones.js';

const contenedorCabanas = document.getElementById('contenedor-cabanas');
const filtroCustom = document.getElementById('filtro-custom');
const filtroSeleccionado = document.getElementById('filtro-seleccionado');
const opcionesFiltro = document.querySelectorAll('.filtro-custom__opcion');

const dialogo = document.getElementById('modal-info');
const botonCerrar = document.getElementById('cerrar-modal');
const tituloModal = document.getElementById('modal-titulo');
const subtituloModal = document.getElementById('modal-subtitulo');
const descripcionModal = document.getElementById('modal-descripcion');
const botonReservarModal = document.getElementById('btn-reservar-modal');
const btnVerFotosModal = document.getElementById('btn-ver-fotos-modal');
const selectFormulario = document.getElementById('cabana-reserva');

const btnMenu = document.getElementById('btn-menu');
const navMenu = document.getElementById('nav-menu');
const enlacesMenu = document.querySelectorAll('.header__enlace');

const btnVerMasGaleria = document.getElementById('btn-ver-mas-galeria');
const itemsGaleriaOcultos = document.querySelectorAll('.galeria__item--oculto, .galeria__item--oculto-pc'); 
const lightbox = document.getElementById('lightbox-galeria');
const lightboxImg = document.getElementById('lightbox-img');
const btnCerrarLightbox = document.getElementById('cerrar-lightbox');
const todasLasImagenesGaleria = document.querySelectorAll('.galeria__item img');

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
if (contenedorCabanas) {
    renderizarCabanas(contenedorCabanas, datosCabanas);
    activarBotonesModal();
}
if (filtroSeleccionado && filtroCustom) {
    filtroSeleccionado.addEventListener('click', () => {
        filtroCustom.classList.toggle('activo');
    });

    opcionesFiltro.forEach((opcion) => {
        opcion.addEventListener('click', () => {
            filtroSeleccionado.textContent = opcion.textContent;
            opcionesFiltro.forEach(o => o.classList.remove('seleccionado'));
            opcion.classList.add('seleccionado');
            filtroCustom.classList.remove('activo');
            
            const valorFiltro = opcion.dataset.value;
            const cabanasFiltradas = filtrarPorCapacidad(datosCabanas, valorFiltro);
            
            renderizarCabanas(contenedorCabanas, cabanasFiltradas);
            activarBotonesModal(); 
        });
    });

    document.addEventListener('click', (evento) => {
        if (!filtroCustom.contains(evento.target)) filtroCustom.classList.remove('activo');
    });
}

function activarBotonesModal() {
    const botonesInfo = contenedorCabanas.querySelectorAll('.boton-info');
    
    botonesInfo.forEach((boton) => {
        boton.addEventListener('click', () => {
            const idCabana = parseInt(boton.dataset.id);
            const cabanaSeleccionada = datosCabanas.find((cabana) => cabana.id === idCabana);
            
            if (cabanaSeleccionada && dialogo) {
                if (tituloModal) tituloModal.textContent = cabanaSeleccionada.nombre;
                if (subtituloModal) subtituloModal.textContent = cabanaSeleccionada.capacidad === 0 ? `ÁREA DE USO COMÚN` : `CAPACIDAD: HASTA ${cabanaSeleccionada.capacidad} HUÉSPEDES`;
                if (descripcionModal) descripcionModal.textContent = cabanaSeleccionada.descripcion;
                if (selectFormulario && cabanaSeleccionada.valorSelect) selectFormulario.value = cabanaSeleccionada.valorSelect;
                
                if (botonReservarModal) {
                    const numeroWhatsApp = "5493517330404"; 
                    const mensaje = `Hola Cabañas Suyana, quisiera consultar disponibilidad y precios para la ${cabanaSeleccionada.nombre}.`;
                    botonReservarModal.href = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
                }
                
                if (typeof dialogo.showModal === 'function') dialogo.showModal();
                else dialogo.setAttribute('open', '');
            }
        });
    });
}

function cerrarModal() {
    if (typeof dialogo.close === 'function') dialogo.close();
    else dialogo.removeAttribute('open');
}

if (botonCerrar && dialogo) botonCerrar.addEventListener('click', cerrarModal);
if (btnVerFotosModal && dialogo) btnVerFotosModal.addEventListener('click', cerrarModal);
if (botonReservarModal && dialogo) botonReservarModal.addEventListener('click', cerrarModal);

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

const formularioContacto = document.getElementById('formulario-contacto');

if (formularioContacto) {
    formularioContacto.addEventListener('submit', (evento) => {
        evento.preventDefault();
        alert("¡Mensaje enviado con éxito! Nos contactaremos a la brevedad.");
        formularioContacto.reset();
    });
}