const resultDOM	=  document.getElementsByClassName('value');
let result = 0;
let prevValue = 0;
let activeoperator = null;
let prevActiveoperator = null;

function initResult(){
	result = "0";
	resultDOM.innerText = result;
}
function updateResult(){
}

updateResult(0);

function calculate(){
	if(prevActiveoperator === "plus"){
		updateResult(preValue + result);
	}else if(prevActiveoperator === "minus"){
		updateResult(preValue - result);
	}else{
		calculate();
	}
}

function handleClickNumber(number){
	if(activeoperator === "plus"){
		prevValue = result;
		updateResult(number);
		deactiveOperator();

		return;
	}
}

function handleClickNumver(number){
	if(activeoperator === "minus"){
		prevValue = result;
		updateResult(number);
		deactiveOperator();

		return;
	}
}

//곱하기
function handleClickOperator(operator){
	if(operator === "multiply"){
		activeoperator = operator;
	}
}

function handleClickOperator(operator){
	if(operator === "divide"){
		activeoperator = operator;
	}
}

function activeoperator(operator){
	if(operator === "equal"){
		activeoperator = operator;
	}else{
		
	}
}



const oneDOM = document.querySelector(".button .one")
const twoDOM = document.querySelector("p.two")
const threeDOM = document.querySelector("p.three")
const fourDOM = document.querySelector("p.four")
const fiveDOM = document.querySelector("p.five")
const sixDOM = document.querySelector("p.six")
const sevenDOM = document.querySelector("p.seven")
const eightDOM = document.querySelector("p.eight")
const nineDOM = document.querySelector("p.nine")
const zeroDOM = document.querySelector("p.zero")
const dotDOM = document.querySelector("p.dot")
const plusDOM = document.querySelector("p.plus")
const minusDOM = document.querySelector("p.minus")
const multiplyDOM = document.querySelector("p.multiply")
const divideDOM = document.querySelector("p.divide")

oneDOM.addEventListener("click", () => handleClickNumber(1));
twoDOM.addEventListener("click", () => handleClickNumber(2));
threeDOM.addEventListener("click", () => handleClickNumber(3));
fourDOM.addEventListener("click", () => handleClickNumber(4));
fiveDOM.addEventListener("click", () => handleClickNumber(5));
sixDOM.addEventListener("click", () => handleClickNumber(6));
sevenDOM.addEventListener("click", () => handleClickNumber(7));
eightDOM.addEventListener("click", () => handleClickNumber(8));
nineDOM.addEventListener("click", () => handleClickNumber(9));
zeroDOM.addEventListener("click", () => handleClickNumber(0));
dotDOM.addEventListener("click", () => handleClickNumber("."));
plusDOM.addEventListener("click", () => handleClickOperator("+"));
minusDOM.addEventListener("click", () => handleClickOperator("-"));
multiplyDOM.addEventListener("click", () => handleClickOperator("*"));
divideDOM.addEventListener("click", () => handleClickOperator("/"));

console.log(resultDOM);
