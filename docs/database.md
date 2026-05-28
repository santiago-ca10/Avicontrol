# 🗄 Base de Datos — Avicontrol

**Motor:** MySQL 8  
**Base de datos:** `avicontrol_db`

## Diagrama de relaciones

```
galpones (1) ──────── (*) gallinas
    │                      ON DELETE SET NULL
    │
    └──────────────── (*) produccion_diaria
                           ON DELETE CASCADE
```

## Tablas

### galpones

| Campo | Tipo | Restricción | Descripción |
|-------|------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Identificador único |
| nombre | VARCHAR(100) | NOT NULL | Nombre del galpón |
| capacidad | INT | NOT NULL | Capacidad máxima de aves |
| estado | ENUM('activo','inactivo') | DEFAULT 'activo' | Estado del galpón |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha de creación |

### gallinas

| Campo | Tipo | Restricción | Descripción |
|-------|------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Identificador único |
| raza | VARCHAR(100) | NULL | Raza de la gallina |
| edad | INT | NULL | Edad en meses |
| estado | ENUM('activa','enferma','vendida','muerta') | DEFAULT 'activa' | Estado actual |
| galpon_id | INT | FK → galpones(id) SET NULL | Galpón al que pertenece |
| fecha_ingreso | DATE | DEFAULT CURDATE() | Fecha de ingreso |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha de registro |

> **Nota:** Las gallinas con estado `muerta` o `vendida` no cuentan en la ocupación del galpón.

### produccion_diaria

| Campo | Tipo | Restricción | Descripción |
|-------|------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Identificador único |
| galpon_id | INT | FK → galpones(id) CASCADE | Galpón del registro |
| fecha | DATE | NOT NULL | Fecha de producción |
| huevos | INT | NOT NULL | Huevos producidos |
| aves_activas | INT | NOT NULL | Aves activas ese día |
| alimento_kg | DECIMAL(5,2) | NULL | Alimento consumido en kg |
| observaciones | TEXT | NULL | Notas adicionales |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha de creación |

> **Restricción:** No puede existir más de un registro por galpón por fecha (validado en backend).

## Script de creación

```sql
CREATE DATABASE avicontrol_db;
USE avicontrol_db;

CREATE TABLE galpones (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  capacidad INT NOT NULL,
  estado ENUM('activo','inactivo') DEFAULT 'activo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE gallinas (
  id INT NOT NULL AUTO_INCREMENT,
  raza VARCHAR(100) DEFAULT NULL,
  edad INT DEFAULT NULL,
  estado ENUM('activa','enferma','vendida','muerta') DEFAULT 'activa',
  galpon_id INT DEFAULT NULL,
  fecha_ingreso DATE DEFAULT (CURDATE()),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (galpon_id) REFERENCES galpones(id) ON DELETE SET NULL
);

CREATE TABLE produccion_diaria (
  id INT NOT NULL AUTO_INCREMENT,
  galpon_id INT NOT NULL,
  fecha DATE NOT NULL,
  huevos INT NOT NULL,
  aves_activas INT NOT NULL,
  alimento_kg DECIMAL(5,2) DEFAULT NULL,
  observaciones TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (galpon_id) REFERENCES galpones(id) ON DELETE CASCADE
);
```
