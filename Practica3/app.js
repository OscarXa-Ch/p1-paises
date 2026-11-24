const API_URL = "https://TU-API.onrender.com/api/productos";
const API_KEY = "CAMBIA_ESTA_CLAVE";
const mensaje=document.getElementById("mensaje"), resultados=document.getElementById("resultados");
async function listar(){
 mensaje.textContent="Cargando...";
 try{
  const r=await fetch(API_URL); if(!r.ok) throw new Error(`Código ${r.status}`);
  const productos=await r.json();
  resultados.innerHTML=productos.map(p=>`<article class="tarjeta"><h3>${escapar(p.nombre)}</h3><p>Precio: $${p.precio}</p><p>Stock: ${p.stock}</p><button data-id="${p.id}">Eliminar</button></article>`).join("");
  mensaje.textContent=`${productos.length} producto(s)`;
 }catch(e){mensaje.textContent="No se pudo conectar con la API: "+e.message;}
}
function escapar(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
async function protegida(url,metodo,datos){
 const r=await fetch(url,{method:metodo,headers:{"Content-Type":"application/json","x-api-key":API_KEY},body:datos?JSON.stringify(datos):undefined});
 if(!r.ok){let d={};try{d=await r.json()}catch{}throw new Error(d.errores?d.errores.join(", "):(d.error||`Código ${r.status}`));}
}
document.getElementById("formProducto").addEventListener("submit",async e=>{
 e.preventDefault();const datos={nombre:document.getElementById("txtNombre").value.trim(),precio:Number(document.getElementById("txtPrecio").value),stock:Number(document.getElementById("txtStock").value)};
 try{await protegida(API_URL,"POST",datos);e.target.reset();await listar();mensaje.textContent="Producto agregado correctamente";}catch(err){mensaje.textContent="No se pudo guardar: "+err.message;}
});
resultados.addEventListener("click",async e=>{if(e.target.tagName!=="BUTTON")return;try{await protegida(`${API_URL}/${e.target.dataset.id}`,"DELETE");await listar();mensaje.textContent="Producto eliminado correctamente";}catch(err){mensaje.textContent="No se pudo eliminar: "+err.message;}});
listar();