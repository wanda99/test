/*****************************
생성일 : 2017-08-10
설명 : 모든 문제 공통 js
		- 단일 선다형
		- 다중 선다형
		- O/X
		- input 정답
*******************************/

// 최초 실행되는 기능. 퀴즈번호와 퀴즈 유형을 넙김니다.
function checkCreate() {
	var quiz = document.querySelectorAll('.quiz');

	for (var i = 0; i < quiz.length; i++) {
		var quizType = quiz[i].getAttribute('data-quiztype');
			quizNum = quiz[i].classList[1].split('_')[1];

		set_QUIZ(quizNum, quizType);
	}
}


// 퀴즈번호와 유형별로 각 메소드를 호출 합니다.
function set_QUIZ(qNum, qType) {

	watchProperty();

	if (new String(qType).indexOf(',') > -1) qType = qType.split(',');
	else qType = [qType];

	// 기능 추가 시 function 추가
	for (var i = 0; i < qType.length; i++) {
		switch (qType[i]) {
			case 'selectQuiz': QUIZ_select(qNum); break;
			case 'inputQuiz': QUIZ_input(qNum); break;
			case 'drawLineQuiz': QUIZ_drawLine(qNum); break;
		}
	}
}


// 선다형 문제(단일, 다중)
function QUIZ_select(qNum) {
	var quiz = document.querySelector('.quiz_'+ qNum),
		checkItem = quiz.querySelectorAll('.checkItem'),
		anscheck = quiz.querySelectorAll('.anscheck');
		// hint = document.querySelector('#hint'),
		// hintBox = document.querySelector('#hintBox');

	//문제 선택 event
	for(var i = 0; i < checkItem.length; i++) {
		checkItem[i].addEventListener('mousedown', function(){
			checkCreateEvent(undefined, qNum, this);
		});
	}

	// hintBox.style.display = 'none';
	// hint.addEventListener('mousedown', hintEvent);

	// 답 체크 이벤트
	for(var i = 0; i < anscheck.length; i++) {
		anscheck[i].addEventListener('mousedown', function(){
			anscheckEvent(qNum, this);
		});
	}
}


// **************************************************************************
function watchProperty() {
	if(document.querySelectorAll('.choiceBoxLi').length > 0){
		var choiceBoxList = document.querySelectorAll('.choiceBoxLi'),
		watch = setInterval(function () {
			for (var i = 0; i < choiceBoxList.length; i++) {
				var element = choiceBoxList[i].childNodes[0];
				if (element.checked === true) {
					checkCreateEvent(element.value - 1);
					clearInterval(watch);
				}
			}
		}, 100);
	}
}


// **************************************************************************
//선다형 문제 클릭 이벤트
function checkCreateEvent(index, qNum, target) {
	if(qNum !== undefined){
		var quiz = document.querySelector('.quiz_'+ qNum),
		checkImg = quiz.querySelectorAll('.checkImg'),
		checkItem = quiz.querySelectorAll('.checkItem'),
		choiceBox = quiz.querySelectorAll('.choiceBoxStyle'),
		ans = quiz.getAttribute('data-ans');

		if(index !== undefined || ans.length > 1) {
			//다중 선다형
			num = target.getAttribute('data-num');
			for(var i = 0; i < checkImg.length; i++) {
				if(num == checkImg[i].getAttribute('data-num')) {
					if(target.className.indexOf('checkBold') != -1) {
						// checkImg[i].style.visibility = 'hidden';
						target.classList.remove('checkBold');
						choiceBox[i].checked = false;
					} else {
						checkImg[i].style.visibility = 'visible';
						target.classList.add('checkBold');
						choiceBox[i].checked = true;
					}
				}
			}
		} else {
			//단일 선다형
			for(var i = 0; i < checkImg.length; i++) {
				num = target.getAttribute('data-num');
				checkImg[i].style.visibility = 'hidden';
				checkItem[i].classList.remove('checkBold');
				if(num == checkImg[i].getAttribute('data-num')) {
					checkImg[i].style.visibility = 'visible'; //체크 이미지
					target.classList.add('checkBold');
					choiceBox[i].checked = true;
				}
			}
		}
	}
}


