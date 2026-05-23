# Actualizar toda la documentación IA (Notas de Política)

Usar cuando el usuario pida **actualizar toda la documentación IA**, **revisar todos los generados con IA**, **refrescar en bloque** la documentación del proyecto o invoque este comando.

**Cuándo usar este comando:** barrido masivo de `docs/es/`, `docs/en/` y notas marcadas en `src/features/.../content/`. Para **uno o pocos archivos** concretos (incluido README raíz), usar **`/update-docs`**.

## Relación con `update-docs.md`

Este comando **no sustituye** a `update-docs.md`: delega en él la política de contenido (pares `docs/es` ↔ `docs/en`, marca IA, pies, fuentes de verdad, restricciones).

Aquí solo se define **qué entra en el barrido**, **en qué orden trabajar** y **cuándo se permite tocar estructura o archivos nuevos**.

## Qué entra en el barrido

### Inclusión automática (sí entran)

| Ubicación | Criterio |
| --- | --- |
| `docs/es/**/*.md` | **Siempre IA** — no requiere marca previa |
| `docs/en/**/*.md` | **Siempre IA** — no requiere marca previa |
| `src/features/**/content/**/*.md` | Solo si tiene la **marca IA** (patrón en `update-docs.md`) o el usuario lo nombra en la petición |

**Regla fija:** todo Markdown bajo `docs/es/` y `docs/en/` se considera **contenido generado por IA**, tenga o no la línea de marca. Si **falta** la marca, **añadirla** al procesar:

```text
> **Generado con IA.** Última actualización: YYYY-MM-DD.
```

(ubicación recomendada: **al final** del archivo, **antes** de `> **Autor:** …` si existe)

Para `src/features/.../content/`: si el usuario indica un archivo sin marca → añadir marca con **fecha de hoy** y procesar. Si dice que un archivo **deja de ser IA** → quitar marca; excluirlo de este comando.

### Exclusión por defecto (no entran)

| Archivo / ubicación | Motivo |
| --- | --- |
| `docs/README.md` | Solo índice de enlaces; no es contenido técnico a revisar |
| `README.md`, `README.EN.md` (raíz) | Fuera de alcance salvo petición explícita |
| `.cursor/commands/*.md` | Comandos del agente, no documentación del proyecto |
| Markdown en `docs/` **fuera** de `docs/es/` y `docs/en/` | Salvo que el usuario lo mencione; usar **`/update-docs`** sobre ese `@` concreto |
| `src/features/**/content/**` **sin** marca IA | Salvo que el usuario lo indique como IA |

Si el usuario pide **añadir la marca IA** a otros docs, normalizar el pie según `update-docs.md` e incluirlos en el barrido actual.

## Flujo para el agente

1. **Inventario (solo lectura)**
   - Todos los `.md` en `docs/es/` y `docs/en/`.
   - Más los de `src/features/**/content/` con marca IA (+ extras que indique el usuario).
   - Agrupar por par bilingüe: misma ruta relativa en `docs/es/` y `docs/en/`, más cualquier **tabla de excepciones** en `update-docs.md` de este repo.

2. **Informar**
   - Mostrar lista **antes de editar**: archivo → idioma → par (`Sí` / `No` / `Par incompleto`) → ¿tiene marca IA?
   - Orden sugerido en la lista: pares `docs/es/` ↔ `docs/en/` por nombre de archivo, luego contenido del sitio.

3. **Por cada grupo (idealmente par ES+EN)**
   - Aplicar **íntegramente** el flujo **“archivo generado por IA”** de `update-docs.md`:
     - Revisar contra fuentes de verdad (código, registry, rutas, scripts).
     - Actualizar contenido, ortografía y enlaces.
     - Marca: `> **Generado con IA.** Última actualización: <fecha de hoy>.`
     - **Paridad ES/EN:** cada par `docs/es/X.md` ↔ `docs/en/X.md` en la **misma pasada** (misma información factual; no procesar el par dos veces por separado).

4. **Orden sugerido de procesamiento**
   - Primero índices y resúmenes que enlazan a otros docs.
   - Luego guías de estructura, setup, backend, datos, etc.
   - Por último notas en `src/features/.../content/`.

5. **Estructura y archivos nuevos**
   - **Permitido:** renombrar, crear o fusionar archivos **solo** entre documentación IA o para coherencia de índices y pares EN/ES.
   - **Obligatorio:** si se crea o renombra algo, actualizar **todos** los enlaces internos afectados en `docs/es` y `docs/en` en la misma ejecución.
   - **Preferencia:** no reestructurar por gusto; hacerlo cuando el repo o los índices lo exijan.

6. **Resumen final**
   - Archivos tocados, pares sincronizados, marcas añadidas o quitadas, huérfanos (par incompleto), cambios estructurales.
   - Docs con “última actualización” pero **sin** marca IA y **fuera** del alcance (no modificados salvo petición).

## Límites y restricciones

- El usuario puede **acotar** el alcance (“solo `docs/`”, “solo `architecture.md`”, un tema en `src/features/…`); respetarlo.
- Heredar las restricciones de `update-docs.md`.
- **No** commitear salvo petición explícita (`auto-commits.md`).
- Respuesta al usuario en **español** salvo que pida otro idioma.

## Resumen para el agente

| Ubicación | ¿Es IA en este comando? |
| --- | --- |
| `docs/es/**`, `docs/en/**` | **Sí, siempre** (añadir marca si falta) |
| `docs/README.md` | No |
| `src/features/**/content/**` | Solo con marca IA o si el usuario lo dice |
| Raíz `README.md` / `README.EN.md` | No (salvo petición explícita) |

- Batch del flujo IA completo de `update-docs.md`.
- Refrescar **fecha de hoy** en la marca en cada archivo modificado.
- Paridad obligatoria entre `docs/es/` y `docs/en/` para el mismo nombre de archivo.
