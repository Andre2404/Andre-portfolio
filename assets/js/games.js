'use strict';

// Solar Panel Sun-Seeker Game
let solarAngle = 0;
let solarScore = 0;
let sunAngle = 45; // Angle of sun
let solarGameInterval;

function initSolarGame() {
  const canvas = document.getElementById('solarGame');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  function drawSolarPanel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw sun
    const sunX = 150 + Math.cos(sunAngle * Math.PI / 180) * 100;
    const sunY = 150 + Math.sin(sunAngle * Math.PI / 180) * 100;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFD700';
    ctx.fill();
    
    // Draw panel
    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(solarAngle * Math.PI / 180);
    ctx.fillStyle = '#333';
    ctx.fillRect(-50, -20, 100, 40);
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(-45, -15, 90, 30);
    ctx.restore();
    
    // Calculate efficiency
    const angleDiff = Math.abs(solarAngle - sunAngle);
    const efficiency = Math.max(0, 100 - angleDiff);
    solarScore = Math.floor(efficiency);
    
    document.getElementById('solarScore').textContent = solarScore;
    document.getElementById('solarAngle').textContent = Math.round(solarAngle);
    
    // Animate sun
    sunAngle += 0.5;
    if (sunAngle > 360) sunAngle = 0;
  }
  
  if (solarGameInterval) clearInterval(solarGameInterval);
  solarGameInterval = setInterval(drawSolarPanel, 50);
  drawSolarPanel();
}

function rotateSolarPanel(angle) {
  solarAngle += angle;
  if (solarAngle < 0) solarAngle += 360;
  if (solarAngle >= 360) solarAngle -= 360;
  initSolarGame();
}

// Logic Gate Keeper Game
let logicInputA = 0;
let logicInputB = 0;
let selectedGate = '';
let logicTarget = 1;
let logicScore = 0;

function toggleLogicInput(input) {
  if (input === 'A') {
    logicInputA = logicInputA === 0 ? 1 : 0;
    document.getElementById('logicA').textContent = logicInputA;
  } else {
    logicInputB = logicInputB === 0 ? 1 : 0;
    document.getElementById('logicB').textContent = logicInputB;
  }
  updateLogicOutput();
}

function selectGate(gate) {
  selectedGate = gate;
  document.querySelectorAll('.gate-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent === gate) {
      btn.classList.add('active');
    }
  });
  updateLogicOutput();
}

function updateLogicOutput() {
  if (!selectedGate) {
    document.getElementById('logicOutput').textContent = '?';
    return;
  }
  
  let output = 0;
  switch(selectedGate) {
    case 'AND':
      output = logicInputA && logicInputB;
      break;
    case 'OR':
      output = logicInputA || logicInputB;
      break;
    case 'XOR':
      output = (logicInputA ^ logicInputB);
      break;
    case 'NAND':
      output = !(logicInputA && logicInputB) ? 1 : 0;
      break;
  }
  
  document.getElementById('logicOutput').textContent = output;
}

function checkLogicGate() {
  const output = parseInt(document.getElementById('logicOutput').textContent);
  if (output === logicTarget) {
    logicScore += 10;
    document.getElementById('logicScore').textContent = logicScore;
    logicTarget = Math.floor(Math.random() * 2);
    document.getElementById('logicTarget').textContent = logicTarget;
    alert('Benar! +10 poin');
  } else {
    alert('Salah! Coba lagi.');
  }
}

// PID Tuner Game
let pidKp = 1.0;
let pidKi = 0.5;
let pidKd = 0.2;
let pidSetpoint = 50;
let pidCurrent = 0;
let pidError = 50;
let pidIntegral = 0;
let pidLastError = 0;
let pidSimulationRunning = false;
let pidData = [];

function updatePID(param, value) {
  value = parseFloat(value);
  if (param === 'Kp') {
    pidKp = value;
    document.getElementById('pidKp').textContent = value.toFixed(1);
  } else if (param === 'Ki') {
    pidKi = value;
    document.getElementById('pidKi').textContent = value.toFixed(1);
  } else if (param === 'Kd') {
    pidKd = value;
    document.getElementById('pidKd').textContent = value.toFixed(1);
  }
}

