# 📝✨ Convenciones de Nomenclatura en Comandos Git  

Este documento define las reglas que seguimos para nombrar **commits** y **ramas** en el proyecto, basadas en un flujo de trabajo estándar 🚀.  
El objetivo es mantener un historial claro, coherente y fácil de seguir 🧭.  

---


## 📂🌿 Estructura de Ramas  

### 🔹 Ramas Principales  

- **`main`** 🏁 → Contiene la versión en **producción**. 💼  
- **`developer`** 🧪 → Versión en **pruebas**, antes de pasar a producción.  

### 🔹 Ramas Temporales (derivadas de **`main`** o **`developer`**)  

| 🌱 Tipo de rama        | 🏷️ Prefijo  | 📌 Uso |
|------------------------|-------------|-------|
| **🚀 Funcionalidad**   | `feature/`  | Desarrollo de nuevas funciones ✨ |
| **🐞 Corrección**      | `fix/`      | Solución de errores en producción 🔧 |
| **🚨 Hotfix**          | `hotfix/`   | Correcciones urgentes en producción 🩹 |
| **📦 Lanzamiento**     | `release/`  | Preparación para pasar de `developer` a `main` 📤 |
| **🔄 Refactorización** | `refactor/` | Mejora de código sin cambiar la funcionalidad ♻️ |
| **🛠 Tareas Varias**   | `chore/`    | Mantenimiento, configuración, dependencias o tareas menores ⚙️ |
| **📚 Documentación**   | `docs/`     | Cambios solo en documentación 📝 |
| **🎨 Estilo**          | `style/`    | Cambios de formato o estilo que no afectan la lógica del código 🎯 |
| **🧪 Pruebas**         |  `test/`    | Añadir o mejorar tests automatizados, casos de prueba y validaciones ✅|




---

## 🏷️🌿 Formato de Nombre de Ramas

```text
<prefijo>/<descripcion-corta>
```

### 📖 Significado:

- `prefijo` → Tipo de rama (ej. `feat`, `fix`, `hotfix`, etc.)
- `descripcion-corta` → Breve descripción en *kebab-case* (ej. `mejora-filtrado-tabla`) ✏️

### 💡 Ejemplos:

```text
feature/gestion-inventario
fix/error-calculo-descuento
hotfix/fallo-carga-dashboard
```

---

## 💬📌 Formato para Mensajes de los Commits

```text
<tipo>(<scope>): <resumen>
```

### 📖 Significado:

- **tipo**: feat | fix | hotfix  | release | refactor | chore | docs  |  test  | style 🔤
- **scope**: módulo/área . Ej: api, pagos, usuarios, inventario 📦
- **resumen**: En imperativo con un máximo de 72 caracteres aprox ✏️


### 💡 Ejemplos:

```text
feat(inventario): agrega control de stock mínimo
fix(formulario): corrige bug en formulario de registro
docs(guia): añade ejemplos de configuración
refactor(servicios): optimiza consultas a la base de datos

```
---

## 🔀📦 Formato para Pull Requests (PR)

### Título:

```text
<tipo>(<scope>): <resumen>
```

### 💡 Ejemplos:

```text
- feat(productos): implementa búsqueda avanzada en productos
- fix(auth): soluciona error en validación de credenciales
```

### 📄 Cuerpo del PR:

- 🎯 **Objetivo:** Breve explicación del problema que se resuelve.
- ✨ **Cambios clave:** Lista con los cambios realizados.
- 🧪 **Cómo probar:** Pasos para verificar que funciona.
- ⚠️ **Impacto/Riesgos:** Indicar si hay cambios importantes o breaking changes.

---
