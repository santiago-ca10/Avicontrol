const DashboardRepository =
    require('../repository/dashboard.repository');

const dashboardRepository =
    new DashboardRepository();

exports.getDashboardStats = async () => {

    return await dashboardRepository.getStats();

};