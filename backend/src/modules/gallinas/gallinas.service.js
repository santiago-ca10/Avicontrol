const gallinasRepository = require('./gallinas.repository');


// GET ALL
exports.getAllGallinas = async () => {
    return await gallinasRepository.getAll();
};


// GET BY ID
exports.getGallinaById = async (id) => {

    if (!id) {
        throw new Error('ID requerido');
    }

    const gallina =
        await gallinasRepository.getById(id);

    if (!gallina) {
        throw new Error('Gallina no encontrada');
    }

    return gallina;
};


// CREATE
exports.createGallina = async (data) => {

    let { codigo, raza, edad, galpon_id } = data;

    if (!codigo || codigo.trim() === '') {
        throw new Error('Código obligatorio');
    }

    if (!edad || edad < 0) {
        throw new Error('Edad inválida');
    }

    codigo = codigo.trim().toUpperCase();

    if (raza) {
        raza = raza
            .toLowerCase()
            .split(' ')
            .map(p => p.charAt(0).toUpperCase() + p.slice(1))
            .join(' ');
    }

    const existentes =
        await gallinasRepository.getAll();

    const existe = existentes.find(
        g => g.codigo === codigo
    );

    if (existe) {
        throw new Error('Ya existe una gallina con ese código');
    }

    return await gallinasRepository.create({
        codigo,
        raza,
        edad,
        galpon_id
    });
};


// UPDATE
exports.updateGallina = async (id, data) => {

    if (!id) {
        throw new Error('ID requerido');
    }

    return await gallinasRepository.update(id, data);
};


// DELETE
exports.deleteGallina = async (id) => {

    if (!id) {
        throw new Error('ID requerido');
    }

    return await gallinasRepository.delete(id);
};