function renderizarCabanas(contenedor, arregloCabanas) {
    let html = '';
    
    arregloCabanas.forEach((cabana) => {
        html += `
        <article class="tarjeta">
            <div class="tarjeta__imagen">
                <img src="${cabana.imagen}" alt="${cabana.nombre}">
            </div>
            <h3 class="tarjeta__titulo">${cabana.nombre}</h3>
            <p style="margin-bottom: 15px; font-size: 0.9rem;">
                ${cabana.capacidad === 0 ? 'Área de uso común' : 'Hasta ' + cabana.capacidad + ' huéspedes'}
            </p>
            <button class="boton boton--oliva boton-info" data-id="${cabana.id}">MÁS INFORMACIÓN</button>
        </article>
        `;
    });
    
    contenedor.innerHTML = html;
}

function filtrarPorCapacidad(arregloCabanas, capacidadSeleccionada) {
    if (capacidadSeleccionada === "todas") {
        return arregloCabanas;
    }
    
    const personasBuscadas = parseInt(capacidadSeleccionada);
    
    const capacidadesDisponibles = arregloCabanas
        .filter(cabana => cabana.capacidad >= personasBuscadas)
        .map(cabana => cabana.capacidad);
        
    const capacidadIdeal = capacidadesDisponibles.length > 0 
        ? Math.min(...capacidadesDisponibles) 
        : -1; 
    
    return arregloCabanas.filter(cabana => 
        cabana.capacidad === capacidadIdeal || cabana.capacidad === 0
    );
}

export { renderizarCabanas, filtrarPorCapacidad };