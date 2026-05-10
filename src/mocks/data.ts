import { UserProfile, Appointment } from '../types';

export const MOCK_DOCTORS: UserProfile[] = [
  {
    uid: 'dr1',
    email: 'dr.garcia@medisched.co',
    displayName: 'Dr. Alejandro García',
    role: 'DOCTOR',
    specialty: 'Cardiología',
    createdAt: new Date().toISOString(),
    phoneNumber: '+57 300 123 4567'
  },
  {
    uid: 'dr2',
    email: 'dra.lopez@medisched.co',
    displayName: 'Dra. Beatriz López',
    role: 'DOCTOR',
    specialty: 'Pediatría',
    createdAt: new Date().toISOString(),
    phoneNumber: '+57 310 987 6543'
  }
];

export const MOCK_PATIENTS: UserProfile[] = [
  {
    uid: 'p1',
    email: 'juan.perez@email.com',
    displayName: 'Juan Pérez',
    role: 'PATIENT',
    documentId: '10203040',
    phoneNumber: '+57 321 000 1122',
    createdAt: '2025-01-10T10:00:00Z'
  },
  {
    uid: 'p2',
    email: 'maria.g@email.com',
    displayName: 'María García',
    role: 'PATIENT',
    documentId: '52637485',
    phoneNumber: '+57 315 444 5566',
    createdAt: '2025-02-15T14:30:00Z'
  },
  {
    uid: 'p3',
    email: 'carlos.r@email.com',
    displayName: 'Carlos Ruiz',
    role: 'PATIENT',
    documentId: '10998877',
    phoneNumber: '+57 300 777 8899',
    createdAt: '2025-03-05T09:15:00Z'
  }
];

export const MOCK_RECORDS = [
  {
    id: 'rec1',
    patientId: 'p1',
    doctorId: 'dr1',
    date: '2026-05-01',
    diagnosis: 'Hipertensión controlada',
    treatment: 'Losartán 50mg cada 24h',
    notes: 'Paciente muestra mejoría significativa. Se recomienda dieta baja en sodio.'
  }
];
