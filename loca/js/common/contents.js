var parentEl = document.querySelector('#wrap');
var idArray = [];

if(parentEl.querySelectorAll('input').length > 0 || parentEl.querySelectorAll('textarea').length > 0){
	var inputEl = parentEl.querySelectorAll('input'),
		textEl = parentEl.querySelectorAll('textarea');
		for(var i = 0; i < inputEl.length; i++){
			idArray.push(inputEl[i])
		}
		for(var i = 0; i < textEl.length; i++){
			idArray.push(textEl[i])
		}
}
console.log(idArray);


// toggle + sound + text
function clickObjFn(){
	var clickObj = document.querySelectorAll('.clickObj'),
		targetObj = document.querySelectorAll('.targetObj'),
		legendContainer = document.querySelectorAll('.legendContainer');
		for(var j = 0; j < targetObj.length; j++){
			targetObj[j].classList.add('displayN');
		}
		if(targetObj.length !== undefined){
			for(var i = 0; i < clickObj.length; i++){
				clickObj[i].addEventListener('mousedown', toggleEv);
			}
		}
		if(legendContainer.length > 0){
			for(var j = 0; j < legendContainer.length; j++){
				var visibleObj = legendContainer[j].querySelectorAll('.visibleObj');
				for(var i = 0; i < visibleObj.length; i++) {
					visibleObj[i].addEventListener('mousedown', legendImgShowFn);
				}
			}
		}

}
function toggleEv() {
	var clickObj = document.querySelectorAll('.clickObj'),
		targetObj = document.querySelectorAll('.targetObj'),
		idx = Array.prototype.indexOf.call(clickObj, this);
	var sndText = targetObj[idx].querySelectorAll('.sndText');
	var sndStop = targetObj[idx].querySelectorAll('.sndStopBtn');
		// clickObj 토글
		if(this.getAttribute('data-type') == 'toggle'){
			if(targetObj[idx].classList.contains('displayN')){
				this.classList.add('toggle');
			}else{
				this.classList.remove('toggle');
			}
		}
		if(this.getAttribute('data-slide') == null){
			if(targetObj[idx].className.indexOf('displayN') == -1){
				if(sndText !== null) {
					// textAudio.pause();
					for(var i = 0; i < sndText.length; i++){
						sndText[i].classList.remove('soundOnText');
					}
				}
				targetObj[idx].classList.add('displayN');
				this.classList.remove('toggledown');
			}else{
				for(var k = 0; k < targetObj.length; k++){
					if(targetObj[k].getAttribute('data-show') == 'hidden'){
						targetObj[k].classList.add('displayN');
					}
					// textAudio.pause();
				}
				if(targetObj[idx].querySelectorAll('.sndPlayBtn').length !== 0){
					for(var j = 0; j < sndStop.length; j++){
						sndStop[j].addEventListener('mousedown', function(){
							// textAudio.pause();
						});
					}
				}
				/*인터렉션*/
				if(this.parentNode.classList.contains('interContainer')){
					var clickPoint = this.parentNode.querySelectorAll('.clickObj'),
						targetPoint = this.parentNode.querySelectorAll('.targetObj');
					
					for(var i = 0; i < clickPoint.length; i++) {
						clickPoint[i].classList.remove('toggledown');
					}
					for(var i = 0; i < targetPoint.length; i++) {
						targetPoint[i].classList.add('displayN');
					}
					
				}
				/*popclosebtn 있을 시*/
				// if(targetObj[idx].classList.contains('popclosebtn')) {
				// 	console.log("ㅇㄹㅇㄹㅇㄹㅇㄹ")
				// }
				// console.log(targetObj[idx].classList)
				targetObj[idx].classList.remove('displayN');
				this.classList.add('toggledown');
			}
		}
		if(this.getAttribute('data-type') == 'gif'){
			var gifImg = targetObj[idx].querySelectorAll('img');
			var gifObj = document.createElement('img');
			var idxNum = idx -1;

			if(targetObj[idx].className.indexOf('displayN') == -1){
				// console.log(gifImg.length)
				if(gifImg.length == 0){
					gifObj.src = './images/'+imgSrc+'/'+imgSrc+'_'+gifFileNum+'_'+idxNum+'-1.gif';

					gifObj.setAttribute('width','gifIdx');
					gifObj.width = gifWidth[idxNum-1];
					targetObj[idx].appendChild(gifObj);
				}else{
					for(var i = 0; i < gifImg.length; i++){
						gifImg[i].src = gifImg[i].src.replace('png','gif');
					}
				}
			}else{
				for(var i = 0; i < gifImg.length; i++){
					gifImg[i].src = gifImg[i].src.replace('gif','png');
				}
			}
		}
		if(this.getAttribute('data-ani') == 'true'){
			if(targetObj[idx].className.indexOf('displayN') == -1){
				// console.log('있더')
			}else{
				if(QSAll('.videoWrap').length > 0) {
					var videoWrap = QSAll('.videoWrap'),
						popbox = QSAll('.popbox'),
						anipopbox = QSAll('.anipopbox'),
						rolepopbox = QSAll('.rolepopbox');

					if(QSAll('.videoContainer').length > 0) {
						if(pop == 'ani') {
							var playBtn = QSAll('.pageMovPlayBtn');
							var playImg = document.getElementById('play').childNodes[0];

							anipopbox[popani].querySelector('#vdo').pause();
							anipopbox[popani].querySelector('#vdo').currentTime = 0;

							for(var i = 0; i < playBtn.length; i++){
								playBtn[i].style.display = 'block';
							}
							playImg.src = playImg.src.replace('btnPause','btnPlay');

						}

					}

				}

			}
		}



}
// 범례 클릭 이벤트
function legendImgShowFn() {
	var visibleObj = document.querySelectorAll('.visibleObj'),
		idx = Array.prototype.indexOf.call(visibleObj, this),
		topObj = this.parentNode.parentNode,
		bgContainer = topObj.previousElementSibling,
		imgNum = idx+1;

		if(document.querySelector('.showImg[data-num="'+idx+'"]') !== null){
			var showi= document.querySelector('.showImg[data-num="'+idx+'"]');
			showi.parentNode.removeChild(showi);
		}else{
			var imgObj = document.createElement('img');
			imgObj.setAttribute('data-num',idx)
			imgObj.src = './images/'+imgSrc+'/'+imgSrc+'_'+imgFileNum+'_'+imgNum+'.png';
			imgObj.className = 'showImg';
			topObj.appendChild(imgObj);
		}
}

