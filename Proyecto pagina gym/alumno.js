const sesion = requerirRol("alumno");
let entradaActual = null;

async function cargar() {
  const presentes = await DB.obtenerPresentes();
  const mio = presentes.find(r => r.control === sesion.usuario);
  if (!mio) return cerrarSesion(); // el encargado ya registró su salida
  entradaActual = mio.entrada;
  document.getElementById("horaEntrada").textContent = formatearHora(entradaActual);
  document.getElementById("ocupacion").textContent = `${presentes.length} / ${CAPACIDAD_MAXIMA}`;
  const barra = document.getElementById("barraAforo");
  barra.style.width = `${(presentes.length / CAPACIDAD_MAXIMA) * 100}%`;
  barra.textContent = presentes.length;

  const historial = (await DB.obtenerHistorial()).filter(r => r.control === sesion.usuario && r.salida);
  document.getElementById("tablaHistorial").innerHTML = historial.length
    ? historial.map(r => `<tr><td>${formatearHora(r.entrada)}</td><td>${formatearHora(r.salida)}</td>
        <td class="tiempo">${formatearDuracion(r.salida - r.entrada)}</td></tr>`).join("")
    : `<tr><td colspan="3" class="text-center text-muted">Aún no tienes visitas anteriores.</td></tr>`;
}

setInterval(() => {
  if (entradaActual) document.getElementById("cronometro").textContent = formatearDuracion(Date.now() - entradaActual);
}, 1000);

document.getElementById("btnSalir").addEventListener("click", async () => {
  await DB.registrarSalida(sesion.usuario);
  cerrarSesion();
});

cargar();
setInterval(cargar, 15000);
