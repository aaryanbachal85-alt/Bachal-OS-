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

// === SET UP EVERY WINDOW + ICON HERE ===
addWindowTapHandling(welcomeScreen);
initializeWindow("portfolio");
initializeIcon("portfolioIcon", "portfolio");
initializeWindow("travel");
initializeIcon("travelIcon", "travel");

/* ========== PART 5: TRAVEL BUCKET LIST APP ==========
   Template for future apps: data array + sidebar + viewer. */

var travelDestinations = [
  {
    name: "Switzerland",
    continent: "Europe",
    content: `
      <h2 style="margin-top: 0;">🇨🇭 Switzerland</h2>
      <img src="switzerland1.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="switzerland2.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="switzerland3.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <p>Home to the Swiss Alps and the Matterhorn, Switzerland is famous for dramatic mountain scenery and crystal-clear lakes. Scenic train rides and world-class chocolate make it a dream destination.</p>
    `
  },
  {
    name: "Iceland",
    continent: "Europe",
    content: `
      <h2 style="margin-top: 0;">🇮🇸 Iceland</h2>
      <img src="iceland1.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="iceland2.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="iceland3.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <p>The land of fire and ice, where glaciers, volcanoes, and hot springs sit side by side. Waterfalls like Skógafoss and the Northern Lights make it one of the most otherworldly places on Earth.</p>
    `
  },
  {
    name: "Japan",
    continent: "Asia",
    content: `
      <h2 style="margin-top: 0;">🇯🇵 Japan</h2>
      <img src="japan1.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="japan2.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="japan3.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <p>Ancient temples and traditions blend with futuristic neon cities. From Kyoto's cherry blossoms to the busy streets of Tokyo, there's something new around every corner.</p>
    `
  },
  {
    name: "Norway",
    continent: "Europe",
    content: `
      <h2 style="margin-top: 0;">🇳🇴 Norway</h2>
      <img src="norway1.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="norway2.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="norway3.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <p>Deep fjords and towering mountains create some of the most dramatic coastline on Earth. The midnight sun in summer and the Northern Lights in winter make it unforgettable.</p>
    `
  },
  {
    name: "Canada",
    continent: "North America",
    content: `
      <h2 style="margin-top: 0;">🇨🇦 Canada</h2>
      <img src="canada1.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="canada2.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="canada3.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <p>Home to stunning national parks like Banff with its turquoise lakes and the Rocky Mountains. Niagara Falls and the city of Vancouver round out an incredibly diverse country.</p>
    `
  },
  {
    name: "Italy",
    continent: "Europe",
    content: `
      <h2 style="margin-top: 0;">🇮🇹 Italy</h2>
      <img src="italy1.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="italy2.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="italy3.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <p>Packed with history, from the Colosseum in Rome to the canals of Venice. Add the rolling hills of Tuscany and incredible food, and it's easy to see why it's a top destination.</p>
    `
  }
];

var travelSidebar = document.querySelector("#travelSidebar");
var travelContent = document.querySelector("#travelContent");

// Sidebar instruction text
var instructions = document.createElement("div");
instructions.innerHTML = `
  <p style="margin: 0px; font-weight: bold;">🌍 Select a country</p>
  <p style="font-size: 12px; margin: 0px; opacity: 0.6; margin-bottom: 8px;">Tap a destination below</p>
`;
travelSidebar.appendChild(instructions);

// Default viewer message before anything is clicked
travelContent.innerHTML = `
  <h2 style="margin-top: 0;">🌍 Bachal's Travel Bucket</h2>
  <p>Select a country from the sidebar to see photos and a description!</p>
`;

// Adds one clickable item to the sidebar
function addToSideBar(index) {
  var destination = travelDestinations[index];
  var newDiv = document.createElement("div");
  newDiv.className = "sidebarItem";
  newDiv.style.padding = "8px";
  newDiv.style.borderRadius = "8px";
  newDiv.style.cursor = "pointer";
  newDiv.innerHTML = `
    <p style="margin: 0px;">${destination.name}</p>
    <p style="font-size: 12px; margin: 0px; opacity: 0.6;">${destination.continent}</p>
  `;
  // Click = show this destination
  newDiv.addEventListener("click", function() {
    setTravelContent(index);
  });
  travelSidebar.appendChild(newDiv);
}

// Shows a destination in the viewer
function setTravelContent(index) {
  var destination = travelDestinations[index];
  travelContent.innerHTML = destination.content;
}

// One sidebar item per destination
for (let i = 0; i < travelDestinations.length; i++) {
  addToSideBar(i);
}

// Badminton Video App

var badmintonlist = [
  {
    name: "Match 1",
    date: "8/5/26",
    content: `
      <h2 style="margin-top: 0;">Match 1</h2>
      <video src="Match1.mp4" style="width:100%; border-radius: 12px;" controls></video>
      <p>Anirud vs Bachal Match 1. Bachal Wins.</p>
    `
  }, 
  {
    name: "Match 2",
    date: "8/5/26",
    content: `
      <h2 style="margin-top: 0;">Match 2</h2>
      <video src="Match2.mp4" style="width:100%; border-radius: 12px;" controls></video>
      <p>Anirud vs Bachal Match 2. Anirud Wins.</p>
    `
  },
  {
    name: "Match 3", 
    date: "8/5/26", 
    content: `
      <h2 style="margin-top: 0;">Match 3</h2>
      <video src="Match3.mp4" style="width:100%; border-radius: 12px;" controls></video>
      <p>Final Match Anirud vs Bachal. Bachal Wins the Set 2-1.</p>
    `
  }
];

// SideBar
var badmintonSidebar = document.querySelector("#badmintonSidebar");
var badmintonContent = document.querySelector("#badmintonContent");

// Sidebar Instrucution text
var badmintonInstructions = document.createElement("div");
badmintonInstructions.innerHTML = `
  <p style="margin: 0px; font-weight: bold;">🏸 Select a match</p>
  <p style="margin: 0px; opacity: 0.6; margin-bottom: 8px;">Tap a video below</p>
`;
badmintonSidebar.appendChild(badmintonInstructions)

// Default Message before anything is clicked
badmintonContent.innerHTML = `
  <h2 style="margin-top: 0;">Bachal's Matches</h2>
  <p>Tap on an event on the left to watch the video!</p>
`;

// Adds one clickable item to the sidebar
function addToBadmintonSidebar(index) {
  var match = badmintonlist[index];
  var newDiv = document.createElement("div");
  newDiv.className = "sidebarItem";
  newDiv.style.padding = "8px";
  newDiv.style.borderRadius = "8px";
  newDiv.style.cursor = "pointer";
  newDiv.innerHTML = `
    <p style="margin: 0px;">${match.name}</p>
    <p style="font-size: 12px; margin: 0px; opacity: 0.6;">${match.date}</p>
  `;
  newDiv.addEventListener("click", function () {
    badmintonContent.innerHTML = match.content;
  });
  badmintonSidebar.appendChild(newDiv);
}

for (let i = 0; i < badmintonlist.length; i++) {
  addToBadmintonSidebar(i);
}

initializeWindow("badminton");
initializeIcon("badmintonIcon", "badminton");