// **************************************************************************
// 선다형 문제 정답 확인 이벤트
function anscheckEvent(qNum, target) {
	var quiz = document.querySelector('.quiz_'+ qNum),
		checkImg = quiz.querySelectorAll('.checkImg'),
		checkItem = quiz.querySelectorAll('.checkItem'),
		choiceBox = quiz.querySelectorAll('.choiceBoxStyle'),
		qCheckImg = quiz.querySelector('.qCheckImg'),
		ans = quiz.getAttribute('data-ans');


	if(target.className.indexOf('answer') != -1) {
		target.className = target.className.replace('answer','reset');
		target.innerHTML = '초기화';

		// add by saltgamer 20170629 for Caliper Sensor
		if (ans.length > 1) {
			var isCorrect = null,
				answer = 0,
				ans = ans.split(','),
				checknum = 0,
				checkArr = [];

			for(var i = 0; i < checkItem.length; i++) {
                if (checkItem[i].className.indexOf('checkBold') != -1) {
                	checkArr.push(i);
                    answer += i;
                }
            }

            // ans값과 checkArr값을 서로 비교
            for(var i = 0; i < ans.length; i++) {
            	for(var j = 0; j < checkArr.length; j++) {
            		if(ans[i] != checkArr[j]) {
            			continue;
					} else {
						checknum += 1;
					}
            	}
           	}

			for(var i = 0; i < checkImg.length; i++) {
				checkItem[i].style.pointerEvents = 'none';
				for(var j = 0; j < ans.length; j++) {
					checkItem[ans[j]].classList.add('ansBold');
					checkImg[ans[j]].style.visibility = 'visible';
					checkImg[ans[j]].childNodes[0].src = 'images/check_answer.png';
				}
			}

            if (ans.length == checknum) {
            	isCorrect = true;
            	qCheckImg.style.visibility = 'visible';
				qCheckImg.innerHTML = '<img alt="" src="images/check_answer.png"/>';
            } else {
            	isCorrect = false;
            	qCheckImg.style.visibility = 'visible';
				qCheckImg.innerHTML = '<img alt="" src="images/check_x.png"/>';
            }

            console.log('정답 : ' + ans);
            console.log('선택 : ' + checkArr);
            console.log('정답(개수) : ' + checknum);
            console.log(isCorrect);

			DTCaliperSensor.fire({
				correct: isCorrect, // 정답 여부입력 [true, false] 중에서 택일
				itemObject: this.parentNode.parentNode, // 해당 문항 객체
				value: ans // 실제 정답 데이터 입력 <correctResponse>에 입력된 값이랑 동일
			});
			// add by saltgamer 20170629 for Caliper Sensor

		} else {

			// 단일 선다형
			var isCorrect = null;
			for(var i = 0; i < checkImg.length; i++) {
				if (checkItem[i].className.indexOf('checkBold') != -1) {
					if (i === parseInt(ans)) {
						isCorrect = true;
						qCheckImg.style.visibility = 'visible';
						qCheckImg.innerHTML = '<img alt="" src="images/check_answer.png"/>';
					} else {
						isCorrect = false;
						qCheckImg.style.visibility = 'visible';
						qCheckImg.innerHTML = '<img alt="" src="images/check_x.png"/>';
					}
				}
				checkItem[i].style.pointerEvents = 'none';
			}

			checkItem[ans].classList.add('ansBold');
			checkImg[ans].style.visibility = 'visible';
			checkImg[ans].childNodes[0].src = 'images/check_answer.png';

			DTCaliperSensor.fire({
				correct: isCorrect, // 정답 여부입력 [true, false] 중에서 택일
				itemObject: target.parentNode.parentNode, // 해당 문항 객체
				value: ans // 실제 정답 데이터 입력 <correctResponse>에 입력된 값이랑 동일
			});
			// add by saltgamer 20170629 for Caliper Sensor
		}

	} else {

		target.className = target.className.replace('reset','answer');
		target.innerHTML = '정답 확인';
		for(var i = 0; i < checkImg.length; i++) {
			checkImg[i].style.visibility = 'hidden';
			checkImg[i].childNodes[0].src = 'images/check_o.png';
			checkItem[i].classList.remove('checkBold');
			checkItem[i].classList.remove('ansBold');
			checkItem[i].style.pointerEvents = 'auto';
			choiceBox[i].checked = false;
		}

		qCheckImg.style.visibility = 'hidden';
		qCheckImg.innerHTML = '';
	}

}