//  input focus
function inputFocusFn(){
	var input = document.querySelectorAll('input');
	if(QS('.inputContainer').length !== null){
		for(var i = 0; i < input.length; i++){
			input[i].addEventListener('mousedown', inputFocusEv);
		}
	}
}
function inputFocusEv(){
	var input = document.querySelectorAll('input'),
		changeObj = document.querySelectorAll('.changeObj'),
		idx = Array.prototype.indexOf.call(input, this);

		if(changeObj[idx].src.indexOf('png') !== null ){
			changeObj[idx].src = changeObj[idx].src.replace('png','gif');
			changeObj[idx].style.cursor = 'pointer';

			changeObj[idx].addEventListener('mousedown', function(){
				var balloonText = document.querySelectorAll('.balloonText');
					balloonText[idx].style.visibility = 'visible';
					changeObj[idx].src = changeObj[idx].src.replace('gif','png');
					changeObj[idx].style.pointerEvents = 'none';
			});

		}
}
// toggle + snd + Text
function sndToggleFn() {
	var sndObj = document.querySelectorAll('.sndClick');
		if(QS('.sndToggleContainer').length !== null){
			for(var i = 0; i < sndObj.length; i++){
				sndObj[i].addEventListener('mousedown', sndToggleEv);

			}
		}
}
function sndToggleEv(){
	var sndObj = document.querySelectorAll('.sndClick'),
		sndToggle = document.querySelectorAll('.sndToggleBox .sndToggle'),
		idx = Array.prototype.indexOf.call(sndObj, this);

		sndToggle[idx].style.visibility = 'visible';
		sndToggle[idx].classList.add('sndComplete');
		if(QSAll('.sndComplete').length == sndToggle.length){
			var blinkImg = document.querySelector('.blinkImg');
				blinkImg.classList.add('blink');

				blinkImg.addEventListener('mousedown', function(){
					blinkImg.classList.remove('blink');
					document.querySelector('.imgContainer .sndToggle').style.visibility = 'visible';
				});
		}


}

// user check
function userCheckFn(){
	var checkContainer = document.querySelectorAll('.checkContainer');
		for(var i = 0; i < checkContainer.length; i++) {
			var fiveCheck = checkContainer[i].querySelectorAll('.fiveCheck');
			var threeCheck = checkContainer[i].querySelectorAll('.threeCheck');
			var multiCheck = checkContainer[i].querySelectorAll('.multiCheck');
			if(checkContainer[i].getAttribute('data-type') == 'five'){
				for(var j = 0; j < fiveCheck.length; j++){
					fiveCheck[j].addEventListener('mousedown', checkFiveEv);
				}
			}
			if(checkContainer[i].getAttribute('data-type') == 'three'){
				for(var j = 0; j < threeCheck.length; j++){
					threeCheck[j].addEventListener('mousedown', checkThreeEv);

				}
			}
			if(checkContainer[i].getAttribute('data-type') == 'multi'){
				for(var k = 0; k < multiCheck.length; k++){
					multiCheck[k].addEventListener('mousedown', checkMultiEv);
				}
			}

		}
}
function checkThreeEv(){
	var threeCheck = document.querySelectorAll('.threeCheck'),
		idx = Array.prototype.indexOf.call(threeCheck, this),
		num;
		if(idx < 3){
			num = 0;
		}else if(idx > 2 && idx < 6){
			num = 3;
		}else if(idx < 9 && idx > 5){
			num = 6;
		}else if(idx > 8){
			num = 9;
		}
		for(var i = num; i < num + 3; i++){
			threeCheck[i].src = threeCheck[i].src.replace('_1.png','.png');
		}
		this.src = this.src.replace('.png','_1.png');
}
function checkFiveEv(){
	var fiveCheck = document.querySelectorAll('.fiveCheck'),
		idx = Array.prototype.indexOf.call(fiveCheck, this),
		num;
		if(idx < 5){
			num = 0;
		}else if(idx > 4 && idx < 10){
			num = 5;
		}else if(idx < 15 && idx > 9){
			num = 10;
		}else if(idx > 14){
			num = 15;
		}
		for(var i = num; i < num + 5; i++){
			fiveCheck[i].src = fiveCheck[i].src.replace('_1.png','.png');
		}
		this.src = this.src.replace('.png','_1.png');
}
function checkMultiEv(){
	var multiCheck = document.querySelectorAll('.multiCheck'),
		idx = Array.prototype.indexOf.call(multiCheck, this),
		checkNum = Math.floor(idx/5)*5;
		for(var m = 0; m < 5; m++){
			if(m < idx%5+1){
				multiCheck[m+checkNum].classList.add('multiCheck_click');
			}else{
				multiCheck[m+checkNum].classList.remove('multiCheck_click');
			}

		}

}

