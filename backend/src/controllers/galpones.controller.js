const db = require('../config/db');

// 🔹 OBTENER GALPONES
exports.getAllGalpones = async (req, res) => {

    try {

        const [rows] = await db.query(
            'SELECT * FROM galpones'
        );

        res.json(rows);

    } catch (error) {

        res.status(500).json(error);

    }
};

// 🔹 CREAR GALPÓN
exports.createGalpon = async (req, res) => {

    try {

        const {
            nombre,
            capacidad
        } = req.body;

        const [result] = await db.query(`
            INSERT INTO galpones
            (nombre, capacidad)
            VALUES (?, ?)
        `, [
            nombre,
            capacidad
        ]);

        res.json({
            message: 'Galpón creado',
            id: result.insertId
        });

    } catch (error) {

        res.status(500).json(error);

    }
};