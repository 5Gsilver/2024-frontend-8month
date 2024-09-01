
const form = document.querySelector("#member"); 
const btnSubmit = form.querySelector("input[type=submit]"); 

//submit버튼을 클릭했을 때 
btnSubmit.addEventListener("click",(e)=>{
  //text_validation의 결과값이 false라면 e.preventDefault(); 
  if(!agree_validation("agree")) e.preventDefault(); 
  if(!text_validation("id", 8)) e.preventDefault(); 
  if(!text_validation("comments", 50)) e.preventDefault();  
  if(!check_validation("hobby")) e.preventDefault(); 
  if(!check_validation("GENDER")) e.preventDefault(); 
  if(!select_validation("edu")) e.preventDefault();
  if(!email_validation("email")) e.preventDefault();
  if(!pwd_validation("pwd1", "pwd2", 8))e.preventDefault();
});

//text validation 함수 정의 
function text_validation(name, len = 5){
  let input = form.querySelector(`[name=${name}]`); 
  let txt = input.value; 

  //에러메시지가 있는지 찾아보고 있다면 제거 
  const errMsgs = input.closest("td").querySelectorAll("p"); 
  if(errMsgs.length >0) errMsgs[0].remove();  

  //인풋에 입력한 텍스트의 길이가 5글자보다 많다면 조건을 만족하고 
  if(txt.length >= len){      
    return true; //결과값으로 true를 반환  
  }else{ //인풋텍스트의 길이가 len보다 적을 경우 조건을 만족하지 않으므로 
    //에러메시지를 위한 p태그를 생성하여 에러메시지를 넣고 
    //현재 input이 있는 td를 찾아서 p태그 삽입 
    const errMsg = document.createElement("p"); 
    errMsg.append(`입력항목을 ${len}글자 이상 입력하세요`); 
    input.closest("td").append(errMsg); 

    return false; //결과값으로 false를 반환  
  }
}


//체크박스 validation 
function check_validation(name){
  //체크박스 요소를 모두 가지고 와서 
  let inputs = form.querySelectorAll(`[name=${name}]`); 
  let isChecked = false; //일단 변수에 false를 저장하고 
  //이미생성된 에러메시지 있는지 찾고 제거 
  const errMsgs = inputs[0].closest("td").querySelectorAll("p"); 
  if(errMsgs.length >0) errMsgs[0].remove(); 

  //반복을 돌면서 체크박스에 체크되어있는 요소가 하나라도 있으면 isChecked를 true 아니면 false로 저장  
  for(let input of inputs){
    if(input.checked) isChecked = true; 
  }
//isChecked가 참이라면 
  if(isChecked){
    return true; 
  }else{ //isChecked가 거짓이라면 
    const errMsg = document.createElement("p"); 
    if(name == "hobby") errMsg.append("선택을 하나이상 해주세요"); 
    if(name == "GENDER") errMsg.append("선택을 해주세요")
    inputs[0].closest("td").append(errMsg); 
    return false; 
  }
}

//셀렉박스 validation 함수 정의 
function select_validation(name){
  let sel = form.querySelector(`[name=${name}]`); 
  //선택된 셀렉박스의 인덱스를 받아서 
  let sel_index = sel.options.selectedIndex;
  //해당순번의 셀렉박스의 value값을 변수로 저장  
  let val = sel[sel_index].value; 

  const errMsgs = sel.closest("td").querySelectorAll("p");
  if(errMsgs.length >0) errMsgs[0].remove(); 
  //val값이 빈값이 아니라면 
  if(val !== ""){
    return true
  }else{ //val값이 비었다면 
    const errMsg = document.createElement("p"); 
    errMsg.append("항목을 선택해 주세요"); 
    sel.closest("td").append(errMsg); 
    return false; 
  }
}

// email calidation(name)
function email_validation(name){
  let input = form.querySelector(`[name=${name}]`);
  let txt = input.value;
  let exptxt = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+[A-za-z0-9\-]+/;

  // console.log(/@/.test(txt));

  // test()는 주어진 문자열이 정규표현식을 만족하는지 판별하는 true또는 false로 반환

  const errMsgs = input.closest("td").querySelectorAll("p");
  if(errMsgs.length >0) errMsgs[0].remove();

  // if(/@/.test(txt)){
  if(exptxt.test(txt)){

    return true;
  
  }else{
    const errMsg = document.createElement("p");
    errMsg.append("@를 포함한 전체 이메일 주소를 입력하세요.");
    input.closest("td").append(errMsg);

    return false;
  }
}

// 약관동의 함수 정의 (체크박스1개 체크유무)
function agree_validation(name){
  let input = form.querySelector(`[name=${name}]`);

  const errMsgs = input.closest("div").querySelectorAll("p");
  if(errMsgs.length >0) errMsgs[0].remove();

  if(input.checked){
    return true;
  }else{
    const errMsg = document.createElement("p");
    errMsg.append("약관에 동의해 주새요.")
    input.closest("div").append(errMsg);

    return false;
  }
}

function pwd_validation(name1, name2, len = 8){
  let pwd1 = form.querySelector(`[name=${name1}]`);
  let pwd2 = form.querySelector(`[name=${name2}]`);
  
  let pwd1_val = pwd1.value;
  let pwd2_val = pwd2.value;

  const num = /[0-9]/;
  const eng = /[A-Za-z]/;
  const spc = /[~!@#$%^&*()_-]/;

  const errMsgs = pwd1.closest("td").querySelectorAll("p");
  if(errMsgs.length >0) errMsgs[0].remove();

  if(pwd1_val === pwd2_val && num.test(pwd1_val) && eng.test(pwd1_val) && spc.test(pwd1_val) && pwd1_val.lenth >= len){
    return true;
  }else{
    const errMsg = document.createElement("p");
    errMsg.append(` ${len}글자 이상, 영문자, 숫자, 특수문자를 포함하여 두 비밀번호를 동일하게 입력하세요`);
    pwd1.closest("td").append(errMsg);

    return false;
  }
}

pwdToText()
function pwdToText(){
  let pwd = form.querySelector("#pwd1");
  let eye = form.querySelector("#eye");

  eye.addEventListener("click", e=>{
    if(e.target.classList.contains("fa-eye-slash")){
      pwd.type = "text";
      e.target.classList.remove("fa-eye-slash");
      e.target.classList.add("fa-eye");
    }else{
      pwd.type = "password";
      e.target.classList.remove("fa-eye");
      e.target.classList.add("fa-eye-slash");
    }
  })
}