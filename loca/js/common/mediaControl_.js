

// ******************************************************************************
function mediaControls(){
	if (QSAll('.sndText').length > 0) textPlayFnc();
	if (QSAll('.buttonsound').length > 0) playSound();
}

var pageIdx = 0,
	stateAudioX, sndTextTimeDes;

var textAudio = new Audio,
	// textActiveColor = '#e22929',
	timeCont = false,
	stateCont = false;


// // Play TextSound
function textPlayFnc () {
	var sndText = QSAll('.sndText');
	for (var i = 0; i < sndText.length; i++) {
		if (QS('#audioElement') !== null) addEvent(sndText[i], 'mousedown', audioStop);
		// textSoundEvent(sndText[i], mediaInfo.folder + mediaInfo.sndTextAudio[i] +'.mp3');adofolder
		iidxx = sndText[i].getAttribute('data-idx');
		textSoundEvent(sndText[i], mediaInfo.adofolder + mediaInfo.sndTextAudio[iidxx] +'.mp3');
	}
}
function textSoundEvent (target, src) {
	return target.addEventListener(GameManager.event.eventSelector('eventDown'), function(){
		textSound(this, src);
	}, false);
}

function textSound (target, src) {
	allSoundReset();
	resetTextColor();
	var textPlay = function () {
		textAudio.removeEventListener('loadeddata', textPlay);
		textAudio.play();
	};

	// target.style.color = textActiveColor;
	target.classList.add('soundOnText');

	var childSpan = target.querySelectorAll('span');
	for (var i = 0; i < childSpan.length; i++) {
	}

	textAudio.src = src;
	textAudio.addEventListener('loadeddata', textPlay);
	textAudio.load();

	// textAudio End
	textAudio.addEventListener('ended', function(){
		// target.style.color = '';
		target.classList.remove('soundOnText');
		// var childSpan = target.querySelectorAll('span');
		// for (var i = 0; i < childSpan.length; i++) {
		// 	childSpan[i].style.color = '';
		// }
	});
}


// Reset Text Color in Css
function resetTextColor () {
	var sndText = QSAll('.sndText');

	for (var i = 0; i < sndText.length; i++) {
		// sndText[i].style.color = '';
		sndText[i].classList.remove('soundOnText');

		// var childSpan = sndText[i].querySelectorAll('span');
		// for (var j = 0; j < childSpan.length; j++) {
		// 	childSpan[j].style.color = '';
		// }
	}
}

function audioStop () {
	var sndText = QSAll('.sndText');
	if (sndText.length > 0) {
		resetTextColor();
		textAudio.pause();
	}

	QS('.audioControls .playBtn').style.display = 'block';
	QS('.audioControls .pauseBtn').style.display = 'none';
	QS('#audioElement').pause();
	QS('#audioElement').currentTime = 0;

	QS('.play_0_8xBtn').style.background = '';
	QS('.play_1_0xBtn').style.background = '';
	QS('.play_1_3xBtn').style.background = '';
	QS('.followBtn').style.background = '';
	// sndTextTimeDes = mediaInfo.sndTextTime;
	stateAudioX = undefined;
	stateCont = false;
}


// 음원 재생 버튼
function playSound() {
	var buttonsound = document.getElementsByClassName("buttonsound");
	for( var i=0; i < buttonsound.length; i++){
	    var soundNum = buttonsound[i].getAttribute('data-idx'),
	        str = '';

	    str += '<audio>';
	    str += '<source src="'+ mediaInfo.adofolder + mediaInfo.buttonAudio[soundNum-1]+'.mp3" type="audio/mpeg"></source>';
	    str += '</audio>'
	    buttonsound[i].innerHTML = str;

	    buttonsound[i].addEventListener('mousedown', startSound);
	 	buttonsound[i].querySelector('audio').addEventListener('timeupdate', function(){
	    	if(this.currentTime == this.duration){
	    		this.parentNode.classList.add('play');
	    		this.parentNode.classList.remove('pause');
	    	}
	    });
	}

	function startSound() {
	    if(this.classList.contains('play')){
	        allSoundReset();
	    	this.classList.remove('play');
	    	this.classList.add('pause');
	    	this.querySelector('audio').play();
	    }else{
	    	this.classList.add('play');
	    	this.classList.remove('pause');
	    	this.querySelector('audio').pause();
	    }
	}
}


