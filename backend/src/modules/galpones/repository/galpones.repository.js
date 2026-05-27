const db = require('../../../config/db');

const GalponesPort =
    require('../domain/galpones.port');

class GalponesRepository extends GalponesPort {

    async getAll() {
        const [rows] = await db.query(
            'SELECT * FROM galpones'
        );
        return rows;
    }

    async getById(id) {
        const [rows] = await db.query(
            'SELECT * FROM galpones WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    async create(data) {
        const { nombre, capacidad } = data;
        const [result] = await db.query(`
            INSERT INTO galpones (nombre, capacidad)
            VALUES (?, ?)
        `, [nombre, capacidad]);
        return result;
    }

    async update(id, data) {
        const { nombre, capacidad } = data;
        const [result] = await db.query(`
            UPDATE galpones
            SET nombre = ?, capacidad = ?
            WHERE id = ?
        `, [nombre, capacidad, id]);
        return result;
    }

    async delete(id) {
        const [result] = await db.query(
            'DELETE FROM galpones WHERE id = ?',
            [id]
        );
        return result;
    }

    // STATS — solo cuenta gallinas activas y enfermas
    // Las muertas y vendidas ya no ocupan espacio
    async stats(id) {
        const [rows] = await db.query(`
            SELECT
                g.id,
                g.nombre,
                g.capacidad,

                COUNT(
                    CASE WHEN ga.estado IN ('activa', 'enferma')
                    THEN ga.id END
                ) AS total_gallinas,

                ROUND(
                    (
                        COUNT(
                            CASE WHEN ga.estado IN ('activa', 'enferma')
                            THEN ga.id END
                        ) / g.capacidad
                    ) * 100,
                    2
                ) AS ocupacion

            FROM galpones g
            LEFT JOIN gallinas ga
                ON g.id = ga.galpon_id
            WHERE g.id = ?
            GROUP BY g.id
        `, [id]);

        return rows[0];
    }

}

module.exports = GalponesRepository;
