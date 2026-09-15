import React, { useState } from 'react';
import { Monitor, Wifi, Clock, Smartphone, Printer, Bluetooth, Volume2, Camera, Keyboard, BatteryCharging, AlertCircle, ChevronRight, Wrench, CheckCircle, ListChecks } from 'lucide-react';
import { issueCategories, diagnosticTrees, resolveDiagnostic } from '../../data/initialData.js';

const ICONS = {
  power: Monitor,
  network: Wifi,
  performance: Clock,
  printer: Printer,
  bluetooth: Bluetooth,
  audio: Volume2,
  camera: Camera,
  peripherals: Keyboard,
  battery: BatteryCharging,
  other: Smartphone,
};

export default function DiagnosticFlow({ user, updateDb, onRepairCreated }) {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleStart = (issueId) => {
    setSelectedIssue(issueId);
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  const handleReset = () => {
    setSelectedIssue(null);
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  const handleAnswer = (answer) => {
    const tree = diagnosticTrees[selectedIssue];
    const isLastQuestion = step === tree.length - 1;
    const nextAnswers = { ...answers, [tree[step].id]: answer };

    setAnswers(nextAnswers);

    if (isLastQuestion) {
      setResult(resolveDiagnostic(selectedIssue, nextAnswers));
      setStep('result');
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleRequestRepair = () => {
    const newId = `REP-${Math.floor(1000 + Math.random() * 9000)}`;
    const category = issueCategories.find((c) => c.id === selectedIssue);

    const newRepair = {
      id: newId,
      userEmail: user.email,
      title: category.title,
      description: 'Diagnóstico guiado completado. Requiere revisión técnica.',
      status: 'Pendiente de Revisión',
      date: new Date().toLocaleDateString(),
    };

    updateDb('repairs', newRepair);
    handleReset();
    onRepairCreated();
  };

  // Paso 1: elegir el tipo de falla
  if (!selectedIssue) {
    return (
      <div className="space-y-4">
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            Bienvenido a nuestra guía de autodiagnóstico. Selecciona el síntoma principal que presenta tu equipo.
          </p>
        </div>

        <h3 className="font-semibold text-slate-800">¿Qué le pasa a tu equipo?</h3>
        <div className="grid grid-cols-1 gap-3">
          {issueCategories.map((issue) => {
            const Icon = ICONS[issue.id];
            return (
              <button
                key={issue.id}
                onClick={() => handleStart(issue.id)}
                className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:border-blue-300 hover:shadow-md transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${issue.colorClass}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-slate-800">{issue.title}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Resultado final: solución guiada o revisión técnica
  if (step === 'result') {
    const isRepair = result.kind === 'repair';

    return (
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
        <div className={`w-16 h-16 ${isRepair ? 'bg-orange-100' : 'bg-green-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
          {isRepair ? <Wrench className="w-8 h-8 text-orange-600" /> : <CheckCircle className="w-8 h-8 text-green-600" />}
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">{result.title}</h3>
        <p className="text-sm text-slate-500 mb-6">{result.summary}</p>

        <div className="text-left bg-slate-50 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 text-slate-700 font-semibold mb-3">
            <ListChecks className="w-5 h-5 text-blue-600" />
            <span>{isRepair ? 'Qué hacer ahora' : 'Pasos recomendados'}</span>
          </div>
          <ol className="space-y-3 text-sm text-slate-600 list-decimal list-inside">
            {result.steps.map((stepText) => <li key={stepText}>{stepText}</li>)}
          </ol>
        </div>

        <div className="text-left border border-blue-100 bg-blue-50 rounded-xl p-4 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 mb-2">Resumen y recomendaciones</p>
          {result.tips.map((tip) => <p key={tip} className="text-sm text-blue-800">{tip}</p>)}
        </div>

        <div className="flex flex-col gap-3">
          {isRepair && <button onClick={handleRequestRepair} className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-600/20 hover:bg-blue-700">Solicitar Reparación Ahora</button>}
          <button onClick={handleReset} className="w-full py-3 text-slate-500 font-medium hover:bg-slate-50 rounded-xl">
            Volver al diagnóstico
          </button>
        </div>
      </div>
    );
  }

  // Preguntas intermedias
  const currentQuestion = diagnosticTrees[selectedIssue][step];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">
        Paso {step + 1} de {diagnosticTrees[selectedIssue].length}
      </h3>
      <p className="text-slate-700 mb-8 text-lg">{currentQuestion.q}</p>

      {currentQuestion.type === 'yesno' && (
        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleAnswer('yes')}
            className="w-full py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors"
          >
            Sí
          </button>
          <button
            onClick={() => handleAnswer('no')}
            className="w-full py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors"
          >
            No
          </button>
        </div>
      )}

      {currentQuestion.type === 'options' && (
        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(typeof opt === 'string' ? opt : opt.value)}
              className="w-full py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 hover:border-blue-300 transition-colors text-left px-4"
            >
              {typeof opt === 'string' ? opt : opt.label}
            </button>
          ))}
        </div>
      )}

      {currentQuestion.type === 'info' && (
        <button onClick={handleAnswer} className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium shadow-md">
          Continuar
        </button>
      )}

      <div className="mt-8 text-center">
        <button onClick={handleReset} className="text-sm text-slate-400 hover:text-slate-600 underline">
          Cancelar diagnóstico
        </button>
      </div>
    </div>
  );
}
