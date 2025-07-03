let startTime = 0;
let elapsed = 0;
let timerInterval = null;
let lapCount = 0;
let lastLapTime = 0;

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');
  const millis = String(ms % 1000).padStart(3, '0');
  return `${hrs}:${mins}:${secs}.${millis}`;
}

function updateDisplay() {
  const now = Date.now();
  const timeDiff = now - startTime + elapsed;
  document.getElementById("timer").textContent = formatTime(timeDiff);
}

function start() {
  if (!timerInterval) {
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 10);
    document.getElementById("startBtn").disabled = true;
    document.getElementById("pauseBtn").disabled = false;
    document.querySelector(".lap").disabled = false;
  }
}

function pause() {
  if (timerInterval) {
    clearInterval(timerInterval);
    elapsed += Date.now() - startTime;
    timerInterval = null;
    document.getElementById("startBtn").disabled = false;
    document.getElementById("pauseBtn").disabled = true;
    document.querySelector(".lap").disabled = true;
  }
}

function reset() {
  clearInterval(timerInterval);
  timerInterval = null;
  startTime = 0;
  elapsed = 0;
  lapCount = 0;
  lastLapTime = 0;
  document.getElementById("timer").textContent = "00:00:00.000";
  document.getElementById("laps").innerHTML = '';
  document.getElementById("startBtn").disabled = false;
  document.getElementById("pauseBtn").disabled = true;
  document.querySelector(".lap").disabled = true;
}

function lap() {
  if (timerInterval) {
    const now = Date.now();
    const currentElapsed = now - startTime + elapsed;
    const lapTime = currentElapsed - lastLapTime;
    lastLapTime = currentElapsed;
    lapCount++;

    const li = document.createElement('li');
    li.textContent = `Lap ${lapCount}: ${formatTime(currentElapsed)} (Lap Time: ${formatTime(lapTime)})`;
    document.getElementById("laps").appendChild(li);
  }
}
