import Request from './request.js';
import Listeners from './listeners.js';
import config from './config';

export default class Render{
    constructor() {
        this.request = new Request();
    }

    renderPage() {
        
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
        
        let nick = document.createElement('h3');
        let email = document.createElement('p');

        let hr = document.createElement('hr');
        let logoDiv = document.createElement('div');
        let img = document.createElement('img');
        let a = document.createElement('a');
        let input = document.createElement('input');;
        let searchSection = document.createElement('section');
        //let label = document.createElement('label');
        let searchButton = document.createElement('button');

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
        hider.appendChild(avatar);
        hider.appendChild(nick);
        hider.appendChild(email);
        hider.style.display = 'none';
        section.appendChild(hider);

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
        document.body.appendChild(section);
        document.body.appendChild(hr);
        // search section
        searchSection.classList.add('search-section');
        
        //i.classList.add('fa', 'fa-search');
        //label.appendChild(i);
        searchButton.classList.add('btn');
        searchButton.classList.add('btn-search');
        searchButton.innerHTML = 'SEARCH';
        // input.setAttribute('type', 'text');
        input.setAttribute('id', 'search');
        input.setAttribute('autofocus', '');
        // create logo
        img.classList.add('logo-image');
        img.setAttribute('src', './img/logo.png');
        logoDiv.classList.add('logo');
        a.setAttribute('href', 'https://www.youtube.com/');
        a.appendChild(img);
        logoDiv.appendChild(a);
        searchSection.appendChild(logoDiv);
        searchSection.appendChild(searchButton);// here label
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
        let a = document.createElement('a');
        // let iframe = document.createElement('iframe');
        let preview = document.createElement('img');

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
        divComponent.appendChild(preview);
        divComponent.appendChild(i);

        // subcribe "button"
        subscr.classList.add('g-ytsubscribe', 'btn-subscr');
        subscr.setAttribute('data-layout', 'full');
        subscr.setAttribute('data-count', 'default');
        subscr.setAttribute('data-theme', 'dark');
        divComponent.appendChild(subscr);

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
        divComponent.appendChild(ul);

        // description text
        pDescription.setAttribute('id', 'description');
        divComponent.appendChild(pDescription);

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
                let left = parse/*Int(slides[slides.length-1].style.left)*/ + window.innerWidth;// calculate position to new slide
                if(nextToken){
                    if(fromSlide){
                        left = window.innerWidth * 2;
                        fromSlide =false;
                    }else left = window.innerWidth;
                    nextToken = false;
                }     
                slides[slides.length - 1].style.left = left + 'px'; // apply position to new slide
            } 
            Listeners.slidePos.push(parseInt(slides[slides.length - 1].style.left));// add new slide pos to all positions
			first = false;
		}
	}
}
