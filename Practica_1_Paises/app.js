const API = "https://api.restcountries.com/countries/v5";
const API_KEY = "rc_live_be9b145c31c44b029fb78628ed812296";

async function buscarPais(nombre) {
  const url = `${API}?q=${encodeURIComponent(nombre)}`;

  const respuesta = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${API_KEY}`
    }
  });

  if (!respuesta.ok) {
    if (respuesta.status === 401 || respuesta.status === 403) {
      throw new Error("API Key inválida o no autorizada.");
    }
    if (respuesta.status === 404) {
      throw new Error("No se encontró ningún país con ese nombre.");
    }
    throw new Error(`Error del servidor (código ${respuesta.status}).`);
  }

  const json = await respuesta.json();
  const paises = json?.data?.objects || [];

  if (paises.length === 0) {
    throw new Error("No se encontró ningún país con ese nombre.");
  }

  // Imprime el resto del objeto sin la sección larga de traducciones
  const ejemplo = { ...paises[0] };
  delete ejemplo.names;
  console.log("Estructura restante del país en v5:", ejemplo);

  return paises;
}

// Extrae la URL de la imagen dentro del objeto flag
function obtenerUrlBandera(flagObj) {
  if (!flagObj) return "";
  if (typeof flagObj === "string") return flagObj;
  for (const valor of Object.values(flagObj)) {
    if (typeof valor === "string" && valor.startsWith("http")) return valor;
    if (valor && typeof valor === "object") {
      const anidada = obtenerUrlBandera(valor);
      if (anidada) return anidada;
    }
  }
  return "";
}

function mostrarPaises(paises) {
  const contenedor = document.getElementById("resultados");
  contenedor.innerHTML = "";

  paises.forEach((pais) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";

    const nombrePais = pais.names?.common || "Sin nombre";
    const capital = pais.capitals?.[0]?.name || "Sin capital";
    const banderaUrl = obtenerUrlBandera(pais.flag);
    const region = pais.region || pais.geography?.region || "Sin región";
    const popRaw = pais.population ?? pais.demographics?.population;
    const poblacion = typeof popRaw === "number"
      ? popRaw.toLocaleString("es-MX")
      : (popRaw || "N/A");

    tarjeta.innerHTML = `
      <img src="${banderaUrl}" alt="Bandera de ${nombrePais}">
      <h3>${nombrePais}</h3>
      <p><b>Región:</b> ${region}</p>
      <p><b>Capital:</b> ${capital}</p>
      <p><b>Población:</b> ${poblacion}</p>
    `;

    contenedor.appendChild(tarjeta);
  });
}

const form = document.getElementById("formBuscar");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("txtPais").value.trim();
  if (!nombre) return;

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
