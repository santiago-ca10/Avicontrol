
```md id="vjlwm2"
# 🗄️ Base de Datos - Avicontrol

Documentación de la estructura de base de datos del sistema Avicontrol.

---

# 📦 Motor

- MySQL
- mysql2
- mysql2/promise

---

# 🏗️ Base de datos

```sql
CREATE DATABASE avicontrol_db;
🏠 Tabla: galpones
CREATE TABLE galpones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    capacidad INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
🐓 Tabla: gallinas
CREATE TABLE gallinas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    raza VARCHAR(100),
    edad INT,
    estado ENUM(
        'activa',
        'enferma',
        'vendida'
    ) DEFAULT 'activa',

    galpon_id INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (galpon_id)
    REFERENCES galpones(id)
    ON DELETE SET NULL
);
🥚 Tabla: produccion_diaria
CREATE TABLE produccion_diaria (

    id INT PRIMARY KEY AUTO_INCREMENT,

    galpon_id INT NOT NULL,

    fecha DATE NOT NULL,

    huevos INT NOT NULL,

    aves_activas INT NOT NULL,

    mortalidad INT DEFAULT 0,

    alimento_kg DECIMAL(10,2),

    observaciones TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (galpon_id)
    REFERENCES galpones(id)
    ON DELETE CASCADE
);
🔗 Relaciones
Galpones → Gallinas
1 galpón puede tener muchas gallinas
Galpones → Producción
1 galpón puede tener muchos registros diarios
📊 Modelo operacional

El sistema evolucionó de:

producción por gallina

a:

producción diaria por galpón

Esto permite:

mayor escalabilidad
manejo de grandes cantidades de aves
métricas reales de producción
cálculos operacionales más precisos
🚀 Futuras mejoras
lotes de aves
control sanitario
inventario de alimento
alertas automáticas
estadísticas avanzadas
autenticación de usuarios