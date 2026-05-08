const galponService =
    require('./galpones.service');


// ===============================
// OBTENER TODOS
// ===============================
exports.getAllGalpones = async (req, res) => {

    try {

        const data =
            await galponService.getAllGalpones();

        res.json(data);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// ===============================
// OBTENER POR ID
// ===============================
exports.getGalponById = async (req, res) => {

    try {

        const { id } = req.params;

        const data =
            await galponService.getGalponById(id);

        res.json(data);

    } catch (error) {

        res.status(404).json({
            message: error.message
        });

    }
};


// ===============================
// CREAR
// ===============================
exports.createGalpon = async (req, res) => {

    try {

        const id =
            await galponService.createGalpon(req.body);

        res.json({
            message: 'Galpón creado',
            id
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};


// ===============================
// ACTUALIZAR
// ===============================
exports.updateGalpon = async (req, res) => {

    try {

        const { id } = req.params;

        await galponService.updateGalpon(
            id,
            req.body
        );

        res.json({
            message: 'Galpón actualizado'
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};


// ===============================
// ELIMINAR
// ===============================
exports.deleteGalpon = async (req, res) => {

    try {

        const { id } = req.params;

        await galponService.deleteGalpon(id);

        res.json({
            message: 'Galpón eliminado'
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};