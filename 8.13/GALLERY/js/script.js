const frame = document.querySelector("#list");
const loading = document.querySelector(".loading");

// 검색어 검색시 요소 변수로 설정
const searchBox = document.querySelector("#searchBox");
const input = searchBox.querySelector("#search");
const btnSearch = searchBox.querySelector(".btnSearch");

const UNSPLASH_ACCESS_KEY = "E2ePy7hb2NR67XQa4TB3LrOjdvom207EM8IxMOh2w2k";
const keyword = "landscape";
let num = 50;
const url = `https://api.unsplash.com/search/photos?query=${keyword}&per_page=${num}&client_id=${UNSPLASH_ACCESS_KEY }`

callData(url);


// 검색버튼 클릭시 이벤트
btnSearch.addEventListener("click", e=>{
    let inputVal = input.value.trim(); // 사용자가 검색하는 검색어

    let searchUrl = `https://api.unsplash.com/search/photos?query=${inputVal}&per_page=${num}&client_id=${UNSPLASH_ACCESS_KEY }`;

    console.log(inputVal);
    const errMsg = searchBox.querySelectorAll("p");
    if(errMsg.length >0) errMsg[0].remove();


    if(inputVal){
        callData(searchUrl);
    }else{
        frame.innerHTML = "";
        frame.computedStyleMap.height = "auto";

        const errMsg = document.createElement("p");
        errMsg.append("검색어를 입력하세요");
        searchBox.append(errMsg);
    }
    
});

// input 태그에 텍스트를 쓰고 엔터키를 눌렀을 때
input.addEventListener("keyup", e=>{
    if(e.key == "Enter"){ // 누른 키가 엔터키라면

        let inputVal = input.value.trim(); // 사용자가 검색하는 검색어
        let searchUrl = `https://api.unsplash.com/search/photos?query=${inputVal}&per_page=${num}&client_id=${UNSPLASH_ACCESS_KEY }`;

        console.log(inputVal);
        const errMsg = searchBox.querySelectorAll("p");
        if(errMsg.length >0) errMsg[0].remove();


        if(inputVal){
            callData(searchUrl);
        }else{
            frame.innerHTML = ""; // 이전에 있던 article 지우기 - 빈화면으로
            frame.computedStyleMap.height = "auto"; // 이전에 적용했던 height값 지우기

            const errMsg = document.createElement("p");
            errMsg.append("검색어를 입력하세요");
            searchBox.append(errMsg);
        }
    }
})


function callData(url){ 

    // frame 초기화
    frame.innerHTML = "";
    loading.classList.remove("off");
    frame.classList.remove("on");

    // 데이터 요청
    async function getPhoto(url){
        const response = await fetch(url);
        // json 형식으로 데이터 반환
        const data = await response.json();
        //다음에 오는 then으로 data 전달
        return data;
    }

    getPhoto(url)
    .then(json =>{


        let items = json.results;
        console.log(items);
        
        const errMsg = frame.querySelectorAll("p");
        if(errMsg.length >0) errMsg[0].remove();

        if(items.length >0) {
            create(items);
            delayLoading();
        }else{
            loading.classList.add("off");
            frame.classList.add("on");
            frame.style.height = "auto";

            const errMsg = document.createElement("p");
            errMsg.append("검색하신 검색어의 이미지가 없습니다.");
            frame.append(errMsg);
        }
        
    })
}


function create(items){

    let result = '';

    items.map((item)=>{
        // console.log(item);

        // const url  = item.urls.full;
        // console.log(url);

        // 날짜 
        let date = item.created_at.split("T")[0].replaceAll("-",".");

        // h2 description
        let desc = item.description;
        if(desc == null){
            desc = item.alt_description;

            if(item.alt_description == null){
                desc = "There is no description";
            }
        }

        if(desc.length >= 40){
            desc = desc.slice(0, 40)+". . ."
        }
        
        // tag
        let tags = item.tags;
        // console.log(tags);

        let tagTxt = '';
        tags.map((tag)=>{
            tagTxt += `${tag.title}, `;
        })
        tagTxt = tagTxt.slice(0, -2);
        // console.log(tagTxt);

        result +=`
                <article>
                    <div>
                        <a href="${item.urls.full}">
                            <img src="${item.urls.thumb}" class="thumb" />
                        </a>
                        <h2>${desc}</h2>
                        <p>${tagTxt}</p>
                        <div>
                            <img src="${item.user.profile_image.small}" class="profile"/>
                            <strong>${item.user.username}</strong>
                            <span>${date}</span>
                        </div>
                    </div>
                </article>
        `;
    })

    frame.innerHTML = result;
}


// 이미지 로딩 함수 정의
function delayLoading() {
    // #list 안쪽의 모든 이미지를 변수로 저장
    const imgs = frame.querySelectorAll("img");
    // 이미지의 전체 갯수를 변수로 저장
    const len = imgs.length;
    // 변수 count=0 으로 초기화
    let count = 0;

    // 이미지 갯수대로 반복을 돌면서
    for(let el of imgs){
        // 한개의 이미지가 로딩될때마다
        el.onload=()=>{
            // 카운트값을 1씩 증가
            count++;
            // 만약 카운트값이 전체갯수 len과 같다면 모두 로딩되었다는 뜻이므로 isotope 플로그인 적용
            if(count == len) isoLayout();
        }

        // 이미지의 부모인 아티클에서 img를 다시 찾아서
        let thumb = el.closest("article").querySelector("img");
        // 이미지가 에러가 있어서 로딩이 안될경우
        thumb.onerr =(e)=>{
            // 문제의 이미지의 부모인 아티클에서 자식인 img를 찾아서 default.jpg로 설정
            e.currentTarget.closest("article").querySelector("img").setAttribute("src", "img/default.jpg")
        }
    }
}


// 요소에 isotope 플러그인 적용 함수 정의
function isoLayout(){

    loading.classList.add("off"); // 로딩이미지 숨기기
    frame.classList.add("on"); // 안보이던 #list는 보이게

    new Isotope("#list",{ // 나란히 배치할 요소의 컨테이너부모명
        itemSelector: "article", // 나란히 배치할 요소명
        columnWidth: "article",  // 기준이 되는 요소명
        transitionDuration: "0.5s" // 재배치시 걸리는 시간
    })
}


// 썸네일을 클릭했을 때
// 팝업을 만들어서 큰이미지를 불러오겠다
frame.addEventListener("click", e=>{
    e.preventDefault();

    let target = e.target.closest("a").querySelector(".thumb");
    if(e.target == target){
        let imgSrc = target.closest("a").getAttribute("href");

        let pop = document.createElement("aside");
        pop.classList.add("pop");
        let pops = `
                    <div class="con">
                        <img src="${imgSrc}"/>
                    </div>

                    <span class="close">CLOSE</span>
        `;
        pop.innerHTML = pops;

        console.log(`pop: ${pop.nodeName}\npops: ${pops}`);
        document.body.append(pop);
        console.log(document.body);
    }
})

// pop의 닽기 버튼 클릭시 (이벤트 위임)
document.body.addEventListener("click", e=>{
    e.preventDefault();

    let pop = document.querySelector(".pop");
    let btnClose = pop.querySelector(".close");
    if (pop != null) {
        if(e.target == btnClose) {
            pop.remove();
            document.body.style.overflow = "auto";
        }  
    }
 })