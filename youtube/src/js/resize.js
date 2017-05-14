import config from './config';

export default class Resize {
	constructor() {
		window.onresize = function() {
            document.body.style.height = `${window.innerHeight}px`;
            if(!config.mobile) {
                config.showInfo('Desktop version');
			    if (window.innerWidth > 1250) {
			    	if (config.videosCount !== 3) {
                        if(document.querySelector('.wrapper').innerHTML) Resize.rerendering(3, config.videosCount);
						config.videosCount = 3;
			    	}
                    document.querySelector('.logo').style.display = 'block';
				} else if (window.innerWidth > 930) {
					if (config.videosCount !== 2) {
                        if(document.querySelector('.wrapper').innerHTML) Resize.rerendering(2, config.videosCount);
						config.videosCount = 2;
					}
                    document.querySelector('.logo').style.display = 'block';
				} else if (window.innerWidth < 930){
					if (config.videosCount !== 1) {
                        if(document.querySelector('.wrapper').innerHTML) Resize.rerendering(1, config.videosCount);
						config.videosCount = 1;
					}
                    document.querySelector('.logo').style.display = 'none';
				}
            }    
			Resize.changeSlidesPosition();
		};
	}

	static changeSlidesPosition() {
		let width = window.innerWidth;
		let leftPos = (-1) * config.currentPage * width;
		let slides = document.querySelectorAll('.slide');
		config.slidePos = [];

		for (let i = 0; i < slides.length; i++) {
			config.slidePos.push(leftPos);
			slides[i].style.left = leftPos + 'px';
			leftPos += width;
		}
	}

	static rerendering(count, previousCount) {
        config.showInfo('Resizing...');

		let components = Array.from(document.querySelectorAll('.component')).reverse();
		let docFragment = document.createDocumentFragment();
		let offset = 0;
		let length = Math.round(components.length/count); 

		// components.reverse();
		
        let wrapper = document.querySelector('.wrapper');
        let pages = document.querySelector('#pages');
        while(wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);// because https://jsperf.com/innerhtml-vs-removechild
        while(pages.firstChild) pages.removeChild(pages.firstChild);// because https://jsperf.com/innerhtml-vs-removechild
		
        config.slidePos = [];
        // console.log(config.pageNumber);
        config.pageNumber = Math.round(config.countRequests * 15/count); // -1
        console.log(`After resize config.pageNumber: ${config.pageNumber}`);

        for (var i = 0; i < length; i++) {
            let sectionSlide = document.createElement('section'); 
            let page = document.createElement('li');

            // config.pageNumber++;
            console.log(config.pageNumber);
            sectionSlide.classList.add('slide');
            sectionSlide.setAttribute('style', 'left:' + offset + 'px');
            config.slidePos.push(offset);
            
            for (let j = 0; j < count; j++) {
                if(components.length) sectionSlide.appendChild(components.pop());
            }
            
            offset += window.innerWidth;
            docFragment.appendChild(sectionSlide);
            page.innerHTML = i + 1;
            document.querySelector('#pages').appendChild(page);
        }

    	document.querySelector('.wrapper').appendChild(docFragment);
    	
        let targetIndex = Math.floor(previousCount * config.currentPage / count);
    	document.querySelectorAll('#pages li')[targetIndex].click();
    	if (!targetIndex) {
    		setTimeout(function(){ 
    			document.querySelectorAll('#pages li')[targetIndex].click(); 
    		}, 0);
    		document.querySelector('#pages li').className = 'active';
    	}
	}
}
