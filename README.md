# TechFix — App de taller de reparaciones

Proyecto reorganizado en componentes separados, listo para correr con [Vite](https://vitejs.dev).

## 📁 Estructura del proyecto

```
techfix-app/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx                # Punto de entrada
    ├── App.jsx                 # Controla sesión y decide qué pantalla mostrar
    ├── index.css                # Estilos globales (Tailwind)
    ├── data/
    │   └── initialData.js       # Datos iniciales de prueba (usuarios, categorías, árbol de diagnóstico)
    ├── utils/
    │   └── validation.js        # Validación de contraseña, captcha, formato de tiempo
    └── components/
        ├── auth/
        │   └── AuthScreen.jsx    # Login / Registro
        ├── mobile/               # App del cliente
        │   ├── MobileApp.jsx      # Contenedor con navegación inferior
        │   ├── DiagnosticFlow.jsx # Diagnóstico guiado
        │   ├── MisEquipos.jsx     # Historial de reparaciones del cliente
        │   └── PerfilView.jsx     # Perfil y cerrar sesión
        ├── admin/                # Panel de administrador
        │   ├── AdminDashboard.jsx # Contenedor con sidebar
        │   ├── OrdersView.jsx     # Órdenes activas + estadísticas
        │   └── ClientsView.jsx    # Directorio de clientes
        └── shared/
            └── EmptyState.jsx    # Estado vacío reutilizable
```

## 🚀 Cómo correrlo

1. Instala [Node.js](https://nodejs.org) (versión 18 o superior).
2. Dentro de la carpeta del proyecto, instala las dependencias:
   ```bash
   npm install
   ```
3. Levanta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre la URL que aparece en la terminal (normalmente `http://localhost:5173`).

Para generar la versión de producción: `npm run build` (genera la carpeta `dist/`, lista para subir a cualquier hosting estático).

**Usuario administrador de prueba:** `admin@techfix.com` / `Password1!`

---

## 🗄️ Opciones de base de datos gratuitas y fáciles de conectar

Ahora mismo la app guarda todo en memoria (`src/data/initialData.js`), así que **al recargar la página se pierde todo**. Aquí tienes opciones reales, gratuitas y sencillas para reemplazarlo, ordenadas de más a menos recomendadas para este proyecto:

### 1. Supabase (recomendada) ⭐
- **Qué es:** Postgres en la nube con autenticación, API automática y almacenamiento incluidos.
- **Por qué conviene:** capa gratuita generosa (500 MB de base de datos, 50,000 usuarios activos/mes), tiene login/registro de usuarios ya integrado (podrías reemplazar tu `AuthScreen` con su SDK), y el cliente de JavaScript es muy simple.
- **Cómo empezar:** crea cuenta en [supabase.com](https://supabase.com), crea un proyecto, instala `@supabase/supabase-js` y usa `supabase.from('repairs').select()` / `.insert()` en vez de `updateDb`.
- **Ideal si:** quieres algo "de verdad" (SQL) sin administrar servidores, y quieres reemplazar tu sistema de login por uno más seguro.

### 2. Firebase (Firestore)
- **Qué es:** base de datos NoSQL en tiempo real de Google.
- **Por qué conviene:** capa gratuita (Spark) sin costo, autenticación de usuarios incluida (email/contraseña, Google, etc.), actualizaciones en tiempo real (útil para que el admin vea nuevas órdenes al instante).
- **Cómo empezar:** crea proyecto en [firebase.google.com](https://firebase.google.com), habilita Firestore y Authentication, instala `firebase` y usa `addDoc`, `onSnapshot`, etc.
- **Ideal si:** quieres que el panel de admin se actualice solo, sin recargar la página.

### 3. Google Sheets como base de datos
- **Qué es:** usar una hoja de cálculo de Google como "tabla" a través de una API.
- **Por qué conviene:** es gratis, no requiere aprender SQL, y cualquiera del taller puede ver/editar los datos directo en Sheets. Servicios como [SheetDB](https://sheetdb.io) o [Sheet.best](https://sheet.best) convierten tu hoja en una API REST con unos clics (tienen plan gratuito limitado).
- **Ideal si:** quieres la opción más sencilla posible y no te importa un límite bajo de peticiones al mes.

### 4. PocketBase
- **Qué es:** backend open-source (base de datos + autenticación + API) que corre como un solo archivo ejecutable.
- **Por qué conviene:** 100% gratis y sin límites de un proveedor externo (tú lo alojas), muy fácil de instalar, panel de administración incluido.
- **Cómo empezar:** descarga el ejecutable desde [pocketbase.io](https://pocketbase.io), corre `./pocketbase serve`, y usa el SDK de JS `pocketbase`.
- **Ideal si:** en el futuro quieres tener control total y no depender de un servicio externo (pero necesitas dónde alojarlo, por ejemplo [Render](https://render.com) o [Fly.io](https://fly.io), que también tienen capas gratuitas).

### 5. Airtable
- **Qué es:** híbrido entre hoja de cálculo y base de datos, con API REST incluida.
- **Por qué conviene:** interfaz muy visual (bueno si el dueño del taller no es técnico), plan gratuito con hasta 1,000 registros por base.
- **Ideal si:** el administrador quiere gestionar órdenes/clientes desde una interfaz tipo tabla sin tocar código, y la app solo necesita leer/escribir esos datos.

### Mi recomendación puntual
Para esta app en concreto (login + roles + tabla de reparaciones), **Supabase** es la mejor relación esfuerzo/beneficio: te da base de datos SQL, autenticación segura de verdad (con hash de contraseñas, algo que la versión actual no tiene) y tiempo real, todo en la capa gratuita, y sin necesidad de administrar un servidor.

⚠️ **Nota de seguridad:** en el código actual las contraseñas se guardan y comparan en texto plano en el navegador. Está bien para una demo, pero antes de usar esto con datos reales de clientes, cualquiera de las opciones de arriba (especialmente Supabase o Firebase) te da autenticación segura sin que tengas que implementar el hash de contraseñas tú mismo.
