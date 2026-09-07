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
    document.onmousemove = drag;
  }

  // Move the element by how much the mouse moved
  function drag(e) {
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

welcomeScreenClose.addEventListener("click", function () {
  closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function () {
  openWindow(welcomeScreen);
});

initializeWindow("welcome");

/* ========== PART 4: WINDOW MANAGER ==========
   Gives every window: drag, close, open, rise-to-top.
   Gives every icon: tap to open/close. */

var selectedIcon = undefined;
var biggestIndex = 100;
var topBar = document.querySelector("#top-bar");

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
  document.querySelector("#" + id + "close").addEventListener("click", function () {
    closeWindow(screen);
  });
  addWindowTapHandling(screen);
}

// Fully sets up a desktop icon: tap to open/close its window
function initializeIcon(id, screenId) {
  var icon = document.querySelector("#" + id);
  var screen = document.querySelector("#" + screenId);
  icon.addEventListener("click", function (e) {
    e.stopPropagation();
    handleIconTap(icon, screen);
  });
}

/* ========== E-BOOK HANDBOOK APP ========== */

var handbookPages = [
  {
    title: "Table of Contents",
    content: `
      <h2 style="color: #030303; margin-top: 0;">LAX WebOS Operations Manual</h2>
      <p style="color: #94a3b8;">Standard Operating Procedures // Version 2.6</p>
      <hr style="border-color: #334155;">
      <p>Welcome to the Los Angeles International Airport Operations Center. This handbook outlines all desktop envieronment controls, telemetry displays, and command interfaces.</p>
      <h3 style="color: #00ffcc;>Manual Directory:</h3>
      <ul style="line-height: 1.6;">
        <li><strong>Page 2: </strong> OS Desktop & Window Management</li>
        <li><strong>Page 3: </strong> Top Bar & Real-time Telemetry</li>
        <li><strong>Page 4: </strong> Airspace Radar Scope Operations</li>
        <li><strong>Page 5: </strong> Flight Information Display (FIDS)</li>
        <li><strong>Page 6: </strong> Terminal CLI & Command Syntax</li>
        <li><strong>Page 7: </strong> Runways & Gate Seperation Minima</li>
        <li><strong>Page 8: </strong> System Emergency Protocols</li>
      </ul>
    `
  },
  {
    title: "01. Desktop & Windows",
    content: `
      <h2 style="color: #ffcc00 margin-top: 0;">SECTION 1: Window Management</h2>
      <p style="color: #94a3b8;">Desktop Interactions & Controls</p>
      <hr style="border-color: #334155;">
      <p><strong>Launching Applications: </strong> Click any icon on the desktop left bar to launch or focus its window.</p>
      <p><strong>Dragging Windows: </strong> Click and hold the top header bar of any active window to reposition it anywhere on the screen.</p>
      <p><strong>Window Focus & Depth: </strong> Clicking anywhere inside an unfocused window brings it to the top layer above other windows.</p>
      <p><strong>Closing Windows:</strong> Click the red <strong>X</strong> button in the header bar to terminate an active window session.</p>
    `
  },
  {
    title: "02. Top Bar Metrics",
    content: `
      <h2 style="color: #ffcc00; margin-top: 0;">Section 2: System Top Bar</h2>
      <p style="color: #94a3b8;">Header Indicators & Real-Time Metrics</p>
      <hr style="border-color: #334155;">
      <p><strong>LAX WebOS Button: </strong> Clicking the top-left logo re-opens the Welcome System Briefing screen at any time.</p>
      <p><strong>Live System Clock: </strong> Displays synchronized local system time, updated continously in the top-right corner.</p>
      <p><strong>Frequency Indicator: </strong> Displays primary tower communications (120.95 MHz) for active SoCal approach sectors.</p>
      <p><strong>Weather METAR:</strong> Live weather reporting indicator (CAVOK: Ceiling and Visibility OK).</p>
    `
  },
  {
    title: "03. Radar Scope",
    content: `
      <h2 style="color: #ffcc00; margin-top: 0;">SECTION 3: Radar Scope</h2>
      <p style="color: #94a3b8;">SoCal Approach Monitoring</p>
      <hr style="border-color: #334155;">
      <p><strong>Sweeping Vector: </strong> The rotating screen sweep tracks real-time airspace boundaries within 20 nautical miles of the LAX VOR.</p>
      <p><strong>Approach Queue: </strong> Located to the right of the cavas scope, displaying inbound flights with callsigns, aircraft models, altitudes, airline, and speeds.</p>
      <p><strong>Color Identifiers:</strong></p>
      <ul>
        <li><strong style="color: #00ff66;">Green:</strong> Normal arrival stream on standard approach vectors.</li>
        <li><strong style="color: #ff9900;">Amber:</strong> Heavy aircraft or speed-restricted approach vectors.</li>
      </ul>
    `
  },
  {
    title: "04. Flight Board",
    content: `
      <h2 style="color: #ffcc00; margin-top: 0;">SECTION 4: Flight Information (FIDS)</h2>
      <p style="color: #94a3b8;">Arrival & Departure Tracking</p>
      <hr style="border-color: #334155;">
      <p><strong>Live Timetables: </strong> Displays scheduled flights across Tom Bradley Internation (TBIT) and Terminals 1-8.</p>
      <p><strong>Status Codes:</strong></p>
      <ul>
        <li><strong>LANDED / ON TIME:</strong> Standard operations running on schedule.</li>
        <li><strong>DELAYED:</strong> Ground hold active due to runway congestion or weather.</li>
        <li><strong>BOARDING:</strong> Gate operations open for passenger embarkation.</li>
      <ul>
    `
  },
  {
    title: "05. Console Commands",
    content: `
      <h2 style="color: #ffcc00; margin-top: 0;">SECTION 5: Terminal CLI</h2>
      <p style="color: #94a3b8;">Command Line Interface Reference</p>
      <hr style="border-color: #334155;">
      <p>Open the Terminal app to run system diagnostic and telemetry commands:</p>
      <ul>
        <li><code>lax --help </code> : Lists all executable commands.</li>
        <li><code>status</code> : Displays current tower frequency, active runways, and METAR.</li>
        <li><code>radar</code> : Forces a target sweep refresh on the radar scope.</li>
        <li><code>clear</code> : Wipes the terminal buffer screen.</li>
        <li><code>reboot</code> : Reloads the WebOS interface.</li>
      </ul>
    `
  },
  {
    title: "06. Seperation Rules",
    content: `
      <h2 style="color: #ffcc00; margin-top: 0;">SECTION 6: Airspace Seperation</h2>
      <p style="color: #94a3b8;">Standard Operating Clearance Limits</p>
      <hr style="border-color: #334155;">
      <p><strong>Radar Seperation: </strong> Maintain a minimum lateral distance of 3 NM of 1,000 ft vertical clearance between airbone targets.</p>
      <p><strong>Runway Assignments: </strong></p>
      <ul>
        <li><strong>North Complex (24L/24R):</strong> Arrivals (24R preferred for Heavy Widebodies).</li>
        <li><strong>South Complex (25L/25R):</strong> Departures (25R primary transpacific departure track).</li>
      </ul>
    `
  },
  {
    title: "07. Emergency Protocols",
    content: `
      <h2 style="color: #ffcc00; margin-top: 0;">SECTION 7: Emergency Procedures</h2>
      <p style="color: #9413b8;">Priority Escalations & Squawk Codes</p>
      <hr style="border=color: #334155;">
      <p><strong>Squawk 7700 (General Emergency):</strong> Grant immediate direct-to clearance to Runway 25L and hold all pending departures on Taxiway F.</p>
      <p><strong>Squawk 7600 (Radio Failure):</strong> Flash light gun signals from the tower cab (Green: Cleared to Land, Red: Give Way / Circle).</p>
      <p><strong>System Lock:</strong> Use <code>reboot</code> in the terminal if UI elements stop responding.</p>
    `
  }
];

var currentPageIndex = 0;

function renderBookPage() {
  var page = handbookPages[currentPageIndex];

  var content = document.querySelector("#bookPageContent");
  var title = document.querySelector("#bookPageTitle")
  var pageNum = document.querySelector("#bookPageNum")

  if (content) content.innerHTML = page.content;
  if (title) title.innerHTML = page.title;
  if (pageNum) pageNum.innerText = `Page ${currentPageIndex + 1} of ${handbookPages.length}`;

  // Dim flip arrows when at the start or end of the handbook
  var prevBtn = document.querySelector("#prevPageBtn");
  var nextBtn = document.querySelector("#nextPageBtn");

  if (prevBtn) prevBtn.style.opacity = currentPageIndex === 0 ? "0.2" : "1";
  if (nextBtn) nextBtn.style.opacity = currentPageIndex === handbookPages.length - 1 ? "0.2" : "1";
}

// Attach page turn click handlers
var prevBtn = document.querySelector("#prevPageBtn");
if (prevBtn) {
  prevBtn.addEventListener("click", function () {
    if (currentPageIndex > 0) {
      currentPageIndex--;
      renderBookPage();
    }
  });
}

var nextBtn = document.querySelector("#nextPageBtn");
if (nextBtn) {
  nextBtn.addEventListener("click", function () {
    if (currentPageIndex < handbookPages.length - 1) {
      currentPageIndex++;
      renderBookPage();
    }
  });
}

// Hook into the core OS window & icon system
initializeWindow("handbook");
initializeIcon("handbookIcon", "handbook");

// Render page 1 on load
renderBookPage();

// ========== RADAR SCOPE ==========
(function () {
  'use strict';


  /* ============================================================
   * 1. SIMULATED TIME (12x: 5 real min = 1 sim hour)
  * ============================================================ */
  var SIM_SPEED = 12;
  var SIM_START_REAL = Date.now();
  var SIM_START_ZULU = 14 * 60;

  function getSimMinutes() {
    var realElapsedMin = (Date.now() - SIM_START_REAL) / 60000;
    return Math.floor(SIM_START_ZULU + realElapsedMin * SIM_SPEED);
  }

  function formatSimZulu(minutes) {
    var h = Math.floor(minutes / 60) % 24;
    var m = minutes % 60;
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m + 'Z'
  }

  function getSimHour() {
    return Math.floor(getSimMinutes() / 60) % 24;
  }

  /* ============================================================
    * 2. DATABASE — Airlines, Aircraft, Categories
    * ============================================================ */
  // --- Airline pools (weighted) ---
  var AIRLINES_MAJOR = ["AA", "DL", "UA", "WN", "AS", "B6", "NK", "F9", "HA",
    "G4", "SY"];
  var AIRLINES_INTL = ["BA", "AF", "LH", "VS", "NH", "JL", "KE", "OZ", "CX",
    "SQ", "QF", "NZ", "EK", "QR", "EY", "TK", "LX", "KL", "IB", "FI", "DY", "AC", "WS", "AM", "AV", "LA", "CM", "G3", "AD"];

  var AIRLINES_CARGO = ["FX", "5X", "PO", "K4", "CK", "CV", "CZ", "CA", "CI", "BR", "5Y", "2D", "GD", "N8", "QY", "R4", "TS", "TW", "W8"];

  var AIRLINES_REGIONAL = ["OO", "MQ", "YV", "CP", "9E", "OH", "RP", "AX", "BQ", "C5", "G7", "JX", "KT", "LX", "M5", "N4", "P7", "Q3", "R7", "S5", "T7", "U5", "V7", "W5", "X7", "Y5", "Z7"]

  var AIRLINES_CHARTER = ["OM", "KV", "TS", "W8", "RO", "YW", "XP", "YX", "ZK"];
  var AIRLINES_GA = [];
  var AIRLINES_CG = ["CGNR", "CGC", "RESCUE", "COASTGUARD"];
  var AIRLINES_MEDEVAC = ["LIFEGUARD", "MEDEVAC", "AIRMED", "ANGEL"];
  var AIRLINES_GOV = ["SAM", "AF1", "AF2", "CNV", "NVY", "RCH", "ARMY", "NASA", "DOE"]

  // Combined weighted pool
  var AIRLINE_POOL = []
    .concat(Array(6).fill().map(function () { return AIRLINES_MAJOR; }).flat())
    .concat(Array(6).fill().map(function () { return AIRLINES_INTL; }).flat())
    .concat(AIRLINES_CARGO)
    .concat(AIRLINES_REGIONAL)
    .concat(AIRLINES_CHARTER)
    .concat(AIRLINES_CG)
    .concat(AIRLINES_MEDEVAC)
    .concat(AIRLINES_GOV)

  // --- Aircraft by category ---
  var AC_HEAVY = ["B77W", "B77L", "B772", "B77F", "B788", "B789", "B78X", "A359", "A35K", "A388", "B748", "B744", "B74F"];
  var AC_NARROW = ["A321", "A320", "A319", "A32N", "A21N", "B738", "B739", "B7M8", "B7M9", "B38M", "B752", "B753"];
  var AC_REGIONAL = ["E175", "CRJ7", "CRJ9", "E75L", "E755", "CRJ2", "CRJX"];
  var AC_CARGO = ["B77F", "B74F", "B748", "B76F", "B75F", "A33F", "A30F", "MD1F", "DC1F", "C208", "BE99", "SW4", "PC12"];
  var AC_GA = ["G650", "G700", "G550", "G450", "GLF6", "GLF5", "GL7T", "GL5T", "F900", "F2TH", "FA7X", "FA8X", "CL60", "CL65", "CL35", "CL30", "C56X", "C680", "C750", "H25B", "H25C", "LJ45", "LJ60", "LJ75", "C510", "C25A", "C25B", "C25C", "E50P", "E55P", "HA4T", "SF50", "EA50", "BE20", "BE30", "BE40", "C425", "C441", "P180", "TBM7", "TBM9", "PC12", "PC24"];
  var AC_CG = ["MH65", "MH65", "MH65", "MH60"];
  var AC_MEDEVAC = ["LJ35", "LJ45", "LJ60", "C560", "C56X", "BE20", "B350", "PC12", "EC35", "EC45", "S76", "S92"];
  var AC_GOV = ["C17", "C130", "C5", "KC10", "KC135", "C32", "C40", "B752", "B737", "CL60", "GLF5", "P8", "E3", "E6"];

  // --- Visual identity per category ---
  var CATEGORY_STYLE = {
    major: { color: "#00ff66", symbol: "●", prefix: "", label: "Major", z: 5 },
    intl: { color: "#00ccff", symbol: "●", prefix: "INTL ", label: "International", z: 5 },
    cargo: { color: "#ffcc00", symbol: "◆", prefix: "CARGO ", label: "Cargo", z: 4 },
    regional: { color: "#88ffff", symbol: "▼", prefix: "RGNL ", label: "Regional", z: 3 },
    charter: { color: "#ff8800", symbol: "▲", prefix: "CHTR ", label: "Charter", z: 3 },
    ga: { color: "#8888ff", symbol: "◇", prefix: "", label: "General Av", z: 2 },
    cg: { color: "#ff8800", symbol: "◎", prefix: "CG ", label: "Coast Guard", z: 6 },
    medevac: { color: "#ff0044", symbol: "♦", prefix: "LGD ", label: "Medevac", z: 7 },
    gov: { color: "#ff00ff", symbol: "★", prefix: "", label: "Gov/VIP", z: 8 }
  };

  // --- Cargo ramp mapping ---
  var CARGO_RAMP_MAP = {
    "FX": { name: "Ramp 1", color: "#ff6600", label: "FedEx" },
    "5X": { name: "Ramp 2", color: "#8b0000", label: "UPS" },
    "default": { name: "Ramp 3", color: "#666666", label: "Other" }
  };

  // --- Separation thresholds ---
  var SEP_LATERAL_NM = 3;
  var SEP_VERTICAL_FT = 1000;

  // --- Canvas constants ---
  var CANVAS_SIZE = 320;
  var RADAR_RADIUS = 140;
  var NM_PER_PX = 20 / RADAR_RADIUS;

  // --- Max flights for performance ---
  var MAX_FLIGHTS = 80;

  // Active flights array
  var flights = [];

  // KLAX public-airport layout. Runway use remains dynamic in real operations.
  var LAX_AIRPORT = {
    code: "KLAX",
    runways: {
      "24L": { reciprocal: "06R", side: "NORTH", lengthFt: 8926, operation: "ARRIVAL" },
      "24R": { reciprocal: "06L", side: "NORTH", lengthFt: 10285, operation: "ARRIVAL" },
      "25L": { reciprocal: "07R", side: "SOUTH", lengthFt: 12091, operation: "DEPARTURE" },
      "25R": { reciprocal: "07L", side: "SOUTH", lengthFt: 11095, operation: "DEPARTURE" }
    },
    terminals: {
      "Terminal 1": ["9", "10", "11A", "11B", "12A", "12B", "13", "14", "15", "16", "17", "18"],
      "Terminal 2": ["21", "22A", "22B", "23A", "23B", "24A", "24B", "25A", "25B", "26", "27", "28"],
      "Terminal 3": ["30A", "30B", "31A", "31B", "32A", "32B", "33", "34A", "34B", "35", "36", "37", "38", "39"],
      "Terminal 4": ["40", "41", "42A", "42B", "43", "44", "45", "46A", "46B", "47A", "47B", "48A", "48B", "49A", "49B"],
      "Terminal 5": ["50A", "50B", "51A", "51B", "52A", "52B", "53A", "53B", "54A", "54B", "55A", "55B", "56", "57", "58", "59"],
      "Terminal 6": ["60A", "60B", "61A", "61B", "62A", "62B", "63", "64A", "64B", "65A", "65B", "66", "67", "68", "69A", "69B"],
      "Terminal 7": ["70A", "70B", "71A", "71B", "72A", "72B", "73A", "73B", "74A", "74B", "75A", "75B", "76A", "76B", "77A", "77B"],
      "Terminal 8": ["80", "81", "82", "83", "84", "85", "86", "87", "88"],
      "TBIT": ["101", "102", "103", "104", "105", "106", "107", "108", "109A", "109B", "110A", "110B", "111A", "111B", "112A", "112B", "113", "114", "115", "116", "117", "118", "119", "150", "151", "152", "153", "154", "155", "156", "157", "201", "202", "203", "204", "205", "206", "207", "208", "209", "210", "211", "212", "213", "214", "215", "216", "217", "218", "219", "220", "221", "222", "223", "224", "225"]
    },
    airlineTerminals: {
      WN: "Terminal 1", AS: "Terminal 6", DL: "Terminal 2", UA: "Terminal 7",
      AA: "Terminal 4", B6: "Terminal 5", HA: "Terminal 6", NK: "Terminal 6",
      BA: "TBIT", AF: "TBIT", LH: "TBIT", VS: "TBIT", NH: "TBIT", JL: "TBIT",
      KE: "TBIT", OZ: "TBIT", CX: "TBIT", SQ: "TBIT", QF: "TBIT", EK: "TBIT",
      QR: "TBIT", EY: "TBIT", TK: "TBIT", KL: "TBIT", AM: "TBIT", AV: "TBIT",
      LA: "TBIT", CM: "TBIT", AC: "TBIT", NZ: "TBIT"
    }
  };

  function chooseLaxRunway(isArrival, isHeavy) {
    var choices = isArrival ? ["24L", "24R"] : ["25L", "25R"];
    if (isHeavy) return isArrival ? "24R" : "25L";
    return choices[Math.floor(Math.random() * choices.length)];
  }

  function chooseLaxTerminal(airline, category) {
    if (category === "intl") return "TBIT";
    return LAX_AIRPORT.airlineTerminals[airline] || "Terminal 1";
  }

  function chooseLaxGate(terminal) {
    var terminalGates = LAX_AIRPORT.terminals[terminal] || [];
    return terminalGates[Math.floor(Math.random() * terminalGates.length)] || null;
  }


  /* ============================================================
   * 3. FLIGHT FACTORY
   * ============================================================ */
  function pickAircraft(category) {
    switch (category) {
      case "major": case "intl":
        return (Math.random() < 0.35) ? rand(AC_HEAVY) : rand(AC_NARROW);
      case "cargo":
        return rand(AC_CARGO);
      case "regional":
        return rand(AC_REGIONAL);
      case "charter":
        return (Math.random() < 0.3) ? rand(AC_HEAVY) : rand(AC_NARROW);
      case "ga":
        return rand(AC_GA);
      case "cg":
        return rand(AC_CG);
      case "medevac":
        return rand(AC_MEDEVAC);
      case "gov":
        return rand(AC_GOV);
      default:
        return rand(AC_NARROW);
    }
  }

  function pickAirline(category) {
    if (category === "ga") return "N" + (10000 + Math.floor(Math.random() * 90000));
    var pool = {
      major: AIRLINES_MAJOR,
      intl: AIRLINES_INTL,
      cargo: AIRLINES_CARGO,
      regional: AIRLINES_REGIONAL,
      charter: AIRLINES_CHARTER,
      cg: AIRLINES_CG,
      medevac: AIRLINES_MEDEVAC,
      gov: AIRLINES_GOV
    }[category] || AIRLINES_MAJOR;
    return rand(pool);
  }

  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function createFlight(category, overrides) {
    var isArrival = (category !== "cg" && category !== "ga") ? Math.random() > 0.45 : false;
    var airline = pickAirline(category) || "UNK";
    var aircraft = pickAircraft(category) || "UNKNOWN";
    var style = CATEGORY_STYLE[category];
    var isHeavy = AC_HEAVY.indexOf(aircraft) !== -1;

    // Cargo ramp assignment
    var cargoRamp = null;
    if (category === "cargo") {
      cargoRamp = CARGO_RAMP_MAP[airline] || CARGO_RAMP_MAP.default;
    }

    // LAX runway and gate assignment. ATC can override these later.
    var runway = chooseLaxRunway(isArrival, isHeavy);
    var terminal = category === "cargo" ? "CARGO" : chooseLaxTerminal(airline, category);
    var gate = category === "cargo" ? null : chooseLaxGate(terminal);

    // Initial polar positon
    var angle = Math.random() * Math.PI * 2;
    var distance = isArrival ? 140 + Math.random() * 40 : 10 + Math.random() * 20;
    var targetDistance = isArrival ? 0 : 170;

    // Speed in NM per sim-minute
    var speed = isArrival ? 0.8 + Math.random() * 0.6 : 1.2 + Math.random() * 0.8;
    if (category === "cg") speed = 0.2 + Math.random() * 0.2;
    if (category === "ga") speed = 0.5 + Math.random() * 0.4;

    // Altitude
    var altitude = isArrival ? 5000 + Math.floor(Math.random() * 15000)
      : 1000 + Math.floor(Math.random() * 6000);
    if (category === "cg") altitude = 500 + Math.floor(Math.random() * 2000);
    if (category === "medevac") altitude = 1000 + Math.floor(Math.random() * 4000);

    var flight = {
      id: airline + (100 + Math.floor(Math.random() * 900)),
      category: category,
      type: isArrival ? "arrival" : "departure",
      aircraft: aircraft,
      airline: airline,
      isHeavy: isHeavy,
      isCargo: category === "cargo",
      // Polar
      angle: angle,
      distance: distance,
      speed: speed,
      altitude: altitude,
      heading: isArrival ? Math.PI : 0,
      targetDistance: targetDistance,
      // Resources
      runway: runway,
      cargoRamp: cargoRamp,
      terminal: terminal,
      gate: gate,
      clearance: "UNASSIGNED",
      holding: false,
      atcStatus: "TRACKING",
      //Seperation
      squawk: (1000 + Math.floor(Math.random() * 7000)).toString(8),
      // Visual
      color: style.color,
      symbol: style.symbol,
      labelPrefix: style.prefix,
      zOrder: style.z,
      // State
      active: true,
      // Cartesian (computed each frame)
      x: 0, y: 0
    };

    // Apply overrides (for testing/specific scenarios)
    if (overrides) Object.assign(flight, overrides);
    return flight;
  }

  /* ============================================================
   * 4. RESOURCE MANAGER
   * ============================================================ */
  function assignRunway(flight) {
    return flight.runway;
  }

  function assignCargoRamp(flight) {
    return flight.cargoRamp;
  }

  /* ============================================================
  * 5. SPAWN CONTROLLER — Time-weighted spawning
  * ============================================================ */
  function getSpawnWeights(hour) {
    var isNight = hour >= 22 || hour <= 6;
    var isMorning = hour >= 6 && hour <= 9;
    var isEvening = hour >= 16 && hour <= 22;

    return {
      major_arrival: isMorning ? 30 : isEvening ? 15 : isNight ? 5 : 20,
      intl_arrival: isMorning ? 25 : isEvening ? 10 : isNight ? 2 : 12,
      major_departure: isMorning ? 10 : isEvening ? 30 : isNight ? 5 : 18,
      intl_departure: isMorning ? 5 : isEvening ? 25 : isNight ? 2 : 10,
      cargo: isNight ? 35 : 12,
      regional: isEvening ? 8 : 3,
      ga: 15,
      cg: 2,
      medevac: 3,
      gov: 1,
    };
  }

  function pickCategoryByWeight(weights) {
    var total = 0;
    for (var k in weights) total += weights[k];
    var r = Math.random() * total;
    var acc = 0;
    for (var k in weights) {
      acc += weights[k];
      if (r < acc) return k;
    }
    return "major_arrival";
  }

  function spawnFlight() {
    if (!radarPowerOn) return;
    if (flights.length >= MAX_FLIGHTS) return;
    var hour = getSimHour();
    var weights = getSpawnWeights(hour);
    var pick = pickCategoryByWeight(weights);
    var isArrival = pick.indexOf("_arrival") !== -1;
    var category = pick.split("_")[0];
    var flight = createFlight(category, { type: isArrival ? "arrival" : "departure" });
    flights.push(flight);
    updateQueueUI();
  }

  setInterval(spawnFlight, 3000 + Math.random() * 5000);

  /* ============================================================
   * 6. PHYSICS ENGINE — Polar coordinate updates
   * ============================================================ */

  var LAX_CENTER = { x: CANVAS_SIZE / 2, y: CANVAS_SIZE / 2 };

  function updateFlightPhysics(flight, dtSimMin) {
    if (!flight.active) return;

    if (flight.category === "cg") {
      flight.angle += 0.02 * dtSimMin;
      flight.distance = 50 + Math.sin(Date.now() / 5000) * 10;
      polarToCartesian(flight);
    }

    // GA direct routing (simplified)
    if (flight.category === "ga") {
      var dx = LAX_CENTER.x - flight.x;
      var dy = LAX_CENTER.y - flight.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 5) {
        flight.angle = Math.atan2(dy, dx);
        flight.distance = dist * NM_PER_PX;
      }
      polarToCartesian(flight);
      return;
    }

    // Standard approach/departure
    var deltaDist = (flight.targetDistance - flight.distance) * 0.03 * dtSimMin;
    flight.distance += deltaDist;

    // Smooth heading transition
    var headingDiff = normalizeAngle(flight.heading - flight.angle);
    flight.angle += headingDiff * 0.05 * dtSimMin;

    polarToCartesian(flight);

    // Check completion
    if (flight.type === "arrival" && flight.distance < 6) {
      flight.active = false;
      logEvent(flight.id + " landed on " + flight.runway);
    } else if (flight.type === "departure" && flight.distance > 165) {
      flight.active = false;
      logEvent(flight.id + " departed " + flight.runway);
    }
  }

  function polarToCartesian(flight) {
    var cx = LAX_CENTER.x, cy = LAX_CENTER.y;
    flight.x = cx + Math.cos(flight.angle) * (flight.distance / NM_PER_PX);
    flight.y = cy + Math.sin(flight.angle) * (flight.distance / NM_PER_PX);
  }

  function normalizeAngle(a) {
    while (a <= -Math.PI) a += 2 * Math.PI
    while (a > Math.PI) a -= 2 * Math.PI
    return a;
  }

  /* ============================================================
   * 7. SEPARATION MONITOR — Persistent alerts
   * ============================================================ */
  var separationAlerts = [];

  function checkSeparation(flights) {
    var now = Date.now();
    var newAlerts = [];

    for (var i = 0; i < flights.length; i++) {
      for (var j = i + 1; j < flights.length; j++) {
        var f1 = flights[i], f2 = flights[j];
        if (!f1.active || !f2.active) continue;

        var dx = f1.x - f2.x, dy = f1.y - f2.y;
        var lateralPx = Math.sqrt(dx * dx + dy * dy);
        var lateralNM = lateralPx * NM_PER_PX;
        var verticalFt = Math.abs(f1.altitude - f2.altitude);

        if (lateralNM < SEP_LATERAL_NM || verticalFt < SEP_VERTICAL_FT) {
          var key = f1.id + "|" + f2.id;
          var existing = separationAlerts.find(function (a) { return a.key === key; });
          if (existing) {
            existing.lateral = lateralNM;
            existing.vertical = verticalFt;
            existing.since = existing.since || now;
            newAlerts.push(existing);
          } else {
            newAlerts.push({
              key: key,
              f1: f1, f2: f2,
              lateral: lateralNM,
              vertical: verticalFt,
              since: now
            });
          }
        }
      }
    }
    separationAlerts = newAlerts;
    return separationAlerts;
  }

  function logEvent(msg) {
    var el = document.querySelector("#radarLog");
    if (el) {
      var t = formatSimZulu(getSimMinutes());
      el.innerHTML = '<div style="color:#888"[' + t + ']' + msg + '</div' + el.innerHTML;
      if (el.children.length > 50) el.removeChild(el.lastChild);
    }
  }

  /* ============================================================
   * 8. RENDERER — Canvas 320x320
   * ============================================================ */
  var sweepAngle = -Math.PI / 2;
  var lastSweepNorth = false;
  var audioCtx = null;
  var radarInitialized = false;
  var radarPowerOn = false;
  var radarWindowOpen = false;
  var radarAnimationRunning = false;

  function ensureAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") audioCtx.resume();
  }

  function playRadarPing() {
    ensureAudioContext();
    var osc = audioCtx.createOscillator();
    var gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.12);
  }

  function renderRadar() {
    var canvas = document.querySelector("#radarCanvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var cx = LAX_CENTER.x, cy = LAX_CENTER.y;

    // Fade trail
    ctx.fillStyle = "rgba(1, 3, 6, 0.12)";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Range rings (5, 10, 15, 20 NM)
    ctx.strokeStyle = "rgba(0, 255, 205, 0.1)";
    ctx.lineWidth = 1;
    [5, 10, 15, 20].forEach(function (nm) {
      var r = nm / 20 * RADAR_RADIUS;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "rgba(0, 255, 204, 0.3)";
      ctx.font = "8px monospace";
      ctx.textAlign = "right"
      ctx.fillText(nm + "NM", cx - r - 2, cy + 3);
    });


    // Crosshairs
    ctx.strokeStyle = "rgba(0, 255, 205, 0.08)";
    ctx.beginPath();
    ctx.moveTo(cx, 0); ctx.lineTo(cx, CANVAS_SIZE);
    ctx.moveTo(0, cy); ctx.lineTo(CANVAS_SIZE, cy);
    ctx.stroke();

    // Runway markings (simplified)
    ctx.strokeStyle = "rgba(0, 255, 102, 0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 60, cy - 30); ctx.lineTo(cx + 60, cy - 30);
    ctx.moveTo(cx - 60, cy - 10); ctx.lineTo(cx + 60, cy - 10);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 60, cy + 10); ctx.lineTo(cx + 60, cy + 10);
    ctx.moveTo(cx - 60, cy + 30); ctx.lineTo(cx + 60, cy + 30);
    ctx.stroke();

    // LAX center
    ctx.fillStyle = "#00ffcc";
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#00ffcc";
    ctx.font = "9px monospace";
    ctx.textAlign = "center";
    ctx.fillText("LAX", cx, cy - 8);

    // Draw separation alert lines
    separationAlerts.forEach(function (alert) {
      ctx.strokeStyle = "rgba(255, 0, 68, 0.8)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(alert.f1.x, alert.f1.y)
      ctx.moveTo(alert.f2.x, alert.f2.y)
      ctx.stroke();
      ctx.setLineDash([])
      ctx.fillStyle = "#ff0044";
      ctx.font = "8px monospace";
      ctx.fillText("SEP", (alert.f1.x + alert.f2.x) / 2, (alert.f1.y + alert.f2.y) / 2 - 4)
    });

    // Draw flights (sorted by zOrder)
    var sorted = flights.filter(function (f) { return f.active; })
      .sort(function (a, b) { return a.zOrder - b.zOrder; });

    sorted.forEach(function (f) {
      ctx.shadowBlur = 8;
      ctx.shadowColor = f.color;
      ctx.fillStyle = f.color;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.isHeavy ? 5 : 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Label
      ctx.fillStyle = f.color;
      ctx.font = "9px monospace";
      ctx.textAlign = "left";
      var label = (f.labelPrefix || "") + f.id;
      ctx.fillText(label, f.x + 8, f.y - 4);
      ctx.fillText(f.altitude.toLocaleString() + "ft", f.x + 8, f.y + 8);
      if (f.isHeavy) ctx.fillText("HEAVY", f.x + 8, f.y + 20);
    });

    // Sweep line
    sweepAngle += 0.008; // ~a.25 rotations. sec at 60 fps
    if (sweepAngle > Math.PI * 2) sweepAngle -= Math.PI * 2;

    // Ping when crossing north (0)
    var crossedNorth = sweepAngle > 0 && sweepAngle < 0.008;
    if (crossedNorth && !lastSweepNorth && radarInitialized) {
      playRadarPing();
      updateSimTimeDisplay();
    }
    lastSweepNorth = crossedNorth;

    ctx.strokeStyle = "#00ffcc";
    ctx.lineWidth = 2;
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#00ffcc";
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(sweepAngle) * RADAR_RADIUS, cy + Math.sin(sweepAngle) * RADAR_RADIUS);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  function updateSimTimeDisplay() {
    var el = document.querySelector("#simTimeDisplay");
    if (el) el.textContent = "SIM " + formatSimZulu(getSimMinutes());
  }

  /* ============================================================
   * 9. QUEUE UI — 4 Tabs: Arrivals / Departures / Alerts / All
   * ============================================================ */
  var currentQueueTab = "arrivals";

  function updateQueueUI() {
    var box = document.querySelector("#radarQueue");
    if (!box) return;

    var tabs = box.querySelector(".queue-tabs");
    var content = box.querySelector(".queue-content");
    if (!tabs || !content) return;

    var arrivals = flights.filter(function (f) { return f.active && f.type === "arrival"; });
    var departures = flights.filter(function (f) { return f.active && f.type === "departure"; });
    var all = flights.filter(function (f) { return f.active; });

    // Tab buttons
    var tabData = [
      { id: "arrivals", label: "ARRIVALS (" + arrivals.length + ")", count: arrivals.length },
      { id: "departures", label: "DEPARTURES (" + departures.length + ")", count: departures.length },
      { id: "alerts", label: "ALERTS (" + separationAlerts.length + ")", count: separationAlerts.length }
    ];

    tabs.innerHTML = tabData.map(function (t) {
      return '<button class="queue-tab' + (t.id === currentQueueTab ? " active" : "") +
        '" data-tab="' + t.id + '">' + t.label + '</button>';
    }).join("");

    // Re-bind tab clicks
    tabs.querySelectorAll(".queue-tab").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentQueueTab = this.dataset.tab;
        updateQueueUI();
      });
    });

    // Content
    var list = [];
    if (currentQueueTab === "arrivals") list = arrivals;
    else if (currentQueueTab === "departures") list = departures;
    else if (currentQueueTab === "alerts") list = separationAlerts;
    else list = all;

    if (currentQueueTab === "alerts") {
      content.innerHTML = list.length === 0
        ? '<div class="queue-empty">No separation conflicts</div>'
        : list.map(function (a) {
          return '<div class="queue-item alert">' +
            '<div class="queue-header"><span style="color:#ff0044">CONFLICT</span></div>' +
            '<div class="queue-details">' + a.f1.id + ' \u2194 ' + a.f2.id + '</div>' +
            '<div class="queue-details">Lat: ' + a.lateral.toFixed(1) + 'NM | Vert: ' + a.vertical + 'ft</div>' +
            '</div>';
        }).join("");
    } else {
      content.innerHTML = list.length === 0
        ? '<div class="queue-empty">No traffic</div>'
        : list.map(function (f) {
          var ramp = f.cargoRamp ? ' <span style="color:' + f.cargoRamp.color + '">[' + f.cargoRamp.name + ']</span>' : '';
          var callsign = (f.labelPrefix || "") + (f.id || "UNKNOWN");
          var aircraft = f.aircraft || "UNKNOWN AIRCRAFT";
          return '<div class="queue-item ' + (f.type || "unknown") + '">' + '<div class="queue-header"><span>' + callsign + '</span><span>' + aircraft + '</span></div>' +
            '<div class="queue-details">RWY: ' + (f.runway || "-") + ramp + ' | ALT: ' + (f.altitude || 0).toLocaleString() + 'ft | SPD: ' + Math.round((f.speed || 0) * 150) + 'Kts | DIST: ' + Math.round(f.distance || 0) + 'nm</div>' + '</div>';
        }).join("");
    }
  }

  /* ============================================================
   * 10. ANIMATION LOOP
   * ============================================================ */
  var lastFrame = 0;

  function animateRadar(ts) {
    if (!radarPowerOn || !radarWindowOpen) {
      radarAnimationRunning = false;
      return;
    }

    if (!lastFrame) lastFrame = ts;
    var dtRealMs = ts - lastFrame;
    lastFrame = ts;

    // Convert to sim-minutes
    var dtSimMin = (dtRealMs / 1000) * SIM_SPEED;

    // Update physics
    flights.forEach(function (f) { updateFlightPhysics(f, dtSimMin); });
    flights = flights.filter(function (f) { return f.active; });

    // Separation check
    checkSeparation(flights);

    // Render
    renderRadar();

    requestAnimationFrame(animateRadar);
  }

  function startRadarAnimation() {
    if (!radarPowerOn || !radarWindowOpen || radarAnimationRunning) return;
    radarAnimationRunning = true;
    lastFrame = 0;
    requestAnimationFrame(animateRadar);
  }

  /* ============================================================
   * 11. WINDOW INTEGRATION
   * ============================================================ */
  function initRadarModule() {
    if (radarInitialized) return;
    radarInitialized = true;

    // Initialize window/icon
    initializeWindow("radar");
    initializeIcon("radarIcon", "radar");

    var radarPowerOnButton = document.querySelector("#radarPowerOn");
    var radarPowerOffButton = document.querySelector("#radarPowerOff");
    var radarCloseButton = document.querySelector("#radarclose");

    radarPowerOnButton.addEventListener("change", function () {
      radarPowerOn = true;
      startRadarAnimation();
    });

    radarPowerOffButton.addEventListener("change", function () {
      radarPowerOn = false;
    });

    radarCloseButton.addEventListener("click", function () {
      radarWindowOpen = false;
    });

    // Start animation when radar window first opens
    var radarEl = document.querySelector("#radar");
    if (radarEl) {
      var observer = new MutationObserver(function () {
        if (radarEl.style.display === "flex") {
          radarWindowOpen = true;
          startRadarAnimation();
        } else {
          radarWindowOpen = false;
        }
      });
      observer.observe(radarEl, { attributes: true, attributeFilter: ["style"] });
    }

    // Initial queue render
    updateQueueUI();
    updateSimTimeDisplay();
  }

  // The script is loaded after the app markup, so the Radar controls can bind now.
  initRadarModule();

  /* ============================================================
   * 12. GLOBAL STATE (exposed for Terminal CLI)
   * ============================================================ */
  window.LAXRadar = {
    getFlights: function () { return flights.filter(function (f) { return f.active; }); },
    getAlerts: function () { return separationAlerts; },
    getSimTime: function () { return formatSimZulu(getSimMinutes()); },
    spawnTestFlight: function (cat) {
      flights.push(createFlight(cat || "major"));
      updateQueueUI();
    },
    refreshQueue: function () {
      updateQueueUI();
    },
    updateFlight: function (flightId, changes) {
      var flight = flights.find(function (item) { return item.id === flightId; });
      if (!flight) return null;
      Object.assign(flight, changes);
      updateQueueUI();
      return flight;
    }
  };

})();