function allSoundReset() {
	if(QSAll('.sndText').length > 0){
		var sndText = QSAll('.sndText');
		for(var i = 0; i<sndText.length; i++){
			sndText[i].classList.remove('soundOnText');
		}
		textAudio.pause();
	}

	if(QSAll('.buttonsound').length > 0){
		var buttonsound = document.querySelectorAll('.buttonsound');
		for(var i = 0; i < buttonsound.length; i++){
		    buttonsound[i].querySelector('audio').pause();
		    if(buttonsound[i].getAttribute('data-play') == null ){
				buttonsound[i].querySelector('audio').currentTime = 0;
			}

	        buttonsound[i].classList.add('play');
	        buttonsound[i].classList.remove('pause');
		}
	}
}




// ******************************************************************************
// ******************************************************************************
// 미디어 컨트롤 : 초기 설정
function mediaInit() {
	var wrap = document.querySelector('#wrap');

	// if(wrap.getElementsByClassName('rolebtn').length > 0) {
	// 	var rolebtn = document.querySelectorAll('.rolebtn');
	// 	for(var i = 0; i < rolebtn.length; i++) {
	// 		addEvent(rolebtn[i],'mousedown', rolePlayInit);
	// 	}
	// } else {
	// 	var anibtn = document.querySelectorAll('.anibtn');
	// 	for(var i = 0; i < anibtn.length; i++) {
	// 		addEvent(anibtn[i],'mousedown', aniInit);
	// 	}
	// }

	var rolebtn = document.querySelectorAll('.rolebtn'),
		anibtn = document.querySelectorAll('.anibtn');

	for(var i = 0; i < rolebtn.length; i++) {
		addEvent(rolebtn[i],'mousedown', rolePlayInit);
	}

	for(var i = 0; i < anibtn.length; i++) {
		addEvent(anibtn[i],'mousedown', aniInit);
	}

}


var rolePlaying = false;
var selectedChar, charIdx, roleIdx, aniIdx, dataPop;


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
function rolePlayInit() {
    var RPSelectObj = document.querySelectorAll('.RPSelectObj'),
        startBtn = document.querySelectorAll('.rolePlayStartBtn');

    roleIdx = this.getAttribute('data-role');
    dataPop = this.getAttribute('data-pop');
	console.log(mediaInfo.rolefolder[roleIdx]);

    for (var i = 0; i < RPSelectObj.length; i++) {
        addEvent(RPSelectObj[i], 'mousedown', RPSelectClickFnc);
    }
    for (var i = 0; i < startBtn.length; i++) {
    	addEvent(startBtn[i], 'mousedown', startRolePlay);
    }

	if(mediaInfo.rolefolder[roleIdx][0] === 'vdo') {
		mediaVideoPlay(mediaInfo.rolefolder[roleIdx][1]);
	} else {
		mediaAudioPlay(mediaInfo.rolefolder[roleIdx][1]);
	}
}

// 역할 선택
function RPSelectClickFnc() {
    var RPViewObj = document.querySelectorAll('.RPViewObj');
	charIdx = Number(this.getAttribute('data-char'));

	var rolepopbox = document.querySelectorAll('.rolepopbox');
	for(var j = 0; j < rolepopbox[poprole].getElementsByClassName('RPSelectObj').length; j++) {
		rolepopbox[poprole].getElementsByClassName('RPSelectObj')[j].style.background = '#666';
		rolepopbox[poprole].getElementsByClassName('RPSelectObj')[charIdx-1].style.background = '#1978AD';
	}
}

