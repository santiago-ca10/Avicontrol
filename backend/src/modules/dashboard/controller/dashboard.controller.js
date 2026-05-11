const dashboardService =
    require('../service/dashboard.service');


// GET DASHBOARD
exports.getDashboardStats = async (req, res) => {

    try {

        const data =
            await dashboardService.getDashboardStats();

        res.json(data);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};