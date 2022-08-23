// Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaProductos = document.querySelector("#lista-productos");
let articulosCarrito = [];

registrarListeners();
function registrarListeners() {
    // Cuando agregas un producto presionando "Agregar al Carrito"

    listaProductos.addEventListener("click", agregarProducto);

    // Elimina productos del carrito

    carrito.addEventListener("click", eliminarProducto);

    // Muestra los productos del LS

    document.addEventListener("DOMContentLoaded", () =>{
        articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carritoHTML();
    })

    // Vaciar el carrito

    vaciarCarritoBtn.addEventListener("click", () =>{
        articulosCarrito = [];
        limpiarHTML(); // Elimina todo el HTML
    })
}

// Funciones

function agregarProducto(e) {
    e.preventDefault();

    if (e.target.classList.contains("agregar-carrito")) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
    }
}

// Elimina un producto del carrito

function eliminarProducto(e) {
    if(e.target.classList.contains("borrar-producto")){
        const productoId = e.target.getAttribute("data-id");

        // Elimina del array articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
        carritoHTML(); // Iterar sobre el carrito y mostar su html
    }
}

// Lee el contenido del HTML al que le dimos click y extrae la información del producto

function leerDatosProducto(producto) {
    console.log(producto);

    // Crear un objeto con el contenido del producto actual
    const infoProducto = {
        imagen: producto.querySelector("img").src,
        titulo: producto.querySelector("h4").innerText,
        precio: producto.querySelector(".precio span").innerText,
        id: producto.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    // Revisa si un producto ya existe en el carrito
    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);
    if (existe) {
        // Actualizamos la cantidad
        const productos = articulosCarrito.map(producto => {
            if(producto.id === infoProducto.id){
                producto.cantidad++;
                return producto; // Devuelve el producto con la cantidad actualizada
            }else{
                return producto; // Devuelve los productos que no estan duplicados
            }
        })
    }else{
        // Agrega productos al Array del carrito
        articulosCarrito = [...articulosCarrito, infoProducto];
    }

    console.log(articulosCarrito);

    carritoHTML();
}

// Mostrar el carrito de compras en el HTML

function carritoHTML() {
    // Limpiar el HTML
    limpiarHTML();
    // Recorre el carrito y genera el HTML

    articulosCarrito.forEach( producto =>{
        const {id, imagen, titulo, precio, cantidad} = producto;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
            <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
            <a href="#" class="borrar-producto" data-id="${id}"> X </a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

    // Agregar el carrito al LocalStorage
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

// Elimina los elementos del tbody

function limpiarHTML() {
    contenedorCarrito.innerHTML = "";
}

