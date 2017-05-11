
import Main from './main';
import config from './config';

window.showInfo = function (message){
    document.querySelector('#auth-status').style.opacity = '1';
    document.querySelector('#auth-status').innerHTML = message;
    setTimeout(decreaseOpacity, 5000);
}

function decreaseOpacity(){
    document.querySelector('#auth-status').style.opacity = '0';
}


let main = new Main();
main.render.renderPage();
main.listeners.addListeners(main.render, main.request, main);
main.addSearchListeners(main);
main.GASection.requestOAuth();
