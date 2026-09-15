import React from 'react';
import { Wrench, CheckCircle, Clock } from 'lucide-react';
import EmptyState from '../shared/EmptyState.jsx';

export default function OrdersView({ db }) {
  const today = new Date().toLocaleDateString();

  const repairsToday = db.repairs.filter((repair) => repair.date === today).length;

  const pendingRepairs = db.repairs.filter((repair) =>
    ['Pendiente de Revisión', 'En Reparación', 'En diagnóstico'].includes(repair.status)
  ).length;

  const completedRepairs = db.repairs.filter((repair) =>
    ['Completado', 'Entregado'].includes(repair.status)
  ).length;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        <StatCard icon={Wrench} label="Reparaciones Hoy" value={repairsToday} colorClass="bg-blue-100 text-blue-600" />
        <StatCard icon={CheckCircle} label="Completadas" value={completedRepairs} colorClass="bg-green-100 text-green-600" />
        <StatCard
          icon={Clock}
          label="Pendientes"
          value={pendingRepairs}
          colorClass="bg-orange-100 text-orange-600"
          className="sm:col-span-2 lg:col-span-1"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8 flex flex-col">
        <div className="px-4 py-4 md:px-6 md:py-5 border-b border-slate-100 flex justify-between items-center bg-white">
          <h3 className="font-semibold text-slate-800">Órdenes Recientes</h3>
        </div>

        {db.repairs.length === 0 ? (
          <EmptyState
            icon={Wrench}
            title="Aún no hay órdenes"
            description="Cuando los clientes reporten fallas desde su app, aparecerán aquí para que las revises."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-4 md:px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">ID Orden</th>
                  <th className="px-4 md:px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Cliente</th>
                  <th className="px-4 md:px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Diagnóstico App</th>
                  <th className="px-4 md:px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {db.repairs.map((repair, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 md:px-6 py-4 text-sm font-medium text-slate-800">{repair.id}</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-slate-500">{repair.userEmail}</td>
                    <td className="px-4 md:px-6 py-4">
                      <p className="text-sm font-medium text-slate-800">{repair.title}</p>
                      <p className="text-xs text-slate-500 truncate max-w-[200px] md:max-w-xs">{repair.description}</p>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
                        <Clock className="w-3.5 h-3.5" /> {repair.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

function StatCard({ icon: Icon, label, value, colorClass, className = '' }) {
  return (
    <div className={`bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 ${className}`}>
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 ${colorClass}`}>
        <Icon className="w-5 h-5 md:w-6 md:h-6" />
      </div>
      <div>
        <p className="text-xs md:text-sm font-medium text-slate-500">{label}</p>
        <p className="text-xl md:text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
