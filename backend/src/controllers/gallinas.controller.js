const db = require('../config/db');

// 🔹 Obtener todas
exports.getAllGallinas = (req, res) => {
    db.query('SELECT * FROM gallinas', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

// 🔹 Obtener por ID
exports.getGallinaById = (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM gallinas WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length === 0) {
            return res.status(404).json({ message: 'Gallina no encontrada' });
        }

        res.json(results[0]);
    });
};

// 🔹 Crear
exports.createGallina = (req, res) => {
    const { codigo, raza, edad } = req.body;

    if (!codigo || !edad) {
        return res.status(400).json({ message: 'Campos obligatorios faltantes' });
    }

    const query = 'INSERT INTO gallinas (codigo, raza, edad) VALUES (?, ?, ?)';

    db.query(query, [codigo, raza, edad], (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({
            message: 'Gallina creada correctamente',
            id: result.insertId
        });
    });
};

// 🔹 Actualizar
exports.updateGallina = (req, res) => {
    const { id } = req.params;
    const { codigo, raza, edad, estado } = req.body;

    const query = `
        UPDATE gallinas 
        SET codigo = ?, raza = ?, edad = ?, estado = ?
        WHERE id = ?
    `;

    db.query(query, [codigo, raza, edad, estado, id], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Gallina no encontrada' });
        }

        res.json({ message: 'Gallina actualizada correctamente' });
    });
};

// 🔹 Eliminar
exports.deleteGallina = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM gallinas WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Gallina no encontrada' });
        }

        res.json({ message: 'Gallina eliminada correctamente' });
    });
};