const produccionService =
    require('./produccion.service');


// ===============================
// CREAR PRODUCCIÓN
// ===============================
exports.createProduccion = async (req, res) => {

    try {

        const result =
            await produccionService.createProduccion(
                req.body
            );

        res.json({
            message: 'Producción registrada',
            id: result.insertId
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};


// ===============================
// OBTENER TODA LA PRODUCCIÓN
// ===============================
exports.getAllProduccion = async (req, res) => {

    try {

        const data =
            await produccionService.getAllProduccion();

        res.json(data);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};