function startPIDSimulation() {
  if (pidSimulationRunning) {
    pidSimulationRunning = false;
    return;
  }
  
  pidSimulationRunning = true;
  pidCurrent = 0;
  pidIntegral = 0;
  pidLastError = 0;
  pidData = [];
  
  const canvas = document.getElementById('pidChart');
  const ctx = canvas.getContext('2d');
  
  function simulate() {
    if (!pidSimulationRunning) return;
    
    pidError = pidSetpoint - pidCurrent;
    pidIntegral += pidError;
    const derivative = pidError - pidLastError;
    
    const output = pidKp * pidError + pidKi * pidIntegral + pidKd * derivative;
    pidCurrent += output * 0.1;
    pidLastError = pidError;
    
    pidData.push({ time: pidData.length, value: pidCurrent });
    if (pidData.length > 100) pidData.shift();
    
    document.getElementById('pidCurrent').textContent = Math.round(pidCurrent);
    document.getElementById('pidError').textContent = Math.round(pidError);
    
    // Draw chart
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const maxValue = Math.max(pidSetpoint * 1.5, ...pidData.map(d => d.value));
    const scaleX = canvas.width / 100;
    const scaleY = canvas.height / maxValue;
    
    pidData.forEach((point, i) => {
      const x = i * scaleX;
      const y = canvas.height - point.value * scaleY;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    
    // Draw setpoint line
    ctx.strokeStyle = '#fff';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - pidSetpoint * scaleY);
    ctx.lineTo(canvas.width, canvas.height - pidSetpoint * scaleY);
    ctx.stroke();
    ctx.setLineDash([]);
    
    if (Math.abs(pidError) < 1) {
      pidSimulationRunning = false;
      alert('Setpoint tercapai!');
    }
  }
  
  const interval = setInterval(() => {
    simulate();
    if (!pidSimulationRunning) clearInterval(interval);
  }, 100);
}

// Battery Charge Stack Game
let batteryLevel = 0;
let batteryMoves = 0;
let batteryBest = localStorage.getItem('batteryBest') || '-';

function chargeBattery(type) {
  if (batteryLevel >= 100) return;
  
  const charges = { 1: 10, 2: 20, 3: 30 };
  batteryLevel = Math.min(100, batteryLevel + charges[type]);
  batteryMoves++;
  
  updateBatteryDisplay();
  
  if (batteryLevel >= 100) {
    if (batteryBest === '-' || batteryMoves < parseInt(batteryBest)) {
      batteryBest = batteryMoves;
      localStorage.setItem('batteryBest', batteryBest);
    }
    document.getElementById('batteryBest').textContent = batteryBest;
    alert('Baterai penuh! Moves: ' + batteryMoves);
  }
}

function updateBatteryDisplay() {
  document.getElementById('batteryLevel').style.height = batteryLevel + '%';
  document.getElementById('batteryPercent').textContent = Math.round(batteryLevel);
  document.getElementById('batteryMoves').textContent = batteryMoves;
  document.getElementById('batteryBest').textContent = batteryBest;
}

function resetBattery() {
  batteryLevel = 0;
  batteryMoves = 0;
  updateBatteryDisplay();
}

// Grid Master: Blackout Prevention Game
let gridSupply = 100;
let gridDemand = 80;
let gridBalance = 20;
let gridTime = 0;
let gridScore = 0;
let gridGameRunning = false;

function adjustGrid(type, amount) {
  if (type === 'supply') {
    gridSupply = Math.max(0, Math.min(200, gridSupply + amount));
  } else {
    gridDemand = Math.max(0, Math.min(200, gridDemand + amount));
  }
  updateGridDisplay();
}

function updateGridDisplay() {
  gridBalance = gridSupply - gridDemand;
  document.getElementById('gridSupply').textContent = gridSupply;
  document.getElementById('gridDemand').textContent = gridDemand;
  document.getElementById('gridBalance').textContent = gridBalance;
  
  let status = 'Stable';
  let statusColor = '#FFD700';
  
  if (Math.abs(gridBalance) > 50) {
    status = 'Critical!';
    statusColor = '#ff4444';
  } else if (Math.abs(gridBalance) > 20) {
    status = 'Warning';
    statusColor = '#ffaa00';
  }
  
  document.getElementById('gridStatusText').textContent = status;
  document.getElementById('gridStatusText').style.color = statusColor;
}

function startGridGame() {
  if (gridGameRunning) {
    gridGameRunning = false;
    return;
  }
  
  gridGameRunning = true;
  gridTime = 0;
  gridScore = 0;
  
  const interval = setInterval(() => {
    if (!gridGameRunning) {
      clearInterval(interval);
      return;
    }
    
    gridTime++;
    document.getElementById('gridTime').textContent = gridTime;
    
    // Random demand changes
    if (Math.random() < 0.3) {
      gridDemand += Math.floor(Math.random() * 20) - 10;
      gridDemand = Math.max(0, Math.min(200, gridDemand));
    }
    
    updateGridDisplay();
    
    // Calculate score
    if (Math.abs(gridBalance) < 10) {
      gridScore += 10;
    } else if (Math.abs(gridBalance) < 20) {
      gridScore += 5;
    } else {
      gridScore -= 5;
    }
    
    document.getElementById('gridScore').textContent = Math.max(0, gridScore);
    
    // Game over condition
    if (Math.abs(gridBalance) > 100) {
      gridGameRunning = false;
      alert('Blackout! Game Over. Score: ' + gridScore);
    }
  }, 1000);
}

// Initialize games when page loads
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('solarGame')) {
    initSolarGame();
  }
  if (document.getElementById('batteryBest')) {
    document.getElementById('batteryBest').textContent = batteryBest;
  }
  updateGridDisplay();
});

