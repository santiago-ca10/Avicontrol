const dashboardRepository =
    require('../repository/dashboard.repository');


// ======================
// GET DASHBOARD
// ======================
exports.getDashboard = async () => {

    return await dashboardRepository.getDashboardStats();

};