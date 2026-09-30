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
            <span class="stat-pill">Panjang Array <code>len(A)</code>: <strong>${list1DData.length}</strong></span>
            <span class="stat-pill">Indeks Pertama: <strong>0</strong></span>
            <span class="stat-pill">Indeks Terakhir: <strong>${list1DData.length > 0 ? list1DData.length - 1 : "-"}</strong></span>
          </div>
        </div>

        <div class="memory-grid-wrapper">
          <div class="memory-boxes" id="mem1DBoxes">
            ${list1DData.map((item, idx) => `
              <div class="mem-slot" data-index="${idx}" onclick="Visualizer.inspect1DSlot(${idx})">
                <div class="slot-idx">Indeks: ${idx}</div>
                <div class="slot-val">${escapeHtml(item)}</div>
                <div class="slot-pointer">A[${idx}]</div>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="vis-controls">
          <div class="control-row">
            <input type="text" id="input1DVal" placeholder="Nilai..." value="50" class="vis-input">
            <button class="btn btn-sm btn-primary" onclick="Visualizer.append1D()">
              <span>+ Tambah di Akhir</span>
            </button>
            <button class="btn btn-sm btn-primary" onclick="Visualizer.insert01D()">
              <span>+ Sisipkan di Awal</span>
            </button>
            <button class="btn btn-sm btn-danger" onclick="Visualizer.pop1D()">
              <span>- Hapus Akhir</span>
            </button>
            <button class="btn btn-sm btn-danger" onclick="Visualizer.pop01D()">
              <span>- Hapus Awal</span>
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
          💡 Klik pada salah satu kotak indeks di atas untuk melihat detail elemen dan posisi indeks dalam array A.
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  function append1D() {
    const valInput = document.getElementById("input1DVal");
    const val = valInput.value.trim() || "50";
    list1DData.push(val);
    render1DArray(document.getElementById("vis1DContainer"));
    highlightSlot(list1DData.length - 1, `Elemen baru ditambahkan di akhir array: <code>A[${list1DData.length - 1}] = "${val}"</code>!`);
  }

  function insert01D() {
    const valInput = document.getElementById("input1DVal");
    const val = valInput.value.trim() || "50";
    list1DData.unshift(val);
    render1DArray(document.getElementById("vis1DContainer"));
    highlightSlot(0, `Elemen baru disisipkan di indeks [0]: <code>A[0] = "${val}"</code>! Semua elemen lama bergeser 1 indeks ke kanan.`);
  }

  function pop1D() {
    if (list1DData.length === 0) return;
    const removed = list1DData.pop();
    render1DArray(document.getElementById("vis1DContainer"));
    set1DFeedback(`Elemen terakhir "${removed}" telah dihapus dari array A!`);
  }

  function pop01D() {
    if (list1DData.length === 0) return;
    const removed = list1DData.shift();
    render1DArray(document.getElementById("vis1DContainer"));
    set1DFeedback(`Elemen pertama "${removed}" di indeks [0] telah dihapus! Seluruh indeks elemen bergeser ke kiri.`);
  }

  function modify1D() {
    const idxInput = document.getElementById("input1DIdx");
    const valInput = document.getElementById("input1DNewVal");
    const idx = parseInt(idxInput.value, 10);
    const val = valInput.value.trim();

    if (isNaN(idx) || idx < 0 || idx >= list1DData.length) {
      set1DFeedback("⚠️ IndexError: Indeks di luar jangkauan array! Indeks yang valid adalah 0 s.d. " + (list1DData.length - 1), true);
      return;
    }

    const old = list1DData[idx];
    list1DData[idx] = val;
    render1DArray(document.getElementById("vis1DContainer"));
    highlightSlot(idx, `Elemen pada indeks ke-${idx} (<code>A[${idx}]</code>) berhasil diubah dari "${old}" menjadi "${val}"!`);
  }

  function inspect1DSlot(idx) {
    highlightSlot(idx, `📍 Anda memilih elemen indeks ke-<code>${idx}</code> (<code>A[${idx}]</code>) yang bernilai: "<strong>${list1DData[idx]}</strong>".`);
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

  /**
   * 4. Simulator Interaktif Sequential Search (Linear Search)
   * Array A = [1, 5, 10, 7, 15], n = 5, target x, posisi = -1
   */
  let searchData = [1, 5, 10, 7, 15];
  let searchState = {
    targetX: 7,
    currentIndex: -1,
    posisi: -1,
    isFinished: false,
    isRunning: false,
    intervalId: null,
    speed: 800,
    containerId: "visSearchingContainer"
  };

  function initSequentialSearchSimulator(containerId) {
    if (containerId) searchState.containerId = containerId;
    pauseAutoSearch();
    searchState.currentIndex = -1;
    searchState.posisi = -1;
    searchState.isFinished = false;
    renderSequentialSearch();
  }

  function renderSequentialSearch() {
    const container = document.getElementById(searchState.containerId);
    if (!container) return;

    const { targetX, currentIndex, posisi, isFinished, isRunning, speed } = searchState;
    const n = searchData.length;

    let statusText = "Siap Mencari";
    if (isFinished) {
      if (posisi !== -1) {
        statusText = "Ketemu (Posisi: " + posisi + ")";
      } else {
        statusText = "Tidak Ketemu";
      }
    } else if (currentIndex >= 0) {
      statusText = "Memeriksa indeks ke-" + currentIndex;
    }

    let explanationHtml = "";
    if (currentIndex === -1) {
      explanationHtml = "Pencarian dimulai dengan inisialisasi <code>posisi = -1</code>. Tekan tombol <strong>'Langkah Berikutnya (Step)'</strong> atau <strong>'Mulai Otomatis'</strong> untuk mulai membandingkan <code>A[i]</code> dengan <code>x = " + targetX + "</code>.";
    } else if (posisi !== -1) {
      explanationHtml = '<span style="color: #10b981; font-weight: bold;">🎉 KETEMU!</span> Pada indeks <code>i = ' + posisi + '</code>, nilai <code>A[' + posisi + '] == ' + targetX + '</code> bernilai <strong>BENAR (True)</strong>. Nilai <code>posisi</code> diubah menjadi <strong>' + posisi + '</strong> dan perulangan dihentikan dengan <code>break</code>.';
    } else if (isFinished && posisi === -1) {
      explanationHtml = '<span style="color: #ef4444; font-weight: bold;">❌ TIDAK KETEMU:</span> Seluruh ' + n + ' elemen dari indeks 0 s.d. ' + (n - 1) + ' telah diperiksa dan tidak ada yang cocok dengan <code>x = ' + targetX + '</code>. Nilai <code>posisi</code> tetap <strong>-1</strong>.';
    } else {
      const curVal = searchData[currentIndex];
      explanationHtml = "Iterasi <code>i = " + currentIndex + "</code>: Memeriksa apakah <code>A[" + currentIndex + "] == " + targetX + "</code> (" + curVal + " == " + targetX + ") &rarr; <span style=" + '"color: #ef4444; font-weight: bold;"' + ">SALAH (False)</span>. Algoritma melanjutkan ke elemen berikutnya.";
    }

    container.innerHTML = `
      <div class="visualizer-panel">
        <div class="vis-header">
          <div class="vis-title">
            <span class="badge-tag">Simulasi Algoritma Pencarian</span>
            <h4>Sequential Search pada Array A = [1, 5, 10, 7, 15]</h4>
          </div>
          <div class="vis-stats">
            <span class="stat-pill">Jumlah Elemen (n): <strong>${n}</strong></span>
            <span class="stat-pill">Nilai Dicari (x): <strong>${targetX}</strong></span>
            <span class="stat-pill">Indeks (i): <strong>${currentIndex >= 0 ? currentIndex : '-'}</strong></span>
            <span class="stat-pill">Posisi: <strong>${posisi}</strong></span>
          </div>
        </div>

        <div class="memory-grid-wrapper">
          <div class="memory-boxes" id="memSearchBoxes">
            ${searchData.map((val, idx) => {
              let slotClass = "mem-slot";
              let badgeHtml = "";
              let statusLabel = "";

              if (posisi === idx) {
                slotClass += " scan-matched";
                badgeHtml = `<div class="search-pointer-badge" style="background: #10b981; color: #fff;">✅ i = ${idx} (Ketemu!)</div>`;
                statusLabel = `<div class="slot-pointer" style="color: #10b981; font-weight: 700;">✓ Cocok (${val} == ${targetX})</div>`;
              } else if (currentIndex === idx) {
                slotClass += " scan-active pulse";
                badgeHtml = `<div class="search-pointer-badge">👇 i = ${idx}</div>`;
                statusLabel = `<div class="slot-pointer" style="color: #f59e0b; font-weight: 700;">? Cek (${val} == ${targetX})</div>`;
              } else if (currentIndex > idx) {
                slotClass += " scan-mismatch";
                statusLabel = `<div class="slot-pointer" style="color: #ef4444;">≠ Tidak cocok</div>`;
              } else {
                statusLabel = `<div class="slot-pointer">Belum diperiksa</div>`;
              }

              return `
                <div class="${slotClass}">
                  ${badgeHtml}
                  <div class="slot-idx">Indeks: ${idx}</div>
                  <div class="slot-val">${val}</div>
                  ${statusLabel}
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <div class="search-step-tracker">
          <div class="search-step-row">
            <span class="search-status-badge ${posisi !== -1 ? 'badge-success' : (isFinished ? 'badge-danger' : 'badge-primary')}">
              ${statusText}
            </span>
            <span style="font-size: 0.95rem;">${explanationHtml}</span>
          </div>
        </div>

        <div class="vis-controls">
          <div class="control-row">
            <label style="font-size: 0.88rem; color: var(--text-muted);">Nilai x yang dicari:</label>
            <input type="number" id="inputSearchX" value="${targetX}" class="vis-input-small" onchange="Visualizer.setSearchTarget(this.value)">
            <button class="btn btn-sm btn-primary" onclick="Visualizer.stepSearch()" ${isFinished ? 'disabled' : ''}>
              <span>⏩ Langkah Berikutnya (Step)</span>
            </button>
            <button class="btn btn-sm btn-secondary" onclick="Visualizer.toggleAutoSearch()">
              <span id="searchAutoText">${isRunning ? '⏸️ Jeda' : '▶️ Cari Otomatis'}</span>
            </button>
            <button class="btn btn-sm btn-outline" onclick="Visualizer.resetSearch()">
              <span>🔄 Reset</span>
            </button>
          </div>

          <div class="control-row secondary">
            <span style="font-size: 0.82rem; color: var(--text-muted);">Uji Cepat Target:</span>
            <button class="btn btn-xs btn-outline" onclick="Visualizer.quickSetTarget(7)">x = 7 (Ada di i=3)</button>
            <button class="btn btn-xs btn-outline" onclick="Visualizer.quickSetTarget(10)">x = 10 (Ada di i=2)</button>
            <button class="btn btn-xs btn-outline" onclick="Visualizer.quickSetTarget(1)">x = 1 (Elemen pertama)</button>
            <button class="btn btn-xs btn-outline" onclick="Visualizer.quickSetTarget(15)">x = 15 (Elemen terakhir)</button>
            <button class="btn btn-xs btn-outline" onclick="Visualizer.quickSetTarget(99)">x = 99 (Tidak ditemukan)</button>
            <span style="margin-left: auto; font-size: 0.82rem; color: var(--text-muted);">Kecepatan:</span>
            <input type="range" min="300" max="1500" step="100" value="${1800 - speed}" class="vis-range-small" onchange="Visualizer.setSearchSpeed(this.value)">
          </div>
        </div>
      </div>
    `;
  }

  function stepSearch() {
    if (searchState.isFinished) return;

    searchState.currentIndex++;

    if (searchState.currentIndex >= searchData.length) {
      searchState.isFinished = true;
      searchState.posisi = -1;
      pauseAutoSearch();
    } else {
      if (searchData[searchState.currentIndex] === searchState.targetX) {
        searchState.posisi = searchState.currentIndex;
        searchState.isFinished = true;
        pauseAutoSearch();
      }
    }

    renderSequentialSearch();
  }

  function toggleAutoSearch() {
    if (searchState.isRunning) {
      pauseAutoSearch();
    } else {
      startAutoSearch();
    }
  }

  function startAutoSearch() {
    if (searchState.isFinished) {
      resetSearch();
    }
    searchState.isRunning = true;
    renderSequentialSearch();
    searchState.intervalId = setInterval(() => {
      stepSearch();
    }, searchState.speed);
  }

  function pauseAutoSearch() {
    searchState.isRunning = false;
    clearInterval(searchState.intervalId);
    searchState.intervalId = null;
    const btn = document.getElementById("searchAutoText");
    if (btn) btn.textContent = "▶️ Cari Otomatis";
  }

  function resetSearch() {
    pauseAutoSearch();
    searchState.currentIndex = -1;
    searchState.posisi = -1;
    searchState.isFinished = false;
    renderSequentialSearch();
  }

  function quickSetTarget(val) {
    pauseAutoSearch();
    searchState.targetX = parseInt(val, 10);
    resetSearch();
  }

  function setSearchTarget(val) {
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      quickSetTarget(num);
    }
  }

  function setSearchSpeed(val) {
    searchState.speed = 1800 - parseInt(val, 10);
    if (searchState.isRunning) {
      pauseAutoSearch();
      startAutoSearch();
    }
  }

  /**
   * 5. Simulator Interaktif Binary Search (Pencarian Biner)
   * Dilengkapi animasi pembagian array (Divide and Conquer),
   * visualisasi 3 pointer (awal, tengah, akhir), eliminasi separuh data,
   * langkah maju/mundur (step-by-step & undo), putar otomatis,
   * perhitungan rumus tengah interaktif, dan tabel penelusuran.
   */
  const bsDatasets = {
    sma: [1, 5, 7, 10, 15],
    wide: [2, 4, 7, 11, 16, 23, 38, 56, 72, 91],
    unsorted: [1, 5, 10, 7, 15]
  };

  let currentBsDatasetKey = "sma";
  let bsData = [...bsDatasets.sma];

  let bsState = {
    targetX: 7,
    awal: 0,
    akhir: 4,
    displayAwal: 0,
    displayAkhir: 4,
    tengah: -1,
    posisi: -1,
    iteration: 0,
    isFinished: false,
    isRunning: false,
    intervalId: null,
    speed: 850,
    history: [],
    containerId: "visBinarySearchContainer",
    currentExplanation: "Pencarian siap dimulai dengan <code>awal = 0</code> dan <code>akhir = 4</code>. Tekan tombol <strong>'⏩ Langkah Berikutnya'</strong> untuk mulai menghitung indeks tengah.",
    statusBadge: "Siap Mencari",
    statusType: "primary",
    lastDecision: null,
    stepLogs: []
  };

  function initBinarySearchSimulator(containerId) {
    if (containerId) bsState.containerId = containerId;
    pauseAutoBinarySearch();
    resetBinarySearch();
  }

  function renderBinarySearch() {
    const container = document.getElementById(bsState.containerId);
    if (!container) return;

    const {
      targetX,
      awal,
      akhir,
      displayAwal,
      displayAkhir,
      tengah,
      posisi,
      iteration,
      isFinished,
      isRunning,
      speed,
      history,
      currentExplanation,
      statusBadge,
      statusType,
      lastDecision,
      stepLogs
    } = bsState;

    const n = bsData.length;

    // Tombol quick target berdasarkan dataset
    let quickTargets = [1, 5, 7, 10, 15, 99];
    if (currentBsDatasetKey === "wide") {
      quickTargets = [2, 7, 23, 38, 72, 91, 99];
    } else if (currentBsDatasetKey === "unsorted") {
      quickTargets = [1, 5, 10, 7, 15, 99];
    }

    container.innerHTML = `
      <div class="visualizer-panel bs-visualizer-panel">
        <!-- Header Info -->
        <div class="vis-header">
          <div class="vis-title">
            <span class="badge-tag" style="background: linear-gradient(135deg, var(--accent-indigo), var(--accent-cyan)); color: #fff;">
              ⚡ Simulasi Interaktif Binary Search
            </span>
            <h4>Pencarian Biner: Divide & Conquer pada Array Terurut</h4>
          </div>
          <div class="vis-stats">
            <span class="stat-pill">Panjang Data <code>n</code>: <strong>${n}</strong></span>
            <span class="stat-pill">Target Dicari <code>x</code>: <strong>${targetX}</strong></span>
            <span class="stat-pill">Batas <code>awal</code>: <strong style="color: #10b981;">${awal <= akhir ? awal : awal + ' (lewat)'}</strong></span>
            <span class="stat-pill">Batas <code>akhir</code>: <strong style="color: #f43f5e;">${akhir >= 0 ? akhir : '-1'}</strong></span>
            <span class="stat-pill">Indeks <code>tengah</code>: <strong style="color: #f59e0b;">${tengah >= 0 ? tengah : '-'}</strong></span>
            <span class="stat-pill">Posisi: <strong>${posisi !== -1 ? posisi : (isFinished ? 'Tidak Ketemu' : '-')}</strong></span>
          </div>
        </div>

        <!-- Pemilih Dataset / Skenario -->
        <div class="bs-dataset-bar">
          <span class="bs-dataset-label">Pilih Contoh Data:</span>
          <button class="btn btn-xs ${currentBsDatasetKey === 'sma' ? 'btn-primary' : 'btn-outline'}" onclick="Visualizer.selectBinaryDataset('sma')">
            📘 Standar Buku SMA: [1, 5, 7, 10, 15]
          </button>
          <button class="btn btn-xs ${currentBsDatasetKey === 'wide' ? 'btn-primary' : 'btn-outline'}" onclick="Visualizer.selectBinaryDataset('wide')">
            🚀 10 Elemen Terurut: [2, 4, 7, 11, 16, 23, 38, 56, 72, 91]
          </button>
          <button class="btn btn-xs ${currentBsDatasetKey === 'unsorted' ? 'btn-danger' : 'btn-outline'}" onclick="Visualizer.selectBinaryDataset('unsorted')" title="Melihat efek kegagalan jika data belum terurut">
            ⚠️ Teks Asli Buku (Belum Terurut): [1, 5, 10, 7, 15]
          </button>
        </div>

        ${currentBsDatasetKey === 'unsorted' ? `
          <div class="alert-box warning" style="margin: 0.75rem 0; padding: 0.75rem 1rem; font-size: 0.85rem;">
            <span class="icon">⚠️</span>
            <div><strong>Uji Eksperimen:</strong> Data ini belum terurut sempurna (angka 10 mendahului 7). Coba cari target <code>x = 7</code> dan amati bagaimana Binary Search terkecoh memotong bagian yang salah sehingga angka 7 dilaporkan <em>'Tidak Ketemu'</em>!</div>
          </div>
        ` : ''}

        <!-- Kotak Memori Array dan Pointer Animasi -->
        <div class="memory-grid-wrapper bs-memory-wrapper">
          <div class="memory-boxes" id="memBinaryBoxes">
            ${bsData.map((val, idx) => {
              // Status slot berdasarkan batas aktif saat langkah dievaluasi
              const isInRange = (idx >= displayAwal && idx <= displayAkhir);
              const isMatch = (posisi === idx);
              const isMid = (tengah === idx);
              const isEliminated = !isInRange;

              let slotClass = "mem-slot bs-slot";
              if (isMatch) {
                slotClass += " bs-slot-match pulse";
              } else if (isMid) {
                slotClass += " bs-slot-mid pulse";
              } else if (isInRange) {
                slotClass += " bs-slot-in-range";
              } else {
                slotClass += " bs-slot-eliminated";
              }

              // Pointers di atas kotak
              const isAwal = (displayAwal === idx && displayAwal <= displayAkhir);
              const isAkhir = (displayAkhir === idx && displayAwal <= displayAkhir);

              let pointerBadge = "";
              if (isAwal && isMid && isAkhir) {
                pointerBadge = `<div class="bs-pointer-badge bs-badge-all">🎯 awal, tengah, akhir = ${idx}</div>`;
              } else if (isAwal && isMid) {
                pointerBadge = `<div class="bs-pointer-badge bs-badge-awal-tengah">🟢🟡 awal & tengah = ${idx}</div>`;
              } else if (isMid && isAkhir) {
                pointerBadge = `<div class="bs-pointer-badge bs-badge-tengah-akhir">🟡🔴 tengah & akhir = ${idx}</div>`;
              } else if (isAwal && isAkhir) {
                pointerBadge = `<div class="bs-pointer-badge bs-badge-awal-akhir">🟢🔴 awal & akhir = ${idx}</div>`;
              } else if (isAwal) {
                pointerBadge = `<div class="bs-pointer-badge bs-badge-awal">🟢 awal = ${idx}</div>`;
              } else if (isMid) {
                pointerBadge = `<div class="bs-pointer-badge bs-badge-tengah">🟡 tengah = ${idx}</div>`;
              } else if (isAkhir) {
                pointerBadge = `<div class="bs-pointer-badge bs-badge-akhir">🔴 akhir = ${idx}</div>`;
              }

              // Label indikator di bawah nilai
              let subLabel = "";
              if (isMatch) {
                subLabel = `<div class="slot-pointer" style="color: #10b981; font-weight: 700;">✓ KETEMU!</div>`;
              } else if (isMid) {
                subLabel = `<div class="slot-pointer" style="color: #f59e0b; font-weight: 700;">A[${idx}] = ${val}</div>`;
              } else if (isEliminated) {
                subLabel = `<div class="slot-pointer" style="color: #64748b;">✕ Tereliminasi</div>`;
              } else {
                subLabel = `<div class="slot-pointer" style="color: var(--accent-cyan);">Rentang Aktif</div>`;
              }

              return `
                <div class="${slotClass}" data-idx="${idx}">
                  ${pointerBadge}
                  <div class="slot-idx">Indeks: ${idx}</div>
                  <div class="slot-val">${val}</div>
                  ${subLabel}
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Status Langkah & Penjelasan Naratif -->
        <div class="search-step-tracker bs-step-tracker">
          <div class="search-step-row">
            <span class="search-status-badge badge-${statusType}">
              ${statusBadge}
            </span>
            <span style="font-size: 0.95rem; line-height: 1.5;">${currentExplanation}</span>
          </div>
        </div>

        <!-- Kartu Formula Kalkulasi & Percabangan If-Else -->
        <div class="bs-math-grid">
          <div class="bs-math-card">
            <div class="bs-math-card-header">
              <span class="icon">📐</span>
              <strong>Perhitungan Titik Tengah</strong>
            </div>
            <div class="bs-math-body">
              <div class="bs-formula-code">
                tengah = Math.floor((awal + akhir) / 2)
              </div>
              <div class="bs-formula-calc">
                ${tengah >= 0 ? `
                  tengah = Math.floor((${displayAwal} + ${displayAkhir}) / 2) &rarr; <strong style="color: #f59e0b; font-size: 1.15rem;">${tengah}</strong>
                  <div style="margin-top: 0.35rem; color: var(--text-muted); font-size: 0.85rem;">
                    Elemen tengah: <code>A[${tengah}] = <strong>${bsData[tengah]}</strong></code>
                  </div>
                ` : `
                  <span class="text-muted">Tekan "Langkah Berikutnya" untuk menghitung indeks tengah iterasi.</span>
                `}
              </div>
            </div>
          </div>

          <div class="bs-math-card">
            <div class="bs-math-card-header">
              <span class="icon">⚖️</span>
              <strong>Evaluasi Logika Kondisi (If - Else)</strong>
            </div>
            <div class="bs-math-body">
              ${lastDecision ? `
                <div class="bs-decision-tag ${lastDecision.type}">
                  ${lastDecision.title}
                </div>
                <div class="bs-decision-desc">
                  ${lastDecision.desc}
                </div>
              ` : `
                <div class="text-muted" style="font-size: 0.88rem; padding: 0.35rem 0;">
                  Membandingkan apakah <code>A[tengah] == x</code>, <code>x &lt; A[tengah]</code> (geser kiri), atau <code>x &gt; A[tengah]</code> (geser kanan).
                </div>
              `}
            </div>
          </div>
        </div>

        <!-- Tabel Riwayat Iterasi (Tracer) -->
        ${stepLogs.length > 0 ? `
          <div class="bs-tracer-wrapper">
            <div class="bs-tracer-title">📋 Tabel Penelusuran Langkah (Trace Table):</div>
            <div class="table-responsive">
              <table class="modern-table bs-tracer-table">
                <thead>
                  <tr>
                    <th>Iterasi</th>
                    <th>awal</th>
                    <th>akhir</th>
                    <th>tengah = (awal + akhir) div 2</th>
                    <th>A[tengah]</th>
                    <th>Target x</th>
                    <th>Aksi & Hasil Percabangan</th>
                  </tr>
                </thead>
                <tbody>
                  ${stepLogs.map(log => `
                    <tr class="${log.isMatch ? 'tr-success' : ''}">
                      <td><strong>#${log.iter}</strong></td>
                      <td><code>${log.awal}</code></td>
                      <td><code>${log.akhir}</code></td>
                      <td><code>${log.tengah}</code></td>
                      <td><strong style="color: #f59e0b;">${log.midVal}</strong></td>
                      <td><strong>${log.target}</strong></td>
                      <td>${log.action}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        ` : ''}

        <!-- Kontrol Interaktif -->
        <div class="vis-controls">
          <div class="control-row">
            <label style="font-size: 0.88rem; color: var(--text-muted);">Nilai x yang dicari:</label>
            <input type="number" id="inputBinaryX" value="${targetX}" class="vis-input-small" onchange="Visualizer.setBinaryTarget(this.value)">

            <button class="btn btn-sm btn-outline" onclick="Visualizer.stepBackBinarySearch()" ${history.length === 0 ? 'disabled' : ''} title="Kembali ke langkah sebelumnya">
              <span>⏪ Mundur (Step Back)</span>
            </button>

            <button class="btn btn-sm btn-primary" onclick="Visualizer.stepBinarySearch()" ${isFinished ? 'disabled' : ''} title="Eksekusi satu iterasi binary search">
              <span>⏩ Langkah Berikutnya (Step)</span>
            </button>

            <button class="btn btn-sm btn-secondary" onclick="Visualizer.toggleAutoBinarySearch()">
              <span id="binaryAutoText">${isRunning ? '⏸️ Jeda (Pause)' : '▶️ Cari Otomatis'}</span>
            </button>

            <button class="btn btn-sm btn-outline" onclick="Visualizer.resetBinarySearch()" title="Kembali ke kondisi awal">
              <span>🔄 Reset</span>
            </button>
          </div>

          <div class="control-row secondary">
            <span style="font-size: 0.82rem; color: var(--text-muted);">Uji Cepat Target:</span>
            ${quickTargets.map(tgt => `
              <button class="btn btn-xs ${targetX === tgt ? 'btn-primary' : 'btn-outline'}" onclick="Visualizer.quickSetBinaryTarget(${tgt})">
                x = ${tgt}
              </button>
            `).join("")}

            <span style="margin-left: auto; font-size: 0.82rem; color: var(--text-muted);">Kecepatan:</span>
            <input type="range" min="300" max="1500" step="100" value="${1800 - speed}" class="vis-range-small" onchange="Visualizer.setBinarySpeed(this.value)">
          </div>
        </div>
      </div>
    `;
  }

  function stepBinarySearch() {
    if (bsState.isFinished) return;

    // Simpan snapshot untuk tombol Step Back (Undo)
    bsState.history.push({
      awal: bsState.awal,
      akhir: bsState.akhir,
      displayAwal: bsState.displayAwal,
      displayAkhir: bsState.displayAkhir,
      tengah: bsState.tengah,
      posisi: bsState.posisi,
      iteration: bsState.iteration,
      isFinished: bsState.isFinished,
      currentExplanation: bsState.currentExplanation,
      statusBadge: bsState.statusBadge,
      statusType: bsState.statusType,
      lastDecision: bsState.lastDecision ? { ...bsState.lastDecision } : null,
      stepLogs: JSON.parse(JSON.stringify(bsState.stepLogs))
    });

    // Cek apakah rentang pencarian sudah habis (awal > akhir)
    if (bsState.awal > bsState.akhir) {
      bsState.isFinished = true;
      bsState.posisi = -1;
      bsState.statusBadge = "Tidak Ketemu (-1)";
      bsState.statusType = "danger";
      bsState.lastDecision = {
        type: "decision-danger",
        title: "❌ Kondisi Berhenti: awal > akhir",
        desc: `Nilai <code>awal (${bsState.awal})</code> telah melewati <code>akhir (${bsState.akhir})</code>. Target <code>x = ${bsState.targetX}</code> tidak ditemukan di dalam array.`
      };
      bsState.currentExplanation = `<span style="color: #ef4444; font-weight: bold;">❌ TIDAK KETEMU:</span> Batas awal (<code>${bsState.awal}</code>) sudah lebih besar dari batas akhir (<code>${bsState.akhir}</code>). Seluruh bagian array telah diperiksa dan tidak ditemukan angka <code>${bsState.targetX}</code>. Posisi akhir: <strong>-1</strong>.`;
      bsState.stepLogs.push({
        iter: bsState.iteration + 1,
        awal: bsState.awal,
        akhir: bsState.akhir,
        tengah: "-",
        midVal: "-",
        target: bsState.targetX,
        action: `<span style="color: #ef4444; font-weight: bold;">awal > akhir &rarr; Selesai: Tidak Ketemu (-1)</span>`,
        isMatch: false
      });
      pauseAutoBinarySearch();
      renderBinarySearch();
      return;
    }

    bsState.iteration++;
    const curAwal = bsState.awal;
    const curAkhir = bsState.akhir;

    bsState.displayAwal = curAwal;
    bsState.displayAkhir = curAkhir;

    // Hitung titik tengah bulat: (awal + akhir) div 2
    const mid = Math.floor((curAwal + curAkhir) / 2);
    bsState.tengah = mid;

    const midVal = bsData[mid];
    const x = bsState.targetX;

    if (midVal === x) {
      // DITEMUKAN!
      bsState.posisi = mid;
      bsState.isFinished = true;
      bsState.statusBadge = `Ketemu pada Indeks ${mid}`;
      bsState.statusType = "success";
      bsState.lastDecision = {
        type: "decision-success",
        title: `🎉 KETEMU: A[${mid}] == ${x}`,
        desc: `Nilai tengah <code>A[${mid}] = ${midVal}</code> <strong>sama persis</strong> dengan target <code>x = ${x}</code>! Simpan <code>posisi = ${mid}</code> dan hentikan perulangan (<code>break</code>).`
      };
      bsState.currentExplanation = `<span style="color: #10b981; font-weight: bold;">🎉 KETEMU!</span> Pada iterasi ke-${bsState.iteration}, <code>A[${mid}] == ${x}</code> bernilai <strong>BENAR (True)</strong>. Nilai yang dicari berada pada <strong>indeks ke-${mid}</strong>.`;
      bsState.stepLogs.push({
        iter: bsState.iteration,
        awal: curAwal,
        akhir: curAkhir,
        tengah: mid,
        midVal: midVal,
        target: x,
        action: `<span style="color: #10b981; font-weight: bold;">🎉 Cocok! (posisi = ${mid}) &rarr; break</span>`,
        isMatch: true
      });
      pauseAutoBinarySearch();
    } else if (x < midVal) {
      // Nilai dicari lebih kecil -> Cari di sebelah KIRI
      const nextAkhir = mid - 1;
      bsState.statusBadge = `Iterasi ${bsState.iteration}: Geser ke KIRI`;
      bsState.statusType = "warning";
      bsState.lastDecision = {
        type: "decision-warning",
        title: `⬅️ x (${x}) < A[${mid}] (${midVal}) &rarr; Cari di KIRI`,
        desc: `Karena array terurut menaik, jika target <code>${x}</code> lebih kecil dari <code>A[${mid}] (${midVal})</code>, target pasti ada di sebelah KIRI. Eliminasi indeks ${mid} s.d. ${curAkhir}. Geser <code>akhir = ${mid} - 1 = ${nextAkhir}</code>.`
      };
      bsState.currentExplanation = `Iterasi ke-${bsState.iteration}: <code>tengah = (${curAwal} + ${curAkhir}) div 2 = ${mid}</code> (Nilai: <code>${midVal}</code>). Karena target <code>x = ${x}</code> <strong>lebih kecil</strong> dari <code>${midVal}</code>, geser batas akhir: <code>akhir = tengah - 1 = ${nextAkhir}</code>.`;
      bsState.stepLogs.push({
        iter: bsState.iteration,
        awal: curAwal,
        akhir: curAkhir,
        tengah: mid,
        midVal: midVal,
        target: x,
        action: `<code>${x} &lt; ${midVal}</code> &rarr; geser <code>akhir = ${nextAkhir}</code>`,
        isMatch: false
      });
      bsState.akhir = nextAkhir;
    } else {
      // Nilai dicari lebih besar -> Cari di sebelah KANAN
      const nextAwal = mid + 1;
      bsState.statusBadge = `Iterasi ${bsState.iteration}: Geser ke KANAN`;
      bsState.statusType = "warning";
      bsState.lastDecision = {
        type: "decision-warning",
        title: `➡️ x (${x}) > A[${mid}] (${midVal}) &rarr; Cari di KANAN`,
        desc: `Karena array terurut menaik, jika target <code>${x}</code> lebih besar dari <code>A[${mid}] (${midVal})</code>, target pasti ada di sebelah KANAN. Eliminasi indeks ${curAwal} s.d. ${mid}. Geser <code>awal = ${mid} + 1 = ${nextAwal}</code>.`
      };
      bsState.currentExplanation = `Iterasi ke-${bsState.iteration}: <code>tengah = (${curAwal} + ${curAkhir}) div 2 = ${mid}</code> (Nilai: <code>${midVal}</code>). Karena target <code>x = ${x}</code> <strong>lebih besar</strong> dari <code>${midVal}</code>, geser batas awal: <code>awal = tengah + 1 = ${nextAwal}</code>.`;
      bsState.stepLogs.push({
        iter: bsState.iteration,
        awal: curAwal,
        akhir: curAkhir,
        tengah: mid,
        midVal: midVal,
        target: x,
        action: `<code>${x} &gt; ${midVal}</code> &rarr; geser <code>awal = ${nextAwal}</code>`,
        isMatch: false
      });
      bsState.awal = nextAwal;
    }

    renderBinarySearch();
  }

  function stepBackBinarySearch() {
    if (bsState.history.length === 0) return;
    pauseAutoBinarySearch();
    const prev = bsState.history.pop();
    bsState.awal = prev.awal;
    bsState.akhir = prev.akhir;
    bsState.displayAwal = prev.displayAwal;
    bsState.displayAkhir = prev.displayAkhir;
    bsState.tengah = prev.tengah;
    bsState.posisi = prev.posisi;
    bsState.iteration = prev.iteration;
    bsState.isFinished = prev.isFinished;
    bsState.currentExplanation = prev.currentExplanation;
    bsState.statusBadge = prev.statusBadge;
    bsState.statusType = prev.statusType;
    bsState.lastDecision = prev.lastDecision;
    bsState.stepLogs = prev.stepLogs;
    renderBinarySearch();
  }

  function toggleAutoBinarySearch() {
    if (bsState.isRunning) {
      pauseAutoBinarySearch();
    } else {
      startAutoBinarySearch();
    }
  }

  function startAutoBinarySearch() {
    if (bsState.isFinished) {
      resetBinarySearch();
    }
    bsState.isRunning = true;
    renderBinarySearch();
    bsState.intervalId = setInterval(() => {
      if (bsState.isFinished) {
        pauseAutoBinarySearch();
      } else {
        stepBinarySearch();
      }
    }, bsState.speed);
  }

  function pauseAutoBinarySearch() {
    bsState.isRunning = false;
    if (bsState.intervalId) {
      clearInterval(bsState.intervalId);
      bsState.intervalId = null;
    }
    const btn = document.getElementById("binaryAutoText");
    if (btn) btn.textContent = "▶️ Cari Otomatis";
  }

  function resetBinarySearch() {
    pauseAutoBinarySearch();
    bsState.awal = 0;
    bsState.akhir = bsData.length - 1;
    bsState.displayAwal = 0;
    bsState.displayAkhir = bsData.length - 1;
    bsState.tengah = -1;
    bsState.posisi = -1;
    bsState.iteration = 0;
    bsState.isFinished = false;
    bsState.history = [];
    bsState.stepLogs = [];
    bsState.statusBadge = "Siap Mencari";
    bsState.statusType = "primary";
    bsState.lastDecision = null;
    bsState.currentExplanation = `Pencarian siap dimulai dengan <code>awal = 0</code> dan <code>akhir = ${bsData.length - 1}</code>. Tekan tombol <strong>'⏩ Langkah Berikutnya (Step)'</strong> atau <strong>'▶️ Cari Otomatis'</strong> untuk mulai menghitung indeks tengah.`;
    renderBinarySearch();
  }

  function quickSetBinaryTarget(val) {
    pauseAutoBinarySearch();
    bsState.targetX = parseInt(val, 10);
    resetBinarySearch();
  }

  function setBinaryTarget(val) {
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      quickSetBinaryTarget(num);
    }
  }

  function setBinarySpeed(val) {
    bsState.speed = 1800 - parseInt(val, 10);
    if (bsState.isRunning) {
      pauseAutoBinarySearch();
      startAutoBinarySearch();
    }
  }

  function selectBinaryDataset(key) {
    if (!bsDatasets[key]) return;
    pauseAutoBinarySearch();
    currentBsDatasetKey = key;
    bsData = [...bsDatasets[key]];

    if (key === "wide") {
      bsState.targetX = 38;
    } else {
      bsState.targetX = 7;
    }

    resetBinarySearch();
  }

  /**
   * 6. Simulator Interaktif Selection Sort (Pengurutan Pilihan)
   * Menampilkan pembagian array: bagian terurut (kiri) vs belum terurut (kanan),
   * visualisasi pencarian nilai terkecil (min_idx) dan penukaran (swap),
   * bar ketinggian visual proporsional, step-by-step & undo, putar otomatis,
   * narasi langkah a-d sesuai buku teks SMA Hal. 54, dan trace table lengkap.
   */
  const ssDatasets = {
    sma: [6, 3, 8, 5, 2],
    reversed: [9, 7, 5, 3, 1],
    random: [14, 5, 28, 9, 3, 17]
  };

  let currentSsDatasetKey = "sma";
  let ssData = [...ssDatasets.sma];

  let ssState = {
    i: 0,
    currentArray: [...ssDatasets.sma],
    stepNumber: 0,
    isFinished: false,
    isRunning: false,
    intervalId: null,
    speed: 900,
    history: [],
    containerId: "visSelectionSortContainer",
    currentExplanation: "Inisialisasi Selection Sort pada array <code>[6, 3, 8, 5, 2]</code>. Tekan tombol <strong>'⏩ Langkah Berikutnya (Step)'</strong> atau <strong>'▶️ Urutkan Otomatis'</strong> untuk mulai mengurutkan data.",
    statusBadge: "Siap Mengurutkan",
    statusType: "primary",
    lastStepDetail: null,
    stepLogs: []
  };

  function initSelectionSortSimulator(containerId) {
    if (containerId) ssState.containerId = containerId;
    pauseAutoSelectionSort();
    resetSelectionSort();
  }

  function renderSelectionSort() {
    const container = document.getElementById(ssState.containerId);
    if (!container) return;

    const {
      i,
      currentArray,
      stepNumber,
      isFinished,
      isRunning,
      speed,
      history,
      currentExplanation,
      statusBadge,
      statusType,
      lastStepDetail,
      stepLogs
    } = ssState;

    const n = currentArray.length;
    const maxVal = Math.max(...currentArray, 1);

    container.innerHTML = `
      <div class="visualizer-panel ss-visualizer-panel">
        <!-- Header Info -->
        <div class="vis-header">
          <div class="vis-title">
            <span class="badge-tag" style="background: linear-gradient(135deg, var(--accent-purple), var(--accent-indigo)); color: #fff;">
              📶 Simulasi Animasi Selection Sort
            </span>
            <h4>Pengurutan Pilihan: Memilih Nilai Terkecil & Menukar ke Posisi Awal</h4>
          </div>
          <div class="vis-stats">
            <span class="stat-pill">Jumlah Data <code>n</code>: <strong>${n}</strong></span>
            <span class="stat-pill">Putaran Berjalan (<code>i</code>): <strong style="color: var(--accent-cyan);">${isFinished ? 'Selesai' : i}</strong></span>
            <span class="stat-pill">Elemen Terurut: <strong style="color: #10b981;">${isFinished ? n : i} / ${n}</strong></span>
            <span class="stat-pill">Status: <strong>${statusBadge}</strong></span>
          </div>
        </div>

        <!-- Pilihan Dataset / Preset -->
        <div class="bs-dataset-bar">
          <span class="bs-dataset-label">Pilih Data Contoh:</span>
          <button class="btn btn-xs ${currentSsDatasetKey === 'sma' ? 'btn-primary' : 'btn-outline'}" onclick="Visualizer.selectSelectionDataset('sma')">
            📘 Contoh Buku SMA: [6, 3, 8, 5, 2]
          </button>
          <button class="btn btn-xs ${currentSsDatasetKey === 'reversed' ? 'btn-primary' : 'btn-outline'}" onclick="Visualizer.selectSelectionDataset('reversed')">
            🔄 Terbalik: [9, 7, 5, 3, 1]
          </button>
          <button class="btn btn-xs ${currentSsDatasetKey === 'random' ? 'btn-primary' : 'btn-outline'}" onclick="Visualizer.selectSelectionDataset('random')">
            🎲 Acak: [14, 5, 28, 9, 3, 17]
          </button>

          <div style="margin-left: auto; display: flex; gap: 0.4rem; align-items: center;">
            <input type="text" id="inputCustomSs" placeholder="Contoh: 12, 4, 8, 1, 9" class="vis-input-small" style="width: 140px; font-size: 0.8rem;" title="Ketik angka dipisah koma">
            <button class="btn btn-xs btn-outline" onclick="Visualizer.setCustomSelectionData()">Terapkan Data</button>
          </div>
        </div>

        <!-- Box Visualisasi Array dengan Bar Tinggi -->
        <div class="memory-grid-wrapper ss-memory-wrapper">
          <div class="memory-boxes" id="memSelectionBoxes">
            ${currentArray.map((val, idx) => {
              const isSorted = isFinished ? true : (idx < i);
              const isTargetI = (!isFinished && idx === i);
              const isMinFound = (!isFinished && lastStepDetail && lastStepDetail.minIdx === idx);
              const isSwapped = (lastStepDetail && lastStepDetail.swapped && (lastStepDetail.i === idx || lastStepDetail.minIdx === idx));

              let slotClass = "mem-slot ss-slot";
              if (isSwapped) {
                slotClass += " ss-slot-swapped pulse";
              } else if (isSorted) {
                slotClass += " ss-slot-sorted";
              } else if (isMinFound) {
                slotClass += " ss-slot-min pulse";
              } else if (isTargetI) {
                slotClass += " ss-slot-target";
              }

              // Pointer badges di atas kotak
              let badgeHtml = "";
              if (isFinished) {
                badgeHtml = `<div class="bs-pointer-badge bs-badge-awal" style="background:#10b981;">✓ Terurut</div>`;
              } else if (isSwapped) {
                badgeHtml = `<div class="bs-pointer-badge bs-badge-all" style="background: linear-gradient(135deg, #a855f7, #38bdf8);">🔄 Tukar!</div>`;
              } else if (isTargetI && isMinFound) {
                badgeHtml = `<div class="bs-pointer-badge bs-badge-awal-tengah">🎯⭐ i & min = ${idx}</div>`;
              } else if (isMinFound) {
                badgeHtml = `<div class="bs-pointer-badge bs-badge-tengah">⭐ Min = ${val}</div>`;
              } else if (isTargetI) {
                badgeHtml = `<div class="bs-pointer-badge bs-badge-awal">👇 Posisi i = ${idx}</div>`;
              } else if (isSorted) {
                badgeHtml = `<div class="bs-pointer-badge bs-badge-awal" style="background:#10b981; font-size:0.65rem;">✓ Terurut</div>`;
              }

              // Bar tinggi proporsional
              const heightPercent = Math.max(15, Math.round((val / maxVal) * 100));

              // Label bawah
              let subLabel = "";
              if (isSorted) {
                subLabel = `<div class="slot-pointer" style="color:#10b981; font-weight:700;">✓ Selesai</div>`;
              } else if (isMinFound) {
                subLabel = `<div class="slot-pointer" style="color:#f59e0b; font-weight:700;">Nilai Terkecil</div>`;
              } else if (isTargetI) {
                subLabel = `<div class="slot-pointer" style="color:var(--accent-cyan);">Target Posisi</div>`;
              } else {
                subLabel = `<div class="slot-pointer">Belum terurut</div>`;
              }

              return `
                <div class="${slotClass}" data-idx="${idx}">
                  ${badgeHtml}
                  <!-- Mini Bar Tinggi -->
                  <div class="ss-bar-track">
                    <div class="ss-bar-fill" style="height: ${heightPercent}%;"></div>
                  </div>
                  <div class="slot-idx">Indeks: ${idx}</div>
                  <div class="slot-val">${val}</div>
                  ${subLabel}
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Narasi Langkah Berjalan -->
        <div class="search-step-tracker ss-step-tracker">
          <div class="search-step-row">
            <span class="search-status-badge badge-${statusType}">
              ${statusBadge}
            </span>
            <span style="font-size: 0.95rem; line-height: 1.5;">${currentExplanation}</span>
          </div>
        </div>

        <!-- Kartu Evaluasi Putaran -->
        <div class="bs-math-grid">
          <div class="bs-math-card">
            <div class="bs-math-card-header">
              <span class="icon">🔍</span>
              <strong>Status Penelusuran Putaran</strong>
            </div>
            <div class="bs-math-body">
              ${lastStepDetail ? `
                <div style="font-size: 0.9rem; margin-bottom: 0.35rem;">
                  Langkah Buku: <strong>${lastStepDetail.label}</strong> (Putaran <code>i = ${lastStepDetail.i}</code>)
                </div>
                <div style="font-size: 0.85rem; color: var(--text-muted);">
                  Rentang Pencarian: Indeks <code>${lastStepDetail.i}</code> s.d. <code>${n - 1}</code>
                </div>
                <div style="font-size: 0.88rem; margin-top: 0.35rem;">
                  Nilai minimum ditemukan: <strong style="color: #f59e0b;">${lastStepDetail.minVal}</strong> (pada indeks <code>${lastStepDetail.minIdx}</code>)
                </div>
              ` : `
                <div class="text-muted" style="font-size: 0.88rem; padding: 0.35rem 0;">
                  Array saat ini: <code>[${currentArray.join(", ")}]</code>.<br>
                  Tekan <strong>"Langkah Berikutnya"</strong> untuk memulai putaran pertama ($i=0$).
                </div>
              `}
            </div>
          </div>

          <div class="bs-math-card">
            <div class="bs-math-card-header">
              <span class="icon">🔄</span>
              <strong>Aksi Pertukaran (Swap)</strong>
            </div>
            <div class="bs-math-body">
              ${lastStepDetail ? `
                <div class="bs-decision-tag ${lastStepDetail.swapped ? 'decision-success' : 'decision-warning'}">
                  ${lastStepDetail.swapped ? `Tukar A[${lastStepDetail.i}] (${lastStepDetail.oldValI}) &harr; A[${lastStepDetail.minIdx}] (${lastStepDetail.minVal})` : `Tidak Perlu Ditukar (min_idx == i)`}
                </div>
                <div class="bs-decision-desc">
                  ${lastStepDetail.swapDesc}
                </div>
              ` : `
                <div class="text-muted" style="font-size: 0.88rem; padding: 0.35rem 0;">
                  Jika nilai terkecil berada di luar indeks <code>i</code> (<code>min_idx !== i</code>), algoritma akan menukar nilainya dengan elemen posisi awal <code>A[i]</code>.
                </div>
              `}
            </div>
          </div>
        </div>

        <!-- Tabel Penelusuran Langkah (Trace Table) -->
        ${stepLogs.length > 0 ? `
          <div class="bs-tracer-wrapper">
            <div class="bs-tracer-title">📋 Tabel Penelusuran Langkah (Trace Table Sesuai Buku Hal. 54):</div>
            <div class="table-responsive">
              <table class="modern-table bs-tracer-table">
                <thead>
                  <tr>
                    <th>Langkah</th>
                    <th>Indeks i</th>
                    <th>Bagian Belum Terurut</th>
                    <th>Nilai Terkecil</th>
                    <th>Status Pertukaran</th>
                    <th>Hasil Array Setelah Putaran</th>
                  </tr>
                </thead>
                <tbody>
                  ${stepLogs.map(log => `
                    <tr class="${log.isComplete ? 'tr-success' : ''}">
                      <td><strong>${log.label}</strong></td>
                      <td><code>i = ${log.i}</code></td>
                      <td><code>${log.unsortedSlice}</code></td>
                      <td><strong style="color: #f59e0b;">${log.minVal}</strong> (indeks ${log.minIdx})</td>
                      <td>${log.swapText}</td>
                      <td><code style="color: #38bdf8; font-weight: 700;">[${log.arrayResult.join(", ")}]</code></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        ` : ''}

        <!-- Kontrol Interaktif -->
        <div class="vis-controls">
          <div class="control-row">
            <button class="btn btn-sm btn-outline" onclick="Visualizer.stepBackSelectionSort()" ${history.length === 0 ? 'disabled' : ''} title="Mundur ke langkah sebelumnya">
              <span>⏪ Mundur (Step Back)</span>
            </button>

            <button class="btn btn-sm btn-primary" onclick="Visualizer.stepSelectionSort()" ${isFinished ? 'disabled' : ''} title="Jalankan satu putaran selection sort">
              <span>⏩ Langkah Berikutnya (Step)</span>
            </button>

            <button class="btn btn-sm btn-secondary" onclick="Visualizer.toggleAutoSelectionSort()">
              <span id="selectionAutoText">${isRunning ? '⏸️ Jeda (Pause)' : '▶️ Urutkan Otomatis'}</span>
            </button>

            <button class="btn btn-sm btn-outline" onclick="Visualizer.resetSelectionSort()" title="Reset array ke kondisi awal">
              <span>🔄 Reset</span>
            </button>
          </div>

          <div class="control-row secondary">
            <span style="font-size: 0.82rem; color: var(--text-muted);">Kecepatan Animasi:</span>
            <input type="range" min="300" max="1500" step="100" value="${1800 - speed}" class="vis-range-small" onchange="Visualizer.setSelectionSpeed(this.value)">
            <span style="margin-left: auto; font-size: 0.82rem; color: var(--text-muted);">
              ${isFinished ? '🎉 Selesai Terurut!' : `Langkah ${stepNumber} dari ${Math.max(1, n - 1)}`}
            </span>
          </div>
        </div>
      </div>
    `;
  }

  function stepSelectionSort() {
    if (ssState.isFinished) return;

    const n = ssState.currentArray.length;

    // Simpan snapshot untuk tombol undo
    ssState.history.push({
      i: ssState.i,
      currentArray: [...ssState.currentArray],
      stepNumber: ssState.stepNumber,
      isFinished: ssState.isFinished,
      currentExplanation: ssState.currentExplanation,
      statusBadge: ssState.statusBadge,
      statusType: ssState.statusType,
      lastStepDetail: ssState.lastStepDetail ? { ...ssState.lastStepDetail } : null,
      stepLogs: JSON.parse(JSON.stringify(ssState.stepLogs))
    });

    if (ssState.i >= n - 1) {
      ssState.isFinished = true;
      ssState.statusBadge = "Selesai Terurut!";
      ssState.statusType = "success";
      ssState.currentExplanation = `<span style="color: #10b981; font-weight: bold;">🎉 SELESAI TERURUT!</span> Seluruh elemen kini telah berada pada posisi yang tepat: <code>[${ssState.currentArray.join(", ")}]</code>.`;
      pauseAutoSelectionSort();
      renderSelectionSort();
      return;
    }

    const curI = ssState.i;
    const labels = ["Langkah a", "Langkah b", "Langkah c", "Langkah d", "Langkah e", "Langkah f", "Langkah g"];
    const stepLabel = labels[curI] || `Putaran ${curI + 1}`;

    // Cari elemen terkecil dari indeks curI sampai n - 1
    let minIdx = curI;
    const unsortedSlice = "[" + ssState.currentArray.slice(curI).join(", ") + "]";

    for (let j = curI + 1; j < n; j++) {
      if (ssState.currentArray[j] < ssState.currentArray[minIdx]) {
        minIdx = j;
      }
    }

    const minVal = ssState.currentArray[minIdx];
    const oldValI = ssState.currentArray[curI];
    const didSwap = (minIdx !== curI);

    let swapDesc = "";
    let swapText = "";

    if (didSwap) {
      // Tukar A[curI] dengan A[minIdx]
      ssState.currentArray[curI] = minVal;
      ssState.currentArray[minIdx] = oldValI;
      swapDesc = `Nilai terkecil <strong>${minVal}</strong> (di indeks ${minIdx}) ditukar dengan nilai awal <strong>${oldValI}</strong> (di indeks ${curI}).`;
      swapText = `<span style="color: #38bdf8; font-weight: 700;">Tukar (${oldValI} &harr; ${minVal})</span>`;
    } else {
      swapDesc = `Nilai terkecil <strong>${minVal}</strong> sudah berada di indeks ${curI}, sehingga tidak perlu ditukar.`;
      swapText = `<span style="color: var(--text-muted);">Tidak perlu tukar</span>`;
    }

    ssState.stepNumber++;
    ssState.lastStepDetail = {
      i: curI,
      minIdx: minIdx,
      minVal: minVal,
      oldValI: oldValI,
      swapped: didSwap,
      label: stepLabel,
      swapDesc: swapDesc
    };

    ssState.currentExplanation = `<strong>${stepLabel}:</strong> Cari nilai terkecil dari indeks <code>${curI}</code> hingga akhir. Didapat hasil angka <strong>${minVal}</strong> yang paling kecil (indeks ${minIdx}), ${didSwap ? `maka tukar dengan indeks ke-${curI} (angka ${oldValI})` : `sudah di posisi ${curI} sehingga tidak perlu ditukar`}. Hasil: <code>[${ssState.currentArray.join(", ")}]</code>.`;
    ssState.statusBadge = `${stepLabel} (${curI + 1}/${n - 1})`;
    ssState.statusType = "warning";

    // Rekam ke stepLogs
    ssState.stepLogs.push({
      label: stepLabel,
      i: curI,
      unsortedSlice: unsortedSlice,
      minVal: minVal,
      minIdx: minIdx,
      swapText: swapText,
      arrayResult: [...ssState.currentArray],
      isComplete: false
    });

    // Pindah ke putaran i berikutnya
    ssState.i++;

    // Jika sudah mencapai n - 1, berarti sudah selesai
    if (ssState.i >= n - 1) {
      ssState.isFinished = true;
      ssState.statusBadge = "Selesai Terurut!";
      ssState.statusType = "success";
      ssState.currentExplanation += `<br><span style="color: #10b981; font-weight: bold;">🎉 Selesai!</span> Karena ${n - 1} elemen pertama sudah berada pada posisi yang tepat, elemen terakhir secara otomatis sudah benar. Seluruh array kini terurut: <code>[${ssState.currentArray.join(", ")}]</code>.`;
      pauseAutoSelectionSort();
    }

    renderSelectionSort();
  }

  function stepBackSelectionSort() {
    if (ssState.history.length === 0) return;
    pauseAutoSelectionSort();
    const prev = ssState.history.pop();
    ssState.i = prev.i;
    ssState.currentArray = prev.currentArray;
    ssState.stepNumber = prev.stepNumber;
    ssState.isFinished = prev.isFinished;
    ssState.currentExplanation = prev.currentExplanation;
    ssState.statusBadge = prev.statusBadge;
    ssState.statusType = prev.statusType;
    ssState.lastStepDetail = prev.lastStepDetail;
    ssState.stepLogs = prev.stepLogs;
    renderSelectionSort();
  }

  function toggleAutoSelectionSort() {
    if (ssState.isRunning) {
      pauseAutoSelectionSort();
    } else {
      startAutoSelectionSort();
    }
  }

  function startAutoSelectionSort() {
    if (ssState.isFinished) {
      resetSelectionSort();
    }
    ssState.isRunning = true;
    renderSelectionSort();
    ssState.intervalId = setInterval(() => {
      if (ssState.isFinished) {
        pauseAutoSelectionSort();
      } else {
        stepSelectionSort();
      }
    }, ssState.speed);
  }

  function pauseAutoSelectionSort() {
    ssState.isRunning = false;
    if (ssState.intervalId) {
      clearInterval(ssState.intervalId);
      ssState.intervalId = null;
    }
    const btn = document.getElementById("selectionAutoText");
    if (btn) btn.textContent = "▶️ Urutkan Otomatis";
  }

  function resetSelectionSort() {
    pauseAutoSelectionSort();
    ssState.i = 0;
    ssState.currentArray = [...ssData];
    ssState.stepNumber = 0;
    ssState.isFinished = false;
    ssState.history = [];
    ssState.stepLogs = [];
    ssState.lastStepDetail = null;
    ssState.statusBadge = "Siap Mengurutkan";
    ssState.statusType = "primary";
    ssState.currentExplanation = `Inisialisasi Selection Sort pada array <code>[${ssData.join(", ")}]</code>. Tekan tombol <strong>'⏩ Langkah Berikutnya (Step)'</strong> atau <strong>'▶️ Urutkan Otomatis'</strong> untuk mulai mengurutkan data.`;
    renderSelectionSort();
  }

  function selectSelectionDataset(key) {
    if (!ssDatasets[key]) return;
    pauseAutoSelectionSort();
    currentSsDatasetKey = key;
    ssData = [...ssDatasets[key]];
    resetSelectionSort();
  }

  function setCustomSelectionData() {
    const input = document.getElementById("inputCustomSs");
    if (!input || !input.value.trim()) return;

    const parts = input.value.split(",").map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    if (parts.length < 2) {
      alert("Masukkan minimal 2 angka yang dipisahkan dengan tanda koma (misal: 7, 2, 9, 4, 1)");
      return;
    }

    pauseAutoSelectionSort();
    currentSsDatasetKey = "custom";
    ssData = parts.slice(0, 10); // maksimal 10 angka agar muat rapi di layar
    resetSelectionSort();
  }

  function setSelectionSpeed(val) {
    ssState.speed = 1800 - parseInt(val, 10);
    if (ssState.isRunning) {
      pauseAutoSelectionSort();
      startAutoSelectionSort();
    }
  }

  /* ==========================================================================
   * 7. Simulator Interaktif Insertion Sort (Pengurutan Penyisipan)
   * Menggunakan analogi menyusun kartu di tangan saat bermain kartu:
   * Elemen aktif (key) diambil, dibandingkan ke belakang, elemen lebih besar digeser ke kanan,
   * dan key disisipkan pada celah posisi yang tepat.
   * Dilengkapi penelusuran langkah 1-4 sesuai Buku Teks SMA Hal. 55 pada array [5, 2, 4, 6, 1],
   * visual bar ketinggian proporsional, step-by-step & undo, putar otomatis, dan trace table lengkap.
   * ========================================================================== */
  const isDatasets = {
    sma: [5, 2, 4, 6, 1],
    reversed: [8, 7, 6, 5, 4],
    random: [12, 5, 23, 8, 1, 19]
  };

  let currentIsDatasetKey = "sma";
  let isData = [...isDatasets.sma];

  let isState = {
    i: 1,
    currentArray: [...isDatasets.sma],
    stepNumber: 0,
    isFinished: false,
    isRunning: false,
    intervalId: null,
    speed: 900,
    history: [],
    containerId: "visInsertionSortContainer",
    currentExplanation: "Inisialisasi Insertion Sort pada array <code>[5, 2, 4, 6, 1]</code> (Buku Teks SMA Hal. 55). Elemen pertama <code>5</code> diasumsikan sudah terurut di tangan kiri. Tekan <strong>'⏩ Langkah Berikutnya (Step)'</strong> atau <strong>'▶️ Urutkan Otomatis'</strong> untuk mulai menyisipkan elemen ke-2.",
    statusBadge: "Siap Mengurutkan",
    statusType: "primary",
    lastStepDetail: null,
    stepLogs: []
  };

  function initInsertionSortSimulator(containerId) {
    if (containerId) isState.containerId = containerId;
    pauseAutoInsertionSort();
    resetInsertionSort();
  }

  function renderInsertionSort() {
    const container = document.getElementById(isState.containerId);
    if (!container) return;

    const {
      i,
      currentArray,
      stepNumber,
      isFinished,
      isRunning,
      speed,
      history,
      currentExplanation,
      statusBadge,
      statusType,
      lastStepDetail,
      stepLogs
    } = isState;

    const n = currentArray.length;
    const maxVal = Math.max(...currentArray, 1);

    container.innerHTML = `
      <div class="visualizer-panel is-visualizer-panel">
        <!-- Header Info -->
        <div class="vis-header">
          <div class="vis-title">
            <span class="badge-tag" style="background: linear-gradient(135deg, #ec4899, #8b5cf6); color: #fff;">
              🃏 Simulasi Animasi Insertion Sort
            </span>
            <h4>Pengurutan Penyisipan: Menyusun Kartu di Tangan Satu per Satu</h4>
          </div>
          <div class="vis-stats">
            <span class="stat-pill">Jumlah Data <code>n</code>: <strong>${n}</strong></span>
            <span class="stat-pill">Putaran Kartu (<code>i</code>): <strong style="color: var(--accent-cyan);">${isFinished ? 'Selesai' : i}</strong></span>
            <span class="stat-pill">Kartu Aktif (<code>key</code>): <strong style="color: #ec4899;">${lastStepDetail ? lastStepDetail.key : (i < n ? currentArray[i] : '-')}</strong></span>
            <span class="stat-pill">Elemen Terurut: <strong style="color: #10b981;">${isFinished ? n : i} / ${n}</strong></span>
            <span class="stat-pill">Status: <strong>${statusBadge}</strong></span>
          </div>
        </div>

        <!-- Pilihan Dataset / Preset -->
        <div class="bs-dataset-bar">
          <span class="bs-dataset-label">Pilih Data Contoh:</span>
          <button class="btn btn-xs ${currentIsDatasetKey === 'sma' ? 'btn-primary' : 'btn-outline'}" onclick="Visualizer.selectInsertionDataset('sma')">
            📘 Contoh Buku SMA: [5, 2, 4, 6, 1]
          </button>
          <button class="btn btn-xs ${currentIsDatasetKey === 'reversed' ? 'btn-primary' : 'btn-outline'}" onclick="Visualizer.selectInsertionDataset('reversed')">
            🔄 Terbalik: [8, 7, 6, 5, 4]
          </button>
          <button class="btn btn-xs ${currentIsDatasetKey === 'random' ? 'btn-primary' : 'btn-outline'}" onclick="Visualizer.selectInsertionDataset('random')">
            🎲 Acak: [12, 5, 23, 8, 1, 19]
          </button>

          <div style="margin-left: auto; display: flex; gap: 0.4rem; align-items: center;">
            <input type="text" id="inputCustomIs" placeholder="Contoh: 9, 3, 7, 1, 5" class="vis-input-small" style="width: 140px; font-size: 0.8rem;" title="Ketik angka dipisah koma">
            <button class="btn btn-xs btn-outline" onclick="Visualizer.setCustomInsertionData()">Terapkan Data</button>
          </div>
        </div>

        <!-- Box Visualisasi Array dengan Kartu & Bar Tinggi -->
        <div class="memory-grid-wrapper is-memory-wrapper">
          <div class="memory-boxes" id="memInsertionBoxes">
            ${currentArray.map((val, idx) => {
              const isSorted = isFinished ? true : (idx < i);
              const isNewlyInserted = (lastStepDetail && lastStepDetail.insertIdx === idx);
              const isShifted = (lastStepDetail && lastStepDetail.shiftedElements.some(s => s.toIdx === idx));
              const isNextCard = (!isFinished && idx === i);

              let slotClass = "mem-slot is-slot";
              if (isNewlyInserted) {
                slotClass += " is-slot-inserted pulse";
              } else if (isShifted) {
                slotClass += " is-slot-shifted";
              } else if (isSorted) {
                slotClass += " is-slot-sorted";
              } else if (isNextCard) {
                slotClass += " is-slot-next";
              }

              // Pointer badges di atas kartu
              let badgeHtml = "";
              if (isFinished) {
                badgeHtml = `<div class="bs-pointer-badge bs-badge-awal" style="background:#10b981;">✓ Terurut</div>`;
              } else if (isNewlyInserted) {
                badgeHtml = `<div class="bs-pointer-badge bs-badge-all" style="background: linear-gradient(135deg, #ec4899, #a855f7);">📥 Sisip (key=${val})</div>`;
              } else if (isShifted) {
                badgeHtml = `<div class="bs-pointer-badge bs-badge-tengah" style="background: #f59e0b;">&rarr; Digeser</div>`;
              } else if (isNextCard) {
                badgeHtml = `<div class="bs-pointer-badge bs-badge-awal" style="background: var(--accent-cyan); color: #0b0f19;">🃏 Kartu i=${idx}</div>`;
              } else if (isSorted) {
                badgeHtml = `<div class="bs-pointer-badge bs-badge-awal" style="background:#10b981; font-size:0.65rem;">✓ Terurut</div>`;
              }

              // Bar tinggi proporsional
              const heightPercent = Math.max(15, Math.round((val / maxVal) * 100));

              // Label bawah
              let subLabel = "";
              if (isNewlyInserted) {
                subLabel = `<div class="slot-pointer" style="color:#ec4899; font-weight:700;">Disisipkan</div>`;
              } else if (isShifted) {
                subLabel = `<div class="slot-pointer" style="color:#f59e0b; font-weight:700;">Digeser ke Kanan</div>`;
              } else if (isSorted) {
                subLabel = `<div class="slot-pointer" style="color:#10b981; font-weight:700;">✓ Terurut di Tangan</div>`;
              } else if (isNextCard) {
                subLabel = `<div class="slot-pointer" style="color:var(--accent-cyan);">Kartu Berikutnya</div>`;
              } else {
                subLabel = `<div class="slot-pointer">Belum Disisipkan</div>`;
              }

              return `
                <div class="${slotClass}" data-idx="${idx}">
                  ${badgeHtml}
                  <!-- Mini Bar Tinggi -->
                  <div class="is-bar-track">
                    <div class="is-bar-fill" style="height: ${heightPercent}%;"></div>
                  </div>
                  <div class="slot-idx">Indeks: ${idx}</div>
                  <div class="slot-val">${val}</div>
                  ${subLabel}
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Narasi Langkah Berjalan -->
        <div class="search-step-tracker is-step-tracker">
          <div class="search-step-row">
            <span class="search-status-badge badge-${statusType}">
              ${statusBadge}
            </span>
            <span style="font-size: 0.95rem; line-height: 1.5;">${currentExplanation}</span>
          </div>
        </div>

        <!-- Kartu Evaluasi Putaran -->
        <div class="bs-math-grid">
          <div class="bs-math-card">
            <div class="bs-math-card-header">
              <span class="icon">🃏</span>
              <strong>Kartu yang Diambil (<code>key</code>) & Posisi Sisip</strong>
            </div>
            <div class="bs-math-body">
              ${lastStepDetail ? `
                <div style="font-size: 0.9rem; margin-bottom: 0.35rem;">
                  Langkah Buku: <strong>${lastStepDetail.label}</strong> (Putaran <code>i = ${lastStepDetail.i}</code>)
                </div>
                <div style="font-size: 0.88rem; color: var(--text-muted);">
                  Kartu disisipkan: <strong style="color: #ec4899; font-size: 1rem;">${lastStepDetail.key}</strong> (dari indeks <code>${lastStepDetail.i}</code>)
                </div>
                <div style="font-size: 0.88rem; margin-top: 0.35rem;">
                  Posisi penyisipan akhir: Indeks <strong style="color: #10b981;">${lastStepDetail.insertIdx}</strong>
                </div>
              ` : `
                <div class="text-muted" style="font-size: 0.88rem; padding: 0.35rem 0;">
                  Elemen pertama <code>A[0] = ${currentArray[0]}</code> sudah dianggap terurut.<br>
                  Tekan <strong>"Langkah Berikutnya"</strong> untuk mengambil elemen ke-2 (<code>i = 1</code>).
                </div>
              `}
            </div>
          </div>

          <div class="bs-math-card">
            <div class="bs-math-card-header">
              <span class="icon">➡️</span>
              <strong>Aksi Pergeseran Elemen & Perbandingan</strong>
            </div>
            <div class="bs-math-body">
              ${lastStepDetail ? `
                <div class="bs-decision-tag ${lastStepDetail.shiftCount > 0 ? 'decision-warning' : 'decision-success'}">
                  ${lastStepDetail.shiftCount > 0 ? `Geser ${lastStepDetail.shiftCount} Elemen ke Kanan` : `Biarkan (key sudah lebih besar)`}
                </div>
                <div class="bs-decision-desc">
                  ${lastStepDetail.shiftText}<br>
                  <span style="font-size: 0.82rem; color: var(--text-dim);">Evaluasi perbandingan: ${lastStepDetail.comparisons.join(" &bull; ")}</span>
                </div>
              ` : `
                <div class="text-muted" style="font-size: 0.88rem; padding: 0.35rem 0;">
                  Algoritma akan membandingkan <code>key</code> ke elemen-elemen sebelumnya ke arah kiri. Elemen yang lebih besar dari <code>key</code> akan digeser ke kanan.
                </div>
              `}
            </div>
          </div>
        </div>

        <!-- Tabel Penelusuran Langkah (Trace Table) -->
        ${stepLogs.length > 0 ? `
          <div class="bs-tracer-wrapper">
            <div class="bs-tracer-title">📋 Tabel Penelusuran Langkah (Trace Table Sesuai Buku Teks Hal. 55):</div>
            <div class="table-responsive">
              <table class="modern-table bs-tracer-table">
                <thead>
                  <tr>
                    <th>Langkah</th>
                    <th>Indeks i</th>
                    <th>Kartu (key)</th>
                    <th>Perbandingan ke Belakang</th>
                    <th>Elemen yang Digeser</th>
                    <th>Posisi Sisip</th>
                    <th>Hasil Array Setelah Langkah</th>
                  </tr>
                </thead>
                <tbody>
                  ${stepLogs.map(log => `
                    <tr>
                      <td><strong>${log.label}</strong></td>
                      <td><code>i = ${log.i}</code></td>
                      <td><strong style="color: #ec4899;">${log.key}</strong></td>
                      <td style="font-size: 0.82rem;">${log.comparisons}</td>
                      <td><span style="color: #f59e0b; font-weight: 600;">${log.shiftedText}</span></td>
                      <td><code>Indeks ${log.insertIdx}</code></td>
                      <td><code style="color: #38bdf8; font-weight: 700;">[${log.arrayResult.join(", ")}]</code></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        ` : ''}

        <!-- Kontrol Interaktif -->
        <div class="vis-controls">
          <div class="control-row">
            <button class="btn btn-sm btn-outline" onclick="Visualizer.stepBackInsertionSort()" ${history.length === 0 ? 'disabled' : ''} title="Mundur ke langkah sebelumnya">
              <span>⏪ Mundur (Step Back)</span>
            </button>

            <button class="btn btn-sm btn-primary" onclick="Visualizer.stepInsertionSort()" ${isFinished ? 'disabled' : ''} title="Jalankan satu putaran insertion sort">
              <span>⏩ Langkah Berikutnya (Step)</span>
            </button>

            <button class="btn btn-sm btn-secondary" onclick="Visualizer.toggleAutoInsertionSort()">
              <span id="insertionAutoText">${isRunning ? '⏸️ Jeda (Pause)' : '▶️ Urutkan Otomatis'}</span>
            </button>

            <button class="btn btn-sm btn-outline" onclick="Visualizer.resetInsertionSort()" title="Reset array ke kondisi awal">
              <span>🔄 Reset</span>
            </button>
          </div>

          <div class="control-row secondary">
            <span style="font-size: 0.82rem; color: var(--text-muted);">Kecepatan Animasi:</span>
            <input type="range" min="300" max="1500" step="100" value="${1800 - speed}" class="vis-range-small" onchange="Visualizer.setInsertionSpeed(this.value)">
            <span style="margin-left: auto; font-size: 0.82rem; color: var(--text-muted);">
              ${isFinished ? '🎉 Selesai Terurut!' : `Langkah ${stepNumber} dari ${Math.max(1, n - 1)}`}
            </span>
          </div>
        </div>
      </div>
    `;
  }

  function stepInsertionSort() {
    if (isState.isFinished) return;

    const n = isState.currentArray.length;

    // Simpan snapshot untuk tombol undo
    isState.history.push({
      i: isState.i,
      currentArray: [...isState.currentArray],
      stepNumber: isState.stepNumber,
      isFinished: isState.isFinished,
      currentExplanation: isState.currentExplanation,
      statusBadge: isState.statusBadge,
      statusType: isState.statusType,
      lastStepDetail: isState.lastStepDetail ? JSON.parse(JSON.stringify(isState.lastStepDetail)) : null,
      stepLogs: JSON.parse(JSON.stringify(isState.stepLogs))
    });

    if (isState.i >= n) {
      isState.isFinished = true;
      isState.statusBadge = "Selesai Terurut!";
      isState.statusType = "success";
      isState.currentExplanation = `<span style="color: #10b981; font-weight: bold;">🎉 SELESAI TERURUT!</span> Seluruh elemen kini telah berada pada posisi yang tepat: <code>[${isState.currentArray.join(", ")}]</code>.`;
      pauseAutoInsertionSort();
      renderInsertionSort();
      return;
    }

    const curI = isState.i;
    const key = isState.currentArray[curI];
    const prevArray = [...isState.currentArray];

    let j = curI - 1;
    const shiftedElements = [];
    const comparisons = [];

    while (j >= 0 && isState.currentArray[j] > key) {
      shiftedElements.push({
        val: isState.currentArray[j],
        fromIdx: j,
        toIdx: j + 1
      });
      comparisons.push(`${isState.currentArray[j]} > ${key} (geser ${isState.currentArray[j]})`);
      isState.currentArray[j + 1] = isState.currentArray[j];
      j--;
    }

    if (j >= 0) {
      comparisons.push(`${isState.currentArray[j]} &le; ${key} (stop geser)`);
    }

    const insertIdx = j + 1;
    isState.currentArray[insertIdx] = key;
    isState.stepNumber++;

    const labels = ["", "Langkah 1", "Langkah 2", "Langkah 3", "Langkah 4", "Langkah 5", "Langkah 6", "Langkah 7"];
    const stepLabel = labels[curI] || `Langkah ${curI}`;

    let stepExplanation = "";
    if (currentIsDatasetKey === "sma" && curI === 1) {
      stepExplanation = `<strong>• Mulai dari elemen ke-2 (yaitu 2):</strong> Bandingkan dengan 5, karena <code>2 &lt; 5</code>, geser 5 ke kanan, masukkan 2 ke indeks 0. Hasil: <code>[${isState.currentArray.join(", ")}]</code>`;
    } else if (currentIsDatasetKey === "sma" && curI === 2) {
      stepExplanation = `<strong>• Elemen berikutnya 4:</strong> Bandingkan ke belakang, <code>5 &gt; 4</code>, maka geser 5, masukkan 4 ke indeks 1. Hasil: <code>[${isState.currentArray.join(", ")}]</code>`;
    } else if (currentIsDatasetKey === "sma" && curI === 3) {
      stepExplanation = `<strong>• Elemen berikutnya 6:</strong> Ini nilainya sudah lebih besar dari sebelumnya (<code>6 &gt; 5</code>), maka biarkan. Hasil: <code>[${isState.currentArray.join(", ")}]</code>`;
    } else if (currentIsDatasetKey === "sma" && curI === 4) {
      stepExplanation = `<strong>• Elemen berikutnya 1:</strong> Bandingkan dengan sebelumnya, jika elemen sebelumnya lebih besar maka digeser. Jadi geser 6, 5, 4, 2 ke kanan, dan masukkan 1 ke indeks 0. Hasil: <code>[${isState.currentArray.join(", ")}]</code>`;
    } else {
      if (shiftedElements.length > 0) {
        stepExplanation = `<strong>${stepLabel}:</strong> Elemen <code>key = ${key}</code> (indeks ${curI}). Geser ${shiftedElements.map(s => s.val).join(", ")} ke kanan, lalu sisipkan ${key} ke indeks ${insertIdx}. Hasil: <code>[${isState.currentArray.join(", ")}]</code>`;
      } else {
        stepExplanation = `<strong>${stepLabel}:</strong> Elemen <code>key = ${key}</code> (indeks ${curI}) sudah lebih besar dari elemen sebelumnya, sehingga dibiarkan pada posisinya. Hasil: <code>[${isState.currentArray.join(", ")}]</code>`;
      }
    }

    let shiftText = "";
    if (shiftedElements.length > 0) {
      shiftText = `Geser ${shiftedElements.map(s => s.val).join(", ")} ke kanan, sisipkan ${key} ke indeks ${insertIdx}`;
    } else {
      shiftText = `Nilai ${key} sudah lebih besar dari elemen sebelumnya (biarkan)`;
    }

    isState.lastStepDetail = {
      label: stepLabel,
      i: curI,
      key: key,
      insertIdx: insertIdx,
      shiftedElements: shiftedElements,
      shiftCount: shiftedElements.length,
      prevArray: prevArray,
      comparisons: comparisons,
      shiftText: shiftText
    };

    isState.currentExplanation = stepExplanation;
    isState.statusBadge = `${stepLabel} (${curI}/${n - 1})`;
    isState.statusType = "warning";

    isState.stepLogs.push({
      label: stepLabel,
      i: curI,
      key: key,
      comparisons: comparisons.length > 0 ? comparisons.join("; ") : "Nilai sudah &gt; elemen sebelumnya",
      shiftedText: shiftedElements.length > 0 ? shiftedElements.map(s => s.val).join(", ") : "Tidak ada (biarkan)",
      insertIdx: insertIdx,
      arrayResult: [...isState.currentArray]
    });

    isState.i++;

    if (isState.i >= n) {
      isState.isFinished = true;
      isState.statusBadge = "Selesai Terurut!";
      isState.statusType = "success";
      isState.currentExplanation += `<br><span style="color: #10b981; font-weight: bold;">🎉 Selesai!</span> Seluruh elemen array kini telah terurut sempurna: <code>[${isState.currentArray.join(", ")}]</code>.`;
      pauseAutoInsertionSort();
    }

    renderInsertionSort();
  }

  function stepBackInsertionSort() {
    if (isState.history.length === 0) return;
    pauseAutoInsertionSort();
    const prev = isState.history.pop();
    isState.i = prev.i;
    isState.currentArray = prev.currentArray;
    isState.stepNumber = prev.stepNumber;
    isState.isFinished = prev.isFinished;
    isState.currentExplanation = prev.currentExplanation;
    isState.statusBadge = prev.statusBadge;
    isState.statusType = prev.statusType;
    isState.lastStepDetail = prev.lastStepDetail;
    isState.stepLogs = prev.stepLogs;
    renderInsertionSort();
  }

  function toggleAutoInsertionSort() {
    if (isState.isRunning) {
      pauseAutoInsertionSort();
    } else {
      startAutoInsertionSort();
    }
  }

  function startAutoInsertionSort() {
    if (isState.isFinished) {
      resetInsertionSort();
    }
    isState.isRunning = true;
    renderInsertionSort();
    isState.intervalId = setInterval(() => {
      if (isState.isFinished) {
        pauseAutoInsertionSort();
      } else {
        stepInsertionSort();
      }
    }, isState.speed);
  }

  function pauseAutoInsertionSort() {
    isState.isRunning = false;
    if (isState.intervalId) {
      clearInterval(isState.intervalId);
      isState.intervalId = null;
    }
    const btn = document.getElementById("insertionAutoText");
    if (btn) btn.textContent = "▶️ Urutkan Otomatis";
  }

  function resetInsertionSort() {
    pauseAutoInsertionSort();
    isState.i = 1;
    isState.currentArray = [...isData];
    isState.stepNumber = 0;
    isState.isFinished = false;
    isState.history = [];
    isState.stepLogs = [];
    isState.lastStepDetail = null;
    isState.statusBadge = "Siap Mengurutkan";
    isState.statusType = "primary";
    isState.currentExplanation = `Inisialisasi Insertion Sort pada array <code>[${isData.join(", ")}]</code>. Elemen pertama <code>${isData[0]}</code> diasumsikan sudah terurut di tangan. Tekan tombol <strong>'⏩ Langkah Berikutnya (Step)'</strong> atau <strong>'▶️ Urutkan Otomatis'</strong> untuk mulai menyisipkan elemen berikutnya.`;
    renderInsertionSort();
  }

  function selectInsertionDataset(key) {
    if (!isDatasets[key]) return;
    pauseAutoInsertionSort();
    currentIsDatasetKey = key;
    isData = [...isDatasets[key]];
    resetInsertionSort();
  }

  function setCustomInsertionData() {
    const input = document.getElementById("inputCustomIs");
    if (!input || !input.value.trim()) return;

    const parts = input.value.split(",").map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    if (parts.length < 2) {
      alert("Masukkan minimal 2 angka yang dipisahkan dengan tanda koma (misal: 5, 2, 4, 6, 1)");
      return;
    }

    pauseAutoInsertionSort();
    currentIsDatasetKey = "custom";
    isData = parts.slice(0, 10);
    resetInsertionSort();
  }

  function setInsertionSpeed(val) {
    isState.speed = 1800 - parseInt(val, 10);
    if (isState.isRunning) {
      pauseAutoInsertionSort();
      startAutoInsertionSort();
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

  /* ==========================================================================
   * 8. Simulator Interaktif Decision Tree (Pohon Keputusan AI)
   * Studi Kasus: "Mengelompokkan Jenis Hewan" (Buku Teks SMA Bab 2 Hal. 59)
   * Mendemonstrasikan 3 komponen utama:
   * 1) Root Node: Pertanyaan pertama pada pohon keputusan, tempat memulai proses memilih.
   * 2) Decision Node: Pertanyaan lanjutan yang muncul setelah jawaban sebelumnya.
   * 3) Leaf Node: Hasil akhir dari proses untuk menentukan keputusan.
   * ========================================================================== */

  const dtNodes = {
    ROOT: {
      id: "ROOT",
      type: "root",
      title: "Apakah hewan ini bertelur?",
      subtitle: "1) Root Node: Tempat memulai proses memilih",
      yesNext: "DECISION_1",
      noNext: "DECISION_2",
      yesLabel: "Ya (Ovipar / Bertelur)",
      noLabel: "Tidak (Vivipar / Melahirkan)"
    },
    DECISION_1: {
      id: "DECISION_1",
      type: "decision",
      title: "Apakah memiliki bulu atau sayap?",
      subtitle: "2) Decision Node: Cabang hewan bertelur",
      yesNext: "LEAF_BURUNG",
      noNext: "DECISION_3",
      yesLabel: "Ya (Memiliki bulu/sayap)",
      noLabel: "Tidak (Tanpa bulu)"
    },
    DECISION_2: {
      id: "DECISION_2",
      type: "decision",
      title: "Apakah habitat utamanya hidup di air?",
      subtitle: "2) Decision Node: Cabang hewan melahirkan",
      yesNext: "LEAF_MAMALIA_AIR",
      noNext: "LEAF_MAMALIA_DARAT",
      yesLabel: "Ya (Hidup di perairan)",
      noLabel: "Tidak (Hidup di darat)"
    },
    DECISION_3: {
      id: "DECISION_3",
      type: "decision",
      title: "Apakah hidup di air & bernapas dengan insang?",
      subtitle: "2) Decision Node: Pembeda ikan vs reptil/amfibi",
      yesNext: "LEAF_IKAN",
      noNext: "LEAF_REPTIL",
      yesLabel: "Ya (Hidup di air & berinsang)",
      noLabel: "Tidak (Reptil / Amfibi)"
    },
    LEAF_BURUNG: {
      id: "LEAF_BURUNG",
      type: "leaf",
      title: "Burung / Unggas (Aves)",
      icon: "🐔",
      subtitle: "3) Leaf Node: Hasil akhir keputusan",
      desc: "Hewan bertelur yang memiliki bulu dan sayap.",
      examples: "Ayam, Bebek, Burung Elang, Merpati"
    },
    LEAF_IKAN: {
      id: "LEAF_IKAN",
      type: "leaf",
      title: "Ikan (Pisces)",
      icon: "🐟",
      subtitle: "3) Leaf Node: Hasil akhir keputusan",
      desc: "Hewan bertelur yang hidup di air dan bernapas dengan insang.",
      examples: "Ikan Mas, Lele, Bandeng, Hiu"
    },
    LEAF_REPTIL: {
      id: "LEAF_REPTIL",
      type: "leaf",
      title: "Reptil / Amfibi",
      icon: "🐍",
      subtitle: "3) Leaf Node: Hasil akhir keputusan",
      desc: "Hewan bertelur tanpa bulu yang bernapas dengan paru-paru/kulit.",
      examples: "Ular, Buaya, Katak, Komodo"
    },
    LEAF_MAMALIA_AIR: {
      id: "LEAF_MAMALIA_AIR",
      type: "leaf",
      title: "Mamalia Air",
      icon: "🐬",
      subtitle: "3) Leaf Node: Hasil akhir keputusan",
      desc: "Hewan melahirkan yang beradaptasi hidup di laut/perairan.",
      examples: "Paus, Lumba-lumba, Anjing Laut"
    },
    LEAF_MAMALIA_DARAT: {
      id: "LEAF_MAMALIA_DARAT",
      type: "leaf",
      title: "Mamalia Darat",
      icon: "🐱",
      subtitle: "3) Leaf Node: Hasil akhir keputusan",
      desc: "Hewan melahirkan yang hidup dan berkembang biak di darat.",
      examples: "Kucing, Kuda, Gajah, Harimau"
    }
  };

  const dtAnimalPresets = {
    ayam: {
      id: "ayam",
      name: "Ayam",
      icon: "🐔",
      path: ["ROOT", "DECISION_1", "LEAF_BURUNG"],
      answers: { ROOT: true, DECISION_1: true },
      explanation: "Ayam bertelur (Ya) &rarr; memiliki bulu/sayap (Ya) &rarr; Berhasil diklasifikasikan ke <strong>Leaf Node: Burung / Unggas (Aves)</strong>."
    },
    ikan_mas: {
      id: "ikan_mas",
      name: "Ikan Mas",
      icon: "🐟",
      path: ["ROOT", "DECISION_1", "DECISION_3", "LEAF_IKAN"],
      answers: { ROOT: true, DECISION_1: false, DECISION_3: true },
      explanation: "Ikan Mas bertelur (Ya) &rarr; tidak berbulu (Tidak) &rarr; hidup di air & berinsang (Ya) &rarr; Berhasil diklasifikasikan ke <strong>Leaf Node: Ikan (Pisces)</strong>."
    },
    ular: {
      id: "ular",
      name: "Ular",
      icon: "🐍",
      path: ["ROOT", "DECISION_1", "DECISION_3", "LEAF_REPTIL"],
      answers: { ROOT: true, DECISION_1: false, DECISION_3: false },
      explanation: "Ular bertelur (Ya) &rarr; tidak berbulu (Tidak) &rarr; tidak bernapas dengan insang (Tidak) &rarr; Berhasil diklasifikasikan ke <strong>Leaf Node: Reptil / Amfibi</strong>."
    },
    paus: {
      id: "paus",
      name: "Ikan Paus",
      icon: "🐬",
      path: ["ROOT", "DECISION_2", "LEAF_MAMALIA_AIR"],
      answers: { ROOT: false, DECISION_2: true },
      explanation: "Paus tidak bertelur/melahirkan (Tidak) &rarr; hidup di air (Ya) &rarr; Berhasil diklasifikasikan ke <strong>Leaf Node: Mamalia Air</strong>."
    },
    kucing: {
      id: "kucing",
      name: "Kucing",
      icon: "🐱",
      path: ["ROOT", "DECISION_2", "LEAF_MAMALIA_DARAT"],
      answers: { ROOT: false, DECISION_2: false },
      explanation: "Kucing tidak bertelur/melahirkan (Tidak) &rarr; hidup di darat (Tidak) &rarr; Berhasil diklasifikasikan ke <strong>Leaf Node: Mamalia Darat</strong>."
    }
  };

  let dtState = {
    currentNodeId: "ROOT",
    pathHistory: ["ROOT"],
    answersHistory: {},
    activePresetKey: "ayam",
    isFinished: true,
    containerId: "visDecisionTreeContainer",
    statusBadge: "Selesai: Burung / Unggas",
    statusType: "success",
    explanation: "Ayam bertelur (Ya) &rarr; memiliki bulu/sayap (Ya) &rarr; Berhasil diklasifikasikan ke <strong>Leaf Node: Burung / Unggas (Aves)</strong>."
  };

  function initDecisionTreeSimulator(containerId) {
    if (containerId) dtState.containerId = containerId;
    selectDtAnimal("ayam");
  }

  function renderDecisionTree() {
    const container = document.getElementById(dtState.containerId);
    if (!container) return;

    const {
      currentNodeId,
      pathHistory,
      answersHistory,
      activePresetKey,
      isFinished,
      statusBadge,
      statusType,
      explanation
    } = dtState;

    const activeNode = dtNodes[currentNodeId] || dtNodes.ROOT;
    const isLeaf = activeNode.type === "leaf";

    // Helper: is node in active path?
    const isPath = (id) => pathHistory.includes(id);

    container.innerHTML = `
      <div class="visualizer-panel dt-visualizer-panel">
        <!-- Header Info -->
        <div class="vis-header">
          <div class="vis-title">
            <span class="badge-tag" style="background: linear-gradient(135deg, #10b981, #06b6d4); color: #0b0f19; font-weight: 700;">
              🌳 Simulasi Interaktif Decision Tree
            </span>
            <h4>Mengelompokkan Jenis Hewan (Buku Teks SMA Bab 2 Hal. 59)</h4>
          </div>
          <div class="vis-stats">
            <span class="stat-pill">Simpul Aktif: <strong style="color: var(--accent-cyan);">${activeNode.id}</strong></span>
            <span class="stat-pill">Tipe Simpul: <strong style="color: ${isLeaf ? '#ec4899' : (activeNode.type === 'root' ? '#10b981' : '#38bdf8')};">${isLeaf ? '🟣 Leaf Node' : (activeNode.type === 'root' ? '🟢 Root Node' : '🔵 Decision Node')}</strong></span>
            <span class="stat-pill">Langkah Keputusan: <strong>${pathHistory.length} Simpul</strong></span>
            <span class="stat-pill">Status: <strong>${statusBadge}</strong></span>
          </div>
        </div>

        <!-- Bar Presets Hewan -->
        <div class="bs-dataset-bar dt-preset-bar">
          <span class="bs-dataset-label">Pilih Contoh Hewan:</span>
          ${Object.values(dtAnimalPresets).map(preset => `
            <button class="btn btn-xs ${activePresetKey === preset.id ? 'btn-primary' : 'btn-outline'}" onclick="Visualizer.selectDtAnimal('${preset.id}')">
              ${preset.icon} ${preset.name}
            </button>
          `).join("")}
          <button class="btn btn-xs btn-outline" style="margin-left: auto;" onclick="Visualizer.resetDtTree()">
            🔄 Kuis Mandiri (Mulai dari Awal)
          </button>
        </div>

        <!-- Legenda Simpul -->
        <div class="dt-legend-bar">
          <div class="dt-legend-item">
            <span class="dt-legend-dot" style="background: #10b981;"></span>
            <span><strong>1) Root Node:</strong> Pertanyaan awal memulai memilih</span>
          </div>
          <div class="dt-legend-item">
            <span class="dt-legend-dot" style="background: #0284c7;"></span>
            <span><strong>2) Decision Node:</strong> Pertanyaan lanjutan</span>
          </div>
          <div class="dt-legend-item">
            <span class="dt-legend-dot" style="background: #ec4899;"></span>
            <span><strong>3) Leaf Node:</strong> Hasil akhir keputusan</span>
          </div>
        </div>

        <!-- Diagram Visual Pohon Keputusan (Decision Tree) -->
        <div class="dt-tree-wrapper">
          <!-- Level 1: ROOT NODE -->
          <div class="dt-level dt-level-1">
            <div class="dt-node-card dt-node-root ${isPath('ROOT') ? 'dt-node-active dt-pulse' : ''}">
              <div class="dt-node-badge dt-badge-root">🟢 1) Root Node</div>
              <div class="dt-node-title">Apakah bertelur?</div>
              <div class="dt-node-sub">Titik awal proses klasifikasi</div>
            </div>
          </div>

          <!-- Level 1 Branches (Ya / Tidak) -->
          <div class="dt-branch-row">
            <div class="dt-branch-line-wrap left">
              <span class="dt-branch-pill ${answersHistory['ROOT'] === true ? 'pill-active' : ''}">
                Ya (Bertelur) &swarr;
              </span>
            </div>
            <div class="dt-branch-line-wrap right">
              <span class="dt-branch-pill ${answersHistory['ROOT'] === false ? 'pill-active' : ''}">
                &searr; Tidak (Melahirkan)
              </span>
            </div>
          </div>

          <!-- Level 2: DECISION NODES -->
          <div class="dt-level dt-level-2">
            <!-- Decision Node 1 -->
            <div class="dt-subbranch-col">
              <div class="dt-node-card dt-node-decision ${isPath('DECISION_1') ? 'dt-node-active dt-pulse' : ''}">
                <div class="dt-node-badge dt-badge-decision">🔵 2) Decision Node 1</div>
                <div class="dt-node-title">Memiliki bulu / sayap?</div>
                <div class="dt-node-sub">Cabang hewan bertelur</div>
              </div>

              <!-- Sub-branch from Decision 1 -->
              <div class="dt-branch-row sub">
                <span class="dt-branch-pill mini ${answersHistory['DECISION_1'] === true ? 'pill-active' : ''}">Ya &darr;</span>
                <span class="dt-branch-pill mini ${answersHistory['DECISION_1'] === false ? 'pill-active' : ''}">Tidak &rarr;</span>
              </div>
            </div>

            <!-- Decision Node 2 -->
            <div class="dt-subbranch-col">
              <div class="dt-node-card dt-node-decision ${isPath('DECISION_2') ? 'dt-node-active dt-pulse' : ''}">
                <div class="dt-node-badge dt-badge-decision">🔵 2) Decision Node 2</div>
                <div class="dt-node-title">Hidup di air (laut)?</div>
                <div class="dt-node-sub">Cabang hewan melahirkan</div>
              </div>

              <!-- Sub-branch from Decision 2 -->
              <div class="dt-branch-row sub">
                <span class="dt-branch-pill mini ${answersHistory['DECISION_2'] === true ? 'pill-active' : ''}">Ya &darr;</span>
                <span class="dt-branch-pill mini ${answersHistory['DECISION_2'] === false ? 'pill-active' : ''}">Tidak &darr;</span>
              </div>
            </div>
          </div>

          <!-- Level 3: DECISION NODE 3 & LEAF NODES -->
          <div class="dt-level dt-level-3">
            <!-- Leaf 1: Burung -->
            <div class="dt-node-card dt-node-leaf ${isPath('LEAF_BURUNG') ? 'dt-node-active dt-node-winner dt-pulse' : ''}">
              <div class="dt-node-badge dt-badge-leaf">🟣 3) Leaf Node</div>
              <div class="dt-leaf-icon">🐔</div>
              <div class="dt-node-title">Burung / Unggas</div>
              <div class="dt-node-sub">Ayam, Bebek, Elang</div>
            </div>

            <!-- Decision Node 3 -->
            <div class="dt-subbranch-col">
              <div class="dt-node-card dt-node-decision ${isPath('DECISION_3') ? 'dt-node-active dt-pulse' : ''}">
                <div class="dt-node-badge dt-badge-decision">🔵 2) Decision Node 3</div>
                <div class="dt-node-title">Hidup di air & insang?</div>
                <div class="dt-node-sub">Bertelur tanpa bulu</div>
              </div>

              <!-- Sub-branch from Decision 3 -->
              <div class="dt-branch-row sub">
                <span class="dt-branch-pill mini ${answersHistory['DECISION_3'] === true ? 'pill-active' : ''}">Ya &darr;</span>
                <span class="dt-branch-pill mini ${answersHistory['DECISION_3'] === false ? 'pill-active' : ''}">Tidak &darr;</span>
              </div>
            </div>

            <!-- Leaf 4: Mamalia Air -->
            <div class="dt-node-card dt-node-leaf ${isPath('LEAF_MAMALIA_AIR') ? 'dt-node-active dt-node-winner dt-pulse' : ''}">
              <div class="dt-node-badge dt-badge-leaf">🟣 3) Leaf Node</div>
              <div class="dt-leaf-icon">🐬</div>
              <div class="dt-node-title">Mamalia Air</div>
              <div class="dt-node-sub">Paus, Lumba-lumba</div>
            </div>

            <!-- Leaf 5: Mamalia Darat -->
            <div class="dt-node-card dt-node-leaf ${isPath('LEAF_MAMALIA_DARAT') ? 'dt-node-active dt-node-winner dt-pulse' : ''}">
              <div class="dt-node-badge dt-badge-leaf">🟣 3) Leaf Node</div>
              <div class="dt-leaf-icon">🐱</div>
              <div class="dt-node-title">Mamalia Darat</div>
              <div class="dt-node-sub">Kucing, Kuda, Sapi</div>
            </div>
          </div>

          <!-- Level 4: Final Leaves for Decision 3 -->
          <div class="dt-level dt-level-4">
            <!-- Spacer to align under Decision 3 -->
            <div style="flex: 1;"></div>

            <div class="dt-leaves-subgroup">
              <!-- Leaf 2: Ikan -->
              <div class="dt-node-card dt-node-leaf ${isPath('LEAF_IKAN') ? 'dt-node-active dt-node-winner dt-pulse' : ''}">
                <div class="dt-node-badge dt-badge-leaf">🟣 3) Leaf Node</div>
                <div class="dt-leaf-icon">🐟</div>
                <div class="dt-node-title">Ikan (Pisces)</div>
                <div class="dt-node-sub">Ikan Mas, Lele, Hiu</div>
              </div>

              <!-- Leaf 3: Reptil / Amfibi -->
              <div class="dt-node-card dt-node-leaf ${isPath('LEAF_REPTIL') ? 'dt-node-active dt-node-winner dt-pulse' : ''}">
                <div class="dt-node-badge dt-badge-leaf">🟣 3) Leaf Node</div>
                <div class="dt-leaf-icon">🐍</div>
                <div class="dt-node-title">Reptil / Amfibi</div>
                <div class="dt-node-sub">Ular, Katak, Buaya</div>
              </div>
            </div>

            <!-- Spacer -->
            <div style="flex: 2;"></div>
          </div>
        </div>

        <!-- Narasi Penelusuran Langkah -->
        <div class="search-step-tracker dt-step-tracker">
          <div class="search-step-row">
            <span class="search-status-badge badge-${statusType}">
              ${statusBadge}
            </span>
            <span style="font-size: 0.95rem; line-height: 1.5;">${explanation}</span>
          </div>
        </div>

        <!-- Kartu Interaktif Pengambilan Keputusan (Question Card) -->
        <div class="bs-math-grid dt-action-grid">
          <div class="bs-math-card">
            <div class="bs-math-card-header">
              <span class="icon">❓</span>
              <strong>Pertanyaan Pohon Keputusan Saat Ini</strong>
            </div>
            <div class="bs-math-body">
              ${!isLeaf ? `
                <div style="font-size: 1.05rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">
                  ${activeNode.title}
                </div>
                <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
                  ${activeNode.subtitle}
                </div>
                <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                  <button class="btn btn-sm btn-primary" onclick="Visualizer.answerDtQuestion(true)">
                    <span>✅ ${activeNode.yesLabel || 'Ya'}</span>
                  </button>
                  <button class="btn btn-sm btn-secondary" onclick="Visualizer.answerDtQuestion(false)">
                    <span>❌ ${activeNode.noLabel || 'Tidak'}</span>
                  </button>
                </div>
              ` : `
                <div style="font-size: 1.1rem; font-weight: 800; color: #ec4899; margin-bottom: 0.35rem;">
                  🎉 Hasil Akhir (Leaf Node): ${activeNode.title}
                </div>
                <div style="font-size: 0.88rem; color: #e2e8f0; line-height: 1.6;">
                  ${activeNode.desc}<br>
                  <strong style="color: var(--accent-cyan);">Contoh:</strong> ${activeNode.examples}
                </div>
                <div style="margin-top: 1rem;">
                  <button class="btn btn-sm btn-outline" onclick="Visualizer.resetDtTree()">
                    <span>🔄 Uji Hewan Lainnya</span>
                  </button>
                </div>
              `}
            </div>
          </div>

          <!-- Kartu Pemetaan Kode Nested If -->
          <div class="bs-math-card">
            <div class="bs-math-card-header">
              <span class="icon">⚡</span>
              <strong>Pemetaan Logika ke Struktur Kode Nested If</strong>
            </div>
            <div class="bs-math-body">
              <div class="bs-formula-code" style="font-size: 0.8rem; line-height: 1.5; white-space: pre-wrap;">${
                pathHistory.map((nodeId, idx) => {
                  const n = dtNodes[nodeId];
                  if (n.type === 'root') return `// 1) Root Node:\nif (bertelur === ${answersHistory['ROOT'] !== undefined ? answersHistory['ROOT'] : '?'}) {`;
                  if (nodeId === 'DECISION_1') return `  // 2) Decision Node 1:\n  if (berbulu === ${answersHistory['DECISION_1'] !== undefined ? answersHistory['DECISION_1'] : '?'}) {`;
                  if (nodeId === 'DECISION_2') return `  // 2) Decision Node 2:\n  if (hidup_di_air === ${answersHistory['DECISION_2'] !== undefined ? answersHistory['DECISION_2'] : '?'}) {`;
                  if (nodeId === 'DECISION_3') return `    // 2) Decision Node 3:\n    if (hidup_di_air && berinsang === ${answersHistory['DECISION_3'] !== undefined ? answersHistory['DECISION_3'] : '?'}) {`;
                  if (n.type === 'leaf') return `      // 3) Leaf Node:\n      return "${n.title}";\n    }\n  }\n}`;
                  return '';
                }).join('\n')
              }</div>
            </div>
          </div>
        </div>

        <!-- Kontrol Interaktif -->
        <div class="vis-controls">
          <div class="control-row">
            <button class="btn btn-sm btn-outline" onclick="Visualizer.stepDtBack()" ${pathHistory.length <= 1 ? 'disabled' : ''} title="Mundur satu pertanyaan ke simpul sebelumnya">
              <span>⏪ Mundur Satu Simpul (Undo)</span>
            </button>
            <button class="btn btn-sm btn-outline" onclick="Visualizer.resetDtTree()" title="Reset pohon keputusan ke simpul akar">
              <span>🔄 Reset ke Root Node</span>
            </button>
            <span style="margin-left: auto; font-size: 0.85rem; color: var(--text-muted);">
              Jalur: ${pathHistory.map(id => dtNodes[id]?.title?.replace('Apakah ', '')?.replace('?', '') || id).join(' &rarr; ')}
            </span>
          </div>
        </div>
      </div>
    `;
  }

  function selectDtAnimal(key) {
    const preset = dtAnimalPresets[key];
    if (!preset) return;

    dtState.activePresetKey = key;
    dtState.pathHistory = [...preset.path];
    dtState.answersHistory = { ...preset.answers };
    dtState.currentNodeId = preset.path[preset.path.length - 1];
    dtState.isFinished = true;
    dtState.statusBadge = `Selesai: ${preset.name}`;
    dtState.statusType = "success";
    dtState.explanation = preset.explanation;
    renderDecisionTree();
  }

  function answerDtQuestion(answerBool) {
    const cur = dtNodes[dtState.currentNodeId];
    if (!cur || cur.type === "leaf") return;

    dtState.answersHistory[cur.id] = answerBool;
    const nextId = answerBool ? cur.yesNext : cur.noNext;
    if (!nextId || !dtNodes[nextId]) return;

    dtState.currentNodeId = nextId;
    dtState.pathHistory.push(nextId);
    dtState.activePresetKey = null;

    const nextNode = dtNodes[nextId];
    if (nextNode.type === "leaf") {
      dtState.isFinished = true;
      dtState.statusBadge = `Selesai: ${nextNode.title}`;
      dtState.statusType = "success";
      dtState.explanation = `🎉 <strong>Keputusan Akhir Ditemukan (Leaf Node):</strong> Berdasarkan rangkaian jawaban, hewan ini diklasifikasikan sebagai <strong>${nextNode.title}</strong> (${nextNode.examples}).`;
    } else {
      dtState.isFinished = false;
      dtState.statusBadge = `Di ${nextNode.type === 'root' ? 'Root Node' : 'Decision Node'}`;
      dtState.statusType = "warning";
      dtState.explanation = `Melangkah ke <strong>Decision Node</strong> berikutnya: <em>"${nextNode.title}"</em>. Silakan pilih <strong>Ya</strong> atau <strong>Tidak</strong>.`;
    }

    renderDecisionTree();
  }

  function stepDtBack() {
    if (dtState.pathHistory.length <= 1) return;

    const removedId = dtState.pathHistory.pop();
    const prevId = dtState.pathHistory[dtState.pathHistory.length - 1];
    delete dtState.answersHistory[prevId];
    dtState.currentNodeId = prevId;
    dtState.isFinished = false;
    dtState.activePresetKey = null;

    const prevNode = dtNodes[prevId];
    dtState.statusBadge = `Kembali ke ${prevNode.type === 'root' ? 'Root Node' : 'Decision Node'}`;
    dtState.statusType = "primary";
    dtState.explanation = `Kembali ke pertanyaan: <em>"${prevNode.title}"</em>. Silakan pilih jawaban Anda.`;
    resetDtTree();
  }

  /* ==========================================================================
   * 9. Simulator Interaktif Regresi Linear (Ordinary Least Squares - OLS)
   * ========================================================================== */

  const lrDatasets = {
    study_scores: {
      name: "Jam Belajar vs Nilai Ujian",
      xName: "Jam Belajar (jam)",
      yName: "Nilai Ujian (skor)",
      points: [
        { x: 1, y: 52 },
        { x: 2, y: 58 },
        { x: 3, y: 65 },
        { x: 4, y: 70 },
        { x: 5, y: 82 },
        { x: 6, y: 85 },
        { x: 7, y: 92 },
        { x: 8, y: 95 }
      ],
      desc: "Korelasi positif kuat: semakin banyak jam belajar, semakin tinggi taksiran nilai ujian."
    },
    experience_salary: {
      name: "Pengalaman vs Gaji",
      xName: "Pengalaman (Tahun)",
      yName: "Gaji (Juta Rp)",
      points: [
        { x: 1, y: 5.5 },
        { x: 2, y: 7.2 },
        { x: 3, y: 9.0 },
        { x: 4, y: 11.5 },
        { x: 5, y: 14.0 },
        { x: 6, y: 16.8 },
        { x: 7, y: 19.5 },
        { x: 8, y: 22.0 }
      ],
      desc: "Hubungan linear antara tahun pengalaman kerja dan tingkat gaji bulanan."
    },
    temperature_icecream: {
      name: "Suhu Udara vs Es Krim",
      xName: "Suhu (°C)",
      yName: "Penjualan (Porsi)",
      points: [
        { x: 24, y: 65 },
        { x: 26, y: 82 },
        { x: 28, y: 105 },
        { x: 30, y: 130 },
        { x: 32, y: 155 },
        { x: 34, y: 182 },
        { x: 36, y: 210 }
      ],
      desc: "Makin panas temperatur udara, permintaan es krim meningkat secara konsisten."
    },
    perfect_linear: {
      name: "Garis Linear Ideal (R² = 1.0)",
      xName: "Variabel X",
      yName: "Variabel Y",
      points: [
        { x: 1, y: 15 },
        { x: 2, y: 25 },
        { x: 3, y: 35 },
        { x: 4, y: 45 },
        { x: 5, y: 55 },
        { x: 6, y: 65 }
      ],
      desc: "Model linear ideal sempurna dengan rumus y = 10x + 5 tanpa residu/galat (R² = 100%)."
    },
    noisy_data: {
      name: "Data Acak / Variansi Realistis",
      xName: "Lama Latihan (Sesi)",
      yName: "Skor Performa",
      points: [
        { x: 1, y: 45 },
        { x: 2, y: 38 },
        { x: 3, y: 68 },
        { x: 4, y: 55 },
        { x: 5, y: 79 },
        { x: 6, y: 72 },
        { x: 7, y: 92 },
        { x: 8, y: 85 }
      ],
      desc: "Menunjukkan peran garis regresi dalam memodelkan rata-rata tren pada data berfluktuasi."
    }
  };

  const lrState = {
    containerId: null,
    points: JSON.parse(JSON.stringify(lrDatasets.study_scores.points)),
    xName: lrDatasets.study_scores.xName,
    yName: lrDatasets.study_scores.yName,
    activePresetKey: "study_scores",
    showResiduals: true,
    predictedPoint: null,
    predictInputX: "6.5",
    message: null
  };

  function calculateOLS(pts) {
    const n = pts.length;
    if (n < 2) return null;

    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
    for (let i = 0; i < n; i++) {
      const x = pts[i].x;
      const y = pts[i].y;
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumX2 += x * x;
      sumY2 += y * y;
    }

    const meanX = sumX / n;
    const meanY = sumY / n;

    const denom = n * sumX2 - (sumX * sumX);
    if (Math.abs(denom) < 1e-12) {
      return { isVertical: true, n, meanX, meanY };
    }

    const slope = (n * sumXY - sumX * sumY) / denom;
    const intercept = (sumY - slope * sumX) / n;

    let ssTot = 0;
    let ssRes = 0;
    const residuals = [];

    for (let i = 0; i < n; i++) {
      const x = pts[i].x;
      const y = pts[i].y;
      const yHat = slope * x + intercept;
      const res = y - yHat;
      residuals.push({ x, y, yHat, error: res });
      ssTot += Math.pow(y - meanY, 2);
      ssRes += Math.pow(res, 2);
    }

    const r2 = ssTot > 0 ? Math.max(0, 1 - (ssRes / ssTot)) : 1;
    const mse = ssRes / n;
    const rmse = Math.sqrt(mse);

    const ssXX = sumX2 - (sumX * sumX) / n;
    const ssYY = sumY2 - (sumY * sumY) / n;
    const ssXY = sumXY - (sumX * sumY) / n;
    const r = (ssXX > 0 && ssYY > 0) ? ssXY / Math.sqrt(ssXX * ssYY) : 0;

    return {
      n,
      sumX,
      sumY,
      sumXY,
      sumX2,
      meanX,
      meanY,
      slope,
      intercept,
      r,
      r2,
      mse,
      rmse,
      residuals
    };
  }

  function initLinearRegressionSimulator(containerId) {
    lrState.containerId = containerId;
    renderLinearRegression();
  }

  function selectLrPreset(key) {
    if (!lrDatasets[key]) return;
    lrState.activePresetKey = key;
    lrState.points = JSON.parse(JSON.stringify(lrDatasets[key].points));
    lrState.xName = lrDatasets[key].xName;
    lrState.yName = lrDatasets[key].yName;
    lrState.predictedPoint = null;
    lrState.message = `Preset <strong>${escapeHtml(lrDatasets[key].name)}</strong> berhasil dimuat.`;
    renderLinearRegression();
  }

  function addLrPoint(x, y) {
    if (isNaN(x) || isNaN(y)) return;
    lrState.points.push({ x, y });
    lrState.predictedPoint = null;
    lrState.message = `Titik baru <strong>(${x}, ${y})</strong> berhasil ditambahkan. Garis regresi diperbarui!`;
    renderLinearRegression();
  }

  function addLrPointManual() {
    const inputX = document.getElementById("lrInputX");
    const inputY = document.getElementById("lrInputY");
    if (!inputX || !inputY) return;
    const x = parseFloat(inputX.value);
    const y = parseFloat(inputY.value);
    if (isNaN(x) || isNaN(y)) {
      alert("Masukkan nilai angka valid untuk koordinat X dan Y!");
      return;
    }
    addLrPoint(x, y);
    inputX.value = "";
    inputY.value = "";
  }

  function removeLastLrPoint() {
    if (lrState.points.length <= 2) {
      alert("Dibutuhkan minimal 2 titik data untuk membentuk garis regresi linear!");
      return;
    }
    const popped = lrState.points.pop();
    lrState.predictedPoint = null;
    lrState.message = `Titik terakhir (${popped.x}, ${popped.y}) dihapus.`;
    renderLinearRegression();
  }

  function removeLrPointAt(index) {
    if (lrState.points.length <= 2) {
      alert("Dibutuhkan minimal 2 titik data untuk membentuk garis regresi linear!");
      return;
    }
    lrState.points.splice(index, 1);
    lrState.predictedPoint = null;
    renderLinearRegression();
  }

  function resetLrData() {
    const key = lrState.activePresetKey || "study_scores";
    lrState.points = JSON.parse(JSON.stringify(lrDatasets[key].points));
    lrState.predictedPoint = null;
    lrState.message = "Data telah di-reset ke nilai default preset.";
    renderLinearRegression();
  }

  function toggleLrResiduals() {
    lrState.showResiduals = !lrState.showResiduals;
    renderLinearRegression();
  }

  function predictLrValue() {
    const inp = document.getElementById("lrPredictInput");
    if (!inp) return;
    const xVal = parseFloat(inp.value);
    if (isNaN(xVal)) {
      alert("Masukkan angka yang valid untuk nilai X!");
      return;
    }

    const ols = calculateOLS(lrState.points);
    if (!ols || ols.isVertical) {
      alert("Model regresi tidak dapat dihitung karena jumlah data kurang atau titik vertikal.");
      return;
    }

    const yHat = ols.slope * xVal + ols.intercept;
    const roundedY = Math.round(yHat * 100) / 100;

    lrState.predictedPoint = {
      x: xVal,
      y: roundedY,
      stepHtml: `Hasil Perhitungan: &nbsp; <code>ŷ = (${ols.slope.toFixed(3)} × ${xVal}) + (${ols.intercept.toFixed(3)}) = <strong>${roundedY}</strong></code>`
    };
    renderLinearRegression();
  }

  function handleLrChartClick(evt) {
    const svg = evt.currentTarget;
    const rect = svg.getBoundingClientRect();
    const scaleX = 600 / rect.width;
    const scaleY = 340 / rect.height;
    const px = (evt.clientX - rect.left) * scaleX;
    const py = (evt.clientY - rect.top) * scaleY;

    const padL = 55, padR = 25, padT = 25, padB = 45;
    const plotW = 600 - padL - padR;
    const plotH = 340 - padT - padB;

    if (px < padL || px > padL + plotW || py < padT || py > padT + plotH) return;

    // Hitung range
    let allX = lrState.points.map(p => p.x);
    let allY = lrState.points.map(p => p.y);
    if (lrState.predictedPoint) {
      allX.push(lrState.predictedPoint.x);
      allY.push(lrState.predictedPoint.y);
    }
    const minX = Math.min(...allX);
    const maxX = Math.max(...allX);
    const minY = Math.min(...allY);
    const maxY = Math.max(...allY);

    const spanX = Math.max(1, maxX - minX);
    const spanY = Math.max(1, maxY - minY);

    const xMin = Math.max(0, Math.floor(minX - spanX * 0.12));
    const xMax = Math.ceil(maxX + spanX * 0.18);
    const yMin = Math.max(0, Math.floor(minY - spanY * 0.12));
    const yMax = Math.ceil(maxY + spanY * 0.18);

    const dataX = xMin + ((px - padL) / plotW) * (xMax - xMin);
    const dataY = yMin + ((padT + plotH - py) / plotH) * (yMax - yMin);

    const roundedX = Math.round(dataX * 10) / 10;
    const roundedY = Math.round(dataY * 10) / 10;

    addLrPoint(roundedX, roundedY);
  }

  function renderLinearRegression() {
    if (!lrState.containerId) return;
    const container = document.getElementById(lrState.containerId);
    if (!container) return;

    const ols = calculateOLS(lrState.points);
    const pts = lrState.points;

    // SVG coordinates setup
    const SVG_W = 600;
    const SVG_H = 340;
    const padL = 55, padR = 25, padT = 25, padB = 45;
    const plotW = SVG_W - padL - padR;
    const plotH = SVG_H - padT - padB;

    let allX = pts.map(p => p.x);
    let allY = pts.map(p => p.y);
    if (lrState.predictedPoint) {
      allX.push(lrState.predictedPoint.x);
      allY.push(lrState.predictedPoint.y);
    }
    const minX = Math.min(...allX);
    const maxX = Math.max(...allX);
    const minY = Math.min(...allY);
    const maxY = Math.max(...allY);

    const spanX = Math.max(1, maxX - minX);
    const spanY = Math.max(1, maxY - minY);

    const xMin = Math.max(0, Math.floor(minX - spanX * 0.12));
    const xMax = Math.ceil(maxX + spanX * 0.18);
    const yMin = Math.max(0, Math.floor(minY - spanY * 0.12));
    const yMax = Math.ceil(maxY + spanY * 0.18);

    const toSvgX = (v) => padL + ((v - xMin) / (xMax - xMin)) * plotW;
    const toSvgY = (v) => padT + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

    // Generate grid lines
    let gridLinesSvg = "";
    const numTicks = 5;
    for (let i = 0; i <= numTicks; i++) {
      // Y Grid
      const yVal = yMin + (i / numTicks) * (yMax - yMin);
      const svgY = toSvgY(yVal);
      gridLinesSvg += `
        <line x1="${padL}" y1="${svgY}" x2="${padL + plotW}" y2="${svgY}" stroke="rgba(255,255,255,0.07)" stroke-dasharray="3,3" />
        <text x="${padL - 8}" y="${svgY + 4}" text-anchor="end" fill="var(--text-dim)" font-size="10" font-family="var(--font-mono)">${yVal.toFixed(yVal % 1 === 0 ? 0 : 1)}</text>
      `;

      // X Grid
      const xVal = xMin + (i / numTicks) * (xMax - xMin);
      const svgX = toSvgX(xVal);
      gridLinesSvg += `
        <line x1="${svgX}" y1="${padT}" x2="${svgX}" y2="${padT + plotH}" stroke="rgba(255,255,255,0.07)" stroke-dasharray="3,3" />
        <text x="${svgX}" y="${padT + plotH + 18}" text-anchor="middle" fill="var(--text-dim)" font-size="10" font-family="var(--font-mono)">${xVal.toFixed(xVal % 1 === 0 ? 0 : 1)}</text>
      `;
    }

    // Residual lines
    let residualLinesSvg = "";
    if (lrState.showResiduals && ols && !ols.isVertical) {
      ols.residuals.forEach(r => {
        const sx = toSvgX(r.x);
        const syActual = toSvgY(r.y);
        const syHat = toSvgY(r.yHat);
        residualLinesSvg += `
          <line x1="${sx}" y1="${syActual}" x2="${sx}" y2="${syHat}" stroke="#f43f5e" stroke-width="1.8" stroke-dasharray="3,2" opacity="0.85">
            <title>Residu (Galat): y - ŷ = ${(r.error).toFixed(2)}</title>
          </line>
        `;
      });
    }

    // Regression Line
    let regLineSvg = "";
    if (ols && !ols.isVertical) {
      const y1 = ols.slope * xMin + ols.intercept;
      const y2 = ols.slope * xMax + ols.intercept;
      regLineSvg = `
        <line x1="${toSvgX(xMin)}" y1="${toSvgY(y1)}" x2="${toSvgX(xMax)}" y2="${toSvgY(y2)}" stroke="#38bdf8" stroke-width="3" stroke-linecap="round">
          <title>Garis Regresi: ŷ = ${ols.slope.toFixed(3)}x + ${ols.intercept.toFixed(3)}</title>
        </line>
      `;
    }

    // Scatter Points
    let scatterPointsSvg = "";
    pts.forEach((p, idx) => {
      const sx = toSvgX(p.x);
      const sy = toSvgY(p.y);
      scatterPointsSvg += `
        <g style="cursor: pointer;">
          <circle cx="${sx}" cy="${sy}" r="6" fill="#10b981" stroke="#ffffff" stroke-width="2" opacity="0.95">
            <title>Titik #${idx + 1}: (${p.x}, ${p.y})</title>
          </circle>
          <text x="${sx}" y="${sy - 10}" text-anchor="middle" fill="#a7f3d0" font-size="9" font-family="var(--font-mono)">(${p.x}, ${p.y})</text>
        </g>
      `;
    });

    // Predicted point highlight
    let predPointSvg = "";
    if (lrState.predictedPoint) {
      const px = toSvgX(lrState.predictedPoint.x);
      const py = toSvgY(lrState.predictedPoint.y);
      predPointSvg = `
        <g>
          <circle cx="${px}" cy="${py}" r="12" fill="none" stroke="#f59e0b" stroke-width="2" opacity="0.6">
            <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="${px}" cy="${py}" r="7" fill="#f59e0b" stroke="#ffffff" stroke-width="2">
            <title>Titik Prediksi: (${lrState.predictedPoint.x}, ${lrState.predictedPoint.y})</title>
          </circle>
          <text x="${px}" y="${py - 12}" text-anchor="middle" fill="#fbbf24" font-weight="700" font-size="10" font-family="var(--font-mono)">
            PREDIKSI: (${lrState.predictedPoint.x}, ${lrState.predictedPoint.y})
          </text>
        </g>
      `;
    }

    // Format OLS display values
    const slopeStr = ols ? ols.slope.toFixed(3) : "-";
    const interceptStr = ols ? (ols.intercept >= 0 ? `+ ${ols.intercept.toFixed(3)}` : `- ${Math.abs(ols.intercept).toFixed(3)}`) : "-";
    const equationStr = ols ? `ŷ = ${slopeStr}x ${interceptStr}` : "Perlu min. 2 titik";
    const r2Pct = ols ? (ols.r2 * 100).toFixed(1) + "%" : "-";
    const rmseStr = ols ? ols.rmse.toFixed(3) : "-";
    const pearsonR = ols ? ols.r.toFixed(3) : "-";

    let r2Quality = "Belum terhitung";
    if (ols) {
      if (ols.r2 >= 0.85) r2Quality = "Sangat Kuat (Prediksi Sangat Akurat)";
      else if (ols.r2 >= 0.65) r2Quality = "Kuat (Tren Jelas)";
      else if (ols.r2 >= 0.40) r2Quality = "Moderat (Variasi Cukup Tinggi)";
      else r2Quality = "Lemah (Data Sangat Tersebar)";
    }

    container.innerHTML = `
      <div class="visualizer-panel lr-visualizer-panel">
        <!-- Header Info -->
        <div class="vis-header">
          <div class="vis-title">
            <span class="badge-tag" style="background: linear-gradient(135deg, #0284c7, #38bdf8); color: #0b0f19; font-weight: 700;">
              📈 Simulator Interaktif Regresi Linear (OLS)
            </span>
            <h4>Model Prediksi Nilai Kontinu & Garis Tren AI</h4>
          </div>
          <div class="vis-stats">
            <span class="stat-pill">Dataset: <strong>${escapeHtml(lrDatasets[lrState.activePresetKey]?.name || "Kustom")}</strong></span>
            <span class="stat-pill">Jumlah Data (n): <strong style="color: var(--accent-cyan);">${pts.length} Sampel</strong></span>
            <span class="stat-pill">Akurasi R²: <strong style="color: #10b981;">${r2Pct}</strong></span>
          </div>
        </div>

        <!-- Presets Bar -->
        <div class="bs-dataset-bar">
          <span class="bs-dataset-label">Pilih Dataset:</span>
          ${Object.keys(lrDatasets).map(key => `
            <button class="btn btn-xs ${lrState.activePresetKey === key ? 'btn-primary' : 'btn-outline'}" onclick="Visualizer.selectLrPreset('${key}')">
              ${escapeHtml(lrDatasets[key].name)}
            </button>
          `).join("")}
          <button class="btn btn-xs btn-outline" style="margin-left: auto;" onclick="Visualizer.resetLrData()">
            🔄 Reset Data
          </button>
        </div>

        <!-- Main Layout Grid: Chart + Sidebar Tools -->
        <div class="lr-grid">
          <!-- Left Column: Interactive SVG Chart -->
          <div class="lr-chart-card">
            <div class="lr-chart-header">
              <div class="lr-chart-title">
                <span>📊 Diagram Pencaran (Scatter Plot) & Garis Tren OLS</span>
              </div>
              <div class="lr-chart-tip">💡 Klik di mana saja pada grafik untuk menambah titik data!</div>
            </div>

            <div class="lr-svg-wrapper">
              <svg viewBox="0 0 ${SVG_W} ${SVG_H}" onclick="Visualizer.handleLrChartClick(event)" aria-label="Grafik Regresi Linear">
                <!-- Grid Lines -->
                ${gridLinesSvg}

                <!-- Axes -->
                <line x1="${padL}" y1="${padT + plotH}" x2="${padL + plotW}" y2="${padT + plotH}" stroke="var(--text-muted)" stroke-width="1.5" />
                <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="var(--text-muted)" stroke-width="1.5" />

                <!-- Residual Lines -->
                ${residualLinesSvg}

                <!-- Regression Line -->
                ${regLineSvg}

                <!-- Scatter Points -->
                ${scatterPointsSvg}

                <!-- Predicted Point -->
                ${predPointSvg}

                <!-- Axis Labels -->
                <text x="${padL + plotW / 2}" y="${padT + plotH + 36}" text-anchor="middle" fill="var(--text-main)" font-size="11" font-weight="600">
                  ${escapeHtml(lrState.xName)} &rarr;
                </text>
                <text x="${padL - 38}" y="${padT + plotH / 2}" text-anchor="middle" fill="var(--text-main)" font-size="11" font-weight="600" transform="rotate(-90, ${padL - 38}, ${padT + plotH / 2})">
                  ${escapeHtml(lrState.yName)} &rarr;
                </text>
              </svg>
            </div>

            <div class="lr-chart-footer-note">
              <div class="lr-chart-legend">
                <span class="lr-legend-item"><span class="lr-legend-dot" style="background: #10b981;"></span> Titik Sampel Aktual (x, y)</span>
                <span class="lr-legend-item"><span class="lr-legend-line" style="background: #38bdf8;"></span> Garis Prediksi ŷ = mx + c</span>
                <span class="lr-legend-item"><span class="lr-legend-line" style="background: #f43f5e; border-top: 1px dashed #f43f5e; height: 0;"></span> Residu Galat (e)</span>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-xs btn-outline" onclick="Visualizer.toggleLrResiduals()">
                  ${lrState.showResiduals ? '🙈 Sembunyikan Residu' : '👁️ Tampilkan Residu'}
                </button>
                <button class="btn btn-xs btn-outline" onclick="Visualizer.removeLastLrPoint()">
                  🗑️ Hapus Titik Terakhir
                </button>
              </div>
            </div>
          </div>

          <!-- Right Column: Metrics & Tools -->
          <div class="lr-sidebar-column">
            <!-- Model Metrics Cards -->
            <div class="lr-metrics-grid">
              <div class="lr-metric-card full-width">
                <span class="lr-metric-label">📐 Persamaan Garis Regresi (Model AI)</span>
                <span class="lr-metric-val equation">${equationStr}</span>
                <span class="lr-metric-desc">Garis kecocokan terbaik (Best-Fit Line) metode Ordinary Least Squares</span>
              </div>

              <div class="lr-metric-card">
                <span class="lr-metric-label">📈 Kemiringan (Slope m)</span>
                <span class="lr-metric-val highlight-amber">${slopeStr}</span>
                <span class="lr-metric-desc">Kenaikan y per 1 unit x</span>
              </div>

              <div class="lr-metric-card">
                <span class="lr-metric-label">📍 Intercept (Titik Potong c)</span>
                <span class="lr-metric-val">${ols ? ols.intercept.toFixed(2) : '-'}</span>
                <span class="lr-metric-desc">Taksiran y saat x = 0</span>
              </div>

              <div class="lr-metric-card">
                <span class="lr-metric-label">🎯 Koefisien Determinasi (R²)</span>
                <span class="lr-metric-val highlight-green">${r2Pct}</span>
                <span class="lr-metric-desc">${r2Quality} (r = ${pearsonR})</span>
              </div>

              <div class="lr-metric-card">
                <span class="lr-metric-label">📉 Rata-rata Galat (RMSE)</span>
                <span class="lr-metric-val">${rmseStr}</span>
                <span class="lr-metric-desc">Deviasi rata-rata prediksi</span>
              </div>
            </div>

            <!-- Prediction Calculator Box -->
            <div class="lr-predict-card">
              <div class="lr-predict-header">
                <span>🎯 Kalkulator Prediksi Nilai Baru:</span>
              </div>
              <div class="lr-predict-form">
                <input type="number" step="0.1" id="lrPredictInput" class="lr-predict-input" value="${lrState.predictInputX}" placeholder="Nilai X baru..." />
                <button class="btn btn-sm btn-primary" onclick="Visualizer.predictLrValue()">Hitung ŷ</button>
              </div>
              ${lrState.predictedPoint ? `
                <div class="lr-predict-result-box">
                  ${lrState.predictedPoint.stepHtml}
                </div>
              ` : `
                <div style="font-size: 0.78rem; color: var(--text-dim);">
                  Masukkan nilai X di atas untuk melihat bagaimana model regresi menaksir nilai Y secara instan.
                </div>
              `}
            </div>

            <!-- Data Management: Manual Add & Table -->
            <div class="lr-data-management-card">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-main);">📋 Tambah & Kelola Data:</span>
                <span style="font-size: 0.75rem; color: var(--text-dim);">${pts.length} baris data</span>
              </div>

              <div class="lr-add-form">
                <div class="lr-add-input-group">
                  <label for="lrInputX">X:</label>
                  <input type="number" step="any" id="lrInputX" class="lr-add-input" placeholder="contoh: 4.5" />
                </div>
                <div class="lr-add-input-group">
                  <label for="lrInputY">Y:</label>
                  <input type="number" step="any" id="lrInputY" class="lr-add-input" placeholder="contoh: 75" />
                </div>
                <button class="btn btn-xs btn-success" onclick="Visualizer.addLrPointManual()">+ Tambah</button>
              </div>

              <div class="lr-table-scroll">
                <table class="lr-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>X</th>
                      <th>Y</th>
                      <th>ŷ (Prediksi)</th>
                      <th>Residu (e)</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${pts.map((p, i) => {
                      const yHat = ols && !ols.isVertical ? (ols.slope * p.x + ols.intercept).toFixed(2) : "-";
                      const err = ols && !ols.isVertical ? (p.y - (ols.slope * p.x + ols.intercept)).toFixed(2) : "-";
                      return `
                        <tr>
                          <td>${i + 1}</td>
                          <td>${p.x}</td>
                          <td>${p.y}</td>
                          <td style="color: var(--accent-cyan);">${yHat}</td>
                          <td style="color: ${Number(err) >= 0 ? '#10b981' : '#f43f5e'};">${err}</td>
                          <td>
                            <button class="lr-del-btn" onclick="Visualizer.removeLrPointAt(${i})" title="Hapus titik ini">&times;</button>
                          </td>
                        </tr>
                      `;
                    }).join("")}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
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
    setLoopSpeed,

    initSequentialSearchSimulator,
    stepSearch,
    toggleAutoSearch,
    resetSearch,
    setSearchTarget,
    setSearchSpeed,
    quickSetTarget,

    initBinarySearchSimulator,
    stepBinarySearch,
    stepBackBinarySearch,
    toggleAutoBinarySearch,
    resetBinarySearch,
    setBinaryTarget,
    quickSetBinaryTarget,
    setBinarySpeed,
    selectBinaryDataset,

    initSelectionSortSimulator,
    stepSelectionSort,
    stepBackSelectionSort,
    toggleAutoSelectionSort,
    resetSelectionSort,
    selectSelectionDataset,
    setCustomSelectionData,
    setSelectionSpeed,

    initInsertionSortSimulator,
    stepInsertionSort,
    stepBackInsertionSort,
    toggleAutoInsertionSort,
    resetInsertionSort,
    selectInsertionDataset,
    setCustomInsertionData,
    setInsertionSpeed,

    initDecisionTreeSimulator,
    selectDtAnimal,
    answerDtQuestion,
    stepDtBack,
    resetDtTree,

    initLinearRegressionSimulator,
    selectLrPreset,
    addLrPoint,
    addLrPointManual,
    handleLrChartClick,
    removeLastLrPoint,
    removeLrPointAt,
    resetLrData,
    toggleLrResiduals,
    predictLrValue
  };
})();





