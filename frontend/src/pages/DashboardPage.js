import { useEffect, useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from 'recharts';
import API from '../services/api';
import AlertModal from '../components/AlertModal';

// =========================
// HELPERS
// =========================
const formatFecha = (fechaStr) => {
    const d = new Date(fechaStr);
    return `${d.getDate()}/${d.getMonth() + 1}`;
};

// =========================
// COMPONENTE STAT CARD
// =========================
function DashCard({ label, value, sub, color, onClick, clickable }) {
    return (
        <div
            className="stat-card"
            onClick={onClick}
            style={{
                borderTop: `4px solid ${color}`,
                cursor: clickable ? 'pointer' : 'default',
            }}
        >
            <p style={s.cardLabel}>{label}</p>
            <h2 style={{ ...s.cardValue, color }}>{value}</h2>
            {sub && <p style={s.cardSub}>{sub}</p>}
            {clickable && (
                <span style={s.clickHint}>Ver historial →</span>
            )}
        </div>
    );
}

// =========================
// COMPONENTE GALPÓN ROW
// =========================
function GalponRow({ galpon }) {
    const pct = Math.min(galpon.ocupacion, 100);
    const color =
        pct >= 90 ? '#dc2626' :
        pct >= 70 ? '#d97706' :
        '#16a34a';

    return (
        <div style={s.galponRow}>
            <div style={s.galponInfo}>
                <span style={s.galponNombre}>{galpon.nombre}</span>
                <span style={s.galponDetalle}>
                    {galpon.gallinas_actuales} / {galpon.capacidad} aves
                </span>
            </div>
            <div style={s.barWrap}>
                <div style={{ ...s.barFill, width: `${pct}%`, background: color }} />
            </div>
            <span style={{ ...s.pctLabel, color }}>{pct}%</span>
        </div>
    );
}

// =========================
// PÁGINA PRINCIPAL
// =========================
function DashboardPage() {

    const [stats, setStats] = useState(null);
    const [galpones, setGalpones] = useState([]);
    const [graficaHuevos, setGraficaHuevos] = useState([]);
    const [graficaGallinas, setGraficaGallinas] = useState([]);
    const [loading, setLoading] = useState(true);

    // Qué gráfica está visible
    const [modalGrafica, setModalGrafica] = useState(null); // 'gallinas' | 'huevos' | null

    const [alertModal, setAlertModal] = useState({
        open: false, title: '', message: '', type: 'info',
    });

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const [resStats, resGalpones, resHuevos, resGallinas] =
                await Promise.all([
                    API.get('/dashboard'),
                    API.get('/dashboard/galpones'),
                    API.get('/dashboard/produccion?dias=30'),
                    API.get('/dashboard/gallinas?dias=30'),
                ]);

            setStats(resStats.data);
            setGalpones(resGalpones.data);
            setGraficaHuevos(
                resHuevos.data.map((d) => ({
                    ...d,
                    fecha: formatFecha(d.fecha),
                }))
            );
            setGraficaGallinas(
                resGallinas.data.map((d) => ({
                    ...d,
                    fecha: formatFecha(d.fecha),
                }))
            );
        } catch (error) {
            console.error(error);
            setAlertModal({
                open: true,
                title: 'Error',
                message: 'No se pudo cargar el dashboard. Verifica la conexión.',
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container">
                <div className="page-header">
                    <h1>Dashboard</h1>
                    <p>Cargando datos...</p>
                </div>
                <div style={s.skeletonGrid}>
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="stat-card" style={s.skeleton} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container">

            {/* HEADER */}
            <div className="page-header">
                <h1>Dashboard</h1>
                <p>Resumen general — hoy {new Date().toLocaleDateString('es-CO', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })}</p>
            </div>

            {/* STAT CARDS */}
            <div className="stats-grid" style={{ marginBottom: '28px' }}>

                <DashCard
                    label="Gallinas registradas"
                    value={stats?.totalGallinas ?? 0}
                    color="#16a34a"
                    clickable
                    onClick={() => setModalGrafica('gallinas')}
                />

                <DashCard
                    label="Gallinas activas"
                    value={stats?.gallinasActivas ?? 0}
                    sub={`De ${stats?.totalGallinas ?? 0} registradas`}
                    color="#22c55e"
                />

                <DashCard
                    label="Galpones activos"
                    value={stats?.totalGalpones ?? 0}
                    color="#2563eb"
                />

                <DashCard
                    label="Huevos hoy"
                    value={stats?.produccionHoy ?? 0}
                    sub={`Productividad: ${stats?.productividadHoy ?? 0}%`}
                    color="#d97706"
                    clickable
                    onClick={() => setModalGrafica('huevos')}
                />

            </div>

            {/* GRÁFICA INLINE — se muestra debajo de las cards al hacer click */}
            {modalGrafica === 'gallinas' && graficaGallinas.length > 0 && (
                <div className="card" style={{ marginBottom: '28px' }}>
                    <div style={s.chartHeader}>
                        <h3 style={s.chartTitle}>Aves activas — últimos 30 días</h3>
                        <button
                            style={s.closeChartBtn}
                            onClick={() => setModalGrafica(null)}
                        >
                            ✕
                        </button>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={graficaGallinas}>
                            <defs>
                                <linearGradient id="colorGallinas" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.25} />
                                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,100,100,0.1)" />
                            <XAxis dataKey="fecha" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="aves_activas"
                                stroke="#16a34a"
                                strokeWidth={2}
                                fill="url(#colorGallinas)"
                                name="Aves activas"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            )}

            {modalGrafica === 'huevos' && graficaHuevos.length > 0 && (
                <div className="card" style={{ marginBottom: '28px' }}>
                    <div style={s.chartHeader}>
                        <h3 style={s.chartTitle}>Producción de huevos — últimos 30 días</h3>
                        <button
                            style={s.closeChartBtn}
                            onClick={() => setModalGrafica(null)}
                        >
                            ✕
                        </button>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={graficaHuevos}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,100,100,0.1)" />
                            <XAxis dataKey="fecha" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip />
                            <Bar
                                dataKey="total_huevos"
                                fill="#d97706"
                                radius={[6, 6, 0, 0]}
                                name="Huevos"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* GALPONES — OCUPACIÓN */}
            {galpones.length > 0 && (
                <div className="card" style={{ marginBottom: '28px' }}>
                    <h3 style={{ ...s.chartTitle, marginBottom: '18px' }}>
                        Ocupación por galpón
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {galpones.map((g) => (
                            <GalponRow key={g.id} galpon={g} />
                        ))}
                    </div>
                </div>
            )}

            {/* MENSAJE SIN DATOS */}
            {galpones.length === 0 && (
                <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                    <p style={{ color: 'var(--text-soft)', fontSize: '15px' }}>
                        No hay galpones registrados aún.
                    </p>
                </div>
            )}

            {/* ALERT MODAL */}
            <AlertModal
                isOpen={alertModal.open}
                onClose={() => setAlertModal({ open: false, title: '', message: '', type: 'info' })}
                title={alertModal.title}
                message={alertModal.message}
                type={alertModal.type}
            />

        </div>
    );
}

