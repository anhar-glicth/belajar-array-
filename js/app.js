/**
 * app.js
 * Logika Antarmuka Utama (UI Controller), Navigasi Kurikulum,
 * Editor Kode Interaktif (JavaScript & Python Dual-Engine),
 * Manajemen Status Belajar (LocalStorage), Dark/Light Theme, dan E-Sertifikat
 */

const App = (function () {
  // State Aplikasi
  let currentTheme = localStorage.getItem("belajar_array_theme") || "dark";
  let currentLanguage = localStorage.getItem("belajar_array_lang") || "js";
  let currentModuleIndex = 0;
  let currentExerciseIndex = 0;

  let userProgress = {
    completedModules: {}, // { 'modul-1': true, ... }
    completedExercises: {}, // { 'latihan-1': true, ... }
    studentName: "Siswa Berbakat"
  };

  /**
   * Inisialisasi saat dokumen siap
   */
  function init() {
    loadProgress();
    applyTheme(currentTheme);
    setLanguage(currentLanguage);
    renderSidebar();
    loadModule(0);
    initPlayground();
    updateOverallProgress();
    setupKeyEvents();
  }

  function setupKeyEvents() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeSidebar();
        closeSandbox();
        closeCertificateModal();
        closeMobileGuide();
      }
    });
  }

  /**
   * Manajemen Tema Terang / Gelap
   */
  function applyTheme(theme) {
    currentTheme = theme;
    localStorage.setItem("belajar_array_theme", theme);
    const icon = document.getElementById("themeToggleIcon");
    const text = document.getElementById("themeToggleText");

    if (theme === "light") {
      document.body.classList.add("light-theme");
      if (icon) icon.textContent = "☀️";
      if (text) text.textContent = "Tema Terang";
    } else {
      document.body.classList.remove("light-theme");
      if (icon) icon.textContent = "🌓";
      if (text) text.textContent = "Ganti tema terang/gelap";
    }
  }

  function toggleTheme() {
    applyTheme(currentTheme === "light" ? "dark" : "light");
  }

  /**
   * Manajemen Bahasa Pemrograman (JavaScript & Python)
   */
  function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem("belajar_array_lang", lang);
    CodeRunner.setLanguage(lang);

    const btnJs = document.getElementById("btnLangJs");
    const btnPy = document.getElementById("btnLangPy");
    if (btnJs) btnJs.classList.toggle("active", lang === "js");
    if (btnPy) btnPy.classList.toggle("active", lang === "py");

    // Toggle semua blok preview kode di materi
    document.querySelectorAll(".lang-code-block").forEach(el => {
      const elLang = el.getAttribute("data-lang");
      el.style.display = elLang === lang ? "block" : "none";
    });

    // Perbarui teks dinamis bahasa
    document.querySelectorAll(".lang-text").forEach(el => {
      const val = el.getAttribute(`data-lang-${lang}`);
      if (val) el.textContent = val;
    });

    // Perbarui hero badge bahasa
    const heroLangBadge = document.getElementById("heroLangBadge");
    if (heroLangBadge) {
      heroLangBadge.textContent = lang === "py" ? "Python 3" : "JavaScript (ES6)";
    }

    // Perbarui cobaSendiri jika ada
    const curMod = CURRICULUM_DATA[currentModuleIndex];
    if (curMod && curMod.cobaSendiri) {
      const ta = document.getElementById(`cobaCode_${curMod.cobaSendiri.id}`);
      const badge = document.getElementById(`cobaLangBadge_${curMod.cobaSendiri.id}`);
      if (ta) {
        ta.value = lang === "py" ? curMod.cobaSendiri.starterCodePy : curMod.cobaSendiri.starterCodeJs;
      }
      if (badge) {
        badge.textContent = lang === "py" ? "Python" : "JavaScript";
      }
    }

    // Jika sedang di Modul Latihan Praktik, re-render latihan aktif
    if (curMod && curMod.interactiveTool === "coding-lab") {
      loadExercise(currentExerciseIndex);
    }
  }

  /**
   * Load & Save Progress di LocalStorage
   */
  function loadProgress() {
    try {
      const saved = localStorage.getItem("arraymaster_py_progress");
      if (saved) {
        userProgress = JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Gagal memuat progress:", e);
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem("arraymaster_py_progress", JSON.stringify(userProgress));
    } catch (e) {
      console.warn("Gagal menyimpan progress:", e);
    }
    updateOverallProgress();
  }

  /**
   * Hitung dan perbarui persentase kemajuan belajar
   */
  function updateOverallProgress() {
    const totalModules = CURRICULUM_DATA.length;
    const totalExercises = PRACTICE_EXERCISES.length;
    const totalItems = totalModules + totalExercises;

    const completedModCount = Object.keys(userProgress.completedModules || {}).length;
    const completedExCount = Object.keys(userProgress.completedExercises || {}).length;
    const totalCompleted = completedModCount + completedExCount;

    const percent = Math.min(100, Math.round((totalCompleted / totalItems) * 100));

    const bar = document.getElementById("overallProgressBar");
    const text = document.getElementById("overallProgressText");
    const certBtn = document.getElementById("btnClaimCert");

    if (bar) bar.style.width = percent + "%";
    if (text) text.textContent = `${percent}% Selesai (${totalCompleted}/${totalItems} Materi & Latihan)`;

    if (certBtn) {
      if (completedExCount >= 4) {
        certBtn.classList.remove("disabled");
        certBtn.title = "Klaim Sertifikat Kompetensi Anda sekarang!";
      } else {
        certBtn.classList.add("disabled");
        certBtn.title = `Selesaikan minimal 4 dari ${PRACTICE_EXERCISES.length} latihan untuk membuka sertifikat (Saat ini: ${completedExCount}/4).`;
      }
    }
  }

  /**
   * Render Daftar Modul di Sidebar
   */
  function renderSidebar() {
    const list = document.getElementById("curriculumList");
    if (!list) return;

    list.innerHTML = CURRICULUM_DATA.map((mod, idx) => {
      const isDone = !!userProgress.completedModules[mod.id];
      const isActive = idx === currentModuleIndex;

      return `
        <li class="nav-item ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}" onclick="App.loadModule(${idx})">
          <div class="nav-item-icon">${isDone ? '✅' : getModuleIcon(idx)}</div>
          <div class="nav-item-info">
            <span class="nav-item-badge">${mod.badge}</span>
            <div class="nav-item-title">${escapeHtml(mod.title)}</div>
          </div>
        </li>
      `;
    }).join("");
  }

  function getModuleIcon(idx) {
    const icons = ["📦", "🔀", "🔄", "🎯", "🔍", "⚡", "📶", "🃏", "🌳"];
    return icons[idx] || "📄";
  }

  /**
   * Membuka Modul tertentu (1. Dasar Array, 2. Nested If, 3. Nested Loop, 4. Latihan Praktik, 5. Sequential Search, 6. Binary Search, 7. Selection Sort, 8. Insertion Sort, 9. Decision Tree)
   */
  function loadModule(idx) {
    if (idx < 0 || idx >= CURRICULUM_DATA.length) return;
    currentModuleIndex = idx;
    closeSidebar();
    renderSidebar();

    const mod = CURRICULUM_DATA[idx];
    const contentArea = document.getElementById("moduleContentArea");
    if (!contentArea) return;

    // Tandai modul sebagai dibaca/selesai
    userProgress.completedModules[mod.id] = true;
    saveProgress();
    renderSidebar();

    let visualizerHtml = "";
    if (mod.interactiveTool === "1d-visualizer") {
      visualizerHtml = `<div id="vis1DContainer" class="vis-mount-point"></div>`;
    } else if (mod.interactiveTool === "sequential-search-simulator") {
      visualizerHtml = `<div id="visSearchingContainer" class="vis-mount-point"></div>`;
    } else if (mod.interactiveTool === "binary-search-simulator") {
      visualizerHtml = `<div id="visBinarySearchContainer" class="vis-mount-point"></div>`;
    } else if (mod.interactiveTool === "selection-sort-simulator") {
      visualizerHtml = `<div id="visSelectionSortContainer" class="vis-mount-point"></div>`;
    } else if (mod.interactiveTool === "insertion-sort-simulator") {
      visualizerHtml = `<div id="visInsertionSortContainer" class="vis-mount-point"></div>`;
    } else if (mod.interactiveTool === "decision-tree-simulator") {
      visualizerHtml = `<div id="visDecisionTreeContainer" class="vis-mount-point"></div>`;
    } else if (mod.interactiveTool === "nested-if-simulator") {
      visualizerHtml = `<div id="visNestedIfContainer" class="vis-mount-point"></div>`;
    } else if (mod.interactiveTool === "nested-loop-visualizer" || mod.interactiveTool === "matrix-analyzer") {
      visualizerHtml = `<div id="visNestedLoopContainer" class="vis-mount-point"></div>`;
    } else if (mod.interactiveTool === "coding-lab") {
      visualizerHtml = `<div id="codingLabContainer"></div>`;
    }

    // Box Coba Sendiri (Interaktif di Teori Modul 1, 2, 3)
    let cobaSendiriHtml = "";
    if (mod.cobaSendiri) {
      const isPy = currentLanguage === "py";
      const starterCode = isPy ? mod.cobaSendiri.starterCodePy : mod.cobaSendiri.starterCodeJs;
      cobaSendiriHtml = `
        <div class="coba-sendiri-card" id="cobaCard_${mod.cobaSendiri.id}">
          <div class="coba-sendiri-header">
            <div>
              <span class="coba-sendiri-badge">Coba Sendiri</span>
              <h3 class="coba-sendiri-title">${escapeHtml(mod.cobaSendiri.title)}</h3>
            </div>
            <span class="badge-pill badge-category" id="cobaLangBadge_${mod.cobaSendiri.id}">${isPy ? 'Python' : 'JavaScript'}</span>
          </div>
          <div class="coba-sendiri-desc">${mod.cobaSendiri.description}</div>
          <div class="code-editor-box" style="margin-bottom: 0.5rem;">
            <textarea id="cobaCode_${mod.cobaSendiri.id}" class="coba-sendiri-editor" rows="7" spellcheck="false">${escapeHtml(starterCode)}</textarea>
          </div>
          <div class="coba-sendiri-actions">
            <button class="btn btn-primary" onclick="App.runCobaSendiri('${mod.cobaSendiri.id}')">
              <span>▶ Jalankan</span>
            </button>
            <button class="btn btn-outline" onclick="App.toggleCobaSendiriHint('${mod.cobaSendiri.id}')">
              <span>💡 Petunjuk</span>
            </button>
            <button class="btn btn-xs btn-outline" onclick="App.resetCobaSendiri('${mod.cobaSendiri.id}')">
              <span>🔄 Reset</span>
            </button>
          </div>
          <div class="coba-sendiri-hint-box" id="cobaHint_${mod.cobaSendiri.id}">
            ${mod.cobaSendiri.hint}
          </div>
          <div class="coba-sendiri-output" id="cobaOutput_${mod.cobaSendiri.id}">
            <div class="coba-sendiri-output-title">Output Terminal:</div>
            <pre class="coba-output-content"></pre>
          </div>
        </div>
      `;
    }

    const sectionsHtml = (mod.sections || []).map(sec => `
      <section class="module-section">
        <h3 class="section-heading">${sec.heading}</h3>
        <div class="section-body">${sec.content}</div>
      </section>
    `).join("");

    const prevBtn = idx > 0 ? `<button class="btn btn-outline" onclick="App.loadModule(${idx - 1})">&larr; Modul Sebelumnya</button>` : `<div></div>`;
    const nextBtn = idx < CURRICULUM_DATA.length - 1 ? `<button class="btn btn-primary" onclick="App.loadModule(${idx + 1})">Lanjut Modul Berikutnya &rarr;</button>` : `<button class="btn btn-success" onclick="App.loadModule(3)">🎯 Buka Ruang Latihan Praktik &rarr;</button>`;

    contentArea.innerHTML = `
      <div class="module-header-hero">
        <div class="module-tags">
          <span class="badge-pill badge-primary">${mod.badge}</span>
          <span class="badge-pill badge-muted">⏱️ ${mod.readTime}</span>
          <span class="badge-pill badge-category" id="heroLangBadge">${currentLanguage === 'py' ? 'Python 3' : 'JavaScript (ES6)'}</span>
        </div>
        <h1 class="module-main-title">${escapeHtml(mod.title)}</h1>
        <p class="module-subtitle">${escapeHtml(mod.subtitle)}</p>
        <div class="module-summary-card">
          <span class="summary-icon">📌</span>
          <div class="summary-text">${escapeHtml(mod.summary)}</div>
        </div>
      </div>

      ${visualizerHtml}

      <div class="sections-container">
        ${sectionsHtml}
      </div>

      ${cobaSendiriHtml}

      <div class="module-footer-nav">
        ${prevBtn}
        ${nextBtn}
      </div>
    `;

    // Pasang listener kode & visibilitas bahasa
    document.querySelectorAll(".lang-code-block").forEach(el => {
      const elLang = el.getAttribute("data-lang");
      el.style.display = elLang === currentLanguage ? "block" : "none";
    });

    if (mod.cobaSendiri) {
      setupPythonIndentationForTextarea(`cobaCode_${mod.cobaSendiri.id}`);
    }

    // Mount visualizers
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (mod.interactiveTool === "1d-visualizer") {
      Visualizer.init1DVisualizer("vis1DContainer");
    } else if (mod.interactiveTool === "sequential-search-simulator") {
      Visualizer.initSequentialSearchSimulator("visSearchingContainer");
    } else if (mod.interactiveTool === "binary-search-simulator") {
      Visualizer.initBinarySearchSimulator("visBinarySearchContainer");
    } else if (mod.interactiveTool === "selection-sort-simulator") {
      Visualizer.initSelectionSortSimulator("visSelectionSortContainer");
    } else if (mod.interactiveTool === "insertion-sort-simulator") {
      Visualizer.initInsertionSortSimulator("visInsertionSortContainer");
    } else if (mod.interactiveTool === "decision-tree-simulator") {
      Visualizer.initDecisionTreeSimulator("visDecisionTreeContainer");
    } else if (mod.interactiveTool === "nested-if-simulator") {
      Visualizer.initNestedIfSimulator("visNestedIfContainer");
    } else if (mod.interactiveTool === "nested-loop-visualizer" || mod.interactiveTool === "matrix-analyzer") {
      Visualizer.initNestedLoopVisualizer("visNestedLoopContainer");
    } else if (mod.interactiveTool === "coding-lab") {
      renderCodingLab();
    }
  }

  /**
   * Eksekusi "Coba Sendiri" di Modul 1, 2, 3
   */
  async function runCobaSendiri(cobaId) {
    const textarea = document.getElementById(`cobaCode_${cobaId}`);
    const outWrap = document.getElementById(`cobaOutput_${cobaId}`);
    if (!textarea || !outWrap) return;

    const code = textarea.value;
    const pre = outWrap.querySelector(".coba-output-content");
    outWrap.style.display = "block";
    pre.innerHTML = `<span class="loading-spin">⏳ Menjalankan program...</span>`;

    const res = await CodeRunner.runCode(code, currentLanguage);

    if (res.error) {
      pre.innerHTML = `<span class="text-danger">${res.error}</span>`;
      return;
    }

    if (!res.logs || res.logs.length === 0) {
      if (res.returnValue) {
        pre.innerHTML = `<div class="log-line log-log">${escapeHtml(res.returnValue)}</div>`;
      } else {
        pre.innerHTML = `<span class="text-muted">(Program berhasil dieksekusi tanpa output console/print)</span>`;
      }
      return;
    }

    const outStr = res.logs.map(l => `<div class="log-line log-log">${escapeHtml(l.text)}</div>`).join("");
    pre.innerHTML = outStr;
  }

  function toggleCobaSendiriHint(cobaId) {
    const hintBox = document.getElementById(`cobaHint_${cobaId}`);
    if (!hintBox) return;
    hintBox.style.display = (hintBox.style.display === "block") ? "none" : "block";
  }

  function resetCobaSendiri(cobaId) {
    const currentMod = CURRICULUM_DATA[currentModuleIndex];
    if (!currentMod || !currentMod.cobaSendiri) return;

    const textarea = document.getElementById(`cobaCode_${cobaId}`);
    if (textarea) {
      textarea.value = currentLanguage === "py" ? currentMod.cobaSendiri.starterCodePy : currentMod.cobaSendiri.starterCodeJs;
    }
    const outWrap = document.getElementById(`cobaOutput_${cobaId}`);
    if (outWrap) outWrap.style.display = "none";
  }

  /**
   * RENDER LABORATORIUM KODING (MODUL 4)
   */
  function renderCodingLab() {
    const container = document.getElementById("codingLabContainer");
    if (!container) return;

    container.innerHTML = `
      <div class="coding-lab-workspace">
        <!-- Tab Pemilihan Latihan 1-6 -->
        <div class="exercise-tabs-bar">
          ${PRACTICE_EXERCISES.map((ex, i) => {
            const isDone = !!userProgress.completedExercises[ex.id];
            return `
              <button class="ex-tab-btn ${i === currentExerciseIndex ? 'active' : ''} ${isDone ? 'completed' : ''}" onclick="App.loadExercise(${i})">
                <span class="tab-indicator">${isDone ? '✓' : (i + 1)}</span>
                <span class="tab-label">Latihan ${i + 1}</span>
              </button>
            `;
          }).join("")}
        </div>

        <div class="exercise-detail-panel" id="exerciseDetailPanel">
          <!-- Rendered by loadExercise -->
        </div>
      </div>
    `;

    loadExercise(currentExerciseIndex);
  }

  function loadExercise(idx) {
    if (idx < 0 || idx >= PRACTICE_EXERCISES.length) return;
    currentExerciseIndex = idx;

    const tabBtns = document.querySelectorAll(".ex-tab-btn");
    tabBtns.forEach((btn, i) => {
      btn.classList.toggle("active", i === idx);
    });

    const ex = PRACTICE_EXERCISES[idx];
    const panel = document.getElementById("exerciseDetailPanel");
    if (!panel) return;

    const isCompleted = !!userProgress.completedExercises[ex.id];
    const isPy = currentLanguage === "py";
    const defaultCode = isPy ? ex.starterCodePy : ex.starterCode;
    const savedDraft = localStorage.getItem(`draft_${currentLanguage}_${ex.id}`) || defaultCode;
    const fileExt = isPy ? "py" : "js";
    const statusNote = isPy ? "Gunakan 4 spasi (Tab) untuk indentasi blok Python Anda." : "Gunakan kurung kurawal {} untuk blok fungsi JavaScript Anda.";

    panel.innerHTML = `
      <div class="ex-info-card">
        <div class="ex-header-row">
          <div class="ex-meta">
            <span class="badge-pill badge-level">${ex.level}</span>
            <span class="badge-pill badge-category">${ex.category}</span>
            <span class="badge-pill badge-category">${isPy ? 'Python' : 'JavaScript'}</span>
            ${isCompleted ? '<span class="badge-pill badge-success">✓ Selesai & Lulus</span>' : ''}
          </div>
          <h2 class="ex-title">${ex.title}</h2>
        </div>

        <div class="ex-description">
          ${ex.description}
        </div>

        <div class="ex-testcases-preview">
          <div class="preview-title">Contoh Kasus Uji (${isPy ? 'Python' : 'JavaScript'}):</div>
          <div class="testcases-list">
            ${ex.testCases.map((tc, tcIdx) => `
              <div class="tc-item">
                <span class="tc-desc">Kasus ${tcIdx + 1}: ${escapeHtml(tc.description)}</span>
                <div class="tc-code">
                  <code>Input: ${escapeHtml(JSON.stringify(tc.input.length === 1 ? tc.input[0] : tc.input))}</code> &rarr; 
                  <code>Expected: ${escapeHtml(JSON.stringify(tc.expected))}</code>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <!-- Editor Interaktif Workspace -->
      <div class="code-editor-box">
        <div class="editor-topbar">
          <div class="editor-file-title">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
            <span class="filename">latihan_${idx + 1}.${fileExt}</span>
          </div>
          <div class="editor-actions">
            <button class="btn btn-xs btn-outline" onclick="App.showHint(${idx})">💡 Petunjuk</button>
            <button class="btn btn-xs btn-outline" onclick="App.toggleSolution(${idx})">🔓 Kunci Solusi</button>
            <button class="btn btn-xs btn-outline" onclick="App.resetExerciseCode(${idx})">🔄 Reset</button>
          </div>
        </div>

        <div class="editor-area-wrap">
          <div class="line-numbers" id="editorLineNumbers"></div>
          <textarea id="activeExerciseEditor" class="ide-textarea" spellcheck="false" placeholder="${isPy ? 'Tulis fungsi Python Anda di sini...' : 'Tulis fungsi JavaScript Anda di sini...'}">${escapeHtml(savedDraft)}</textarea>
        </div>

        <div class="editor-statusbar">
          <div class="status-left">
            <span id="editorCharCount">${statusNote}</span>
          </div>
          <div class="status-right">
            <button class="btn btn-secondary" onclick="App.runCurrentExerciseCode()">
              <span>▶️ Jalankan (Console Log)</span>
            </button>
            <button class="btn btn-primary" onclick="App.testCurrentExercise()">
              <span>🧪 Cek Jawaban & Uji Solusi</span>
            </button>
          </div>
        </div>

        <!-- Hint Box -->
        <div class="accordion-box hint-box" id="hintBox" style="display: none;">
          <div class="box-header">💡 Petunjuk Pengerjaan:</div>
          <div class="box-body" id="hintText"></div>
        </div>

        <!-- Solution Box -->
        <div class="accordion-box solution-box" id="solutionBox" style="display: none;">
          <div class="box-header">🔓 Kunci Solusi & Pembahasan (${isPy ? 'Python' : 'JavaScript'}):</div>
          <div class="box-body">
            <pre><code>${escapeHtml(isPy ? ex.solutionPy : ex.solution)}</code></pre>
            <button class="btn btn-xs btn-primary mt-2" onclick="App.applySolution(${idx})">Salin ke Editor</button>
          </div>
        </div>

        <!-- Terminal Output / Test Runner Results -->
        <div class="console-terminal" id="exerciseTerminal">
          <div class="terminal-bar">
            <span>Terminal Output & Hasil Pengujian (${isPy ? 'Python' : 'JavaScript'})</span>
            <button class="terminal-clear-btn" onclick="App.clearTerminal()">Bersihkan</button>
          </div>
          <div class="terminal-body" id="terminalOutput">
            <div class="term-line term-welcome">
              Silakan tulis fungsi Anda pada editor di atas. Tekan <strong>"Cek Jawaban & Uji Solusi"</strong> untuk menguji program secara otomatis.
            </div>
          </div>
        </div>
      </div>
    `;

    setupTextareaEditor();
  }

  function setupTextareaEditor() {
    const textarea = document.getElementById("activeExerciseEditor");
    const lineNums = document.getElementById("editorLineNumbers");
    if (!textarea || !lineNums) return;

    function updateLines() {
      const lines = textarea.value.split("\n").length;
      let lineHtml = "";
      for (let i = 1; i <= Math.max(lines, 12); i++) {
        lineHtml += `<div>${i}</div>`;
      }
      lineNums.innerHTML = lineHtml;
    }

    textarea.addEventListener("input", () => {
      updateLines();
      const ex = PRACTICE_EXERCISES[currentExerciseIndex];
      if (ex) {
        localStorage.setItem(`draft_${currentLanguage}_${ex.id}`, textarea.value);
      }
    });

    textarea.addEventListener("scroll", () => {
      lineNums.scrollTop = textarea.scrollTop;
    });

    setupPythonIndentationForTextarea("activeExerciseEditor");
    updateLines();
  }

  /**
   * Auto-indentasi cerdas (Tab = 4 spasi, Enter otomatis indent)
   */
  function setupPythonIndentationForTextarea(id) {
    const ta = document.getElementById(id);
    if (!ta) return;

    ta.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 4;
        this.dispatchEvent(new Event("input"));
      } else if (e.key === "Enter") {
        const start = this.selectionStart;
        const currentLine = this.value.substring(0, start).split("\n").pop();
        const indentMatch = currentLine.match(/^\s*/);
        let indent = indentMatch ? indentMatch[0] : "";

        if (currentLine.trim().endsWith(":") || currentLine.trim().endsWith("{")) {
          indent += "    ";
        }

        if (indent) {
          e.preventDefault();
          this.value = this.value.substring(0, start) + "\n" + indent + this.value.substring(this.selectionEnd);
          this.selectionStart = this.selectionEnd = start + 1 + indent.length;
          this.dispatchEvent(new Event("input"));
        }
      }
    });
  }

  /**
   * Menjalankan kode latihan di konsol
   */
  async function runCurrentExerciseCode() {
    const ta = document.getElementById("activeExerciseEditor");
    const term = document.getElementById("terminalOutput");
    if (!ta || !term) return;

    const code = ta.value;
    term.innerHTML = `<div class="term-line term-info">⏳ Menjalankan kode Anda...</div>`;

    const res = await CodeRunner.runCode(code, currentLanguage);

    if (res.error) {
      term.innerHTML = `
        <div class="term-line term-error">❌ <strong>Error:</strong></div>
        <div class="term-line term-error">${res.error}</div>
      `;
      return;
    }

    let out = `<div class="term-line term-info">✅ Kode dieksekusi tanpa error syntax.</div>`;
    if (res.logs.length > 0) {
      out += res.logs.map(l => `<div class="term-line log-${l.type}">[Output] ${escapeHtml(l.text)}</div>`).join("");
    } else {
      out += `<div class="term-line term-muted">Tidak ada pesan log/print yang dicetak. (Fungsi berhasil didefinisikan).</div>`;
    }

    term.innerHTML = out;
  }

  /**
   * Menguji Solusi Siswa dengan Test Case
   */
  async function testCurrentExercise() {
    const ta = document.getElementById("activeExerciseEditor");
    const term = document.getElementById("terminalOutput");
    const ex = PRACTICE_EXERCISES[currentExerciseIndex];
    if (!ta || !term || !ex) return;

    const code = ta.value;
    term.innerHTML = `<div class="term-line term-info">🧪 Menjalankan pengujian otomatis untuk ${ex.testCases.length} kasus uji (${currentLanguage.toUpperCase()})...</div>`;

    const res = await CodeRunner.runExerciseTests(code, ex, currentLanguage);

    if (!res.success && res.error) {
      term.innerHTML = `
        <div class="term-line term-error">❌ <strong>Pengujian Gagal:</strong></div>
        <div class="term-line term-error">${res.error}</div>
      `;
      return;
    }

    const { allPassed, results } = res;

    let html = "";
    if (allPassed) {
      html += `
        <div class="test-result-banner pass">
          <div class="banner-icon">🎉</div>
          <div>
            <strong>LUAR BIASA! SEMUA PENGUJIAN LULUS (${results.length}/${results.length})!</strong>
            <div>Solusi Anda tepat, efisien, dan berhasil menyelesaikan tantangan ini.</div>
          </div>
        </div>
      `;

      // Tandai latihan sebagai selesai
      userProgress.completedExercises[ex.id] = true;
      saveProgress();
      renderCodingLab();

    } else {
      html += `
        <div class="test-result-banner fail">
          <div class="banner-icon">⚠️</div>
          <div>
            <strong>BELUM SEMPURNA: Masih ada kasus uji yang belum tepat.</strong>
            <div>Periksa detail di bawah untuk melihat perbedaan antara output Anda dan ekspektasi.</div>
          </div>
        </div>
      `;
    }

    html += `<div class="test-details-list">`;
    results.forEach(tc => {
      html += `
        <div class="tc-result-card ${tc.passed ? 'tc-pass' : 'tc-fail'}">
          <div class="tc-header">
            <span>${tc.passed ? '✅ Lulus' : '❌ Gagal'} - Kasus ${tc.index}: ${escapeHtml(tc.description)}</span>
          </div>
          <div class="tc-body-diff">
            <div class="diff-row"><strong>Input:</strong> <code>${escapeHtml(tc.inputStr)}</code></div>
            <div class="diff-row"><strong>Ekspektasi (Expected):</strong> <code>${escapeHtml(tc.expectedStr)}</code></div>
            <div class="diff-row"><strong>Hasil Kode Anda:</strong> <code class="${tc.passed ? 'text-success' : 'text-danger'}">${escapeHtml(tc.actualStr)}</code></div>
            ${tc.error ? `<div class="diff-row text-danger"><strong>Error Runtime:</strong> ${escapeHtml(tc.error)}</div>` : ''}
          </div>
        </div>
      `;
    });
    html += `</div>`;

    term.innerHTML = html;
  }

  function showHint(idx) {
    const ex = PRACTICE_EXERCISES[idx];
    const box = document.getElementById("hintBox");
    const text = document.getElementById("hintText");
    if (!box || !text) return;

    if (box.style.display === "none") {
      box.style.display = "block";
      text.innerHTML = ex.hint;
    } else {
      box.style.display = "none";
    }
  }

  function toggleSolution(idx) {
    const box = document.getElementById("solutionBox");
    if (!box) return;
    box.style.display = box.style.display === "none" ? "block" : "none";
  }

  function applySolution(idx) {
    const ex = PRACTICE_EXERCISES[idx];
    const ta = document.getElementById("activeExerciseEditor");
    if (ta && ex) {
      if (confirm(`Apakah Anda ingin mengganti koding di editor dengan kunci jawaban ${currentLanguage.toUpperCase()}?`)) {
        ta.value = currentLanguage === "py" ? ex.solutionPy : ex.solution;
        ta.dispatchEvent(new Event("input"));
      }
    }
  }

  function resetExerciseCode(idx) {
    const ex = PRACTICE_EXERCISES[idx];
    const ta = document.getElementById("activeExerciseEditor");
    if (ta && ex) {
      if (confirm(`Kembalikan kode ke template awal ${currentLanguage.toUpperCase()}?`)) {
        ta.value = currentLanguage === "py" ? ex.starterCodePy : ex.starterCode;
        localStorage.removeItem(`draft_${currentLanguage}_${ex.id}`);
        ta.dispatchEvent(new Event("input"));
      }
    }
  }

  function clearTerminal() {
    const term = document.getElementById("terminalOutput");
    if (term) term.innerHTML = `<div class="term-line term-muted">Terminal dibersihkan.</div>`;
  }

  /**
   * PLAYGROUND / SANDBOX MANDIRI
   */
  function initPlayground() {
    setupPythonIndentationForTextarea("sandboxEditor");
  }

  function openSandbox() {
    const modal = document.getElementById("sandboxModal");
    if (modal) modal.classList.add("open");
  }

  function closeSandbox() {
    const modal = document.getElementById("sandboxModal");
    if (modal) modal.classList.remove("open");
  }

  async function runSandboxCode() {
    const ta = document.getElementById("sandboxEditor");
    const out = document.getElementById("sandboxOutput");
    if (!ta || !out) return;

    out.innerHTML = `<div class="term-line term-info">⏳ Mengeksekusi program...</div>`;
    const res = await CodeRunner.runCode(ta.value, currentLanguage);

    if (res.error) {
      out.innerHTML = `<div class="term-line term-error">❌ ${res.error}</div>`;
      return;
    }

    if (res.logs.length === 0) {
      out.innerHTML = `<div class="term-line term-muted">(Program berjalan selesai tanpa pesan output/print)</div>`;
      return;
    }

    let str = res.logs.map(l => `<div class="term-line log-log">${escapeHtml(l.text)}</div>`).join("");
    out.innerHTML = str;
  }

  /**
   * E-SERTIFIKAT KELULUSAN
   */
  function openCertificateModal() {
    const modal = document.getElementById("certificateModal");
    const nameInput = document.getElementById("certStudentNameInput");
    if (nameInput) nameInput.value = userProgress.studentName || "Siswa Berbakat";

    updateCertificatePreview();
    if (modal) modal.classList.add("open");
  }

  function closeCertificateModal() {
    const modal = document.getElementById("certificateModal");
    if (modal) modal.classList.remove("open");
  }

  function updateCertificatePreview() {
    const nameInput = document.getElementById("certStudentNameInput");
    const display = document.getElementById("certDisplayName");
    const dateDisplay = document.getElementById("certDate");

    const name = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : "Siswa Berbakat";
    userProgress.studentName = name;
    saveProgress();

    if (display) display.textContent = name;
    if (dateDisplay) {
      const now = new Date();
      const options = { day: "numeric", month: "long", year: "numeric" };
      dateDisplay.textContent = now.toLocaleDateString("id-ID", options);
    }
  }

  function printCertificate() {
    window.print();
  }

  /**
   * Manajemen Sidebar Responsif (Mobile Drawer)
   */
  function toggleSidebar() {
    const sidebar = document.getElementById("curriculumSidebar");
    const backdrop = document.getElementById("sidebarBackdrop");
    if (!sidebar) return;
    const isOpen = sidebar.classList.contains("open");
    if (isOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  function openSidebar() {
    const sidebar = document.getElementById("curriculumSidebar");
    const backdrop = document.getElementById("sidebarBackdrop");
    if (sidebar) sidebar.classList.add("open");
    if (backdrop) backdrop.classList.add("open");
    if (window.innerWidth <= 1024) {
      document.body.style.overflow = "hidden";
    }
  }

  function closeSidebar() {
    const sidebar = document.getElementById("curriculumSidebar");
    const backdrop = document.getElementById("sidebarBackdrop");
    if (sidebar) sidebar.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }

  /**
   * Modal Panduan Membuka di Handphone
   */
  function openMobileGuide() {
    closeSidebar();
    const modal = document.getElementById("mobileGuideModal");
    const input = document.getElementById("mobileAccessUrl");
    if (input) {
      let host = window.location.hostname;
      let port = window.location.port ? `:${window.location.port}` : "";
      let path = window.location.pathname;
      if (host === "localhost" || host === "127.0.0.1" || !host) {
        input.value = `http://10.1.63.35${port || ''}${path || '/belajar'}`;
      } else {
        input.value = `${window.location.protocol}//${host}${port}${path}`;
      }
    }
    if (modal) modal.classList.add("open");
  }

  function closeMobileGuide() {
    const modal = document.getElementById("mobileGuideModal");
    if (modal) modal.classList.remove("open");
  }

  async function copyMobileUrl() {
    const input = document.getElementById("mobileAccessUrl");
    const btnText = document.getElementById("copyUrlBtnText");
    if (!input) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(input.value);
      } else {
        input.select();
        document.execCommand("copy");
      }
      if (btnText) {
        const old = btnText.textContent;
        btnText.textContent = "✅ Berhasil Disalin!";
        setTimeout(() => {
          btnText.textContent = old;
        }, 2000);
      }
    } catch (e) {
      input.select();
      document.execCommand("copy");
      if (btnText) {
        btnText.textContent = "✅ Berhasil Disalin!";
        setTimeout(() => {
          btnText.textContent = "📋 Salin URL";
        }, 2000);
      }
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
    init,
    toggleTheme,
    setLanguage,
    loadModule,
    toggleSidebar,
    openSidebar,
    closeSidebar,
    openMobileGuide,
    closeMobileGuide,
    copyMobileUrl,
    runCobaSendiri,
    toggleCobaSendiriHint,
    resetCobaSendiri,
    loadExercise,
    runCurrentExerciseCode,
    testCurrentExercise,
    showHint,
    toggleSolution,
    applySolution,
    resetExerciseCode,
    clearTerminal,
    openSandbox,
    closeSandbox,
    runSandboxCode,
    openCertificateModal,
    closeCertificateModal,
    updateCertificatePreview,
    printCertificate
  };
})();

// Jalankan ketika DOM siap
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
