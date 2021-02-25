const imageEnvelope = document.querySelectorAll(".img");
const rain = document.getElementById("rain");
const glass_drops = document.getElementById("glass_drops");
const papers = document.getElementById("papers");
const modal = document.querySelector("#modal");
let showModal = false;

for(var i=0; i<50; i++) {
    const drop1 = document.createElement("div");
    const drop2 = document.createElement("div");

    drop1.setAttribute("class", "water_drop");
    drop2.setAttribute("class", "glass_drop");

    drop1.innerHTML = "<img src='./dist/img/water_drop.png' alt='"+i+1+"'/>"
    drop2.innerHTML = "<img src='./dist/img/glass_drop.png' alt='"+i+1+"'/>"

    rain.appendChild(drop1);
    glass_drops.appendChild(drop2);
}

for(var i=0; i<7; i++) {
    const paper = document.createElement("div");
    paper.setAttribute("class", "paper");
    paper.innerHTML = "<img src='./dist/img/paper.png' alt='"+i+1+"'/>"

    papers.appendChild(paper);
}

setInterval(() => {
    document.querySelector("body").classList.add("lighten");
    setTimeout(() => {
        document.querySelector("body").classList.remove("lighten")
    }, 50);
}, 5000);


let innerHTML = "";
for(var i=0; i< 20; i++) {
    let waveDrop = '<div class="drop_waves">';
    waveDrop += '<div class="wave"></div>';
    waveDrop += '<div class="wave"></div>';
    waveDrop += '<div class="wave"></div>';
    waveDrop += '</div>';

    innerHTML += waveDrop;
}
document.querySelector(".waves").innerHTML = innerHTML;
const waves = document.querySelector(".waves");
const dropWaves = waves.querySelectorAll(".drop_waves");

dropWaves.forEach(dW => {
    const rand = (Math.random() * 90) + 0;
    dW.style.bottom = rand + "px"; 
});



document.getElementById("blinds_rope").addEventListener("click", () => {
    document.getElementById("blinds").classList.toggle("opened");
    document.querySelector(".cards").classList.toggle("closed");
    document.querySelector(".links").classList.toggle("closed");
});


setInterval(() => {
    document.querySelector(".content").classList.toggle("dark");
}, 10000);

document.querySelectorAll(".card").forEach((card, o) => {
    card.addEventListener("click", async() => await loadModal(o));
    o++;
});

document.getElementById("close").addEventListener("click", closeModal);

async function loadModal(file_order) {
    modal.classList.add("show");
    await readAndShowFile(file_order);
}

function closeModal() {
    modal.classList.remove("show");
}

async function readAndShowFile (file_order) {
    console.log(file_order);
    modal.querySelector(".content").innerText =  "";
    let file = "";
    if(file_order === 1) file ="./dist/files/html.txt";
    if(file_order === 2) file ="./dist/files/scss.txt";
    if(file_order === 3) file ="./dist/files/js.txt";

    const http = new XMLHttpRequest();
    http.open("get", file, true);
    http.onload = () => {
        if(http.readyState === 4) {
            if(http.status === 200) {
                modal.querySelector(".content").innerText = http.responseText;
            } else {
                modal.querySelector(".content").innerHTML = "<h2>Not found</h2>";
            }
        }
        http.onerror = () => {
            modal.querySelector(".content").innerHTML = http.statusText;
        }
    }
    http.send();

}

document.getElementById("copy").onclick = () => {
    const content = modal.querySelector(".content");
    navigator.clipboard.writeText(content.innerText);
    modal.classList.add("coppied");
    setTimeout(() => {
        modal.classList.remove("coppied");
    }, 1000);
}

function play(audio) {
    audio.play();
    return new Promise(function(resolve, reject) {
        audio.addEventListener('ended', resolve);
    });
}

window.addEventListener('load', function () {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var source = audioCtx.createBufferSource();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './dist/mp3/rain.mp3');
    xhr.responseType = 'arraybuffer';
    xhr.addEventListener('load', function (r) {
        audioCtx.decodeAudioData(
                xhr.response, 
                function (buffer) {
                    source.buffer = buffer;
                    source.connect(audioCtx.destination);
                    source.loop = true;
                });
        source.start(0);
    });
    xhr.send();
});

// window.onload = () => {
    // var audio = new Audio('./dist/mp3/rain.mp3');   
    // audio.play();
    document.getElementById("play").click();
// }



