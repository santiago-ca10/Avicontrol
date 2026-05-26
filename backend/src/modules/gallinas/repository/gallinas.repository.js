const db = require('../../../config/db');

const GallinasPort =
    require('../domain/gallinas.port');

class GallinasRepository extends GallinasPort {

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

    // Insertar un lote de gallinas
    async createLote(filas) {

        // filas: array de [raza, edad, estado, galpon_id, fecha_ingreso]
        const placeholders = filas
            .map(() => '(?, ?, ?, ?, ?)')
            .join(', ');

        const valores = filas.flatMap(f => [
            f.raza,
            f.edad,
            f.estado,
            f.galpon_id,
            f.fecha_ingreso,
        ]);

        const [result] = await db.query(`
            INSERT INTO gallinas
            (raza, edad, estado, galpon_id, fecha_ingreso)
            VALUES ${placeholders}
        `, valores);

        return result;
    }

    async update(id, data) {

        const {
            raza,
            edad,
            estado,
            galpon_id,
            fecha_ingreso,
        } = data;

        const [result] = await db.query(`
            UPDATE gallinas
            SET
                raza = ?,
                edad = ?,
                estado = ?,
                galpon_id = ?,
                fecha_ingreso = ?
            WHERE id = ?
        `, [
            raza,
            edad,
            estado,
            galpon_id,
            fecha_ingreso,
            id,
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