// **************************************************************************
// 정답 입력
function QUIZ_input(qNum) {
	var quiz = document.querySelector('.quiz_'+ qNum),
		inputAnswer = quiz.querySelectorAll('.inputAnswer'),
		anscheck = quiz.querySelectorAll('.anscheck'),
		lineContainer = quiz.querySelectorAll('.lineContainer');

	for(var i = 0; i < inputAnswer.length; i++) {
		inputAnswer[i].style.display = 'none';
	}

	for(var i = 0; i < anscheck.length; i++) {
		anscheck[i].addEventListener('mousedown', function(){
			inputAnscheckEvent(qNum, this);
		});
	}
}


function inputAnscheckEvent(qNum, target) {
	var quiz = document.querySelector('.quiz_'+ qNum),
		checkImg = quiz.querySelectorAll('.checkImg'),
		checkItem = quiz.querySelectorAll('.checkItem'),
		inputAnswer = quiz.querySelectorAll('.inputAnswer'),
		qCheckImg = quiz.querySelector('.qCheckImg');

	var ans = 'html5',
		isCorrect = null,
		inputText = quiz.querySelector('#inputText');

	if (inputText.value === '') {
		isCorrect = null;
	} else if (inputText.value.indexOf(ans) !== -1) {
		isCorrect = true;
		qCheckImg.style.visibility = 'visible';
		qCheckImg.innerHTML = '<img alt="" src="images/check_answer.png"/>';
	} else {
		isCorrect = false;
		qCheckImg.style.visibility = 'visible';
		qCheckImg.innerHTML = '<img alt="" src="images/check_x.png"/>';
	}

	DTCaliperSensor.fire({
		correct: isCorrect, // 정답 여부입력 [true, false] 중에서 택일
		itemObject: target.parentNode.parentNode, // 해당 문항 객체
		value: ans // 실제 정답 데이터 입력 correctResponse에 입력된 값이랑 동일
	});
	// add by saltgamer 20170629 for Caliper Sensor

	if(target.className.indexOf('answer') != -1) {
		target.className = target.className.replace('answer','reset');
		target.innerHTML = '초기화';
		for(var i = 0; i < inputAnswer.length; i++) {
			inputAnswer[i].style.display = 'block';
		}

	} else {
		target.className = target.className.replace('reset','answer');
		target.innerHTML = '정답 확인';
		for(var i = 0; i < inputAnswer.length; i++) {
			inputAnswer[i].style.display = 'none';
		}

		inputText.value = '';
		qCheckImg.style.visibility = 'hidden';
		qCheckImg.innerHTML = '';
	}
}


