// 'use strict';

/****************************************
*			    COMMON.js               *
****************************************/


// source open : html , css, js 선택
function sourceOpen() {
	var guidebtn = document.querySelectorAll('.guidebtn');
	for(var i = 0; i < guidebtn.length; i++) {			
		guidebtn[i].addEventListener('mousedown', sourceOpenEvent);							
	}	
	popupCloseEvent();	
}


function sourceOpenEvent() {
	var title = this.getAttribute('title');	

	document.querySelector('#popupContainer').style.display = 'block';
	var popup = document.querySelectorAll('.popup');
	var	popupArea = document.querySelector('#popupArea');	
	
	for(var i = 0; i < popup.length; i++) {
		popup[i].style.display = 'none';				
		popupArea.getElementsByClassName('guidebtn')[i].classList.remove('active');						
		
		if(this.getAttribute('title') == popup[i].getAttribute('title')) {			
			popup[i].style.display = 'block';									
			popupArea.getElementsByClassName('guidebtn')[i].classList.add('active');									
		}						
	}		
}


function popupCloseEvent() {	

	document.querySelector('.guide_Close').addEventListener('mousedown', function() {
		document.querySelector('#popupContainer').style.display = 'none';
		var popup = document.querySelectorAll('.popup');
		for(var i = 0; i < popup.length; i++) {
			popup[i].style.display = 'none';				
		}			
	});				
}



// createElement 초기 설정
function QSAll (target) {return document.querySelectorAll(target);}

function createElement (type, targetElement, className, width, height) {
    var createObject = document.createElement(type);

    if (className !== undefined) createObject.className = className;
    if (width !== undefined) 	 createObject.style.width = width + 'px';
    if (height !== undefined) 	 createObject.style.height = height + 'px';

    targetElement.appendChild(createObject);
    return createObject;
}


// 디바이 터치 등록
var GameManager = {
    event: {
        isTouchDevice: 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch,
        eventSelector: function (eventType) {
            // console.log('□ this.isTouchDevice :', this.isTouchDevice);
            var selectedEvent;
            switch (eventType) {
                case 'eventDown':
                    selectedEvent = this.isTouchDevice ? 'touchstart' : 'mousedown';
                    break;
                case 'eventMove':
                    selectedEvent = this.isTouchDevice ? 'touchmove' : 'mousemove';
                    break;
                case 'eventUp':
                    selectedEvent = this.isTouchDevice ? 'touchend' : 'mouseup';
                    break;
                case 'eventOut':
                    selectedEvent = this.isTouchDevice ? 'touchleave' : 'mouseout';
                    break;
            }
            return selectedEvent;
        }
    }
};


function QS (target) { return document.querySelector(target); }
function eventSelector (eventType, e) {
    var eventMaster;

    if (eventType === 'eventDown') {
        switch (GameManager.event.eventSelector('eventDown')) {
            case "mousedown":
                eventMaster = e;
                break;
            case "touchstart":
                e.preventDefault();
                eventMaster = e.touches.item(0);
                break;
        }
    } else if (eventType === 'eventMove') {
        switch (GameManager.event.eventSelector('eventMove')) {
            case "mousemove":
                eventMaster = e;
                break;
            case "touchmove":
                eventMaster = e.touches.item(0);
                break;
        }
    } else if (eventType === 'eventUp') {
        switch (GameManager.event.eventSelector('eventUp')) {
            case "mouseup":
                eventMaster = e;
                break;
            case "touchend":
                eventMaster = e.changedTouches[0];
                break;
        }
    } else if (eventType === 'eventOut') {
        switch (GameManager.event.eventSelector('eventOut')) {
            case "mouseout":
                eventMaster = e;
                break;
            case "touchleave":
                eventMaster = e.touches.item(0);
                break;
        }
    }
    return eventMaster;
}

// 이벤트(설정) 추가 : mousedown, mousemove, mouseup, mouseout
function addEvent (target, eType, fnc) {
    var eventType;
    switch(eType){
        case 'mousedown': eventType = GameManager.event.eventSelector('eventDown'); break;
        case 'mousemove': eventType = GameManager.event.eventSelector('eventMove'); break;
        case 'mouseup':   eventType = GameManager.event.eventSelector('eventUp'); break;
        case 'mouseout':  eventType = GameManager.event.eventSelector('eventOut'); break;
    }
    return target.addEventListener(eventType, fnc, false);
}

// 이벤트(설정) 삭제 : mousedown, mousemove, mouseup, mouseout
function removeEvent (target, eType, fnc) {
    var eventType;
    switch(eType) {
        case 'mousedown': eventType = GameManager.event.eventSelector('eventDown'); break;
        case 'mousemove': eventType = GameManager.event.eventSelector('eventMove'); break;
        case 'mouseup': eventType = GameManager.event.eventSelector('eventUp'); break;
        case 'mouseout': eventType = GameManager.event.eventSelector('eventOut'); break;
    }
    return target.removeEventListener(eventType, fnc, false);
}

// 선택 사운드 (mousedown, touchstart)
function soundEvent (target, src) {
    target.addEventListener(GameManager.event.eventSelector('eventDown'), function(){
        efSound(src);
    }, false);
}



function initScale() {	
	var wrap = document.getElementById('container');

	GameManager.event.clientWidth = document.body.clientWidth;
	GameManager.event.clientHeight = document.body.clientHeight;

	GameManager.event.wrapWidth = wrap.clientWidth;
	GameManager.event.wrapHeight = wrap.clientHeight;	
	
	GameManager.event.zoomVertical = (GameManager.event.clientHeight / GameManager.event.wrapHeight) * 1.0;
	GameManager.event.zoomHorizontal = (GameManager.event.clientWidth / GameManager.event.wrapWidth) * 1.0;				
		
	if(parent.ZOOMVALUE == undefined) {
		parent.ZOOMVALUE = 1;    			
	}						
	if (GameManager.event.clientHeight < GameManager.event.clientWidth) {						
		GameManager.event.zoomRate = parent.ZOOMVALUE;
	} else {		
		GameManager.event.zoomRate = GameManager.event.zoomHorizontal;
	}	

    // alert(GameManager.event.zoomRate);
}
