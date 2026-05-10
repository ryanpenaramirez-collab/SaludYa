import React from 'react';
import { Bell, Calendar, ClipboardList, Layout, LogOut, Settings, Users } from 'lucide-react';
import { cn } from '../lib/utils';
import { UserRole } from '../types';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, active }: SidebarItemProps) => (
  <button className={cn(
    "flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-all duration-200",
    active 
      ? "bg-accent text-white shadow-md shadow-blue-100" 
      : "text-text-muted hover:bg-slate-100 hover:text-text-main"
  )}>
    <Icon size={18} />
    <span className="text-sm font-semibold">{label}</span>
  </button>
);

export default function RootLayout({ 
  children, 
  userRole, 
  onRoleChange,
  activeTab,
  onTabChange
}: { 
  children: React.ReactNode, 
  userRole: UserRole,
  onRoleChange: (role: UserRole) => void,
  activeTab: string,
  onTabChange: (tab: string) => void
}) {
  return (
    <div className="flex min-h-screen bg-bg font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col p-6 gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
            <Layout size={24} />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-text-main">SaludYa</span>
        </div>

        <nav className="flex-1 flex flex-col gap-1.5 focus-within:outline-none">
          <button onClick={() => onTabChange('agenda')} className="w-full text-left">
            <SidebarItem icon={Calendar} label="Agenda" active={activeTab === 'agenda'} />
          </button>
          
          {(userRole === 'DOCTOR' || userRole === 'ADMIN') && (
            <>
              <button onClick={() => onTabChange('pacientes')} className="w-full text-left">
                <SidebarItem icon={Users} label="Pacientes" active={activeTab === 'pacientes'} />
              </button>
              <button onClick={() => onTabChange('historial')} className="w-full text-left">
                <SidebarItem icon={ClipboardList} label="Historial" active={activeTab === 'historial'} />
              </button>
            </>
          )}

          <button onClick={() => onTabChange('config')} className="w-full text-left">
            <SidebarItem icon={Settings} label="Configuración" active={activeTab === 'config'} />
          </button>
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-border">
            <p className="text-[10px] font-bold text-text-muted uppercase mb-2">Simular Rol</p>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <button 
                  onClick={() => onRoleChange('DOCTOR')}
                  className={cn(
                    "flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase",
                    userRole === 'DOCTOR' ? "bg-accent text-white" : "bg-white border border-border text-text-muted"
                  )}
                >Médico</button>
                <button 
                  onClick={() => onRoleChange('PATIENT')}
                  className={cn(
                    "flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase",
                    userRole === 'PATIENT' ? "bg-accent text-white" : "bg-white border border-border text-text-muted"
                  )}
                >Paciente</button>
              </div>
              <button 
                onClick={() => onRoleChange('ADMIN')}
                className={cn(
                  "w-full py-1.5 rounded-lg text-[10px] font-bold uppercase",
                  userRole === 'ADMIN' ? "bg-slate-900 text-white" : "bg-white border border-border text-text-muted"
                )}
              >Administrador Total</button>
            </div>
          </div>
          <SidebarItem icon={LogOut} label="Cerrar Sesión" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="status-badge bg-emerald-500 w-2 h-2 rounded-full"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Servicio Activo</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-text-muted hover:text-text-main relative transition-colors">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-card"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden border border-border shadow-sm">
              <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" alt="User Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