function getRealOffsetTop (o)  { return o ? o.offsetTop + getRealOffsetTop(o.offsetParent) : 0; }
function getRealOffsetLeft (o) { return o ? o.offsetLeft + getRealOffsetLeft(o.offsetParent) : 0; }
// **************************************************************************
// 선 긋기 문제
function QUIZ_drawLine(qNum) {
	var quiz = document.querySelector('.quiz_'+ qNum),
		container = quiz.querySelectorAll('.lineContainer'),
		anscheck = quiz.querySelectorAll('.anscheck');
	if(container.length > 0){
		QUIZ_drawLineEv(qNum);
	}else{
		return;
	}

	for(var i = 0; i < anscheck.length; i++){
		anscheck[i].addEventListener('mousedown', function(){
			lineDrawAnsCheckFn(qNum, this);
		});
	}

}
function QUIZ_drawLineEv(qNum) {
	var quiz = document.querySelector('.quiz_'+ qNum),
		container = quiz.querySelector('.lineContainer'),
		ulLeft = container.querySelector('.leftArea'),
		ulRight = container.querySelector('.rightArea'),
		liLeft = ulLeft.querySelectorAll('li'),
		liRight = ulRight.querySelectorAll('li'),
		Start = null, End = null;
	var sConnect = 1;
    var eConnect = 1;

		for(var i = 0; i < liLeft.length; i++){
			liLeft[i].setAttribute('data-scode', sConnect);
			sConnect++;
			liLeft[i].addEventListener('mousedown', function(){

				Start = this;

				for(var i = 0; i < liLeft.length; i++){
					liLeft[i].style.color = '#000000';
				}
				this.style.color = 'blue';
				easeResult();
			});
		}

		for(var i = 0; i < liRight.length; i++){
			liRight[i].setAttribute('data-ecode', eConnect);
			eConnect++;
			liRight[i].addEventListener('mousedown', function(){

				End = this;

				for(var i = 0; i < liRight.length; i++){
					liRight[i].style.color = '#000000';
				}
				this.style.color = 'blue';
				easeResult();

			});
		}

	function easeResult(){
		if(Start !== null & End !== null){
			var EndNum = End.getAttribute('data-ecode');
			var StartNum = Start.getAttribute('data-scode');
			if(ulLeft.querySelector('li[data-set="'+EndNum+'"]') !== null){
				ulLeft.querySelector('li[data-set="'+EndNum+'"]').removeAttribute('data-set');
			}

			if(ulRight.querySelector('li[data-set="'+StartNum+'"]') !== null){
				ulRight.querySelector('li[data-set="'+StartNum+'"]').removeAttribute('data-set');
			}

			Start.setAttribute('data-set', EndNum);
			End.setAttribute('data-set', StartNum);
			reDraw();

			Start = null, End = null;
		}

	}


	function reDraw() {
		var allLi = container.querySelectorAll('li');

		for(var i = 0; i < allLi.length; i++){
			allLi[i].style.color = '#000000';
		}
		context.clearRect(0, 0, canvas.width, canvas.height);

		for(var i = 0; i < liRight.length; i++){
			liRight[i].removeAttribute('data-set');
		}
		for(var i = 0; i < liLeft.length; i++){
			if(liLeft[i].getAttribute('data-set')){
				var endNum = liLeft[i].getAttribute('data-set');
				setLine(liLeft[i], liRight[endNum-1]);
			}
		}

	}
	var canvas = container.querySelector('canvas');
	var context = canvas.getContext('2d');
	context.lineWidth = 3;
	context.strokeStyle = "#000000";

	function setLine(StartObj, EndObj){
		var startTop = StartObj.offsetTop;
		var endTop = EndObj.offsetTop;

		context.beginPath();
		context.moveTo(0, startTop + 5);
		context.lineTo(canvas.width, endTop + 5);
		context.stroke();

	}

}

function lineDrawAnsCheckFn(qNum, target){
	var quiz = document.querySelector('.quiz_'+ qNum),
		container = document.querySelector('.lineContainer'),
		ulLeft = container.querySelector('.leftArea'),
		ulRight = container.querySelector('.rightArea'),
		liLeft = ulLeft.querySelectorAll('li'),
		liRight = ulRight.querySelectorAll('li');
	var canvas = container.querySelector('canvas');
	var answer = true;
	console.log()

	// 정답 리셋 부분
	if(document.querySelector('.dapCanvas') !== null){
		var dapCanvas = document.querySelector('.dapCanvas');
		dapCanvas.classList.remove('view');
		dapCanvas.parentNode.removeChild(dapCanvas);
	}else{
	// 정답 버튼 눌렀을 때
		var dapCanvas = document.createElement('canvas');
		dapCanvas.className = 'dapCanvas';
		dapCanvas.width = canvas.width;
		dapCanvas.height = canvas.height;
		console.log(dapCanvas.style.top)
		dapCanvas.style.top = canvas.style.top;
		dapCanvas.style.left = canvas.style.left;

		container.appendChild(dapCanvas);


		for(var i = 0; i <liLeft.length; i++){
			var leftLines = liLeft[i];
			var setCode = leftLines.getAttribute('data-set');
			var code = leftLines.getAttribute('data-ans') || leftLines.getAttribute('ans');

			if(code != setCode)
			answer = false;

			setAnsLine(leftLines, ulRight.querySelector('li[data-ecode="'+code+'"]'))
		}

	}

	function setAnsLine(StartObj, EndObj){
		var startTop = StartObj.offsetTop;
		var endTop = EndObj.offsetTop;

		var dapContext = dapCanvas.getContext("2d");
		dapContext.strokeStyle = "#f50247";
		dapContext.lineWidth = 3;

		// dapContext.beginPath();
		dapContext.moveTo(0, startTop + 5);
		dapContext.lineTo(dapCanvas.width, endTop + 5);
		dapContext.stroke();
	}

}
