# Actualizar toda la documentación IA (Notas de Política)

Usar cuando el usuario pida **actualizar toda la documentación IA**, **revisar todos los generados con IA** o invoque este comando.

## Qué hace

Ejecuta el flujo de **`.cursor/commands/update-docs.md`** en lote:

1. **Todo** `docs/es/**/*.md` y `docs/en/**/*.md` (siempre IA; ver abajo).
2. Cada `.md` en `src/features/**/content/` **marcado** con la línea de IA (o que el usuario indique como IA).

## Regla fija: `docs/` = generado por IA

**Todos** los archivos Markdown bajo `docs/es/` y `docs/en/` se consideran **contenido generado por IA**, tengan o no la línea de marca.

| Incluir siempre | Motivo |
| --- | --- |
| `docs/es/**/*.md` | Documentación del proyecto en español |
| `docs/en/**/*.md` | Documentación del proyecto en inglés |

**No** requiere que el usuario confirme archivo por archivo. Si **falta** la marca, **añadirla** al procesar:

```text
> **Generado con IA.** Última actualización: YYYY-MM-DD.
```

(ubicación recomendada: **al final** del archivo)

### Fuera de `docs/es/` y `docs/en/`

| Archivo | En este comando |
| --- | --- |
| `docs/README.md` | **No** (solo índice de enlaces; no es contenido técnico a revisar) |
| `README.md`, `README.EN.md` (raíz) | **No**, salvo petición explícita |
| `.cursor/commands/*.md` | **No** |

## Contenido del sitio (`src/features/.../content/`)

Solo entra si tiene la **marca IA** (patrón en `update-docs.md`) o el usuario lo nombra en la petición (“trata `X.md` como IA”).

Si indica un archivo sin marca → añadir marca con **fecha de hoy** y procesar con flujo IA.

Si dice que un archivo **deja de ser IA** → quitar marca; excluirlo de este comando.

## Procedimiento

1. **Listar candidatos**
   - Todos los `.md` en `docs/es/` y `docs/en/`.
   - Más los de `src/features/**/content/` con marca IA (+ extras del usuario).
2. **Mostrar** la lista al usuario antes de editar (orden: pares `docs/es/` ↔ `docs/en/` por nombre de archivo, luego contenido del sitio).
3. Para **cada** candidato, aplicar el flujo **“archivo generado por IA”** de `update-docs.md`:
   - Revisar contra fuentes de verdad (código, registry, rutas, scripts).
   - Actualizar contenido, ortografía y enlaces.
   - Marca: `> **Generado con IA.** Última actualización: <fecha de hoy>.`
   - **Paridad ES/EN:** cada par `docs/es/X.md` ↔ `docs/en/X.md` se actualiza **en la misma pasada** (misma información factual; no procesar el par dos veces por separado).
4. **Resumen** al terminar: archivos tocados, pares sincronizados, marcas añadidas, avisos si falta par en el otro idioma.

## Límites

- El usuario puede acotar el alcance (“solo `docs/`”, “solo `architecture.md`”, un tema en `src/features/…`); respetarlo.
- **No** commitear salvo petición explícita (`auto-commits.md`).

## Resumen para el agente

| Ubicación | ¿Es IA en este comando? |
| --- | --- |
| `docs/es/**`, `docs/en/**` | **Sí, siempre** (añadir marca si falta) |
| `docs/README.md` | No |
| `src/features/**/content/**` | Solo con marca IA o si el usuario lo dice |
| Raíz `README.md` / `README.EN.md` | No (salvo petición explícita) |

- Batch de `update-docs.md` con flujo IA completo.
- Refreszar **fecha de hoy** en la marca en cada archivo modificado.
- Paridad obligatoria entre `docs/es/` y `docs/en/` para el mismo nombre de archivo.
