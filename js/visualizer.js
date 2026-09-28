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
    setSelectionSpeed
  };
})();



