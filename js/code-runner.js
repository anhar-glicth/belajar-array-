/**
 * code-runner.js
 * Dual-Engine Code Execution: JavaScript & Python (via Skulpt)
 * Mendukung eksekusi console log / print, proteksi loop, dan automated unit tests.
 */

const CodeRunner = (function () {
  let currentLanguage = "js"; // Default language

  function setLanguage(lang) {
    currentLanguage = lang;
  }

  function getLanguage() {
    return currentLanguage;
  }

  // Helper untuk membaca file stdlib Skulpt Python
  function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
      throw "File not found: '" + x + "'";
    }
    return Sk.builtinFiles["files"][x];
  }

  /**
   * Terjemahan pesan error ramah pemula
   */
  function translateError(errStr, lang) {
    if (!errStr) return "Terjadi kesalahan pada program.";
    let tips = "";

    if (lang === "py") {
      if (errStr.includes("IndentationError")) {
        tips = "\n💡 <strong>Saran Pemula:</strong> Kesalahan Indentasi (spasi/tab)! Di Python, setiap blok kode di dalam <code>if</code>, <code>else</code>, <code>for</code>, atau <code>def</code> harus menjorok ke dalam (4 spasi).";
      } else if (errStr.includes("SyntaxError")) {
        tips = "\n💡 <strong>Saran Pemula:</strong> Ada kesalahan sintaksis Python. Periksa apakah Anda lupa menuliskan tanda titik dua (<code>:</code>) di akhir baris <code>if</code>, <code>else</code>, <code>for</code>, atau <code>def</code>.";
      } else if (errStr.includes("IndexError")) {
        tips = "\n💡 <strong>Saran Pemula:</strong> Indeks List di luar batas (list index out of range). Anda mencoba mengakses nomor indeks yang tidak ada.";
      } else if (errStr.includes("NameError")) {
        tips = "\n💡 <strong>Saran Pemula:</strong> Variabel atau fungsi tidak dikenali. Periksa apakah ada salah ketik huruf besar/kecil.";
      }
    } else {
      if (errStr.includes("is not defined")) {
        tips = "\n💡 <strong>Saran Pemula:</strong> Variabel belum dideklarasikan dengan <code>let</code> atau ada salah ketik nama variabel.";
      } else if (errStr.includes("Unexpected token")) {
        tips = "\n💡 <strong>Saran Pemula:</strong> Kesalahan tanda baca (tanda kurung <code>()</code>, kurung kurawal <code>{}</code>, atau titik koma).";
      } else if (errStr.includes("Cannot read properties of undefined")) {
        tips = "\n💡 <strong>Saran Pemula:</strong> Anda mencoba membaca indeks array yang melebihi batas (<code>array.length</code>).";
      }
    }

    return errStr + tips;
  }

  /**
   * Menjalankan kode bebas (JavaScript atau Python)
   */
  async function runCode(code, lang = currentLanguage) {
    if (lang === "py") {
      return runPythonCode(code);
    } else {
      return runJavaScriptCode(code);
    }
  }

  /**
   * Eksekusi JavaScript via Safe Worker / Eval
   */
  function runJavaScriptCode(code) {
    return new Promise((resolve) => {
      const logs = [];
      const originalLog = console.log;
      const originalWarn = console.warn;
      const originalError = console.error;

      function serializeArg(arg) {
        if (arg === undefined) return "undefined";
        if (arg === null) return "null";
        if (typeof arg === "object") {
          try { return JSON.stringify(arg); } catch (e) { return String(arg); }
        }
        return String(arg);
      }

      console.log = function (...args) {
        logs.push({ type: "log", text: args.map(serializeArg).join(" ") });
        originalLog.apply(console, args);
      };
      console.warn = function (...args) {
        logs.push({ type: "warn", text: args.map(serializeArg).join(" ") });
        originalWarn.apply(console, args);
      };
      console.error = function (...args) {
        logs.push({ type: "error", text: args.map(serializeArg).join(" ") });
        originalError.apply(console, args);
      };

      try {
        const result = (new Function(code))();
        console.log = originalLog;
        console.warn = originalWarn;
        console.error = originalError;

        resolve({
          success: true,
          logs: logs,
          returnValue: result !== undefined ? serializeArg(result) : null,
          error: null
        });
      } catch (err) {
        console.log = originalLog;
        console.warn = originalWarn;
        console.error = originalError;

        resolve({
          success: false,
          logs: logs,
          error: translateError(err.name + ": " + err.message, "js")
        });
      }
    });
  }

  /**
   * Eksekusi Python via Skulpt
   */
  function runPythonCode(pythonCode) {
    return new Promise((resolve) => {
      let outputBuffer = [];

      Sk.configure({
        output: function (text) {
          outputBuffer.push(text);
        },
        read: builtinRead,
        execLimit: 3000
      });

      const promise = Sk.misceval.asyncToPromise(function () {
        return Sk.importMainWithBody("<stdin>", false, pythonCode, true);
      });

      promise.then(
        function () {
          const rawOutput = outputBuffer.join("").trimEnd();
          const logs = rawOutput ? rawOutput.split("\n").map(line => ({ type: "log", text: line })) : [];
          resolve({
            success: true,
            logs: logs,
            error: null
          });
        },
        function (err) {
          resolve({
            success: false,
            logs: outputBuffer.join("").trimEnd().split("\n").filter(Boolean).map(l => ({ type: "log", text: l })),
            error: translateError(err.toString(), "py")
          });
        }
      );
    });
  }

  /**
   * Menjalankan unit test untuk Latihan Praktik
   */
  async function runExerciseTests(code, exercise, lang = currentLanguage) {
    if (lang === "py") {
      return runPythonExerciseTests(code, exercise);
    } else {
      return runJavaScriptExerciseTests(code, exercise);
    }
  }

  function runJavaScriptExerciseTests(code, exercise) {
    return new Promise((resolve) => {
      const logs = [];
      const funcName = exercise.starterCode.match(/function\s+([a-zA-Z0-9_$]+)/) ? exercise.starterCode.match(/function\s+([a-zA-Z0-9_$]+)/)[1] : "";

      try {
        const userScope = new Function(code + `\n; return typeof ${funcName} === 'function' ? ${funcName} : null;`);
        const targetFunc = userScope();

        if (!targetFunc) {
          resolve({
            success: false,
            logs: [],
            error: `Fungsi bernama '${funcName}' tidak ditemukan. Pastikan Anda tidak mengubah nama fungsinya!`
          });
          return;
        }

        let allPassed = true;
        const results = [];

        for (let i = 0; i < exercise.testCases.length; i++) {
          const tc = exercise.testCases[i];
          const inputArgs = JSON.parse(JSON.stringify(tc.input));
          let actual;
          let runError = null;

          try {
            actual = targetFunc.apply(null, inputArgs);
          } catch (e) {
            runError = e.name + ": " + e.message;
          }

          const expected = tc.expected;
          let passed = false;

          if (!runError) {
            passed = JSON.stringify(actual) === JSON.stringify(expected);
          }
          if (!passed) allPassed = false;

          results.push({
            index: i + 1,
            description: tc.description,
            inputStr: JSON.stringify(tc.input.length === 1 ? tc.input[0] : tc.input),
            expectedStr: JSON.stringify(expected),
            actualStr: runError ? "[Error: " + runError + "]" : JSON.stringify(actual),
            passed: passed,
            error: runError
          });
        }

        resolve({
          success: true,
          allPassed: allPassed,
          results: results,
          logs: logs,
          error: null
        });

      } catch (err) {
        resolve({
          success: false,
          logs: logs,
          error: translateError(err.name + ": " + err.message, "js")
        });
      }
    });
  }

  function runPythonExerciseTests(studentPythonCode, exercise) {
    return new Promise((resolve) => {
      let outputBuffer = [];
      const funcMatch = exercise.starterCodePy ? exercise.starterCodePy.match(/def\s+([a-zA-Z0-9_]+)\s*\(/) : null;
      const funcName = funcMatch ? funcMatch[1] : (exercise.starterCode.match(/def\s+([a-zA-Z0-9_]+)\s*\(/) ? exercise.starterCode.match(/def\s+([a-zA-Z0-9_]+)\s*\(/)[1] : "target_function");

      Sk.configure({
        output: function (text) {
          outputBuffer.push(text);
        },
        read: builtinRead,
        execLimit: 3500
      });

      const promise = Sk.misceval.asyncToPromise(function () {
        return Sk.importMainWithBody("<stdin>", false, studentPythonCode, true);
      });

      promise.then(
        function (module) {
          const pyFunc = module.$d[funcName];
          if (!pyFunc) {
            resolve({
              success: false,
              logs: outputBuffer.join("").split("\n").filter(Boolean).map(l => ({ type: "log", text: l })),
              error: `Fungsi '${funcName}' tidak ditemukan. Pastikan Anda tidak mengubah baris 'def ${funcName}'!`
            });
            return;
          }

          let allPassed = true;
          const results = [];

          for (let i = 0; i < exercise.testCases.length; i++) {
            const tc = exercise.testCases[i];
            const inputArgs = JSON.parse(JSON.stringify(tc.input));
            let actualJs;
            let runError = null;

            try {
              const pyArgs = inputArgs.map(arg => Sk.ffi.remapToPy(arg));
              const pyResult = Sk.misceval.callsimArray(pyFunc, pyArgs);
              actualJs = Sk.ffi.remapToJs(pyResult);
            } catch (e) {
              runError = e.toString();
            }

            const expected = tc.expected;
            let passed = false;

            if (!runError) {
              passed = JSON.stringify(actualJs) === JSON.stringify(expected);
            }
            if (!passed) allPassed = false;

            results.push({
              index: i + 1,
              description: tc.description,
              inputStr: JSON.stringify(tc.input.length === 1 ? tc.input[0] : tc.input),
              expectedStr: JSON.stringify(expected),
              actualStr: runError ? "[Error: " + runError + "]" : JSON.stringify(actualJs),
              passed: passed,
              error: runError
            });
          }

          const rawUserPrints = outputBuffer.join("").trim();
          const logs = rawUserPrints ? rawUserPrints.split("\n").map(l => ({ type: "log", text: l })) : [];

          resolve({
            success: true,
            allPassed: allPassed,
            results: results,
            logs: logs,
            error: null
          });
        },
        function (err) {
          resolve({
            success: false,
            logs: outputBuffer.join("").split("\n").filter(Boolean).map(l => ({ type: "log", text: l })),
            error: translateError(err.toString(), "py")
          });
        }
      );
    });
  }

  return {
    runCode,
    runExerciseTests,
    setLanguage,
    getLanguage
  };
})();