/* ============================================================
 * ATC TOWER CONTROL MODULE
 * ============================================================ */

(function () {
  "use strict";

  var selectedFlightId = null;
  var currentFilter = "all";

  var runwayState = {
    "24L": { open: true, side: "NORTH" },
    "24R": { open: true, side: "NORTH" },
    "25L": { open: true, side: "SOUTH" },
    "25R": { open: true, side: "SOUTH" },
  };

  var termianlGates = {
    "Terminal 1": [
      "9", "10", "11A", "11B", "12A", "12B", "13", "14", "15", "16", "17", "18"
    ],
    "Terminal 2": [
      "21", "22A", "22B", "23A", "23B", "24A", "24B", "25A", "25B", "26", "27", "28"
    ],
    "Terminal 3": ["30A", "30B", "31A", "31B", "32A", "32B", "33", "34A", "34B", "35", "36", "37", "38", "39"      
    ],
    "Terminal 4": ["40", "41", "42A", "42B", "43", "44", "45", "46A", "46B", "47A", "47B", "48A", "48B", "49A", "49B"      
    ],
    "Terminal 5": ["50A", "50B", "51A", "51B", "52A", "52B", "53A", "53B", "54A", "54B", "55A", "55B", "56", "57", "58", "59"
    ],
    "Terminal 6": ["60A", "60B", "61A", "61B", "62A", "62B", "63", "64A", "64B", "65A", "65B", "66", "67", "68", "69A", "69B"
    ],
    "Terminal 7": ["70A", "70B", "71A", "71B", "72A", "72B", "73A", "73B", "74A", "74B", "75A", "75B", "76A", "76B", "77A", "77B"
    ],
    "Terminal 8": ["80", "81", "82", "83", "84", "85", "86", "87", "88"
    ],
    TBIT: ["101", "102", "103", "104", "105", "106", "107", "108",
      "109A", "109B",
      "110A", "110B",
      "111A", "111B",
      "112A", "112B",
      "113", "114", "115", "116", "117", "118", "119",
      "150", "151", "152", "153", "154", "155", "156", "157",
      "201", "202", "203", "204", "205", "206", "207", "208",
      "209", "210", "211", "212", "213", "214", "215", "216",
      "217", "218", "219", "220", "221", "222", "223", "224",
      "225"
    ]
  };

  function getFlights() {
    if (!windo.LAXRadar) return [];

    return window.LAXRadar.getFlights().filter(function (flight) {
      return flight.active  
    });
  }

  function getSelectedFlight() {
    return getFlights().find(function (flight) {
      return flight.id === selectedFlightId;
    });
  }

  function getCallsign(flight) {
    return (flight.labelPrefix || "") + (flight.id || "UNKNOWN");
  }

  function getRunwaysFor(flight) {
    return ["24L", "24R", "25L", "25R"] 
  }

  function renderRunways () {
    var container = document.querySelector("#runwayStatusGrid");

    if (!container) return;

    container.innerHTML = Object.keys(runwayState).map(function (runway){
      var state = runwayState[runway];

      return (
        '<button class="runway=status ' +
        (state.open ? "open" : "closed") +
        '" data-runway="' +
        runway +
        '">' +
        runway +
        "<br>" +
        (state.open ? "OPEN" : "CLOSED") +
        "</button>"
      );
    }).join("");
  }

  function renderFlightQueue() {
    var container = document.querySelector("#towerQueueList");

    if (!container) return;
    
    var flights = getFlights().filter(function (flight) {
      return currentFilter === "all" || flight.type === currentFilter;
  });

  if (flights.length === 0) {
    container.innerHTML = '<div style="padding: 10px; color: #64748b;">No active flights</div>'
    return;
  }

  container.innerHTML = flights.map(function (flight) {
    var selected = flight.id === selectedFlightId;
    return (
      '<div class="tower-flight-row' + 
      (selected ? " selected" : "") +
      '">' +
      '<div class="tower-flight-header">' +
      getCallsign(flight) +
      "</span>" +
      "<span>" +
        (flight.aircraft || "UNKNOWN") +
        "</span>" +
        "</div>" +
        '<div class="tower-flight-details">' +
        flight.type.toUpperCase() +
        " | ALT: " +
        (flight.altitude || 0).toLocaleString() +
        "ft<br>" +
        "RUNWAY: " +
        (flight.runway || "NONE") +
        " | TERMINAL: " +
        (flight.terminal || "NONE") +
        " | GATE: " +
        (flight.gate || "NONE") +
        "<br>STATUS: " +
        (flight.atcStatus || "TRACKING") +
        "</div>" +
        "</div>"
    );
  }).join("");
 }

 function renderTerminalOptions(flight) {
  var terminalSelect = document.querySelector("#towerTerminalSelect");
  var gateSelect = document.querySelector("#towerGateSelect");

  terminalSelect.innerHTML = Object.keys(terminalGates).map(function (terminal) {
    return ('<option value="' + terminal + '">' + (flight.terminal === terminal ? " selected" : "") + terminal + "</option>"
    );
  }).join("");

  renderGateOptions(flight);
 }

 function renderGateOptions(flight) {
  var terminalSelect = document.querySelector("#towerTerminalSelect");
  var gateSelect = document.querySelector("#towerGateSelect");
  
  var gates = terminalGates[terminalSelect.value] || [];

  gatesSelect.innerHTML = gates.map(function (gate) {
    return (
      '<option value="' + gate + '">' + (flight.gate === gate ? " selected" : "") + gate + "</option>"
    );
  }).join("");
 }

 function renderClearanceOptions(flight) {
  var select = document.querySelector("#towerClearanceSelect");

  var options = flight.type === "arrival" ? ["UNASSIGNED", "APPROACH", "HOLD", "CLEARED_TO_LAND"

  ]
  : ["UNASSIGNED", "TAXI", "HOLD", "CLEARED_FOR_TAKEOFF"];

  select.innerHTML = options.map(function (option) {
    return (
      '<option value="' + option + '"' + (flight.clearance === option ? " selected" : "") + ">" + option.replace(/_/g, " ") + "</option>"
    );
  }).join("");
 }

 function renderSelectedFlight () {
  var panel = document.querySelector("towerSelectedFlight");
  var controls = document.querySelector("#towerAssignmentControls");
  var flight = getSelectedFlight();

  if (!flight) {
    panel.textContent = "Select an aircraft from the active flight list.";
    controls.hidden = true;
    return;
  }

  controls.hidden = false;

  panel.innerHTML = "<strong style=\"color:" + (flight.color || "#00ffcc") +
      "\">" +
      getCallsign(flight) +
      "</strong><br>" +
      "Aircraft: " +
      (flight.aircraft || "UNKNOWN") +
      "<br>Type: " +
      flight.type.toUpperCase() +
      "<br>Altitude: " +
      (flight.altitude || 0).toLocaleString() +
      "ft<br>Status: " +
      (flight.atcStatus || "TRACKING");

    renderTerminalOptions(flight);
    renderRunwayOptions(flight);
    renderClearanceOptions(flight);
 }

 function renderTower () {
  renderRunways();
  renderFlightQueue();
  renderSelectedFlight();
 }

 function updateSelectedFlight(changes) {
  var flight = getSelectedFlight();

  if (!flight || !window.LAXRadar.updateFlight) return;

  window.LAXRadar.updateFlight(flight.id, changes);
  renderTower();
 }

 function assignFlight() {
  var flight = getSelectedFlight();

  if (!flight) return;

  var runway = document.querySelector("#towerRunwaySelect").value;

  if (!runwayState[runway].open) {
    return;
  }

  updateSelectedFlight({
    terminal: document.querySelector("#towerTerminalSelect").value,
    gate: document.querySelector("#towerGateSelect").value,
    runway: runway,
    clearance: document.querySelector("#towerClearanceSelect").value,
    atcStatus: "ASSIGNED"
  });
 }

 function holdFlight() {
  updateSelectedFlight({
    holding: true,
    clearance: "HOLD",
    atcStatus: "HOLDING"
  });
 }

 function releaseFlight() {
  updateSelectedFlight({
    holding: false,
    clearance: "APPROACH",
    atcStatus: "APPROACHING"
  });
 }

 function clearTakeoff() {
  var flight = getSelectedFlight();

  if (!flight || flight.type !== "departure") return;

  updateSelectedFlight({
    clearance: "CLEARED_FOR_TAKEOFF",
    atcStatus: "TAKEOFF_CLEARED"
  });
 }

 function clearLanding() {
  var flight = getSelectedFlight();
  
  if (!flight || flight.type !== "arrival") return;

  updateSelectedFlight({
    clearance: "CLEARED_TO_LAND",
    atcStatus: "LANDING_CLEARED"
  });
 }

 initializeWindow("runwayControl")
 initializeIcon("towerIcon", "runwayControl");

 document.querySelector("#towerIcon").addEventListener("click", renderTower)

 document.addEventListener("click", function (event){
  var flightRow = event.target.closest("[data-flight-id]");
  var runwayButton = event.target.closest("[data-runway]");
  var filterButton = event.target.closest("[data-tower-filter]");

  if (flightRow) {
    selectedFlightId = flightRow.dataset.flightId;
    renderTower();
    return;
  }

  if (runwayButton) {
    var runway = runwayButton.dataset.runway;
    runwayState[runway].open = !runwayState[runway].open;
    renderTower();
    return;
  }

  if (filterButton) {
    currentFilter = filterButton.dataset.towerFilter;
    renderTower();
  }
 });

 document.querySelector("#towerTerminalSelect").addEventListener(
  "change",
  function () {
    var flight = getSelectedFlight();
    if (flight) renderGateOptions(flight);
  }
 );

 document.querySelector("assignFlightButton")
  .addEventListener("click", assignFlight);

document.querySelector("#holdFlightButton")
  .addEventListener("click", releaseFlight);

document.querySelector("#releaseFlightButton")
  .addEventListener("click", releaseFlight);

document.querySelector("#takeoffFlightButton")
  .addEventListener("click", clearTakeoff)
  
document.querySelector("#landingFlightButton")
  .addEventListener("click", clearLanding);

setInterval(function () {
  var windowElement = document.querySelector("#runwayControl");

  if (windowElement && windowElement.style.display === "flex") {
    renderTower();
  }
}, 1000);
})();

/* ========== TERMINAL CLI MODULE ========== */

