// Estado inicial de la "base de datos" en memoria.
// ⚠️ Esto es solo para desarrollo/demo. Ver README.md para opciones de
// base de datos reales, gratuitas y fáciles de conectar.
export const initialDb = {
  users: [
    {
      email: 'admin@techfix.com',
      password: 'Password1!',
      name: 'Administrador',
      role: 'admin',
    },
  ],
  repairs: [],
};

// Categorías de fallas que el usuario puede reportar en el diagnóstico guiado.
export const issueCategories = [
  { id: 'power', title: 'El equipo no enciende', colorClass: 'bg-red-100 text-red-600' },
  { id: 'network', title: 'No me puedo conectar a Internet', colorClass: 'bg-blue-100 text-blue-600' },
  { id: 'performance', title: 'Está muy lenta o se traba', colorClass: 'bg-orange-100 text-orange-600' },
  { id: 'printer', title: 'La impresora no imprime', colorClass: 'bg-cyan-100 text-cyan-600' },
  { id: 'bluetooth', title: 'No puedo conectar Bluetooth', colorClass: 'bg-indigo-100 text-indigo-600' },
  { id: 'audio', title: 'No se escucha el audio', colorClass: 'bg-emerald-100 text-emerald-600' },
  { id: 'camera', title: 'No funciona la cámara o el micrófono', colorClass: 'bg-pink-100 text-pink-600' },
  { id: 'peripherals', title: 'No funcionan teclado, ratón o USB', colorClass: 'bg-amber-100 text-amber-600' },
  { id: 'battery', title: 'La batería no carga o dura poco', colorClass: 'bg-lime-100 text-lime-700' },
  { id: 'other', title: 'Pantalla rota o problemas físicos', colorClass: 'bg-purple-100 text-purple-600' },
];

