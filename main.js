const scrollUp = document.querySelector("#upBtn");

addEventListener("scroll", (e) => {
    const currentScrollY = window.scrollY;

    if(currentScrollY >= 100) {
        scrollUp.style.opacity = "1";
        scrollUp.style.bottom = "30px";
    } else {
        scrollUp.style.opacity = "0";
        scrollUp.style.bottom = "-100px";
    }

})

scrollUp.addEventListener("click", (e) => {
    e.preventDefault();

    window.scrollTo({left: 0, top: 0, behavior: "smooth"});
});

