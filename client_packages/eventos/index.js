mp.events.add('congelarUsuarioLocal', () => {
    mp.players.local.freezePosition(false);
})