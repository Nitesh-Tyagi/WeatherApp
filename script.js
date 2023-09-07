console.log("Hello World!");

const name = document.getElementById('city');
const but = document.getElementById('searchButton');

const rName = document.getElementById('rName');
const rCity = document.getElementById('rCity');
const rTime = document.getElementById('rTime');
const rWeather = document.getElementById('rWeather');
const rTemp = document.getElementById('rTemp');

async function getData(name){
	const data = await fetch(`https://api.weatherapi.com/v1/current.json?key=a05f415d33dc47fa80e133550230709&q=${name}&aqi=no`)
	return await data.json();
}

but.addEventListener('click', async () => {
	if(name.value==''){
		name.value = name.placeholder;
	}

	const res = await getData(name.value);
	rName.innerText = `${res.location.name}`
	rCity.innerText = `${res.location.region}, ${res.location.country}`
	let tempTime = `${res.location.localtime}`.slice(-5);
	const x = parseInt(tempTime.slice(0,2));
	if(x>=12){
		tempTime = tempTime.concat(' pm');
	}
	else{
		tempTime = tempTime.concat(' am');
	}
	rTime.innerText = tempTime;
	rWeather.innerText = `${res.current.condition.text}`
	const temp = `${res.current.temp_c}`
	rTemp.innerText = `${temp} C`

	console.log(document);
	const allChildren = document.querySelector('body').children
	const body = document.querySelector('body')

	let theme = 'stone';
	if(temp<=10){
		theme = 'sky'
	}
	else if(temp<=20){
		theme = 'lime'
	}
	else{
		theme = 'amber'
	}
	for(let i=0;i<allChildren.length;i++){
			allChildren.item(i).className = allChildren.item(i).className.replaceAll('stone',theme);
		}
	body.className = body.className.replaceAll('stone',theme);
	name.className = name.className.replaceAll('stone',theme);
	but.className = but.className.replaceAll('stone',theme);
});
