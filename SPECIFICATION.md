# Master Prompt: Sistema de Gestión de Agendamiento Médico (SaludYa)

Este documento es una especificación técnica completa para el desarrollo de un sistema de gestión de salud ambulatoria.

## 1. Contexto y Objetivos
**Problema:** El sistema de salud colombiano sufre de ineficiencias críticas: procesos manuales, falta de seguimiento en tiempo real y una tasa de inasistencia (No-Show) superior al 20%.
**Solución:** SaludYa centraliza la operación, automatiza recordatorios y provee analítica avanzada para optimizar la capacidad instalada de las clínicas.

## 2. Arquitectura del Modelo de Datos (Relacional)
El sistema debe basarse en un modelo relacional estricto:
*   **Users:** `id (PK)`, `email`, `password_hash`, `role` (Admin, Doctor, Patient, Staff), `specialty_id (FK)`, `document_type`, `document_id`.
*   **Specialties:** `id (PK)`, `name`, `default_duration`.
*   **Appointments:** `id (PK)`, `patient_id (FK)`, `doctor_id (FK)`, `start_time`, `end_time`, `status` (Enum: SCHEDULED, CONFIRMED, COMPLETED, CANCELLED, NO_SHOW), `clinical_notes`, `metadata`.
*   **Schedules:** `id (PK)`, `doctor_id (FK)`, `day_of_week` (0-6), `start_hour`, `end_hour`, `slot_duration`.

## 3. Requerimientos Funcionales (User Stories)
### A. Paciente (Reserva en < 4 Pasos)
1. Selección de Especialidad → 2. Selección de Médico y Horario → 3. Confirmación de Cita.
### B. Médico (Control de Consultas)
*   Vista de agenda diaria con indicadores de estado.
*   Registro de notas clínicas durante la consulta (bloqueadas tras cierre).
### C. Administrador (Análisis de Capacidad)
*   Reporte de **Ocupación de Agenda** (Horas asignadas vs. Horas disponibles).
*   Reporte de **Eficiencia de Asistencia** (Citas atendidas vs. No-asistencias).

## 4. Validaciones y Reglas de Negocio
*   **Validación de Traslape:** Un médico no puede tener dos citas que se crucen en el tiempo.
*   **Política de Cancelación:** El paciente solo puede cancelar vía web con >12 horas de antelación.
*   **Bloqueo de Cupos:** Al agendar, el slot debe marcarse como ocupado inmediatamente en el pool de disponibilidad compartida.

## 5. Staff Tecnológico Recomendado
*   **Frontend:** React (Vite) + Tailwind CSS + Framer Motion.
*   **Backend:** Node.js (Express) con autenticación JWT/Bcrypt.
*   **Base de Datos:** PostgreSQL para integridad referencial.
*   **Infraestructura:** Despliegue en contenedores (Cloud Run) con SSL y cumplimiento de Ley 1581 (Colombia).
