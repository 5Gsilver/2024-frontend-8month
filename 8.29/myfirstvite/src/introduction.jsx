function Introduction({props}) {
	const {greeting, name, age, children} = props;
	
	return( 
	<>
		<h1>{props.greeting}. 저는 {props.name} 입니다.</h1>
		
		<p>제 나이는 {props.age}입니다.</p>
		{props.children}
	</>
	);
}

export default Introduction;
