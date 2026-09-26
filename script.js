/* =========================================================
   EDIT PERSONAL CONTENT DI SINI SAJA 🎀
   ========================================================= */
const birthdayData = {
  name: "Suyati Farica",
  nickname: "Rikaaa",
  sender: "Arjuna",
  poemSender: "Dilan, Bandung 1990",
  poemPhoto: "assets/photo.jpg",

  message: `
Rika ada sedikit nih dari Juna
Selamat ulang tahun katanya!! 🎂💗

Semoga di umur yang baru ini,
hari-harimu dipenuhi banyak hal baik.

Semoga semua yang kamu perjuangkan
pelan-pelan menemukan jalannya.

Tetap jadi kamu yang seru, baik,
dan selalu punya alasan untuk tersenyum. 🌷✨
  `,

  wishes: [
    "Semoga tahun ini membawa lebih banyak kebahagiaan dan cerita seru. ✨",
    "Semoga hal-hal yang kamu semogakan perlahan menjadi nyata. 🌸",
    "Semoga kamu selalu dikelilingi orang-orang yang tulus dan baik. 💗",
    "Semoga kamu punya banyak momen yang suatu hari nanti ingin kamu kenang lagi. 🦋"
  ],

  poem: `
Bolehkah aku punya pendapat?

Ini tentang dia yang ada di bumi
Ketika Tuhan menciptakan dirinya
Kukira Dia ada maksud mau pamer
  `,

  surprise: `
Ini memang cuma sebuah website kecil,
tapi dibuat khusus supaya hari ulang tahun kamu
punya satu kejutan kecil yang bisa dikenang. 🎀

Enjoy your day! 💗
  `,

  finalMessage: `
Semoga chapter baru dalam hidup kamu
dipenuhi tawa, pengalaman baru,
orang-orang baik, dan banyak alasan
untuk merasa bahagia.

Jangan lupa menikmati perjalananmu,
bukan cuma mengejar tujuannya.

Happy Birthday! 🎂🌷✨
  `,

  photos: [
    {image:"assets/photo1.jpg", caption:"Random moment 🌷"},
    {image:"assets/photo2.jpg", caption:"Good times 💗"},
    {image:"assets/photo3.jpg", caption:"A little memory ✨"},
    {image:"assets/photo4.jpg", caption:"Why were we like this 😭"}
  ]
};

/* ===================== THEME ===================== */
const theme = {
  primary:"#FF91AD",
  primaryDark:"#ED6C8E",
  soft:"#FFDCE7",
  lavender:"#D9CDF4",
  background:"#FFF3F8",
  text:"#5C4650"
};

for(const [key,value] of Object.entries(theme)){
  document.documentElement.style.setProperty("--"+({"primary":"pink","primaryDark":"pink-dark","soft":"pink-soft","lavender":"lav","background":"bg","text":"text"}[key]||key),value);
}

const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);

function fillContent(){
  $("#openName").textContent=birthdayData.nickname||birthdayData.name;
  $("#birthdayName").textContent=birthdayData.name;
  $("#sender").textContent=birthdayData.sender;
  $("#finalName").textContent=birthdayData.name;
  $("#finalSender").textContent=birthdayData.sender;
  $("#typedMessage").textContent="";
  $("#finalText").textContent=birthdayData.finalMessage.trim();
  $("#surpriseText").textContent=birthdayData.surprise.trim();
  $("#poemText").textContent=birthdayData.poem.trim();
  $("#poemSender").textContent=birthdayData.poemSender || birthdayData.sender;
  $("#poemPhoto").src=birthdayData.poemPhoto || birthdayData.photos[3]?.image || birthdayData.photos[0]?.image;
  $("#poemPhoto").alt="Foto puisi asli";
  $("#poemPhotoButton")?.addEventListener("click",()=>openLightbox({image: birthdayData.poemPhoto || birthdayData.photos[3]?.image || birthdayData.photos[0]?.image, caption:"Foto puisi asli"}));

  const gallery=$("#gallery");
  gallery.innerHTML="";
  birthdayData.photos.forEach(photo=>{
    const el=document.createElement("article");
    el.className="photo";
    el.innerHTML=`<img src="${photo.image}" alt="${photo.caption}" loading="lazy"><p>${photo.caption}</p>`;
    el.addEventListener("click",()=>openLightbox(photo));
    gallery.appendChild(el);
  });

  const wishes=$("#wishesList");
  wishes.innerHTML="";
  ["🌸","✨","💗","🦋","🎀","🌷"].forEach((icon,i)=>{
    if(!birthdayData.wishes[i])return;
    const el=document.createElement("div");
    el.className="wish";
    el.innerHTML=`<span class="wish-icon">${icon}</span><p>${birthdayData.wishes[i]}</p>`;
    wishes.appendChild(el);
  });
}

function show(id){
  $$(".screen").forEach(x=>x.classList.remove("active"));
  $("#"+id).classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
  if(id==="birthday") confetti(80);
}

