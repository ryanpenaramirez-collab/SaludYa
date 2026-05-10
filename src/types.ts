export type UserRole = 'PATIENT' | 'DOCTOR' | 'RECEPTIONIST' | 'ADMIN';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  specialty?: string;
  phoneNumber?: string;
  documentId?: string;
  createdAt: string;
}

export interface ClinicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}

export type AppointmentStatus = 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  notes?: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScheduleSlot {
  start: string;
  end: string;
}

export interface DoctorSchedule {
  doctorId: string;
  dayOfWeek: number;
  slots: ScheduleSlot[];
  consultationDuration: number;
}
