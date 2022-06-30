const vidList = document.querySelector(".vidList");
const key = "AIzaSyDv6JIUkmdFO-F6Ha1KriiO4uw0Iot8bb4";
const playlistId = "PLmAX7QJDEdu3phGnuvhY1SIPB47cipfvn";
const num = 6;

const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

fetch(url).then(data => {
    return data.json();
}).then(json => {
    let items = json.items;
    let result = "";

    items.map((item) => {
        const videoId = item.snippet.resourceId.videoId;
        const thumbnail = item.snippet.thumbnails.standard.url;
        console.log(item.snippet.thumbnails);
        const title = item.snippet.title.length > 30 ? item.snippet.title.substr(0, 30) + "..." : item.snippet.title;
        const description = item.snippet.description.length > 100 ? item.snippet.description.substr(0, 100) + "..." : item.snippet.description;
        const date = item.snippet.publishedAt.substr(0, 10);

        result += `
                        <article>
                            <a href="${videoId}" class="pic">
                                <img src="${thumbnail}">
                            </a>
                            <div class="con">
                                <h2>${title}</h2>
                                <p>${description}</p>
                                <span>${date}</span>
                            </div>
                        </article>
                       `;
    });

    vidList.innerHTML = result;
});

//create popup
vidList.addEventListener("click", (e) => {
    e.preventDefault();

    if(!e.target.closest("a"))
        return;
    
        console.log(e.target.closest("a").getAttribute("href"));

    const vidId = e.target.closest("a").getAttribute("href");

    let pop = document.createElement("figure");
    pop.classList.add("pop");

    pop.innerHTML = `
                                <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
                                <span class="closeBtn">X</span>
                              `;
    
    vidList.append(pop);
});

vidList.addEventListener("click", (e) => {
    const pop = vidList.querySelector(".pop");

    if(pop) {
        const close = pop.querySelector(".closeBtn");

        if(e.target === close) {
            pop.remove();
        }
    }
});