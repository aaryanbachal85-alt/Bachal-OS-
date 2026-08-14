function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
    timeText.innerHTML = currentTime;
}
setInterval(updateTime, 1000);

dragElement(document.getElementById("myDiv")); 

function dragElement(element) {
    var initialX = 0; 

    var initialY = 0;

    var currentX = 0;

    var currentY = 0; 

    if (document.getElementById(element.id + "header")) {

        document.getElementById(element.id + "header").onmouedown = startDragging
    } else {

        element.onmousedown = startDragging; 

    } 

function startDraggin(e) {
        e = e || window.event; 
        e.preventDefault(); 

        document.onmouseup = stopDragging;
        document.onmousemove = dragElement;


