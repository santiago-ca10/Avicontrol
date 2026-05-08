const db = require('../../config/db');


// GET ALL
exports.getAll = async () => {

    const [rows] = await db.query(`
        SELECT g.*, ga.nombre AS galpon
        FROM gallinas g
        LEFT JOIN galpones ga ON g.galpon_id = ga.id
    `);

    return rows;
};


// GET BY ID
exports.getById = async (id) => {

    const [rows] = await db.query(
        'SELECT * FROM gallinas WHERE id = ?',
        [id]
    );

    return rows[0];
};


// CREATE
exports.create = async (data) => {

    const {
        codigo,
        raza,
        edad,
        galpon_id
    } = data;

    const [result] = await db.query(`
        INSERT INTO gallinas
        (codigo, raza, edad, galpon_id)
        VALUES (?, ?, ?, ?)
    `, [
        codigo,
        raza,
        edad,
        galpon_id
    ]);

    return result;
};


// UPDATE
exports.update = async (id, data) => {

    const {
        codigo,
        raza,
        edad,
        estado,
        galpon_id
    } = data;

    const [result] = await db.query(`
        UPDATE gallinas
        SET codigo = ?, raza = ?, edad = ?, estado = ?, galpon_id = ?
        WHERE id = ?
    `, [
        codigo,
        raza,
        edad,
        estado,
        galpon_id,
        id
    ]);

    return result;
};


// DELETE
exports.delete = async (id) => {

    const [result] = await db.query(
        'DELETE FROM gallinas WHERE id = ?',
        [id]
    );

    return result;
};const db = require('../../config/db');


// GET ALL
exports.getAll = async () => {

    const [rows] = await db.query(`
        SELECT g.*, ga.nombre AS galpon
        FROM gallinas g
        LEFT JOIN galpones ga ON g.galpon_id = ga.id
    `);

    return rows;
};


// GET BY ID
exports.getById = async (id) => {

    const [rows] = await db.query(
        'SELECT * FROM gallinas WHERE id = ?',
        [id]
    );

    return rows[0];
};


// CREATE
exports.create = async (data) => {

    const {
        codigo,
        raza,
        edad,
        galpon_id
    } = data;

    const [result] = await db.query(`
        INSERT INTO gallinas
        (codigo, raza, edad, galpon_id)
        VALUES (?, ?, ?, ?)
    `, [
        codigo,
        raza,
        edad,
        galpon_id
    ]);

    return result;
};


// UPDATE
exports.update = async (id, data) => {

    const {
        codigo,
        raza,
        edad,
        estado,
        galpon_id
    } = data;

    const [result] = await db.query(`
        UPDATE gallinas
        SET codigo = ?, raza = ?, edad = ?, estado = ?, galpon_id = ?
        WHERE id = ?
    `, [
        codigo,
        raza,
        edad,
        estado,
        galpon_id,
        id
    ]);

    return result;
};


// DELETE
exports.delete = async (id) => {

    const [result] = await db.query(
        'DELETE FROM gallinas WHERE id = ?',
        [id]
    );

    return result;
};