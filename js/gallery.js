const key = "b74012b5c1b79c7c3bc8c8e61f3b23f0";
const base = "https://www.flickr.com/services/rest/?";
const method = "flickr.photos.search";
const per_page = 10;
const format = "json";
const url = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=castle&privacy_filter=1`;

const gallery = document.querySelector(".gallery");
const frame = gallery.querySelector("#list");
const loading = gallery.querySelector(".loading");
const close = gallery.querySelector("aside .closeBtn");

callData(url);

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
        console.log(json);

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

       let titleLen = data.title.indexOf(" ");
       let title = data.title
       if(titleLen == -1) {
            title = data.title;
       } else {
            title = data.title.substr(0, titleLen);
       }

       if(titleLen < data.title.length && titleLen > -1) {
            titleLen = data.title.indexOf(" ", titleLen + 1);

            if(titleLen == -1) {
                title = data.title;
            } else {
                title = data.title.substr(0, titleLen);
            }
       }

       htmls +=`
            <li class="item">
                <div>
                    <a href="${imgSrcBig}">
                        <img src="${imgSrc}" alt="">
                        <h2>TITLE</h2>
                        <h3>${title}</h3>
                        <h2>OWNER</h2>
                        <p>${data.owner}</p>
                    </a>
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