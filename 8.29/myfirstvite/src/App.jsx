import React, { useState } from 'react';
import './App.css';
import Introduction from `./Introduction`



function App() {
	const handleClickButton = (yourname) => {
		alert(안녕 + yourname);
	};

	const handleChangeInput = (event) => {
		a = event.target.value
	};

  return (
		<>
	  <Introduction name="윤성민" age={19} greeting="안녕하세요">
		<p>만나서 반갑고 내일 또 봐요</p>
	  </Introduction>

		<br />

		<input type="text" onChange={handleChangeInput}/>

		<br />

		<p>당신이 입력한 글자는{a}입니다.</p>

		<hr />

		<counter />
	</>
  );
}

export default App


