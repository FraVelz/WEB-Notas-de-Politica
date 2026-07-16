# ADR 0001 — Eliminar Three.js del build

- **Estado:** Aceptado
- **Fecha:** 2026-07-15
- **Contexto:** Lab L7 / Oleada 4 — craft editorial Demo, no mid producto

## Decisión

Retirar `three`, `@react-three/fiber`, `@react-three/drei` y el feature `interactive-globe` del bundle de producción.

## Motivos

1. El globo 3D no exponía `source_id` / año / licencia por capa (invariante de datos del archivo).
2. MapLibre ya cubre orientación espacial (`WorldConnectionsMap`, hub Globo terráqueo político).
3. El peso del bundle competía con lectura MD y el comparador de indicadores (Recharts).

## Consecuencias

- `/estadisticas-mundiales/mapa` usa MapLibre + copy honesta.
- Comparación de indicadores sigue en `/estadisticas-mundiales/indicadores`.
- Reabrir Three.js solo con ADR que ligue la visualización a un dataset commitado con provenance.
