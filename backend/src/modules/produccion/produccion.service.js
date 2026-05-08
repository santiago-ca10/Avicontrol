const produccionRepository =
    require('./produccion.repository');


// ===============================
// CREAR PRODUCCIÓN
// ===============================
exports.createProduccion = async (data) => {

    const {
        galpon_id,
        fecha,
        huevos,
        aves_activas,
        mortalidad,
        alimento_kg,
        observaciones
    } = data;

    // 🔹 VALIDACIONES
    if (!galpon_id) {
        throw new Error('Galpón obligatorio');
    }

    if (!fecha) {
        throw new Error('Fecha obligatoria');
    }

    if (huevos < 0) {
        throw new Error('Huevos no pueden ser negativos');
    }

    if (aves_activas < 0) {
        throw new Error('Aves activas inválidas');
    }

    if (mortalidad < 0) {
        throw new Error('Mortalidad inválida');
    }

    if (alimento_kg < 0) {
        throw new Error('Alimento inválido');
    }

    // 🔹 REGLA DE NEGOCIO
    // no más huevos que aves activas
    if (huevos > aves_activas) {
        throw new Error(
            'No puede haber más huevos que aves activas'
        );
    }

    return await produccionRepository.create({
        galpon_id,
        fecha,
        huevos,
        aves_activas,
        mortalidad,
        alimento_kg,
        observaciones
    });
};


// ===============================
// OBTENER TODO
// ===============================
exports.getAllProduccion = async () => {

    return await produccionRepository.getAll();

};