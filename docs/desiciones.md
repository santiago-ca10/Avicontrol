# 🧠 Decisiones Técnicas — Avicontrol

Registro de las decisiones de diseño tomadas durante el desarrollo y sus justificaciones.

---

## 1. Sin código individual de gallinas

**Decisión:** Eliminar el campo `codigo` de la tabla gallinas.

**Justificación:** En una granja real, las gallinas no se identifican individualmente sino por grupo (raza, lote, fecha de ingreso). El código individual generaba fricción en el registro y no aportaba valor operativo real.

**Resultado:** Las gallinas se registran por lotes. El sistema les asigna ID automático de la BD.

---

## 2. Gallinas muertas/vendidas fuera del conteo

**Decisión:** Las gallinas con estado `muerta` o `vendida` no cuentan en la ocupación del galpón y desaparecen de la tabla activa.

**Justificación:** Una gallina muerta o vendida ya no ocupa espacio físico en el galpón. Mantenerla en el conteo generaría inconsistencias entre la capacidad reportada y la real.

**Implementación:** La query de `stats()` en `galpones.repository.js` filtra con `WHERE estado IN ('activa', 'enferma')`.

---

## 3. Confirmación con texto para acciones destructivas

**Decisión:** Para eliminar galpones, registros de producción, o marcar gallinas como muertas/vendidas, el usuario debe escribir una palabra clave para confirmar.

**Justificación:** Evita eliminaciones accidentales en datos críticos. El `ConfirmModal` con input de texto es un patrón UX ampliamente usado en sistemas de producción (GitHub, Vercel, etc.).

---

## 4. Portal de React para modales

**Decisión:** Los modales usan `ReactDOM.createPortal(modal, document.body)`.

**Justificación:** Las extensiones del navegador (Google Translate, Grammarly, etc.) modifican el DOM directamente. Cuando React intenta desmontar sus nodos y los encuentra alterados, lanza errores de `removeChild`. El portal monta el modal fuera del árbol de componentes, eliminando el conflicto.

---

## 5. Validación de duplicados en producción por backend

**Decisión:** La validación de "mismo galpón, misma fecha" ocurre en el service, no solo en el frontend.

**Justificación:** Las validaciones solo en frontend son bypasseables directamente con la API. El backend es la única capa confiable para hacer cumplir las reglas de negocio.

---

## 6. Galpones como módulo principal

**Decisión:** La gestión de gallinas vive dentro del detalle de cada galpón, no en una página independiente.

**Justificación:** En el flujo real de trabajo, siempre se piensa en "las gallinas del galpón X", no en "todas las gallinas". Este modelo mental se refleja mejor con gallinas anidadas dentro de galpones.

---

## 7. Clean Architecture simplificada

**Decisión:** Usar capas controller/service/repository/domain sin inyección de dependencias formal.

**Justificación:** La inyección de dependencias completa añadiría complejidad innecesaria para el tamaño del proyecto. La estructura actual es suficientemente modular para escalar y mantener sin sacrificar velocidad de desarrollo. El `port.js` mantiene la puerta abierta para migrar el repositorio en el futuro si se necesita.