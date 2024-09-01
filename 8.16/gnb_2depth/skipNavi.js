const skipNavi = document.querySelector('.skipNavi li a');

// a의 갯수만큼 반복을 돌면서
// a태그에 focusin 됐을때
// a태그에 on 추가

// a태그에서 fousout 됐을때
// a태그에 on 제거

skipNavi.forEach((skipBtn)=>{
	skipBtn.addEventListener('focusin', e=>{
		skipBtn.classList.add('on');
	})
	skipBtn.addEventListener('focusout', e=>{
		skipBtn.classList.remove('on');
	})
})