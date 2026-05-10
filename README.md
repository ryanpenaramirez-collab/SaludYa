# 🏥 Sistema de Gestión de Agendamiento Médico

<div align="center">

</div>

---

## 📋 Tabla de Contenidos

- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Problema que Resuelve](#-problema-que-resuelve)
- [Funcionalidades](#-funcionalidades)
- [Arquitectura y Tecnologías](#-arquitectura-y-tecnologías)
- [Modelo de Datos](#-modelo-de-datos)
- [Casos de Uso](#-casos-de-uso)
- [Requerimientos](#-requerimientos)
- [Instalación](#-instalación)
- [Autores](#-autores)

---

## 🔍 Sobre el Proyecto

El **Sistema de Gestión de Agendamiento Médico** es una plataforma web desarrollada para digitalizar y centralizar la operación de consultorios médicos e IPS (Instituciones Prestadoras de Salud) de mediana y baja complejidad en Colombia.

El sistema reemplaza los modelos de gestión analógicos (libros físicos, hojas de cálculo, WhatsApp) por una solución con arquitectura de datos validada, integridad referencial y notificaciones automatizadas, alineada con la **Ley 1581 de 2012 (Habeas Data)** y los lineamientos de transformación digital del Ministerio de Salud.

> Proyecto académico desarrollado para la asignatura **Técnicas de Modelado de Software** — Grupo 402  
> Universidad Tecnológica de Pereira

---

## 🚨 Problema que Resuelve

Las IPS y consultorios independientes en Colombia enfrentan tres fallos estructurales por operar de forma manual:

| Fallo | Impacto |
|---|---|
| **Inconsistencia de datos** | Cruces de horarios, duplicidad de registros y solapamiento de citas por falta de validación en tiempo real |
| **Fragmentación de información** | Historial clínico disperso en múltiples archivos; médico sin contexto previo del paciente en cada consulta |
| **Desconexión comunicativa** | Altas tasas de inasistencia (no-show) por ausencia de recordatorios automáticos, generando capacidad instalada ociosa |

---

## ✨ Funcionalidades

### 👤 Para el Paciente
- Agendar, cancelar y reprogramar citas médicas
- Recibir recordatorios automáticos por correo o SMS (24h antes)
- Confirmar asistencia desde el recordatorio
- Consultar historial cronológico de citas

### 🩺 Para el Médico
- Visualizar agenda en vistas diaria, semanal y mensual
- Registrar notas de seguimiento clínico post-consulta
- Consultar historial de citas de sus pacientes

### 🗂️ Para la Recepcionista
- Registrar y actualizar datos de pacientes
- Gestionar citas en nombre del paciente
- Buscar pacientes por nombre, documento o teléfono

### 📊 Para el Administrador
- Generar reportes de asistencia e inasistencia (exportables en PDF/CSV)
- Visualizar indicadores de ocupación, horas ociosas y demanda por especialidad
- Filtrar métricas por médico, especialidad y rango de fechas

---

## 🏗️ Arquitectura y Tecnologías

El sistema está diseñado con una **arquitectura en capas** que garantiza mantenibilidad y escalabilidad horizontal del módulo de notificaciones.

```
┌─────────────────────────────────────┐
│           Capa de Presentación       │  ← Interfaz Web (Chrome, Firefox, Edge)
├─────────────────────────────────────┤
│           Capa de Negocio            │  ← Lógica de agendamiento y validaciones
├─────────────────────────────────────┤
│           Capa de Datos              │  ← Base de datos relacional con integridad referencial
└─────────────────────────────────────┘
```

### Requisitos No Funcionales Clave

- ⚡ **Rendimiento**: Validación de disponibilidad en < 2 segundos con 50 usuarios concurrentes
- 🔒 **Seguridad**: Autenticación con contraseñas hasheadas con bcrypt (costo mínimo 12), sesiones con expiración a 30 min
- 📈 **Disponibilidad**: Uptime del 99.5% mensual
- 📱 **Responsivo**: Compatible desde 360px de ancho

---

## 🗄️ Modelo de Datos

El diagrama relacional contempla las siguientes entidades principales:

```
ESPECIALIDAD ──< MEDICO ──< CITA >── PACIENTE
                               │
                    ┌──────────┼──────────┐
                    ▼          ▼          ▼
           SEGUIMIENTO   NOTIFICACION  CITA (reprogramación)
           _CLINICO
```

**Entidades principales:**

| Entidad | Descripción |
|---|---|
| `PACIENTE` | Datos demográficos, contacto y consentimiento Habeas Data |
| `MEDICO` | Información profesional, especialidad y licencia médica |
| `ESPECIALIDAD` | Catálogo de especialidades con duración de consulta configurable |
| `CITA` | Registro central con estado, vínculo a cita original (reprogramación) |
| `NOTIFICACION` | Canal, tipo y estado de envío de cada notificación |
| `SEGUIMIENTO_CLINICO` | Notas y diagnóstico post-consulta asociados a una cita |

---

## 📐 Casos de Uso

El sistema cubre **12 casos de uso** organizados por actor:

<details>
<summary><strong>Paciente / Recepcionista</strong></summary>

- **CU-01** — Agendar Cita Médica (selección de especialidad, médico y franja horaria con validación en tiempo real)
- **CU-02** — Cancelar Cita Médica (libera el slot y notifica al médico)
- **CU-03** — Reprogramar Cita (extiende CU-02 y CU-01, manteniendo vínculo histórico)
- **CU-06** — Confirmar Asistencia (respuesta al recordatorio automático)
- **CU-09** — Registrar Paciente (captura de datos con consentimiento explícito)
- **CU-10** — Actualizar Datos del Paciente

</details>

<details>
<summary><strong>Médico / Recepcionista</strong></summary>

- **CU-04** — Consultar Agenda Médica (vistas diaria, semanal y mensual con filtros)
- **CU-07** — Ver Historial de Citas (estados: PROGRAMADA, CONFIRMADA, ATENDIDA, CANCELADA, NO-SHOW)
- **CU-08** — Registrar Seguimiento Clínico (notas a citas en estado ATENDIDA)

</details>

<details>
<summary><strong>Sistema (automático)</strong></summary>

- **CU-05** — Enviar Recordatorio Automático (SMS o correo 24h antes de la cita)
- **RF-08** — Marcar NO-SHOW automáticamente si no hay atención en los 30 min posteriores

</details>

<details>
<summary><strong>Administrador</strong></summary>

- **CU-11** — Generar Reporte de Asistencia (exportable en PDF o CSV)
- **CU-12** — Ver Indicadores de Capacidad (ocupación, horas ociosas, demanda por especialidad)

</details>

---

## 📄 Requerimientos

### Funcionales (resumen)

| ID | Descripción |
|---|---|
| RF-01 | Validación en tiempo real de disponibilidad del médico (previene solapamientos) |
| RF-02 | Duración de consulta configurable por especialidad (15–60 min) |
| RF-03 | Recordatorio automático 24h antes por correo o SMS |
| RF-04 | Estados de cita: `PROGRAMADA`, `CONFIRMADA`, `ATENDIDA`, `CANCELADA` |
| RF-05 | Historial auditable de cambios de estado (usuario + timestamp) |
| RF-07 | Reportes exportables en PDF y CSV |
| RF-08 | Registro automático de `NO-SHOW` a los 30 min post-hora-programada |
| RF-10 | Bloqueo de franjas no disponibles (vacaciones, incapacidad) |
| RF-12 | Vínculo histórico entre cita reprogramada y cita original |

### No Funcionales (resumen)

| ID | Categoría | Especificación |
|---|---|---|
| RNF-01 | Rendimiento | Respuesta < 2s con 50 usuarios concurrentes |
| RNF-02 | Disponibilidad | Uptime 99.5% mensual |
| RNF-03 | Seguridad | bcrypt factor 12, sesión expira en 30 min |
| RNF-06 | Usabilidad | Agendamiento en máximo 4 pasos |
| RNF-07 | Mantenibilidad | Cobertura de pruebas unitarias ≥ 70% |
| RNF-10 | Privacidad | Cumplimiento Ley 1581/2012 (Habeas Data) |

---

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# Ingresar al directorio
cd TU_REPOSITORIO

# Instalar dependencias
npm install   # o el gestor que uses

# Configurar variables de entorno
cp .env.example .env

# Ejecutar en desarrollo
npm run dev
```

> ⚠️ Asegúrate de configurar las variables de entorno para la base de datos y el servicio de notificaciones antes de ejecutar.

---

## 👥 Autores

| Nombre | Rol |
|---|---|
| Marie Angelina Castañeda Crespo | Desarrolladora |
| Danna Machado Mosquera | Desarrolladora |
| Ryan Peña Ramírez | Desarrollador |

**Docente:** Daniel Andrés Duque Ramírez  
**Asignatura:** Técnicas de Modelado de Software — Grupo 402  
**Institución:** Universidad Tecnológica de Pereira

---

</div>
