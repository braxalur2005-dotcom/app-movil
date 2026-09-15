import React, { useState } from 'react';
import { ShieldCheck, Wrench, User, CheckCircle } from 'lucide-react';
import DiagnosticFlow from './DiagnosticFlow.jsx';
import MisEquipos from './MisEquipos.jsx';
import PerfilView from './PerfilView.jsx';

const TABS = [
  { id: 'diagnostico', icon: ShieldCheck, label: 'Diagnóstico' },
  { id: 'mis-equipos', icon: Wrench, label: 'Mis Equipos' },
  { id: 'perfil', icon: User, label: 'Perfil' },
];

export default function MobileApp({ onLogout, user, db, updateDb }) {
  const [activeTab, setActiveTab] = useState('diagnostico');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleRepairCreated = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      setActiveTab('mis-equipos');
    }, 2500);
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-slate-50 flex flex-col font-sans shadow-2xl relative overflow-hidden">
      {showSuccessModal && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 text-center shadow-2xl w-full max-w-sm animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">¡Solicitud Enviada!</h3>
            <p className="text-slate-500 text-sm">
              Hemos recibido tu solicitud de diagnóstico. Puedes darle seguimiento en la sección "Mis Equipos".
            </p>
          </div>
        </div>
      )}

      <header className="bg-white pt-12 pb-4 px-6 rounded-b-[2rem] shadow-sm z-10 shrink-0">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Hola, {user.name.split(' ')[0]}</h2>
            <p className="text-slate-500 text-sm">¿En qué podemos ayudarte hoy?</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 custom-scrollbar pb-24">
        {activeTab === 'diagnostico' && (
          <DiagnosticFlow user={user} updateDb={updateDb} onRepairCreated={handleRepairCreated} />
        )}
        {activeTab === 'mis-equipos' && (
          <MisEquipos user={user} db={db} onGoToDiagnostico={() => setActiveTab('diagnostico')} />
        )}
        {activeTab === 'perfil' && <PerfilView user={user} onLogout={onLogout} />}
      </main>

      <nav className="bg-white border-t border-slate-100 pb-safe pt-2 px-6 flex justify-between shrink-0 absolute bottom-0 w-full rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        {TABS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 p-2 min-w-[4rem] transition-colors ${
              activeTab === item.id ? 'text-blue-600' : 'text-slate-400'
            }`}
          >
            <item.icon className={`w-6 h-6 ${activeTab === item.id ? 'fill-blue-50' : ''}`} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
