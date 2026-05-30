class Galpon {

    constructor({
        id,
        nombre,
        capacidad,
        estado = 'activo',
        created_at
    }) {
        this.id         = id;
        this.nombre     = nombre;
        this.capacidad  = capacidad;
        this.estado     = estado;
        this.created_at = created_at;
    }

    estaLleno(cantidadAves) {
        return cantidadAves >= this.capacidad;
    }

    espacioDisponible(cantidadAves) {
        return this.capacidad - cantidadAves;
    }

}

module.exports = Galpon;
