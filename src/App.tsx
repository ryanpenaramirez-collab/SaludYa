/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { cn } from './lib/utils';
import RootLayout from './components/Layout';
import Overview from './components/Dashboard/Overview';
import BookingForm from './components/Appointments/BookingForm';
import PatientsList from './components/Patients/PatientsList';
import ClinicalHistory from './components/History/ClinicalHistory';
import { Calendar, Plus } from 'lucide-react';
import { UserRole, UserProfile, ClinicalRecord, Appointment } from './types';
import { MOCK_PATIENTS, MOCK_RECORDS, MOCK_DOCTORS } from './mocks/data';

export default function App() {
  const [role, setRole] = useState<UserRole>('DOCTOR');
  const [activeTab, setActiveTab] = useState('agenda');
  const [view, setView] = useState<'dashboard' | 'booking'>('dashboard');
  
  // High-level states for "Local DB"
  const [patients, setPatients] = useState<UserProfile[]>(MOCK_PATIENTS);
  const [records, setRecords] = useState<ClinicalRecord[]>(MOCK_RECORDS);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const addPatient = (newPatient: UserProfile) => {
    setPatients(prev => [newPatient, ...prev]);
  };

  const addRecord = (newRecord: ClinicalRecord) => {
    setRecords(prev => [newRecord, ...prev]);
  };

  const addAppointment = (newAppt: Appointment) => {
    setAppointments(prev => [newAppt, ...prev]);
    setView('dashboard');
    setActiveTab('agenda');
  };

  const renderContent = () => {
    if (activeTab === 'pacientes') return (
      <PatientsList 
        patients={patients} 
        onAddPatient={addPatient} 
        canEdit={role === 'DOCTOR' || role === 'ADMIN'} 
      />
    );
    
    if (activeTab === 'historial') return (
      <ClinicalHistory 
        records={records} 
        patients={patients} 
        onAddRecord={addRecord}
        canEdit={role === 'DOCTOR' || role === 'ADMIN'}
      />
    );

    if (activeTab === 'config') return (
      <div className="bento-card col-span-12 row-span-4">
        <div className="bento-header">SISTEMA</div>
        <div className="bento-title">Configuración del Sistema</div>
        <p className="text-sm text-text-muted mb-6">Administre los parámetros globales de MediSched Colombia.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {['Usuarios y Permisos', 'Horarios de Clínica', 'Plantillas de Notificación', 'Backup de Datos'].map(item => (
             <div key={item} className="p-4 border border-border rounded-xl hover:bg-slate-50 cursor-pointer transition-colors flex justify-between items-center group">
               <span className="text-sm font-bold text-text-main">{item}</span>
               <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                 <Plus size={14} />
               </div>
             </div>
           ))}
        </div>
      </div>
    );
    
    // Agenda Tab
    if (view === 'booking') return (
      <BookingForm 
        onBookingComplete={addAppointment} 
        doctors={MOCK_DOCTORS}
      />
    );
    
    // Default Agenda View
    return (
      <Overview 
        appointments={appointments} 
        patients={patients} 
        role={role} 
        onStartBooking={() => setView('booking')} 
      />
    );
  };

  const roleName = useMemo(() => {
    if (role === 'ADMIN') return 'Administrador';
    if (role === 'DOCTOR') return 'Dr. García';
    return 'Paciente Demo';
  }, [role]);

  const getTitle = () => {
    if (activeTab === 'pacientes') return 'Gestión de Pacientes';
    if (activeTab === 'historial') return 'Historial Clínico';
    if (activeTab === 'config') return 'Configuración';
    
    return view === 'dashboard' 
      ? `Bienvenido, ${roleName}` 
      : 'Nueva Cita Médica';
  };

  return (
    <RootLayout 
      userRole={role} 
      onRoleChange={setRole} 
      activeTab={activeTab} 
      onTabChange={(tab) => { setActiveTab(tab); setView('dashboard'); }}
    >
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="bento-header mb-1">SALUDYA CORE • ID: {role}</div>
            <h3 className="text-3xl font-extrabold text-text-main tracking-tight">
              {getTitle()}
            </h3>
          </div>
          
          {activeTab === 'agenda' && (
            <motion.button 
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView(view === 'dashboard' ? 'booking' : 'dashboard')}
              className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all shadow-xl text-xs uppercase tracking-widest border border-transparent",
                role === 'PATIENT' && view === 'dashboard'
                  ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-blue-200/50"
                  : "bg-text-main text-white hover:bg-slate-800 shadow-slate-200"
              )}
            >
              {view === 'dashboard' ? (
                <>
                  <div className={cn(
                    "p-1.5 rounded-lg",
                    role === 'PATIENT' ? "bg-white/20" : "bg-white/10"
                  )}>
                    <Plus size={16} />
                  </div>
                  <span>{role === 'DOCTOR' ? 'Nueva Cita' : 'Solicitar Cita Médica'}</span>
                </>
              ) : (
                <>
                  <Calendar size={16} />
                  <span>Ver Agenda</span>
                </>
              )}
            </motion.button>
          )}
        </div>

        {renderContent()}
      </div>
    </RootLayout>
  );
}