var intervalObjArray = [];
var intervalIdx = 0;
// 인터벌 - start
function intervalInit(time) {
	if(document.querySelectorAll('.intervalContainer').length !== null){
		var intervalContainer = document.querySelectorAll('.intervalContainer');
		for(var i = 0; i < intervalContainer.length; i++){
			intervalObjArray.push(intervalContainer[i].querySelectorAll('.intervalObj').length);
			intervalBtnCreateEv(intervalContainer[i], time);
		}
	}
}
function intervalBtnCreateEv(target, time){
	var intervalBtn = target.querySelectorAll('.intervalBtn');
	for(var i = 0; i < intervalBtn.length; i++){

		intervalBtn[i].addEventListener('mousedown', function(){
			intervalEv(target, time, this);
		});
	}
}
function intervalEv(target, time, targetBtn){
	var intervalObj = target.querySelectorAll('.intervalObj'),
		intervalBtn = document.querySelectorAll('.intervalBtn');
	var init = setInterval(function(){
		intervalIdx++;
		for(var i = 0; i < intervalBtn.length; i++){
			targetBtn.classList.remove('complete');
			intervalBtn[i].style.pointerEvents = 'none';
		}
		intervalObj[intervalIdx-1].classList.add('showObj');
		if(intervalObjArray[target.getAttribute('data-num') - 1] == intervalIdx){
		for(var i = 0; i < intervalBtn.length; i++){
			intervalBtn[i].style.pointerEvents = 'auto';
		}
			clearInterval(init);
			targetBtn.classList.add('complete');
			intervalIdx = 0;
		}
	},time);
		if(targetBtn.classList.contains('complete')){
			for(var j = 0; j < intervalObj.length; j++){
				intervalObj[j].classList.remove('showObj');
		}
	}

}

// 이미지 슬라이드 변수 선언
var innerIdx = 0,
	imgLen = 1,
	binLen = 0;
var idxArray = [];
var eachSlideLength = [];
var scopeArray = [];
var scopeLast, swipePos, swipeIdx, simgTol, dotTol;


// 이미지 슬라이드 생성
function slideObjFn() {
	var container = document.querySelectorAll('.imgSlideContainer');
	innerIdx = 0;



	for(var i = 0; i < container.length; i++){

		var sprew = container[i].querySelectorAll('.sprew');
		for(var j = 0; j < sprew.length; j++){
			sprew[0].style.display = 'block';
			sprew[j].style.display = 'none';
		}

		var slideNum = container[i].getAttribute('data-num');
		btn_innerPageEvent(container[i]);
		eachSlideLength.push(container[i].querySelectorAll('.sprewUL > li').length);
		idxArray.push(0);
	}
}

// 이미지 슬라이드 초기 설정
// 좌우/버튼 선택 이벤트 생성
// 썸네일 선택 이벤트 생성
// 모바일(스와이프) 생성
function btn_innerPageEvent(target) {
	var innerPrevBtn = target.querySelector('.innerPrevBtn'),
		innerNextBtn = target.querySelector('.innerNextBtn'),
		innerBtn = target.querySelectorAll('.innerBtn'),
		sliderImg = target.querySelector('.sliderImg'),
		sprew = target.querySelectorAll('.sprew'),
		simg = target.querySelectorAll('.simg'),
		sliderTab = target.querySelector('.sliderTab'),
		sliderDotTab = target.querySelector('.sliderDotTab'),
		sliderDot = target.querySelectorAll('.sliderDot');

		innerPrevBtn.style.opacity = '0.3';
		innerPrevBtn.style.pointerEvents = 'none';
		innerNextBtn.style.display = 'block';

	// 썸네일 이미지 슬라이드
	if(sliderTab !== null){
		var count = Number(sliderTab.getAttribute('data-count'));
		var ep = Math.floor(simg.length / count)
		var np = simg.length % count;
		simg[innerIdx].childNodes[0].classList.add('tabView');

		simgTol = Number(simg.length);

		// for(var i = 0; i < sprew.length; i++) {
		// 	sprew[i].style.display = 'none';
		// 	sprew[0].style.display = 'block';
		// }

		for(var i = 0; i < innerBtn.length; i++) {
			innerBtn[i].addEventListener('mousedown', btn_innerPageMove);
		}

		for(var i = 0; i < simg.length; i++) {
			simg[i].addEventListener('mousedown', btn_innerImgEvent);
		}
	}
	// 도트 이미지 슬라이드
	if(sliderDotTab !== null){
		var dotcount = Number(sliderDotTab.getAttribute('data-dotcount'));
		sliderDot[innerIdx].classList.add('tabView');
		dotTol = Number(sliderDot.length);
		for(var i = 0; i < innerBtn.length; i++) {
			innerBtn[i].addEventListener('mousedown', btn_innerPageMove);
		}
		for(var i = 0; i < sliderDot.length; i++){
			sliderDot[i].addEventListener('mousedown',  btn_innerImgEvent);
		}
	}
		swipeFunc.init();
}

