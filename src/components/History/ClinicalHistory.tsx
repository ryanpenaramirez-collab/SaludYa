import React, { useState } from 'react';
import { ClipboardList, Filter, Download, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { ClinicalRecord, UserProfile } from '../../types';

interface ClinicalHistoryProps {
  records: ClinicalRecord[];
  patients: UserProfile[];
  onAddRecord: (r: ClinicalRecord) => void;
  canEdit: boolean;
}

export default function ClinicalHistory({ records, patients, onAddRecord, canEdit }: ClinicalHistoryProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    diagnosis: '',
    treatment: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRecord({
      id: `REC-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      doctorId: 'dr1',
      ...formData
    });
    setShowAdd(false);
    setFormData({ patientId: '', diagnosis: '', treatment: '', notes: '' });
  };

  return (
    <div className="flex flex-col gap-6">
      {showAdd && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl w-full max-w-xl p-8 border border-border shadow-2xl">
            <h3 className="bento-title mb-6">Nueva Evolución Médica</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-text-muted uppercase mb-1 block">Paciente</label>
                <select required value={formData.patientId} onChange={e => setFormData({...formData, patientId: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-border rounded-lg text-sm">
                  <option value="">Seleccione un paciente...</option>
                  {patients.map(p => <option key={p.uid} value={p.uid}>{p.displayName} - {p.documentId}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-text-muted uppercase mb-1 block">Diagnóstico</label>
                  <input required value={formData.diagnosis} onChange={e => setFormData({...formData, diagnosis: e.target.value})} type="text" className="w-full px-4 py-2 bg-slate-50 border border-border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-text-muted uppercase mb-1 block">Tratamiento</label>
                  <input required value={formData.treatment} onChange={e => setFormData({...formData, treatment: e.target.value})} type="text" className="w-full px-4 py-2 bg-slate-50 border border-border rounded-lg text-sm" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-text-muted uppercase mb-1 block">Notas de Evolución</label>
                <textarea rows={4} required value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-border rounded-lg text-sm" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-3 text-xs font-bold uppercase text-text-muted">Descartar</button>
                <button type="submit" className="flex-1 py-3 bg-accent text-white rounded-xl text-xs font-bold uppercase">Guardar Evolución</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-border rounded-lg text-xs font-bold text-text-muted hover:bg-slate-50">
            <Filter size={14} />
            Filtrar
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-border rounded-lg text-xs font-bold text-text-muted hover:bg-slate-50">
            <Download size={14} />
            Exportar
          </button>
        </div>
        {canEdit && (
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-bold text-xs uppercase tracking-widest">
            <Plus size={16} />
            Nueva Evolución
          </button>
        )}
      </div>

      <div className="bento-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">Fecha</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">Paciente</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">Diagnóstico Core</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">Tratamiento</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {records.map(record => {
                const patient = patients.find(p => p.uid === record.patientId);
                return (
                  <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <ClipboardList size={14} className="text-accent" />
                        <span className="text-xs font-bold text-text-main">{record.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-text-main">{patient?.displayName}</td>
                    <td className="px-6 py-4">
                       <span className="tag">{record.diagnosis}</span>
                    </td>
                    <td className="px-6 py-4 text-xs text-text-muted">{record.treatment}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-accent text-[10px] font-extrabold uppercase hover:underline">Detalles</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
