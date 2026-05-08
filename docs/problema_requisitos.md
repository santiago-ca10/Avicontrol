# 🐓 Problema

En muchas granjas avícolas, el control de producción aún se realiza de manera manual mediante cuadernos, hojas de cálculo o registros incompletos. Esto provoca problemas en la administración y seguimiento de la producción diaria, afectando la toma de decisiones operativas.

Además, cuando la cantidad de aves aumenta, resulta difícil llevar un control organizado de los galpones, las aves activas, la mortalidad y el rendimiento general de producción.

Entre las principales problemáticas identificadas se encuentran:

- Falta de organización centralizada de la información.
- Dificultad para controlar grandes cantidades de aves.
- Pérdida o inconsistencia de registros históricos.
- Escaso análisis de productividad diaria.
- Dificultad para detectar disminuciones en la producción.
- Ausencia de métricas visuales para apoyar decisiones.
- Procesos manuales que consumen tiempo y aumentan errores humanos.

Estas limitaciones reducen la eficiencia operativa y dificultan la optimización de la producción avícola.

---

#  Objetivo General

Desarrollar una aplicación web para la gestión y monitoreo de producción avícola, permitiendo administrar galpones, gallinas y registros diarios de producción mediante una interfaz moderna, centralizada y visual.

---

#  Objetivos Específicos

- Gestionar galpones y su capacidad operativa.
- Registrar gallinas y asociarlas a un galpón.
- Registrar la producción diaria de huevos por galpón.
- Llevar control de aves activas y mortalidad.
- Visualizar estadísticas y métricas de producción.
- Facilitar el análisis histórico de información.
- Mejorar la organización y trazabilidad de los registros.
- Optimizar la toma de decisiones mediante datos visuales.

---

# Requisitos Funcionales

## Gestión de Gallinas

- El sistema debe permitir registrar gallinas.
- El sistema debe permitir editar información de las gallinas.
- El sistema debe permitir eliminar gallinas.
- El sistema debe permitir asociar gallinas a un galpón.
- El sistema debe permitir visualizar el listado de gallinas registradas.

---

## Gestión de Galpones

- El sistema debe permitir crear galpones.
- El sistema debe permitir visualizar galpones registrados.
- El sistema debe almacenar la capacidad de cada galpón.

---

## Gestión de Producción

- El sistema debe permitir registrar producción diaria.
- El sistema debe registrar:
  - cantidad de huevos,
  - aves activas,
  - mortalidad,
  - consumo de alimento,
  - observaciones.

- El sistema debe permitir consultar registros históricos de producción.

---

## Dashboard y Métricas

- El sistema debe mostrar estadísticas generales.
- El sistema debe calcular métricas de productividad.
- El sistema debe visualizar información mediante tarjetas estadísticas.
- El sistema debe permitir visualizar información histórica de producción.

---

#  Requisitos No Funcionales

- La aplicación debe ser accesible desde navegadores modernos.
- El sistema debe mantener una arquitectura separada entre frontend y backend.
- La comunicación entre cliente y servidor debe realizarse mediante JSON.
- El sistema debe responder rápidamente a las consultas.
- La interfaz debe ser intuitiva y fácil de utilizar.
- El sistema debe contar con diseño responsive básico.
- El sistema debe permitir escalabilidad futura para nuevas funcionalidades.

---

# Alcance

El sistema cubre:

- Gestión de galpones.
- Gestión de gallinas.
- Registro de producción diaria.
- Registro de mortalidad y aves activas.
- Dashboard estadístico.
- Visualización de métricas generales.
- Historial de producción.
- Interfaz moderna con modo oscuro.

---

# Fuera del Alcance

El sistema no incluye actualmente:

- Sistema de autenticación y usuarios.
- Control financiero.
- Gestión de ventas.
- Inventario avanzado.
- Control veterinario completo.
- Reportes exportables PDF/Excel.
- Integración con sensores IoT.
- Notificaciones automáticas.
- Aplicación móvil nativa.

---

# Posibles Mejoras Futuras

- Alertas automáticas de baja productividad.
- Gestión sanitaria de aves.
- Control de vacunas y medicamentos.
- Reportes avanzados y exportables.
- Integración con gráficas estadísticas avanzadas.
- Multiusuario con roles y permisos.
- Aplicación móvil.
- Monitoreo en tiempo real.