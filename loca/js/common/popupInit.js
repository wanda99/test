
/*****************************************************************************************/

var pop, poprole, popani;
var popupCount = 0, popupIdx = 0;

function popup_init () {
	var popbtn = QSAll('.popbtn');

	if(popbtn !== null) {
		for(var i = 0; i < popbtn.length; i++) {
			popbtn[i].addEventListener('mousedown', popupCheck_openPopup)
		}
	}
}

// popup check : open
function popupCheck_openPopup (e) {
	var popbtn = QSAll('.popbtn'),
		wrap = document.querySelector('#wrap'),
		popbox = document.querySelectorAll('.popbox');

		for(var k = 0; k < popbtn.length; k++) {
			popbtn[k].style.pointerEvents = 'none';
		}
		for(var j = 0; j < popbox.length; j++){
			if(popbox[j].querySelectorAll('.popbtn').length > 0){
				var innerPopbtn = popbox[j].querySelectorAll('.popbtn');
				if(popbox[j].classList.contains('view')){
					for(var e = 0; e < innerPopbtn.length; e++){
						innerPopbtn[e].style.pointerEvents = 'none';
					}

				}else{
					for(var e = 0; e < innerPopbtn.length; e++){
						innerPopbtn[e].style.pointerEvents = 'auto';
					}
				}
			}
		}

	// 20170821 : 수정
	// data-role 추가
	pop = this.getAttribute('data-pop');
	poprole = this.getAttribute('data-role');
	popani = this.getAttribute('data-ani');
	imgSlide = this.getAttribute('data-slide');

	if(pop == 'role') {
		var rolepopbox = document.querySelectorAll('.rolepopbox');
		rolepopbox[poprole].classList.add('view');

		rolepopbox[poprole].getElementsByClassName('popclosebtn')[0].addEventListener('mousedown', popupCheck_closePopup);
	}
    // 애니
	else if(pop == 'ani') {
		var anipopbox = document.querySelectorAll('.anipopbox');
		anipopbox[popani].classList.add('view');

		anipopbox[popani].getElementsByClassName('popclosebtn')[0].addEventListener('mousedown', popupCheck_closePopup);
	}
    //이미지 슬라이드
    else if(imgSlide !== null){
            popupCount = this.getAttribute('data-popslide');
        var slidepopbox = document.querySelectorAll('.slidepopbox')[popupCount-1],
            popbtn = document.querySelectorAll('.popbtn'),
        	imgContents = slidepopbox.querySelectorAll('.imgContents'),
            popclosebtn = createElement('div', slidepopbox, 'popclosebtn'),
            target = this;

        slidepopbox.classList.add('view');
        popupIdx = Number(target.getAttribute('data-slide')-1);

        for(var i = 0; i < imgContents.length; i++) {
            imgContents[i].style.display = 'none';
        }
        imgContents[popupIdx].style.display = 'block';

        if(imgContents.length > 1){
        var innerPrevBtn = createElement('div', slidepopbox, 'innerPrevBtn innerBtn'),
            innerNextBtn = createElement('div', slidepopbox, 'innerNextBtn innerBtn'),
            sliderDotBox = slidepopbox.querySelector('.sliderDotBox');

        // 슬라이드 : 도트 생성
        var sliderDot = sliderDotBox.querySelectorAll('.sliderDotBox > li');
            for(var i = 0; i < sliderDot.length; i++){
                sliderDot[i].setAttribute('data-dotNum', i+1);
                sliderDot[i].addEventListener('mousedown', popupSlideMoveEv);
                // console.log(sliderDot[i])
            }
            sliderDot[popupIdx].classList.add('tabView');

            innerPrevBtn.style.display = 'none';
    		innerNextBtn.style.display = 'block';

            var innerBtn = slidepopbox.querySelectorAll('.innerBtn');

            for(var i = 0; i < innerBtn.length; i++) {
    			innerBtn[i].addEventListener('mousedown', popupSlideMoveEv);
    		}
            popupBtnControlEv();
        }
        popclosebtn.addEventListener('mousedown', popupSlideCloseEv);
    }
	else {
		QS('.' + pop + 'popbox').classList.add('view');

		QS('.' + pop + 'popbox .popclosebtn').addEventListener('mousedown', popupCheck_closePopup);

	}
}

