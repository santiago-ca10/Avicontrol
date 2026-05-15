const db = require('../../../config/db');

const ProduccionPort =
    require('../domain/produccion.port');

class ProduccionRepository extends ProduccionPort {

    async getAll() {

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
    }

    async getById(id) {

        const [rows] = await db.query(`
            SELECT *
            FROM produccion_diaria
            WHERE id = ?
        `, [id]);

        return rows[0];
    }

    async create(data) {

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
    }

    async update(id, data) {

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
            UPDATE produccion_diaria
            SET
                galpon_id = ?,
                fecha = ?,
                huevos = ?,
                aves_activas = ?,
                mortalidad = ?,
                alimento_kg = ?,
                observaciones = ?
            WHERE id = ?
        `, [
            galpon_id,
            fecha,
            huevos,
            aves_activas,
            mortalidad,
            alimento_kg,
            observaciones,
            id
        ]);

        return result;
    }

    async delete(id) {

        const [result] = await db.query(
            'DELETE FROM produccion_diaria WHERE id = ?',
            [id]
        );

        return result;
    }

}

module.exports = ProduccionRepository;
