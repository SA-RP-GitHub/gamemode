mp.gui.chat.show(false); // Desabilitamos el chat default de Rage Multiplayer.
let chatbox = mp.browsers.new('package://CEF/chat/index.html');
chatbox.markAsChat();

require('./CEF/auth/main');
require('./CEF/selector/main')
require('./CEF/cef');

require('./eventos/index')