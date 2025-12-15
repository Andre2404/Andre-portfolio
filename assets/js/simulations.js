'use strict';

// ============================================
// Solar PV String Sizing Calculator
// ============================================

function updatePVCalc() {
  const voc = parseFloat(document.getElementById('vocSlider').value);
  const vmp = parseFloat(document.getElementById('vmpSlider').value);
  const tempCoeff = parseFloat(document.getElementById('tempCoeffSlider').value);
  const maxVoltage = parseFloat(document.getElementById('maxVoltageSlider').value);
  const minTemp = parseFloat(document.getElementById('minTempSlider').value);
  const maxTemp = parseFloat(document.getElementById('maxTempSlider').value);
  const series = parseInt(document.getElementById('seriesSlider').value);

  // Update display values
  document.getElementById('pvVoc').textContent = voc.toFixed(1);
  document.getElementById('pvVmp').textContent = vmp.toFixed(1);
  document.getElementById('pvTempCoeff').textContent = tempCoeff.toFixed(2);
  document.getElementById('pvMaxVoltage').textContent = maxVoltage;
  document.getElementById('pvMinTemp').textContent = minTemp;
  document.getElementById('pvMaxTemp').textContent = maxTemp;
  document.getElementById('pvSeries').textContent = series;

  // Calculate voltage at different temperatures
  // Voc increases at lower temperatures: Voc(T) = Voc(STC) * [1 + (T - 25) * tempCoeff/100]
  const tempDiffMin = minTemp - 25;
  const tempDiffMax = maxTemp - 25;
  
  const vocAtMinTemp = voc * (1 + (tempDiffMin * tempCoeff / 100));
  const vocAtMaxTemp = voc * (1 + (tempDiffMax * tempCoeff / 100));
  
  const totalVocMin = vocAtMinTemp * series;
  const totalVocMax = vocAtMaxTemp * series;

  document.getElementById('pvVoltMinTemp').textContent = totalVocMin.toFixed(1);
  document.getElementById('pvVoltMaxTemp').textContent = totalVocMax.toFixed(1);

  // Safety check
  const statusEl = document.getElementById('pvSafetyStatus');
  const statusValue = statusEl.querySelector('.result-value');
  
  if (totalVocMin > maxVoltage) {
    statusValue.textContent = 'DANGER - Exceeds Max Voltage!';
    statusValue.className = 'result-value danger';
  } else if (totalVocMin > maxVoltage * 0.95) {
    statusValue.textContent = 'WARNING - Close to Limit';
    statusValue.className = 'result-value warning';
  } else {
    statusValue.textContent = 'SAFE';
    statusValue.className = 'result-value safe';
  }

  // Draw voltage chart
  drawVoltageChart(totalVocMin, totalVocMax, maxVoltage);
}

