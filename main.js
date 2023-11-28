
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMDI3ZTlhMS0zYTBkLTQzYjAtYWExMC1mNjBmYjA0MzlhNzkiLCJpZCI6MTc4NzcyLCJpYXQiOjE3MDAzMzE0NzZ9.nbiTeEx2bzF47y-xNyimA1hu3Qkj7EAUzEfRYaZ0EdU';

const viewer = new Cesium.Viewer('cesiumContainer', {
    terrain: Cesium.Terrain.fromWorldTerrain(),
});

const initialXPosition = $("#arrowImg").position().left
const initialYPosition = $("#arrowImg").position().top

const globeImgWidth = $("#globeImg").width()
const globeImgHeight = $("#globeImg").height()

let globeLongitude = 0
let globeLatitude = 0

function getLocationOnGlobe() {
    var windowPosition = new Cesium.Cartesian2(viewer.container.clientWidth / 2, viewer.container.clientHeight / 2);
    var pickPosition = viewer.camera.pickEllipsoid(windowPosition);
    var pickPositionCartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(pickPosition);
    globeLongitude = pickPositionCartographic.longitude * (180 / Math.PI)
    globeLatitude = pickPositionCartographic.latitude * (180 / Math.PI)
}

function moveArrowToNewLocation() {
    leftPosDiff = (globeLongitude / 180) * (globeImgWidth / 2)
    bottomPosDiff = (globeLatitude / 90) * (globeImgHeight / 2)

    $("#arrowImg").css('left', initialXPosition + leftPosDiff);
    $("#arrowImg").css('bottom', initialYPosition + bottomPosDiff);
}

function initArrowOnMap() {
    getLocationOnGlobe();
    moveArrowToNewLocation();
}

viewer.camera.moveEnd.addEventListener(function () {
    getLocationOnGlobe();
    moveArrowToNewLocation();
});

function setNewPosition(e) {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = globeImgHeight - (e.clientY - rect.top);

    let halfWidth = globeImgWidth / 2
    let halfHeight = globeImgHeight / 2

    let newLongitude = ((x - halfWidth) / halfWidth) * 180
    let newLatitude = ((y - halfHeight) / halfHeight) * 90

    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(newLongitude, newLatitude, 50000),
    });
}

$('#globeImg').on("click", setNewPosition)



