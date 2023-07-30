const con = require('../query');

mp.events.addCommand('seleccionarpj', async (player, guid) => {
    if (!guid) {
        return player.outputChatBox(`!{${colores.azul}}[USO]: !{white}/seleccionarpj [guid]`);
    }

    if (!Number(guid)) {
        return player.outputChatBox(`!{${colores.rojo}}[ERROR]: !{white}El parámetro GUID debe ser un número.`);
    }

    const d = await con.query(`SELECT * FROM personajes WHERE id = '${guid}'`);

    if (!d[0]) {
        return player.outputChatBox(`!{${colores.rojo}}[ERROR]: !{white}No hay esiste ningún personaje con esta GUID en nuestra base de datos.`);
    }

    if (d[0].idusuario !== player.guid) {
        return player.outputChatBox(`!{${colores.rojo}}[ERROR]: !{white}Este personaje no es tuyo.`);
    }

    let personajeIniciado = mp.players.toArray().find(p => p.getVariable('personajeIniciado') === guid);

    if (personajeIniciado) {
        return player.outputChatBox(`!{${colores.rojo}}[ERROR]: !{white}Este personaje ya está en uso.`);
    }

    player.name = d[0].nombre;
    player.npj = d[0].n_pj;
    player.pjid = d[0].id;
    player.tlf = d[0].numero_tlf;
    player.facciones = JSON.stringify(d[0].facciones);
    player.faccion_principal = d[0].faccion_principal;
    player.rango_principal = d[0].rango_principal;
    player.dinero = {
        efectivo: d[0].dinero,
        banco: d[0].banco,
        pay: d[0].pay,
    }

    player.setVariable('personajeIniciado', guid);

    (d[0].posicion === "") ? player.position = new mp.Vector3(-17.91838836669922, 11.694050788879395, 71.7161941528320) : player.position = new mp.Vector3(JSON.parse(d[0].posicion));
    player.dimension = d[0].dimension;
    player.heading = d[0].heading;
    player.call('congelarUsuarioLocal', [2]);

    player.outputChatBox(`!{${colores.verde}}Estás jugando con ${d[0].nombre}`);
});

mp.events.addCommand('coords', (player) => {
    var pos = player.position;
    player.outputChatBox(`!{orange}{ X: ${pos.x}, Y: ${pos.y}, Z: ${pos.z}, ROT: ${player.heading}, DIM: ${player.dimension} }`);
    console.log(`{ X: ${pos.x}, Y: ${pos.y}, Z: ${pos.z}, ROT: ${player.heading}, DIM: ${player.dimension} }`);
})

mp.events.addCommand("tpcords", (player, _, x, y, z) => {
    x = parseInt(x);
    y = parseInt(y);
    z = parseInt(z);

    player.position = new mp.Vector3(x, y, z);
    player.dimension = 0;
    player.outputChatBox(`!{green}Te has teletransportado a las coordenadas ${x}, ${y}, ${z} correctamente.`);
});