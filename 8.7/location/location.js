var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스

//교통정보보기버튼 변수로 저장 
const t_on = document.querySelectorAll(".traffic li")[0]; 
//교통정보 끄기 버튼 변수로 저장 
const t_off = document.querySelectorAll(".traffic li")[1]; 
//브랜치 버튼 변수저장 
const branch_btns = document.querySelectorAll(".branch li"); 
 


var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.58506980062978, 126.88550246441767), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

/*
var imageSrc = 'img/marker1.png', // 마커이미지의 주소입니다    
    imageSize = new kakao.maps.Size(116, 50), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(58, 50)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      
// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
    markerPosition = new kakao.maps.LatLng(37.58506980062978, 126.88550246441767);
 

var marker = new kakao.maps.Marker({
  position: markerPosition, 
  image: markerImage // 마커이미지 설정 
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);  
*/

let markerOptions =[
  { 
    title: "본점",
    latlng : new kakao.maps.LatLng(37.58506980062978, 126.88550246441767), 
    imgSrc : 'img/marker1.png', 
    imgSize : new kakao.maps.Size(116, 50),
    imgPos : {offset: new kakao.maps.Point(58, 50)}, 
    button: branch_btns[0]

  },
  { 
    title: "지점1",
    latlng : new kakao.maps.LatLng(37.5162016, 127.0759248), 
    imgSrc : 'img/marker2.png', 
    imgSize : new kakao.maps.Size(116, 50),
    imgPos : {offset: new kakao.maps.Point(58, 50)}, 
     button: branch_btns[1]

  },
  { 
    title: "지점2",
    latlng : new kakao.maps.LatLng(37.5116828, 127.059151), 
    imgSrc : 'img/marker3.png', 
    imgSize : new kakao.maps.Size(116, 50),
    imgPos : {offset: new kakao.maps.Point(58, 50)}, 
    button:branch_btns[2]
  }

];
//반복을 돌면서 마커이미지를 정해진 위치로 배치 
for(let i=0; i<markerOptions.length; i++){
  let marker = new kakao.maps.Marker({
    map:map, 
    position:markerOptions[i].latlng, 
    title:markerOptions[i].title, 
    image: new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)
  }); 

  //각 브랜치 버튼을 클릭했을때 
  markerOptions[i].button.addEventListener("click", e=>{
    e.preventDefault(); 
    //브랜치 버튼 활성화 
    for(let k=0; k<markerOptions.length; k++){
      markerOptions[k].button.classList.remove("on"); 
    }
    markerOptions[i].button.classList.add("on"); 
    //클릭한 브랜치위치로 이동 
    map.panTo(markerOptions[i].latlng);
  })
}

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도 타입 컨트롤을 지도에 표시합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);


// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

//지도이동방지 
setDraggable(true);
//지도 확대 축소 
setZoomable(true); 

//지도이동기능 함수 
function setDraggable(draggable) {
  // 마우스 드래그로 지도 이동 가능여부를 설정합니다
  map.setDraggable(draggable);    
}

//지도 확대 축소 
function setZoomable(zoomable) {
  // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
  map.setZoomable(zoomable);    
}

//교통정보 보기 버튼 클릭시 
t_on.addEventListener("click", (e)=>{
  e.preventDefault(); 

  if(t_on.classList.contains("on")) return; 
  map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); 

  t_on.classList.add("on"); 
  t_off.classList.remove("on");   
}); 

//교통정보 끄기 버튼 클릭시 
t_off.addEventListener("click",e=>{
  e.preventDefault(); 
  //이미 t_off에 on이 있다면 아래 코드를 실행하지 않고 코드 종료
  if(t_off.classList.contains("on")) return; 
  map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); 
  t_on.classList.remove("on"); 
  t_off.classList.add("on"); 
}); 


//브라우저너비사이즈를 변경할때 
//마커가 항상 화면 가운데 위치하도록 
window.addEventListener("resize",()=>{
  //branch li에서 on이 붙은 li를 찾는다 
  let active_btn = document.querySelector(".branch li.on"); 
  //on이 붙은 li의 data-index을 찾는다 
  let active_index = active_btn.getAttribute("data-index"); 
  //배열중에서 data-index번째의 위치로 항상 가운데 유지 
  map.setCenter(markerOptions[active_index].latlng)
});