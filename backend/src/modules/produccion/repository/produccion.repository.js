const db = require('../../../config/db');


// ===============================
// CREAR
// ===============================
exports.create = async (data) => {

    const {
        galpon_id,
        fecha,
        huevos = 0,
        aves_activas = 0,
        mortalidad = 0,
        alimento_kg = 0,
        observaciones = null
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
            p.id,
            p.galpon_id,
            p.fecha,
            p.huevos,
            p.aves_activas,
            p.mortalidad,
            p.alimento_kg,
            p.observaciones,
            g.nombre AS galpon
        FROM produccion_diaria p
        JOIN galpones g
            ON p.galpon_id = g.id
        ORDER BY p.fecha DESC, p.id DESC
    `);

    return rows;
};