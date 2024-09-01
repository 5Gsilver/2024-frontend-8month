function counter () {
	const[count, setCount] = useState(0);

	const handleClickCountNumber = () => {
		setCount(count + 1);
	};

	
	<section>
	<p>현재 카운트 : {count}</p>
	<button onClick={handleClickCountNumber}></button>
	</section>
}