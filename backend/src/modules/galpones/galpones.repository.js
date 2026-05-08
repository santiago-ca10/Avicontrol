const db = require('../../config/db');


// ===============================
// OBTENER TODOS
// ===============================
exports.getAll = async () => {

    const [rows] = await db.query(
        'SELECT * FROM galpones'
    );

    return rows;
};


// ===============================
// OBTENER POR ID
// ===============================
exports.getById = async (id) => {

    const [rows] = await db.query(
        'SELECT * FROM galpones WHERE id = ?',
        [id]
    );

    return rows[0];
};


// ===============================
// CREAR
// ===============================
exports.create = async (nombre, capacidad) => {

    const [result] = await db.query(
        `INSERT INTO galpones
        (nombre, capacidad)
        VALUES (?, ?)`,
        [nombre, capacidad]
    );

    return result.insertId;
};


// ===============================
// ACTUALIZAR
// ===============================
exports.update = async (id, nombre, capacidad) => {

    await db.query(
        `UPDATE galpones
        SET nombre = ?, capacidad = ?
        WHERE id = ?`,
        [nombre, capacidad, id]
    );

    return true;
};


// ===============================
// ELIMINAR
// ===============================
exports.delete = async (id) => {

    await db.query(
        'DELETE FROM galpones WHERE id = ?',
        [id]
    );

    return true;
};