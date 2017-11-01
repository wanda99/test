

// ******************************************************************************
// 미디어 컨트롤 : 초기 설정
function mediaInit() {		
	var wrap = document.querySelector('#wrap'),					
		rolebtn = document.querySelectorAll('.rolebtn'),										
		anibtn = document.querySelectorAll('.anibtn'),	
		scriptbtn = document.querySelectorAll('.scriptbtn'),	
		popReadThinkbtn = document.querySelectorAll('.popReadThinkbtn');	
			
	for(var i = 0; i < anibtn.length; i++) {		
		anibtn[i].addEventListener('mousedown', aniInit);
	}						
}


var rolePlaying = false;
var selectedChar, charIdx, roleIdx, aniIdx, dataPop;


// ******************************************************************************
var videoArray = [],
	soundFlag = false,
	vdoFlag = false,
	fullFlag = false,
	screenFlag = false;		
	stopFlag = false;

var duration, vdoWasPaused;
var blockSeek = false; 

// ******************************************************************************
function aniInit() {
    aniIdx = this.getAttribute('data-ani');
    dataPop = this.getAttribute('data-pop');

    var	anipopbox = document.querySelectorAll('.anipopbox');
	var	videoWrap = anipopbox[popani].getElementsByClassName('videoWrap')[0];
	videoWrap.style.visibility = 'visible';

	console.log(mediaInfo.vdofolder[aniIdx]);
	mediaVideoPlay(mediaInfo.vdofolder[aniIdx]);
}


// ******************************************************************************

