import { datosCabanas } from './cabanas.js';
import { renderizarCabanas, filtrarPorCapacidad } from './funciones.js';
import { activarBotonesModal } from './modales.js';

export function inicializarFiltro(contenedorCabanas) {
    const filtroCustom = document.getElementById('filtro-custom');
    const filtroSeleccionado = document.getElementById('filtro-seleccionado');
    const opcionesFiltro = document.querySelectorAll('.filtro-custom__opcion');

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
                activarBotonesModal(contenedorCabanas, datosCabanas);
            });
        });

        document.addEventListener('click', (evento) => {
            if (!filtroCustom.contains(evento.target)) filtroCustom.classList.remove('activo');
        });
    }
}