function confetti(n=60){
  const chars=["♥","✦","◆","●","✿"];
  const colors=["#ff91ad","#d9cdf4","#ffc995","#a9dcca","#ffb7ca"];
  for(let i=0;i<n;i++){
    const e=document.createElement("span");
    e.className="confetti-piece";
    e.textContent=chars[Math.floor(Math.random()*chars.length)];
    e.style.left=Math.random()*100+"vw";
    e.style.color=colors[Math.floor(Math.random()*colors.length)];
    e.style.fontSize=(8+Math.random()*12)+"px";
    e.style.setProperty("--x",(Math.random()*260-130)+"px");
    e.style.setProperty("--t",(2+Math.random()*2.8)+"s");
    document.body.appendChild(e);
    setTimeout(()=>e.remove(),5000);
  }
}

function typeMessage(text){
  const target=$("#typedMessage");
  target.textContent="";
  let i=0;
  const tick=()=>{
    if(i<text.length){
      target.textContent+=text[i++];
      setTimeout(tick,16);
    }else{
      $("#messageNext").classList.remove("hidden");
    }
  };
  tick();
}

$("#startBtn").onclick=()=>show("envelopePage");

$("#openLetterBtn").onclick=()=>{
  $("#bigEnvelope").classList.add("open");
  confetti(55);
  const bgMusic=$("#music");
  bgMusic.volume=0.45;
  bgMusic.play().then(()=>{
    musicOn=true;
    $("#musicBtn").classList.add("on");
    $("#musicBtn").textContent="🔊";
  }).catch(()=>{});
  setTimeout(()=>show("birthday"),950);
};

$$("[data-next]").forEach(btn=>btn.addEventListener("click",()=>{
  const id=btn.dataset.next;
  show(id);
  if(id==="message")setTimeout(()=>typeMessage(birthdayData.message.trim()),450);
  if(id==="final")makeFinalDecor();
}));

/* Bunny catch game */
let caught=0;
const bunnyBtn=$("#bunnyBtn");
const field=$("#bunnyField");
function moveBunny(){
  const maxX=Math.max(0,field.clientWidth-70);
  const maxY=Math.max(0,field.clientHeight-70);
  bunnyBtn.style.left=(Math.random()*maxX)+"px";
  bunnyBtn.style.top=(Math.random()*maxY)+"px";
}
bunnyBtn.addEventListener("mouseenter",moveBunny);
bunnyBtn.addEventListener("touchstart",e=>{e.preventDefault();moveBunny()},{passive:false});
bunnyBtn.addEventListener("click",()=>{
  caught++;
  $("#catchCount").textContent=`Caught: ${caught} / 3`;
  if(caught>=3){
    bunnyBtn.style.display="none";
    $("#gameDone").classList.remove("hidden");
    confetti(45);
  }else moveBunny();
});

$("#surpriseBtn").onclick=()=>{
  $("#surpriseBtn").classList.add("hidden");
  $("#surpriseTitle").textContent="Awww... you opened it 🥹";
  $("#surpriseReveal").classList.remove("hidden");
  confetti(75);
};

function makeFinalDecor(){
  const box=$("#finalDecor");
  box.innerHTML="";
  for(let i=0;i<22;i++){
    const s=document.createElement("span");
    s.className="spark";
    s.textContent=i%2?"✦":"♡";
    s.style.left=Math.random()*100+"%";
    s.style.top=Math.random()*100+"%";
    s.style.animationDelay=(Math.random()*2)+"s";
    box.appendChild(s);
  }
}

function openLightbox(photo){
  $("#lightboxImg").src=photo.image;
  $("#lightboxCaption").textContent=photo.caption;
  $("#lightbox").classList.add("show");
}
function closeLightbox(){$("#lightbox").classList.remove("show");}
$("#closeLightbox").onclick=closeLightbox;
$("#lightbox").onclick=e=>{if(e.target.id==="lightbox")closeLightbox()};

const music=$("#music");
let musicOn=false;
$("#musicBtn").onclick=()=>{
  if(musicOn){
    music.pause();musicOn=false;$("#musicBtn").classList.remove("on");$("#musicBtn").textContent="🎵";
  }else{
    music.play().then(()=>{
      musicOn=true;$("#musicBtn").classList.add("on");$("#musicBtn").textContent="🔊";
    }).catch(()=>toast("Taruh file assets/music.mp3 dulu 🎵"));
  }
};

function toast(msg){
  const t=$("#toast");t.textContent=msg;t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),2200);
}

$("#restartBtn").onclick=()=>{
  caught=0;
  $("#catchCount").textContent="Caught: 0 / 3";
  bunnyBtn.style.display="";
  moveBunny();
  $("#gameDone").classList.add("hidden");
  $("#surpriseReveal").classList.add("hidden");
  $("#surpriseBtn").classList.remove("hidden");
  $("#bigEnvelope").classList.remove("open");
  show("opening");
};

window.addEventListener("load",()=>{
  fillContent();
  setTimeout(()=>$("#loader").classList.add("hide"),650);
});