// Árbol de preguntas del diagnóstico guiado por categoría de falla.
export const diagnosticTrees = {
  power: [
    {
      id: 'outlet',
      q: '¿El cable está conectado firmemente y el enchufe funciona con otro aparato?',
      type: 'options',
      options: [
        { label: 'Sí, el enchufe funciona', value: 'yes' },
        { label: 'No, está flojo o no tiene corriente', value: 'no' },
      ],
    },
    {
      id: 'lights',
      q: 'Al presionar el botón de encendido, ¿se enciende alguna luz o se escucha el ventilador?',
      type: 'options',
      options: [
        { label: 'Sí, hay luces o sonidos', value: 'yes' },
        { label: 'No, no da ninguna señal', value: 'no' },
      ],
    },
  ],
  network: [
    {
      id: 'otherDevices',
      q: '¿Otros dispositivos pueden navegar usando la misma red?',
      type: 'options',
      options: [
        { label: 'Sí, solo falla este equipo', value: 'yes' },
        { label: 'No, ningún dispositivo tiene Internet', value: 'no' },
      ],
    },
    {
      id: 'restartedRouter',
      q: '¿Desconectaste el módem/router durante 30 segundos y lo volviste a conectar?',
      type: 'options',
      options: [
        { label: 'Sí, ya lo reinicié', value: 'yes' },
        { label: 'No, todavía no', value: 'no' },
      ],
    },
  ],
  performance: [
    {
      id: 'restart',
      q: '¿Hace cuánto no apagas completamente el equipo (no solo cerrar la tapa)?',
      type: 'options',
      options: [
        { label: 'Hoy', value: 'today' },
        { label: 'Hace unos días', value: 'days' },
        { label: 'No recuerdo', value: 'unknown' },
      ],
    },
    {
      id: 'fan',
      q: '¿El ventilador hace mucho ruido o el equipo se calienta demasiado?',
      type: 'options',
      options: [
        { label: 'No, funciona a temperatura normal', value: 'no' },
        { label: 'Sí, se calienta o hace mucho ruido', value: 'yes' },
      ],
    },
  ],
  printer: [
    {
      id: 'printerPower',
      q: '¿La impresora está encendida y muestra algún mensaje de error?',
      type: 'options',
      options: [
        { label: 'Está encendida y sin error', value: 'ready' },
        { label: 'Está apagada o muestra un error', value: 'error' },
      ],
    },
    {
      id: 'printerConnection',
      q: '¿El equipo detecta la impresora en la lista de dispositivos?',
      type: 'options',
      options: [
        { label: 'Sí, aparece en la lista', value: 'found' },
        { label: 'No aparece', value: 'missing' },
      ],
    },
  ],
  bluetooth: [
    {
      id: 'bluetoothMode',
      q: '¿El accesorio Bluetooth está encendido y en modo de emparejamiento?',
      type: 'options',
      options: [
        { label: 'Sí, está listo para emparejar', value: 'ready' },
        { label: 'No estoy seguro o no aparece', value: 'notReady' },
      ],
    },
    {
      id: 'bluetoothPaired',
      q: '¿El accesorio aparece como guardado pero no logra conectarse?',
      type: 'options',
      options: [
        { label: 'Sí, aparece guardado', value: 'saved' },
        { label: 'No, nunca se ha guardado', value: 'new' },
      ],
    },
  ],
  audio: [
    {
      id: 'audioOutput',
      q: '¿El volumen está activo y seleccionaste la salida correcta?',
      type: 'options',
      options: [
        { label: 'No, estaba silenciado o en otra salida', value: 'wrong' },
        { label: 'Sí, todo parece correcto', value: 'correct' },
      ],
    },
    {
      id: 'audioHeadphones',
      q: '¿El audio funciona con audífonos u otra bocina?',
      type: 'options',
      options: [
        { label: 'Sí, funciona con otro dispositivo', value: 'works' },
        { label: 'No funciona con ninguno', value: 'fails' },
      ],
    },
  ],
  camera: [
    {
      id: 'cameraPermission',
      q: '¿La aplicación tiene permiso para usar la cámara y el micrófono?',
      type: 'options',
      options: [
        { label: 'No o no lo sé', value: 'denied' },
        { label: 'Sí, tiene permiso', value: 'allowed' },
      ],
    },
    {
      id: 'cameraOtherApp',
      q: '¿Otra aplicación puede usar la cámara o el micrófono?',
      type: 'options',
      options: [
        { label: 'Sí, funciona en otra aplicación', value: 'works' },
        { label: 'No, falla en todas', value: 'fails' },
      ],
    },
  ],
  peripherals: [
    {
      id: 'peripheralConnection',
      q: '¿El teclado, ratón o USB está bien conectado y enciende alguna luz?',
      type: 'options',
      options: [
        { label: 'Sí, está conectado y tiene luz', value: 'connected' },
        { label: 'No, está flojo o no tiene luz', value: 'loose' },
      ],
    },
    {
      id: 'peripheralPort',
      q: '¿Funciona al conectarlo en otro puerto o en otro equipo?',
      type: 'options',
      options: [
        { label: 'Sí, funciona en otro puerto/equipo', value: 'works' },
        { label: 'No funciona en ninguno', value: 'fails' },
      ],
    },
  ],
  battery: [
    {
      id: 'batteryCharger',
      q: '¿El cargador es el original o uno compatible con el voltaje correcto?',
      type: 'options',
      options: [
        { label: 'Sí, es el correcto', value: 'correct' },
        { label: 'No, es diferente o no lo sé', value: 'unknown' },
      ],
    },
    {
      id: 'batterySwollen',
      q: '¿La batería está hinchada, desprende olor o calienta demasiado?',
      type: 'options',
      options: [
        { label: 'No', value: 'no' },
        { label: 'Sí', value: 'yes' },
      ],
    },
  ],
  other: [
    { id: 'physical', q: '¿El equipo tiene pantalla rota, líquido derramado, olor a quemado o una pieza suelta?', type: 'info' },
  ],
};

const selfServiceResult = (title, summary, steps, tips) => ({
  kind: 'self-service',
  title,
  summary,
  steps,
  tips,
});

const repairResult = (summary) => ({
  kind: 'repair',
  title: 'Se necesita una revisión técnica',
  summary,
  steps: [
    'Apaga el equipo y desconecta el cargador o cable de corriente.',
    'No lo abras ni intentes reparar componentes internos.',
    'Solicita una revisión para identificar la pieza dañada y recibir un presupuesto.',
  ],
  tips: ['Si hubo líquido, olor a quemado o calor anormal, no vuelvas a encenderlo.'],
});

