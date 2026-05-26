const db = require('../../../config/db');

const GallinasPort =
    require('../domain/gallinas.port');

class GallinasRepository extends GallinasPort {

    // Soporta filtro opcional por galpon_id
    async getAll(galpon_id = null) {

        let query = `
            SELECT g.*, ga.nombre AS galpon
            FROM gallinas g
            LEFT JOIN galpones ga
                ON g.galpon_id = ga.id
        `;

        const params = [];

        if (galpon_id) {
            query += ' WHERE g.galpon_id = ?';
            params.push(galpon_id);
        }

        query += ' ORDER BY g.id DESC';

        const [rows] = await db.query(query, params);

        return rows;
    }

    async getById(id) {

        const [rows] = await db.query(
            'SELECT * FROM gallinas WHERE id = ?',
            [id]
        );

        return rows[0];
    }

    async create(data) {

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
    }

    async update(id, data) {

        const {
            codigo,
            raza,
            edad,
            estado,
            galpon_id
        } = data;

        const [result] = await db.query(`
            UPDATE gallinas
            SET
                codigo = ?,
                raza = ?,
                edad = ?,
                estado = ?,
                galpon_id = ?
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
    }

    async delete(id) {

        const [result] = await db.query(
            'DELETE FROM gallinas WHERE id = ?',
            [id]
        );

        return result;
    }

}

module.exports = GallinasRepository;
