import Request from './request.js';
import Listeners from './listeners.js';
import config from './config';

export default class Render{
    constructor() {
        this.request = new Request();
    }

    renderPage() {
        document.body.style.height = `${window.innerHeight}px`;
        // let subscr = document.createElement('div');
        // subscr.classList.add('g-ytsubscribe');
        // subscr.classList.add('btn-subscr');
        // subscr.classList.add('test');
        // subscr.setAttribute('data-layout', 'default');
        // subscr.setAttribute('data-count', 'default');
        // subscr.setAttribute('data-channel', 'acdcVEVO');// UCE36kCXex3WfYQQNMu4Si9A
        // document.body.appendChild(subscr);

        let section = document.createElement('section');
        let hider = document.createElement('div');
        let avatar = document.createElement('img');
        let button = document.createElement('button');
        let statusDiv = document.createElement('div');
        let auth = document.createElement('div');
        let authSection = document.createElement('section');
        let p = document.createElement('p');

        let nick = document.createElement('h3');
        let email = document.createElement('p');

        let hr = document.createElement('hr');
        let logoDiv;
        if(!config.mobile) { logoDiv = document.createElement('div'); }
        let img = document.createElement('img');
        let a = document.createElement('a');
        let input = document.createElement('input');;
        let searchSection = document.createElement('section');
        //let label = document.createElement('label');
        let searchButton;
        if(!config.mobile) { searchButton = document.createElement('button') };

        let i = document.createElement('i');
        
        let videosSection = document.createElement('section');
        let divWrapper = document.createElement('div');
        // let notFound = document.createElement('div');
        let sectionPaging = document.createElement('section');
        let ul = document.createElement('ul');

        //auth section
        section.classList.add('auth-section');
        avatar.classList.add('avatar');
        nick.classList.add('nickname');
        email.classList.add('email');
        auth.classList.add('auth');
        auth.innerHTML = 'AUTHENTICATION';
        hider.appendChild(avatar);
        hider.appendChild(nick);
        hider.appendChild(email);
        hider.style.display = 'none';
        section.appendChild(hider);
        // auth.appendChild(p);
        

        //sign in button    
        button.classList.add('btn', 'btn-login');
        button.setAttribute('id', 'sign-in-or-out-button');
        button.innerHTML = 'Sign In';
        section.appendChild(button);
        // revoke button
        button = document.createElement('button');
        button.classList.add('btn');
        button.setAttribute('id', 'revoke-access-button');
        button.innerHTML = 'Revoke access';
        section.appendChild(button);
        // status div
        statusDiv.setAttribute('id', 'auth-status');
        section.appendChild(statusDiv);
        authSection.classList.add('auth-main-container');
        authSection.appendChild(section);
        authSection.appendChild(hr);
        authSection.appendChild(auth);
        document.body.appendChild(authSection);

        // search section
        searchSection.classList.add('search-section');
        
        //i.classList.add('fa', 'fa-search');
        //label.appendChild(i);
        if(!config.mobile) { searchButton.classList.add('btn'); }
        if(!config.mobile) { searchButton.classList.add('btn-search'); }
        if(!config.mobile) { searchButton.innerHTML = 'SEARCH'; }
        // input.setAttribute('type', 'text');
        input.setAttribute('id', 'search');
        //input.setAttribute('autofocus', '');
        // create logo
        img.classList.add('logo-image');
        img.setAttribute('src', './img/logo.png');
        if(!config.mobile) { logoDiv.classList.add('logo'); }
        a.setAttribute('href', 'https://www.youtube.com/');
        a.appendChild(img);
        if(!config.mobile) { logoDiv.appendChild(a); }
        if(!config.mobile) {searchSection.appendChild(logoDiv); }
        if(!config.mobile) { searchSection.appendChild(searchButton); }// here label
        searchSection.appendChild(input);
        document.body.appendChild(searchSection);


        videosSection.classList.add('videos');
        divWrapper.classList.add('wrapper');
        videosSection.appendChild(divWrapper);
        document.body.appendChild(videosSection);

        sectionPaging.classList.add('paging');
        ul.setAttribute('id', 'pages');
        sectionPaging.appendChild(ul);
        document.body.appendChild(sectionPaging);

        // notFound.classList.add('notFound');
        // notFound.innerHTML = 'Search result is not found!';
        // notFound.style.display = 'none';
        // document.body.appendChild(notFound);
    }