// 역할 시작
// 역할 선택없이 시작을 할 경우 모든 역할 음원 재생
function startRolePlay() {
    var wrap = document.querySelector('#wrap'),
    	rolepopbox = document.querySelectorAll('.rolepopbox'),
    	videoWrap = rolepopbox[poprole].getElementsByClassName('videoWrap')[0],
    	videoContainer = document.querySelector('.videoContainer');
    	// videoWrap = createElement('div', rolepopbox[poprole], 'videoWrap');

    var rolePlayChar = document.querySelectorAll('.rolePlayChar'),
        RPViewObj = document.querySelectorAll('.RPViewObj');

    selectedChar = new Array(RPViewObj.length);

    for (var i = 0; i < RPViewObj.length; i++) {
        if (RPViewObj[i].style.opacity > 0) {
        	selectedChar[i] = 1;
        } else {
        	selectedChar[i] = 0;
        }
    }

    videoWrap.style.visibility = 'visible';
    rolePlaying = true;

    if((rolepopbox[poprole].getElementsByTagName('video').length > 0) || (rolepopbox[poprole].getElementsByTagName('audio').length > 0)) {
	    rolepopbox[poprole].querySelector('#vdo').pause();
		rolepopbox[poprole].querySelector('#vdo').currentTime = 0;
	}

	// if(mediaInfo.rolefolder[roleIdx][0] == 'vdo') {
	// 	var roleSelectedCharContainer = createElement('div', videoWrap, 'roleSelectedCharContainer');
	//     for (var i = 0; i < rolePlayChar.length; i++) {
	//         var roleSelectedChar = createElement('div', roleSelectedCharContainer, 'roleSelectedChar char_'+(i+1));
	//         roleSelectedChar.style.background = 'url(./images/12/1_13_rolePlay_char_'+ (i+1) +'.png) no-repeat';
	//         roleSelectedChar.style.backgroundSize = '50px';
	//         roleSelectedChar.style.opacity = '0.6';

	//         if (selectedChar[i] == 1) {
	//             roleSelectedChar.style.borderColor = '#000';
	//             roleSelectedChar.style.opacity = 1;
	//         }
	//     }
	//     // aniCreateElement(videoContainer);
	// }
}

// 자막, 한글/영문 버튼 생성
function aniCreateElement (target) {
    var aniScriptHideBtn = createElement('div', target, 'aniScriptHideBtn'),
        aniScriptContainer = createElement('div', target, 'aniScriptContainer'),
        aniScriptTextBox = createElement('span', aniScriptContainer, 'aniScriptTextBox EN'),
        aniScriptLangBtn = createElement('div', target, 'aniScriptLangBtn'),
        langIcon = createElement('img', aniScriptLangBtn, 'aniScriptLang');

    addEvent(aniScriptHideBtn, 'mousedown', aniScriptToggle);
    addEvent(aniScriptLangBtn, 'mousedown', aniScriptLangToggle);

    aniScriptHideBtn.innerHTML = '자막 감추기';
    aniScriptLangBtn.innerHTML = '한글 보기';
    aniScriptText = mediaInfo.syncText.en[0];
}

// 자막 버튼
var synelan;

function aniScriptToggle () {
    var container = document.querySelector('.aniScriptContainer'),
        aniScriptHideBtn = document.querySelector('.aniScriptHideBtn');

    if (container.style.visibility !== 'hidden') {
        container.style.visibility = 'hidden';
        aniScriptHideBtn.innerHTML = '자막 보이기';
    } else {
        container.style.visibility = 'visible';
        aniScriptHideBtn.innerHTML = '자막 감추기';
    }
}

// 한글, 영문 버튼
var synelan;

function aniScriptLangToggle () {
    var aniScriptTextBox = document.querySelector('.aniScriptTextBox'),
        aniScriptLangBtn = document.querySelector('.aniScriptLangBtn');

    if (aniScriptTextBox.className.indexOf('EN') > -1) {
        aniScriptTextBox.classList.remove('EN');
        aniScriptTextBox.classList.add('KR');
        aniScriptLangBtn.innerHTML = '영문 보기';
        synelan = mediaInfo.syncText.kr;
    } else {
        aniScriptTextBox.classList.remove('KR');
        aniScriptTextBox.classList.add('EN');
        aniScriptLangBtn.innerHTML = '한글 보기';
        synelan = mediaInfo.syncText.en;
    }
}




// ******************************************************************************
var videoArray = [],
	soundFlag = false,
	vdoFlag = false,
	fullFlag = false,
	screenFlag = false;
	stopFlag = false;

