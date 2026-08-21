/* ========== CLOCK ========== */

// Updates the clock text every second
function updateTime() {
  var currentTime = new Date().toLocaleString();
  var timeText = document.querySelector("#timeElement");
  timeText.innerHTML = currentTime;
}
setInterval(updateTime, 1000);

/* ========== DRAGGABLE WINDOWS ========== */

dragElement(document.getElementById("welcome"));

// Makes any element draggable
function dragElement(element) {
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Drag by the header if it exists, else drag by whole element
  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  // Record start position + attach move/stop listeners
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Move the element by how much the mouse moved
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Stop dragging on mouse release
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

/* ========== OPEN / CLOSE WINDOWS ========== */

var welcomeScreen = document.querySelector("#welcome");

// Hides a window
function closeWindow(element) {
  element.style.display = "none";
}

var welcomeScreenClose = document.querySelector("#welcomeclose");
var welcomeScreenOpen = document.querySelector("#welcomeopen");

welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
  openWindow(welcomeScreen);
});

/* ========== PART 4: WINDOW MANAGER ==========
   Gives every window: drag, close, open, rise-to-top.
   Gives every icon: tap to open/close. */

var selectedIcon = undefined;
var biggestIndex = 1;
var topBar = document.querySelector("#top");

// Highlights an icon + remembers it
function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element;
}

// Un-highlights an icon
function deselectIcon(element) {
  if (element) {
    element.classList.remove("selected");
  }
  selectedIcon = undefined;
}

// Tap icon = open app, tap again = close app
function handleIconTap(element, screen) {
  if (element.classList.contains("selected")) {
    closeWindow(screen);
    deselectIcon(element);
  } else {
    selectIcon(element);
    openWindow(screen);
  }
}

// Shows window + brings to top + keeps top bar on top
function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

// Tapping a window raises it to the top
function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  );
}

function handleWindowTap(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
  deselectIcon(selectedIcon);
}

// Fully sets up a window: drag + close button + rise to top
function initializeWindow(id) {
  var screen = document.querySelector("#" + id);
  dragElement(screen);
  document.querySelector("#" + id + "close").addEventListener("click", function() {
    closeWindow(screen);
  });
  addWindowTapHandling(screen);
}

// Fully sets up a desktop icon: tap to open/close its window
function initializeIcon(id, screenId) {
  var icon = document.querySelector("#" + id);
  var screen = document.querySelector("#" + screenId);
  icon.addEventListener("click", function() {
    handleIconTap(icon, screen);
  });
}

