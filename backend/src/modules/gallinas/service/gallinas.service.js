const GallinasRepository =
    require('../repository/gallinas.repository');

const GalponesRepository =
    require('../../galpones/repository/galpones.repository');

const gallinasRepository = new GallinasRepository();
const galponesRepository = new GalponesRepository();


// GET ALL
exports.getAllGallinas = async (galpon_id = null) => {
    return await gallinasRepository.getAll(galpon_id);
};


// GET BY ID
exports.getGallinaById = async (id) => {

    if (!id) throw new Error('ID requerido');

    const gallina =
        await gallinasRepository.getById(id);

    if (!gallina) throw new Error('Gallina no encontrada');

    return gallina;
};


// CREATE LOTE
exports.createLote = async (data) => {

    let {
        raza,
        edad,
        cantidad,
        galpon_id,
        fecha_ingreso,
    } = data;

    if (!raza || raza.trim() === '') {
        throw new Error('Raza obligatoria');
    }

    if (!cantidad || cantidad < 1) {
        throw new Error('La cantidad debe ser mayor a 0');
    }

    if (!galpon_id) {
        throw new Error('Galpón obligatorio');
    }

    cantidad = parseInt(cantidad);
    raza = raza.trim();
    fecha_ingreso = fecha_ingreso ||
        new Date().toISOString().split('T')[0];

    // Validar capacidad disponible
    const galpon =
        await galponesRepository.stats(galpon_id);

    if (!galpon) {
        throw new Error('Galpón no encontrado');
    }

    const disponible =
        galpon.capacidad - galpon.total_gallinas;

    if (cantidad > disponible) {
        throw new Error(
            `Espacio insuficiente. El galpón tiene ${disponible} lugar(es) disponible(s)`
        );
    }

    // Construir filas del lote
    const filas = Array.from({ length: cantidad }, () => ({
        raza,
        edad: edad || 0,
        estado: 'activa',
        galpon_id,
        fecha_ingreso,
    }));

    return await gallinasRepository.createLote(filas);
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
