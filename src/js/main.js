import Render from './render.js';
import Listeners from './listeners.js';
import Request from './request.js';
import Resize from './resize.js';
import GASection from './renderGA';
import config from './config';

export default class Main {
	constructor() {
        this.GASection = new GASection();
		this.render = new Render();
        this.request = new Request();
		this.listeners = new Listeners();
		this.resize = new Resize(this);
        this.newSearch = false;
	}

    chooseVideosCount() {
        if (window.innerWidth > 1250) {
            config.videosCount = 3;
        } else if (window.innerWidth > 930) {
            config.videosCount = 2;
        } else {
            config.videosCount = 1;
        }
    }

	addSearchListeners(main) {
		//--------------------------------------- event listener for 'Enter' key --------------------------------
        document.querySelector('#search').addEventListener('keypress', function(e) {
            if (e.keyCode === 13 && this.value) {
                document.title = this.value;
				Listeners.slidePos = [0];
				main.chooseVideosCount();
                if(main.newSearch){
                    let wrapper = document.querySelector('.wrapper');
                    let pages = document.querySelector('#pages');
                    while(wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);
                    while(pages.firstChild) pages.removeChild(pages.firstChild);
                }
                main.newSearch = true;
                main.render.addNewSlide(true, null, null);
                main.request.initialization(main);
                Listeners.currentPage = 0;
			}
            else if(e.keyCode === 13 && !this.value){
                showInfo('please enter search keyword');
            }
		});
        //------------------------------------- event listener for SEARCH button -------------------------------
        document.querySelector('.btn-search').addEventListener('click', function(e) {
                if(document.querySelector('#search').value){
                    document.title = document.querySelector('#search').value;
                    Listeners.slidePos = [0];
                    main.chooseVideosCount();
                    if(main.newSearch){
                        let wrapper = document.querySelector('.wrapper');
                        let pages = document.querySelector('#pages');
                        while(wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);
                        while(pages.firstChild) pages.removeChild(pages.firstChild);
                    }
                    main.newSearch = true;
                    main.render.addNewSlide(true, null, null);
                    main.request.initialization(main);
                    Listeners.currentPage = 0;
                } else showInfo('please enter search keyword');
        });

	}
}
