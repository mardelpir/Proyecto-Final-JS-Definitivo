// TOASTIFY !!!
function notificacion(e){
    if (e.target.classList.contains("agregar-carrito")) {
        Toastify({
            text: "Producto agregado al carrito!!",
            duration: 3000
            }).showToast();
    }
}

let btnAgregar = document.getElementsByClassName("agregar-carrito");

for(let btn of btnAgregar) {
    btn.addEventListener("click", notificacion);
}