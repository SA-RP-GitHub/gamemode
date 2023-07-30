const cef = require('./CEF/cef.js');
var loginCEF, loginCAM;

mp.events.add('cliente:abrirLogin', () => {
    cef.abrirCef("package://CEF/auth/acceder.html");
});

mp.events.add('cliente:abrirSelectorPreferencia', () => {
    cef.abrirCef("package://CEF/auth/tipo-selector.html");
});

// Parte login
mp.events.add('cliente:iniciarSesion', (obj) => {
    mp.events.callRemote('servidor:iniciarSesion', obj)
});

mp.events.add('cliente:avisosLogin', (handle, preferencia) => {
    switch (handle) {
        case "exito":
            (preferencia == 0) ? mp.events.call('cliente:abrirSelectorPreferencia') : mp.events.call('cerrarCef');
            break;
        case "usuariovacio":
            cef.injectCef(`app.mostrarError("Error: El campo de usuario no puede estar vacío.");`);
            break;

        case "contrasenavacia":
            cef.injectCef(`app.mostrarError("Error: El campo de contraseña no puede estar vacia.");`);
            break;

        case "cuentainexistente":
            cef.injectCef(`app.mostrarError("Error: El usuario introducido no se encuentra registrado.");`);
            break;

        case "contrasenaincorrecta":
            cef.injectCef(`app.mostrarError("Error: Las credenciales introducidas son incorrectas.");`);
            break;

        default:
            break;
    }
});

// Parte registro
mp.events.add('cliente:registrarCuenta', (obj) => {
    mp.events.callRemote('servidor:registrarCuenta', obj)
});

mp.events.add('cliente:avisosRegistro', (handle) => {
    switch (handle) {
        case "exito":
            mp.events.call('cerrarCef');
            mp.gui.chat.show(true);
            mp.gui.cursor.show(false, false);

            break;
        case "usuariovacio":
            cef.injectCef(`app.mostrarError("Error: El campo de usuario no puede estar vacío.");`);
            break;

        case "correovacio":
            cef.injectCef(`app.mostrarError("Error: El campo de correo no puede estar vacío.");`);
            break;

        case "contrasenavacia":
            cef.injectCef(`app.mostrarError("Error: El campo de contraseña no puede estar vacia.");`);
            break;

        case "contrasena2vacia":
            cef.injectCef(`app.mostrarError("Error: El campo para repetir la contraseña no puede estar vacía.");`);
            break;

        case "usuarioexiste":
            cef.injectCef(`app.mostrarError("Error: El usuario o correo introducido ya se encuentra registrado en nuestra base de datos.");`);
            break;

        case "contrasenasnocoinciden":
            cef.injectCef(`app.mostrarError("Error: Las contraseñas no coindicen, verifícalas.");`);
            break;

        case "contrasenacorta":
            cef.injectCef(`app.mostrarError("Error: La contraseña debe contener 6 carácteres como mínimo.");`);
            break;

        default:
            break;
    }
})

// Parte recuperar contraseña
mp.events.add('cliente:recuperarContrasena', (obj) => {
    mp.events.callRemote("servidor:recuperarContrasena", (obj));
})

// Parte tipo de selector
mp.events.add('cliente:escogerPreferencia', (handle) => {
    switch (handle) {
        case 1:
            mp.events.callRemote('servidor:escogerPreferencia', 1);
            break;

        case 2:
            mp.events.callRemote('servidor:escogerPreferencia', 2);
            break;

        default:
            break;
    }
})