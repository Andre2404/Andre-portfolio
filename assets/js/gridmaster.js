'use strict';

// ============================================
// Grid Master: Blackout Prevention
// ============================================

let gridMasterState = {
  gameTime: 0, // in game hours (0-23)
  gameDay: 1,
  gameRunning: false,
  gridStability: 100,
  
  // Energy Sources
  solar: { enabled: true, output: 0 },
  wind: { enabled: true, output: 0 },
  diesel: { enabled: false, output: 0, pollution: 0 },
  battery: { level: 50, mode: 'IDLE' }, // CHARGE, DISCHARGE, IDLE
  
  // Demand
  demand: 0,
  
  // Stats
  totalGreenEnergy: 0,
  totalEnergy: 0,
  blackouts: 0,
  uptime: 0
};

let gridMasterInterval = null;

function initGridMaster() {
  const container = document.getElementById('gridMasterContainer');
  if (!container) return;
  
  container.innerHTML = `
    <div class="grid-master-dashboard">
      <!-- Top Bar -->
      <div class="gm-top-bar">
        <div class="gm-clock">
          <div class="gm-time" id="gmTime">00:00</div>
          <div class="gm-day">Day <span id="gmDay">1</span></div>
        </div>
        <div class="gm-stability-meter">
          <div class="gm-stability-label">Grid Stability</div>
          <div class="gm-stability-bar">
            <div class="gm-stability-fill" id="gmStabilityFill"></div>
            <div class="gm-stability-text" id="gmStabilityText">100%</div>
          </div>
        </div>
        <div class="gm-controls-top">
          <button class="gm-btn" id="gmStartBtn" onclick="startGridMaster()">Start Simulation</button>
          <button class="gm-btn" id="gmResetBtn" onclick="resetGridMaster()">Reset</button>
        </div>
      </div>

      <!-- Main Grid -->
      <div class="gm-main-grid">
        <!-- Left Panel: Generation Control -->
        <div class="gm-panel gm-generation">
          <h3 class="gm-panel-title">Generation Control</h3>
          
          <!-- Solar -->
          <div class="gm-source-card">
            <div class="gm-source-header">
              <div class="gm-source-icon">☀️</div>
              <div class="gm-source-name">Solar (PLTS)</div>
              <label class="gm-toggle">
                <input type="checkbox" id="gmSolarToggle" checked onchange="toggleSource('solar')">
                <span class="gm-toggle-slider"></span>
              </label>
            </div>
            <div class="gm-source-output">
              <span class="gm-output-label">Output:</span>
              <span class="gm-output-value" id="gmSolarOutput">0</span> MW
            </div>
            <div class="gm-source-chart">
              <canvas id="gmSolarChart" width="200" height="60"></canvas>
            </div>
          </div>

          <!-- Wind -->
          <div class="gm-source-card">
            <div class="gm-source-header">
              <div class="gm-source-icon">💨</div>
              <div class="gm-source-name">Wind (PLTB)</div>
              <label class="gm-toggle">
                <input type="checkbox" id="gmWindToggle" checked onchange="toggleSource('wind')">
                <span class="gm-toggle-slider"></span>
              </label>
            </div>
            <div class="gm-source-output">
              <span class="gm-output-label">Output:</span>
              <span class="gm-output-value" id="gmWindOutput">0</span> MW
            </div>
            <div class="gm-source-chart">
              <canvas id="gmWindChart" width="200" height="60"></canvas>
            </div>
          </div>

          <!-- Diesel -->
          <div class="gm-source-card">
            <div class="gm-source-header">
              <div class="gm-source-icon">⛽</div>
              <div class="gm-source-name">Diesel (Backup)</div>
              <label class="gm-toggle">
                <input type="checkbox" id="gmDieselToggle" onchange="toggleSource('diesel')">
                <span class="gm-toggle-slider"></span>
              </label>
            </div>
            <div class="gm-source-output">
              <span class="gm-output-label">Output:</span>
              <span class="gm-output-value" id="gmDieselOutput">0</span> MW
            </div>
            <div class="gm-source-warning" id="gmDieselWarning" style="display: none;">
              ⚠️ Pollution Penalty Active
            </div>
          </div>
        </div>

        <!-- Center Panel: Battery & Status -->
        <div class="gm-panel gm-center">
          <h3 class="gm-panel-title">Battery Storage (BESS)</h3>
          
          <div class="gm-battery-visual">
            <div class="gm-battery-container-large">
              <div class="gm-battery-body-large">
                <div class="gm-battery-level-large" id="gmBatteryLevel"></div>
              </div>
              <div class="gm-battery-top-large"></div>
            </div>
            <div class="gm-battery-percent-large" id="gmBatteryPercent">50%</div>
          </div>

          <div class="gm-battery-controls">
            <button class="gm-btn-battery" id="gmChargeBtn" onclick="setBatteryMode('CHARGE')">CHARGE</button>
            <button class="gm-btn-battery" id="gmIdleBtn" onclick="setBatteryMode('IDLE')">IDLE</button>
            <button class="gm-btn-battery" id="gmDischargeBtn" onclick="setBatteryMode('DISCHARGE')">DISCHARGE</button>
          </div>

          <div class="gm-net-power">
            <div class="gm-net-power-label">Net Power</div>
            <div class="gm-net-power-value" id="gmNetPower">0 MW</div>
            <div class="gm-net-power-status" id="gmNetPowerStatus">Balanced</div>
          </div>
        </div>

        <!-- Right Panel: City Demand -->
        <div class="gm-panel gm-demand">
          <h3 class="gm-panel-title">City Demand</h3>
          
          <div class="gm-city-visual" id="gmCityVisual">
            <div class="gm-city-silhouette"></div>
            <div class="gm-city-lights" id="gmCityLights"></div>
          </div>

          <div class="gm-demand-info">
            <div class="gm-demand-value">
              <span class="gm-demand-label">Current Load:</span>
              <span class="gm-demand-number" id="gmDemandValue">0</span> MW
            </div>
            <div class="gm-demand-chart">
              <canvas id="gmDemandChart" width="250" height="100"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Stats -->
      <div class="gm-stats-bar">
        <div class="gm-stat-item">
          <div class="gm-stat-label">Green Energy</div>
          <div class="gm-stat-value" id="gmGreenEnergy">0%</div>
        </div>
        <div class="gm-stat-item">
          <div class="gm-stat-label">Uptime</div>
          <div class="gm-stat-value" id="gmUptime">0h</div>
        </div>
        <div class="gm-stat-item">
          <div class="gm-stat-label">Blackouts</div>
          <div class="gm-stat-value" id="gmBlackouts">0</div>
        </div>
        <div class="gm-stat-item">
          <div class="gm-stat-label">Total Energy</div>
          <div class="gm-stat-value" id="gmTotalEnergy">0 MWh</div>
        </div>
      </div>
    </div>

    <!-- Game Over Modal -->
    <div class="gm-modal" id="gmModal" style="display: none;">
      <div class="gm-modal-content">
        <h2 id="gmModalTitle">Game Over</h2>
        <div class="gm-modal-stats" id="gmModalStats"></div>
        <button class="gm-btn" onclick="closeGridMasterModal()">Close</button>
        <button class="gm-btn" onclick="resetGridMaster()">Play Again</button>
      </div>
    </div>
  `;
  
  updateGridMasterDisplay();
}

