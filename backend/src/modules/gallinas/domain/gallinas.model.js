class Gallina {

    constructor({
        id,
        codigo,
        raza,
        edad,
        estado,
        galpon_id
    }) {

        this.id = id;
        this.codigo = codigo;
        this.raza = raza;
        this.edad = edad;
        this.estado = estado;
        this.galpon_id = galpon_id;
    }

    esProductiva() {
        return this.edad >= 5;
    }

}

module.exports = Gallina;