var duration, vdoWasPaused;
var blockSeek = false;


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

	wrap.style.display = 'block';


	// input[type=range] : 스타일 시트 생성
	var style = document.createElement('style');
	document.head.appendChild(style);

/*	// input[type=range] : 브라우저 체크 및 스타일 적용
	if(navigator.userAgent.indexOf('Edge') >= 0) {

		style.sheet.insertRule('input[type=range] { appearance:none; width:97%; padding:0; }', 0);
		style.sheet.insertRule('input[type=range]::-ms-track { background:transparent; border-color:transparent; border-width: 6px 0; color:transparent; width:100%; height:0px; border-radius:10px; }', 0);
		style.sheet.insertRule('input[type=range]::-ms-fill-lower { background:#ea3e19; height:5px; border-radius:10px; }', 0);
		style.sheet.insertRule('input[type=range]::-ms-fill-upper { background:#fffdfe; height:5px; border-radius:10px; }', 0);
		style.sheet.insertRule('input[type=range]::-ms-thumb { border:none; width:13px; height:13px; border-radius:50%; background:#ea3e19; z-index:1000; }', 0);
	}
	else {
		var agent = navigator.userAgent.toLowerCase();
		if(navigator.userAgent.indexOf('Chrome') != -1 ) {

			style.sheet.insertRule('input[type=range] { -webkit-appearance:none; width:50%; padding:0; }', 0);
			style.sheet.insertRule('input[type=range]:focus { outline:none; border:none; }', 0);
			style.sheet.insertRule('input[type=range]::-webkit-slider-runnable-track { border-color:transparent; color:transparent; border:none; background:#fffdfe; height:5px; border-radius:10px; }', 0);
			style.sheet.insertRule('input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; border:none; width:13px; height:13px; border-radius:50%; background:#ea3e19; margin-top:-4px; z-index:1000; }', 0);
		}
		else if((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf('msie') != -1)) {

			style.sheet.insertRule('input[type=range] { appearance:none; width:50%; padding:0; }', 0);
			style.sheet.insertRule('input[type=range]::-ms-track { background:transparent; border-color:transparent; border-width: 6px 0; color:transparent; width:100%; height:0px; border-radius:10px; }', 0);
			style.sheet.insertRule('input[type=range]::-ms-fill-lower { background:#ea3e19; height:5px; border-radius:10px; }', 0);
			style.sheet.insertRule('input[type=range]::-ms-fill-upper { background:#fffdfe; height:5px; border-radius:10px; }', 0);
			style.sheet.insertRule('input[type=range]::-ms-thumb { border:none; width:13px; height:13px; border-radius:50%; background:#ea3e19; z-index:1000; }', 0);
		}
	}
	*/
	videoContainerHTML = '<video id="vdo" class="vdos"  controls="" webkit-playsinline="" playsinline=""><source src="'+ src +'.mp4" type="video/mp4"></source></video>';
	videoContainerHTML += '<img class="thumImg" src="./images/thum/'+ splitSrc[3] +'.jpg" />';
	videoContainerHTML += '<div class="controlsbg"></div>';
	videoContainerHTML += '<div class="videoControls">';
	videoContainerHTML += '<ul id="play" class="controls"></ul>';
	videoContainerHTML += '<ul id="stop" class="controls"></ul>';
	videoContainerHTML += '<ul id="curtime">00:00</ul>';
	videoContainerHTML += '<ul class="bar"><input id="playBar" type="range" min="0" max="100" value="0" step="1" oninput="onSeek(this.value)" onchange="onSeekRelease(this.value)"/></ul>';
	videoContainerHTML += '<ul id="durtime">00:00</ul>';
	videoContainerHTML += '<ul id="playVolume"></ul>';
	// videoContainerHTML += '<ul class="fullsize"><img alt="" src="./images/controls/vdo/fullsize.png"/></ul>';
	videoContainerHTML += '</div>';
	videoContainer.innerHTML = videoContainerHTML;


	videoContainer.classList.add('vdotop');

	setTimeout(function () {
		var vdo = document.querySelector('#vdo'),
			play = document.querySelector('#play'),
			stop = document.querySelector('#stop'),
			playBar = document.querySelector('#playBar'),
			playVolume = document.querySelector('#playVolume'),
			// fullsize = document.querySelector('.fullsize'),
			videoContainer = document.querySelector('.videoContainer'),
			pageMovPlayBtn = createElement('div', videoContainer, 'pageMovPlayBtn');

		playBar.style.pointerEvents = 'none';
		setTimeout(function () {
			playBar.style.pointerEvents = 'auto';
		}, 1500);


		play.innerHTML = '<img alt="" src="./images/controls/vdo/btnPlay.png"/>';
		stop.innerHTML = '<img alt="" src="./images/controls/vdo/btnStop.png"/>';
		vdo.controls = false;


		// 화면 재생 버튼
		addEvent(pageMovPlayBtn,'mousedown', function(e) {
			e.preventDefault();

			document.querySelector('.thumImg').style.display = 'none';
			vdo.play();
			play.childNodes[0].src = './images/controls/vdo/btnPause.png';
			pageMovPlayBtn.style.display = 'none';
			vdo.style.pointerEvents = 'none';
			screenFlag = true;
		}, false);


		// 재생 및 일시정지 버튼
		addEvent(play,'mousedown', function(e) {
			e.preventDefault();

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
				pageMovPlayBtn.style.backgroundImage = 'url(./images/controls/vdo/pause.png)';
				pageMovPlayBtn.style.display = 'block';
				play.childNodes[0].src = './images/controls/vdo/btnPlay.png';
				vdo.pause();
			}
		}, false);


		// 정지 버튼
		addEvent(stop,'mousedown', function(e) {
			e.preventDefault();

			play.childNodes[0].src = './images/controls/vdo/btnPlay.png';
			pageMovPlayBtn.style.backgroundImage = 'url(./images/controls/vdo/play.png)';
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

	}, 20);
}



