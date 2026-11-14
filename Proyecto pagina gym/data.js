/* =====================================================================
   CAPA DE DATOS CON DATOS LOCALES AMPLIADOS PARA PRUEBAS
   ===================================================================== */
const CAPACIDAD_MAXIMA = 25;

const DB = (() => {
  const K_ALUMNOS = "gym_alumnos";
  const K_REGISTROS = "gym_registros";

  // DATOS LOCALES DE PRUEBA
  const alumnosDemo = [
    { control: "232310309", nombre: "Oscar Xaavier Contreras Herrada", clave: "1234" },
    { control: "232310192", nombre: "Erick Alejandro Carrillo Esparza", clave: "1234" },
    { control: "232310165", nombre: "David Belmonte Flores", clave: "1234" },
    { control: "232310154", nombre: "Roberto Martinez Elizalde", clave: "1234" },
  ];

  const encargadoDemo = { usuario: "encargado", clave: "admin123", nombre: "Encargado del Gimnasio" };

  // Tiempo base para simular entradas pasadas (hace 45 mins, 30 mins, etc.)
  const ahora = Date.now();
  const MIN = 60 * 1000;

  const historialDemo = [
    
  ];

  const leer = (k, def) => JSON.parse(localStorage.getItem(k) || JSON.stringify(def));
  const guardar = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  // Inicializar almacenamiento local si no existe
  if (!localStorage.getItem(K_ALUMNOS)) guardar(K_ALUMNOS, alumnosDemo);
  if (!localStorage.getItem(K_REGISTROS)) guardar(K_REGISTROS, historialDemo);

  async function autenticar(rol, usuario, clave) {
    if (rol === "encargado") {
      return usuario === encargadoDemo.usuario && clave === encargadoDemo.clave
        ? { rol, usuario: encargadoDemo.usuario, nombre: encargadoDemo.nombre } : null;
    }
    const a = leer(K_ALUMNOS, []).find(x => x.control === usuario && x.clave === clave);
    return a ? { rol, usuario: a.control, nombre: a.nombre } : null;
  }

  async function buscarAlumnos(texto) {
    const t = texto.trim().toLowerCase();
    return leer(K_ALUMNOS, []).filter(a => a.control === t || a.nombre.toLowerCase().includes(t))
      .map(({ control, nombre }) => ({ control, nombre }));
  }

  async function obtenerPresentes() {
    return leer(K_REGISTROS, []).filter(r => r.salida === null);
  }

  async function obtenerHistorial() {
    return leer(K_REGISTROS, []).sort((a, b) => b.entrada - a.entrada);
  }

  async function registrarEntrada(control) {
    const alumno = leer(K_ALUMNOS, []).find(a => a.control === control);
    if (!alumno) throw new Error("NO_EXISTE");
    const registros = leer(K_REGISTROS, []);
    const dentro = registros.filter(r => r.salida === null);
    if (dentro.some(r => r.control === control)) throw new Error("YA_DENTRO");
    if (dentro.length >= CAPACIDAD_MAXIMA) throw new Error("AFORO_LLENO");
    registros.push({ control, nombre: alumno.nombre, entrada: Date.now(), salida: null });
    guardar(K_REGISTROS, registros);
  }

  async function registrarSalida(control) {
    const registros = leer(K_REGISTROS, []);
    const reg = registros.find(r => r.control === control && r.salida === null);
    if (!reg) throw new Error("NO_ESTA_DENTRO");
    reg.salida = Date.now();
    guardar(K_REGISTROS, registros);
  }

  return { autenticar, buscarAlumnos, obtenerPresentes, obtenerHistorial, registrarEntrada, registrarSalida };
})();