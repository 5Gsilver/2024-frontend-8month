const frame = document.querySelector('.members');

fetch("data/members.json")
.then(data=>{
	return data.json();
})


.then(json=>{
	console.log(json);

	const members = json.data;

	let html="";

	members.map(member => {
		html += `
				<div class="box">
					<div class="pic">
						<img src="img/${member.pic}"/>
					</div>
					<h2>${member.name}</h2>
					<p>${member.position}</p>
				</div>
		`
	})

	frame.innerHTML = html;

})