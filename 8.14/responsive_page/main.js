//모바일 버튼 클릭시
//모바일 메뉴 나타나도록 처리 

const btnCall = document.querySelector(".btnCall"); 
const menuMo = document.querySelector(".menu_mobile"); 
let base = -400; 

btnCall.addEventListener("click",e=>{
  e.preventDefault(); //a태그 링크이동 방지 

  //.toggle(class) 
  //- class가 있으면 제거 없으면 추가 
  btnCall.classList.toggle("on"); 
  menuMo.classList.toggle("on"); 
});


const sections = document.querySelectorAll("figure, section"); 

const btns = document.querySelectorAll(".btns li");
//섹션의 세로위치값 구해서 배열로 만들기 
let posArr = []; 
sections.forEach((sec, idx)=>{
  posArr.push(sec.offsetTop); 
})
// console.log(posArr); 
//버튼의 갯수만큼 반복을 돌면서 버튼에 이벤트 연결 
btns.forEach((btn, idx)=>{
  //버튼을 클릭했을 때 
  btn.addEventListener("click", e=>{
    //현재 클릭한 버튼에 클래스 on이 있는지 판별하여 true/false를 변수로 저장 
    let isOn = e.currentTarget.classList.contains("on"); 
    //만약 true라면 - on이 있다는 것이므로 아래 코드를 실행하지 않고 종료 
    if(isOn) return; 

    //on이 없다면 아래 코드 실행 
    //문서내에서 scroll로 부드럽게 이동 
    window.scroll({
      top: posArr[idx], //y축좌표 
      left:0, //x축 좌표 
      behavior: "smooth" //부드럽게 이동 (auto)
    }); 

    for(let el of btns){
      el.classList.remove("on"); 
    }
    btns[idx].classList.add("on"); 

  })
});

//문서에서 스크롤했을 때 
window.addEventListener("scroll", e=>{
  let scroll = window.scrollY; //스크롤한 거리값 
  //섹션의 index값을 이용하여 해당 섹션에 이동시 버튼활성화 
  sections.forEach((el,index)=>{
    //스크롤양이 해당 순번의 섹션 위치값보다 클경우 버튼 활성화 
    if(scroll >= posArr[index] +base){
      for(let el of btns) el.classList.remove("on"); 
      btns[index].classList.add("on"); 
    }
  })
 
})