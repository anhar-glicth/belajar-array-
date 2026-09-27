/**
 * visualizer.js
 * Modul Visualisasi Interaktif untuk Memori List 1D Python,
 * Simulator Logika Alur Nested If Python, dan Penelusuran Matriks Step-by-Step Nested Loop Python.
 */

const Visualizer = (function () {
  // State untuk List 1D Visualizer (Array A = [10, 2, 30, 4])
  let list1DData = [10, 2, 30, 4];

  // State untuk Nested Loop 2D Visualizer (Tabel Perkalian 1-3 x 1-5)
  let matrix2DData = [
    [1, 2, 3, 4, 5],
    [2, 4, 6, 8, 10],
    [3, 6, 9, 12, 15]
  ];
  let loopState = {
    row: 0,
    col: 0,
    isRunning: false,
    intervalId: null,
    speed: 700, // ms
    totalRows: 3,
    totalCols: 5,
    visitedCount: 0
  };

  /**
   * 1. Inisialisasi Visualizer List 1D Python
   */
  function init1DVisualizer(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    render1DArray(container);
  }

  function render1DArray(container) {
    let html = `
      <div class="visualizer-panel">
        <div class="vis-header">
          <div class="vis-title">
            <span class="badge-tag">Simulasi Memori Array</span>
            <h4>Eksplorasi Array A = [10, 2, 30, 4]</h4>
          </div>
          <div class="vis-stats">
            <span class="stat-pill">Panjang <code>len(A)</code>: <strong>${list1DData.length}</strong></span>
            <span class="stat-pill">Indeks Terakhir: <strong>${list1DData.length > 0 ? list1DData.length - 1 : "-"}</strong></span>
            <span class="stat-pill">Indeks Negatif Terakhir: <strong>${list1DData.length > 0 ? "-1" : "-"}</strong></span>
          </div>
        </div>

        <div class="memory-grid-wrapper">
          <div class="memory-boxes" id="mem1DBoxes">
            ${list1DData.map((item, idx) => {
              const negIdx = idx - list1DData.length;
              return `
                <div class="mem-slot" data-index="${idx}" onclick="Visualizer.inspect1DSlot(${idx})">
                  <div class="slot-idx">Indeks: ${idx} (${negIdx})</div>
                  <div class="slot-val">${escapeHtml(item)}</div>
                  <div class="slot-pointer">A[${idx}]</div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <div class="vis-controls">
          <div class="control-row">
            <input type="text" id="input1DVal" placeholder="Nilai..." value="50" class="vis-input">
            <button class="btn btn-sm btn-primary" onclick="Visualizer.append1D()">
              <span>+ .append()</span> <small>(Akhir)</small>
            </button>
            <button class="btn btn-sm btn-primary" onclick="Visualizer.insert01D()">
              <span>+ .insert(0, ...)</span> <small>(Awal)</small>
            </button>
            <button class="btn btn-sm btn-danger" onclick="Visualizer.pop1D()">
              <span>- .pop()</span> <small>(Akhir)</small>
            </button>
            <button class="btn btn-sm btn-danger" onclick="Visualizer.pop01D()">
              <span>- .pop(0)</span> <small>(Awal)</small>
            </button>
          </div>

          <div class="control-row secondary">
            <input type="number" id="input1DIdx" placeholder="Indeks" min="0" max="${Math.max(0, list1DData.length - 1)}" value="0" class="vis-input-small">
            <input type="text" id="input1DNewVal" placeholder="Nilai baru..." value="99" class="vis-input">
            <button class="btn btn-sm btn-warning" onclick="Visualizer.modify1D()">
              <span>Ubah Nilai A[i]</span>
            </button>
            <button class="btn btn-sm btn-outline" onclick="Visualizer.reset1D()">
              <span>Reset Contoh (A = [10, 2, 30, 4])</span>
            </button>
          </div>
        </div>

        <div class="vis-info-bar" id="mem1DFeedback">
          💡 Klik pada salah satu kotak indeks di atas untuk melihat detail pemanggilan indeks positif dan negatif di Python.
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  function append1D() {
    const valInput = document.getElementById("input1DVal");
    const val = valInput.value.trim() || "Item Baru";
    list1DData.push(val);
    render1DArray(document.getElementById("vis1DContainer"));
    highlightSlot(list1DData.length - 1, `Elemen baru ditambahkan di akhir dengan kode Python: <code>buah.append("${val}")</code>!`);
  }

  function insert01D() {
    const valInput = document.getElementById("input1DVal");
    const val = valInput.value.trim() || "Item Baru";
    list1DData.unshift(val);
    render1DArray(document.getElementById("vis1DContainer"));
    highlightSlot(0, `Elemen baru disisipkan di awal dengan kode Python: <code>buah.insert(0, "${val}")</code>! Semua indeks bergeser ke kanan.`);
  }

  function pop1D() {
    if (list1DData.length === 0) return;
    const removed = list1DData.pop();
    render1DArray(document.getElementById("vis1DContainer"));
    set1DFeedback(`Elemen terakhir "${removed}" telah dihapus dengan kode Python: <code>buah.pop()</code>!`);
  }

  function pop01D() {
    if (list1DData.length === 0) return;
    const removed = list1DData.shift();
    render1DArray(document.getElementById("vis1DContainer"));
    set1DFeedback(`Elemen pertama "${removed}" di indeks [0] dihapus dengan kode Python: <code>buah.pop(0)</code>!`);
  }

  function modify1D() {
    const idxInput = document.getElementById("input1DIdx");
    const valInput = document.getElementById("input1DNewVal");
    const idx = parseInt(idxInput.value, 10);
    const val = valInput.value.trim();

    if (isNaN(idx) || idx < 0 || idx >= list1DData.length) {
      set1DFeedback("⚠️ IndexError: list index out of range! Panjang list saat ini adalah " + list1DData.length, true);
      return;
    }

    const old = list1DData[idx];
    list1DData[idx] = val;
    render1DArray(document.getElementById("vis1DContainer"));
    highlightSlot(idx, `Elemen pada <code>buah[${idx}]</code> diubah dari "${old}" menjadi "${val}"!`);
  }

  function inspect1DSlot(idx) {
    const negIdx = idx - list1DData.length;
    highlightSlot(idx, `📍 Anda memilih elemen indeks positif <code>buah[${idx}]</code> atau indeks negatif <code>buah[${negIdx}]</code> yang bernilai: "${list1DData[idx]}".`);
  }

  function highlightSlot(idx, message) {
    const slots = document.querySelectorAll("#mem1DBoxes .mem-slot");
    slots.forEach(s => s.classList.remove("active", "pulse"));
    if (slots[idx]) {
      slots[idx].classList.add("active", "pulse");
    }
    set1DFeedback(message);
  }

  function set1DFeedback(msg, isError = false) {
    const fb = document.getElementById("mem1DFeedback");
    if (fb) {
      fb.innerHTML = isError ? `❌ ${msg}` : `✨ ${msg}`;
      fb.className = "vis-info-bar " + (isError ? "error" : "success");
    }
  }

  function reset1D() {
    list1DData = [10, 2, 30, 4];
    render1DArray(document.getElementById("vis1DContainer"));
    set1DFeedback("Array A telah dikembalikan ke nilai awal: A = [10, 2, 30, 4].");
  }


  /**
   * 2. Simulator Alur Keputusan Bertingkat (Nested If Simulator) di Python
   */
  function initNestedIfSimulator(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="visualizer-panel">
        <div class="vis-header">
          <div class="vis-title">
            <span class="badge-tag">Alur Logika Python</span>
            <h4>Simulator Keputusan Bertingkat (Nested If di Python)</h4>
          </div>
          <div class="vis-subtitle">Ubah parameter siswa di bawah dan amati bagaimana alur percabangan dievaluasi langkah demi langkah sesuai sintaks Python.</div>
        </div>

        <div class="nested-sim-body">
          <div class="sim-inputs-col">
            <div class="input-card">
              <label>1. Status Pelanggaran Disiplin</label>
              <div class="btn-toggle-group">
                <button type="button" class="toggle-btn" id="btnPelanggaranYa" onclick="Visualizer.updateNestedIf('pelanggaran', true)">Ada Pelanggaran (True)</button>
                <button type="button" class="toggle-btn active" id="btnPelanggaranTidak" onclick="Visualizer.updateNestedIf('pelanggaran', false)">Bersih (False)</button>
              </div>
            </div>

            <div class="input-card">
              <div class="label-with-val">
                <label>2. Persentase Kehadiran:</label>
                <span class="slider-val-badge" id="valKehadiran">85%</span>
              </div>
              <input type="range" id="rangeKehadiran" min="40" max="100" value="85" class="vis-range" oninput="Visualizer.updateNestedIf('kehadiran', this.value)">
              <div class="range-marks"><span>40%</span><span>Syarat &ge; 75%</span><span>100%</span></div>
            </div>

            <div class="input-card">
              <div class="label-with-val">
                <label>3. Nilai Ujian Akhir:</label>
                <span class="slider-val-badge" id="valNilai">88</span>
              </div>
              <input type="range" id="rangeNilai" min="30" max="100" value="88" class="vis-range" oninput="Visualizer.updateNestedIf('nilai', this.value)">
              <div class="range-marks"><span>30</span><span>KKM 70</span><span>Grade A &ge; 85</span><span>100</span></div>
            </div>
          </div>

          <div class="sim-flow-col">
            <div class="decision-tree" id="decisionTree">
              <!-- Rendered via JS -->
            </div>
          </div>
        </div>

        <div class="decision-result-card" id="decisionResult">
          <!-- Final status result -->
        </div>
      </div>
    `;

    renderNestedIfTree({
      pelanggaran: false,
      kehadiran: 85,
      nilai: 88
    });
  }

  let nestedIfState = {
    pelanggaran: false,
    kehadiran: 85,
    nilai: 88
  };

  function updateNestedIf(field, value) {
    if (field === "pelanggaran") {
      nestedIfState.pelanggaran = value;
      document.getElementById("btnPelanggaranYa").classList.toggle("active", value === true);
      document.getElementById("btnPelanggaranTidak").classList.toggle("active", value === false);
    } else if (field === "kehadiran") {
      nestedIfState.kehadiran = parseInt(value, 10);
      document.getElementById("valKehadiran").textContent = value + "%";
    } else if (field === "nilai") {
      nestedIfState.nilai = parseInt(value, 10);
      document.getElementById("valNilai").textContent = value;
    }

    renderNestedIfTree(nestedIfState);
  }

  function renderNestedIfTree(state) {
    const tree = document.getElementById("decisionTree");
    const resBox = document.getElementById("decisionResult");
    if (!tree || !resBox) return;

    let step1Active = true;
    let step1Pass = !state.pelanggaran;

    let step2Active = step1Pass;
    let step2Pass = step2Active && (state.kehadiran >= 75);

    let step3Active = step2Pass;
    let finalGrade = "";
    let finalMsg = "";
    let isSuccess = false;

    if (state.pelanggaran) {
      finalGrade = "TIDAK LULUS";
      finalMsg = "Terkena sanksi: Siswa memiliki catatan pelanggaran tata tertib sekolah.";
      isSuccess = false;
    } else if (state.kehadiran < 75) {
      finalGrade = "TIDAK LULUS";
      finalMsg = `Presensi hanya ${state.kehadiran}%. Syarat minimal ujian adalah 75%.`;
      isSuccess = false;
    } else {
      if (state.nilai >= 85) {
        finalGrade = "LULUS (PREDIKAT A)";
        finalMsg = `Selamat! Nilai ${state.nilai} melampaui standar keunggulan (>= 85).`;
        isSuccess = true;
      } else if (state.nilai >= 70) {
        finalGrade = "LULUS (PREDIKAT B)";
        finalMsg = `Baik! Nilai ${state.nilai} memenuhi KKM standar (>= 70).`;
        isSuccess = true;
      } else {
        finalGrade = "REMEDIAL";
        finalMsg = `Nilai ${state.nilai} di bawah KKM 70. Siswa harus mengikuti ujian perbaikan.`;
        isSuccess = false;
      }
    }

    tree.innerHTML = `
      <div class="tree-node ${step1Active ? (step1Pass ? 'pass' : 'fail') : 'disabled'}">
        <div class="node-badge">Tingkat 1 (Luar)</div>
        <div class="node-title">if status_pelanggaran == False:</div>
        <div class="node-desc">${step1Pass ? "✓ Tidak ada pelanggaran &rarr; Masuk ke blok indentasi dalam" : "✕ Ada pelanggaran (True)! Alur berhenti di blok else luar."}</div>
      </div>

      <div class="tree-line ${step1Pass ? 'active' : ''}"></div>

      <div class="tree-node ${step2Active ? (step2Pass ? 'pass' : 'fail') : 'disabled'}">
        <div class="node-badge">Tingkat 2 (Nested Indentasi 4 Spasi)</div>
        <div class="node-title">if kehadiran >= 75:</div>
        <div class="node-desc">${step2Active ? (step2Pass ? `✓ Kehadiran ${state.kehadiran}% &ge; 75% &rarr; Lolos ke evaluasi nilai` : `✕ Kehadiran ${state.kehadiran}% < 75%! Berhenti di else kehadiran.`) : 'Menunggu syarat tingkat 1 terpenuhi...'}</div>
      </div>

      <div class="tree-line ${step2Pass ? 'active' : ''}"></div>

      <div class="tree-node ${step3Active ? 'pass' : 'disabled'}">
        <div class="node-badge">Tingkat 3 (Nested Indentasi 8 Spasi)</div>
        <div class="node-title">if nilai >= 85: ... elif nilai >= 70: ... else:</div>
        <div class="node-desc">${step3Active ? `Nilai: ${state.nilai} &rarr; Mengambil cabang predikat: <strong>${finalGrade}</strong>` : 'Menunggu syarat tingkat 2 terpenuhi...'}</div>
      </div>
    `;

    resBox.className = "decision-result-card " + (isSuccess ? "success" : (finalGrade === "REMEDIAL" ? "warning" : "danger"));
    resBox.innerHTML = `
      <div class="res-status-icon">${isSuccess ? '🏆' : (finalGrade === 'REMEDIAL' ? '📝' : '⚠️')}</div>
      <div class="res-content">
        <div class="res-heading">Hasil Evaluasi: <span class="highlight-status">${finalGrade}</span></div>
        <div class="res-text">${finalMsg}</div>
      </div>
    `;
  }


  /**
   * 3. Step-by-Step Nested Loop & Matriks 2D Visualizer di Python
   */
  function initNestedLoopVisualizer(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    renderNestedLoop(container);
  }

  function renderNestedLoop(container) {
    container.innerHTML = `
      <div class="visualizer-panel">
        <div class="vis-header">
          <div class="vis-title">
            <span class="badge-tag">Animasi Traversal Matriks</span>
            <h4>Tabel Perkalian 1-3 x 1-5 (Nested Loop)</h4>
          </div>
          <div class="vis-stats">
            <span class="stat-pill">Outer Loop: <strong id="valLoopI">i = 0</strong> (Baris)</span>
            <span class="stat-pill">Inner Loop: <strong id="valLoopJ">j = 0</strong> (Kolom)</span>
            <span class="stat-pill">Sel Aktif: <strong id="valLoopCell">matriks[0][0] = 1</strong></span>
          </div>
        </div>

        <div class="matrix-vis-container">
          <div class="matrix-grid-table" id="matrixGridTable">
            <div class="grid-col-headers" style="grid-template-columns: 80px repeat(${matrix2DData[0].length}, 1fr);">
              <div class="header-blank"></div>
              ${matrix2DData[0].map((_, cIdx) => `
                <div class="header-col ${loopState.col === cIdx ? 'col-highlight' : ''}">Kolom [${cIdx}]</div>
              `).join("")}
            </div>

            ${matrix2DData.map((rowArr, rIdx) => `
              <div class="grid-row-wrap ${loopState.row === rIdx ? 'row-highlight' : ''}">
                <div class="header-row">Baris [${rIdx}]</div>
                <div class="grid-cells" style="grid-template-columns: repeat(${rowArr.length}, 1fr);">
                  ${rowArr.map((cellVal, cIdx) => {
                    const isCurrent = (rIdx === loopState.row && cIdx === loopState.col);
                    const isVisited = (rIdx < loopState.row) || (rIdx === loopState.row && cIdx < loopState.col);
                    return `
                      <div class="matrix-cell ${isCurrent ? 'current-active' : (isVisited ? 'cell-visited' : '')}" 
                           id="cell-${rIdx}-${cIdx}" 
                           data-row="${rIdx}" data-col="${cIdx}">
                        <span class="cell-coords">[${rIdx}][${cIdx}]</span>
                        <span class="cell-number">${cellVal}</span>
                        ${isCurrent ? '<div class="active-badge-indicator">&larr; [i,j]</div>' : ''}
                      </div>
                    `;
                  }).join("")}
                </div>
              </div>
            `).join("")}
          </div>

          <div class="matrix-step-log">
            <div class="log-title">📋 Penjelasan Langkah Eksekusi Python:</div>
            <div class="log-text" id="loopStepExplanation">
              Klik <strong>"Langkah Berikutnya"</strong> atau <strong>"Mulai Otomatis"</strong> untuk mengamati jalannya inner loop <code>for j in range(len(matriks[i]))</code> di dalam outer loop <code>for i in range(len(matriks))</code>.
            </div>
            <div class="progress-bar-wrap">
              <div class="progress-bar-fill" id="loopProgressFill" style="width: 11%;"></div>
            </div>
          </div>
        </div>

        <div class="vis-controls">
          <div class="control-row">
            <button class="btn btn-primary" id="btnNextStep" onclick="Visualizer.stepForwardLoop()">
              <span>⏩ Langkah Berikutnya (Step)</span>
            </button>
            <button class="btn btn-secondary" id="btnAutoPlay" onclick="Visualizer.toggleAutoPlayLoop()">
              <span id="autoPlayText">▶️ Putar Otomatis</span>
            </button>
            <button class="btn btn-outline" onclick="Visualizer.resetLoop()">
              <span>🔄 Reset Posisi (0, 0)</span>
            </button>
          </div>
          <div class="control-row secondary">
            <label style="color: var(--text-muted); font-size: 0.85rem;">Kecepatan Putar:</label>
            <input type="range" min="300" max="1500" step="100" value="700" class="vis-range-small" onchange="Visualizer.setLoopSpeed(this.value)">
          </div>
        </div>
      </div>
    `;
  }

  function stepForwardLoop() {
    let { row, col, totalRows, totalCols } = loopState;

    // Geser ke kolom berikutnya
    col++;
    if (col >= totalCols) {
      col = 0;
      row++;
      if (row >= totalRows) {
        // Penelusuran selesai!
        row = totalRows - 1;
        col = totalCols - 1;
        pauseAutoPlay();
        updateLoopUI("🎉 Seluruh elemen matriks selesai ditelusuri! Outer loop <code>for i</code> telah tuntas berputar.", true);
        return;
      }
    }

    loopState.row = row;
    loopState.col = col;
    updateLoopUI();
  }

  function updateLoopUI(customMsg = null, isFinished = false) {
    const { row, col, totalRows, totalCols } = loopState;
    const val = matrix2DData[row][col];

    const iElem = document.getElementById("valLoopI");
    const jElem = document.getElementById("valLoopJ");
    const cellElem = document.getElementById("valLoopCell");
    const explElem = document.getElementById("loopStepExplanation");
    const progElem = document.getElementById("loopProgressFill");

    if (iElem) iElem.textContent = `i = ${row}`;
    if (jElem) jElem.textContent = `j = ${col}`;
    if (cellElem) cellElem.textContent = `matriks[${row}][${col}] = ${val}`;

    const stepIndex = row * totalCols + col + 1;
    const totalSteps = totalRows * totalCols;
    const percent = Math.round((stepIndex / totalSteps) * 100);
    if (progElem) progElem.style.width = percent + "%";

    if (explElem) {
      if (customMsg) {
        explElem.innerHTML = customMsg;
      } else {
        if (col === 0 && row > 0) {
          explElem.innerHTML = `🔄 <strong>Outer loop berganti baris!</strong> Nilai <code>i</code> naik menjadi <code>${row}</code>, dan inner loop <code>for j</code> mengulang dari <code>0</code>. Mengakses <code>matriks[${row}][${col}] = ${val}</code>.`;
        } else {
          explElem.innerHTML = `➡️ <strong>Inner loop bergeser:</strong> Pada baris <code>i = ${row}</code>, variabel <code>j</code> kini bernilai <code>${col}</code>. Mengakses <code>matriks[${row}][${col}] = ${val}</code>.`;
        }
      }
    }

    // Refresh rendering grid
    renderNestedLoopGridOnly();
  }

  function renderNestedLoopGridOnly() {
    const table = document.getElementById("matrixGridTable");
    if (!table) return;

    const { row, col } = loopState;

    table.innerHTML = `
      <div class="grid-col-headers" style="grid-template-columns: 80px repeat(${matrix2DData[0].length}, 1fr);">
        <div class="header-blank"></div>
        ${matrix2DData[0].map((_, cIdx) => `
          <div class="header-col ${col === cIdx ? 'col-highlight' : ''}">Kolom [${cIdx}]</div>
        `).join("")}
      </div>

      ${matrix2DData.map((rowArr, rIdx) => `
        <div class="grid-row-wrap ${row === rIdx ? 'row-highlight' : ''}">
          <div class="header-row">Baris [${rIdx}]</div>
          <div class="grid-cells" style="grid-template-columns: repeat(${rowArr.length}, 1fr);">
            ${rowArr.map((cellVal, cIdx) => {
              const isCurrent = (rIdx === row && cIdx === col);
              const isVisited = (rIdx < row) || (rIdx === row && cIdx < col);
              return `
                <div class="matrix-cell ${isCurrent ? 'current-active' : (isVisited ? 'cell-visited' : '')}" 
                     id="cell-${rIdx}-${cIdx}" 
                     data-row="${rIdx}" data-col="${cIdx}">
                  <span class="cell-coords">[${rIdx}][${cIdx}]</span>
                  <span class="cell-number">${cellVal}</span>
                  ${isCurrent ? '<div class="active-badge-indicator">&larr; [i,j]</div>' : ''}
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `).join("")}
    `;
  }

  function toggleAutoPlayLoop() {
    if (loopState.isRunning) {
      pauseAutoPlay();
    } else {
      startAutoPlay();
    }
  }

  function startAutoPlay() {
    loopState.isRunning = true;
    const btn = document.getElementById("autoPlayText");
    if (btn) btn.textContent = "⏸️ Jeda (Pause)";

    if (loopState.row >= loopState.totalRows - 1 && loopState.col >= loopState.totalCols - 1) {
      resetLoop();
    }

    loopState.intervalId = setInterval(() => {
      stepForwardLoop();
    }, loopState.speed);
  }

  function pauseAutoPlay() {
    loopState.isRunning = false;
    clearInterval(loopState.intervalId);
    const btn = document.getElementById("autoPlayText");
    if (btn) btn.textContent = "▶️ Putar Otomatis";
  }

  function resetLoop() {
    pauseAutoPlay();
    loopState.row = 0;
    loopState.col = 0;
    updateLoopUI("Posisi dikembalikan ke awal: <code>i = 0, j = 0</code>.");
  }

  function setLoopSpeed(val) {
    loopState.speed = 1800 - parseInt(val, 10);
    if (loopState.isRunning) {
      pauseAutoPlay();
      startAutoPlay();
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  return {
    init1DVisualizer,
    append1D,
    insert01D,
    pop1D,
    pop01D,
    modify1D,
    inspect1DSlot,
    reset1D,

    initNestedIfSimulator,
    updateNestedIf,

    initNestedLoopVisualizer,
    stepForwardLoop,
    toggleAutoPlayLoop,
    resetLoop,
    setLoopSpeed
  };
})();
