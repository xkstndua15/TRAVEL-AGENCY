// Mediaquery 햄버거버튼
const menuBtn = document.querySelector(".callBtn");
const menuMo = document.querySelector(".menuMo");

// window창 맨 위로 올려주는 변수
const scrollUp = document.querySelector("#upBtn");
const upBtnVisible = document.getElementById("visual").offsetTop;

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

// click menuBtn
menuBtn.addEventListener("click", (e) => {
    e.preventDefault();

    console.log("햄버거")

    menuBtn.classList.toggle("on");
    menuMo.classList.toggle("on");
});

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
    const currentScroll = window.scrollY;

    // 버튼 로직
    if(currentScroll >= upBtnVisible) {
        scrollUp.style.opacity = "1";
        scrollUp.style.bottom = "30px";
    } else {
        scrollUp.style.opacity = "0";
        scrollUp.style.bottom = "-100px";
    }

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
});

scrollUp.addEventListener("click", (e) => {
    e.preventDefault();

    window.scrollTo({left: 0, top: 0, behavior: "smooth"});
});

const startButtonClicked = () => {
    ballons.forEach((el, index) => {
        el.style.display = "none";
        el.style.top = "100%";
    });
    video.style.opacity = "1";
    video.style.zIndex = "10";
}