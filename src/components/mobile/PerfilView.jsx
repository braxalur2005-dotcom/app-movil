import React from 'react';
import { User, LogOut } from 'lucide-react';

export default function PerfilView({ user, onLogout }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center space-y-4">
      <div className="w-20 h-20 rounded-full bg-slate-100 mx-auto flex items-center justify-center mb-2">
        <User className="w-8 h-8 text-slate-400" />
      </div>
      <div>
        <h3 className="font-bold text-slate-800">{user.name}</h3>
        <p className="text-slate-500 text-sm">{user.email}</p>
      </div>
      <hr className="border-slate-100 my-4" />
      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 py-3 text-red-500 bg-red-50 rounded-xl font-medium hover:bg-red-100 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Cerrar Sesión
      </button>
    </div>
  );
}
