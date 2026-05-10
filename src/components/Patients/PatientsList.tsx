import React, { useState } from 'react';
import { Users, Search, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';
import { UserProfile } from '../../types';

interface PatientsListProps {
  patients: UserProfile[];
  onAddPatient: (p: UserProfile) => void;
  canEdit: boolean;
}

export default function PatientsList({ patients, onAddPatient, canEdit }: PatientsListProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', doc: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPatient({
      uid: `P-${Date.now()}`,
      displayName: newPatient.name,
      documentId: newPatient.doc,
      email: newPatient.email,
      role: 'PATIENT',
      createdAt: new Date().toISOString()
    });
    setShowAdd(false);
    setNewPatient({ name: '', doc: '', email: '' });
  };

  return (
    <div className="flex flex-col gap-6">
      {showAdd && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl w-full max-w-md p-8 border border-border shadow-2xl">
            <h3 className="bento-title mb-6">Registrar Nuevo Paciente</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-text-muted uppercase mb-1 block">Nombre Completo</label>
                <input required value={newPatient.name} onChange={e => setNewPatient({...newPatient, name: e.target.value})} type="text" className="w-full px-4 py-2 bg-slate-50 border border-border rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-text-muted uppercase mb-1 block">Nro. Documento</label>
                <input required value={newPatient.doc} onChange={e => setNewPatient({...newPatient, doc: e.target.value})} type="text" className="w-full px-4 py-2 bg-slate-50 border border-border rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-text-muted uppercase mb-1 block">Email Contacto</label>
                <input required value={newPatient.email} onChange={e => setNewPatient({...newPatient, email: e.target.value})} type="email" className="w-full px-4 py-2 bg-slate-50 border border-border rounded-lg text-sm" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-3 text-xs font-bold uppercase text-text-muted">Cancelar</button>
                <button type="submit" className="flex-1 py-3 bg-accent text-white rounded-xl text-xs font-bold uppercase">Registrar</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
          <input 
            type="text" 
            placeholder="Buscar paciente por nombre o documento..." 
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
          />
        </div>
        {canEdit && (
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all">
            <UserPlus size={16} />
            <span>Nuevo Paciente</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map(patient => (
          <div key={patient.uid} className="bento-card hover:border-accent/40 cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-accent">
                <Users size={24} />
              </div>
              <span className="tag bg-slate-50 text-[10px]">ID: {patient.documentId}</span>
            </div>
            <h4 className="text-base font-extrabold text-text-main mb-1">{patient.displayName}</h4>
            <p className="text-xs text-text-muted mb-4">{patient.email}</p>
            <div className="mt-auto flex border-t border-border pt-4 gap-2">
              <button className="flex-1 py-2 bg-slate-50 rounded-lg text-[10px] font-bold text-text-muted hover:bg-slate-100 uppercase tracking-tighter">
                Ver Perfil
              </button>
              <button className="flex-1 py-2 bg-blue-50 text-accent rounded-lg text-[10px] font-bold hover:bg-blue-100 uppercase tracking-tighter">
                Historia Clínica
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
