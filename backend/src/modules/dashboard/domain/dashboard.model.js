class Dashboard {

    constructor({
        totalGallinas,
        totalGalpones,
        produccionHoy,
        mortalidadHoy
    }) {

        this.totalGallinas = totalGallinas;
        this.totalGalpones = totalGalpones;
        this.produccionHoy = produccionHoy;
        this.mortalidadHoy = mortalidadHoy;
    }

}

module.exports = Dashboard;