function startGridMaster() {
  if (gridMasterState.gameRunning) {
    gridMasterState.gameRunning = false;
    if (gridMasterInterval) {
      clearInterval(gridMasterInterval);
      gridMasterInterval = null;
    }
    document.getElementById('gmStartBtn').textContent = 'Start Simulation';
    return;
  }
  
  gridMasterState.gameRunning = true;
  document.getElementById('gmStartBtn').textContent = 'Pause';
  
  gridMasterInterval = setInterval(() => {
    updateGridMaster();
  }, 1000); // 1 second = 1 game hour
}

function resetGridMaster() {
  gridMasterState = {
    gameTime: 0,
    gameDay: 1,
    gameRunning: false,
    gridStability: 100,
    solar: { enabled: true, output: 0 },
    wind: { enabled: true, output: 0 },
    diesel: { enabled: false, output: 0, pollution: 0 },
    battery: { level: 50, mode: 'IDLE' },
    demand: 0,
    totalGreenEnergy: 0,
    totalEnergy: 0,
    blackouts: 0,
    uptime: 0
  };
  
  if (gridMasterInterval) {
    clearInterval(gridMasterInterval);
    gridMasterInterval = null;
  }
  
  document.getElementById('gmStartBtn').textContent = 'Start Simulation';
  updateGridMasterDisplay();
}

