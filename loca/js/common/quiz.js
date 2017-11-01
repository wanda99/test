/*****************************
수정일 : 2017-08-28
설명 : 모든 문제 공통 js
		- 단일 선다형
		- 다중 선다형
		- O/X
		- input 정답
*******************************/


// 최초 실행되는 기능. 퀴즈번호와 퀴즈 유형을 넙김니다.
function checkCreate() {
	var quiz = document.querySelectorAll('.quiz');

	if(quiz.length > 0) {
		watchProperty();

		for (var i = 0; i < quiz.length; i++) {
			var quizType = quiz[i].getAttribute('data-quiztype');
				quizNum = quiz[i].classList[1].split('_')[1];

			set_QUIZ(quizNum, quizType);
		}

		// 전체 정답
		allDapBtn(quiz);
	}
}


// 퀴즈번호와 유형별로 각 메소드를 호출 합니다.
function set_QUIZ(qNum, qType) {
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
		ansCheck = quiz.querySelectorAll('.ansCheck');

	//문제 선택 event
	for(var i = 0; i < checkItem.length; i++) {
		checkItem[i].addEventListener('mousedown', function(){
			checkCreateEvent(undefined, qNum, this);
		});
	}

	// 답 체크 이벤트
	for(var i = 0; i < ansCheck.length; i++) {
		ansCheck[i].classList.add('answer');
		ansCheck[i].addEventListener('mousedown', function(){
			ansCheckEvent(qNum, this);
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
var quizAns, quizArr;
var quizFlag = false, quizCss = false;
var quizObj = [];


// **************************************************************************
//선다형 문제 클릭 이벤트
function checkCreateEvent(index, qNum, target) {
	if(qNum !== undefined) {
		var quiz = document.querySelector('.quiz_'+ qNum),
			checkItem = quiz.querySelectorAll('.checkItem'),
			checkImg = quiz.querySelectorAll('.checkImg'),
			quizGrop = quiz.querySelectorAll('.quizGrop'),
			choiceBox = quiz.querySelectorAll('.choiceBoxStyle'),
			ans = quiz.getAttribute('data-ans');

		var liNum = (quiz.className.replace(/[^0-9]/g, '') - 1);

		// 다중 선다형
		if(index !== undefined || ans.length > 1) {
			num = target.getAttribute('data-num');

			for(var i = 0; i < checkImg.length; i++) {

				if(num == checkImg[i].getAttribute('data-num')) {

					if(quizGrop.length > 0) {
						for(var j = 0; j < checkItem.length; j++) {
							if(target.getAttribute('data-grop') == checkItem[j].getAttribute('data-grop')) {
								if(target.className.indexOf('dcss') != -1) {
									checkItem[j].classList.remove('checkBorder');
								} else {
									checkItem[j].classList.remove('checkBold');
								}
							}
						}

						if(target.className.indexOf('dcss') != -1) {
							target.classList.add('checkBorder');
						} else {
							target.classList.add('checkBold');
						}
					}

					else {

						if(target.className.indexOf('checkBold') != -1) {
							target.classList.remove('checkBold');
							checkImg[i].style.display="none";
							choiceBox[i].checked = false;
							quizFlag = true;

							if(quizFlag == true) {	// 체크(삭제) 요소 quizObj[liNum]에서 삭제
								var quizsplice = quizObj[liNum].indexOf(String(target.getAttribute('data-num')-1));
								if(quizsplice > -1) quizObj[liNum].splice(quizsplice, 1);
								setTimeout(function () {
									quizFlag = false;
								}, 100);
							}
						} else {
							target.classList.add('checkBold');
							checkImg[i].style.display="block";
							choiceBox[i].checked = true;
						}
					}
				}
			}
		}

		else {

			// 단일 선다형
			for(var i = 0; i < checkImg.length; i++) {
				num = target.getAttribute('data-num');

				checkImg[i].style.display="none";
				checkItem[i].classList.remove('checkBold');
				choiceBox[i].checked = false;

				if(num == checkImg[i].getAttribute('data-num')) {
					if(target.className.indexOf('dcss') == -1) {
						target.classList.add('checkBold');
						checkImg[i].style.display="block";
					}
					choiceBox[i].checked = true;
				}
			}
		}


		// 각 문항 선택요소 quizObj배열에 순차 추가
		if(quizFlag == false) {
			if (quiz.getAttribute('data-choicetype') == 'singleChoice') {
				if(quizObj[liNum].length > 0) {
					quizObj[liNum] = [];
					quizObj[liNum].push(String(target.getAttribute('data-num')-1));
				} else {
					quizObj[liNum].push(String(target.getAttribute('data-num')-1));
				}
			}
			else if (quiz.getAttribute('data-choicetype') == 'multipleChoice') {

				if(quizGrop.length > 0) {
					// 각 문항 quizGrop개수 만큼 빈 배열생성
					if(quizCss == false) {
						for(var j = 0; j < quiz.getElementsByClassName('quizGrop').length; j++) {
							quizObj[liNum].push('');
						}
					}
					// 선택 data-go에 data-num값 추가
					// quizGrop이 2개 이상일 때 각 quizGrop의 첫번째 data-num값에 data-grop값을 차감하여 배열에 적용
					if(target.getAttribute('data-grop') != '1') {
						var quizGrop = document.querySelectorAll('.quizGrop'),
							quizGropCheck = quizGrop[Number(target.getAttribute('data-grop')-1)].getElementsByClassName('checkItem')[0].getAttribute('data-num'),
							dgrop = Number(target.getAttribute('data-grop')) + Number(quizGropCheck) - Number(target.getAttribute('data-grop')),
							dnum = Number(target.getAttribute('data-num'));

						quizObj[liNum].splice(target.getAttribute('data-grop')-1, 1, String(dnum-dgrop));
					} else {
						quizObj[liNum].splice(target.getAttribute('data-grop')-1, 1, String(target.getAttribute('data-num')-1));
					}

					quizCss = true;
				}

				else {

					quizObj[liNum].push(String(target.getAttribute('data-num')-1));

					for(var i=0, len=quizObj[liNum].length; i<len; i++) {
						var checkDobl = 0;
						for(var j=0, len=quizObj[liNum].length; j<len; j++) {
							if(quizObj[liNum][i] != quizObj[liNum][j]) {
								continue;
							} else {
								checkDobl++;
								if(checkDobl>1) {
									spliced = quizObj[liNum].splice(j,1);
								}
							}
						}
					}
				}

			}
		}

	}
}


// **************************************************************************
// 선다형 문제 정답 확인 이벤트
function ansCheckEvent(qNum, target) {
	var quiz = document.querySelector('.quiz_'+ qNum),
		checkImg = quiz.querySelectorAll('.checkImg'),
		checkItem = quiz.querySelectorAll('.checkItem'),
		choiceBox = quiz.querySelectorAll('.choiceBoxStyle'),
		quizGrop = quiz.querySelectorAll('.quizGrop'),
		qCheckImg = quiz.querySelector('.qCheckImg'),
		quizAns = quiz.getAttribute('data-ans');

	var liNum = (quiz.className.replace(/[^0-9]/g, '') - 1);


	if(target.className.indexOf('answer') != -1) {
		target.className = target.className.replace('answer','reset');

		if(quizAns == null) {
			quiz.getElementsByClassName('quizAnswer')[0].style.display="none";
		}
		else {
			// 다중 선다형
			if (quizAns.length > 1) {
				var isCorrect = null,
					quizAns = quizAns.split(',');

				if(quiz.getAttribute('data-choicetype') == 'multipleChoice') {

					if(quizAns.length == quizObj[liNum].length) {
						var ansIdx = 0;

						for(var i = 0; i < quizAns.length; i++) {

							// 각 checkItem요소 dcss클래스(CSS형) 여부 체크
							if(quizGrop.length > 0) {
								if(checkItem[i].className.indexOf('dcss') != -1) {
									if(quizAns[i] == quizObj[liNum][i]) {
										ansIdx ++;
										if(ansIdx == quizAns.length) {
											if(qCheckImg !== null) {
												quiz.getElementsByClassName('qCheckImg')[0].style.display="block";
												quiz.getElementsByClassName('qCheckImg')[0].classList.add('answer');
												quiz.getElementsByClassName('qCheckImg')[0].classList.remove('wrong');
												isCorrect = true;
											}
										}
									} else {
										if(qCheckImg !== null) {
											quiz.getElementsByClassName('qCheckImg')[0].style.display="block";
											quiz.getElementsByClassName('qCheckImg')[0].classList.add('wrong');
											quiz.getElementsByClassName('qCheckImg')[0].classList.remove('answer');
											isCorrect = false;
										}
										continue;
									}
								}
							}
							else {
								if(quizObj[liNum].indexOf(quizAns[i]) != -1) {
									ansIdx ++;
									if(ansIdx == quizAns.length) {
										if(qCheckImg !== null) {
											quiz.getElementsByClassName('qCheckImg')[0].style.display="block";
											quiz.getElementsByClassName('qCheckImg')[0].classList.add('answer');
											quiz.getElementsByClassName('qCheckImg')[0].classList.remove('wrong');
											isCorrect = true;
										}
									}
								} else {
									if(qCheckImg !== null) {
										quiz.getElementsByClassName('qCheckImg')[0].style.display="block";
										quiz.getElementsByClassName('qCheckImg')[0].classList.add('wrong');
										quiz.getElementsByClassName('qCheckImg')[0].classList.remove('answer');
										isCorrect = false;
									}
									continue;
								}
							}
						}

					} else {
						if(qCheckImg !== null) {
							quiz.getElementsByClassName('qCheckImg')[0].style.display="block";
							quiz.getElementsByClassName('qCheckImg')[0].classList.add('wrong');
							quiz.getElementsByClassName('qCheckImg')[0].classList.remove('answer');
							isCorrect = false;
						}
					}
				}

				// for(var i = 0; i < checkItem.length; i++) {
				// 	if(checkItem[i].className.indexOf('dcss') != -1) {
				// 		checkItem[i].style.display="block";
				// 	}
				// }

				for(var j = 0; j < quizAns.length; j++) {
					if(quizGrop.length > 0) {
						if(checkItem[quizAns[j]].className.indexOf('dcss') != -1) {
							quizGrop[j].getElementsByClassName('checkItem')[quizAns[j]].classList.add('ansBorder');
						} else {
							quizGrop[j].getElementsByClassName('checkItem')[quizAns[j]].classList.add('ansBold');
						}
					} else {
						checkItem[quizAns[j]].classList.add('ansBold');
					}
				}

				DTCaliperSensor.fire({
					correct: isCorrect, // 정답 여부입력 [true, false] 중에서 택일
					itemObject: target.parentNode.parentNode, // 해당 문항 객체
					value: quizAns // 실제 정답 데이터 입력 <correctResponse>에 입력된 값이랑 동일
				});
				// add by saltgamer 20170629 for Caliper Sensor

			} else {

				// 단일 선다형
				var isCorrect = null;
				for(var i = 0; i < checkImg.length; i++) {
					if (checkItem[i].className.indexOf('checkBold') != -1) {
						if (i === parseInt(quizAns)) {
							isCorrect = true;
							if(qCheckImg !== null) {
								qCheckImg.style.display="block";
								qCheckImg.classList.add('answer');
								qCheckImg.classList.remove('wrong');
							}
						} else {
							isCorrect = false;
							if(qCheckImg !== null) {
								qCheckImg.style.display="block";
								qCheckImg.classList.add('wrong');
								qCheckImg.classList.remove('answer');
							}
						}
					}
					checkItem[i].style.pointerEvents = 'none';
				}
				checkItem[quizAns].classList.add('ansBold');

				if((isCorrect === null) && (qCheckImg !== null)) {
					qCheckImg.style.display="block";
					qCheckImg.classList.add('wrong');
					qCheckImg.classList.remove('answer');
				}

				DTCaliperSensor.fire({
					correct: isCorrect, // 정답 여부입력 [true, false] 중에서 택일
					itemObject: target.parentNode.parentNode, // 해당 문항 객체
					value: quizAns // 실제 정답 데이터 입력 <correctResponse>에 입력된 값이랑 동일
				});
				// add by saltgamer 20170629 for Caliper Sensor
			}

			quiz.getElementsByClassName('quizAnswer')[0].style.display="block";
		}

	} else {

		target.className = target.className.replace('reset','answer');

		for(var i = 0; i < checkImg.length; i++) {
			if(checkItem[i].className.indexOf('dcss') != -1) {
				checkItem[i].classList.remove('check');
				checkItem[i].classList.remove('checkBold');
				checkItem[i].classList.remove('checkBorder');
				checkItem[i].classList.remove('ansBorder');
			} else {
				checkImg[i].style.display="none";
			}
			checkItem[i].classList.remove('checkBold');
			checkItem[i].classList.remove('ansBold');
			checkItem[i].style.pointerEvents = 'auto';
			choiceBox[i].checked = false;
		}

		if(qCheckImg !== null) {
			for(var i = 0; i < qCheckImg.length; i++) {
				qCheckImg[i].style.display="none";
			}
			qCheckImg.innerHTML = '';
			qCheckImg.classList.remove('answer');
			qCheckImg.classList.remove('wrong');
		}

		quiz.getElementsByClassName('quizAnswer')[0].style.display="none";
		quizObj[liNum] = [];
	}

}




// **************************************************************************
// 정답 입력
function QUIZ_input(qNum) {
	var quiz = document.querySelector('.quiz_'+ qNum),
		quizAnswer = quiz.querySelectorAll('.quizAnswer'),
		ansCheck = quiz.querySelectorAll('.ansCheck'),
		checkImg = quiz.querySelectorAll('.checkImg'),
		checkItem = quiz.querySelectorAll('.checkItem'),
		choiceBox = quiz.querySelectorAll('.choiceBoxStyle'),
		qCheckImg = quiz.querySelector('.qCheckImg'),
		quizAns = quiz.getAttribute('data-ans');

	var liNum = (quiz.className.replace(/[^0-9]/g, '') - 1);

	if(qCheckImg != null) {
		qCheckImg.style.display="block";
	}

	for(var i = 0; i < ansCheck.length; i++) {
		ansCheck[i].classList.add('answer')
		ansCheck[i].addEventListener('mousedown', function(){
			inputansCheckEvent(qNum, this);
		});
	}
}


function inputansCheckEvent(qNum, target) {
	var quiz = document.querySelector('.quiz_'+ qNum),
		checkImg = quiz.querySelectorAll('.checkImg'),
		checkItem = quiz.querySelectorAll('.checkItem'),
		quizAnswer = quiz.querySelectorAll('.quizAnswer'),
		qCheckImg = quiz.querySelector('.qCheckImg'),
		quizAns = quiz.getAttribute('data-ans');

	var liNum = (quiz.className.replace(/[^0-9]/g, '') - 1);


	if(target.className.indexOf('answer') != -1) {
		target.className = target.className.replace('answer','reset');
		quizAns = quizAns.split(',');

		var isCorrect = null;

		for(var i = 0; i < quiz.getElementsByClassName('inputText').length; i++) {
			if(quiz.getElementsByClassName('inputText')[i].value != '') {
				quizObj[liNum].push(quiz.getElementsByClassName('inputText')[i].value);
			}
		}

		var ansIdx = 0;
		for(var i = 0; i < quizAns.length; i++) {
			if(quizAns[i] == quizObj[liNum][i]) {
				ansIdx ++;
				if(ansIdx == quizAns.length) {
					if(qCheckImg != null) {
						quiz.getElementsByClassName('qCheckImg')[0].style.display="block";
						quiz.getElementsByClassName('qCheckImg')[0].classList.add('answer');
						quiz.getElementsByClassName('qCheckImg')[0].classList.remove('wrong');
					}
				}
			}
			else {
				isCorrect = false;
				if(qCheckImg != null) {
					quiz.getElementsByClassName('qCheckImg')[0].style.display="block";
					quiz.getElementsByClassName('qCheckImg')[0].classList.add('wrong');
					quiz.getElementsByClassName('qCheckImg')[0].classList.remove('answer');
				}
			}
		}

		for(var i = 0; i < quizAnswer.length; i++) {
			quizAnswer[i].style.display="block";
		}

	} else {

		target.className = target.className.replace('reset','answer');

		if (quiz.getElementsByClassName('inputText').length > 0) {
			for(var i = 0; i < quiz.getElementsByClassName('inputText').length; i++) {
				isCorrect = null;
				quiz.getElementsByClassName('inputText')[i].value = '';
			}
		}

		for(var i = 0; i < quizAnswer.length; i++) {
			quizAnswer[i].style.display="none";
		}

		if(qCheckImg != null) {

			qCheckImg.style.display="none";
		}
		quizObj[liNum] = [];
	}

	DTCaliperSensor.fire({
		correct: isCorrect, // 정답 여부입력 [true, false] 중에서 택일
		itemObject: target.parentNode.parentNode, // 해당 문항 객체
		value: quizAns // 실제 정답 데이터 입력 correctResponse에 입력된 값이랑 동일
	});
	// add by saltgamer 20170629 for Caliper Sensor
}




// **************************************************************************
// 전체 정답
function allDapBtn(quiz) {
	var allAnsCheck = document.querySelectorAll('.allAnsCheck'),
		allAnsReset = document.querySelectorAll('.allAnsReset'),
		quizAnswer = document.querySelectorAll('.quizAnswer');

	for(var i = 0; i < quizAnswer.length; i++) {
		quizAnswer[i].style.display="none";
	}

	for(var i = 0; i < allAnsCheck.length; i++) {
		allAnsCheck[i].classList.add('answer');
		allAnsCheck[i].addEventListener('mousedown', allDapBtnEvent);
	}

	for(var i = 0; i < allAnsReset.length; i++) {
		allAnsReset[i].classList.add('answer');
		allAnsReset[i].addEventListener('mousedown', allResetBtnEvent);
	}

	var quiz = document.querySelectorAll('.quiz');
	for(var i = 0; i < quiz.length; i++) {
		quizAns = quiz[i].getAttribute('data-ans');

		// 각 quiz객체 생성
		quizObj[(quiz[i].className.replace(/[^0-9]/g, '') - 1)] = [];
	}
}



// **************************************************************************
// 전체 정답 : 보이기
function allDapBtnEvent() {
	var quiz = document.querySelectorAll('.quiz'),
		checkItem = document.querySelectorAll('.checkItem'),
		inputText = document.querySelectorAll('.inputText'),
		target = this;

	var isCorrect = null;

	for(var i = 0; i < checkItem.length; i++) {
		checkItem[i].style.pointerEvents = 'none';
	}

	if(inputText !== null) {
		for(var i = 0; i < inputText.length; i++) {
			inputText[i].style.pointerEvents = 'none';
		}
	}


	for(var i = 0; i < quiz.length; i++) {
		var quizAns = quiz[i].getAttribute('data-ans'),
			checkItem = quiz[i].querySelectorAll('.checkItem'),
			checkImg = quiz[i].querySelectorAll('.checkImg'),
			quizGrop = quiz[i].querySelectorAll('.quizGrop');

		// selectQuiz
		if(quiz[i].getAttribute('data-quiztype') == 'selectQuiz') {
			quizAns = quizAns.split(',');

			if(quiz[i].getAttribute('data-choicetype') == 'singleChoice') {
				for(var j = 0; j < quizAns.length; j++) {
					if(quizAns[j] == quizObj[i]) {
						quiz[i].getElementsByClassName('qCheckImg')[0].style.display="block";
						quiz[i].getElementsByClassName('qCheckImg')[0].classList.add('answer');
						isCorrect = true;
					} else {
						quiz[i].getElementsByClassName('qCheckImg')[0].style.display="block";
						quiz[i].getElementsByClassName('qCheckImg')[0].classList.add('wrong');
						isCorrect = false;
					}
				}
			}
			else if(quiz[i].getAttribute('data-choicetype') == 'multipleChoice') {

				if(quizAns.length == quizObj[i].length) {
					var ansIdx = 0;

					for(var j = 0; j < quizAns.length; j++) {

						// 각 checkItem요소 dcss클래스(CSS형) 여부 체크
						if(quizGrop.length > 0) {
							// if(checkItem[j].className.indexOf('dcss') != -1) {
								if(quizAns[j] == quizObj[i][j]) {
									ansIdx ++;
									if(ansIdx == quizAns.length) {
										quiz[i].getElementsByClassName('qCheckImg')[0].style.display="block";
										quiz[i].getElementsByClassName('qCheckImg')[0].classList.add('answer');
										isCorrect = true;
									}
								} else {
									quiz[i].getElementsByClassName('qCheckImg')[0].style.display="block";
									quiz[i].getElementsByClassName('qCheckImg')[0].classList.add('wrong');
									isCorrect = false;
									continue;
								}
							// }
						}
						else {
							if(quizObj[i].indexOf(quizAns[j]) != -1) {
								ansIdx ++;
								if(ansIdx == quizAns.length) {
									quiz[i].getElementsByClassName('qCheckImg')[0].style.display="block";
									quiz[i].getElementsByClassName('qCheckImg')[0].classList.add('answer');
									isCorrect = true;
								}
							} else {
								quiz[i].getElementsByClassName('qCheckImg')[0].style.display="block";
								quiz[i].getElementsByClassName('qCheckImg')[0].classList.add('wrong');
								isCorrect = false;
								continue;
							}
						}
					}
				}
				else {
					quiz[i].getElementsByClassName('qCheckImg')[0].style.display="block";
					quiz[i].getElementsByClassName('qCheckImg')[0].classList.add('wrong');
					isCorrect = false;
				}
			}

			// for(var j = 0; j < checkItem.length; j++) {
			// 	if(checkItem[j].className.indexOf('dcss') != -1) {
			// 		checkItem[j].style.display="block";
			// 	}
			// }

			for(var j = 0; j < quizAns.length; j++) {
				if(quizGrop.length > 0) {
					if(checkItem[quizAns[j]].className.indexOf('dcss') != -1) {
						quizGrop[j].getElementsByClassName('checkItem')[quizAns[j]].classList.add('ansBorder');
					} else {
						quizGrop[j].getElementsByClassName('checkItem')[quizAns[j]].classList.add('ansBold');
					}
				} else {
					checkItem[quizAns[j]].classList.add('ansBold');
				}
			}

		}


		// inputQuiz
		else if(quiz[i].getAttribute('data-quiztype') == 'inputQuiz') {
			var quizAnswer = quiz[i].querySelectorAll('.quizAnswer');
			for(var j = 0; j < quizAnswer.length; j++) {
				quizAnswer[j].style.display="block";
			}

			var liNum = (quiz[i].className.replace(/[^0-9]/g, '') - 1);
			for(var j = 0; j < quiz[i].getElementsByClassName('inputText').length; j++) {
				if(quiz[i].getElementsByClassName('inputText')[j].value != '') {
					quizObj[liNum].push(quiz[i].getElementsByClassName('inputText')[j].value);
				}
			}

			if(quizAns == quizObj[i]) {
				quiz[i].getElementsByClassName('qCheckImg')[0].style.display="block";
				quiz[i].getElementsByClassName('qCheckImg')[0].classList.add('answer');
				isCorrect = true;
			} else {
				quiz[i].getElementsByClassName('qCheckImg')[0].style.display="block";
				quiz[i].getElementsByClassName('qCheckImg')[0].classList.add('wrong');
				isCorrect = false;
			}
		}


		// drawLineQuiz
		else if(quiz[i].getAttribute('data-quiztype') == 'drawLineQuiz') {
			lineDrawAnsCheckFn();

			var liNum = (quiz[i].className.replace(/[^0-9]/g, '') - 1);

			if(quizAns == quizObj[i]) {
				quiz[i].getElementsByClassName('qCheckImg')[0].style.display="block";
				quiz[i].getElementsByClassName('qCheckImg')[0].classList.add('answer');
				isCorrect = true;
			} else {
				quiz[i].getElementsByClassName('qCheckImg')[0].style.display="block";
				quiz[i].getElementsByClassName('qCheckImg')[0].classList.add('wrong');
				isCorrect = false;
			}
		}

		var quizAnswer = document.querySelectorAll('.quizAnswer');
		for(var j = 0; j < quizAnswer.length; j++) {
			quizAnswer[j].style.display="block";
		}

		DTCaliperSensor.fire({
			correct: isCorrect, // 정답 여부입력 [true, false] 중에서 택일
			itemObject: target.parentNode.parentNode, // 해당 문항 객체
			value: quizAns // 실제 정답 데이터 입력 correctResponse에 입력된 값이랑 동일
		});
		// add by saltgamer 20170629 for Caliper Sensor

		console.log('quizAns[' + [i] + '] : ' + quizAns);
		console.log('quizCho[' + [i] + '] : ' + quizObj[i]);
	}
}



// **************************************************************************
// 전체 정답 : 초기화
function allResetBtnEvent() {
	var quiz = document.querySelectorAll('.quiz'),
		allAnsCheck = document.querySelectorAll('.allAnsCheck'),
		inputText = document.querySelectorAll('.inputText');

	for(var i = 0; i < quiz.length; i++) {
		if ((quiz[i].getElementsByClassName('checkImg').length > 0) || (quiz[i].getElementsByClassName('checkItem').length > 0)) {
			var checkImg = quiz[i].querySelectorAll('.checkImg'),
				checkItem = quiz[i].querySelectorAll('.checkItem'),
				choiceBox = quiz[i].querySelectorAll('.choiceBoxStyle'),
				qCheckImg = quiz[i].querySelectorAll('.qCheckImg');

			for(var j = 0; j < checkImg.length; j++) {
				if(checkItem[j].className.indexOf('dcss') != -1) {
					checkItem[j].classList.remove('check');
					checkItem[j].classList.remove('checkBold');
					checkItem[j].classList.remove('checkBorder');
					checkItem[j].classList.remove('ansBorder');
				} else {
					checkImg[j].style.display="none";
				}

				checkItem[j].classList.remove('checkBold');
				checkItem[j].classList.remove('ansBold');
				checkItem[j].style.pointerEvents = 'auto';
				choiceBox[j].checked = false;
			}

			for(var j = 0; j < qCheckImg.length; j++) {
				qCheckImg[j].style.display="none";
			}
		}

		if (quiz[i].getElementsByClassName('inputText').length > 0) {
			for(var j = 0; j < quiz[i].getElementsByClassName('inputText').length; j++) {
				quiz[i].getElementsByClassName('inputText')[j].value = '';
			}
		}

		var quizAnswer = document.querySelectorAll('.quizAnswer');
		for(var j = 0; j < quizAnswer.length; j++) {
			quizAnswer[j].style.display="none";
		}

		var qCheckImg = document.querySelectorAll('.qCheckImg');
		for(var j = 0; j < qCheckImg.length; j++) {
			qCheckImg[j].style.display="none";
			qCheckImg[j].classList.remove('answer');
			qCheckImg[j].classList.remove('wrong');
		}

		if(inputText !== null) {
			for(var j = 0; j < inputText.length; j++) {
				inputText[j].style.pointerEvents = 'auto';
			}
		}
	}


	// lineContainer(선긋기) 초기화
	if(document.querySelectorAll('.lineContainer') !== null) {
		if(document.querySelector('.dapCanvas') !== null) {
			var dapCanvas = document.querySelector('.dapCanvas');
			dapCanvas.classList.remove('view');
			dapCanvas.parentNode.removeChild(dapCanvas);
		}

		var graph = document.querySelectorAll('.graph');
		for(var j = 0; j < graph.length; j++) {
			var ctx = graph[j].getContext('2d');
        	ctx.clearRect(0, 0, graph[j].width, graph[j].height);
        	ctx.beginPath();
		}

		var container = document.querySelectorAll('.lineContainer');
		for(var i = 0; i < container.length; i++) {
			var ulLeft = container[i].querySelector('.leftArea'),
				ulRight = container[i].querySelector('.rightArea');

			for(var j = 0; j < ulLeft.querySelectorAll('li').length; j++) {
				ulLeft.querySelectorAll('li')[j].removeAttribute('data-set');
			}
			for(var j = 0; j < ulRight.querySelectorAll('li').length; j++) {
				ulRight.querySelectorAll('li')[j].removeAttribute('data-set');
			}
		}
	}

	for(var i = 0; i < quizObj.length; i++) {
		quizObj[i] = [];
	}

}




// **************************************************************************
// 선 긋기
function QUIZ_drawLine(qNum) {
	var quiz = document.querySelector('.quiz_'+ qNum),
		container = quiz.querySelectorAll('.lineContainer'),
		ansCheck = quiz.querySelectorAll('.ansCheck');

	if(container.length > 0){
		QUIZ_drawLineEv(qNum);
	} else {
		return;
	}

	for(var i = 0; i < ansCheck.length; i++){
		ansCheck[i].classList.add('answer');
		ansCheck[i].addEventListener('mousedown', function() {
			lineDrawAnsCheckFn(qNum, this);
		});
	}
}


function QUIZ_drawLineEv(qNum) {
	var quiz = document.querySelector('.quiz_'+ qNum),
		quizAns = quiz.getAttribute('data-ans'),
		container = quiz.querySelector('.lineContainer'),
		ulLeft = container.querySelector('.leftArea'),
		ulRight = container.querySelector('.rightArea'),
		liLeft = ulLeft.querySelectorAll('li'),
		liRight = ulRight.querySelectorAll('li'),
		Start = null, End = null;

	var sConnect = 1;
    var eConnect = 1;
    var liNum = (quiz.className.replace(/[^0-9]/g, '') - 1);

	setTimeout(function () {
	    for(var i = 0; i < ulLeft.querySelectorAll('li').length; i++) {
			quizObj[liNum].push('');
		}
		quizAns = quizAns.split(',');
	}, 100);

	for(var i = 0; i < liLeft.length; i++) {
		liLeft[i].setAttribute('data-scode', sConnect);
		sConnect ++;

		liLeft[i].addEventListener('mousedown', function() {
			Start = this;
			for(var i = 0; i < liLeft.length; i++){
				liLeft[i].style.color = '#000000';
			}
			this.style.color = 'blue';
			easeResult();
		});
	}

	for(var i = 0; i < liRight.length; i++) {
		liRight[i].setAttribute('data-ecode', eConnect);
		eConnect ++;

		liRight[i].addEventListener('mousedown', function(){
			End = this;
			for(var i = 0; i < liRight.length; i++) {
				liRight[i].style.color = '#000000';
			}
			this.style.color = 'blue';
			easeResult();
		});
	}


	function easeResult() {
		if(Start !== null & End !== null) {
			var EndNum = End.getAttribute('data-ecode'),
				StartNum = Start.getAttribute('data-scode');

			if(ulLeft.querySelector('li[data-set="'+ EndNum +'"]') !== null) {
				ulLeft.querySelector('li[data-set="'+ EndNum +'"]').removeAttribute('data-set');
			}
			if(ulRight.querySelector('li[data-set="'+ StartNum +'"]') !== null) {
				ulRight.querySelector('li[data-set="'+ StartNum +'"]').removeAttribute('data-set');
			}

			Start.setAttribute('data-set', EndNum);
			End.setAttribute('data-set', StartNum);
			reDraw();

			Start = null, End = null;

			quizObj[liNum].splice(StartNum-1, 1, String(EndNum));
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
			if(liLeft[i].getAttribute('data-set')) {
				var endNum = liLeft[i].getAttribute('data-set');
				setLine(liLeft[i], liRight[endNum-1]);
			}
		}
	}


	var canvas = container.querySelector('canvas');
	var context = canvas.getContext('2d');
	context.lineWidth = 3;
	context.strokeStyle = "#000000";

	function setLine(StartObj, EndObj) {
		var startTop = StartObj.offsetTop;
		var endTop = EndObj.offsetTop;

		context.beginPath();
		context.moveTo(0, startTop + 5);
		context.lineTo(canvas.width, endTop + 5);
		context.stroke();
	}
}


function lineDrawAnsCheckFn(qNum, target) {
	var quiz = document.querySelector('.quiz_'+ qNum),
		container = document.querySelector('.lineContainer'),
		ulLeft = container.querySelector('.leftArea'),
		ulRight = container.querySelector('.rightArea'),
		liLeft = ulLeft.querySelectorAll('li'),
		liRight = ulRight.querySelectorAll('li'),
		canvas = container.querySelector('canvas');

	var	answer = true;
	var	liNum = (qNum - 1);


	// 정답 리셋 부분
	if(document.querySelector('.dapCanvas') !== null) {
		if(target !== undefined) {
			target.className = target.className.replace('reset','answer');
			var qCheckImg = quiz.querySelector('.qCheckImg');
			if(qCheckImg != null) {
				quiz.getElementsByClassName('qCheckImg')[0].style.display="none";
			}
		}

		if(target !== undefined) {
			var dapCanvas = document.querySelector('.dapCanvas');
			dapCanvas.classList.remove('view');
			dapCanvas.parentNode.removeChild(dapCanvas);

			var graph = document.querySelectorAll('.graph');
			for(var j = 0; j < graph.length; j++) {
				var ctx = graph[j].getContext('2d');
	        	ctx.clearRect(0, 0, graph[j].width, graph[j].height);
	        	ctx.beginPath();
			}

			var container = document.querySelectorAll('.lineContainer');
			for(var i = 0; i < container.length; i++) {
				var ulLeft = container[i].querySelector('.leftArea'),
					ulRight = container[i].querySelector('.rightArea');

				for(var j = 0; j < ulLeft.querySelectorAll('li').length; j++) {
					ulLeft.querySelectorAll('li')[j].removeAttribute('data-set');
				}
				for(var j = 0; j < ulRight.querySelectorAll('li').length; j++) {
					ulRight.querySelectorAll('li')[j].removeAttribute('data-set');
				}
			}

			quizObj[liNum] = [];
		}
	}

	else {

		// 정답 버튼 눌렀을 때
		if(target !== undefined) {
			target.className = target.className.replace('answer','reset');
			var qCheckImg = quiz.querySelector('.qCheckImg');
			if(quizAns == quizObj[liNum]) {
				if(qCheckImg != null) {
					quiz.getElementsByClassName('qCheckImg')[0].style.display="block";
					quiz.getElementsByClassName('qCheckImg')[0].classList.add('answer');
				}
			} else {
				if(qCheckImg != null) {
					quiz.getElementsByClassName('qCheckImg')[0].style.display="block";
					quiz.getElementsByClassName('qCheckImg')[0].classList.add('wrong');
				}
			}
		}


		var dapCanvas = document.createElement('canvas');
		dapCanvas.className = 'dapCanvas';
		dapCanvas.width = canvas.width;
		dapCanvas.height = canvas.height;
		dapCanvas.style.top = canvas.style.top;
		dapCanvas.style.left = canvas.style.left;

		container.appendChild(dapCanvas);

		for(var i = 0; i <liLeft.length; i++) {
			var leftLines = liLeft[i];
			var setCode = leftLines.getAttribute('data-set');
			var code = leftLines.getAttribute('data-line') || leftLines.getAttribute('ans');

			if(code != setCode) answer = false;

			setAnsLine(leftLines, ulRight.querySelector('li[data-ecode="'+ code +'"]'));
		}
	}


	function setAnsLine(StartObj, EndObj) {
		var startTop = StartObj.offsetTop;
		var endTop = EndObj.offsetTop;

		var dapContext = dapCanvas.getContext("2d");
		dapContext.strokeStyle = "#f50247";
		dapContext.lineWidth = 3;

		dapContext.moveTo(0, startTop + 5);
		dapContext.lineTo(dapCanvas.width, endTop + 5);
		dapContext.stroke();
	}

}
