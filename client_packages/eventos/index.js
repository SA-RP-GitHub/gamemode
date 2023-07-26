mp.events.add('congelarUsuarioLocal', (estado) => {
    switch (estado) {
        case 1:
            mp.players.local.freezePosition(true);
            break;

        case 2:
            mp.players.local.freezePosition(false);
            break;

        default:
            break;
    }
})