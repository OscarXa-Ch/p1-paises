const form = document.getElementById("formLogin");
const selRol = document.getElementById("rol");
const inUsuario = document.getElementById("usuario");
const inClave = document.getElementById("clave");
const alerta = document.getElementById("alertaLogin");

// Si ya hay sesión, ir directo a su panel
const sesionActiva = obtenerSesion();
if (sesionActiva) window.location.href = sesionActiva.rol === "encargado" ? "encargado.html" : "alumno.html";

selRol.addEventListener("change", () => {
  const esAlumno = selRol.value === "alumno";
  document.getElementById("etiquetaUsuario").textContent = esAlumno ? "Número de control" : "Usuario";
  inUsuario.placeholder = esAlumno ? "Ej. 232310309" : "Ej. encargado";
});

document.getElementById("verClave").addEventListener("change", e => {
  inClave.type = e.target.checked ? "text" : "password";
});

function validar(campo, esValido) {
  campo.classList.toggle("is-valid", esValido);
  campo.classList.toggle("is-invalid", !esValido);
  return esValido;
}

function mostrarError(msg) {
  alerta.textContent = msg;
  alerta.classList.remove("d-none");
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  alerta.classList.add("d-none");
  const rol = selRol.value;
  const okRol = validar(selRol, rol !== "");
  const okUsuario = validar(inUsuario, rol === "alumno" ? /^\d{9}$/.test(inUsuario.value.trim()) : inUsuario.value.trim().length >= 3);
  const okClave = validar(inClave, inClave.value.length >= 4);
  if (!(okRol && okUsuario && okClave)) return;

  const sesion = await DB.autenticar(rol, inUsuario.value.trim(), inClave.value);
  if (!sesion) return mostrarError("Usuario o contraseña incorrectos.");

  // El alumno ocupa 1 lugar del aforo al iniciar sesión; el encargado no cuenta.
  if (rol === "alumno") {
    try {
      await DB.registrarEntrada(sesion.usuario);
    } catch (err) {
      if (err.message !== "YA_DENTRO") return mostrarError(MENSAJES_ERROR[err.message] || "Error al registrar la entrada.");
    }
  }
  iniciarSesion(sesion);
  window.location.href = rol === "encargado" ? "encargado.html" : "alumno.html";
});
