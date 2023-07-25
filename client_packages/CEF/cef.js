let cef = null;

function abrirCef(url) {
    if (cef) cef.destroy();
    mp.gui.chat.show(false);
    mp.gui.cursor.show(true, true);
    cef = mp.browsers.new(url);
}

exports.abrirCef = abrirCef;

function cerrarCef() {
    if (cef) {
        cef.destroy();
        cef = null;
    }

    mp.gui.cursor.visible = false;
	mp.game.ui.displayRadar(true);
	mp.gui.chat.show(true);
}

exports.cerrarCef = cerrarCef;

function injectCef(execute) {
	if(!cef) return;
	cef.execute(execute);
}
exports.injectCef = injectCef;

mp.events.add({
    "cerrarCef": () => {
        cerrarCef();
    },
})