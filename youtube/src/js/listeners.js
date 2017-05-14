import config from './config';

export default class Listeners {

    addListeners(main) {
        //--------------------------------------- event listener for 'Enter' key --------------------------------
        document.querySelector('#search').addEventListener('keypress', function(e) {
            if (e.keyCode === 13 && this.value) {
                document.title = this.value.toUpperCase();
                config.slidePos = [0];
                if(main.newSearch){
                    config.reset();
                    let wrapper = document.querySelector('.wrapper');
                    let pages = document.querySelector('#pages');
                    while(wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);
                    while(pages.firstChild) pages.removeChild(pages.firstChild);
                }
                main.newSearch = true;
                main.render.addNewSlide(true, null, null);
                main.request.initialization(main);
                config.currentPage = 0;
            }
            else if(e.keyCode === 13 && !this.value){
                config.showInfo('please enter search keyword');
            }
        });
        //------------------------------------- event listener for SEARCH button -------------------------------
        document.querySelector('.btn-search').addEventListener('click', function(e) {
                if(document.querySelector('#search').value){
                    document.title = document.querySelector('#search').value.toUpperCase();
                    config.slidePos = [0];
                    if(main.newSearch){
                        config.reset();
                        let wrapper = document.querySelector('.wrapper');
                        let pages = document.querySelector('#pages');
                        while(wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);
                        while(pages.firstChild) pages.removeChild(pages.firstChild);
                    }
                    main.newSearch = true;
                    main.render.addNewSlide(true, null, null);
                    main.request.initialization(main);
                    config.currentPage = 0;
                } else config.showInfo('please enter search keyword');
        });

        //authorization button listener
        let clicked = false;
        document.querySelector('.auth-main-container').addEventListener('touchstart', e => {
            if(!clicked) { 
                document.querySelector('.auth-main-container').style.marginTop = '0px';
                clicked =true;
            } else { 
                document.querySelector('.auth-main-container').style.marginTop = '-104px';
                clicked =false;
            }    
        });
        // subscribe listeners


		//slides listeners
		document.querySelector('.videos').addEventListener('mousedown', e => {
            this.slideStart(e);
		    e.preventDefault();
        });
        document.querySelector('.videos').addEventListener('touchstart', e => {
            this.slideStart(e, true);
            e.preventDefault();
        });

		
		document.querySelector('.videos').addEventListener('mousemove', e => {
			this.slideMove(e, false, main.render, main.request);
            e.preventDefault();
		});
		document.querySelector('.videos').addEventListener('touchmove', e => {
			this.slideMove(e, true, main.render, main.request);
			e.preventDefault();
		});

		document.querySelector('.videos').addEventListener('mouseup', e => {
            this.slideEnd(e);
            e.preventDefault();
		});
		document.querySelector('.videos').addEventListener('touchend', e => {
			this.slideEnd(e);
			e.preventDefault();
		});

		// paging listeners
		document.querySelector('#pages').addEventListener('click', e => {
			    let index = this.getTargetIndex(e);
				let allSlides = document.querySelectorAll('.slide');
				let currentLeft = parseInt(allSlides[index].style.left);
				if (currentLeft !== 0) {
					this.activatePage(index)
					for (let i = 0; i < allSlides.length; i++) {
						let offset = parseInt(allSlides[i].style.left) - currentLeft;
						config.slidePos[i] = offset;
						allSlides[i].style.left = offset + 'px';
					}
				} 
				if (index === allSlides.length - 1) {
					main.render.addNewSlide(null, true, null);
                    main.request.newRequest();
				}
			//}
		});

	}

	slideStart(e, isTouchEvent) {
		if (this.isTouch) {
			let allSlides = document.querySelectorAll('.slide');
			for (let i = 0; i < allSlides.length; i++) {
				allSlides[i].style.left = config.slidePos[i] + 'px';
			}
		}
        this.isTouch = true;
        if (isTouchEvent) {
            this.pointX = e.changedTouches[0].clientX;
        } else {
            this.pointX = e.pageX;
        }
        this.startX = this.pointX;
        let allSlides = document.querySelectorAll('.slide');
        config.slidePos = [];
        for (let i = 0; i < allSlides.length; i++) {
            config.slidePos.push(parseInt(allSlides[i].style.left));
        }
	}

