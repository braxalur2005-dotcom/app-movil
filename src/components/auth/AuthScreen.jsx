import React, { useState, useEffect } from 'react';
import { User, Lock, Mail, ArrowRight, Wrench, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { validatePassword, generateCaptcha, formatTime } from '../../utils/validation.js';

const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 300; // 5 minutos

export default function AuthScreen({ db, updateDb, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // Seguridad y bloqueos
  const [attempts, setAttempts] = useState(MAX_ATTEMPTS);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTimeLeft, setLockoutTimeLeft] = useState(0);

  // Captcha simple
  const [captchaQ, setCaptchaQ] = useState({ num1: 0, num2: 0 });
  const [captchaA, setCaptchaA] = useState('');

  useEffect(() => {
    resetCaptcha();
  }, [isLogin]);

  useEffect(() => {
    if (lockoutTimeLeft <= 0) {
      if (isLocked) {
        setIsLocked(false);
        setAttempts(MAX_ATTEMPTS);
      }
      return;
    }
    const timer = setInterval(() => setLockoutTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [lockoutTimeLeft, isLocked]);

  const resetCaptcha = () => {
    setCaptchaQ(generateCaptcha());
    setCaptchaA('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLocked) {
      setError('Cuenta bloqueada temporalmente. Por favor espera.');
      return;
    }

    if (!email || !password || (!isLogin && !name)) {
      setError('Por favor completa todos los campos.');
      return;
    }

    if (parseInt(captchaA, 10) !== captchaQ.num1 + captchaQ.num2) {
      setError('Captcha incorrecto. Inténtalo de nuevo.');
      resetCaptcha();
      return;
    }

    if (isLogin) {
      handleLoginSubmit();
    } else {
      handleRegisterSubmit();
    }
  };

  const handleLoginSubmit = () => {
    const user = db.users.find((u) => u.email === email);

    if (!user) {
      setError('Aún no tienes cuenta, puedes registrarte para poder acceder.');
      resetCaptcha();
      return;
    }

    if (user.password !== password) {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);
      resetCaptcha();

      if (newAttempts <= 0) {
        setIsLocked(true);
        setLockoutTimeLeft(LOCKOUT_SECONDS);
        setError('Cuenta bloqueada por seguridad. Se ha enviado un correo para desbloquearla.');
      } else {
        setError(`Correo o contraseña incorrectos. Intentos disponibles: ${newAttempts}`);
      }
      return;
    }

    setAttempts(MAX_ATTEMPTS);
    onLogin(user);
  };

  const handleRegisterSubmit = () => {
    if (db.users.find((u) => u.email === email)) {
      setError('Este correo ya está registrado.');
      resetCaptcha();
      return;
    }

    if (!validatePassword(password)) {
      setError('La contraseña debe tener 8-16 caracteres, incluyendo mayúsculas, minúsculas, números y un carácter especial.');
      resetCaptcha();
      return;
    }

    const newUser = { email, password, name, role: 'user' };
    updateDb('users', newUser);
    onLogin(newUser);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-blue-600 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-inner">
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">TechFix</h1>
            <p className="text-blue-100 text-sm">Tu taller de confianza, en tu bolsillo</p>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    disabled={isLocked}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all disabled:opacity-50"
                    placeholder="Juan Pérez"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  disabled={isLocked}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all disabled:opacity-50"
                  placeholder="ejemplo@correo.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                  disabled={isLocked}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all disabled:opacity-50"
                  placeholder="••••••••"
                />
                  <button
                    type="button"
                    disabled={isLocked}
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
              </div>
              {!isLogin && (
                <p className="text-xs text-slate-500 mt-2">
                  Debe tener 8-16 caracteres, mayúsculas, minúsculas, números y un símbolo.
                </p>
              )}
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">
                ¿Cuánto es {captchaQ.num1} + {captchaQ.num2}?
              </span>
              <input
                type="number"
                disabled={isLocked}
                value={captchaA}
                onChange={(e) => setCaptchaA(e.target.value)}
                className="w-20 px-3 py-2 text-center rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none disabled:opacity-50"
                placeholder="?"
              />
            </div>

            {isLocked && lockoutTimeLeft > 0 && (
              <div className="text-center text-red-600 font-medium">
                Intentos agotados. Por favor espera: {formatTime(lockoutTimeLeft)}
              </div>
            )}

            <button
              type="submit"
              disabled={isLocked}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLogin ? 'Acceder al Sistema' : 'Crear mi Cuenta'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setAttempts(MAX_ATTEMPTS);
                resetCaptcha();
              }}
              className="text-sm text-slate-500 hover:text-blue-600 font-medium transition-colors"
            >
              {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