var swipeFunc = {
	touches : {
		"touchstart": {"x":-1, "y":-1},
		"touchmove" : {"x":-1, "y":-1},
		"touchend"  : false,
		"mousedown": {"x":-1, "y":-1},
		"mousemove" : {"x":-1, "y":-1},
		"mouseup"  : false,
		"direction" : "undetermined"
	},
	touchHandler: function (event) {
		var touch,
		endAction = function (targetElement) {
			if(targetElement.parentNode.parentNode.parentNode.parentNode.getAttribute('data-select') == null){
			return;
			}
			// Left
			if(swipeFunc.touches.direction == 'left') {
				swipePos = swipeFunc.touches.direction;
				swipeIdx = Number(targetElement.getAttribute('data-num'));

				innerIdx = swipeIdx;
				dotTol = eachSlideLength[targetElement.parentNode.getAttribute('data-swipe')-1];
				simgTol = eachSlideLength[targetElement.parentNode.getAttribute('data-swipe')-1];
				var funIdx = swipeIdx;
				if(targetElement.parentNode.parentNode.nextElementSibling.classList.contains('sliderDotTab')){
					if(funIdx !== dotTol) {
						btn_swipeinnerImgEvent(targetElement);
					}
				}
				else if(targetElement.parentNode.parentNode.nextElementSibling.classList.contains('sliderTab')){
					if(funIdx !== simgTol) {
						btn_swipeinnerImgEvent(targetElement);
					}
				}
			}
			// Right
			else if(swipeFunc.touches.direction == 'right') {
				swipePos = swipeFunc.touches.direction;
				swipeIdx = Number(targetElement.getAttribute('data-num')) - 2;
				innerIdx = swipeIdx;
				var funIdx = swipeIdx + 1;

				if(funIdx !== 0) {
					btn_swipeinnerImgEvent(targetElement);
				}
			}

		};

		if (typeof event !== 'undefined') {
			event.preventDefault();

			switch (event.type) {
				case 'touchstart':
				case 'touchmove':
					touch = event.touches[0];
					swipeFunc.touches[event.type].x = touch.pageX;
					swipeFunc.touches[event.type].y = touch.pageY;
//                                console.log(swipeFunc.touches[event.type].x);
//                                console.log(swipeFunc.touches[event.type].y);

					break;
				case 'mousedown':
				case 'mousemove':
					swipeFunc.touches[event.type].x = event.pageX;
					swipeFunc.touches[event.type].y = event.pageY;


//                                console.log(swipeFunc.touches[event.type].x);
//                                console.log(swipeFunc.touches[event.type].y);

					break;
				case 'touchend':
					// touches[event.type] = true;
					if (swipeFunc.touches.touchstart.x > -1 && swipeFunc.touches.touchmove.x > -1) {
						swipeFunc.touches.direction = swipeFunc.touches.touchstart.x < swipeFunc.touches.touchmove.x ? "right" : "left";
						endAction(this);
					}
					break;
				case 'mouseup':
					  if (swipeFunc.touches.mousedown.x > -1 && swipeFunc.touches.mousemove.x > -1) {
						swipeFunc.touches.direction = swipeFunc.touches.mousedown.x < swipeFunc.touches.mousemove.x ? "right" : "left";
						endAction(this);
						//alert('up!');
					}
					break;
			}

		}
	},

	init: function() {
		var sprew = document.querySelectorAll('.sprew');
		for(var i = 0; i < sprew.length; i++) {
			sprew[i].addEventListener('touchstart', swipeFunc.touchHandler, false);
			sprew[i].addEventListener('touchmove', swipeFunc.touchHandler, false);
			sprew[i].addEventListener('touchend', swipeFunc.touchHandler, false);
			sprew[i].addEventListener('mousedown', swipeFunc.touchHandler, false);
			sprew[i].addEventListener('mousemove', swipeFunc.touchHandler, false);
			sprew[i].addEventListener('mouseup', swipeFunc.touchHandler, false);

		}
	}
};



