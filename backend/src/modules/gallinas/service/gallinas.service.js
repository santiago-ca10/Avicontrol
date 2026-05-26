const GallinasRepository =
    require('../repository/gallinas.repository');

const GalponesRepository =
    require('../../galpones/repository/galpones.repository');

const Gallina =
    require('../domain/gallinas.model');

const gallinasRepository =
    new GallinasRepository();

const galponesRepository =
    new GalponesRepository();


// GET ALL (soporta filtro por galpon_id)
exports.getAllGallinas = async (galpon_id = null) => {
    return await gallinasRepository.getAll(galpon_id);
};


// GET BY ID
exports.getGallinaById = async (id) => {

    if (!id) throw new Error('ID requerido');

    const gallina =
        await gallinasRepository.getById(id);

    if (!gallina) throw new Error('Gallina no encontrada');

    return new Gallina(gallina);
};


// CREATE
exports.createGallina = async (data) => {

    let { codigo, raza, edad, galpon_id } = data;

    if (!codigo || codigo.trim() === '') {
        throw new Error('Código obligatorio');
    }

    if (edad === undefined || edad === '' || edad < 0) {
        throw new Error('Edad inválida');
    }

    if (!galpon_id) {
        throw new Error('Galpón obligatorio');
    }

    codigo = codigo.trim().toUpperCase();

    // Validar código único
    const existentes =
        await gallinasRepository.getAll();

    const existe = existentes.find(
        g => g.codigo === codigo
    );

    if (existe) {
        throw new Error(
            'Ya existe una gallina con ese código'
        );
    }

    // Validar capacidad del galpón
    const galpon =
        await galponesRepository.stats(galpon_id);

    if (!galpon) {
        throw new Error('Galpón no encontrado');
    }

    if (galpon.total_gallinas >= galpon.capacidad) {
        throw new Error(
            'El galpón ya alcanzó su capacidad máxima'
        );
    }

    const gallina = new Gallina({
        codigo,
        raza,
        edad,
        galpon_id
    });

    return await gallinasRepository.create(gallina);
};


// UPDATE
exports.updateGallina = async (id, data) => {

    if (!id) throw new Error('ID requerido');

    const existe =
        await gallinasRepository.getById(id);

    if (!existe) throw new Error('Gallina no encontrada');

    return await gallinasRepository.update(id, data);
};


// DELETE
exports.deleteGallina = async (id) => {

    if (!id) throw new Error('ID requerido');

    const existe =
        await gallinasRepository.getById(id);

    if (!existe) throw new Error('Gallina no encontrada');

    return await gallinasRepository.delete(id);
};
