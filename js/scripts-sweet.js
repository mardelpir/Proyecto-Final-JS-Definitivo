// SWEET ALERT !!

function validarFormulario(){
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;

    if(nombre.trim() == ""){
        mostrarError("Nombre");
        return false;
    }
    if(email.trim() == ""){
        mostrarError("Email");
        return false;
    }
    
    Swal.fire({
        title: 'Desea guardar los Datos?',
        text: "Los datos serán almacenados en una LocalStorage",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, por favor!'
      }).then((result) => {
        if (result.isConfirmed) {
            guardarDatos(nombre, email);
          Swal.fire(
            'Datos Guardados!',
            'Los datos fueron almacenados en la LocalStorage.',
            'success'
          )
        }
      })
}

function mostrarError(campo){
    Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Falta completar el Campo: ' + campo
      })
}

function guardarDatos(nombre, email){
    localStorage.setItem("datosFormulario", JSON.stringify({nombre:nombre, email:email}));
}

document.getElementById("boton-enviar").addEventListener("click", validarFormulario);