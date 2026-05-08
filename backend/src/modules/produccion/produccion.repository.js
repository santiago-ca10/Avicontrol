const db = require('../../config/db');


// ===============================
// CREAR
// ===============================
exports.create = async (data) => {

    const {
        galpon_id,
        fecha,
        huevos,
        aves_activas,
        mortalidad,
        alimento_kg,
        observaciones
    } = data;

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

    return result;
};


// ===============================
// OBTENER TODO
// ===============================
exports.getAll = async () => {

    const [rows] = await db.query(`
        SELECT
            p.*,
            g.nombre AS galpon
        FROM produccion_diaria p
        JOIN galpones g
            ON p.galpon_id = g.id
        ORDER BY p.fecha DESC
    `);

    return rows;
};