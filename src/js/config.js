export default {
    countRequests: -1,
    isAuthenticate: false,
    apiKey: 'AIzaSyA17KYHw-TfsiBy3TdT8hThejNcLjdNnOo',
	videoCount: 1,
    requestCount: 15,
    pageNumber: 0,
    isRemoved: false,
    slidePos: [0],
    currentPage: 0,
    reset: function(){
        this.videoCount = 1;
        this.pageNumber = 0;
        this.isRemoved = false;
    },
    showInfo: function (message){
        document.querySelector('#auth-status').style.opacity = '1';
        document.querySelector('#auth-status').innerHTML = message;
        setTimeout(this.decreaseOpacity, 5000);
    },
    decreaseOpacity: function(){
        document.querySelector('#auth-status').style.opacity = '0';
    },
    chooseVideosCount: function() {
        // alert(navigator.userAgent);
        if(!navigator.userAgent.match(/Windows/i)) {
            // this.showInfo('Mobile version');
            this.videosCount = 1;
        }
        else {
            // this.showInfo('Desktop version');
            if (window.innerWidth > 1250) {
                this.videosCount = 3;
            } else if (window.innerWidth > 930) {
                this.videosCount = 2;
            } else {
                this.videosCount = 1;
            }
        }    
    }
}
