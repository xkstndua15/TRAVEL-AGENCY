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

// add marker
const markerPosition = new kakao.maps.LatLng(37.2634061, 127.0285841);
const markerImage = new kakao.maps.MarkerImage("../img/location/location.png", new kakao.maps.Size(64, 69), {offset: new kakao.maps.Point(27, 69)});

marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage
});

marker.setMap(map);

// add info window
const iwContent = `<div class="infoWindow">Travel Agency</div>`;
const iwPosition = new kakao.maps.LatLng(37.2641061, 127.0286841);
const iwRemoveable = true;

const infowindow = new kakao.maps.InfoWindow({
    map: map,
    position: iwPosition,
    content: iwContent,
    removeable: iwRemoveable
});