'use strict';

var DEBUG = window.adbYtDebug || false;

var adbYtLog = function(msg) {
    if (console && DEBUG) {
        console.warn(msg);
    }
};

var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isChrome = !!window.chrome && !isOpera;
var player = document.querySelector('#player');

function removePageAd()
{
        var ads01 = document.getElementById("watch7-sidebar-ads");
		    if(ads01 && ads01.style.display !== 'none'){
				    ads01.style.display="none";
				    adbYtLog('removing watch7-sidebar-ads');
		    }
		    var ads02 = document.getElementById("watch-channel-brand-div");
		    if(ads02 && ads02.style.display !== 'none'){
				    ads02.style.display="none";
				    adbYtLog('removing watch-channel-brand-div');
		    }
		    var ads03 = document.getElementById("google_companion_ad_div");
		    if(ads03 && ads03.style.display !== 'none'){
			    	ads03.style.display="none";
            adbYtLog('removing google_companion_ad_div');
	    	}
}

function skipVideoAd() {

    if (document.getElementsByClassName('videoAdUi').length > 0) {
        adbYtLog('skiping video ad');
        document.getElementsByClassName('video-stream html5-main-video')[0].src = '';
    }
}

function hideOverlayAd() {

    var overlayAdContainer = document.getElementsByClassName('ad-container ad-container-single-media-element-annotations')[0];
    if (overlayAdContainer && overlayAdContainer.style.display !== 'none') {
        adbYtLog('hide overlay ad');
        overlayAdContainer.style.display = 'none';
    }
}

function clearAds() {
    removePageAd();
    skipVideoAd();
    hideOverlayAd();
}

function DOMSTlistener(e) {

    adbYtLog('DOM event listener triggered');

    if (e.target.innerHTML.length > 0) {
        clearAds();
    }
}

function init() {

    var videoAdContainer = document.getElementsByClassName('video-ads')[0];

    if (videoAdContainer) {

        adbYtLog('inited');
        player.removeEventListener('DOMSubtreeModified', init);
        videoAdContainer.addEventListener('DOMSubtreeModified', DOMSTlistener);
    }
}


if (/https?:\/\/(\w*.)?youtube.com/i.test(window.location.href.toLowerCase())) {

    if (isChrome) {

        player.addEventListener('DOMSubtreeModified', init);
    } else {
        clearAds();
    }
}
