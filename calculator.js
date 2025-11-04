const display = document.getElementById("display");
const historyContainer = document.getElementById("history-container");
const historyList = document.getElementById("history-list");
const clearHistoryBtn = document.getElementById("clear-history");
const toggleHistoryBtn = document.getElementById("toggle-history");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

/* ----------------------------
   📱 Basic Functions
----------------------------- */
function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

/* ----------------------------
   🧮 Calculate & Auto-Log History
----------------------------- */
function calculateResult() {
  try {
    const expression = display.value;
    const result = eval(expression);
    display.value = result;

    if (expression && !isNaN(result)) {
      addToHistory(expression, result);
    }
  } catch (error) {
    display.value = "Error";
  }
}

/* ----------------------------
   🧾 Add to History
----------------------------- */
function addToHistory(expression, result) {
  const listItem = document.createElement("li");
  listItem.textContent = `${expression} = ${result}`;

  // Reuse result when clicked
  listItem.addEventListener("click", () => {
    display.value = result;
  });

  // Add newest on top
  historyList.prepend(listItem);

  // Keep only 10 entries
  if (historyList.children.length > 10) {
    historyList.removeChild(historyList.lastChild);
  }
}

/* ----------------------------
   🧹 Clear History (Animated)
----------------------------- */
clearHistoryBtn.addEventListener("click", () => {
  const items = document.querySelectorAll("#history-list li");

  items.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("fade-out");
      setTimeout(() => item.remove(), 400);
    }, index * 60);
  });
});

/* ----------------------------
   📜 Show / Hide History Toggle
----------------------------- */
toggleHistoryBtn.addEventListener("click", () => {
  historyContainer.classList.toggle("hidden");
  toggleHistoryBtn.textContent = historyContainer.classList.contains("hidden")
    ? "📜 Show History"
    : "📜 Hide History";
});

/* ----------------------------
   🌗 Theme Switch (Dark / Light)
----------------------------- */
body.classList.add("light");

themeToggle.addEventListener("click", () => {
  if (body.classList.contains("light")) {
    body.classList.replace("light", "dark");
    themeToggle.textContent = "☀️ Light Mode";
  } else {
    body.classList.replace("dark", "light");
    themeToggle.textContent = "🌙 Dark Mode";
  }
});

/* ----------------------------
   ⌨️ Keyboard Support + Highlight
----------------------------- */
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    calculateResult();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }

  highlightButton(key);
});

/* ----------------------------
   🎨 Button Highlight Animation
----------------------------- */
function highlightButton(key) {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((btn) => {
    if (
      btn.textContent.trim() === key ||
      (key === "*" && btn.textContent.trim() === "×") ||
      (key === "/" && btn.textContent.trim() === "÷") ||
      (key === "Enter" && btn.textContent.trim() === "=")
    ) {
      btn.classList.add("active");
      setTimeout(() => btn.classList.remove("active"), 150);
    }
  });
}

/* ----------------------------
   🖱️ Mouse Click Animation
----------------------------- */
const allButtons = document.querySelectorAll("button");

allButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("active");
    setTimeout(() => btn.classList.remove("active"), 150);
  });
});


// 🌀 Re-trigger fade-in animations for info sections on page load
window.addEventListener("load", () => {
  const infoSections = document.querySelectorAll(".info-section");
  
  infoSections.forEach(section => {
    section.classList.remove("info-section"); // temporarily remove to reset
    void section.offsetWidth; // force reflow (restart animation)
    section.classList.add("info-section"); // reapply animation
  });
});


// ✨ Restart animations when toggling theme
themeToggle.addEventListener("click", () => {
  document.querySelectorAll(".info-section").forEach(section => {
    section.style.animation = "none";
    void section.offsetWidth; // force reflow
    section.style.animation = "";
  });
});
