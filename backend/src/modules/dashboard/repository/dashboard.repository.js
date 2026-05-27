const db = require('../../../config/db');

const DashboardPort =
    require('../domain/dashboard.port');

class DashboardRepository extends DashboardPort {

    async getStats() {

        // TOTAL GALLINAS (todas)
        const [gallinas] = await db.query(`
            SELECT COUNT(*) AS total
            FROM gallinas
        `);

        // GALLINAS ACTIVAS
        const [gallinasActivas] = await db.query(`
            SELECT COUNT(*) AS total
            FROM gallinas
            WHERE estado IN ('activa', 'enferma')
        `);

        // TOTAL GALPONES
        const [galpones] = await db.query(`
            SELECT COUNT(*) AS total
            FROM galpones
        `);

        // HUEVOS HOY
        const [huevosHoy] = await db.query(`
            SELECT COALESCE(SUM(huevos), 0) AS total
            FROM produccion_diaria
            WHERE DATE(fecha) = CURDATE()
        `);

        // PRODUCTIVIDAD PROMEDIO HOY
        const [productividadHoy] = await db.query(`
            SELECT
                COALESCE(
                    AVG((huevos / aves_activas) * 100),
                    0
                ) AS promedio
            FROM produccion_diaria
            WHERE DATE(fecha) = CURDATE()
            AND aves_activas > 0
        `);

        return {
            totalGallinas:    gallinas[0].total        || 0,
            gallinasActivas:  gallinasActivas[0].total || 0,
            totalGalpones:    galpones[0].total        || 0,
            produccionHoy:    huevosHoy[0].total       || 0,
            productividadHoy: Number(productividadHoy[0].promedio || 0).toFixed(1),
        };

    }

    async getProduccionReciente(dias = 30) {

        const [rows] = await db.query(`
            SELECT
                DATE(fecha) AS fecha,
                SUM(huevos) AS total_huevos
            FROM produccion_diaria
            WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
            GROUP BY DATE(fecha)
            ORDER BY fecha ASC
        `, [dias]);

        return rows;
    }

    async getOcupacionGalpones() {

        const [rows] = await db.query(`
            SELECT
                g.id,
                g.nombre,
                g.capacidad,
                COUNT(CASE WHEN ga.estado IN ('activa','enferma') THEN ga.id END) AS gallinas_actuales,
                ROUND(
                    (COUNT(CASE WHEN ga.estado IN ('activa','enferma') THEN ga.id END) / g.capacidad) * 100,
                    1
                ) AS ocupacion
            FROM galpones g
            LEFT JOIN gallinas ga ON ga.galpon_id = g.id
            GROUP BY g.id, g.nombre, g.capacidad
            ORDER BY g.nombre ASC
        `);

        return rows;
    }

    async getHistorialGallinas(dias = 30) {

        const [rows] = await db.query(`
            SELECT
                DATE(fecha) AS fecha,
                MAX(aves_activas) AS aves_activas
            FROM produccion_diaria
            WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
            GROUP BY DATE(fecha)
            ORDER BY fecha ASC
        `, [dias]);

        return rows;
    }

}

module.exports = DashboardRepository;
