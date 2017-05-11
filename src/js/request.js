import config from './config';


export default class Request {
    constructor() {
        Request.apiKey = 'AIzaSyA17KYHw-TfsiBy3TdT8hThejNcLjdNnOo';
		this.counter = 1;
		this.isRemoved = false;
		Request.pageNumber = 0;

    }

    

    initialization() {this.searchText = document.querySelector('#search').value;
        document.querySelector('#search').value = '';
        document.querySelector('#search').setAttribute('placeholder', this.searchText);
        const url = 'https://www.googleapis.com/youtube/v3/search?key=' + Request.apiKey + '&type=video&part=snippet&maxResults=' + 15/*videosCount*/ + '&q=' + this.searchText;
        
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
        // let index = 0;
		let videoIDs = '';
        // if search result not found show nothing
            response = JSON.parse(response);
            // if(!Request.isRemoved){
            //     document.head.removeChild(document.querySelector('#api'));
            //     Request.isRemoved = true;
            // }
            
            if (response.items.length !== 0) {
                // Request.searchResult = true;
            } else {
                // Request.searchResult = false;
                let wrapper = document.querySelector('.wrapper');
                let pages = document.querySelector('#pages');
                while(wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);
                while(pages.firstChild) pages.removeChild(pages.firstChild);
                showInfo(`Response failed. Found nothing`);
                return;
            }
        
        //------------------------------------------- show info about response ----------------------------------
            showInfo(`Response success. Found about ${response.pageInfo.totalResults} videos`);
            
        //-------------------------------------------------------------------------------------------------------


        for (let i = 0; i < response.items.length; i++) {
            let index = config.videosCount * Request.pageNumber + i;
            let videoID = response.items[i].id.videoId;
            let switcher = 1;
            i !== response.items.length - 1 ? videoIDs += `${videoID},` : videoIDs += videoID;
            // if (i !== response.items.length - 1) {
            //     videoIDs += ',';
            // }
            document.querySelectorAll('#title')[index].innerHTML = response.items[i].snippet.title;
            document.querySelectorAll('#title')[index].setAttribute('href', 'http://www.youtube.com/watch?v=' + videoID);
            document.querySelectorAll('#description')[index].innerHTML = response.items[i].snippet.description;
            document.querySelectorAll('#date')[index].innerHTML = response.items[i].snippet.publishedAt.slice(0, 10);
            document.querySelectorAll('#author')[index].innerHTML = response.items[i].snippet.channelTitle;
            document.querySelectorAll('.preview')[index].setAttribute('src', response.items[i].snippet.thumbnails.high.url); 
            Request.addListenerPlay(response, index, videoID);
            // document.querySelectorAll('.video-frame')[index].setAttribute('src', 'https://www.youtube.com/embed/' + videoID);  
            //document.querySelectorAll('.g-ytsubscribe')[index].setAttribute('data-channel', response.items[i].snippet.channelTitle);
            
            // if(Request.isRemoved){
            //     let script = document.createElement('script');
            //     script.setAttribute('id', 'api');
            //     script.setAttribute('src', 'https://apis.google.com/js/platform.js')
            //     document.head.appendChild(script);
            //     Request.isRemoved = false;
            // }  
            index++;
        }

		let url = 'https://www.googleapis.com/youtube/v3/videos?key=' + this.apiKey + '&id=' + videoIDs + '&part=snippet,statistics';
	    Request.openXHRRequest(url).then(
            (response) => {
                response = JSON.parse(response);
                for (let i = 0; i < response.items.length; i++) {
                    document.querySelectorAll('#viewers')[config.videosCount * this.pageNumber+i].innerHTML = response.items[i].statistics.viewCount;
                }
            },
            error => alert(`Rejected: Can't load views`)
        );// load viewscount	
		this.nextPageToken = response.nextPageToken;
	}

	newRequest() {
		Request.pageNumber += Math.round(15/config.videosCount);
		let url = 'https://www.googleapis.com/youtube/v3/search?key=' + Request.apiKey + '&type=video&part=snippet&maxResults=' + 15 + '&pageToken=' + Request.nextPageToken + '&q=' + this.searchText;
        Request.openXHRRequest(url).then(
            (response) => Request.onSearchResponse(response),
            error => alert(`Rejected: ${error}`)
        );
	}

    static addListenerPlay(response, index, videoID) {// in progress
        document.querySelectorAll('.play')[index].addEventListener('click', e => {
            // alert(`im button ${index}`);
            // document.querySelectorAll('.play')[index];
            var iframe = document.createElement('iframe');
            iframe.setAttribute('width', '350px');
            iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoID);
            iframe.setAttribute('allowfullscreen', '');
            document.querySelectorAll('.play')[index].parentNode.insertBefore(iframe, document.querySelectorAll('.play')[index].nextSibling);//appendChild(iframe);
            // div.parentNode.insertBefore(div2, div.nextSibling);
            document.querySelectorAll('.component')[index].removeChild(document.querySelectorAll('.play')[index]);
            document.querySelectorAll('.component')[index].removeChild(document.querySelectorAll('.preview')[index]);
        });
    }
}



// <iframe width="560" height="315" src="https://www.youtube.com/embed/UBfsS1EGyWc" frameborder="0" allowfullscreen></iframe>