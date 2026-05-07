const db = require('../config/db');


// CREAR REGISTRO DE PRODUCCIÓN
exports.createProduccion = (req, res) => {
    const { gallina_id, fecha, produjo, observaciones } = req.body;

    const query = `
        INSERT INTO produccion_huevos (gallina_id, fecha, produjo, observaciones)
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [gallina_id, fecha, produjo, observaciones], (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({
            message: 'Producción registrada',
            id: result.insertId
        });
    });
};


// OBTENER TODOS LOS REGISTROS
exports.getAllProduccion = (req, res) => {
    const query = `
        SELECT p.*, g.codigo 
        FROM produccion_huevos p
        JOIN gallinas g ON p.gallina_id = g.id
        ORDER BY p.fecha DESC
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);

        res.json(results);
    });
};


// OBTENER PRODUCCIÓN POR GALLINA
exports.getProduccionByGallina = (req, res) => {
    const { gallina_id } = req.params;

    const query = `
        SELECT * 
        FROM produccion_huevos
        WHERE gallina_id = ?
        ORDER BY fecha DESC
    `;

    db.query(query, [gallina_id], (err, results) => {
        if (err) return res.status(500).json(err);

        res.json(results);
    });
};


// TOTAL DE DÍAS QUE PRODUJO
exports.getTotalProduccion = (req, res) => {
    const { gallina_id } = req.params;

    const query = `
        SELECT COUNT(*) AS total
        FROM produccion_huevos
        WHERE gallina_id = ? AND produjo = 1
    `;

    db.query(query, [gallina_id], (err, results) => {
        if (err) return res.status(500).json(err);

        res.json(results[0]);
    });
};