function mediaAudioPlay(src) {
	var wrap = document.querySelector('#wrap'),
		rolepopbox = document.querySelectorAll('.rolepopbox'),
		videoWrap = rolepopbox[poprole].getElementsByClassName('videoWrap')[0];

	var videoContainer = createElement('div', videoWrap, 'videoContainer');
	var videoContainerHTML = document.querySelector('.videoContainer');
	var splitSrc = src.split('/', '4');

	wrap.style.display = 'block';


	// input[type=range] : 스타일 시트 생성
	var style = document.createElement('style');
	document.head.appendChild(style);

/*	// input[type=range] : 브라우저 체크 및 스타일 적용
	if(navigator.userAgent.indexOf('Edge') >= 0) {
		style.sheet.insertRule('input[type=range] { appearance:none; width:50%; padding:0; }', 0);
		style.sheet.insertRule('input[type=range]::-ms-track { background:transparent; border-color:transparent; border-width: 6px 0; color:transparent; width:100%; height:0px; border-radius:10px; }', 0);
		style.sheet.insertRule('input[type=range]::-ms-fill-lower { background:#ea3e19; height:5px; border-radius:10px; }', 0);
		style.sheet.insertRule('input[type=range]::-ms-fill-upper { background:#fffdfe; height:5px; border-radius:10px; }', 0);
		style.sheet.insertRule('input[type=range]::-ms-thumb { border:none; width:13px; height:13px; border-radius:50%; background:#ea3e19; z-index:1000; }', 0);
	}
	else {
		var agent = navigator.userAgent.toLowerCase();
		if(navigator.userAgent.indexOf('Chrome') != -1 ) {
			style.sheet.insertRule('input[type=range] { -webkit-appearance:none; width:50%; padding:0; }', 0);
			style.sheet.insertRule('input[type=range]:focus { outline:none; border:none; }', 0);
			style.sheet.insertRule('input[type=range]::-webkit-slider-runnable-track { border-color:transparent; color:transparent; border:none; background:#fffdfe; height:5px; border-radius:10px; }', 0);
			style.sheet.insertRule('input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; border:none; width:13px; height:13px; border-radius:50%; background:#ea3e19; margin-top:-4px; z-index:1000; }', 0);
		}
		else if((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf('msie') != -1)) {
			style.sheet.insertRule('input[type=range] { appearance:none; width:50%; padding:0; }', 0);
			style.sheet.insertRule('input[type=range]::-ms-track { background:transparent; border-color:transparent; border-width: 6px 0; color:transparent; width:100%; height:0px; border-radius:10px; }', 0);
			style.sheet.insertRule('input[type=range]::-ms-fill-lower { background:#ea3e19; height:5px; border-radius:10px; }', 0);
			style.sheet.insertRule('input[type=range]::-ms-fill-upper { background:#fffdfe; height:5px; border-radius:10px; }', 0);
			style.sheet.insertRule('input[type=range]::-ms-thumb { border:none; width:13px; height:13px; border-radius:50%; background:#ea3e19; z-index:1000; }', 0);
		}
	}*/

	videoContainerHTML = '<audio id="vdo" class="ados"><source src="'+ src +'.mp3" type="audio/mp3"/></audio>';
	videoContainerHTML += '<div class="controlsbg"></div>';
	videoContainerHTML += '<div class="videoControls">';
	videoContainerHTML += '<ul id="play" class="controls"></ul>';
	videoContainerHTML += '<ul id="stop" class="controls"></ul>';
	videoContainerHTML += '<ul id="curtime">00:00</ul>';
	videoContainerHTML += '<ul class="bar"><input id="playBar" type="range" min="0" max="100" value="0" step="1" oninput="onSeek(this.value)" onchange="onSeekRelease(this.value)"/></ul>';
	videoContainerHTML += '<ul id="durtime">00:00</ul>';
	videoContainerHTML += '<ul id="playVolume"></ul>';
	videoContainerHTML += '<ul class="fullsize"><img alt="" src="./images/controls/vdo/fullsize.png"/></ul>';
	videoContainerHTML += '</div>';
	videoContainer.innerHTML = videoContainerHTML;


	document.querySelector('.bar').style.visibility = 'hidden';
	videoContainer.classList.add('adotop');

	setTimeout(function () {
		var vdo = document.querySelector('#vdo'),
			play = document.querySelector('#play'),
			stop = document.querySelector('#stop'),
			playBar = document.querySelector('#playBar'),
			playVolume = document.querySelector('#playVolume'),
			fullsize = document.querySelector('.fullsize'),
			videoContainer = document.querySelector('.videoContainer');


		play.innerHTML = '<img alt="" src="./images/controls/vdo/btnPlay.png"/>';
		stop.innerHTML = '<img alt="" src="./images/controls/vdo/btnStop.png"/>';
		//fullsize.innerHTML = '<img alt="" src="./images/controls/vdo/fullsize.png"/>';
		vdo.controls = false;

		playBar.style.pointerEvents = 'none';
		setTimeout(function () {
			playBar.style.pointerEvents = 'auto';
		}, 1500);

		// 재생 및 일시정지 버튼
		addEvent(play,'mousedown', function(e) {
			e.preventDefault();

			stopFlag = false;
			if(vdo.paused) {
				play.childNodes[0].src = './images/controls/vdo/btnPause.png';
				vdo.play();
				fullFlag = false;
				screenFlag = true;
				vdo.controls = false;
			} else {
				play.childNodes[0].src = './images/controls/vdo/btnPlay.png';
				vdo.pause();
			}
		}, false);


		// 정지 버튼
		addEvent(stop,'mousedown', function(e) {
			e.preventDefault();

			play.childNodes[0].src = './images/controls/vdo/btnPlay.png';
			playBar.value = 0;
			vdo.currentTime = 0;
			vdo.pause();
			pageMovPlayBtn.style.backgroundImage = 'url(./images/controls/vdo/pause.png)';
			pageMovPlayBtn.style.display = 'block';

			screenFlag = false;
			vdo.controls = false;
			stopFlag = true;
		}, false);

		controlBar();
		controlSliders();

	}, 20);
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

    addEvent(playBar,'mousedown', onSeek);
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
		stop = document.querySelector('#stop'),
		pageMovPlayBtn = document.querySelector('.pageMovPlayBtn');

	if(!blockSeek) {
	    playBar.value = vdo.currentTime;
	}



	var curT = Math.ceil(vdo.currentTime*100)*0.01;
	var durT = Math.ceil(vdo.duration*100)*0.01;

	if(Math.ceil(curT) == Math.ceil(durT)){
		play.childNodes[0].src = './images/controls/vdo/btnPlay.png';
		playBar.value = 0;
		vdo.currentTime = 0;
		vdo.pause();
		pageMovPlayBtn.style.backgroundImage = 'url(./images/controls/vdo/play.png)';
		pageMovPlayBtn.style.display = 'block';

		screenFlag = false;
		vdo.controls = false;
		stopFlag = true;
		controlBar();
		controlSliders();
	}

	// 텍스트 씽크
	var currTime = vdo.currentTime;

	if(dataPop == 'role') {
		var rolepopbox = document.querySelectorAll('.rolepopbox');
		var roleText = rolepopbox[poprole].getElementsByClassName('roleText');

		for(var i = 0; i < mediaInfo.rolesync[roleIdx].length; i++) {
			if( (currTime >= mediaInfo.rolesync[roleIdx][i][0]) && (currTime <= mediaInfo.rolesync[roleIdx][i][1]) ) {
				roleText[i].classList.add('roleCol');

				// 역할선택(charIdx) 볼륨 제어
				if(charIdx == mediaInfo.rolesync[roleIdx][i][2]) {
					vdo.volume = 0;
	                if(soundFlag == true) {
	                    vdo.muted = true;
	                } else {
	                    vdo.muted = true;
	                }
				} else {
					vdo.volume = playVolume.value / 100;
					vdo.volume = 1;
	                if(soundFlag == false) {
	                    vdo.muted = false;
	                } else {
	                    vdo.muted = true;
	                }
				}
			}

			else if(currTime >= mediaInfo.rolesync[roleIdx][i][1]) {
				roleText[i].classList.remove('roleCol');
			}
		}
	}

}



