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

mp.events.add('playerReady', (player) => {
    player.call('cliente:abrirLogin');
})

mp.events.add('servidor:iniciarSesion', async (player, obj) => {
    const data = JSON.parse(obj);
    const usuario = data.usuario;
    const contrasena2 = data.contrasena;
    const contrasena = hashPassword(data.contrasena);

    const d = await con.query(`SELECT * FROM usuarios WHERE usuario = '${usuario}'`);

    if (usuario == "") {
        return player.call('cliente:avisosLogin', ["usuariovacio"]);
    }

    if (contrasena2 == "") {
        return player.call('cliente:avisosLogin', ["contrasenavacia"]);
    }

    if (!d[0]) {
        return player.call('cliente:avisosLogin', ["cuentainexistente", usuario]);
    }

    if (d[0].contrasena !== contrasena) {
        return player.call('cliente:avisosLogin', ["contrasenaincorrecta"]);
    }

    player.call('cliente:avisosLogin', ["exito"]);

    if (d[0].selector_preferencia == 0) player.outputChatBox(`!{#036ffc}[INFO]: !{white}Por favor, elige como quieres seleccionar el personaje con el comando !{white}/selmetodopj`) + player.outputChatBox(`• Chat: Selecciona tu personaje mediante comando (mejor rendimiento)`) + player.outputChatBox(`• CEF: Selecciona tu personaje mediante una gráfica (peor rendimiento)`);

    player.guid = d[0].id;
    player.setVariable("sesionIniciada", true);
    player.usuario = d[0].usuario;

    try {
        con.query(`UPDATE usuarios SET ultimoActivo = now(), socialClub = '${player.socialClub}', ip = '${player.ip}', socialClubId = '${player.seial}' WHERE id = '${player.guid}'`);
    } catch (error) {
        console.log(error);
    }

    lobby(player);

    (d[0].selector_preferencia == 1) ? await abrirMetodoSelPj(player, 1) : await abrirMetodoSelPj(player, 2);
});

async function abrirMetodoSelPj(player, estado) {
    switch (estado) {
        case 1:
            player.call('cerrarCef');
            player.outputChatBox(`!{${colores.azul}}[INFO]: !{white}Muévete hasta la mesa que tienes enfrente y presiona la tecla !{${colores.azul}}E !{white} para escoger un personaje y empezar a rolear.`);
            break;

        case 2:
            player.call('cerrarCef');
            setTimeout(async () => {
                const result = await con.query(`SELECT * FROM personajes WHERE idusuario = ${player.guid}`);
                if (!result[0]) {
                    player.outputChatBox(`!{red}No tienes personajes creados, crea uno en el PCU para seleccionarlo.`);
                    player.outputChatBox(`!{red}Serás expulsado automáticamente en un (1) minuto. ¡Vuelve pronto!`);
                    setTimeout(() => {
                        player.kick();
                    }, 60000);
                    return;
                } else {
                    player.outputChatBox('!{#A0F05B}--------------- TUS PERSONAJES - ELIGE UNO ---------------');
                    result.forEach((row) => {
                        player.outputChatBox(`!{yellow}(GUID: ${row.id}) !{white}${row.nombre}`);
                    });
                    player.outputChatBox(`!{${colores.azul}}[INFO]: Escribe !{white}/seleccionarpj !{${colores.azul}}para escoger un personaje.`);
                }
            }, 500);
            break;
        default:
            break;
    }
}

function lobby(player) {
    player.dimension = player.guid;
    player.position = new mp.Vector3(402.7816162109375, -997.0333862304688, -99.00023651123047);
    player.heading = -179.58746337890625;
    player.model = "csb_mp_agent14";

    mp.objects.new('apa_prop_apa_cutscene_doorb', new mp.Vector3(404.5050964355469, -996.643408203125, -99.00403594970703),
        {
            rotation: new mp.Vector3(0, 0, -90.26335144042969),
            alpha: 255,
            dimension: player.guid,
        });

    mp.objects.new('apa_prop_apa_cutscene_doorb', new mp.Vector3(400.98193359375, -996.643408203125, -99.00403594970703),
        {
            rotation: new mp.Vector3(0, 0, -90.26335144042969),
            alpha: 255,
            dimension: player.guid,
        });
}