function drawVoltageChart(voltMin, voltMax, maxVolt) {
  const canvas = document.getElementById('pvVoltageChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  // Draw max voltage line
  ctx.strokeStyle = '#ff4444';
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  const maxY = height - (maxVolt / 1000) * (height / 1.2);
  ctx.moveTo(0, maxY);
  ctx.lineTo(width, maxY);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#ff4444';
  ctx.font = '12px monospace';
  ctx.fillText(`Max: ${maxVolt}V`, width - 100, maxY - 5);

  // Draw voltage bars
  const barWidth = 80;
  const spacing = 40;
  const startX = 50;

  // Min temp voltage
  const minBarHeight = (voltMin / 1000) * (height / 1.2);
  ctx.fillStyle = voltMin > maxVolt ? '#ff4444' : '#4CAF50';
  ctx.fillRect(startX, height - minBarHeight, barWidth, minBarHeight);
  ctx.fillStyle = '#fff';
  ctx.font = '11px monospace';
  ctx.fillText(`${voltMin.toFixed(1)}V`, startX + 5, height - minBarHeight - 5);
  ctx.fillText('Min Temp', startX, height - 10);

  // Max temp voltage
  const maxBarHeight = (voltMax / 1000) * (height / 1.2);
  ctx.fillStyle = '#FFD700';
  ctx.fillRect(startX + barWidth + spacing, height - maxBarHeight, barWidth, maxBarHeight);
  ctx.fillStyle = '#fff';
  ctx.fillText(`${voltMax.toFixed(1)}V`, startX + barWidth + spacing + 5, height - maxBarHeight - 5);
  ctx.fillText('Max Temp', startX + barWidth + spacing, height - 10);
}

// ============================================
// Digital Twin OEE Simulator
// ============================================

let machineState = 'IDLE';
let stateHistory = [];

function updateOEE() {
  const temp = parseFloat(document.getElementById('tempSensor').value);
  const vibration = parseFloat(document.getElementById('vibSensor').value);
  const speed = parseFloat(document.getElementById('speedSensor').value);

  // Update display
  document.getElementById('sensorTemp').textContent = temp;
  document.getElementById('sensorVib').textContent = vibration.toFixed(1);
  document.getElementById('sensorSpeed').textContent = speed;

  // State machine logic
  let newState = 'RUNNING';
  if (temp > 80 || vibration > 5) {
    newState = 'FAULT';
  } else if (speed === 0) {
    newState = 'IDLE';
  }

  if (newState !== machineState) {
    machineState = newState;
    stateHistory.push({
      time: new Date().toLocaleTimeString(),
      state: newState
    });
    if (stateHistory.length > 10) stateHistory.shift();
    updateStateLog();
  }

  updateMachineVisual();
  calculateOEE(temp, vibration, speed);
}

function updateMachineVisual() {
  const icon = document.getElementById('machineIcon');
  const indicator = document.getElementById('machineStatusIndicator');
  const statusText = document.getElementById('machineStatusText');

  icon.className = 'machine-icon state-' + machineState.toLowerCase();
  indicator.className = 'machine-status-indicator state-' + machineState.toLowerCase();
  statusText.textContent = machineState;
}

function calculateOEE(temp, vibration, speed) {
  // Availability: based on fault/idle time
  let availability = 100;
  if (machineState === 'FAULT') availability = 0;
  else if (machineState === 'IDLE') availability = 50;

  // Performance: based on speed (assuming max speed is 100)
  const performance = (speed / 100) * 100;

  // Quality: based on vibration and temp (lower is better)
  let quality = 100;
  if (vibration > 3) quality -= (vibration - 3) * 10;
  if (temp > 60) quality -= (temp - 60) * 0.5;
  quality = Math.max(0, Math.min(100, quality));

  // Overall OEE
  const oee = (availability * performance * quality) / 10000;

  document.getElementById('oeeAvailability').textContent = availability.toFixed(1) + '%';
  document.getElementById('oeePerformance').textContent = performance.toFixed(1) + '%';
  document.getElementById('oeeQuality').textContent = quality.toFixed(1) + '%';
  document.getElementById('oeeTotal').textContent = oee.toFixed(1) + '%';
}

function updateStateLog() {
  const logEl = document.getElementById('stateLog');
  logEl.innerHTML = stateHistory.map(entry => 
    `<div class="log-entry">${entry.time} - ${entry.state}</div>`
  ).reverse().join('');
}

// ============================================
// Power Factor Correction Simulator
// ============================================

let capacitorValue = 0;

function updatePowerFactor() {
  const activePower = parseFloat(document.getElementById('activePowerSlider').value);
  const inductive = parseFloat(document.getElementById('inductiveSlider').value);
  capacitorValue = parseFloat(document.getElementById('capacitorSlider').value);

  document.getElementById('pfActivePower').textContent = activePower;
  document.getElementById('pfInductive').textContent = inductive;
  document.getElementById('pfCapacitor').textContent = capacitorValue;

  // Calculate reactive power after capacitor
  const netReactive = Math.max(0, inductive - capacitorValue);

  // Calculate apparent power
  const apparentPower = Math.sqrt(activePower * activePower + netReactive * netReactive);

  // Calculate power factor
  const powerFactor = activePower / apparentPower;

  // Calculate phase shift (in degrees)
  const phaseShift = Math.acos(powerFactor) * (180 / Math.PI);

  // Update displays
  document.getElementById('pfValue').textContent = powerFactor.toFixed(3);
  document.getElementById('pfPhaseShift').textContent = phaseShift.toFixed(1) + '°';
  document.getElementById('pfApparent').textContent = apparentPower.toFixed(1) + ' kVA';
  document.getElementById('pfReactive').textContent = netReactive.toFixed(1) + ' kVAR';

  // Draw waveforms
  drawWaveforms(phaseShift);
  drawPowerTriangle(activePower, netReactive, apparentPower);
}

function addCapacitor() {
  const currentCap = parseFloat(document.getElementById('capacitorSlider').value);
  const inductive = parseFloat(document.getElementById('inductiveSlider').value);
  const newCap = Math.min(inductive, currentCap + 20);
  document.getElementById('capacitorSlider').value = newCap;
  updatePowerFactor();
}

function drawWaveforms(phaseShift) {
  const canvas = document.getElementById('pfWaveform');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  // Draw grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 10; i++) {
    const y = (height / 10) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Draw voltage waveform (reference, in phase)
  ctx.strokeStyle = '#4CAF50';
  ctx.lineWidth = 2;
  ctx.beginPath();
  const centerY = height / 2;
  const amplitude = height / 4;
  for (let x = 0; x < width; x++) {
    const angle = (x / width) * Math.PI * 4;
    const y = centerY + Math.sin(angle) * amplitude;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.fillStyle = '#4CAF50';
  ctx.font = '12px monospace';
  ctx.fillText('Voltage', 10, 20);

  // Draw current waveform (shifted by phase)
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 2;
  ctx.beginPath();
  const phaseRad = (phaseShift * Math.PI) / 180;
  for (let x = 0; x < width; x++) {
    const angle = (x / width) * Math.PI * 4 - phaseRad;
    const y = centerY + Math.sin(angle) * amplitude;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.fillStyle = '#FFD700';
  ctx.fillText('Current', 10, 40);
}

function drawPowerTriangle(active, reactive, apparent) {
  const canvas = document.getElementById('powerTriangle');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  const scale = Math.min(width, height) / 200;
  const centerX = width / 2;
  const centerY = height / 2;

  // Draw triangle
  const activeLen = active * scale;
  const reactiveLen = reactive * scale;
  const apparentLen = apparent * scale;
  const angle = Math.acos(active / apparent);

  // Active power (horizontal)
  ctx.strokeStyle = '#4CAF50';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(centerX - activeLen / 2, centerY);
  ctx.lineTo(centerX + activeLen / 2, centerY);
  ctx.stroke();
  ctx.fillStyle = '#4CAF50';
  ctx.font = '12px monospace';
  ctx.fillText(`${active} kW`, centerX, centerY + 20);

  // Reactive power (vertical)
  ctx.strokeStyle = '#FFD700';
  ctx.beginPath();
  ctx.moveTo(centerX + activeLen / 2, centerY);
  ctx.lineTo(centerX + activeLen / 2, centerY - reactiveLen);
  ctx.stroke();
  ctx.fillStyle = '#FFD700';
  ctx.fillText(`${reactive.toFixed(1)} kVAR`, centerX + activeLen / 2 + 10, centerY - reactiveLen / 2);

  // Apparent power (hypotenuse)
  ctx.strokeStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(centerX - activeLen / 2, centerY);
  ctx.lineTo(centerX + activeLen / 2, centerY - reactiveLen);
  ctx.stroke();
  ctx.fillStyle = '#fff';
  ctx.font = '12px monospace';
  ctx.fillText(`${apparent.toFixed(1)} kVA`, centerX - 50, centerY - reactiveLen / 2);
}

// ============================================
// Navigation Functions
// ============================================

function navigateToGridMaster() {
  // Hide simulation page
  const simPage = document.querySelector('[data-page="simulation"]');
  const gridPage = document.querySelector('[data-page="gridmaster"]');
  
  if (simPage) simPage.style.display = 'none';
  if (gridPage) {
    gridPage.style.display = 'block';
    gridPage.classList.add('active');
    // Initialize Grid Master if not already initialized
    if (typeof initGridMaster === 'function' && !window.gridMasterInitialized) {
      initGridMaster();
      window.gridMasterInitialized = true;
    }
  }
  
  // Update navbar
  const navLinks = document.querySelectorAll('[data-nav-link]');
  navLinks.forEach(link => {
    if (link.textContent.trim() === 'Simulation') {
      link.classList.remove('active');
    }
  });
}

function navigateBackToSimulation() {
  const simPage = document.querySelector('[data-page="simulation"]');
  const gridPage = document.querySelector('[data-page="gridmaster"]');
  
  if (gridPage) {
    gridPage.style.display = 'none';
    gridPage.classList.remove('active');
  }
  if (simPage) {
    simPage.style.display = 'block';
    simPage.classList.add('active');
  }
  
  // Update navbar
  const navLinks = document.querySelectorAll('[data-nav-link]');
  navLinks.forEach(link => {
    if (link.textContent.trim() === 'Simulation') {
      link.classList.add('active');
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('vocSlider')) {
    updatePVCalc();
  }
  if (document.getElementById('tempSensor')) {
    updateOEE();
  }
  if (document.getElementById('activePowerSlider')) {
    updatePowerFactor();
  }
});