// ************************************************************************************
// 동영상 컨트롤바 : 타임에 따른 컨트롤 적용
function controlSliders() {
	var vdo = document.querySelector('#vdo'),
		playBar = document.querySelector('#playBar'),
		sliders = document.querySelectorAll('input[type=range]'),
		play = document.querySelector('#play'),
		bar = document.querySelector('.bar');
		playVolume = document.querySelector('#playVolume');

	for (var i = 0; i < sliders.length; i++) {
		var st = document.createElement('style');
		st.id = 's' + sliders[i].id;
		document.head.appendChild(st);

		sliders[0].addEventListener('input', function () { handleSlider(this)}, false);
		sliders[0].addEventListener('change', function () { handleSlider(this)}, false);
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


	playVolume.addEventListener('mousedown', function () { volumeEnd(this)}, false);
	// volumeSlider();
}


// 동영상 컨트롤바 : 타임에 따른 진행(스타일) 적용
function handleSlider() {
	var vdo = document.querySelector('#vdo'),
		playBar = document.querySelector('#playBar'),
		curtime = document.querySelector('#curtime'),
		durtime = document.querySelector('#durtime');

	var tracks = [ '-webkit-slider-runnable-track',	];

    var gradValue = Math.round((playBar.value / playBar.getAttribute('max') * 0.99) * 100);
	var grad = 'linear-gradient(90deg,#1986f3 ' + gradValue + '%, #808080 ' + (gradValue + 0.99) + '%)';

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

    grad = 'linear-gradient(90deg,#ea3e19 ' + gradValue + '%,#fffdfe ' + (gradValue + 0.99) + '%)';

    for (var j = 0; j < tracks.length; j++) {
       // styleString += rangeSelector + tracks[j] + '{ background: ' + grad + '; }';
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

	if(playVolume.classList.contains('nosound')){
		playVolume.classList.remove('nosound');
		vdo.volume = 1;
	}else{
		playVolume.classList.add('nosound');
		vdo.volume = 0;
	}
/*    if (mobile) {

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

    grad = 'linear-gradient(90deg,#ea3e19 ' + gradValue + '%,#fffdfe ' + (gradValue + 0.99) + '%)';

    for (var j = 0; j < tracks.length; j++) {
       styleString += rangeSelector + tracks[j] + '{ background: ' + grad + '; }';
    }
    if(gradValue == 0) {
        styleString = '';
    }
   document.getElementById('s' + playVolume.id).textContent = styleString; */
}
