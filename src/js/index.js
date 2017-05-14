import Main from './main';
import config from './config';

config.chooseVideosCount();
let main = new Main();
main.render.renderPage();
main.listeners.addListeners(main);
main.GASection.requestOAuth();
