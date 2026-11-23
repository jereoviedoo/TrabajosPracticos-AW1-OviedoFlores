export function inicializarFormulario() {
    const formularioContacto = document.getElementById('formulario-contacto');
    const botonEnviar = document.getElementById('btn-enviar-form');
    const modalExito = document.getElementById('modal-exito');
    const btnCerrarExito = document.getElementById('cerrar-modal-exito');
    const btnEntendido = document.getElementById('btn-entendido-exito');

    if (!formularioContacto) return;

    function cerrarModalExito() {
        if (typeof modalExito.close === 'function') modalExito.close();
        else modalExito.removeAttribute('open');
    }

    if (btnCerrarExito) btnCerrarExito.addEventListener('click', cerrarModalExito);
    if (btnEntendido) btnEntendido.addEventListener('click', cerrarModalExito);

    formularioContacto.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();

        if (nombre.length < 3) {
            alert('Por favor, ingresá tu nombre y apellido (mínimo 3 caracteres).');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            alert('Por favor, ingresá un correo electrónico válido.');
            return;
        }

        if (!/^[0-9]{8,}$/.test(telefono)) {
            alert('Por favor, ingresá un número de teléfono válido (solo números, mínimo 8 dígitos).');
            return;
        }

        const textoOriginal = botonEnviar.textContent;
        botonEnviar.textContent = 'Enviando...';
        botonEnviar.disabled = true;

        try {
            const datos = new FormData(formularioContacto);
            datos.append('access_key', 'ff86f6ae-5c0c-4a6c-9f78-bbbb9b588f94');

            const respuesta = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: datos
            });

            const resultado = await respuesta.json();

            if (resultado.success) {
                formularioContacto.reset();
                if (modalExito) {
                    if (typeof modalExito.showModal === 'function') modalExito.showModal();
                    else modalExito.setAttribute('open', '');
                }
            } else {
                alert('Hubo un problema al enviar tu consulta. Por favor, intentá nuevamente.');
            }
        } catch (error) {
            alert('Error de conexión. Por favor, verificá tu internet o escribinos por WhatsApp.');
        } finally {
            botonEnviar.textContent = textoOriginal;
            botonEnviar.disabled = false;
        }
    });
}