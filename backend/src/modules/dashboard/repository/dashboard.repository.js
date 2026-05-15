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

        // TOTAL HUEVOS
        const [huevos] = await db.query(`
            SELECT SUM(huevos) AS total
            FROM produccion_diaria
        `);

        // PROMEDIO PRODUCTIVIDAD
        const [productividad] = await db.query(`
            SELECT
                AVG(
                    (huevos / aves_activas) * 100
                ) AS promedio
            FROM produccion_diaria
            WHERE aves_activas > 0
        `);

        // MORTALIDAD TOTAL
        const [mortalidad] = await db.query(`
            SELECT SUM(mortalidad) AS total
            FROM produccion_diaria
        `);

        return {

            totalGallinas:
                gallinas[0].total || 0,

            totalGalpones:
                galpones[0].total || 0,

            totalHuevos:
                huevos[0].total || 0,

            productividadPromedio:
                Number(
                    productividad[0].promedio || 0
                ).toFixed(1),

            mortalidadTotal:
                mortalidad[0].total || 0
        };

    }

}

module.exports = DashboardRepository;