export function resolveDiagnostic(issueId, answers) {
  if (issueId === 'power') {
    if (answers.outlet === 'no') {
      return selfServiceResult(
        'Revisa la alimentación eléctrica',
        'El problema probablemente está en el enchufe, la regleta o el cable de corriente, no en el equipo.',
        [
          'Conecta otro aparato al mismo enchufe para confirmar si entrega corriente.',
          'Si usas una regleta o regulador, conéctalo directamente a la pared.',
          'Comprueba que el cable esté completamente insertado y prueba otro cable compatible.',
        ],
        ['No uses cables pelados, quemados o flojos.'],
      );
    }
    if (answers.lights === 'yes') {
      return selfServiceResult(
        'Haz un reinicio eléctrico',
        'El equipo sí recibe energía; puede estar bloqueado al iniciar o tener un accesorio interfiriendo.',
        [
          'Desconecta cargador, memorias USB, discos externos y cualquier accesorio.',
          'Mantén presionado el botón de encendido durante 15 segundos.',
          'Conecta solo el cargador y enciende el equipo nuevamente.',
          'Si enciende pero no muestra imagen, prueba ajustar el brillo o conectar otro monitor.',
        ],
        ['Guarda tu trabajo antes de repetir este procedimiento.'],
      );
    }
    return repairResult('El enchufe funciona, pero el equipo no muestra ninguna señal de energía.');
  }

  if (issueId === 'network') {
    if (answers.otherDevices === 'no' && answers.restartedRouter === 'no') {
      return selfServiceResult(
        'Reinicia tu conexión de Internet',
        'Como ningún dispositivo tiene conexión, el origen más probable está en el módem/router o en el proveedor.',
        [
          'Desconecta el módem/router de la corriente durante 30 segundos.',
          'Vuelve a conectarlo y espera de 3 a 5 minutos hasta que las luces queden estables.',
          'Prueba abrir una página desde dos dispositivos diferentes.',
          'Si sigue sin funcionar, revisa si tu proveedor reporta una interrupción del servicio.',
        ],
        ['No presiones el botón Reset: devuelve el router a su configuración de fábrica.'],
      );
    }
    return selfServiceResult(
      'Restablece la conexión de este equipo',
      'La red funciona para otros dispositivos o el router ya fue reiniciado; el fallo parece estar en la conexión local.',
      [
        'Desactiva y vuelve a activar el WiFi; confirma que elegiste la red correcta.',
        'Olvida la red guardada y conéctate de nuevo escribiendo la contraseña.',
        'Reinicia el equipo y acércate al router para descartar una señal débil.',
        'En Windows, abre Símbolo del sistema y ejecuta: ipconfig /flushdns',
        'Después ejecuta: ipconfig /release y luego ipconfig /renew',
      ],
      ['Si solo falla una aplicación, comprueba primero que el navegador tenga acceso a Internet.'],
    );
  }

  if (issueId === 'performance') {
    if (answers.fan === 'yes') {
      return repairResult('El calentamiento o ruido excesivo puede indicar polvo acumulado o una falla de ventilación.');
    }
    return selfServiceResult(
      'Optimiza el rendimiento',
      'La lentitud sin señales de sobrecalentamiento suele deberse a procesos acumulados, poco espacio o falta de reinicio.',
      [
        'Guarda tu trabajo y reinicia el equipo completamente.',
        'Cierra programas que no estés usando y revisa el Administrador de tareas para detectar aplicaciones con alto consumo.',
        'Libera espacio: elimina archivos temporales y deja al menos 10% de almacenamiento disponible.',
        'Desinstala aplicaciones que ya no uses y evita abrir muchos programas al mismo tiempo.',
        'Instala las actualizaciones pendientes del sistema y reinicia una vez más.',
      ],
      ['Si la lentitud comenzó justo después de instalar una aplicación, desinstálala temporalmente para comparar.'],
    );
  }

  if (issueId === 'printer') {
    if (answers.printerPower === 'error') {
      return selfServiceResult(
        'Prepara la impresora',
        'La impresora necesita una comprobación básica de papel, tinta y atascos antes de enviar otro trabajo.',
        [
          'Retira cualquier hoja atascada siguiendo la dirección indicada por las flechas internas.',
          'Comprueba que haya papel del tamaño correcto y que los cartuchos tengan tinta.',
          'Apaga la impresora, desconéctala 30 segundos y vuelve a encenderla.',
          'Cancela los trabajos detenidos en la cola de impresión y envía una página de prueba.',
        ],
        ['No tires del papel con fuerza: podrías dejar fragmentos dentro del mecanismo.'],
      );
    }
    if (answers.printerConnection === 'missing') {
      return selfServiceResult(
        'Vuelve a agregar la impresora',
        'El equipo no está detectando la impresora; normalmente se corrige revisando la conexión o agregándola de nuevo.',
        [
          'Enciende la impresora y conéctala a la misma red WiFi que el equipo.',
          'Si es USB, prueba otro puerto y evita hubs sin alimentación.',
          'En Windows abre Configuración > Bluetooth y dispositivos > Impresoras y escáneres.',
          'Selecciona Agregar dispositivo y espera a que aparezca la impresora.',
          'Si ya existía, elimínala y vuelve a agregarla para renovar el controlador.',
        ],
        ['Revisa que no esté activado el modo sin conexión en la cola de impresión.'],
      );
    }
    return selfServiceResult(
      'Limpia la cola de impresión',
      'La impresora responde y es detectada; el problema suele estar en un trabajo detenido o en el controlador.',
      [
        'Abre la cola de impresión y cancela documentos pendientes.',
        'Reinicia la impresora y el equipo.',
        'Imprime una página de prueba desde las propiedades de la impresora.',
        'Si falla, actualiza o reinstala el controlador desde la página oficial del fabricante.',
      ],
      ['Confirma que la impresora correcta esté seleccionada como predeterminada.'],
    );
  }

  if (issueId === 'bluetooth') {
    return selfServiceResult(
      'Restablece el emparejamiento Bluetooth',
      'El accesorio puede estar conectado a otro equipo o tener un registro de emparejamiento desactualizado.',
      [
        'Apaga y vuelve a encender el accesorio; acércalo a menos de un metro.',
        'Desconéctalo de otros teléfonos o computadoras cercanas.',
        'En Configuración > Bluetooth, elimina el dispositivo guardado.',
        'Apaga Bluetooth durante 10 segundos, actívalo y busca dispositivos nuevamente.',
        'Pon el accesorio en modo de emparejamiento y selecciónalo para conectarlo.',
      ],
      ['Comprueba que el accesorio tenga batería suficiente y que su manual indique cómo activar el modo pairing.'],
    );
  }

  if (issueId === 'audio') {
    if (answers.audioOutput === 'wrong' || answers.audioHeadphones === 'works') {
      return selfServiceResult(
        'Selecciona la salida de audio correcta',
        'El sonido funciona en algún dispositivo, así que probablemente está silenciado o se está enviando a otra salida.',
        [
          'Haz clic en el icono de volumen y sube el nivel; verifica que no esté silenciado.',
          'Abre la lista de salidas y selecciona los altavoces o audífonos que quieres usar.',
          'Desconecta temporalmente monitores, audífonos o dispositivos Bluetooth.',
          'Cierra y vuelve a abrir la aplicación que reproduce el audio.',
        ],
        ['Algunos programas tienen su propio control de volumen independiente.'],
      );
    }
    return repairResult('El audio no funciona en ninguna salida; puede haber un controlador o componente de sonido dañado.');
  }

  if (issueId === 'camera') {
    if (answers.cameraPermission === 'denied' || answers.cameraOtherApp === 'works') {
      return selfServiceResult(
        'Corrige los permisos de cámara y micrófono',
        'La cámara o el micrófono parecen funcionar, pero la aplicación no tiene acceso o está siendo usado por otra aplicación.',
        [
          'Cierra aplicaciones de videollamadas que puedan estar usando la cámara.',
          'En Windows abre Configuración > Privacidad y seguridad > Cámara y activa el acceso.',
          'Repite el proceso en Micrófono y permite el acceso a la aplicación concreta.',
          'Reinicia la aplicación y selecciona la cámara o micrófono correcto en sus ajustes.',
        ],
        ['Descarga permisos solo para aplicaciones de confianza.'],
      );
    }
    return repairResult('La cámara o el micrófono no funcionan en ninguna aplicación; puede requerir revisión de controlador o hardware.');
  }

  if (issueId === 'peripherals') {
    if (answers.peripheralConnection === 'loose' || answers.peripheralPort === 'works') {
      return selfServiceResult(
        'Revisa la conexión del periférico',
        'El periférico parece funcionar; el problema está probablemente en el puerto, el cable o la conexión actual.',
        [
          'Desconecta el dispositivo y vuelve a conectarlo firmemente.',
          'Prueba otro puerto USB, preferiblemente uno situado directamente en el equipo.',
          'Si usas un hub, conéctalo directamente para descartar falta de alimentación.',
          'Reinicia el equipo y prueba de nuevo antes de instalar controladores.',
        ],
        ['No fuerces conectores USB; si están doblados, solicita revisión.'],
      );
    }
    return repairResult('El periférico no funciona en ningún puerto o equipo y podría estar dañado.');
  }

  if (issueId === 'battery') {
    if (answers.batterySwollen === 'yes') {
      return repairResult('Una batería hinchada o con calor anormal es un riesgo físico y debe reemplazarse profesionalmente.');
    }
    return selfServiceResult(
      'Comprueba el cargador y el consumo',
      'La batería no muestra señales de riesgo físico; el problema puede estar en el cargador, el puerto o el consumo del sistema.',
      [
        'Conecta el cargador directamente a la pared y verifica que el indicador de carga aparezca.',
        'Prueba otro cargador compatible, nunca uno con voltaje diferente.',
        'Revisa que el puerto no tenga polvo y no muevas el conector mientras carga.',
        'Reduce el brillo, cierra aplicaciones pesadas y desactiva Bluetooth si no lo usas.',
        'Consulta el informe de batería con el comando de Windows: powercfg /batteryreport',
      ],
      ['Si el equipo se apaga de repente o la batería se hincha, deja de usarlo y solicita revisión.'],
    );
  }

  return repairResult('Los daños físicos requieren revisión para evitar empeorar el equipo o perder información.');
}
