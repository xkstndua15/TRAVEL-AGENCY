const key = "b74012b5c1b79c7c3bc8c8e61f3b23f0";
const base = "https://www.flickr.com/services/rest/?";
const method = "flickr.photos.search";
const per_page = 20;
const format = "json";
const url = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=Travel&privacy_filter=1`;

const gallery = document.querySelector(".gallery");
const frame = gallery.querySelector("#list");
const loading = gallery.querySelector(".loading");
const input = gallery.querySelector("#search");
const btn = gallery.querySelector(".searchBtn");
const close = gallery.querySelector("aside .closeBtn");

callData(url);

btn.addEventListener("click", () => {
    let tag = input.value.trim();

    const urlF = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;
    // createList(urlF); => callData(urlF);

    if(tag != "") {
        callData(urlF);
    } else {
        alert("Enter Keyword.");
        input.value = "";
    }
});

input.addEventListener("keypress",(e)=>{
    if(e.keyCode == 13){
        let tag = input.value.trim();

        const urlF = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

        if(tag != "") {
            callData(urlF);
        } else {
            alert("Enter Keyword.");
            input.value = "";
        }
    }
});

frame.addEventListener("click", (e) => {
    e.preventDefault();

    if(e.target != e.target.closest("img"))
        return;

    let target = e.target.closest(".item");
    let imgSrc = target.querySelector("a").getAttribute("href");

    let pop = document.createElement("aside");

    let pops = `
                    <img src="${imgSrc}">
                    <span><i class="fa-solid fa-xmark closeBtn"></i></span>
    `;

    pop.innerHTML = pops;

    gallery.append(pop);
});

gallery.addEventListener("click", (e) => {
    let target = e.target.closest("aside");

    if(target == undefined)
        return;

    let close = target.querySelector(".closeBtn");

    console.log(e.target);

    if(e.target == close) {
        target.remove();
    }
})

function callData(url){
        frame.innerHTML = "";
        loading.classList.remove("off");
        frame.classList.remove("on");
    
    fetch(url)
    .then(data=>{
        let result = data.json();
        return result;
    })
    .then(json=>{
        let items = json.photos.photo;

        if(items.length > 0){
           createList(items);
           delayLoading();
        }else{
                loading.classList.add("off");
                alert("No Search Image.");
        }
    })
    }

function createList(items) {
    let htmls = "";

    items.map(data => {
        let imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`;

       let imgSrcBig = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;

       htmls +=`
            <li class="item">
                <div>
                    <a href="${imgSrcBig}">
                        <img src="${imgSrc}" alt="">
                    </a>
                    <p>${data.title}</p>
                    

                </div>
            </li>
       `;
    });
    frame.innerHTML = htmls;
}

function delayLoading(){
    const imgs = frame.querySelectorAll("img");
    const len = imgs.length;

   let count = 0;
   for(let el of imgs){
       el.onload = ()=>{
           count++;

           if(count == len) isoLayout();
       }

       el.onerror = (e)=>{
           e.currentTarget.closest(".item").style.display = "none"; 
       }
   }
}

function isoLayout(){
   frame.classList.add("on");
   loading.classList.add("off");

   new Isotope("#list",{
       itemSelector : ".item",
       columnWidth : ".item",
       transitionDuration : "0.5s"
   });
}