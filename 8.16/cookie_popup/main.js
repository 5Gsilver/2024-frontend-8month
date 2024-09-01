/*
쿠키 : 사용자 컴퓨터에 저장되는 정보로

쿠키 확인 document.cookie
cookie = "name=value"; path=/; expires=날짜; domain=도메인; secure;
쿠키이름 = 값; 경로=최상위; 만료날짜=날짜;
*/ 

const popup = document.querySelector('#popup');
const btnClose = document.querySelector('.close');
const isCookie = document.cookie.indexOf('today');
//쿠키보기버튼 ,지우기버튼 변수로 저장 
const btnView = document.querySelector('.view');
const btnDel = document.querySelector('.del');
//있으면 0 없으면 -1
console.log(isCookie);

// 브라우저가 로딩되었을때
// 쿠키가 있으면 팝업을 숨기고
// 쿠키가 없으면 팝업을 보이게 처리
// if(isCookie == -1){
// 	popup.style.display = 'block';
// }else{
// 	popup.style.display = 'none';
// } 
// 
//삼항연산자로 조건문 간단히 고치기
let ison;
isCookie == -1 ? ison = 'block' : ison = 'none';
popup.style.display = ison;

//쿠키 보기 이벤트
btnView.addEventListener('click', e=> {
	e.preventDefault();
	console.log(document.cookie);
})

btnDel.addEventListener('click', e=> {
	e.preventDefault();
	setCookie('today', 'done', 0);
})


btnClose.addEventListener('click', e=> {
	e.preventDefault();
	//팝업이 안보이게 처리
	popup.style.display = 'none';
	//체크버튼 클릭했다면 쿠키설정함수 호출
	let ischecked = popup.querySelector("input[id=ck]").checked;
	if (ischecked) {
		setCookie('today', 'done', 1);
	}
	//체크버튼 클릭하지 않았다면 쿠키설정 안하도록 설정
});

// 쿠키 설정 함수
function setCookie(name, value, due) {

	const day = new Date();
	const date = day.getDate();
	day.setDate(date + due);
	const duedate = day.toGMTString();

	document.cookie = `${name}=${value} path=/ expires=${duedate}`;	
}