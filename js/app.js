document.addEventListener('DOMContentLoaded', function () {

    //seleccionar los elementos de la interfaz

    const inputEmail = document.querySelector('#email')

    const inputCC = document.querySelector('#CC')

    const inputAsunto = document.querySelector('#asunto')

    const inputMensaje = document.querySelector('#mensaje')

    const formulario = document.querySelector('#formulario')

    const btnSubmit = document.querySelector('#formulario button[type = "submit"]')

    const btnReset = document.querySelector('#formulario button[type = "reset"]')

    const spinner = document.querySelector('#spinner')


    const email = {
        email: "",
        CC: "",
        asunto: "",
        mensaje: ""
    }

    //assignar eventos

    inputEmail.addEventListener('input', validar)
    inputCC.addEventListener('input', validarCC)
    inputAsunto.addEventListener('input', validar)

    inputMensaje.addEventListener('input', validar)

    formulario.addEventListener('submit', enviarFormulario)

    btnReset.addEventListener('click', function (e) {
        e.preventDefault()
        resetForm()
    })

    function enviarFormulario(e) {
        e.preventDefault()

        spinner.classList.add('flex')
        spinner.classList.remove('hidden')

        setTimeout(() => {

            spinner.classList.add('hidden')
            spinner.classList.remove('flex')

            resetForm()

            //crear una alerta de exito

            const alertaExito = document.createElement('P')
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10',
                'font-bold', 'text-sm', 'uppercase')
            alertaExito.textContent = 'Mensaje enviado!!'

            formulario.appendChild(alertaExito)

            setTimeout(() => {
                alertaExito.remove()
            }, 3000)


        }, 3000)
    }


    function validar(e) {


        if (e.target.value.trim() === "") {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail()
            return
        }


        if (e.target.id === "email" && !validarEmail(e.target.value)) {
            mostrarAlerta("El email no es valido", e.target.parentElement)
            email[e.target.id] = '';
            comprobarEmail()
            return;
        }


        limpiarAlerta(e.target.parentElement)

        //Asignar los valores

        email[e.target.id] = e.target.value.trim().toLowerCase()

        //comprobar el objeto del email

        comprobarEmail()
    }


    function validarCC(e) {

        if (e.target.id === "CC" && !validarEmail(e.target.value)) {
            mostrarAlerta("El CC no es valido", e.target.parentElement)
            email[e.target.id] = '';
            comprobarEmail()
            return;
        }


        limpiarAlerta(e.target.parentElement)

        email[e.target.id] = e.target.value.trim().toLowerCase()



        //comprobar el objeto del email

        comprobarEmail()

    }



    function mostrarAlerta(mensaje, referencia) {

        limpiarAlerta(referencia)

        //generar alerta en HTML
        const error = document.createElement('P')
        error.textContent = mensaje
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center', 'alerta')


        //inyectamos el error del formulario

        referencia.appendChild(error)

    }

    function limpiarAlerta(referencia) {

        //comprueba si ya existe una alerta
        const checkAlerta = referencia.querySelector('.alerta');

        if (checkAlerta) {
            checkAlerta.remove()
        }
    }


    function validarEmail(email) {

        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email)

        return resultado;
    }

    function comprobarEmail() {
        const { CC, ...restoEmail } = email;

        if (Object.values(restoEmail).includes("")) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
        } else {
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        }
    }

    function resetForm() {

        limpiarAlerta(inputEmail.parentElement);
        limpiarAlerta(inputCC.parentElement);
        //reset formulario
        email.email = '';
        email.CC = '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset()

        comprobarEmail()
    }



})