function mediaVideoPlay(src) {				
	var wrap = document.querySelector('#wrap');		
		
	if(dataPop == 'role') {
		var	rolepopbox = document.querySelectorAll('.rolepopbox');												
		var	videoWrap = rolepopbox[poprole].getElementsByClassName('videoWrap')[0];	
	} else {
		var	anipopbox = document.querySelectorAll('.anipopbox');												
		var	videoWrap = anipopbox[popani].getElementsByClassName('videoWrap')[0];			
	}	

	var videoContainer = createElement('div', videoWrap, 'videoContainer');				
	var videoContainerHTML = document.querySelector('.videoContainer');				
	var splitSrc = src.split('/', '4');	
	
	
	// input[type=range] : 스타일 시트 생성
	var style = document.createElement('style');	
	document.head.appendChild(style);	
	
	// input[type=range] : 브라우저 체크 및 스타일 적용		
	if(navigator.userAgent.indexOf('Edge') >= 0) {		
		style.sheet.insertRule('#playBar { position:absolute; border-radius:12px; background:transparent; top:7px; left:20px; height:28px; }', 0);	
		style.sheet.insertRule('input[type=range] { appearance:none; width:97%; padding:0; }', 0);										
		style.sheet.insertRule('input[type=range]::-ms-track { background:transparent; border-color:transparent; border-width: 6px 0; color:transparent; width:100%; height:0px; border-radius:10px; }', 0);										
		style.sheet.insertRule('input[type=range]::-ms-fill-lower { background:#33BAFF; height:8px; border-radius:10px; }', 0);										
		style.sheet.insertRule('input[type=range]::-ms-fill-upper { background:#808080; height:8px; border-radius:10px; }', 0);										
		style.sheet.insertRule('input[type=range]::-ms-thumb { border:none; width:13px; height:12px; border-radius:50%; background:#E9E9E9; z-index:1000; }', 0);
	}
	else {
		var agent = navigator.userAgent.toLowerCase();
		if(navigator.userAgent.indexOf('Chrome') != -1 ) {			
			style.sheet.insertRule('#playBar { position:absolute; background:transparent; top:26px; left:221px; height:2px; background:#808080; }', 0);	
			style.sheet.insertRule('input[type=range] { -webkit-appearance:none; width:28%; padding:0; }', 0);										
			style.sheet.insertRule('input[type=range]:focus { outline:none; border:none; }', 0);										
			style.sheet.insertRule('input[type=range]::-webkit-slider-runnable-track { border-color:transparent; color:transparent; border:none; background:#808080; height:2px; border-radius:10px; }', 0);										
			style.sheet.insertRule('input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; border:none; width:13px; height:12px; border-radius:50%; background:#1cb6da; margin-top: -4px; z-index:1000; }', 0);										
			style.sheet.insertRule('.time { top:22px; }', 0);										
		} 	
		else if((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf('msie') != -1)) {			
			style.sheet.insertRule('#playBar { position:absolute; background:transparent; top:16px; left:211px; height:28px; }', 0);	
			style.sheet.insertRule('input[type=range] { appearance:none; width:28%; padding:0; }', 0);										
			style.sheet.insertRule('input[type=range]::-ms-track { background:transparent; border-color:transparent; border-width: 6px 0; color:transparent; width:100%; height:0px; border-radius:10px; }', 0);										
			style.sheet.insertRule('input[type=range]::-ms-fill-lower { background:#33BAFF; height:2px; border-radius:10px; }', 0);										
			style.sheet.insertRule('input[type=range]::-ms-fill-upper { background:#808080; height:2px; border-radius:10px; }', 0);										
			style.sheet.insertRule('input[type=range]::-ms-thumb { border:none; width:13px; height:12px; border-radius:50%; background:#1cb6da; z-index:1000; }', 0);										
			style.sheet.insertRule('.time { top:22px; }', 0);										
		}			
	}

	videoContainerHTML = '<video id="vdo" class="vdos"  controls="" webkit-playsinline="" playsinline=""><source src="'+ src +'.mp4" type="video/mp4"></source></video>';
	videoContainerHTML += '<img class="thumImg" src="./images/thum/'+ splitSrc[3] +'.png" />';	
	// videoContainerHTML += '<div class="controlsbg"></div>';
	videoContainerHTML += '<div class="videoControls">';
	videoContainerHTML += '<ul id="play" class="controls"></ul>';
	videoContainerHTML += '<ul id="stop" class="controls"></ul>';
	videoContainerHTML += '<ul class="bar"><input id="playBar" type="range" min="0" max="100" value="0" step="1" oninput="onSeek(this.value)" onchange="onSeekRelease(this.value)"/></ul>';
	videoContainerHTML += '<ul class="soundicon"></ul>';
	videoContainerHTML += '<ul class="time"><span id="curtime">00:00</span> / <span id="durtime">00:00</span></ul>';			
	videoContainerHTML += '<ul class="volume"><input id="playVolume" type="range" min="0" max="100" value="50" step="1" /></ul>';
	videoContainerHTML += '<ul class="fullsize"></ul>';	
	videoContainerHTML += '<ul class="cap"></ul>';	
	videoContainerHTML += '</div>';	
	videoContainer.innerHTML = videoContainerHTML;						
	

	videoContainer.classList.add('vdotop');			
	
	var vdo = document.querySelector('#vdo'),
		play = document.querySelector('#play'),		
		stop = document.querySelector('#stop'),				
		soundicon = document.querySelector('.soundicon'),
		playBar = document.querySelector('#playBar'),
		playVolume = document.querySelector('#playVolume'),			
		fullsize = document.querySelector('.fullsize'),			
		cap = document.querySelector('.cap'),
		captionObj = document.querySelector('.captionObj'),
		videoContainer = document.querySelector('.videoContainer'),					
		pageMovPlayBtn = createElement('div', videoContainer, 'pageMovPlayBtn');

	playBar.style.pointerEvents = 'none';	
	setTimeout(function () {
		playBar.style.pointerEvents = 'auto';	
	}, 1500);

	captionObj.classList.add('displayN');

		
	play.innerHTML = '<img alt="" src="./images/controls/vdo/btnPlay.png"/>';
	stop.innerHTML = '<img alt="" src="./images/controls/vdo/btnStop.png"/>';																	
	soundicon.innerHTML = '<img alt="" src="./images/controls/vdo/soundOn.png"/>';
	fullsize.innerHTML = '<img alt="" src="./images/controls/vdo/fullsizeBtn.png"/>';
	cap.innerHTML = '<img alt="" src="./images/controls/vdo/btnCaption.png"/>';
	vdo.controls = false;	


	// 화면 재생 버튼
	// addEvent(pageMovPlayBtn,'mousedown', function(e) {	  
	pageMovPlayBtn.addEventListener('mousedown', function(e) {	    						
		document.querySelector('.thumImg').style.display = 'none';							
		play.childNodes[0].src = './images/controls/vdo/btnPause.png';				
		pageMovPlayBtn.style.display = 'none';
		vdo.play();
		vdo.style.pointerEvents = 'none';
		screenFlag = true;				
	}, false);		


	// 재생 및 일시정지 버튼
	// addEvent(play,'mousedown', function(e) {	
	play.addEventListener('mousedown', function(e) {					
		stopFlag = false; 
		if(vdo.paused) {								
			document.querySelector('.thumImg').style.display = 'none';			
			play.childNodes[0].src = './images/controls/vdo/btnPause.png';				
			pageMovPlayBtn.style.display = 'none';
			vdo.play();	
			fullFlag = false;
			screenFlag = true;							
			vdo.controls = false;							
			if(QS('.fullPlay_videoWrap') != null) {
				QS('.fullPlay_videoWrap').parentNode.removeChild(QS('.fullPlay_videoWrap'));
			}				
		} else {				
			play.childNodes[0].src = './images/controls/vdo/btnPlay.png';
			vdo.pause();			
		}						
	}, false);


	// 자막 버튼 
	cap.addEventListener('mousedown', function(e) {	
		if(captionObj.classList.contains('displayN')){
			console.log(this)
			captionObj.classList.remove('displayN');
			captionObj.classList.add('displayB');
			cap.childNodes[0].src = './images/controls/vdo/btnCaptionOn.png';	
		}else{
			captionObj.classList.add('displayN');
			captionObj.classList.remove('displayB');
			cap.childNodes[0].src = './images/controls/vdo/btnCaption.png';	
		}
	}, false);



	// 정지 버튼
	// addEvent(stop,'mousedown', function(e) {	
	stop.addEventListener('mousedown', function(e) {					
		play.childNodes[0].src = './images/controls/vdo/btnPlay.png';						
		pageMovPlayBtn.style.display = 'block';
		playBar.value = 0;		
		vdo.currentTime = 0;
		vdo.pause();
		
		screenFlag = false;						
		vdo.controls = false;
		stopFlag = true;	

		document.querySelector('.thumImg').style.display = 'block';			
		// document.querySelector('.captionTxt').innerHTML = '';								
	}, false);					


	// 사운드 버튼
	soundicon.addEventListener('mousedown', function(e) {			
		if(!soundFlag == true) {
			soundFlag = true;
			soundicon.childNodes[0].src = './images/controls/vdo/soundOff.png';		
			vdo.volume = 0;
            vdo.muted = true;
		} else {
			soundFlag = false;
			soundicon.childNodes[0].src = './images/controls/vdo/soundOn.png';		
			vdo.volume = playVolume.value / 100;
            vdo.muted = false;
		}					
	}, false);		
	

	// 전체화면 버튼  		
	// fullsize.addEventListener('click', function () {					
	// 	var page_1 = document.querySelector('.page_1'),
	// 		pageContainer = document.querySelector('.pageContainer'),
	// 		videoWrap = document.querySelector('.videoWrap');															
		
	// 	if (vdo.requestFullscreen) {   
	// 		if (vdo.fullScreenElement) {
	// 			vdo.cancelFullScreen();       
	// 			vdo.controls = false;	
	// 		} else {
	// 			vdo.requestFullscreen();
	// 			vdo.controls = true;						
	// 		}
	// 	} else if (vdo.msRequestFullscreen) {
	// 		if (vdo.msFullscreenElement) {
	// 			vdo.msExitFullscreen();
	// 			vdo.controls = false;						
	// 		} else {
	// 			vdo.msRequestFullscreen();
	// 			vdo.controls = true;						
	// 		}
	// 	} else if (vdo.mozRequestFullScreen) {
	// 		if (vdo.mozFullScreenElement) {
	// 			vdo.mozCancelFullScreen();
	// 			vdo.controls = false;	
	// 		} else {
	// 			vdo.mozRequestFullScreen();
	// 			vdo.controls = true;	
	// 		}
	// 	} else if (vdo.webkitRequestFullscreen) {
	// 		if (vdo.webkitFullscreenElement) {
	// 			vdo.webkitCancelFullScreen();
	// 			vdo.controls = false;	
	// 		} else {
	// 			vdo.webkitRequestFullscreen();
	// 			vdo.controls = true;	
	// 		}
	// 	} else if (vdo.webkitEnterFullScreen) {				
	// 		vdo.webkitEnterFullScreen();
	// 		if(vdo.paused) {																		
	// 			play.childNodes[0].src = './images/controls/vdo/btnPlay.png';					
	// 		} else {				
	// 			play.childNodes[0].src = './images/controls/vdo/btnPause.png';									
	// 		}			
	// 	}					
		
	// }, false);			


	// addEvent(fullsize,'mousedown', function() {		
		
	// 	var page_1 = document.querySelector('.page_1'),
	// 		pageContainer = document.querySelector('.pageContainer'),
	// 		videoWrap = document.querySelector('.videoWrap');															
		
	// 	if (vdo.requestFullscreen) {   
	// 		if (vdo.fullScreenElement) {
	// 			vdo.cancelFullScreen();       
	// 			vdo.controls = false;	
	// 		} else {
	// 			vdo.requestFullscreen();
	// 			vdo.controls = true;						
	// 		}
	// 	} else if (vdo.webkitEnterFullScreen) {				
	// 		vdo.webkitEnterFullScreen();
	// 		if(vdo.paused) {																		
	// 			play.childNodes[0].src = './images/controls/vdo/btnPlay.png';					
	// 		} else {				
	// 			play.childNodes[0].src = './images/controls/vdo/btnPause.png';									
	// 		}			
	// 	}					
		
	// }, false);			
	

	// if (document.addEventListener) {
	//     document.addEventListener('fullscreenchange', fullscreenHandler, false);
	//     document.addEventListener('webkitfullscreenchange', fullscreenHandler, false);		    
	//     document.addEventListener('mozfullscreenchange', fullscreenHandler, false);	
	//     document.addEventListener('MSFullscreenChange', fullscreenHandler, false);	    		    
	// }			

	controlBar();	
	controlSliders();	
}



