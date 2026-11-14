requerirRol("encargado");

const form = document.getElementById("formAsistencia");
const inBusqueda = document.getElementById("busqueda");
const listaCoincidencias = document.getElementById("coincidencias");
const modalSalida = new bootstrap.Modal(document.getElementById("modalSalida"));
let presentes = [];
let controlPorSalir = null;

async function actualizar() {
  presentes = await DB.obtenerPresentes();
  const n = presentes.length;
  document.getElementById("ocupacion").innerHTML = `${n}<small> / ${CAPACIDAD_MAXIMA}</small>`;
  document.getElementById("disponibles").textContent = CAPACIDAD_MAXIMA - n;
  const barra = document.getElementById("barraAforo");
  barra.style.width = `${(n / CAPACIDAD_MAXIMA) * 100}%`;
  barra.className = "progress-bar " + (n >= CAPACIDAD_MAXIMA ? "bg-danger" : n >= 20 ? "bg-warning" : "bg-success");
  barra.setAttribute("aria-valuenow", n);

  document.getElementById("tablaPresentes").innerHTML = n
    ? presentes.map(r => `<tr><td>${escaparHtml(r.control)}</td><td>${escaparHtml(r.nombre)}</td>
        <td>${formatearHora(r.entrada)}</td><td class="tiempo" data-entrada="${r.entrada}">--</td>
        <td><button class="btn btn-sm btn-outline-danger" data-salida="${escaparHtml(r.control)}">Salida</button></td></tr>`).join("")
    : `<tr><td colspan="5" class="text-center text-muted">No hay alumnos dentro.</td></tr>`;
  pintarTiempos();
  pintarHistorial();
}

function pintarTiempos() {
  document.querySelectorAll("td.tiempo[data-entrada]").forEach(td => {
    td.textContent = formatearDuracion(Date.now() - Number(td.dataset.entrada));
  });
}

async function pintarHistorial() {
  const filtro = document.getElementById("filtroHistorial").value.trim().toLowerCase();
  const datos = (await DB.obtenerHistorial()).filter(r => r.nombre.toLowerCase().includes(filtro) || r.control.includes(filtro));
  document.getElementById("tablaHistorial").innerHTML = datos.length
    ? datos.map(r => `<tr><td>${escaparHtml(r.control)}</td><td>${escaparHtml(r.nombre)}</td><td>${formatearHora(r.entrada)}</td>
        <td>${r.salida ? formatearHora(r.salida) : '<span class="badge text-bg-success">Dentro</span>'}</td>
        <td class="tiempo">${formatearDuracion((r.salida || Date.now()) - r.entrada)}</td></tr>`).join("")
    : `<tr><td colspan="5" class="text-center text-muted">Sin resultados.</td></tr>`;
}

async function ejecutar(accion, control) {
  try {
    if (accion === "entrada") await DB.registrarEntrada(control);
    else await DB.registrarSalida(control);
    mostrarToast(accion === "entrada" ? "Entrada registrada." : "Salida registrada.");
    form.reset();
    inBusqueda.classList.remove("is-valid", "is-invalid");
    listaCoincidencias.innerHTML = "";
    await actualizar();
  } catch (err) {
    mostrarToast(MENSAJES_ERROR[err.message] || "Ocurrió un error.", "danger");
  }
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  const accion = e.submitter.dataset.accion;
  const texto = inBusqueda.value.trim();
  const valido = texto.length >= 3;
  inBusqueda.classList.toggle("is-invalid", !valido);
  inBusqueda.classList.toggle("is-valid", valido);
  if (!valido) return;

  const coincidencias = await DB.buscarAlumnos(texto);
  if (coincidencias.length === 0) return mostrarToast("No se encontró ningún alumno con ese dato.", "danger");
  if (coincidencias.length === 1) return ejecutar(accion, coincidencias[0].control);

  // Varias coincidencias por nombre: el encargado elige a quién registrar
  listaCoincidencias.innerHTML = coincidencias.map(a =>
    `<button type="button" class="list-group-item list-group-item-action" data-control="${escaparHtml(a.control)}" data-accion="${accion}">
      ${escaparHtml(a.nombre)} <span class="text-muted">(${escaparHtml(a.control)})</span></button>`).join("");
});

listaCoincidencias.addEventListener("click", e => {
  const b = e.target.closest("button[data-control]");
  if (b) ejecutar(b.dataset.accion, b.dataset.control);
});

document.getElementById("tablaPresentes").addEventListener("click", e => {
  const b = e.target.closest("button[data-salida]");
  if (!b) return;
  controlPorSalir = b.dataset.salida;
  document.getElementById("nombreSalida").textContent = presentes.find(r => r.control === controlPorSalir).nombre;
  modalSalida.show();
});

document.getElementById("confirmarSalida").addEventListener("click", async () => {
  modalSalida.hide();
  await ejecutar("salida", controlPorSalir);
});

document.getElementById("filtroHistorial").addEventListener("input", pintarHistorial);

setInterval(pintarTiempos, 1000);
setInterval(actualizar, 15000);
actualizar();
