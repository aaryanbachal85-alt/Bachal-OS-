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
      <img src="pictures/switzerland1.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="pictures/switzerland2.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="pictures/switzerland3.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <p>Home to the Swiss Alps and the Matterhorn, Switzerland is famous for dramatic mountain scenery and crystal-clear lakes. Scenic train rides and world-class chocolate make it a dream destination.</p>
    `
  },
  {
    name: "Iceland",
    continent: "Europe",
    content: `
      <h2 style="margin-top: 0;">🇮🇸 Iceland</h2>
      <img src="pictures/iceland1.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="pictures/iceland2.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="pictures/iceland3.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <p>The land of fire and ice, where glaciers, volcanoes, and hot springs sit side by side. Waterfalls like Skógafoss and the Northern Lights make it one of the most otherworldly places on Earth.</p>
    `
  },
  {
    name: "Japan",
    continent: "Asia",
    content: `
      <h2 style="margin-top: 0;">🇯🇵 Japan</h2>
      <img src="pictures/japan1.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="pictures/japan2.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="pictures/japan3.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <p>Ancient temples and traditions blend with futuristic neon cities. From Kyoto's cherry blossoms to the busy streets of Tokyo, there's something new around every corner.</p>
    `
  },
  {
    name: "Norway",
    continent: "Europe",
    content: `
      <h2 style="margin-top: 0;">🇳🇴 Norway</h2>
      <img src="pictures/norway1.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="pictures/norway2.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="pictures/norway3.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <p>Deep fjords and towering mountains create some of the most dramatic coastline on Earth. The midnight sun in summer and the Northern Lights in winter make it unforgettable.</p>
    `
  },
  {
    name: "Canada",
    continent: "North America",
    content: `
      <h2 style="margin-top: 0;">🇨🇦 Canada</h2>
      <img src="pictures/canada1.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="pictures/canada2.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="pictures/canada3.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <p>Home to stunning national parks like Banff with its turquoise lakes and the Rocky Mountains. Niagara Falls and the city of Vancouver round out an incredibly diverse country.</p>
    `
  },
  {
    name: "Italy",
    continent: "Europe",
    content: `
      <h2 style="margin-top: 0;">🇮🇹 Italy</h2>
      <img src="pictures/italy1.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="pictures/italy2.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
      <img src="pictures/italy3.png" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
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



/* ========== BACHAL'S WALLPAPER APP ========== */

