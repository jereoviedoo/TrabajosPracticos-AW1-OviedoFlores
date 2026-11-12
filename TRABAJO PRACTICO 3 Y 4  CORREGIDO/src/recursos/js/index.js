import { datosCabanas } from './cabanas.js';
import { renderizarCabanas } from './funciones.js';
import { inicializarMenu } from './menu.js';
import { inicializarFiltro } from './filtro.js';
import { inicializarModales, activarBotonesModal } from './modales.js';
import { inicializarGaleria } from './galeria.js';
import { inicializarFormulario } from './formulario.js';

document.addEventListener('DOMContentLoaded', () => {
    const contenedorCabanas = document.getElementById('contenedor-cabanas');

    inicializarMenu();
    
    if (contenedorCabanas) {
        renderizarCabanas(contenedorCabanas, datosCabanas);
        activarBotonesModal(contenedorCabanas, datosCabanas);
        inicializarFiltro(contenedorCabanas);
    }
    
    inicializarModales();
    inicializarGaleria();
    inicializarFormulario();
});