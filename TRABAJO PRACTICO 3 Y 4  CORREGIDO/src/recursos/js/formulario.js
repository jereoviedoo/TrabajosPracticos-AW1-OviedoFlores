export function inicializarFormulario() {
    const formularioContacto = document.getElementById('formulario-contacto');

    if (formularioContacto) {
        formularioContacto.addEventListener('submit', (evento) => {
            evento.preventDefault();
            alert("¡Mensaje enviado con éxito! Nos contactaremos a la brevedad.");
            formularioContacto.reset();
        });
    }
}