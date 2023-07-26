const cef = require('./CEF/cef.js');
var loginCEF, loginCAM;

mp.events.add('cliente:iniciarSesion', (obj) => {
    mp.events.callRemote('servidor:iniciarSesion', obj)
});

mp.events.add('cliente:abrirLogin', () => {
    cef.abrirCef("package://CEF/auth/acceder.html")
})

mp.events.add('cliente:avisosLogin', (handle, usuario) => {
    switch (handle) {
        case "exito":
            mp.gui.chat.show(true);
            mp.gui.cursor.show(false, false);
            
            break;
        case "usuariovacio":
            cef.injectCef(`app.mostrarError("Error: El campo de usuario no puede estar vacio.");`);
            break;

        case "contrasenavacia":
            cef.injectCef(`app.mostrarError("Error: El campo de contraseña no puede estar vacia.");`);
            break;

        case "cuentainexistente":
            cef.injectCef(`app.mostrarError("Error: Esta cuenta con el usuario <span style="color: blue;">${usuario}</span> no existe o no pertenece a nuestra base de datos.");`);
            break;

        case "contrasenaincorrecta":
            cef.injectCef(`app.mostrarError("Error: Las credenciales introducidas son icorrectas.");`);
            break;

        default:
            break;
    }
})