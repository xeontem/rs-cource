import Main from './main';
import config from './config';


config.checkMobile();
config.chooseVideosCount();
let main = new Main();
main.render.renderPage();
main.listeners.addListeners(main);
main.GASection.requestOAuth();
