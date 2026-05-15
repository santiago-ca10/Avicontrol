const produccionService =
    require('../service/produccion.service');


// GET ALL
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


// GET BY ID
exports.getProduccionById = async (req, res) => {

    try {

        const { id } = req.params;

        const data =
            await produccionService.getProduccionById(id);

        res.json(data);

    } catch (error) {

        res.status(404).json({
            message: error.message
        });

    }

};


// CREATE
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


// UPDATE
exports.updateProduccion = async (req, res) => {

    try {

        const { id } = req.params;

        await produccionService.updateProduccion(
            id,
            req.body
        );

        res.json({
            message: 'Producción actualizada'
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// DELETE
exports.deleteProduccion = async (req, res) => {

    try {

        const { id } = req.params;

        await produccionService.deleteProduccion(id);

        res.json({
            message: 'Producción eliminada'
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};