// 모바일(스와이프) 좌/우 이동 이벤트
function btn_swipeinnerImgEvent(targetElement) {
		var topClass = targetElement.parentNode.parentNode.parentNode.parentNode,

		innerPrevBtn = topClass.querySelector('.innerPrevBtn'),
		innerNextBtn = topClass.querySelector('.innerNextBtn'),
		innerBtn = topClass.querySelectorAll('.innerBtn'),
		sliderTab = topClass.querySelector('.sliderTab'),
		simgUL = topClass.querySelectorAll('.simgUL'),
		sprew = topClass.querySelectorAll('.sprew'),
		simg = topClass.querySelectorAll('.simg'),
		sliderDotTab = topClass.querySelectorAll('.sliderDotTab'),
		sliderDot = topClass.querySelectorAll('.sliderDot');
		var isArray =  topClass.getAttribute('data-num')-1;
		idxArray[isArray] = innerIdx;

	if(innerIdx == 0) {
		innerPrevBtn.style.opacity = '0.3';
		innerPrevBtn.style.pointerEvents = 'none';
		innerNextBtn.style.opacity = '1';
		innerNextBtn.style.pointerEvents = 'auto';
	}
	else {
		innerNextBtn.style.opacity = '1';
		innerNextBtn.style.pointerEvents = 'auto';
		innerPrevBtn.style.opacity = '1';
		innerPrevBtn.style.pointerEvents = 'auto';
	}
	if(targetElement.parentNode.parentNode.nextElementSibling.classList.contains('sliderTab')){
		var count = Number(sliderTab.getAttribute('data-count'));
		var dns = innerIdx;
		var dnc = dns - count;
		if(innerIdx == (simg.length - 1)) {
			innerNextBtn.style.opacity = '0.3';
			innerNextBtn.style.pointerEvents = 'none';
		}
		for(var i = 0; i < simg.length; i++) {
			simg[i].childNodes[0].classList.remove('tabView');
			simg[innerIdx].childNodes[0].classList.add('tabView');
		}
		if(innerIdx > count - 1) {
			simg[innerIdx-count].classList.add('displayN');
		}
		if(simg[innerIdx].className.indexOf('displayN') != -1) {
			simg[innerIdx].classList.remove('displayN');
		}
	}
	if(targetElement.parentNode.parentNode.nextElementSibling.classList.contains('sliderDotTab')){
		for(var j = 0; j < sliderDot.length; j++) {
			sliderDot[j].classList.remove('tabView');
			sliderDot[innerIdx].classList.add('tabView');
		}
		if(innerIdx == (sliderDot.length - 1)) {
			innerNextBtn.style.opacity = '0.3';
			innerNextBtn.style.pointerEvents = 'none';
			// simgcom = simg.length - 1;
		}
	}
	for(var i = 0; i < sprew.length; i++) {
		sprew[i].style.display = 'none';
		sprew[innerIdx].style.display = 'block';
		// console.log(sprew[innerIdx])
	}
}


// 섬네일 선택 이미지 이동 이벤트
function btn_innerImgEvent() {
	var topClass = this.classList.contains('sliderDot') ? this.parentNode.parentNode.parentNode :this.parentNode.parentNode.parentNode.parentNode ;
	var innerPrevBtn = topClass.querySelector('.innerPrevBtn'),
		innerNextBtn = topClass.querySelector('.innerNextBtn'),
		innerBtn = topClass.querySelectorAll('.innerBtn'),
		sliderTab = topClass.querySelector('.sliderTab'),
		simgUL = topClass.querySelectorAll('.simgUL'),
		sprew = topClass.querySelectorAll('.sprew'),
		simg = topClass.querySelectorAll('.simg')
		sliderDotTab = topClass.querySelector('.sliderDotTab'),
		sliderDot = topClass.querySelectorAll('.sliderDot');
		var isArray = topClass.getAttribute('data-num')-1;
		innerIdx = this.getAttribute('data-num')-1;
		idxArray[isArray] = innerIdx;

		// var num = this.getAttribute('data-num');
		// innerIdx = Number(num) - 1;
		imgLen = innerIdx + 1;
	if(innerIdx == 0) {
		innerPrevBtn.style.opacity = '0.3';
		innerPrevBtn.style.pointerEvents = 'none';
		innerNextBtn.style.opacity = '1';
		innerNextBtn.style.pointerEvents = 'auto';
	} else {
		innerNextBtn.style.opacity = '1';
		innerNextBtn.style.pointerEvents = 'auto';
		innerPrevBtn.style.opacity = '1';
		innerPrevBtn.style.pointerEvents = 'auto';
	}
	for(var i = 0; i < sprew.length; i++) {
		sprew[i].style.display = 'none';
		sprew[innerIdx].style.display = 'block';
	}
	if(sliderTab !== null){
		if(innerIdx == (simg.length - 1)) {
			innerNextBtn.style.opacity = '0.3';
			innerNextBtn.style.pointerEvents = 'none';
			simgcom = simg.length - 1;
		}

		for(var i = 0; i < simg.length; i++) {
			simg[i].childNodes[0].classList.remove('tabView');
			simg[innerIdx].childNodes[0].classList.add('tabView');
		}
	}
	// 도트 이미지 슬라이드
	if(sliderDotTab !== null){
		if(innerIdx == (sliderDot.length - 1)) {
			innerNextBtn.style.opacity = '0.3';
			innerNextBtn.style.pointerEvents = 'none';
			// simgcom = simg.length - 1;
		}
		for(var j = 0; j < sliderDot.length; j++) {
			sliderDot[j].classList.remove('tabView');
			sliderDot[innerIdx].classList.add('tabView');
		}
	}

}


