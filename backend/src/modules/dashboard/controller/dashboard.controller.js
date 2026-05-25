const dashboardService =
    require('../service/dashboard.service');


// GET /dashboard
// Stats principales: gallinas, galpones, huevos hoy, mortalidad hoy
exports.getDashboard = async (req, res) => {

    try {

        const stats =
            await dashboardService.getDashboardStats();

        res.json(stats);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


// GET /dashboard/produccion?dias=30
// Producción diaria para gráfica de huevos
exports.getProduccionReciente = async (req, res) => {

    try {

        const dias = parseInt(req.query.dias) || 30;

        const data =
            await dashboardService.getProduccionReciente(dias);

        res.json(data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


// GET /dashboard/galpones
// Ocupación por galpón para la card
exports.getOcupacionGalpones = async (req, res) => {

    try {

        const data =
            await dashboardService.getOcupacionGalpones();

        res.json(data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


// GET /dashboard/gallinas?dias=30
// Historial de aves activas para gráfica
exports.getHistorialGallinas = async (req, res) => {

    try {

        const dias = parseInt(req.query.dias) || 30;

        const data =
            await dashboardService.getHistorialGallinas(dias);

        res.json(data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};