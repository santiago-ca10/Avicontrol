const dashboardService =
    require('../service/dashboard.service');


// ===============================
// RESUMEN GENERAL
// ===============================
exports.getResumen = async (req, res) => {

    try {

        const data =
            await dashboardService.getResumen();

        res.json(data);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};