

document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== ''){
        showWarning('carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=b3c3e754a9c820b5b4478d95ea002a8f&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();

        if(json.cod ===200){
            getInfo({
                city: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                weatherIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clear();
            showWarning('verifique se o nome da cidade está correto e tente novamente!')
        }
        
        

    } else {
        clear();
        
    }
})

function getInfo (json){
            showWarning('');
            document.querySelector('.titulo').innerHTML = `${json.city}, ${json.country}`;
            document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`;
            document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.weatherIcon}@2x.png`);
            document.querySelector('.ventoInfo').innerHTML = `${(json.windSpeed * 1.6).toFixed(2)}<span>km/h</span>`;
            document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;
            document.querySelector('.resultado').style.display = 'block';
}


function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

function clear(){
    document.querySelector('.resultado').style.display = 'none';
    showWarning('');
}