import React from 'react';
import { Users, Edit, Trash2 } from 'lucide-react';
import EmptyState from '../shared/EmptyState.jsx';

export default function ClientsView({ db }) {
  const clients = db.users.filter((u) => u.role !== 'admin');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
      <div className="px-4 py-4 md:px-6 md:py-5 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-semibold text-slate-800">Directorio de Clientes</h3>
      </div>

      {clients.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Aún no hay clientes registrados"
          description="Los usuarios que creen una cuenta en la aplicación móvil aparecerán listados aquí."
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-4 md:px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Nombre</th>
                <th className="px-4 md:px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Contacto</th>
                <th className="px-4 md:px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Órdenes</th>
                <th className="px-4 md:px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clients.map((client, idx) => {
                const clientOrdersCount = db.repairs.filter((r) => r.userEmail === client.email).length;

                return (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 md:px-6 py-4 text-sm font-semibold text-slate-800 capitalize">{client.name}</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-slate-500">{client.email}</td>
                    <td className="px-4 md:px-6 py-4 text-sm font-medium text-slate-700">{clientOrdersCount}</td>
                    <td className="px-4 md:px-6 py-4 flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors bg-slate-100 hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 transition-colors bg-slate-100 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
