let allPlants=[];
const cats=["crops","medicinal","flowers","spices","herbs","forestry"];

Promise.all(cats.map(c=>fetch(`data/${c}.json`).then(r=>r.json())))
.then(d=>{allPlants=d.flat(); render(allPlants);});

document.getElementById("search").oninput=filter;
document.getElementById("category").onchange=filter;

function filter(){
 let val=document.getElementById("search").value.toLowerCase();
 let cat=document.getElementById("category").value;
 let res=allPlants.filter(p=>{
   return (!cat || p.category===cat) &&
   p.searchTerms.join(" ").includes(val);
 });
 render(res);
}

function render(arr){
 document.getElementById("plants").innerHTML=arr.slice(0,100).map(p=>`
 <div class="card">
 <img src="${p.image}">
 <h3>${p.name.en}</h3>
 <p>${p.description.en}</p>
 <button onclick="speak('${p.name.en}')">🔊</button>
 </div>`).join("");
}

function speak(text){
 let u=new SpeechSynthesisUtterance(text);
 speechSynthesis.speak(u);
}

function toggleDark(){
 document.body.classList.toggle("dark");
}