// 버튼 좌/우 이동 이벤트
function btn_innerPageMove() {
	var innerBox = this.parentNode.querySelector('.innerBox'),
		sliderTab = this.parentNode.querySelector('.sliderTab'),
		innerPage = this.parentNode.querySelectorAll('.innerPage'),
		innerBtn = this.parentNode.querySelectorAll('.innerBtn'),
		innerPrevBtn = this.parentNode.querySelector('.innerPrevBtn'),
		innerNextBtn = this.parentNode.querySelector('.innerNextBtn'),
		simgUL = this.parentNode.querySelectorAll('.simgUL'),
		sprew = this.parentNode.querySelectorAll('.sprew'),
		simg = this.parentNode.querySelectorAll('.simg'),
		sliderDotTab = this.parentNode.querySelector('.sliderDotTab'),
		sliderDot = this.parentNode.querySelectorAll('.sliderDot');
		var isArray = this.parentNode.getAttribute('data-num')-1;

		innerIdx = idxArray[isArray];
	var	objBtn = this.getAttribute('class').split(' ')[0];

	for(var i = 0; i < sprew.length; i++){
		if(sprew[i].style.display=='block'){
		}
	}

	// 다음 페이지 -------------
	if(objBtn == 'innerNextBtn') {
		innerIdx++;

		imgLen = innerIdx + 1;
		idxArray[isArray] = innerIdx;

		if(idxArray[isArray] > 0) {
			innerNextBtn.style.opacity = '1';
			innerNextBtn.style.pointerEvents = 'auto';
			innerPrevBtn.style.opacity = '1';
			innerPrevBtn.style.pointerEvents = 'auto';
		}
		for(var i = 0; i < sprew.length; i++) {
			sprew[i].style.display = 'none';
			sprew[idxArray[isArray]].style.display = 'block';
		}

		if(sliderTab !== null){
			var count = Number(sliderTab.getAttribute('data-count'));
			var dns = innerIdx;
			var dnc = dns - count;
			var	tablen = simg.length;

			if(imgLen == tablen) {
				innerNextBtn.style.opacity = '0.3';
				innerNextBtn.style.pointerEvents = 'none';
			}
			if(innerIdx > count - 1) {
				simg[innerIdx-count].classList.add('displayN');
			}
			for(var j = 0; j < simg.length; j++) {
				simg[j].childNodes[0].classList.remove('tabView');
				simg[innerIdx].childNodes[0].classList.add('tabView');
			}
		}
		// 도트 이미지 슬라이드
		if(sliderDotTab !== null){
			var dotcount = Number(sliderDotTab.getAttribute('data-dotcount'));
			var	tablen = sliderDot.length;

			if(imgLen == tablen) {
				innerNextBtn.style.opacity = '0.3';
				innerNextBtn.style.pointerEvents = 'none';
			}
			for(var j = 0; j < sliderDot.length; j++) {
				sliderDot[j].classList.remove('tabView');
				sliderDot[innerIdx].classList.add('tabView');

			}
		}
	}

	// 이전 페이지 -------------
	else {
		innerIdx --;
		imgLen = innerIdx + 1;
		idxArray[isArray] = innerIdx;

		if(innerIdx == 0) {
			innerPrevBtn.style.opacity = '0.3';
			innerPrevBtn.style.pointerEvents = 'none';
			innerNextBtn.style.opacity = '1';
			innerNextBtn.style.pointerEvents = 'auto';
		} else {
			innerNextBtn.style.opacity = '1';
			innerNextBtn.style.pointerEvents = 'auto';
			innerPrevBtn.style.opacity = '1';
			innerPrevBtn.style.pointerEvents = 'auto';
		}
		for(var i = 0; i < sprew.length; i++) {
			sprew[i].style.display = 'none';
			sprew[innerIdx].style.display = 'block';
		}
		if(sliderTab !== null){
			var count = Number(sliderTab.getAttribute('data-count'));
			var dns = innerIdx;
			var dnc = dns - count;

			if(simg[innerIdx].className.indexOf('displayN') != -1) {
				simg[innerIdx].classList.remove('displayN');
			}
			for(var j = 0; j < simg.length; j++) {
				simg[j].childNodes[0].classList.remove('tabView');
				simg[innerIdx].childNodes[0].classList.add('tabView');
			}

		}
		if(sliderDotTab !== null){
			var dotcount = Number(sliderDotTab.getAttribute('data-dotcount'));

			for(var j = 0; j < sliderDot.length; j++) {
				sliderDot[j].classList.remove('tabView');
				sliderDot[innerIdx].classList.add('tabView');
			}
		}
	}
	//
	// innerPageArray = [];
	// innerPageArray.push(innerIdx);
}

