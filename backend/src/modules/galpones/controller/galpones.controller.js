const galponesService =
    require('../service/galpones.service');


// GET ALL
exports.getAllGalpones = async (req, res) => {

    try {

        const data =
            await galponesService.getAllGalpones();

        res.json(data);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// GET BY ID
exports.getGalponById = async (req, res) => {

    try {

        const { id } = req.params;

        const data =
            await galponesService.getGalponById(id);

        res.json(data);

    } catch (error) {

        res.status(404).json({
            message: error.message
        });

    }

};


// GET STATS
exports.getGalponStats = async (req, res) => {

    try {

        const { id } = req.params;

        const data =
            await galponesService.getGalponStats(id);

        res.json(data);

    } catch (error) {

        res.status(404).json({
            message: error.message
        });

    }

};


// CREATE
exports.createGalpon = async (req, res) => {

    try {

        const result =
            await galponesService.createGalpon(
                req.body
            );

        res.json({
            message: 'Galpón creado',
            id: result.insertId
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// UPDATE
exports.updateGalpon = async (req, res) => {

    try {

        const { id } = req.params;

        await galponesService.updateGalpon(
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


// DELETE
exports.deleteGalpon = async (req, res) => {

    try {

        const { id } = req.params;

        await galponesService.deleteGalpon(id);

        res.json({
            message: 'Galpón eliminado'
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};
