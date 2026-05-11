const DashboardRepository =
    require('../repository/dashboard.repository');

const Dashboard =
    require('../domain/dashboard.model');

const dashboardRepository =
    new DashboardRepository();


// GET STATS
exports.getDashboardStats = async () => {

    const stats =
        await dashboardRepository.getStats();

    return new Dashboard(stats);

};