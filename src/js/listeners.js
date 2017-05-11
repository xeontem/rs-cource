import config from './config';

export default class Slide {
	constructor() {
		Slide.slidePos = [0];
		Slide.currentPage = 0;
		this.addNew = false;
	}
	
    addListenersAfterResponse() {
        //play button listener
        document.querySelector('.play').addEventListener('mousedown', e => {
            this.slideStart(e);
            e.preventDefault();
        });
    }

	addListeners(render, request, main) {


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
			this.slideMove(e, false, render, request);
            e.preventDefault();
		});
		document.querySelector('.videos').addEventListener('touchmove', e => {
			this.slideMove(e, true, render, request);
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
			//let isFirstClicked = (index === 0) && (e.target === document.querySelector('#pages li'));
			//if (index !== 0 || isFirstClicked) {
				let allSlides = document.querySelectorAll('.slide');
				let currentLeft = parseInt(allSlides[index].style.left);
				if (currentLeft !== 0) {
					this.activatePage(index)
					for (let i = 0; i < allSlides.length; i++) {
						let offset = parseInt(allSlides[i].style.left) - currentLeft;
						Slide.slidePos[i] = offset;
						allSlides[i].style.left = offset + 'px';
					}
				} 
				if (index === allSlides.length - 1) {
					render.addNewSlide(null, true, null);
                    request.newRequest();
				}
			//}
		});

	}

	slideStart(e, isTouchEvent) {
		if (this.isTouch) {
			let allSlides = document.querySelectorAll('.slide');
			for (let i = 0; i < allSlides.length; i++) {
				allSlides[i].style.left = Slide.slidePos[i] + 'px';
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
        Slide.slidePos = [];
        for (let i = 0; i < allSlides.length; i++) {
            Slide.slidePos.push(parseInt(allSlides[i].style.left));
        }
	}

	slideMove(e, isTouchEvent, render, request) {
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
                if (x > window.innerWidth / 3) {
                    this.isTouch = false;
                    let isMoveFirstSlide = false;
                    if (parseInt(allSlides[i].style.left) > Slide.slidePos[i]) {
                        isMoveFirstSlide = true;
                        offset = Slide.slidePos[i] + window.innerWidth;
                    } else {
                        offset = Slide.slidePos[i] - window.innerWidth;
                    }
                    if (isMoveFirstSlide && Slide.slidePos[0] === 0) {
                        offset -= window.innerWidth;
                    }
                }
                allSlides[i].style.left = offset + 'px';
                if (parseInt(allSlides[i].style.left) === 0) {
                    this.activatePage(i);
                }
            }
			if (this.addNew) {

				render.addNewSlide(null, true, true);
                request.newRequest();
				this.addNew = false;
                //-------------------------------- animation --------------------------------
                let index = this.getTargetIndex(e);
                //Slide.animateComponent(index);// add animation
                //---------------------------------------------------------------------------
			}
			this.addNewCheck();
		}
	}

	slideEnd(e) {
		this.addNewCheck();
		if (this.isTouch) {
			let allSlides = document.querySelectorAll('.slide');
			for (let i = 0; i < allSlides.length; i++) {
				allSlides[i].style.left = Slide.slidePos[i] + 'px';
			}
		}
		this.isTouch = false;	

	}
	
	addNewCheck() {
		if (Slide.slidePos[Slide.slidePos.length - 2] === 0 && this.next) {
			this.addNew = true;
		}
	}

	activatePage(ind) {
		let activeLi = document.querySelectorAll('.active');
		if (activeLi) {
			for (let i = 0; i < activeLi.length; i++) {
				activeLi[i].classList.remove('active');
			}
		}
		document.querySelectorAll('#pages li')[ind].className = 'active';
		Slide.currentPage = ind;
	}

	getTargetIndex(e){
		let target = e.target;
		return Array.prototype.indexOf.call(target.parentNode.childNodes,target);
	}

    static animateComponent(index){
        let componentList = document.querySelectorAll('.component');
        for(let i = 2; i >= 0; i--){
            Slide.addClass(componentList[index+i], 'animate');
            setTimeout(Slide.removeClass.bind(this, componentList[index+i], 'animate'), 1000);
        }
    }

    static addClass(node, cls){
        node.classList.add(cls);
    }

    static removeClass(node, cls){
        node.classList.remove(cls);
    }
}
