//1. circle과 article을 찾아서 변수로 저장 

const circle = document.querySelector("#circle"); 
const articles = circle.querySelectorAll("article"); 
console.log(articles); 

//article의 갯수만큼 반복을 돌면서 안쪽의 코드 실행 
for(let el of articles){
  console.log(el); //article

  //article에 마우스가 들어갔을 때 
  el.addEventListener("mouseenter", ()=>{
    //부모요소인 circle의 animation-play-state값을 paused로 변경 - 애니메이션 멈춤 
    circle.style.animationPlayState = "paused"; 
  }); 

  //article에서 마우스가 떠났을 때 
  el.addEventListener("mouseleave",()=>{
    //부모요소인 circle의 animation-play-state값을 running으로 변경 
    circle.style.animationPlayState = "running"; 
  });
}
/*
articles.forEach((item, idx, arr)=>{
  item.addEventListener("mouseenter",()=>{
    circle.style.animationPlayState = 'paused'; 
  })

  item.addEventListener("mouseleave",()=>{
    circle.style.animationPlayState = 'running';
  })
})
*/