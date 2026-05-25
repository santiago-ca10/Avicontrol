const DashboardRepository =
    require('../repository/dashboard.repository');

const dashboardRepository =
    new DashboardRepository();


// STATS PRINCIPALES
exports.getDashboardStats = async () => {
    return await dashboardRepository.getStats();
};

// PRODUCCIÓN RECIENTE (gráfica huevos)
exports.getProduccionReciente = async (dias = 30) => {
    return await dashboardRepository.getProduccionReciente(dias);
};

// OCUPACIÓN GALPONES
exports.getOcupacionGalpones = async () => {
    return await dashboardRepository.getOcupacionGalpones();
};

// HISTORIAL GALLINAS (gráfica gallinas)
exports.getHistorialGallinas = async (dias = 30) => {
    return await dashboardRepository.getHistorialGallinas(dias);
};