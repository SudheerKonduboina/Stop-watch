let startTime = 0;
let elapsedTime = 0;
let timerInterval;

// Function  to format time
function formatTime(time) {
  const date = new Date(time);
  const hours = String(Math.floor(time / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(date.getUTCMilliseconds()).padStart(2, "0").slice(0, 2); 
  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

// Update display
function updateDisplay() {
  document.getElementById("display").innerText = formatTime(elapsedTime);
}

// Start the stopwatch
function startStopwatch() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 10);
  document.getElementById("startButton").disabled = true;
  document.getElementById("pauseButton").disabled = false;
  document.getElementById("resetButton").disabled = false;
  document.getElementById("lapButton").disabled = false;
}

// To pause the stopwatch
function pauseStopwatch() {
  clearInterval(timerInterval);
  document.getElementById("startButton").disabled = false;
  document.getElementById("pauseButton").disabled = true;
}

// To reset the stopwatch
function resetStopwatch() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateDisplay();
  document.getElementById("laps").innerHTML = "";
  document.getElementById("startButton").disabled = false;
  document.getElementById("pauseButton").disabled = true;
  document.getElementById("resetButton").disabled = true;
  document.getElementById("lapButton").disabled = true;
}

//To record a lap
function recordLap() {
  const lapTime = formatTime(elapsedTime);
  const lapElement = document.createElement("div");
  lapElement.className = "lap";
  lapElement.innerText = `Lap: ${lapTime}`;
  document.getElementById("laps").appendChild(lapElement);
}

// Event listeners for buttons
document.getElementById("startButton").addEventListener("click", startStopwatch);
document.getElementById("pauseButton").addEventListener("click", pauseStopwatch);
document.getElementById("resetButton").addEventListener("click", resetStopwatch);
document.getElementById("lapButton").addEventListener("click", recordLap);
