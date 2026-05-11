const ProduccionRepository =
    require('../repository/produccion.repository');

const Produccion =
    require('../domain/produccion.model');

const produccionRepository =
    new ProduccionRepository();


// GET ALL
exports.getAllProduccion = async () => {

    return await produccionRepository.getAll();

};


// GET BY ID
exports.getProduccionById = async (id) => {

    if (!id) {
        throw new Error('ID requerido');
    }

    const produccion =
        await produccionRepository.getById(id);

    if (!produccion) {
        throw new Error(
            'Registro de producción no encontrado'
        );
    }

    return new Produccion(produccion);

};


// CREATE
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

    if (!galpon_id) {
        throw new Error('Galpón obligatorio');
    }

    if (!fecha) {
        throw new Error('Fecha obligatoria');
    }

    if (huevos < 0) {
        throw new Error(
            'Huevos no pueden ser negativos'
        );
    }

    if (aves_activas <= 0) {
        throw new Error(
            'Aves activas inválidas'
        );
    }

    if (mortalidad < 0) {
        throw new Error(
            'Mortalidad inválida'
        );
    }

    if (alimento_kg < 0) {
        throw new Error(
            'Alimento inválido'
        );
    }

    if (huevos > aves_activas) {
        throw new Error(
            'No puede haber más huevos que aves activas'
        );
    }

    const produccion =
        new Produccion({
            galpon_id,
            fecha,
            huevos,
            aves_activas,
            mortalidad,
            alimento_kg,
            observaciones
        });

    return await produccionRepository.create(
        produccion
    );

};


// DELETE
exports.deleteProduccion = async (id) => {

    if (!id) {
        throw new Error('ID requerido');
    }

    return await produccionRepository.delete(id);

};