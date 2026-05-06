const db = require('../config/db');


exports.createProduccion = (req, res) => {
    const { gallina_id, fecha, cantidad, observaciones } = req.body;

    const query = `
        INSERT INTO produccion_huevos (gallina_id, fecha, cantidad, observaciones)
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [gallina_id, fecha, cantidad, observaciones], (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({
            message: 'Producción registrada',
            id: result.insertId
        });
    });
};


exports.getAllProduccion = (req, res) => {
    const query = `
        SELECT p.*, g.codigo 
        FROM produccion_huevos p
        JOIN gallinas g ON p.gallina_id = g.id
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};


exports.getProduccionByGallina = (req, res) => {
    const { gallina_id } = req.params;

    const query = `
        SELECT * FROM produccion_huevos
        WHERE gallina_id = ?
    `;

    db.query(query, [gallina_id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};


exports.getTotalHuevos = (req, res) => {
    const { gallina_id } = req.params;

    const query = `
        SELECT SUM(cantidad) AS total
        FROM produccion_huevos
        WHERE gallina_id = ?
    `;

    db.query(query, [gallina_id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results[0]);
    });
};