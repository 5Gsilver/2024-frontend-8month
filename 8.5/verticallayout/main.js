var elem = document.querySelector('section'); //컨테이너박스 
var iso = new Isotope( elem, { //컨테이너 박스명 
  // options
  itemSelector: 'article', //나란히 배치하는요소명 
  percentPosition: true, //아이템의 너비가 고정너비가 아닐때 
  masonry: {
    // use element for option
    columnWidth: 'article'//너비값 구할 요소명 
  }, 
  transitionDuration :'0.5s'//화면 재배치시 요소의 움직이는 속도 
});

//버튼을 클릭했을 때 소팅 기능 구현 
//클릭한 버튼 활성화 

const btns = document.querySelectorAll(".btns li"); 
for(let btn of btns){
  btn.addEventListener("click", e=>{
    e.preventDefault(); 
    //모든 버튼에 on을 제거하고 
    for(let el of btns){
      el.classList.remove("on"); 
    }
    //현재 클릭한 버튼에만 on을 추가하여 활성화 
    e.currentTarget.classList.add("on"); 
    //클릭한 버튼의 자식요소인 a태그에서 href값을 변수에 저장 
    const sort = e.currentTarget.querySelector("a").getAttribute("href"); 

    //iso에 저장된 결과값을 불러와서 옵션값에 따라서 재정렬하기 
    iso.arrange({
      filter:sort //a태그의 href값에 따라서 재정렬 
    }); 

  })
}