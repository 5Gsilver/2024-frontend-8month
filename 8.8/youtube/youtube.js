/*
참고문서 playlistItems:list 
https://developers.google.com/youtube/v3/docs/playlistItems/list?hl=ko

구글 cloud 
1. 프로젝트 생성 
2. 사용자 인증정보 API키 발급 - 키제한(v3)
3. youtube v3검색 사용버튼 클릭 - 관리 

part 
API응답에 포함될 하나 이상의 playlistItem리소스 속성의 목록 지정 

part=snippet 으로 설정하면 모든 속성 반환 (title, description, position,resourceId)
-API요청 매개변수와 일치하는 재생목록 항목 리스트 반환 

maxResults 반환하는 최대항목수 0~50 기본값은 5


데이터 요청 url 
https://www.googleapis.com/youtube/v3/playlistItems

 


key :'AIzaSyDIu7yLtVVV9cuATz3asgR4s-qRGei3EzY' 

요청할수 있는 동영상 갯수 0~50 
maxResults = 5

플레이리스트 id  
'PL9GOLFF44JHnUSDJOzSEI928iYezoQn6G'


fetch(데이터요청url)
.then( return 데이터요청성공시 받아지는 데이터)
.then(위에서 전달받은 data를 가공하여 화면에 렌더링)
.catch(err=> 에러구문 출력)

*/
const key = 'AIzaSyBADK3pYdhbWCf2orspruBqLZ-6h-ntI6s'; 
const playlistId = 'PLQH96znwjT_ZzW7aMq-mBso82_dke9rj2'; 
const num = 10; 
//쿼리스트링형식으로 데이터요청 
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

const vidList = document.querySelector(".vidList"); 

//fetch로 데이터 요청 
fetch(url) 
.then( data =>{
  return data.json(); 
  //data를 json형식으로 바꿔서 return으로 다음 then구문으로 보내줌 
} )
.then(json=>{ //받은 json형식의 data를 이곳에서 가공 
  //console.log(json)

  let items = json.items; 
  //console.log(items); 

  let result =''; 
  //items를 반복을 돌면서 안쪽의 코드 실행 
  items.map((item)=>{
    console.log(item); 
    //날짜를 배열로 나누어 첫번째 요소를 반환- replaceAll로 부호교체  
    let date = item.snippet.publishedAt; //2023-11-17T03:48:54Z
    date = date.split("T")[0]; //['2023-11-17', '03:48:54Z']
    date = date.replaceAll("-", "."); //2023.11.17
    
    //title(제목)의 글자수가 30자를 초과할경우 잘라주기 
    let title = item.snippet.title; 
    if(title.length >30 ){
      title = title.substr(0,30)+"..."; 
    }
    //description 글자수가 100자를 초과할경우 잘라주기 +... 
    let description = item.snippet.description; 
    if(description.length >100){
      description = description.substr(0,100)+"..."; 
    }

    //빈문자열에 article을 반복하여 쌓아주기 
    result+= `
          <article>
            <a href="${item.snippet.resourceId.videoId}" class="pic">
              <img src="${item.snippet.thumbnails.standard.url}"/> 
            </a>
            <div class="con">
              <h2>${title}</h2>
              <p>${description}</p>
              <span>${date}</span>
            </div>
          </article>
    `
  }); 

  //vidList에 result로 쌓인 문자열 넣기 
  vidList.innerHTML = result; 
})

//이미지썸네일을 클릭했을 때 
//해당 video가 담긴 pop이 뜨도록 처리 
//동적으로 만든 요소는 이벤트구문을 쓸수 없으므로 
//이미 있는 요소에 이벤트 의탁
//e.currentTarget :이벤트 구문에 연결된 대상 
//e.target : 실제 클릭한 대상 
vidList.addEventListener("click", (e)=>{

  e.preventDefault(); //이동방지 
  console.log(e.currentTarget); //vidList  
  console.log(e.target); //img

  //a요소의 href값을 받아야 하므로 
  //클릭한 요소의 부모태그가 a요소가 아니라면 아래 코드를 실행하지 않고 중지 
  if(!e.target.closest("a")) return; 
  const vidId = e.target.closest("a").getAttribute("href"); 
  console.log(vidId); 

  let pop = document.createElement("figure"); 
  pop.classList.add("pop"); 

 

  pop.innerHTML = ` 
                <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowscreen></iframe>
                <span class="btnClose">CLOSE</span>
  `; 

  vidList.append(pop); 
})


//pop의 close버튼을 클릭했을때 
//pop이 사라지게 처리 
vidList.addEventListener("click",e=>{
  //vidList에서 자식요소인 pop을 찾아 변수로 저장 
  const pop = vidList.querySelector(".pop"); 
  //pop이 생긴 상태라면 
  if(pop){
    //pop에서 btnClose버튼을 찾아서 변수로 저장 
    const close = pop.querySelector(".btnClose");
    //만약 내가 클릭한 대생이 close라면 pop을 제거  
    if(e.target == close) pop.remove();
  }

})