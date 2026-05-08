const db = require('../config/db');

// 🔹 Obtener todas
exports.getAllGallinas = async (req, res) => {
    try {

        const [rows] = await db.query(`
            SELECT g.*, ga.nombre AS galpon
            FROM gallinas g
            LEFT JOIN galpones ga ON g.galpon_id = ga.id
        `);

        res.json(rows);

    } catch (error) {
        res.status(500).json(error);
    }
};

// 🔹 Obtener por ID
exports.getGallinaById = async (req, res) => {
    try {

        const { id } = req.params;

        const [rows] = await db.query(
            'SELECT * FROM gallinas WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Gallina no encontrada'
            });
        }

        res.json(rows[0]);

    } catch (error) {
        res.status(500).json(error);
    }
};

// 🔹 Crear
exports.createGallina = async (req, res) => {
    try {

        const {
            codigo,
            raza,
            edad,
            galpon_id
        } = req.body;

        if (!codigo || !edad) {
            return res.status(400).json({
                message: 'Campos obligatorios faltantes'
            });
        }

        const [result] = await db.query(`
            INSERT INTO gallinas
            (codigo, raza, edad, galpon_id)
            VALUES (?, ?, ?, ?)
        `, [codigo, raza, edad, galpon_id]);

        res.json({
            message: 'Gallina creada correctamente',
            id: result.insertId
        });

    } catch (error) {
        res.status(500).json(error);
    }
};

// 🔹 Actualizar
exports.updateGallina = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            codigo,
            raza,
            edad,
            estado,
            galpon_id
        } = req.body;

        const [result] = await db.query(`
            UPDATE gallinas
            SET
                codigo = ?,
                raza = ?,
                edad = ?,
                estado = ?,
                galpon_id = ?
            WHERE id = ?
        `, [
            codigo,
            raza,
            edad,
            estado,
            galpon_id,
            id
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Gallina no encontrada'
            });
        }

        res.json({
            message: 'Gallina actualizada correctamente'
        });

    } catch (error) {
        res.status(500).json(error);
    }
};

// 🔹 Eliminar
exports.deleteGallina = async (req, res) => {
    try {

        const { id } = req.params;

        const [result] = await db.query(
            'DELETE FROM gallinas WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Gallina no encontrada'
            });
        }

        res.json({
            message: 'Gallina eliminada correctamente'
        });

    } catch (error) {
        res.status(500).json(error);
    }
};