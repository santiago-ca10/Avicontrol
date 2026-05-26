const gallinasService =
    require('../service/gallinas.service');


// GET ALL — soporta ?galpon_id=X
exports.getAllGallinas = async (req, res) => {

    try {

        const galpon_id =
            req.query.galpon_id || null;

        const data =
            await gallinasService.getAllGallinas(
                galpon_id
            );

        res.json(data);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// GET BY ID
exports.getGallinaById = async (req, res) => {

    try {

        const { id } = req.params;

        const data =
            await gallinasService.getGallinaById(id);

        res.json(data);

    } catch (error) {

        res.status(404).json({
            message: error.message
        });

    }

};


// CREATE
exports.createGallina = async (req, res) => {

    try {

        const result =
            await gallinasService.createGallina(
                req.body
            );

        res.json({
            message: 'Gallina creada correctamente',
            id: result.insertId
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// UPDATE
exports.updateGallina = async (req, res) => {

    try {

        const { id } = req.params;

        await gallinasService.updateGallina(
            id,
            req.body
        );

        res.json({
            message: 'Gallina actualizada correctamente'
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// DELETE
exports.deleteGallina = async (req, res) => {

    try {

        const { id } = req.params;

        await gallinasService.deleteGallina(id);

        res.json({
            message: 'Gallina eliminada correctamente'
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};
