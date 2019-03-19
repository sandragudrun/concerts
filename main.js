const dayNames = ["Sunnudaginn", "Mánudaginn", "Þriðjudaginn", "Miðvikudaginn", "Fimmtudaginn", "Föstudaginn", "Laugardaginn"];
const monthNames = ["Janúar", "Febrúar", "Mars", "Apríl", "Maí", "Júní", "Júlí", "Ágúst", "September", "Október", "Nóvember", "Desember"];
const pad =(value)=> { 
    if (value < 10) { 
    return '0' + value; 
    } 
    else 
    { 
        return value; 
    }
} // til að klukkan verði 21:00 en ekki 21:0 t.d
const getDateString =(concertDateString)=> {
    const concertDate = new Date(concertDateString) //kalla á þetta fyrir neðan í concert.dateOfShow
    return `${dayNames[concertDate.getDay()]} 
    ${concertDate.getDate()}.
    ${ monthNames[concertDate.getMonth()]} 
    kl. ${concertDate.getHours()}:${pad(concertDate.getMinutes())}`;
}
const createCard =(concert)=> {
    return `<div class="card"><h1>${concert.eventDateName}</h1>
    <img src="${concert.imageSource}" alt="${concert.eventDateName}">
    <h3>${concert.name}</h3>
    <p>${getDateString(concert.dateOfShow)}</p>
    <h4>${concert.userGroupName}</h4>
    <h4>${concert.eventHallName}</h4>
    </div>
    `;  
}
window.addEventListener("load", ()=>{
    fetch("https://apis.is/concerts")
    .then((results)=>{
        return results.json();
    })
    .then((json)=>{
        console.log(json.results)
        const mainDiv = document.getElementById("main");
        mainDiv.innerHTML ="";
        for(let i=0; i<json.results.length;i++){
            console.log(json.results[i]);  
            mainDiv.innerHTML += createCard(json.results[i]) ;           
        }
    })
})