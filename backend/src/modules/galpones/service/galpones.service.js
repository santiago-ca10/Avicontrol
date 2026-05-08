const galponRepository =
    require('../repository/galpones.repository');

// ===============================
// OBTENER TODOS
// ===============================
exports.getAllGalpones = async () => {
    return await galponRepository.getAll();
};

// ===============================
// OBTENER POR ID
// ===============================
exports.getGalponById = async (id) => {

    if (!id) {
        throw new Error('ID requerido');
    }

    const galpon =
        await galponRepository.getById(id);

    if (!galpon) {
        throw new Error('Galpón no encontrado');
    }

    return galpon;
};

// ===============================
// CREAR
// ===============================
exports.createGalpon = async (data) => {

    let { nombre, capacidad } = data;

    if (!nombre || nombre.trim() === '') {
        throw new Error('Nombre obligatorio');
    }

    if (!capacidad || capacidad <= 0) {
        throw new Error('Capacidad inválida');
    }

    nombre = nombre.trim();

    return await galponRepository.create(nombre, capacidad);
};

// ===============================
// ACTUALIZAR
// ===============================
exports.updateGalpon = async (id, data) => {

    const { nombre, capacidad } = data;

    if (!id) {
        throw new Error('ID requerido');
    }

    return await galponRepository.update(id, nombre, capacidad);
};

// ===============================
// ELIMINAR
// ===============================
exports.deleteGalpon = async (id) => {

    if (!id) {
        throw new Error('ID requerido');
    }

    return await galponRepository.delete(id);
};