function fullscreenHandler() {	
	var vdo = document.querySelector('#vdo'),			
		play = document.querySelector('#play'),		
		stop = document.querySelector('#stop'),				
		playBar = document.querySelector('#playBar'),
		playVolume = document.querySelector('#playVolume'),			
		fullsize = document.querySelector('.fullsize'),			
		videoContainer = document.querySelector('.videoContainer');	

	if(navigator.userAgent.indexOf('Edge') >= 0) {		
		if (document.msFullscreenElement === false) {            	      
	      vdo.controls = false;	
	  	} else {	      
	     vdo.controls = true;	
			if(vdo.paused) {																		
				play.childNodes[0].src = './images/controls/vdo/btnPlay.png';					
			} else {				
				play.childNodes[0].src = './images/controls/vdo/btnPause.png';									
			}		
	  	}
	} 
	else {
		var agent = navigator.userAgent.toLowerCase();
		if(navigator.userAgent.indexOf('Chrome') != -1 ) {			
			if (document.webkitIsFullScreen === false) {            		      		      		      
		      vdo.controls = false;			      
		  	} else {		      
		      vdo.controls = true;	
				if(vdo.paused) {																		
					play.childNodes[0].src = './images/controls/vdo/btnPlay.png';					
				} else {				
					play.childNodes[0].src = './images/controls/vdo/btnPause.png';									
				}		   		      
		  	}
		} 	
		else if((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf('msie') != -1)) {			
			if (document.msFullscreenElement != null) {            		      
		      vdo.controls = true;	 	
				if(vdo.paused) {																		
					play.childNodes[0].src = './images/controls/vdo/btnPlay.png';					
				} else {				
					play.childNodes[0].src = './images/controls/vdo/btnPause.png';									
				}			      
		  	} else {		      
		      vdo.controls = false;		      
		  	}
		}			
	}		
}  
    


