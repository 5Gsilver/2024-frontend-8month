/*
73tLHuUPOmiSCOi_WMnW8rOZnsgvcMsN9mxxIv-_e7o

url 메소드
search/photos

query 단어 검색

per_page 사진 갯수

데이터 요청 url
https://api.unsplash.com/search/photos
*/

const frame = document.querySelector('#list');
const unsplah_access_key = "c8Yj5Vwm8hPOFhhLm-IPq5N-FLlqkfIZCTMogPhUL6c";
const keyword = "landscape";
let num = "20";
const url = `https://api.unsplash.com/search/photos?query=${keyword}&per_page=${num}&client_id=${unsplah_access_key}`;

callData(url);

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
        console.log(json.results);

        let items = json.results;

        create(items);
        delayLoading();

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
            console.log(tags);

            let tagTxt = '';
            tags.map((tag)=>{
                tagTxt += `${tag.title}, `;
            })
            tagTxt = tagTxt.slice(0, -2);
            console.log(tagTxt);

            result +=`
                    <article>
                        <div>
                            <a href="${item.urls.full}">
                                <img src="${item.urls.thumb}" />
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
        console.log(tags);

        let tagTxt = '';
        tags.map((tag)=>{
            tagTxt += `${tag.title}, `;
        })
        tagTxt = tagTxt.slice(0, -2);
        console.log(tagTxt);

        result +=`
                <article>
                    <div>
                        <a href="${item.urls.full}">
                            <img src="${item.urls.thumb}" />
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

isoLayout()
function isoLayout(){

    loading.classList.add("off");
    frame.classList.add("on");

    new Isotope("#list",{
        itemSelector: "article",
        columnWidth: "article",
        transitionDuration: "0.5s"
    })
}

callData(url);
//검색 버튼 클릭시 이벤ㅌ,
btnsearch.addEventListener("click",()=>{
		let inputVal = input.value.trim();
		let searchUrl = `https://api.unsplash.com/search/photos?query=${inputVal}&per_page=${num}&client_id=${unsplah_access_key}`;

		console.log(searchUrl)
		const errMsg = searchBox.querySelectorAll("P");
		if(errMsgs.length > 0) errMsgs[0].remove();

		if(inputVal == ""){
			callData(searchUrl);
		}else{
			frame.innerHTML = "";
			frame.style.height = "auto"

			const errMsg = document.createElement("p");
			errMsg.classList.add("errMsg");
			errMsg.textContent = "There is no result";
			searchBox.append(errMsg);
		}
		
		function isoLayout(){
			loading.classList.add("off");
			frame.classList,add("on");

			new Isotope("#list",{

				itemSelector: "article",
				columnWidth: "article",
				transitionDuration: "0.5s"
		})

	}
	});

	//썸네일을 클릭 했을 때
	//팝업을 만들어서 큰 이미지를 불러오겠다
	frame.addEventListener("click",(e)=>{
		e.preventDefault();

		let targer = e.targer.closet("a").querySelector("thumb");
		
		if(e.target == target){
			let imgSrc = target.closet("a").getAttribute("href");

			let pop = document.createElement("aside");
			pop.classList
			let pops = `
						<div class="con">
							<img src="${imgSrc}" />
						</div>
						<span class="btnClose">CLOSE</span>
			`;
			pop.innerHTML = pops;
			document.body.append(pop);
			document.body.style.overflow = "hidden";
		}
	});

	//닫기 버튼 클릭시 (pop)
	document.addEventListener("click",(e)=>{
		e.preventDefault();
		//pop이라는 클래스명을 가진 요소를 찾아서 변수로 저장
		let pop = document.querySelector(".pop");
		let btnClose = pop.querySelector(".btnClose");
		//만약 내가 클릭한 대상이 btnClose라면 pop을 제거
		if(e.target == btnClose){
			pop.remove();
		}
	}); 