// 이너페이지 + 팝업 탭 & 이너페이지
function slider(){
	var slideBox = document.querySelectorAll('.slideBox');
	for(var i = 0; i < slideBox.length; i++){
		slideBox[i].eachApplication();
	}
}

Object.prototype.eachApplication = function(){
	var _this = this;
	_this._item = new createSlide(_this);

	_this._item.left.addEventListener('mouseup', function(){
		_this._item.leftMove();
	});

	_this._item.right.addEventListener('mouseup', function(){
		_this._item.rightMove();
	});

	for(var i = 0; i < _this._item.dot.length; i++){
		_this._item.dot[i].addEventListener('mouseup', function(){
			_this._item.dotMove(this);
		});
	}

	if(_this._item.isTab){
		for(var i = 0; i < _this._item.tabBtn.length; i++){
			_this._item.tabBtn[i].addEventListener('mouseup', function(){
				_this._item.tabChange(this);
			});
		}
	}
	if(_this.parentNode.classList.contains('popbox')){
	   _this.popClose =  _this.parentNode.querySelector('.popclosebtn');
 // 	   console.log(_this.popClose)
		_this.popClose.addEventListener('mousedown', function(){
			_this._item.reset();
	   });
	}

};


function createSlide(_slide){
	_this = _slide;

	this.color = _this.getAttribute("data-color");
	this.isDot = ( _this.getAttribute("data-dotted") == "yes" ) ? true: false;
	this.isTab = _this.querySelector('.slideTab') !== null ? true: false;
	this.tabBtn = this.isTab ? _this.querySelector('.slideTab').children : '';
	this.isMotion = _this.getAttribute("data-motion");
	this.tab = _this.querySelector('.slideSet').children;
	this.totalIndex = this.tab.length;
	this.index = 0;
	this.oldIndex;
	this.vidoeStop = ( _this.getAttribute("data-vidoeStop") == "false" ) ? false: true;//

	this.tab[0].style.display = 'inline-block';
	this.tab[0].style.opacity = 1;


	var leftBtn = document.createElement('div');
	var rightBtn = document.createElement('div');

	leftBtn.setAttribute('class', 'slideBtn prev');
	rightBtn.setAttribute('class', 'slideBtn next');

	_this.appendChild(leftBtn);
	_this.appendChild(rightBtn);

	this.left = _this.querySelector(".slideBtn.prev");
	this.right = _this.querySelector(".slideBtn.next");

	this.left.style.display = 'none';

	/*dot*/
	var dotBox = document.createElement('ul'),
		str = '';

	dotBox.setAttribute('class', 'dotBox');
	for(var i = 0; i < this.totalIndex; i++){
		str += '<li></li>';
	}
	dotBox.innerHTML = str;

	_this.appendChild(dotBox);

	this.dot = _this.querySelectorAll('.dotBox li');
	this.dot[0].classList.add('tabView');

	/*tabBtn*/
	this.tabChange = function(target){
		this.index = Array.prototype.indexOf.call(this.tabBtn, target);
		this.changeEvent();
	};

	this.dotMove = function(target){
		this.index = Array.prototype.indexOf.call(this.dot, target);
		this.changeEvent();
	};

	this.leftMove = function(){
		this.index--;
		this.changeEvent();
	};
	this.rightMove = function(){
		this.index++;
		this.changeEvent();
	};

	this.changeEvent = function(){
		/*좌우 버튼*/
		if(this.index == 0){
			this.left.style.display ='none';
			this.right.style.display = 'block';
		}else if(this.index == this.totalIndex-1){
			this.right.style.display = 'none';
			this.left.style.display = 'block';
		}else{
			this.left.style.display = 'block';
			this.right.style.display = 'block';
		}

		/*도트*/
		for(var i = 0 ; i < this.dot.length; i++){
			this.dot[i].classList.remove('tabView');
		}
		this.dot[this.index].classList.add('tabView');

		/*안에 div*/
		for(var i = 0 ; i < this.tab.length; i++){
			this.tab[i].style.display = 'none';
			this.tab[i].style.opacity = 0;
		}
		this.tab[this.index].style.display = 'inline-block';
		this.tab[this.index].style.opacity = 1;

		/*탭버튼*/
		if(this.isTab){
			for(var i = 0;  i < this.tabBtn.length; i++){
				this.tabBtn[i].classList.remove('tabView');
			}
			this.tabBtn[this.index].classList.add('tabView');
		}

	};

	this.reset = function(){
		this.left.style.display = 'none';
		this.right.style.display = 'block';

		for(var i = 0; i < this.tab.length; i++){
			this.tab[i].style.opacity = 0;
			this.tab[i].style.display = 'none';
		}

		this.tab[0].style.opacity = 1;
		this.tab[0].style.display = 'inline-block';
		for(var i = 0; i < this.dot.length; i++){
			this.dot[i].classList.remove('tabView');
		}
		this.dot[0].classList.add('tabView');

		if(this.isTab){
			for(var i = 0;  i < this.tabBtn.length; i++){
				this.tabBtn[i].classList.remove('tabView');
			}
			this.tabBtn[0].classList.add('tabView');
		}
	};

}

