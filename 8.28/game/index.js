const pikachu = document.getElementById('pikachu');
const distanceUnit = 30;


document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key.includes('Arrow')) {
        const direction = key.replace('Arrow', '').toLowerCase();
        move(direction);
    }
});

// direction : 'up', 'down', 'left', 'right'
function move(direction) {
    const currentTop = Number(pikachu.style.top.replace('px', ''));
    const currentLeft = Number(pikachu.style.left.replace('px', ''));
    console.log(currentTop, currentLeft);
    if (direction === 'up') {
        if (currentTop === 0) return;
        pikachu.style.top = (currentTop - distanceUnit) + 'px';
    } else if (direction === 'down') {
        if (currentTop === 270) return;
        pikachu.style.top = (currentTop + distanceUnit) + 'px';
    } else if (direction === 'left') {
        if (currentLeft === 0) return;
        pikachu.style.left = (currentLeft - distanceUnit) + 'px';
        pikachu.style.transform = 'rotateY(180deg)';
    } else if (direction === 'right') {
        if (currentLeft === 270) return;
        pikachu.style.left = (currentLeft + distanceUnit) + 'px';
        pikachu.style.transform = 'rotateY(0deg)';
    }
}

function jump(){
	const currentTop = Number(pikachu.style.top.replace('px', ''));
	if(currentTop === 0) return;

	pikachu.style.top = current - 15 + 'px';

	setTimeout(() => {
		pikachu.style.top = currentTop + 'px';
	}, 200);
}