// ************************************************************************************
// 동영상 컨트롤바 기본 설정
function controlBar() {
	var vdo = document.querySelector('#vdo'),	
    	playBar = document.querySelector('#playBar'),
		play = document.querySelector('#play'),		
		stop = document.querySelector('#stop');		
    
    vdo.addEventListener('loadeddata', enableDisableplayBar, false);    
    vdo.addEventListener('emptied', enableDisableplayBar, false);
    vdo.addEventListener('timeupdate', onTimeupdate, false);        
    
    vdo.addEventListener('durationchange', enableDisableplayBar, false);        
    vdo.addEventListener('durationchange', onTimeupdate, false);                
    
    // addEvent(playBar,'mousedown', onSeek);
    playBar.addEventListener('mousedown', onSeek);
    playBar.addEventListener('change', onSeekRelease, false);           	        
}


// 동영상 : 로드(총 시간)
function enableDisableplayBar() {
	var vdo = document.querySelector('#vdo'),	
    	playBar = document.querySelector('#playBar'),
		play = document.querySelector('#play'),		
		stop = document.querySelector('#stop'),
		curtime = document.querySelector('#curtime'),	    
		durtime = document.querySelector('#durtime');	    	

    duration = Math.round(vdo.duration);        
    if(duration && !isNaN(duration)) {
    	playBar.max = duration;                    
    }       

    // play time
    var curmins = Math.floor(Math.round(vdo.currentTime) / 60),
        cursecs = Math.floor(Math.round(vdo.currentTime) - curmins * 60),
        durmins = Math.floor(Math.round(vdo.duration) / 60),
        dursecs = Math.floor(Math.round(vdo.duration) - durmins * 60);

    if(cursecs < 10) { cursecs = '0' + cursecs; }
    if(dursecs < 10) { dursecs = '0' + dursecs; }
    if(curmins < 10) { curmins = '0' + curmins; }
    if(durmins < 10) { durmins = '0' + durmins; }
    
    curtime.innerHTML = curmins + ':' + cursecs;
    durtime.innerHTML = durmins + ':' + dursecs;             
}

