const GalponesRepository =
    require('../repository/galpones.repository');

const Galpon =
    require('../domain/galpones.model');

const galponesRepository =
    new GalponesRepository();


// GET ALL
exports.getAllGalpones = async () => {

    return await galponesRepository.getAll();

};


// GET BY ID
exports.getGalponById = async (id) => {

    if (!id) {
        throw new Error('ID requerido');
    }

    const galpon =
        await galponesRepository.getById(id);

    if (!galpon) {
        throw new Error('Galpón no encontrado');
    }

    return new Galpon(galpon);

};

// GET STATS
exports.getGalponStats = async (id) => {

    if (!id) {
        throw new Error('ID requerido');
    }

    const stats =
        await galponesRepository.stats(id);

    if (!stats) {
        throw new Error('Galpón no encontrado');
    }

    return stats;
};

// CREATE
exports.createGalpon = async (data) => {

    let {
        nombre,
        capacidad
    } = data;

    if (!nombre || nombre.trim() === '') {
        throw new Error('Nombre obligatorio');
    }

    if (!capacidad || capacidad <= 0) {
        throw new Error('Capacidad inválida');
    }

    nombre = nombre.trim();

    const galpon =
        new Galpon({
            nombre,
            capacidad
        });

    return await galponesRepository.create(
        galpon
    );

};


// UPDATE
exports.updateGalpon = async (id, data) => {

    if (!id) {
        throw new Error('ID requerido');
    }

    return await galponesRepository.update(
        id,
        data
    );

};


// DELETE
exports.deleteGalpon = async (id) => {

    if (!id) {
        throw new Error('ID requerido');
    }

    return await galponesRepository.delete(id);

};