    renderSlide(index, main) {
        let sectionSlide = document.createElement('section')
        let divComponent = document.createElement('div');
        let componentHeader = document.createElement('div');
        let previewPlaceholder = document.createElement('div');

        let infoContainer = document.createElement('div');
        // let overSubscr = document.createElement('button');

        let a = document.createElement('a');
        // let iframe = document.createElement('iframe');
        let preview = document.createElement('img');
        
        // let subscr = document.createElement('button');
        
        let subscr = document.createElement('div');
        
        let ul = document.createElement('ul');
        let li = document.createElement('li');
        let p = document.createElement('p');
        let i = document.createElement('i');
        let pDescription = document.createElement('p');
        let page = document.createElement('li');

        sectionSlide.classList.add('slide');
        sectionSlide.style.left = '0px';//default position

        divComponent.classList.add('component');

        //name of video on top of slide
        a.setAttribute('id', 'title');
        a.classList.add('title');
        componentHeader.classList.add('componentHeader');
        componentHeader.appendChild(a);
        divComponent.appendChild(componentHeader);

        // iframe.classList.add('video-frame');
        // iframe.setAttribute('allowfullscreen','');
        preview.classList.add('preview');
        i.classList.add('play', 'fa', 'fa-youtube-play');
        previewPlaceholder.classList.add('placeholder');
        previewPlaceholder.appendChild(preview);
        previewPlaceholder.appendChild(i);
        divComponent.appendChild(previewPlaceholder);

        // subcribe "button"
            // subscr.classList.add('btn');
            // subscr.classList.add('btn-subscr');
            // subscr.innerHTML = 'SUBSCRIBE';
            // infoContainer.appendChild(subscr);

        infoContainer.classList.add('info-container');

        // overSubscr.classList.add('over-subscribe');
        subscr.innerHTML = 'SUBSCRIBE';
        // subscr.classList.add('g-ytsubscribe'/*, 'btn-subscr'*/);
        // subscr.setAttribute('data-layout', 'full');
        // subscr.setAttribute('data-count', 'default');
        // subscr.setAttribute('data-theme', 'dark');
        infoContainer.appendChild(subscr);
        // infoContainer.appendChild(overSubscr);

        // info below iframe
        ul.setAttribute('id', 'info');
        i = document.createElement('i');
        i.classList.add('fa', 'fa-user');
        p.setAttribute('id', 'author');
        li.appendChild(i);
        li.appendChild(p);
        ul.appendChild(li);

        li = document.createElement('li');
        i = document.createElement('i');
        i.classList.add('fa', 'fa-calendar');
        p = document.createElement('p');
        p.setAttribute('id', 'date');
        li.appendChild(i);
        li.appendChild(p);
        ul.appendChild(li);

        li = document.createElement('li');
        i = document.createElement('i');
        i.classList.add('fa', 'fa-eye');
        p = document.createElement('p');
        p.setAttribute('id', 'viewers');
        li.appendChild(i);
        li.appendChild(p);
        ul.appendChild(li);
        infoContainer.appendChild(ul);

        // description text
        pDescription.setAttribute('id', 'description');
        infoContainer.appendChild(pDescription);
        divComponent.appendChild(infoContainer);

        for (let i = 0; i < config.videosCount; i++) {
    	   	sectionSlide.appendChild(divComponent.cloneNode(true));
        }

        document.querySelector('.wrapper').appendChild(sectionSlide);
        page.innerHTML = index;
        document.querySelector('#pages').appendChild(page);
    }

	addNewSlide(first, nextToken, fromSlide) {
        let count = Math.round(15 / config.videosCount);
        for(let i = 0; i < count; i++){    
            let slides = document.querySelectorAll('.slide');
            this.renderSlide(slides.length+1); // render new slide
            slides = document.querySelectorAll('.slide');
			if(first) document.querySelector('#pages li').className = 'active';
            else {
                let parse = parseInt(slides[slides.length-2].style.left);
                let left = parse + window.innerWidth;
                //if(config.mobile) left = parse  + window.screen.availWidth;// calculate position to new slide
                //else left = parse + window.innerWidth;// calculate position to new slide
                if(nextToken){
                    if(fromSlide){
                        left = window.innerWidth * 2;
                        fromSlide =false;
                    }else left = window.innerWidth;
                    nextToken = false;
                }     
                slides[slides.length - 1].style.left = left + 'px'; // apply position to new slide
            } 
            config.slidePos.push(parseInt(slides[slides.length - 1].style.left));// add new slide pos to all positions
			first = false;
		}
	}
}
