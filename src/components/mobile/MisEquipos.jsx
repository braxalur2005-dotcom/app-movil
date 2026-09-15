import React from 'react';
import { Monitor, Clock } from 'lucide-react';

export default function MisEquipos({ user, db, onGoToDiagnostico }) {
  const userRepairs = db.repairs.filter((r) => r.userEmail === user.email);

  if (userRepairs.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-white rounded-3xl border border-slate-100 shadow-sm mt-4">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Monitor className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">No tienes equipos en reparación</h3>
        <p className="text-sm text-slate-500 mb-6">Usa la herramienta de diagnóstico para solicitar una revisión.</p>
        <button
          onClick={onGoToDiagnostico}
          className="px-6 py-2.5 bg-blue-50 text-blue-600 font-medium rounded-xl hover:bg-blue-100 transition-colors"
        >
          Ir a Diagnóstico
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-slate-800 px-2">Mis Solicitudes Activas</h3>
      {userRepairs.map((repair) => (
        <div key={repair.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-xs font-semibold text-slate-400 block mb-1">ORDEN #{repair.id}</span>
              <h4 className="font-semibold text-slate-800">{repair.title}</h4>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 flex items-center gap-1 shrink-0">
              <Clock className="w-3.5 h-3.5" />
              {repair.status}
            </span>
          </div>
          <p className="text-sm text-slate-500 mb-4">{repair.description}</p>

          <div className="relative pt-2">
            <div className="overflow-hidden h-1.5 mb-4 text-xs flex rounded-full bg-slate-100">
              <div style={{ width: '25%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500" />
            </div>
            <div className="flex justify-between text-xs text-slate-400 font-medium">
              <span className="text-blue-600">Recepción</span>
              <span>Revisión</span>
              <span>Reparación</span>
              <span>Entrega</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
