class Produccion {

    constructor({
        id,
        galpon_id,
        fecha,
        huevos,
        aves_activas,
        mortalidad,
        alimento_kg,
        observaciones
    }) {

        this.id = id;
        this.galpon_id = galpon_id;
        this.fecha = fecha;
        this.huevos = huevos;
        this.aves_activas = aves_activas;
        this.mortalidad = mortalidad;
        this.alimento_kg = alimento_kg;
        this.observaciones = observaciones;
    }

    porcentajePostura() {

        if (this.aves_activas <= 0) {
            return 0;
        }

        return (
            (this.huevos / this.aves_activas) * 100
        ).toFixed(2);

    }

    mortalidadAlta() {

        return this.mortalidad > 5;

    }

}

module.exports = Produccion;