	slideMove(e, isTouchEvent, render, request) {
        // alert(window.screen.availWidth);
        let scrollSize = window.innerWidth;
        if(config.mobile) scrollSize = window.screen.availWidth;
		if (isTouchEvent) {
			this.deltaX = (e.changedTouches[0].clientX - this.pointX);
			this.pointX = e.changedTouches[0].clientX;
		} else {
			this.deltaX = (e.pageX - this.pointX);
			this.pointX = e.pageX;
		}
		if (this.isTouch) {
            let allSlides = document.querySelectorAll('.slide');
            let offset;
            this.next = false;
            for (let i = 0; i < allSlides.length; i++) {
                offset = parseInt(allSlides[i].style.left) + this.deltaX;
                if (this.deltaX < 0) {
                    this.next = true
                }
                let x;
                if (isTouchEvent) {
                    x = Math.abs(e.changedTouches[0].clientX - this.startX);
                } else {
                    x = Math.abs(e.pageX - this.startX);
                }
                if (x > scrollSize / 3) {
                    this.isTouch = false;
                    let isMoveFirstSlide = false;
                    if (parseInt(allSlides[i].style.left) > config.slidePos[i]) {
                        isMoveFirstSlide = true;
                        offset = config.slidePos[i] + scrollSize;
                    } else {
                        offset = config.slidePos[i] - scrollSize;
                    }
                    if (isMoveFirstSlide && config.slidePos[0] === 0) {
                        offset -= scrollSize;
                    }
                }
                allSlides[i].style.left = offset + 'px';
                if (parseInt(allSlides[i].style.left) === 0) {
                    this.activatePage(i);
                }
            }
			if (config.slidePos[config.slidePos.length - 2] === 0) {
				render.addNewSlide(null, true, true);
                request.newRequest();
			}
		}
	}

	slideEnd(e) {
		if (this.isTouch) {
			let allSlides = document.querySelectorAll('.slide');
			for (let i = 0; i < allSlides.length; i++) {
				allSlides[i].style.left = config.slidePos[i] + 'px';
			}
		}
		this.isTouch = false;	

	}

	activatePage(index) {
		let activeLi = document.querySelectorAll('.active');
		if (activeLi) {
			for (let i = 0; i < activeLi.length; i++) {
				activeLi[i].classList.remove('active');
			}
		}
		document.querySelectorAll('#pages li')[index].className = 'active';
		config.currentPage = index;
	}

	getTargetIndex(e){
		let target = e.target;
		return Array.prototype.indexOf.call(target.parentNode.childNodes,target);
	}
}

export function addListenersAfterResponse(response, index, videoID) {
        //play button listener mouse
        document.querySelectorAll('.play')[index].addEventListener('click', e => {
            
            let component = document.querySelectorAll('.component')[index];
            let placeholder = component.children[1];
            let iframe = document.createElement('iframe');
            iframe.setAttribute('width', '350px');
            iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoID + '?autoplay=1');
            iframe.setAttribute('allowfullscreen', '');
            placeholder.parentNode.insertBefore(iframe, placeholder.nextSibling);//appendChild(iframe);
            placeholder.style.display = 'none';
        
        });

         //play button listener touch
        document.querySelectorAll('.play')[index].addEventListener('touchstart', e => {
            
            let component = document.querySelectorAll('.component')[index];
            let placeholder = component.children[1];
            let iframe = document.createElement('iframe');
            iframe.setAttribute('width', '350px');
            iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoID + '?autoplay=1');
            iframe.setAttribute('allowfullscreen', '');
            placeholder.parentNode.insertBefore(iframe, placeholder.nextSibling);//appendChild(iframe);
            placeholder.style.display = 'none';
        
        });
        // subscribe button listener mouse
        document.querySelectorAll('.info-container div')[index].addEventListener('click', e => {
            if(config.isAuthenticate) {
                document.head.removeChild(document.querySelector('#api'));    

                e.target.classList.add('g-ytsubscribe');
                e.target.setAttribute('data-layout', 'full');
                e.target.setAttribute('data-count', 'default');
                e.target.setAttribute('data-theme', 'dark');

                let script = document.createElement('script');
                script.setAttribute('id', 'api');
                script.setAttribute('src', 'https://apis.google.com/js/platform.js')
                document.head.appendChild(script);
            }
            else config.showInfo('Authenticate first please!');
        });
       
        // subscribe button listener touch
        document.querySelectorAll('.info-container div')[index].addEventListener('touchstart', e => {
            if(config.isAuthenticate) {
                document.head.removeChild(document.querySelector('#api'));    

                e.target.classList.add('g-ytsubscribe');
                e.target.setAttribute('data-layout', 'full');
                e.target.setAttribute('data-count', 'default');
                e.target.setAttribute('data-theme', 'dark');

                let script = document.createElement('script');
                script.setAttribute('id', 'api');
                script.setAttribute('src', 'https://apis.google.com/js/platform.js')
                document.head.appendChild(script);
            }
            else config.showInfo('Authenticate first please!');
        });
    }
