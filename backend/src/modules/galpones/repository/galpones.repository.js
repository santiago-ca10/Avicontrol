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

        const {
            nombre,
            capacidad
        } = data;

        const [result] = await db.query(`
            INSERT INTO galpones
            (nombre, capacidad)
            VALUES (?, ?)
        `, [
            nombre,
            capacidad
        ]);

        return result;
    }

    async update(id, data) {

        const {
            nombre,
            capacidad
        } = data;

        const [result] = await db.query(`
            UPDATE galpones
            SET
                nombre = ?,
                capacidad = ?
            WHERE id = ?
        `, [
            nombre,
            capacidad,
            id
        ]);

        return result;
    }

    async delete(id) {

        const [result] = await db.query(
            'DELETE FROM galpones WHERE id = ?',
            [id]
        );

        return result;
    }

}

module.exports = GalponesRepository;
