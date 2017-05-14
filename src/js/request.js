import config from './config';
import { addListenersAfterResponse } from './listeners.js';

export default class Request {

    initialization() {
        this.searchText = document.querySelector('#search').value;
        document.querySelector('#search').value = '';
        document.querySelector('#search').setAttribute('placeholder', this.searchText);
        const url = `https://www.googleapis.com/youtube/v3/search?key=${config.apiKey}&type=video&part=snippet&maxResults=${config.requestCount}&q=${this.searchText}`;
        
        Request.openXHRRequest(url).then(
            response => Request.onSearchResponse(response),
            error => alert(`Rejected: ${error}`)
        );
    }

    static openXHRRequest(url) {

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);

            xhr.onload = function() {
                if (this.status >= 200 && this.status <= 300) resolve(this.response);
                else {
                    let error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };

            xhr.onerror = () => reject(new Error("Network Error"));

            xhr.send();
        });
    }


    static onSearchResponse(response) {
		config.countRequests++;
        response = JSON.parse(response);
        // if(!config.isRemoved){
        //     document.head.removeChild(document.querySelector('#api'));
        //     config.isRemoved = true;
        // }
            
        // if search result not found show nothing
        if (!response.items){
            // Request.searchResult = false;
            let wrapper = document.querySelector('.wrapper');
            let pages = document.querySelector('#pages');
            while(wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);// because https://jsperf.com/innerhtml-vs-removechild
            while(pages.firstChild) pages.removeChild(pages.firstChild);// because https://jsperf.com/innerhtml-vs-removechild
            config.showInfo(`Response failed. Found nothing`);
            return;
        }
        
        //------------------------------------------- show info about response ----------------------------------
            config.showInfo(`Response success. Found about ${response.pageInfo.totalResults} videos`);
        //-------------------------------------------------------------------------------------------------------

        let videoIDs = '';
        for (let i = 0; i < response.items.length; i++) {
            console.log(`config.videosCount: ${config.videosCount} | config.pageNumber: ${config.pageNumber}`);
            let index = config.videosCount * config.pageNumber + i;
            let videoID = response.items[i].id.videoId;
            let switcher = 1;
            i !== response.items.length - 1 ? videoIDs += `${videoID},` : videoIDs += videoID;
            
            document.querySelectorAll('#title')[index].innerHTML = response.items[i].snippet.title;
            document.querySelectorAll('#title')[index].setAttribute('href', 'http://www.youtube.com/watch?v=' + videoID);
            document.querySelectorAll('#description')[index].innerHTML = response.items[i].snippet.description;
            document.querySelectorAll('#date')[index].innerHTML = response.items[i].snippet.publishedAt.slice(0, 10);
            document.querySelectorAll('#author')[index].innerHTML = response.items[i].snippet.channelTitle;
            document.querySelectorAll('.preview')[index].setAttribute('src', response.items[i].snippet.thumbnails.high.url); 
            document.querySelectorAll('.info-container div')[index].setAttribute('data-channel', response.items[i].snippet.channelTitle);
            addListenersAfterResponse(response, index, videoID);
            
            // if(config.isRemoved){
            //     let script = document.createElement('script');
            //     script.setAttribute('id', 'api');
            //     script.setAttribute('src', 'https://apis.google.com/js/platform.js')
            //     document.head.appendChild(script);
            //     config.isRemoved = false;
            // }

            index++;
        }

        const url = `https://www.googleapis.com/youtube/v3/videos?key=${config.apiKey}&id=${videoIDs}&part=snippet,statistics`;
        Request.openXHRRequest(url).then(
            (response) => {
                response = JSON.parse(response);
                for (let i = 0; i < response.items.length; i++) {
                    document.querySelectorAll('#viewers')[config.videosCount * config.pageNumber+i].innerHTML = response.items[i].statistics.viewCount;
                }
            },
            error => alert(`Rejected: Can't load views`)
        );// load viewscount	
		this.nextPageToken = response.nextPageToken;
	}

	newRequest() {
		config.pageNumber += Math.round(15/config.videosCount);
		const url = `https://www.googleapis.com/youtube/v3/search?key=${config.apiKey}&type=video&part=snippet&maxResults=${config.requestCount}&pageToken=${Request.nextPageToken}&q=${this.searchText}`;
        Request.openXHRRequest(url).then(
            (response) => Request.onSearchResponse(response),
            error => alert(`Rejected: ${error}`)
        );
	}

    
    // static addListenerPlay(response, index, videoID) {// in progress
    //     document.querySelectorAll('.play')[index].addEventListener('click', e => {
            
    //         let component = document.querySelectorAll('.component')[index];
    //         let placeholder = component.children[1];
    //         let iframe = document.createElement('iframe');
    //         iframe.setAttribute('width', '350px');
    //         iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoID + '?autoplay=1');
    //         iframe.setAttribute('allowfullscreen', '');
    //         placeholder.parentNode.insertBefore(iframe, placeholder.nextSibling);//appendChild(iframe);
    //         placeholder.style.display = 'none';
        
    //     });
    // }
}
