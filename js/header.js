// Mediaquery 햄버거버튼
const menuBtn = document.querySelector(".callBtn");
const menuMo = document.querySelector(".menuMo");

// window창 맨 위로 올려주는 변수
const scrollUp = document.getElementById("upBtn");
const upBtnVisible = document.querySelector("header").offsetTop + document.querySelector("header").offsetHeight;

// click menuBtn
menuBtn.addEventListener("click", (e) => {
    e.preventDefault();

    console.log("햄버거")

    menuBtn.classList.toggle("on");
    menuMo.classList.toggle("on");
});

addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    // 버튼 로직
    if(currentScroll >= upBtnVisible) {
        scrollUp.style.opacity = "1";
        scrollUp.style.bottom = "30px";
    } else {
        scrollUp.style.opacity = "0";
        scrollUp.style.bottom = "-100px";
    }
});

// upButton Click
scrollUp.addEventListener("click", (e) => {
    e.preventDefault();

    window.scrollTo({left: 0, top: 0, behavior: "smooth"});
});