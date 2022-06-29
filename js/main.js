// news 스크롤 애니메이션 변수
const news = document.getElementById("news");
const newsVisible = news.offsetTop - 900;
const newsArticle = news.querySelectorAll("article");

// visual 버튼 클릭 애니메이션 변수
const startBtn =  document.querySelector(".startBtn");
const closeBtn = document.querySelector(".closeBtn");
const ballons = document.querySelectorAll(".upBallon");
const mainBallon = document.querySelector(".mainBallon");
const video = document.querySelector(".video");

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
    video.style.opacity = "0";
    video.style.zIndex = "-1";

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
        count(p[0], 37, 3);
        count(p[1], 677, 5);
    } else if(currentScroll < countTop){
        isTopCount = false;
        p[0].innerText = '0';
        p[1].innerText = '0';
    }
    if(currentScroll >= countBottom && !isBottomCount) {
        isBottomCount = true
        count(p[2], 87, 5);
        count(p[3], 107, 5);
    } else if(currentScroll < countBottom) {
        isBottomCount = false;
        p[2].innerText = '0';
        p[3].innerText = '0';
    }
});

const startButtonClicked = () => {
    ballons.forEach((el, index) => {
        el.style.display = "none";
        el.style.top = "100%";
    });
    video.style.opacity = "1";
    video.style.zIndex = "10";
}

function count(el, num, time) {
    let currentNum = parseInt(el.innerText);

    let interver = parseInt(num / (time * 1000));

    let timer = setInterval(()=> {
        currentNum++;

        if(currentNum >= num)
            clearInterval(timer);

        el.innerText = currentNum;
    }, interver);
}