function updateGridMaster() {
  // Update game time
  gridMasterState.gameTime += 1;
  if (gridMasterState.gameTime >= 24) {
    gridMasterState.gameTime = 0;
    gridMasterState.gameDay += 1;
    
    // Win condition: Survive 3 days (72 hours)
    if (gridMasterState.gameDay > 3) {
      endGridMaster(true);
      return;
    }
  }
  
  // Calculate demand based on time
  const hour = gridMasterState.gameTime;
  let baseDemand = 50;
  
  // Peak load: 17:00 - 22:00
  if (hour >= 17 && hour < 22) {
    baseDemand = 80 + (hour - 17) * 5;
  }
  // Low load: 00:00 - 05:00
  else if (hour >= 0 && hour < 5) {
    baseDemand = 30;
  }
  // Normal load
  else {
    baseDemand = 50 + Math.sin((hour - 6) * Math.PI / 12) * 10;
  }
  
  gridMasterState.demand = Math.round(baseDemand);
  
  // Calculate solar output (sine wave, max at 12:00)
  if (gridMasterState.solar.enabled) {
    const solarAngle = (hour - 6) * Math.PI / 12;
    gridMasterState.solar.output = Math.max(0, Math.sin(solarAngle) * 40);
  } else {
    gridMasterState.solar.output = 0;
  }
  
  // Calculate wind output (random fluctuation)
  if (gridMasterState.wind.enabled) {
    gridMasterState.wind.output = 20 + Math.random() * 15;
  } else {
    gridMasterState.wind.output = 0;
  }
  
  // Diesel output (constant if enabled)
  if (gridMasterState.diesel.enabled) {
    gridMasterState.diesel.output = 30;
    gridMasterState.diesel.pollution += 0.1;
  } else {
    gridMasterState.diesel.output = 0;
  }
  
  // Calculate total supply
  const totalSupply = gridMasterState.solar.output + 
                     gridMasterState.wind.output + 
                     gridMasterState.diesel.output;
  
  // Battery operations
  let batteryOutput = 0;
  if (gridMasterState.battery.mode === 'DISCHARGE' && gridMasterState.battery.level > 0) {
    batteryOutput = Math.min(20, gridMasterState.battery.level * 0.4);
    gridMasterState.battery.level -= batteryOutput * 0.5;
  } else if (gridMasterState.battery.mode === 'CHARGE' && gridMasterState.battery.level < 100) {
    const surplus = totalSupply - gridMasterState.demand;
    if (surplus > 0) {
      const chargeRate = Math.min(surplus * 0.3, 10);
      gridMasterState.battery.level = Math.min(100, gridMasterState.battery.level + chargeRate);
    }
  }
  
  // Net power
  const netPower = totalSupply + batteryOutput - gridMasterState.demand;
  
  // Update grid stability
  if (netPower < 0) {
    const deficit = Math.abs(netPower);
    gridMasterState.gridStability -= deficit * 0.5;
  } else {
    gridMasterState.gridStability = Math.min(100, gridMasterState.gridStability + 0.1);
  }
  
  gridMasterState.gridStability = Math.max(0, gridMasterState.gridStability);
  
  // Update stats
  gridMasterState.totalEnergy += totalSupply;
  gridMasterState.totalGreenEnergy += gridMasterState.solar.output + gridMasterState.wind.output;
  gridMasterState.uptime += 1;
  
  // Check for blackout
  if (gridMasterState.gridStability <= 0) {
    gridMasterState.blackouts += 1;
    endGridMaster(false);
    return;
  }
  
  updateGridMasterDisplay();
}