// =========================
// ESTILOS
// =========================
const s = {
    cardLabel: {
        margin: '0 0 6px',
        fontSize: '13px',
        color: 'var(--text-soft)',
        fontWeight: 500,
    },
    cardValue: {
        margin: '0 0 4px',
        fontSize: '36px',
        fontWeight: 700,
        lineHeight: 1,
    },
    cardSub: {
        margin: 0,
        fontSize: '12px',
        color: 'var(--text-soft)',
    },
    clickHint: {
        display: 'inline-block',
        marginTop: '10px',
        fontSize: '11px',
        color: 'var(--primary)',
        fontWeight: 600,
    },
    chartHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
    },
    chartTitle: {
        margin: 0,
        fontSize: '15px',
        fontWeight: 600,
        color: 'var(--text)',
    },
    closeChartBtn: {
        background: 'transparent',
        border: '1px solid var(--border)',
        color: 'var(--text-soft)',
        fontSize: '13px',
        padding: '4px 10px',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    galponRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
    },
    galponInfo: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '130px',
    },
    galponNombre: {
        fontSize: '14px',
        fontWeight: 600,
        color: 'var(--text)',
    },
    galponDetalle: {
        fontSize: '12px',
        color: 'var(--text-soft)',
    },
    barWrap: {
        flex: 1,
        height: '8px',
        background: 'var(--border)',
        borderRadius: '20px',
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        borderRadius: '20px',
        transition: 'width 0.5s ease',
    },
    pctLabel: {
        fontSize: '13px',
        fontWeight: 600,
        minWidth: '38px',
        textAlign: 'right',
    },
    skeletonGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
    },
    skeleton: {
        height: '110px',
        opacity: 0.4,
        animation: 'pulse 1.5s infinite',
    },
};

export default DashboardPage;
