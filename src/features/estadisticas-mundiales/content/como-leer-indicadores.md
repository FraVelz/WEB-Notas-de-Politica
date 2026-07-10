---
title: Cómo leer los indicadores
description: Qué miden (y qué no) PIB, Gini, esperanza de vida y otras señales usadas en este archivo
---

Los números del [comparador](/estadisticas-mundiales/indicadores) y del [globo](/estadisticas-mundiales) son **señales**, no veredictos. Sirven para situar un país —el tuyo u otro— y plantear escenarios.

## Qué suele medir cada familia

| Familia | Ejemplo | Lectura prudente |
| --- | --- | --- |
| Ingreso | PIB per cápita | Promedio; no dice distribución ni bienestar subjetivo |
| Distribución | Gini | Desigualdad de ingreso; definiciones y años varían |
| Salud | Esperanza de vida | Resultado agregado; no aísla una sola política |
| Seguridad | Homicidios /100k | Comparabilidad limitada por registro y tipologías |
| Ambiente | CO₂ per cápita | Emisiones territoriales; no consumo importado completo |

## Escenarios, no absolutos

- Si el PIB per cápita sube y el Gini también, un escenario plausible es crecimiento con mayor concentración; otro es mejora media con rezagos regionales. Los datos **no eligen** por ti.
- Un percentil alto en un indicador y bajo en otro es frecuente. La prosperidad nacional suele ser **multidimensional**.
- Años distintos entre países en el «último valor disponible» introducen ruido: anota el año en la fuente.

## Qué no sabemos (límites)

- Causalidad: correlación entre democracia e ingreso no prueba que una cause la otra.
- Cobertura: algunos países faltan en Gini o pobreza; «sin dato» ≠ cero.
- Definiciones: pobreza extrema usa umbrales PPP que cambian con el tiempo.

## Fuentes

Snapshots en `/data/indicators/` generados desde [World Bank Open Data](https://data.worldbank.org/) (`pnpm data:fetch`). Licencia típica CC BY 4.0 del Banco Mundial.

Para el mapa político 2D, ver también el [globo terráqueo político](/globo-teraqueo-politico).