function updateGridMasterDisplay() {
  // Time and day
  const hours = Math.floor(gridMasterState.gameTime);
  const minutes = Math.floor((gridMasterState.gameTime % 1) * 60);
  document.getElementById('gmTime').textContent = 
    String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
  document.getElementById('gmDay').textContent = gridMasterState.gameDay;
  
  // Stability
  const stabilityEl = document.getElementById('gmStabilityFill');
  const stabilityText = document.getElementById('gmStabilityText');
  stabilityEl.style.width = gridMasterState.gridStability + '%';
  stabilityText.textContent = Math.round(gridMasterState.gridStability) + '%';
  
  if (gridMasterState.gridStability > 70) {
    stabilityEl.style.background = '#4CAF50';
  } else if (gridMasterState.gridStability > 30) {
    stabilityEl.style.background = '#FFD700';
  } else {
    stabilityEl.style.background = '#ff4444';
  }
  
  // Source outputs
  document.getElementById('gmSolarOutput').textContent = Math.round(gridMasterState.solar.output);
  document.getElementById('gmWindOutput').textContent = Math.round(gridMasterState.wind.output);
  document.getElementById('gmDieselOutput').textContent = Math.round(gridMasterState.diesel.output);
  
  // Diesel warning
  if (gridMasterState.diesel.enabled) {
    document.getElementById('gmDieselWarning').style.display = 'block';
  } else {
    document.getElementById('gmDieselWarning').style.display = 'none';
  }
  
  // Battery
  const batteryLevel = gridMasterState.battery.level;
  document.getElementById('gmBatteryLevel').style.height = batteryLevel + '%';
  document.getElementById('gmBatteryPercent').textContent = Math.round(batteryLevel) + '%';
  
  // Battery mode buttons
  document.querySelectorAll('.gm-btn-battery').forEach(btn => btn.classList.remove('active'));
  if (gridMasterState.battery.mode === 'CHARGE') {
    document.getElementById('gmChargeBtn').classList.add('active');
  } else if (gridMasterState.battery.mode === 'DISCHARGE') {
    document.getElementById('gmDischargeBtn').classList.add('active');
  } else {
    document.getElementById('gmIdleBtn').classList.add('active');
  }
  
  // Net power
  const totalSupply = gridMasterState.solar.output + 
                     gridMasterState.wind.output + 
                     gridMasterState.diesel.output;
  const batteryOutput = gridMasterState.battery.mode === 'DISCHARGE' ? 
    Math.min(20, gridMasterState.battery.level * 0.4) : 0;
  const netPower = totalSupply + batteryOutput - gridMasterState.demand;
  
  document.getElementById('gmNetPower').textContent = 
    (netPower >= 0 ? '+' : '') + Math.round(netPower) + ' MW';
  
  const netStatus = document.getElementById('gmNetPowerStatus');
  if (netPower > 10) {
    netStatus.textContent = 'Surplus';
    netStatus.style.color = '#4CAF50';
  } else if (netPower < -10) {
    netStatus.textContent = 'Deficit';
    netStatus.style.color = '#ff4444';
  } else {
    netStatus.textContent = 'Balanced';
    netStatus.style.color = '#FFD700';
  }
  
  // Demand
  document.getElementById('gmDemandValue').textContent = Math.round(gridMasterState.demand);
  
  // City lights (dim if stability low)
  const cityLights = document.getElementById('gmCityLights');
  const brightness = gridMasterState.gridStability / 100;
  cityLights.style.opacity = brightness;
  
  // Stats
  const greenPercent = gridMasterState.totalEnergy > 0 ? 
    (gridMasterState.totalGreenEnergy / gridMasterState.totalEnergy * 100) : 0;
  document.getElementById('gmGreenEnergy').textContent = greenPercent.toFixed(1) + '%';
  document.getElementById('gmUptime').textContent = gridMasterState.uptime + 'h';
  document.getElementById('gmBlackouts').textContent = gridMasterState.blackouts;
  document.getElementById('gmTotalEnergy').textContent = Math.round(gridMasterState.totalEnergy) + ' MWh';
  
  // Draw charts
  drawSourceCharts();
  drawDemandChart();
}

