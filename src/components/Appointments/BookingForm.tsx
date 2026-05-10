import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Clock, CheckCircle, ChevronRight, Stethoscope } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Appointment, UserProfile } from '../../types';

interface BookingFormProps {
  onBookingComplete: (appt: Appointment) => void;
  doctors: UserProfile[];
}

const STEPS = ['Especialidad', 'Médico', 'Horario', 'Confirmación'];

export default function BookingForm({ onBookingComplete, doctors }: BookingFormProps) {
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState({
    specialty: '',
    doctor: null as any,
    time: ''
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const handleFinalConfirm = () => {
    const newAppt: Appointment = {
      id: `APT-${Math.random().toString(36).substr(2, 9)}`,
      patientId: 'p-logged-in', // Simulation
      doctorId: selection.doctor?.uid || 'dr1',
      startTime: `2026-05-10T${selection.time}:00Z`,
      endTime: `2026-05-10T${selection.time}:30:00Z`,
       status: 'CONFIRMED',
      type: selection.specialty,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    onBookingComplete(newAppt);
  };

  return (
    <div className="max-w-3xl mx-auto bento-card p-0 overflow-hidden shadow-2xl shadow-slate-200">
      {/* Progress Bar */}
      <div className="bg-slate-50 px-8 py-6 border-b border-border">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div ripple="true" className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-extrabold transition-all",
                step >= i ? "bg-accent text-white" : "bg-slate-200 text-text-muted"
              )}>
                {i + 1}
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest hidden md:block",
                step >= i ? "text-text-main" : "text-text-muted"
              )}>{s}</span>
              {i < 3 && <ChevronRight size={14} className="text-border ml-1" />}
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 lg:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="min-h-[350px]"
          >
            {step === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Cardiología', 'Pediatría', 'Dermatología', 'Medicina General'].map(spec => (
                  <button
                    key={spec}
                    onClick={() => { setSelection(s => ({ ...s, specialty: spec })); nextStep(); }}
                    className={cn(
                      "bento-card border-2 text-left group hover:scale-[1.02]",
                      selection.specialty === spec ? "border-accent bg-blue-50/50" : "border-border hover:border-accent/40"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg border border-border group-hover:bg-accent group-hover:text-white transition-colors">
                        <Stethoscope size={20} />
                      </div>
                      <span className="text-sm font-extrabold text-text-main">{spec}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col gap-4">
                <div className="bento-header">Médicos Disponibles</div>
                <h3 className="bento-title">Especialistas en {selection.specialty}</h3>
                {doctors.map(doctor => (
                  <button
                    key={doctor.uid}
                    onClick={() => { setSelection(s => ({ ...s, doctor })); nextStep(); }}
                    className="bento-card flex-row items-center justify-between border border-border hover:border-accent/40 hover:bg-slate-50 transition-all text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden border border-border">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${doctor.displayName}`} alt={doctor.displayName} />
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-text-main">{doctor.displayName}</p>
                        <p className="text-[10px] uppercase font-bold text-text-muted tracking-wide">{doctor.specialty} • 15 años exp.</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-text-muted" />
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-6">
                <div className="bento-header">CALENDARIO</div>
                <div className="bg-slate-50 p-4 rounded-xl border border-border text-center">
                  <p className="text-text-main font-bold text-sm">Martes, 10 de Mayo 2026</p>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {['08:00', '08:30', '09:00', '10:00', '11:30', '14:00', '15:30', '16:00'].map(t => (
                    <button
                        key={t}
                        onClick={() => { setSelection(s => ({ ...s, time: t })); nextStep(); }}
                        className="py-3 px-2 rounded-lg border border-border font-extrabold text-sm text-text-main hover:bg-accent hover:text-white hover:border-accent transition-all"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col items-center text-center gap-6 py-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-100">
                  <CheckCircle size={32} />
                </div>
                <div>
                  <div className="bento-header justify-center mb-1">PROCESO FINALIZADO</div>
                  <h2 className="bento-title text-2xl">Confirmar Agendamiento</h2>
                  <p className="text-xs text-text-muted">Revise la información antes de generar la orden médica.</p>
                </div>
                <div className="w-full max-w-sm bg-slate-50 p-6 rounded-2xl space-y-4 text-left border border-border font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-text-muted uppercase">PACIENTE:</span>
                    <span className="font-bold text-text-main">JUAN SEBASTIÁN PEÑA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted uppercase">MÉDICO:</span>
                    <span className="font-bold text-text-main">{selection.doctor?.displayName.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted uppercase">ESPECIALIDAD:</span>
                    <span className="font-bold text-text-main">{selection.specialty.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-border">
                    <span className="text-accent font-bold uppercase">FECHA Y HORA:</span>
                    <span className="font-bold text-accent">10-05-2026 @ {selection.time}</span>
                  </div>
                </div>
                <button 
                  onClick={handleFinalConfirm}
                  className="w-full max-w-sm py-4 bg-accent text-white rounded-xl font-extrabold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all uppercase tracking-widest text-xs"
                >
                  Confirmar y Generar Cita
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {step > 0 && step < 3 && (
          <button 
            onClick={prevStep}
            className="mt-8 text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-accent transition-colors"
          >
            ← Volver al paso anterior
          </button>
        )}
      </div>
    </div>
  );
}
