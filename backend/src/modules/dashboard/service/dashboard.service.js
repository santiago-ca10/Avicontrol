const dashboardRepository =
    require('./repository/dashboard.repository');


// ===============================
// RESUMEN GENERAL DEL SISTEMA
// ===============================
exports.getResumen = async () => {

    const gallinas =
        await dashboardRepository.countGallinas();

    const produccion =
        await dashboardRepository.countProduccion();

    const huevos =
        await dashboardRepository.totalHuevos();

    const noProduccion =
        await dashboardRepository.totalNoProduccion();

    const productividad =
        produccion > 0
            ? Math.round(
                (huevos / produccion) * 100
            )
            : 0;

    return {

        gallinas,
        produccion,
        huevos,
        noProduccion,
        productividad

    };
};