function toggleSource(source) {
  gridMasterState[source].enabled = document.getElementById('gm' + source.charAt(0).toUpperCase() + source.slice(1) + 'Toggle').checked;
}

function setBatteryMode(mode) {
  gridMasterState.battery.mode = mode;
  updateGridMasterDisplay();
}

function drawSourceCharts() {
  // Simple line charts for solar and wind
  const solarCanvas = document.getElementById('gmSolarChart');
  const windCanvas = document.getElementById('gmWindChart');
  
  if (solarCanvas) {
    const ctx = solarCanvas.getContext('2d');
    ctx.clearRect(0, 0, solarCanvas.width, solarCanvas.height);
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < 24; i++) {
      const angle = (i - 6) * Math.PI / 12;
      const output = Math.max(0, Math.sin(angle) * 40);
      const x = (i / 24) * solarCanvas.width;
      const y = solarCanvas.height - (output / 40) * solarCanvas.height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  
  if (windCanvas) {
    const ctx = windCanvas.getContext('2d');
    ctx.clearRect(0, 0, windCanvas.width, windCanvas.height);
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < 24; i++) {
      const output = 20 + Math.sin(i * 0.5) * 10;
      const x = (i / 24) * windCanvas.width;
      const y = windCanvas.height - (output / 40) * windCanvas.height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}

function drawDemandChart() {
  const canvas = document.getElementById('gmDemandChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.strokeStyle = '#ff4444';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < 24; i++) {
    let demand = 50;
    if (i >= 17 && i < 22) {
      demand = 80 + (i - 17) * 5;
    } else if (i >= 0 && i < 5) {
      demand = 30;
    } else {
      demand = 50 + Math.sin((i - 6) * Math.PI / 12) * 10;
    }
    const x = (i / 24) * canvas.width;
    const y = canvas.height - (demand / 100) * canvas.height;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function endGridMaster(won) {
  gridMasterState.gameRunning = false;
  if (gridMasterInterval) {
    clearInterval(gridMasterInterval);
    gridMasterInterval = null;
  }
  
  const modal = document.getElementById('gmModal');
  const modalTitle = document.getElementById('gmModalTitle');
  const modalStats = document.getElementById('gmModalStats');
  
  modalTitle.textContent = won ? 'Victory! 3 Days Survived!' : 'Game Over - Blackout!';
  
  const greenPercent = gridMasterState.totalEnergy > 0 ? 
    (gridMasterState.totalGreenEnergy / gridMasterState.totalEnergy * 100) : 0;
  
  modalStats.innerHTML = `
    <div class="gm-stat-row">
      <span>Uptime:</span>
      <span>${gridMasterState.uptime} hours</span>
    </div>
    <div class="gm-stat-row">
      <span>Blackouts Prevented:</span>
      <span>${gridMasterState.blackouts === 0 ? 'Yes' : 'No'}</span>
    </div>
    <div class="gm-stat-row">
      <span>Green Energy Usage:</span>
      <span>${greenPercent.toFixed(1)}%</span>
    </div>
    <div class="gm-stat-row">
      <span>Total Energy Generated:</span>
      <span>${Math.round(gridMasterState.totalEnergy)} MWh</span>
    </div>
  `;
  
  modal.style.display = 'flex';
}

function closeGridMasterModal() {
  document.getElementById('gmModal').style.display = 'none';
}

// Initialize when page loads
if (document.getElementById('gridMasterContainer')) {
  initGridMaster();
}

