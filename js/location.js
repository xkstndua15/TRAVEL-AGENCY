const mainBtn = document.querySelector(".mainBtn");
const subBtn = document.querySelector(".subBtn");
const trafficBtn = document.querySelector(".trafficBtn");

const mapContainer = document.getElementById("map");
const mapOption = {
    center: new kakao.maps.LatLng(37.2634061, 127.0285841),
    level: 3
};
const mapTypeControl = new kakao.maps.MapTypeControl();

const map = new kakao.maps.Map(mapContainer, mapOption);

// add control
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// set zoom, drag 속성
setDraggable(false);
setZoomable(false);

function setZoomable(zoomable) {
    map.setZoomable(zoomable);    
}

function setDraggable(draggable) {
    map.setDraggable(draggable);    
}

const markerOptions = [
    {
        title: "main",
        latlng: new kakao.maps.LatLng(37.2634061, 127.0285841),
        imgSrc: "../img/location/location.png",
        imgSize: new kakao.maps.Size(64, 69),
        imgPos: {offset: new kakao.maps.Point(27, 69)},
        button: mainBtn,
        iwPosition: new kakao.maps.LatLng(37.2641061, 127.0286841)
    },
    {
        title: "sub",
        latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
        imgSrc: "../img/location/location.png",
        imgSize: new kakao.maps.Size(64, 69),
        imgPos: {offset: new kakao.maps.Point(27, 69)},
        button: subBtn,
        iwPosition: new kakao.maps.LatLng(37.5669952, 126.9780451)
    }
]

for(let i = 0; i < markerOptions.length; i++) {
    new kakao.maps.Marker({
        map: map,
        position: markerOptions[i].latlng,
        title: markerOptions[i].title,
        image: new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)
    });
    new kakao.maps.InfoWindow({
        map: map,
        position: markerOptions[i].iwPosition,
        content: `<div class="infoWindow">Travel Agency</div>`,
    });

    markerOptions[i].button.addEventListener("click", (e) => {
        e.preventDefault();

        for(let j = 0; j < markerOptions.length; j++) {
            markerOptions[j].button.classList.remove("on");
        }
        markerOptions[i].button.classList.add("on");

        moveTo(markerOptions[i].latlng);
    });
    
    moveTo(new kakao.maps.LatLng(37.2634061, 127.0285841));
}

function moveTo(target) {
    const moveLatLon = target;

    map.panTo(moveLatLon);
}

trafficBtn.addEventListener("click", (e) => {
    e.preventDefault();

    trafficBtn.classList.toggle("on");

    if(trafficBtn.classList.contains("on")) {
        trafficBtn.innerText = trafficBtn.innerText.replace("View", trafficBtn.getAttribute("href"));
        trafficBtn.setAttribute("href", "View");
        map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    } else {
        trafficBtn.innerText = trafficBtn.innerText.replace("Hide", trafficBtn.getAttribute("href"));
        trafficBtn.setAttribute("href", "Hide");
        map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    }
});
