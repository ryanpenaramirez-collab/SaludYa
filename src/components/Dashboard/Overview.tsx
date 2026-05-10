import { Users, Calendar, Activity, Clock, ShieldCheck, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Appointment, UserProfile, UserRole } from '../../types';

interface OverviewProps {
  appointments: Appointment[];
  patients: UserProfile[];
  role: UserRole;
  onStartBooking?: () => void;
}

const StatCard = ({ icon: Icon, label, value, trend, color, className }: { icon: any, label: string, value: string, trend?: string, color: string, className?: string }) => (
  <div className={cn("bento-card", className)}>
    <div className="flex items-center justify-between mb-4">
      <div className={cn("p-2.5 rounded-lg text-white", color)}>
        <Icon size={18} />
      </div>
      {trend && <span className="tag bg-emerald-50 text-emerald-600 border-emerald-100">{trend}</span>}
    </div>
    <div>
      <p className="bento-header text-text-muted mb-1">{label}</p>
      <h3 className="text-2xl font-extrabold text-text-main">{value}</h3>
    </div>
  </div>
);

const AppointmentItem = ({ name, time, type, status }: { name: string, time: string, type: string, status: any, key?: string | number }) => (
  <div className="flex items-center justify-between py-3 border-b border-border last:border-0 group cursor-pointer hover:bg-slate-50/50 px-2 -mx-2 rounded-lg transition-colors">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-text-muted group-hover:bg-blue-50 group-hover:text-accent transition-colors">
        <Users size={14} />
      </div>
      <div>
        <p className="text-sm font-bold text-text-main">{name}</p>
        <p className="text-[10px] text-text-muted">{type}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="text-xs font-bold text-text-main">{time}</p>
        <p className="text-[10px] text-text-muted">Hoy</p>
      </div>
      <span className={cn(
        "tag",
        status === 'CONFIRMED' || status === 'Confirmada' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-blue-50 text-accent border-blue-100"
      )}>
        {status}
      </span>
    </div>
  </div>
);

export default function Overview({ appointments, patients, role, onStartBooking }: OverviewProps) {
  return (
    <div className="grid grid-cols-12 auto-rows-[100px] gap-4">
      {/* Main Header Card */}
      <div className={cn(
        "bento-card row-span-2 flex flex-col justify-end p-8 relative overflow-hidden",
        role === 'PATIENT' ? "col-span-12 lg:col-span-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-800 text-white border-none" : "col-span-12 lg:col-span-8"
      )}>
        {role === 'PATIENT' && (
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl shrink-0" />
        )}
        <div className={cn("bento-header mb-2 flex items-center gap-2", role === 'PATIENT' ? "text-blue-100" : "")}>
          {role === 'PATIENT' && <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></span>}
          {role === 'PATIENT' ? 'ESTADO DE SALUD' : 'SISTEMA DE GESTIÓN MÉDICA V2.0'}
        </div>
        <div className="bento-title">
          {role === 'PATIENT' ? 'Tu Bienestar es lo Primero' : 'Panel de Control: Visión General del Centro'}
        </div>
        <p className={cn("text-sm mb-4", role === 'PATIENT' ? "text-blue-50" : "text-text-muted")}>
          {role === 'PATIENT' 
            ? 'Gestiona tus citas médicas y consulta tu historial clínico de forma segura con SaludYa.'
            : 'Optimización de flujos clínicos y agendamiento inteligente en SaludYa.'}
        </p>
        
        {role === 'PATIENT' && (
          <button 
            onClick={onStartBooking}
            className="w-fit px-6 py-2.5 bg-white text-blue-600 rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20 active:scale-95 transition-transform"
          >
            Agendar Nueva Cita
          </button>
        )}
      </div>

      {/* Conditional Cards based on role */}
      {role !== 'PATIENT' ? (
        <div className="bento-card col-span-12 lg:col-span-4 row-span-2 bg-accent text-white border-0 shadow-lg shadow-blue-200">
          <div className="bento-header text-white/80">NORMATIVA Y SEGURIDAD</div>
          <div className="bento-title text-white">Ley 1581 de 2012</div>
          <div className="font-mono text-[10px] opacity-90 space-y-1">
            <p>+ Cifrado: bcrypt</p>
            <p>+ Sesión: 30 min exp</p>
            <p>+ Auditoría completa</p>
          </div>
        </div>
      ) : (
        <div className="col-span-12 lg:col-span-4 row-span-2 bento-card flex flex-col items-center justify-center text-center gap-3 border-blue-100 bg-blue-50/30">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <ShieldCheck size={24} />
          </div>
          <div>
            <div className="text-xs font-bold text-text-main uppercase tracking-tighter text-blue-800">Seguro Médico</div>
            <div className="text-xl font-extrabold text-blue-600">PREPAGADA COLOMBIA</div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <StatCard icon={Calendar} label="Citas Hoy" value={(24 + appointments.length).toString()} trend="+12%" color="bg-accent" className="col-span-6 lg:col-span-3 row-span-2" />
      <StatCard icon={Activity} label="Asistencia" value="94.2%" color="bg-emerald-600" className="col-span-6 lg:col-span-3 row-span-2" />
      <StatCard icon={TrendingUp} label="Nuevos Pacientes" value={patients.length.toString()} trend="+4%" color="bg-indigo-600" className="col-span-6 lg:col-span-3 row-span-2" />
      <StatCard icon={Clock} label="Tiempo Prom" value="18 min" color="bg-amber-500" className="col-span-6 lg:col-span-3 row-span-2" />

      {/* Appointments Grid */}
      <div className="bento-card col-span-12 lg:col-span-8 row-span-5">
        <div className="bento-header">GESTIÓN DE AGENDA</div>
        <div className="bento-title">Próximas Citas</div>
        <div className="mt-2 space-y-1 overflow-y-auto">
          {appointments.length === 0 && (
            <>
              <AppointmentItem name="Juan Pérez" time="08:30 AM" type="Consulta General" status="Confirmada" />
              <AppointmentItem name="María García" time="09:15 AM" type="Pediatría - Control" status="Programada" />
              <AppointmentItem name="Carlos Ruiz" time="10:00 AM" type="Dermatología" status="Confirmada" />
            </>
          )}
          {appointments.map(apt => (
            <AppointmentItem 
              key={apt.id} 
              name={apt.patientId === 'p-logged-in' ? 'Juan S. Peña (Usted)' : 'Paciente Externo'} 
              time={apt.startTime.split('T')[1].substr(0, 5)} 
              type={apt.type} 
              status={apt.status} 
            />
          ))}
        </div>
      </div>

      {/* Tech Stack Summary */}
      <div className="bento-card col-span-12 lg:col-span-4 row-span-5">
        <div className="bento-header">SISTEMA CORE</div>
        <div className="bento-title">Estructura de Datos</div>
        <div className="font-mono bg-slate-50 p-4 rounded-lg text-[10px] text-text-main border border-border">
          <p className="text-accent font-bold mb-2">Entidad: Cita {'{'}</p>
          <p className="pl-4">id: UUID,</p>
          <p className="pl-4">paciente_id: FK,</p>
          <p className="pl-4">medico_id: FK,</p>
          <p className="pl-4">fecha: DateTime,</p>
          <p className="pl-4">estado: Enum,</p>
          <p className="pl-4">duracion: Int</p>
          <p className="text-accent font-bold mt-2">{'}'}</p>
        </div>
      </div>
    </div>
  );
}