function setOSWallpaper(url) {
  document.body.style.backgroundImage = `url('${url}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  localStorage.setItem("bachal_os_wallpaper", url);
}

// Check if user already picked a custom wallpaper
var savedBg = localStorage.getItem("bachal_os_wallpaper");
if (savedBg) {
  setOSWallpaper(savedBg);
}

// Wallpaper Categories
var wallpaperCategories = [
  {
    category: "🏔️ Nature & Mountains",
    description: "Breathtaking landscapes from Switzerland, Norway, and Iceland",
    wallpapers: [
      { name: "Swiss Alps Classic", url: "https://www.ourescapeclause.com/wp-content/uploads/2022/11/shutterstock_1464930743-scaled.jpg" },
      { name: "Norwegian Fjords", url: "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1920&q=80" },
      { name: "Banff Canadian Rockies", url: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1920&q=80" },
      { name: "Dolomites Italy", url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80" },
      { name: "Iceland Waterfall", url: "https://images.unsplash.com/photo-1489440543286-a69330151c0b?auto=format&fit=crop&w=1920&q=80" },
      { name: "Mount Fuji Sunrise", url: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1920&q=80" },
      { name: "Matterhorn Peak", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80" },
      { name: "Misty Alpine Forest", url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=80" }
    ]
  },
    {
    category: "🚀 Space & Aerospace",
    description: "Rockets, fighter jets, galaxies, and deep space exploration",
    wallpapers: [
      { name: "Deep Space Nebula", url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80" },
      { name: "Rocket Launch", url: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1920&q=80" },
      { name: "Jet in Flight", url: "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1920&q=80" },
      { name: "Milky Way Galaxy", url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1920&q=80" },
      { name: "Aurora Borealis", url: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=1920&q=80" },
      { name: "Earth from Orbit", url: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1920&q=80" },
      { name: "Apollo Moon Surface", url: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=1920&q=80" },
      { name: "Space Shuttle Ascent", url: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1920&q=80" }
    ]
  },
  {
    category: "🌃 Neon & Cyberpunk",
    description: "Futuristic neon cities, rainy streets, and glowing skylines",
    wallpapers: [
      { name: "Tokyo Rainy Night", url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1920&q=80" },
      { name: "Cyberpunk Alley", url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80" },
      { name: "Futuristic Horizon", url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80" },
      { name: "Shinjuku Crossing", url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80" },
      { name: "Synthwave Highway", url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1920&q=80" },
      { name: "Hong Kong Cyber City", url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1920&q=80" },
      { name: "Neon Arcade", url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1920&q=80" },
      { name: "Purple Neon Street", url: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1920&q=80" }
    ]
  },
  {
    category: "🎨 Minimal & Aesthetic",
    description: "Clean gradients, dark dunes, and calming Japanese aesthetics",
    wallpapers: [
      { name: "Dark Velvet Dunes", url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=80" },
      { name: "Kyoto Temple Garden", url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80" },
      { name: "Moody Fog Lake", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80" },
      { name: "Sunset Gradient", url: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=1920&q=80" },
      { name: "Cosmic Wave Gradient", url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1920&q=80" },
      { name: "Golden Sunset Coast", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80" },
      { name: "Cyber Matrix Grid", url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1920&q=80" }
    ]
  },
  {
    category: "✨ Custom / Reset",
    description: "Paste your own image link or reset to default",
    isCustom: true
  }
];

// SideBar Elements
var wallpaperSidebar = document.querySelector("#wallpaperSidebar");
var wallpaperContent = document.querySelector("#wallpaperContent");

// Sidebar Instruction
var wpInstructions = document.createElement("div");
wpInstructions.innerHTML = `
  <p style="margin: 0px; font-weight: bold;">🖼️ Categories</p>
  <p style="font-size: 12px; margin: 0px; opacity: 0.6; margin-bottom: 8px;">Tap a category below</p>
`;
wallpaperSidebar.appendChild(wpInstructions);

// Default Message
wallpaperContent.innerHTML = `
  <h2 style="margin-top: 0;">Bachal's Wallpapers</h2>
  <p>Select a category from the sidebar to choose your custom desktop background!</p>
`;

// Shows a category in the viewer
function setWallpaperContent(index) {
  var cat = wallpaperCategories[index];

  if (cat.isCustom) {
    wallpaperContent.innerHTML = `
      <h2 style="margin-top: 0;">✨ Custom Wallpaper</h2>
      <p style="opacity: 0.8;">Paste any image link from the internet below:</p>
      <div style="display: flex; gap: 8px; margin-top: 12px; margin-bottom: 16px;">
        <input id="customUrlInput" type="text" placeholder="https://example.com/image.jpg" style="flex: 1; padding: 10px; border-radius: 8px; border: 1px solid #555; background: #252525; color: white;" />
        <button id="applyCustomBtn" style="padding: 10px 18px; border-radius: 8px; background: aquamarine; color: black; font-weight: bold; border: none; cursor: pointer;">Apply</button>
      </div>
      <button id="resetWallpaperBtn" style="padding: 10px 14px; border-radius: 8px; background: #ff5f57; color: white; border: none; cursor: pointer; font-weight: bold;">Reset to Default Wallpaper</button>
    `;

    document.querySelector("#applyCustomBtn").addEventListener("click", function () {
      var url = document.querySelector("#customUrlInput").value.trim();
      if (url) {
        setOSWallpaper(url);
        alert("Wallpaper updated!");
      }
    });

    document.querySelector("#resetWallpaperBtn").addEventListener("click", function () {
      setOSWallpaper("https://www.ourescapeclause.com/wp-content/uploads/2022/11/shutterstock_1464930743-scaled.jpg");
      alert("Reset to default wallpaper!");
    });
    return;
  }

  // Built grid of wallpapers
  var html = `
    <h2 style="margin-top: 0;">${cat.category}</h2>
    <p style="opacity: 0.7; margin-bottom: 16px;">${cat.description}</p>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px;">
  `;

  for (let i = 0; i < cat.wallpapers.length; i++) {
    var wp = cat.wallpapers[i];
    html += `
      <div class="wpCard" data-url="${wp.url}" style="background: #252525; border-radius: 10px; padding: 8px; cursor: pointer; border: 1px solid #444; text-align: center; transition: 0.2s;">
        <img src="${wp.url}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px; margin-bottom: 6px;" />
        <p style="margin: 4px 0 0 0; font-size: 12px; font-weight: bold;">${wp.name}</p>
      </div>
    `;
  }
  html += `</div>`;
  wallpaperContent.innerHTML = html;

  // Click card to set wallpaper
  var cards = wallpaperContent.querySelectorAll(".wpCard");
  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      var url = this.getAttribute("data-url");
      setOSWallpaper(url);
    });
  });
}

// Adds one clickable category item to the sidebar
function addToWallpapersidebar(index) {
  var cat = wallpaperCategories[index];
  var newDiv = document.createElement("div");
  newDiv.className = "sidebarItem";
  newDiv.style.padding = "8px";
  newDiv.style.borderRadius = "8px";
  newDiv.style.cursor = "pointer";
  newDiv.innerHTML = `
    <p style="margin: 0px;">${cat.category}</p>
  `;
  newDiv.addEventListener("click", function () {
    setWallpaperContent(index);
  });
  wallpaperSidebar.appendChild(newDiv);
}

for (let i = 0; i < wallpaperCategories.length; i++) {
  addToWallpapersidebar(i);
}

initializeWindow("wallpaper");
initializeIcon("wallpaperIcon", "wallpaper");
