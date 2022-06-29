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

const startButtonClicked = () => {
    ballons.forEach((el, index) => {
        el.style.display = "none";
        el.style.top = "100%";
    });
    video.style.opacity = "1";
    video.style.zIndex = "10";
}