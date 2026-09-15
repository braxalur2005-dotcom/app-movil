import React, { useState } from 'react';
import AuthScreen from './components/auth/AuthScreen.jsx';
import MobileApp from './components/mobile/MobileApp.jsx';
import AdminDashboard from './components/admin/AdminDashboard.jsx';
import { initialDb } from './data/initialData.js';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // Base de datos simulada en memoria.
  // Reemplaza esto por una conexión real siguiendo el README.md
  const [db, setDb] = useState(initialDb);

  const handleLogin = (user) => setCurrentUser(user);
  const handleLogout = () => setCurrentUser(null);

  // Función genérica para agregar un registro a una "colección" de la BD simulada
  const updateDb = (collection, newData) => {
    setDb((prev) => ({
      ...prev,
      [collection]: [...prev[collection], newData],
    }));
  };

  if (!currentUser) {
    return <AuthScreen db={db} updateDb={updateDb} onLogin={handleLogin} />;
  }

  if (currentUser.role === 'admin') {
    return <AdminDashboard user={currentUser} db={db} onLogout={handleLogout} />;
  }

  return <MobileApp user={currentUser} db={db} updateDb={updateDb} onLogout={handleLogout} />;
}
