// 이전 버튼 클릭시 img 감소
document.querySelector('.prev').addEventListener('click', function() {
	const current = document.querySelector('.current');
	const prev = current.previousElementSibling;

	if (prev) {
		current.classList.remove('current');
		prev.classList.add('current');
	}
});

// 다음 버튼 클릭시 img 증가
document.querySelector('.next').addEventListener('click', function() {
	const current = document.querySelector('.current');
	const next = current.nextElementSibling;

	if (next) {
		current.classList.remove('current');
		next.classList.add('current');
	}
});