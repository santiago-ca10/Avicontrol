const db = require('../../../config/db');

const DashboardPort =
    require('../domain/dashboard.port');

class DashboardRepository extends DashboardPort {

    async getStats() {

        // TOTAL GALLINAS
        const [gallinas] = await db.query(`
            SELECT COUNT(*) AS total
            FROM gallinas
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

        // MORTALIDAD HOY
        const [mortalidadHoy] = await db.query(`
            SELECT COALESCE(SUM(mortalidad), 0) AS total
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
            totalGallinas:   gallinas[0].total     || 0,
            totalGalpones:   galpones[0].total     || 0,
            produccionHoy:   huevosHoy[0].total    || 0,
            mortalidadHoy:   mortalidadHoy[0].total || 0,
            productividadHoy: Number(productividadHoy[0].promedio || 0).toFixed(1),
        };

    }

    // =========================
    // PRODUCCIÓN ÚLTIMOS N DÍAS
    // Para gráfica de huevos
    // =========================
    async getProduccionReciente(dias = 30) {

        const [rows] = await db.query(`
            SELECT
                DATE(fecha) AS fecha,
                SUM(huevos) AS total_huevos,
                SUM(mortalidad) AS total_mortalidad
            FROM produccion_diaria
            WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
            GROUP BY DATE(fecha)
            ORDER BY fecha ASC
        `, [dias]);

        return rows;

    }

    // =========================
    // OCUPACIÓN POR GALPÓN
    // Para card de galpones
    // =========================
    async getOcupacionGalpones() {

        const [rows] = await db.query(`
            SELECT
                g.id,
                g.nombre,
                g.capacidad,
                COUNT(ga.id) AS gallinas_actuales,
                ROUND(
                    (COUNT(ga.id) / g.capacidad) * 100,
                    1
                ) AS ocupacion
            FROM galpones g
            LEFT JOIN gallinas ga
                ON ga.galpon_id = g.id
            GROUP BY g.id, g.nombre, g.capacidad
            ORDER BY g.nombre ASC
        `);

        return rows;

    }

    // =========================
    // HISTORIAL GALLINAS
    // Últimos N días (snapshot diario
    // basado en producción registrada)
    // =========================
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