// 이미지 슬라이드 도트 이벤트
function popupSlideMoveEv(){
    var	slidepopbox = QSAll('.slidepopbox')[popupCount-1],
		imgContents = slidepopbox.querySelectorAll('.imgContents');

	if(this.classList.contains('innerBtn'))	popupIdx = this.className.indexOf('innerNextBtn')>-1 ? popupIdx+1 : popupIdx-1;
	else popupIdx = this.getAttribute('data-dotNum')-1;

 	for(var i=0; i<imgContents.length; i++){
 		imgContents[i].style.display ='none';
 	}
 	popupBtnControlEv();
}
function popupBtnControlEv(){
    var slidepopbox = QSAll('.slidepopbox')[popupCount-1],
        imgContents = slidepopbox.querySelectorAll('.imgContents'),
        innerPrevBtn = slidepopbox.querySelector('.innerPrevBtn'),
        innerNextBtn = slidepopbox.querySelector('.innerNextBtn'),
        sliderDot = slidepopbox.querySelectorAll('.sliderDotBox > li');

    imgContents[popupIdx].style.display = 'block';

    if(popupIdx === 0){
        innerPrevBtn.style.display = 'none';
        innerNextBtn.style.display = 'block';
    }else if(popupIdx == imgContents.length-1){
        innerPrevBtn.style.display = 'block';
        innerNextBtn.style.display = 'none';
    }else{
        innerPrevBtn.style.display = 'block';
        innerNextBtn.style.display = 'block';
    }

    for(var i = 0; i < sliderDot.length; i++){
        sliderDot[i].classList.remove('tabView');
    }
    sliderDot[popupIdx].classList.add('tabView');
}

function popupSlideCloseEv(){
    var slidepopbox = document.querySelectorAll('.slidepopbox')[popupCount-1],
        sliderDotBox = slidepopbox.querySelector('.sliderDotBox'),
        sliderDot = sliderDotBox.querySelectorAll('.sliderDotBox > li');
    var popbtn = QSAll('.popbtn');

    slidepopbox.classList.remove('view');
    for(var k = 0; k < popbtn.length; k++) {
		popbtn[k].style.pointerEvents = 'auto';
	}
    if(slidepopbox.querySelectorAll('.innerBtn').length>0){
        slidepopbox.querySelector('.innerPrevBtn').parentNode.removeChild(slidepopbox.querySelector('.innerPrevBtn'));
        slidepopbox.querySelector('.innerNextBtn').parentNode.removeChild(slidepopbox.querySelector('.innerNextBtn'));
    }
    	this.parentNode.removeChild(this);
}
// popup check : close
function popupCheck_closePopup (e) {
	var popbtn = QSAll('.popbtn');
	var ansCheck = document.querySelectorAll('.ansCheck');

	for(var k = 0; k < popbtn.length; k++) {
		if(popbtn[k].classList.contains('ansCheck')){
			if(popbtn[k].className.indexOf('reset') != -1){
				popbtn[k].className = popbtn[k].className.replace('reset','answer');
				var quizAnswer = document.querySelectorAll('.quizAnswer');
				for(var i = 0; i < quizAnswer.length; i++){
					quizAnswer[i].style.display = 'none';
				}
			}
			// console.log(popbtn[k].classList.contains('reset'))

		}
		popbtn[k].style.pointerEvents = 'auto';
	}
	this.parentNode.classList.remove('view');
	resetPop();
}


function resetPop () {
	// textAudio.pause();
	// resetTextColor();

	if(QSAll('.buttonsound').length > 0) {
		var buttonsound = QSAll('.buttonsound');
		for(var i = 0; i < buttonsound.length; i++){
			buttonsound[i].querySelector('audio').pause();
			buttonsound[i].querySelector('audio').currentTime = 0;
			buttonsound[i].classList.remove('pause');
			buttonsound[i].classList.add('play');
		}
	}


	// 20170821 : 수정
	// videoWrap 추가
	if(QSAll('.videoWrap').length > 0) {
		var videoWrap = QSAll('.videoWrap'),
			popbox = QSAll('.popbox'),
			anipopbox = QSAll('.anipopbox'),
			rolepopbox = QSAll('.rolepopbox');


		if(QSAll('.videoContainer').length > 0) {
			if(pop == 'role') {
				rolepopbox[poprole].querySelector('#vdo').pause();
				rolepopbox[poprole].querySelector('#vdo').currentTime = 0;
				setTimeout(function () {
					rolepopbox[poprole].querySelector('.videoWrap').style.visibility = 'hidden';
					rolepopbox[poprole].querySelector('.videoContainer').parentNode.removeChild(rolepopbox[poprole].querySelector('.videoContainer'));
				}, 150);
			} else if(pop == 'ani') {
				anipopbox[popani].querySelector('#vdo').pause();
				anipopbox[popani].querySelector('#vdo').currentTime = 0;
				setTimeout(function () {
					anipopbox[popani].querySelector('.videoWrap').style.visibility = 'hidden';
					anipopbox[popani].querySelector('.videoContainer').parentNode.removeChild(anipopbox[popani].querySelector('.videoContainer'));
				}, 150);
			}

			setTimeout(function () {
				soundFlag = false;
				vdoFlag = false;
				fullFlag = false;
				screenFlag = false;
				blockSeek = false;
			}, 150);
		}

	}
}
