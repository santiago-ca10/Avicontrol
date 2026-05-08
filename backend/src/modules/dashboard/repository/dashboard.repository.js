const db = require('../../../config/db');


// ===============================
// TOTAL GALLINAS
// ===============================
exports.countGallinas = async () => {

    const [rows] = await db.query(
        'SELECT COUNT(*) AS total FROM gallinas'
    );

    return rows[0].total;
};


// ===============================
// TOTAL REGISTROS PRODUCCIÓN
// ===============================
exports.countProduccion = async () => {

    const [rows] = await db.query(
        'SELECT COUNT(*) AS total FROM produccion_diaria'
    );

    return rows[0].total;
};


// ===============================
// TOTAL HUEVOS
// ===============================
exports.totalHuevos = async () => {

    const [rows] = await db.query(`
        SELECT COALESCE(SUM(huevos),0) AS total
        FROM produccion_diaria
    `);

    return rows[0].total;
};


// ===============================
// NO PRODUCCIÓN
// ===============================
exports.totalNoProduccion = async () => {

    const [rows] = await db.query(`
        SELECT COUNT(*) AS total
        FROM produccion_diaria
        WHERE huevos = 0
    `);

    return rows[0].total;
};