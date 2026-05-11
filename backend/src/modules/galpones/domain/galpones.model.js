class Galpon {

    constructor({
        id,
        nombre,
        capacidad
    }) {

        this.id = id;
        this.nombre = nombre;
        this.capacidad = capacidad;
    }

    estaLleno(cantidadAves) {

        return cantidadAves >= this.capacidad;

    }

}

module.exports = Galpon;