// 동영상 : 플레이바(체크) 진행
function onSeek() {
	var vdo = document.querySelector('#vdo'),	
		playBar = document.querySelector('#playBar'),
		play = document.querySelector('#play'),		
		stop = document.querySelector('#stop');
	
	window.requestAnimationFrame(function () {		
		vdo.currentTime = playBar.value;
	});
	
    if(!blockSeek) {
        blockSeek = true;
        vdoWasPaused = vdo.paused;
        vdo.pause();
    }    	
}

// 동영상 : 플레이바(체크) 갱신
function onSeekRelease() {
	var vdo = document.querySelector('#vdo'),	
		playBar = document.querySelector('#playBar'),
		play = document.querySelector('#play'),		
		stop = document.querySelector('#stop');

	window.requestAnimationFrame(function () {		
		vdo.currentTime = playBar.value;
	});

    if(!vdoWasPaused) {        	            
        if(playBar.max == Math.round(vdo.currentTime)) {
        	play.childNodes[0].src = './images/controls/vdo/btnPlay.png';
			vdo.pause();    	
		} else {			
			play.childNodes[0].src = './images/controls/vdo/btnPause.png';
			vdo.play();                            	
		}
    }
    blockSeek = false;
}

// 동영상 : 시간 업데이트
function onTimeupdate() {
	var vdo = document.querySelector('#vdo'),	
		playBar = document.querySelector('#playBar'),
		playVolume = document.querySelector('#playVolume'),
		play = document.querySelector('#play'),		
		stop = document.querySelector('#stop');

	if(!blockSeek) {
	    playBar.value = vdo.currentTime;   
	} 		
}



// ************************************************************************************
// 동영상 컨트롤바 : 타임에 따른 컨트롤 적용
function controlSliders() {
	var vdo = document.querySelector('#vdo'),						
		playBar = document.querySelector('#playBar'),
		sliders = document.querySelectorAll('input[type=range]'),	
		play = document.querySelector('#play'),
		playVolume = document.querySelector('#playVolume'),
		bar = document.querySelector('.bar');
	
	for (var i = 0; i < sliders.length; i++) {				
		var st = document.createElement('style');
		st.id = 's' + sliders[i].id;		
		document.head.appendChild(st);

		sliders[0].addEventListener('input', function () { handleSlider(this)}, false);
		sliders[0].addEventListener('change', function () { handleSlider(this)}, false);												
		sliders[1].addEventListener('input', function () { volumeSlider(this)}, false);
		sliders[1].addEventListener('change', function () { volumeSlider(this)}, false);        
	}		
	
	vdo.addEventListener('timeupdate', function () { handleSlider(this)}, false);	
		
	vdo.addEventListener('ended', function() {	
		play.childNodes[0].src = './images/controls/vdo/btnPlay.png';
		vdo.pause();

		var state = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;			
		var event = state ? 'FullscreenOn' : 'FullscreenOff';
		
		if(event == 'FullscreenOn') {						
			vdo.controls = true;	
		} else if(event == 'FullscreenOff') {
			vdo.controls = false;
		}		
	}, false);	


	playVolume.addEventListener('mouseout', function () { volumeEnd(this)}, false);     
 	// playVolume.addEventListener('touchend', function () { volumeEnd(this)}, false);    
	volumeSlider();	
}


