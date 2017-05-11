import Request from './request';
import Render from './render';
import Listeners from './listeners';
import config from './config';

export default class Resize {
	constructor(Request) {
		// Resize.render = new Render();
		window.onresize = function() {
			if (document.querySelector('.wrapper').innerHTML !== '') {
			    let videosCount = config.videosCount;

			    if (window.innerWidth > 1250) {
			    	if (config.videosCount !== 3) {
						config.videosCount = 3;
						Resize.rerendering(3, videosCount);
			    	}
				} else if (window.innerWidth > 930) {
					if (config.videosCount !== 2) {
						config.videosCount = 2;
						Resize.rerendering(2, videosCount);
					}
				} else if (window.innerWidth < 930){
					if (config.videosCount !== 1) {
						config.videosCount = 1;
						Resize.rerendering(1, videosCount);
					}
				}

				Resize.changeSlidesPosition();
			}
		};
	}

	static changeSlidesPosition() {
		let width = window.innerWidth;
		let leftPos = (-1) * Listeners.currentPage * width;
		let slides = document.querySelectorAll('.slide');
		Listeners.slidePos = [];

		for (let i = 0; i < slides.length; i++) {
			Listeners.slidePos.push(leftPos);
			slides[i].style.left = leftPos + 'px';
			leftPos += width;
		}
	}

	static rerendering(count, previousCount) {
		let components = Array.from(document.querySelectorAll('.component'));
		let docFragment = document.createDocumentFragment();
		let offset = 0;
		let length = components.length/count; 

		components.reverse();
		document.querySelector('.wrapper').innerHTML = '';
		document.querySelector('#pages').innerHTML = ''; 
		Listeners.slidePos = [];
		Request.pageNumber = -1;

		for (var i = 0; i < Math.floor(length); i++) {
			let sectionSlide = document.createElement('section'); 
			let page = document.createElement('li');

			Request.pageNumber++;
			sectionSlide.className = 'slide';
	    	sectionSlide.setAttribute('style', 'left:' + offset + 'px');
	    	Listeners.slidePos.push(offset);
	    	for (let j = 0; j< count; j++) {
	    		if (components.length) {
		    		sectionSlide.appendChild(components[components.length - 1]);
		    		components.pop();
	    		}
	    	}
	    	offset += window.innerWidth;
	    	docFragment.appendChild(sectionSlide);
	    	
			page.innerHTML = i + 1;
	    	document.querySelector('#pages').appendChild(page);
		}

    	document.querySelector('.wrapper').appendChild(docFragment);

    	let targetIndex = Math.floor(previousCount * Listeners.currentPage / count);
    	document.querySelectorAll('#pages li')[targetIndex].click();
    	if (!targetIndex) {
    		setTimeout(function(){ 
    			document.querySelectorAll('#pages li')[targetIndex].click(); 
    		}, 0);
    		document.querySelector('#pages li').className = 'active';
    	}
	}
}
