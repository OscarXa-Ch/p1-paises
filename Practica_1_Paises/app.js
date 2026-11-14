const API = "https://restcountries.com/v3.1";
const CAMPOS = "fields=name,capital,region,population,flags";

async function buscarPais(nombre) {
const url = `${API}/name/${encodeURIComponent(nombre)}?${CAMPOS}`;
const respuesta = await fetch(url);
if (!respuesta.ok) {
if (respuesta.status === 404) {
throw new Error("No se encontró ningún país con ese nombre.");
}
throw new Error(`Error del servidor (código ${respuesta.status}).`);
}
return await respuesta.json(); // arreglo de países
}

function mostrarPaises(paises) {
const contenedor = document.getElementById("resultados");

contenedor.innerHTML = "";
paises.forEach(pais => {
const tarjeta = document.createElement("article");
tarjeta.className = "tarjeta";
tarjeta.innerHTML = `
<img src="${pais.flags.png}" alt="Bandera de ${pais.name.common}">
<h3>${pais.name.common}</h3>
<p><b>Capital:</b> ${pais.capital ? pais.capital[0] : "Sin capital"}</p>
<p><b>Región:</b> ${pais.region}</p>
<p><b>Población:</b> ${pais.population.toLocaleString("es-MX")}</p>
`;
contenedor.appendChild(tarjeta);
});
}

form.addEventListener("submit", async (e) => {
e.preventDefault();
const nombre = document.getElementById("txtPais").value.trim();
mensaje.textContent = "Cargando...";
try {
const paises = await buscarPais(nombre);
mostrarPaises(paises);
mensaje.textContent = `${paises.length} resultado(s)`;
} catch (error) {
document.getElementById("resultados").innerHTML = "";
mensaje.textContent = error.message;
}
});