const con = require('../../query');
const crypto = require('crypto');

function hashPassword(str) {
    const ENC = "bf3c199c2470cb477d907b1e0917c17b";
    const IV = "5183666c72eec9e4";
    const ALGO = "aes-256-cbc";
    const cipher = crypto.createCipheriv(ALGO, ENC, IV);
    let encrypted = cipher.update(str, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
}

// Parte login

mp.events.add('playerReady', (player) => {
    player.call('cliente:abrirLogin');
})

mp.events.add('servidor:iniciarSesion', async (player, obj) => {
    const data = JSON.parse(obj);
    const usuario = data.usuario;
    const contrasena2 = data.contrasena;
    const contrasena = hashPassword(data.contrasena);

    const d = await con.query(`SELECT * FROM usuarios WHERE usuario = '${usuario}'`);

    if (!usuario) {
        return player.call('cliente:avisosLogin', ["usuariovacio"]);
    }

    if (!contrasena2) {
        return player.call('cliente:avisosLogin', ["contrasenavacia"]);
    }

    if (!d[0]) {
        return player.call('cliente:avisosLogin', ["cuentainexistente"]);
    }

    if (d[0].contrasena !== contrasena) {
        return player.call('cliente:avisosLogin', ["contrasenaincorrecta"]);
    }

    player.call('cliente:avisosLogin', ["exito", d[0].cef_chat_preferencia]);

    player.guid = d[0].id;
    player.setVariable("sesionIniciada", true);
    player.usuario = d[0].usuario;

    try {
        con.query(`UPDATE usuarios SET ultimoActivo = now(), socialClub = '${player.socialClub}', ip = '${player.ip}', socialClubId = '${player.seial}' WHERE id = '${player.guid}'`);
    } catch (error) {
        console.log(error);
    }
});

// Parte registro

mp.events.add('servidor:registrarCuenta', async (player, obj) => {
    const data = JSON.parse(obj);
    const usuario = data.usuario;
    const correo = data.correo;
    const contrasena = data.contrasena;
    const contrasena2 = data.contrasena2;
    const contrasenaEncriptada = hashPassword(contrasena);
    const ipEncriptada = hashPassword(player.ip);
    const correoEncriptado = hashPassword(correo);

    const d = await con.query(`SELECT * FROM usuarios WHERE usuario = '${usuario}' OR correo = '${correo}'`);

    if (!usuario) {
        return player.call('cliente:avisosRegistro', ["usuariovacio"]);
    }

    if (!correo) {
        return player.call('cliente:avisosRegistro', ["correovacio"]);
    }

    if (!contrasena) {
        return player.call('cliente:avisosRegistro', ["contrasenavacia"]);
    }

    if (!contrasena2) {
        return player.call('cliente:avisosRegistro', ["contrasena2vacia"]);
    }

    if (d.length > 0) {
        return player.call('cliente:avisosRegistro', ["usuarioexiste"]);
    }

    if (contrasena !== contrasena2) {
        return player.call('cliente:avisosRegistro', ["contrasenasnocoinciden"]);
    }

    if (contrasena.length < 6) {
        return player.call('cliente:avisosRegistro', ["contrasenacorta"]);
    }

    con.query(`INSERT INTO usuarios (usuario, contrasena, correo, fechaRegistro, socialClub, socialClubId, ip, ip_registro) VALUES ('${usuario}', '${contrasenaEncriptada}', '${correo}', NOW(), '${player.socialClub}', '${player.serial}', '${ipEncriptada}', '${ipEncriptada}')`);

    console.log('registrado!');
});

// Parte recordar contraseña
mp.events.add('servidor:recuperarContrasena', (player, obj) => {
    const data = JSON.parse(obj);
    const correo = data.correo;

    // condiciones o enviar el correo
});

// Parte tipo de selector
mp.events.add('servidor:escogerPreferencia', async (player, handle) => {
    switch (handle) {
        case 1:
            try {
                await con.query(`UPDATE usuarios SET cef_chat_preferencia = '1' WHERE id = '${player.guid}'`);
            } catch (error) {
                console.log(error);
            }

            player.call('cerrarCef');
            player.outputChatBox(`Aquí hay que hacer el tema del selector de los personajes`)
            break;

        case 2:
            try {
                await con.query(`UPDATE usuarios SET cef_chat_preferencia = '2' WHERE id = '${player.guid}'`);
            } catch (error) {
                console.log(error);
            }

            player.call('cerrarCef');
            player.outputChatBox(`Aquí hay que hacer el tema del selector de los personajes`)
            break;

        default:
            break;
    }
});