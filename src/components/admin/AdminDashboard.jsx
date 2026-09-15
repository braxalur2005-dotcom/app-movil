import React, { useState } from 'react';
import { Wrench, Users, Package, DollarSign, LogOut, Menu, X } from 'lucide-react';
import OrdersView from './OrdersView.jsx';
import ClientsView from './ClientsView.jsx';
import EmptyState from '../shared/EmptyState.jsx';

const NAV_ITEMS = [
  { id: 'orders', icon: Wrench, label: 'Órdenes Activas' },
  { id: 'clients', icon: Users, label: 'Clientes' },
  { id: 'inventory', icon: Package, label: 'Inventario' },
  { id: 'finances', icon: DollarSign, label: 'Finanzas' },
];

const TAB_TITLES = {
  orders: 'Panel Principal',
  clients: 'Gestión de Clientes',
  inventory: 'Control de Inventario',
  finances: 'Resumen Financiero',
};

export default function AdminDashboard({ onLogout, user, db }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="flex h-screen bg-slate-50/50 font-sans text-slate-800 overflow-hidden">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">TF</div>
            <span className="font-bold text-xl text-white">TechFix Pro</span>
          </div>
          <button className="lg:hidden p-1 text-slate-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                activeTab === item.id ? 'bg-blue-600/10 text-blue-400' : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-8 shrink-0 relative z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">{TAB_TITLES[activeTab]}</h2>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'orders' && <OrdersView db={db} />}
            {activeTab === 'clients' && <ClientsView db={db} />}
            {activeTab === 'inventory' && (
              <EmptyState
                icon={Package}
                title="Inventario Vacío"
                description="Aquí podrás gestionar refacciones, piezas de repuesto y herramientas de tu taller."
              />
            )}
            {activeTab === 'finances' && (
              <EmptyState
                icon={DollarSign}
                title="Sin movimientos"
                description="Las ganancias y cobros de las reparaciones completadas aparecerán en esta sección."
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