// 동영상 컨트롤바 : 타임에 따른 진행(스타일) 적용
function handleSlider() {	
	var vdo = document.querySelector('#vdo'),				
		playBar = document.querySelector('#playBar'),
		curtime = document.querySelector('#curtime'),	    
		durtime = document.querySelector('#durtime');	

	var tracks = [ '-webkit-slider-runnable-track',	];
	
    var gradValue = Math.round((playBar.value / playBar.getAttribute('max') * 0.99) * 100);
	var grad = 'linear-gradient(90deg,#33BAFF ' + gradValue + '%,#808080 ' + (gradValue + 0.99) + '%)';

	var rangeSelector = 'input[id='+ playBar.id +']::';		
	var rangeSelector = 'input[id=playBar]::';		
	var styleString = '';
	var printedValue = (playBar.values) ? playBar.values[playBar.value] : playBar.value;

	for (var j = 0; j < tracks.length; j++) {
		styleString += rangeSelector + tracks[j] + ' { background: ' + grad + '; }';												
	}				
	if(gradValue == 0) {
		styleString = '';
	}

	document.getElementById('s' + playBar.id).textContent = styleString;
				
	// play time
	var curmins = Math.floor(Math.round(vdo.currentTime) / 60),
		cursecs = Math.floor(Math.round(vdo.currentTime) - curmins * 60),
		durmins = Math.floor(Math.round(vdo.duration) / 60),
		dursecs = Math.floor(Math.round(vdo.duration) - durmins * 60);

	if(cursecs < 10) { cursecs = '0' + cursecs; }
	if(dursecs < 10) { dursecs = '0' + dursecs; }
	if(curmins < 10) { curmins = '0' + curmins; }
	if(durmins < 10) { durmins = '0' + durmins; }
	
	curtime.innerHTML = curmins + ':' + cursecs;
	durtime.innerHTML = durmins + ':' + dursecs;			
}


// 볼륨 컨트롤바(기본) : 타임에 따른 진행(스타일) 적용 
function volumeSlider() {	
    var vdo = document.querySelector('#vdo'),
    	playVolume = document.querySelector('#playVolume');
    
    var tracks = [ '-webkit-slider-runnable-track', ];
    
    var gradValue, grad;
    var mobile = (/iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase()));    
    
    var rangeSelector = 'input[id=playVolume]::';        
    var styleString = '';

    if (mobile) {
        var userAgent = navigator.userAgent.toLowerCase();
        if ((userAgent.search('iphone') > -1) || (userAgent.search('ipod') > -1) || (userAgent.search('ipad') > -1)) {                        
            gradValue = 99;
            vdo.volume = 1;
            playVolume.value = 100;
        } else {
            gradValue = Math.round((playVolume.value / playVolume.getAttribute('max') * 0.99) * 100);  
            vdo.volume = playVolume.value / 100;   
        }   
    } else {
        gradValue = Math.round((playVolume.value / playVolume.getAttribute('max') * 0.99) * 100);  
        vdo.volume = playVolume.value / 100;           
    }

    grad = 'linear-gradient(90deg,#33BAFF ' + gradValue + '%,#808080 ' + (gradValue + 0.99) + '%)';    

    for (var j = 0; j < tracks.length; j++) {
        styleString += rangeSelector + tracks[j] + '{ background: ' + grad + '; }';                     
    }        
    if(gradValue == 0) {
        styleString = '';
    }
    document.getElementById('s' + playVolume.id).textContent = styleString;                         
}



// 볼륨 컨트롤바(mouseout, touchend) : 디바이스 체크(ios일 경우 음량 자동으로 max='1'이 되도록 설정)
function volumeEnd() {   
    var vdo = document.querySelector('#vdo'),
    	playVolume = document.querySelector('#playVolume');

    var tracks = [ '-webkit-slider-runnable-track', ];

    var gradValue, grad;
    var mobile = (/iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase()));    
    
    var rangeSelector = 'input[id=playVolume]::';        
    var styleString = '';

    if (mobile) {
        var userAgent = navigator.userAgent.toLowerCase();
        if ((userAgent.search('iphone') > -1) || (userAgent.search('ipod') > -1) || (userAgent.search('ipad') > -1)) {                        
            gradValue = 99;
            vdo.volume = 1;
            playVolume.value = 100;
        } else {
            gradValue = Math.round((playVolume.value / playVolume.getAttribute('max') * 0.99) * 100);  
            vdo.volume = playVolume.value / 100;   
        }   
    } else {
         gradValue = Math.round((playVolume.value / playVolume.getAttribute('max') * 0.99) * 100);  
         vdo.volume = playVolume.value / 100;   
    }

    grad = 'linear-gradient(90deg,#33BAFF ' + gradValue + '%,#808080 ' + (gradValue + 0.99) + '%)';    

    for (var j = 0; j < tracks.length; j++) {
        styleString += rangeSelector + tracks[j] + '{ background: ' + grad + '; }';                     
    }        
    if(gradValue == 0) {
        styleString = '';
    }
    document.getElementById('s' + playVolume.id).textContent = styleString; 
}

