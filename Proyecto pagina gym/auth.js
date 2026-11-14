/* Sesión y utilidades compartidas por todas las páginas */
const K_SESION = "gym_sesion";

function obtenerSesion() {
  return JSON.parse(sessionStorage.getItem(K_SESION) || "null");
}

function iniciarSesion(datos) {
  sessionStorage.setItem(K_SESION, JSON.stringify(datos));
}

function cerrarSesion() {
  sessionStorage.removeItem(K_SESION);
  window.location.href = "index.html";
}

// Redirige al inicio si no hay sesión o el rol no corresponde
function requerirRol(rol) {
  const s = obtenerSesion();
  if (!s || s.rol !== rol) {
    window.location.href = "index.html";
    return null;
  }
  document.querySelectorAll(".nombre-usuario").forEach(el => (el.textContent = s.nombre));
  document.querySelectorAll(".btn-cerrar-sesion").forEach(b => b.addEventListener("click", cerrarSesion));
  return s;
}

function formatearDuracion(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const p = n => String(n).padStart(2, "0");
  return `${p(Math.floor(total / 3600))}:${p(Math.floor((total % 3600) / 60))}:${p(total % 60)}`;
}

function formatearHora(ts) {
  return new Date(ts).toLocaleString("es-MX", { dateStyle: "short", timeStyle: "short" });
}

function escaparHtml(texto) {
  const d = document.createElement("div");
  d.textContent = texto;
  return d.innerHTML;
}

const MENSAJES_ERROR = {
  NO_EXISTE: "El alumno no está registrado.",
  YA_DENTRO: "El alumno ya se encuentra dentro del gimnasio.",
  AFORO_LLENO: `Aforo completo: el gimnasio ya tiene ${CAPACIDAD_MAXIMA} personas.`,
  NO_ESTA_DENTRO: "El alumno no tiene una entrada activa."
};

function mostrarToast(mensaje, tipo = "success") {
  const contenedor = document.getElementById("zonaToast");
  const el = document.createElement("div");
  el.className = `toast align-items-center text-bg-${tipo} border-0`;
  el.setAttribute("role", "alert");
  el.innerHTML = `<div class="d-flex"><div class="toast-body">${escaparHtml(mensaje)}</div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button></div>`;
  contenedor.appendChild(el);
  const toast = new bootstrap.Toast(el, { delay: 4000 });
  el.addEventListener("hidden.bs.toast", () => el.remove());
  toast.show();
}
