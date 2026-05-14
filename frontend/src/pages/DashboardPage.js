import { useEffect, useState } from 'react';

import API from '../services/api';

function DashboardPage() {

    const [stats, setStats] = useState({
        totalGallinas: 0,
        totalGalpones: 0,
        produccionHoy: 0,
        mortalidadHoy: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchDashboard();

    }, []);


    // =========================
    // FETCH DASHBOARD
    // =========================
    const fetchDashboard = async () => {

        try {

            const res =
                await API.get('/dashboard');

            setStats(res.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // LOADING
    // =========================
    if (loading) {

        return (
            <div className="container">
                <p>Cargando dashboard...</p>
            </div>
        );

    }


    // =========================
    // UI
    // =========================
    return (

        <div className="container">

            <div className="page-header">

                <h1>Dashboard</h1>

                <p>
                    Resumen general del sistema avícola
                </p>

            </div>


            <div className="stats-grid">

                {/* TOTAL GALLINAS */}
                <div className="stat-card">

                    <h2>
                        {stats.totalGallinas}
                    </h2>

                    <p>
                        Gallinas registradas
                    </p>

                </div>


                {/* TOTAL GALPONES */}
                <div className="stat-card">

                    <h2>
                        {stats.totalGalpones}
                    </h2>

                    <p>
                        Galpones
                    </p>

                </div>


                {/* PRODUCCIÓN */}
                <div className="stat-card">

                    <h2>
                        {stats.produccionHoy}
                    </h2>

                    <p>
                        Huevos hoy
                    </p>

                </div>


                {/* MORTALIDAD */}
                <div className="stat-card">

                    <h2>
                        {stats.mortalidadHoy}
                    </h2>

                    <p>
                        Mortalidad hoy
                    </p>

                </div>

            </div>

        </div>

    );

}

export default DashboardPage;