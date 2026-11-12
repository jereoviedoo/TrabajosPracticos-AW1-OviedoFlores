export function activarBotonesModal(contenedorCabanas, datosCabanas) {
    const dialogo = document.getElementById('modal-info');
    const tituloModal = document.getElementById('modal-titulo');
    const subtituloModal = document.getElementById('modal-subtitulo');
    const descripcionModal = document.getElementById('modal-descripcion');
    const botonReservarModal = document.getElementById('btn-reservar-modal');
    const selectFormulario = document.getElementById('cabana-reserva');
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

export function inicializarModales() {
    const dialogo = document.getElementById('modal-info');
    const botonCerrar = document.getElementById('cerrar-modal');
    const btnVerFotosModal = document.getElementById('btn-ver-fotos-modal');
    const botonReservarModal = document.getElementById('btn-reservar-modal');

    function cerrarModal() {
        if (typeof dialogo.close === 'function') dialogo.close();
        else dialogo.removeAttribute('open');
    }

    if (botonCerrar && dialogo) botonCerrar.addEventListener('click', cerrarModal);
    if (btnVerFotosModal && dialogo) btnVerFotosModal.addEventListener('click', cerrarModal);
    if (botonReservarModal && dialogo) botonReservarModal.addEventListener('click', cerrarModal);
}