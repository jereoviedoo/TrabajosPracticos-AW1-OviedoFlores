import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { filtrarPorCapacidad, validarTelefono } from '../src/recursos/js/funciones.js';

const cabanasPrueba = [
    { id: 1, nombre: 'Cabaña A', capacidad: 2 },
    { id: 2, nombre: 'Cabaña B', capacidad: 4 },
    { id: 3, nombre: 'Cabaña C', capacidad: 6 },
    { id: 4, nombre: 'Quincho y Pileta', capacidad: 0 }
];

describe('Tests de filtrarPorCapacidad()', () => {
    it('Devuelve todas las unidades cuando se selecciona "todas"', () => {
        const resultado = filtrarPorCapacidad(cabanasPrueba, 'todas');
        assert.equal(resultado.length, 4);
    });

    it('Aplica capacidad ideal para 3 personas (devuelve la de 4 + área común)', () => {
        const resultado = filtrarPorCapacidad(cabanasPrueba, '3');
        assert.equal(resultado.length, 2);
        assert.equal(resultado[0].nombre, 'Cabaña B');
        assert.equal(resultado[1].nombre, 'Quincho y Pileta');
    });
});

describe('Tests de validarTelefono()', () => {
    it('Acepta un número válido de 10 dígitos', () => {
        assert.equal(validarTelefono('3517330404'), true);
    });

    it('Rechaza números con letras o menos de 8 dígitos', () => {
        assert.equal(validarTelefono('12345'), false);
        assert.equal(validarTelefono('351abc0404'), false);
    });
});