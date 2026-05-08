const db = require('../config/db');

// CREAR PRODUCCIÓN DIARIA
exports.createProduccion = async (req, res) => {
    try {

        const {
            galpon_id,
            fecha,
            huevos,
            aves_activas,
            mortalidad,
            alimento_kg,
            observaciones
        } = req.body;

        const [result] = await db.query(`
            INSERT INTO produccion_diaria
            (
                galpon_id,
                fecha,
                huevos,
                aves_activas,
                mortalidad,
                alimento_kg,
                observaciones
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [
            galpon_id,
            fecha,
            huevos,
            aves_activas,
            mortalidad,
            alimento_kg,
            observaciones
        ]);

        res.json({
            message: 'Producción registrada',
            id: result.insertId
        });

    } catch (error) {
        res.status(500).json(error);
    }
};

// OBTENER PRODUCCIÓN
exports.getAllProduccion = async (req, res) => {
    try {

        const [rows] = await db.query(`
            SELECT
                p.*,
                g.nombre AS galpon
            FROM produccion_diaria p
            JOIN galpones g
            ON p.galpon_id = g.id
            ORDER BY fecha DESC
        `);

        res.json(rows);

    } catch (error) {
        res.status(500).json(error);
    }
};