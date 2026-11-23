import { renderizarCabanas, filtrarPorCapacidad } from './funciones.js';
import { inicializarMenu } from './menu.js';
import { inicializarFiltro } from './filtro.js';
import { inicializarModales, activarBotonesModal } from './modales.js';
import { inicializarGaleria } from './galeria.js';
import { inicializarFormulario } from './formulario.js';

document.addEventListener('DOMContentLoaded', async () => {
    const contenedorCabanas = document.getElementById('contenedor-cabanas');

    inicializarMenu();
    inicializarModales();
    inicializarGaleria();
    inicializarFormulario();

    if (contenedorCabanas) {
        try {
            const respuesta = await fetch('src/recursos/data/cabanas.json');
            if (!respuesta.ok) {
                throw new Error('No se pudo cargar el archivo de cabañas');
            }
            const datosCabanas = await respuesta.json();
            const filtroGuardado = localStorage.getItem('filtroCapacidad') || 'todas';
            const cabanasIniciales = filtrarPorCapacidad(datosCabanas, filtroGuardado);

            renderizarCabanas(contenedorCabanas, cabanasIniciales);
            activarBotonesModal(contenedorCabanas, datosCabanas);
            inicializarFiltro(contenedorCabanas, datosCabanas, filtroGuardado);
        } catch (error) {
            console.error('Error al cargar las cabañas:', error);
            contenedorCabanas.innerHTML = '<p>No se pudieron cargar las cabañas en este momento.</p>';
        }
    }
});