// 위치 찍기
function showObjFn(){
	if(document.querySelectorAll('.clickObjArea').length > 0){
		var clickArea = document.querySelectorAll('.clickObjArea');
		for(var i = 0; i < clickArea.length; i++){
			clickArea[i].addEventListener('mousedown', showObjEv);
		}
	}
}
function showObjEv(){
	var isObj = document.createElement('div');
		isObj.className = 'showObj';

	var x = event.offsetX;
	var y = event.offsetY;
	var width = document.querySelector('.clickObjArea').offsetWidth;
	var height = document.querySelector('.clickObjArea').offsetHeight;

	isObj.style.top = (y-15) + "px";
	isObj.style.left = (x-17) + "px";
	this.appendChild(isObj);

	if((x > width || y > height) || (x <= 30 && y <= 30) ) {
		this.removeChild(isObj);
	}

	if(this.childNodes.length > 0) {
		var isObj = this.querySelectorAll('.showObj');

		for(var j = 0; j < isObj.length; j++){
			isObj[j].addEventListener('mousedown', showObjClickEv);
		}

		if(document.querySelectorAll('.resetObj').length > 0 ){
			var isResetObj = document.querySelectorAll('.resetObj');
			for(var k = 0; k < isResetObj.length; k++){
				isResetObj[k].addEventListener('mousedown', showObjReset);
			}
		}
	}
}
function showObjClickEv(){
	this.parentNode.removeChild(this);
}
function showObjReset(){
	var isObj = document.querySelectorAll('.showObj');
	for(var k = 0; k < isObj.length; k++){
		isObj[k].parentNode.removeChild(isObj[k]);
	}
}


function snycFlusSound(){
	var contentsArea = document.querySelector('.contentsArea'),
		soundBtn = document.querySelectorAll('.soundBtn'),
		sync = document.querySelectorAll('.sync'),
		characterFlag = document.querySelector('.character') !== null ? true : false,
		character = characterFlag ? document.querySelectorAll('.character') : '';

	for( var i = 0; i < soundSrc.sound.length; i++){
		var sound = document.createElement('audio');
		sound.className = 'sound_'+(i+1);
		sound.src = soundSrc.folder + soundSrc.sound[i]+'.mp3';
		contentsArea.appendChild(sound);
	}

	var audio = document.querySelectorAll('[class*="sound_"');

		for(var i = 0; i < audio.length; i++){
			soundBtn[i].addEventListener('mouseup', startSound);
			audio[i].addEventListener('timeupdate', syncControl);
		}

	function startSound(){
		var soundNum = this.getAttribute('data-num');

		if(this.classList.contains('play')){
			this.classList.remove('play');
			audio[soundNum-1].pause();
			audio[soundNum-1].currentTime = 0;
			if(characterFlag){
				character[soundNum-1].querySelector('img').src = character[soundNum-1].querySelector('img').getAttribute('data-site')+'.png';
			}
		}else{
			for(var j = 0; j < audio.length; j++){
				soundBtn[j].classList.remove('play');
				audio[j].pause();
				audio[j].currentTime = 0;
			}
			if(characterFlag){
				for(var j = 0; j < character.length; j++){
					character[j].querySelector('img').src = character[j].querySelector('img').getAttribute('data-site')+'.png';
				}

				setTimeout(function(){
					character[soundNum-1].querySelector('img').src =
					character[soundNum-1].querySelector('img').getAttribute('data-site')+'.gif';
					// character.querySelector('img').src = character.querySelector('img').getAttribute('site') + '.gif';
				},20);
			}
			this.classList.add('play');
			audio[soundNum-1].play();

		}
	}

	function syncControl(){
		var soundNum = Array.prototype.indexOf.call(audio, this);

		if(this.currentTime == this.duration){
			this.pause();
			this.currentTime = 0;
			soundBtn[Array.prototype.indexOf.call(audio, this)].classList.remove('play');

			if(characterFlag){
				character[soundNum].querySelector('img').src = character[soundNum].querySelector('img').getAttribute('data-site')+'.png';
			}
		}

		var curt = Number(this.currentTime).toFixed(3);
		if(sync.length > 1){
			for(var j = 0; j < snycArray.length; j++){
				var start = snycArray[j];
				var end = snycArray[j+1] !== undefined ? snycArray[j+1] : this.duration;

				if(0 <= curt && curt < snycArray[0]){
					for(var i = 0; i < sync.length; i++){
						sync[i].style.display = 'none';
					}
					sync[0].style.display = 'block';
				}else if(start <= curt && curt < end){
					for(var i = 0; i < sync.length; i++){
						sync[i].style.display = 'none';
					}
					sync[j+1].style.display = 'block';
				}

			}
		}
	}

}
