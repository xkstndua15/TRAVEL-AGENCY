// news 스크롤 애니메이션 변수
const introduce = document.getElementById("introduce");
const newsVisible = introduce.offsetTop - 900;
const newsArticle = introduce.querySelectorAll("article");

// visual 버튼 클릭 애니메이션 변수
const startBtn =  document.querySelector(".startBtn");
const closeBtn = document.querySelector(".closeBtn");
const ballons = document.querySelectorAll(".upBallon");
const mainBallon = document.querySelector(".mainBallon");
const sitemap = document.querySelector(".sitemap");

// information 변수
const information = document.getElementById("information");
const p = information.querySelectorAll("p");
const countTop = information.offsetTop - information.offsetHeight;
const countBottom = information.offsetTop - (information.offsetHeight / 2);
let isTopCount = false;
let isBottomCount = false;

// visual button click event
startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    delay = getComputedStyle(mainBallon).transitionDuration.slice(0,1) * 1000;

    setTimeout(startButtonClicked, delay);

    ballons.forEach((el, index) => {
        el.style.opacity = "1";
        el.style.top = "-10%";
    });
    mainBallon.style.top = "-50%";

});

// video close button click event
closeBtn.addEventListener("click", () => {
    sitemap.style.opacity = "0";
    sitemap.style.zIndex = "-1";

    ballons.forEach((el, index) => {
        el.style.display = "block";
    });

    mainBallon.style.top = "11%";
});

// scroll Event
addEventListener("scroll", (e) => {
    const currentScroll = window.scrollY || window.offsetTop;

    // news 로직
    if(currentScroll >= newsVisible) {
        for(el of newsArticle) {
            el.classList.add("on");
        }
    } else {
        for(el of newsArticle) {
            el.classList.remove("on");
        }
    }
    console.log(isTopCount);
    console.log("current " + currentScroll);
    console.log(countTop);

    // information count 로직
    if(currentScroll >= countTop && !isTopCount) {
        isTopCount = true;
        topCount(p[0], 37, 30);
        topCount(p[1], 677, 1);
    } else if(currentScroll < countTop){
        isTopCount = false;
    }
    if(currentScroll >= countBottom && !isBottomCount) {
        isBottomCount = true
        bottomCount(p[2], 87, 15);
        bottomCount(p[3], 107, 15);
    } else if(currentScroll < countBottom) {
        isBottomCount = false;
    }
});

const startButtonClicked = () => {
    ballons.forEach((el) => {
        el.style.display = "none";
        el.style.top = "100%";
    });
    sitemap.style.opacity = "1";
    sitemap.style.zIndex = "10";
}

function topCount(el, num, time) {
    let currentNum = 0;
    
    let timer = setInterval(()=> {
        currentNum++;

        if(currentNum >= num || !isTopCount)
            clearInterval(timer);

        el.innerText = currentNum;
    }, time);
}

function bottomCount(el, num, time) {
    let currentNum = 0;
    
    let timer = setInterval(()=> {
        currentNum++;

        if(currentNum >= num || !isBottomCount)
            clearInterval(timer);

        el.innerText = currentNum;
    }, time);
}