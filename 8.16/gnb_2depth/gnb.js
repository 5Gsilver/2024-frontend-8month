const gnb_lis = document.querySelectorAll('#gnb>li'); //1depth li nodelist 형태로 저장 

// gnb의 li 를 반복을 돌면서 이벤트 연결
gnb_lis.forEach((li)=>{
	li.addEventListener('mouseenter', e=>{
	//해당요소의 .sub이 보이게
	//해당 li활성화
	const sub = e.currentTarget.querySelector('.sub');
	sub.style.display = 'block';
	const depth1 = e.currentTarget.querySelector('>a');
	depth1.classList.add('on');
	})

	li.addEventListener('mouseleave', e=>{
	//해당요소의 .sub이 보이게
	//해당 li활성화
	const sub = e.currentTarget.querySelector('.sub');
	sub.style.display = 'none';
	const depth1 = e.currentTarget.querySelector('a');
	depth1.classList.remove('on');
	})

	//포커스 이벤트
	li.addEventListener('focusin', e=>{
		//sub을 찾아서 보이게 처리
		//자식 a 활성화
		//다른 a들은 비활성화
		const sub = e.currentTarget.querySelector('.sub');	
		sub.style.display = 'block';
		for( let el of list) el.classList.remove('on');
		const depth1 = e.currentTarget.querySelector('a');
		depth1.classList.add('on');
	})

	li.addEventListener('focusout', e=>{
		//sub을 찾아서 보이게 처리
		//자식 a 활성화
		//다른 a들은 비활성화
		const sub = e.currentTarget.querySelector('.sub');	
		sub.style.display = 'none';
		const depth1 = e.currentTarget.querySelector('a');
		depth1.classList.remove('on');
	})

	// sub ul 안쪽의 제일 마지막 li를 찾아서 변수로 저장
	const sub = li.querySelector('.sub');
	const lastEl = sub.lastElementChild; //마지막 li 

	//마지막 요소에서 focusoute됬을때
	lastEl.addEventListener('focusout', e=>{
		//마지막요소의 부모요소인 sub를 찾아서 display none처리
		e.currentTarget.parentElement.style.display = 'none';
		//1depth a태그도 비활성화
		li.querySelector('a').classList.remove('on');
	})
})
