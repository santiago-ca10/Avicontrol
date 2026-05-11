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

        // PRODUCCIÓN HOY
        const [produccion] = await db.query(`
            SELECT IFNULL(SUM(huevos), 0) AS total
            FROM produccion_diaria
            WHERE fecha = CURDATE()
        `);

        // MORTALIDAD HOY
        const [mortalidad] = await db.query(`
            SELECT IFNULL(SUM(mortalidad), 0) AS total
            FROM produccion_diaria
            WHERE fecha = CURDATE()
        `);

        return {
            totalGallinas: gallinas[0].total,
            totalGalpones: galpones[0].total,
            produccionHoy: produccion[0].total,
            mortalidadHoy: mortalidad[0].total
        };

    }

}

module.exports = DashboardRepository;