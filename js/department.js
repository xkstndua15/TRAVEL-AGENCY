const body = document.querySelector("body");
const frame = body.querySelector(".wrap");

frame.addEventListener("click", (e) => {
    e.preventDefault();

    const target = e.target.closest("a");

    if(!target)
        return;

    console.log(target.parentNode);
    const imgSrc = target.getAttribute("href");
    const name = target.parentNode.querySelector("h2").innerText;

    let pop = document.createElement("aside");

    const pops = `
                <div>
                    <img src="${imgSrc}">
                    <h2>${name}</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis alias illo ea quia cum soluta, qui, blanditiis iste nemo quos distinctio, tempore quo aspernatur neque voluptatum. Optio cupiditate numquam ratione?</p>
                    <span><i class="fa-solid fa-xmark closeBtn"></i></span>
                </div>
    `
    pop.innerHTML = pops;

    body.append(pop);
});

body.addEventListener("click", (e) => {
    let target = e.target.closest("aside");

    console.log(target);

    if(target == undefined)
        return;

    let close = target.querySelector(".closeBtn");

    if(e.target == close) {
        target.remove();
    }
});