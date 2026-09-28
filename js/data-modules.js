/**
 * data-modules.js
 * Modul Pembelajaran Interaktif Resmi:
 * 1. Dasar Array
 * 2. Nested If
 * 3. Nested Loop
 * 4. Latihan Praktik
 * 5. Algoritma Pencarian (Sequential Search)
 */

const CURRICULUM_DATA = [
  {
    id: "modul-1",
    badge: "1. Dasar Array",
    title: "Dasar Array",
    subtitle: "Memahami struktur data array, indeks, perulangan for, dan array 2 dimensi (matriks)",
    readTime: "10 menit baca & praktik",
    summary: "Array adalah wadah untuk menyimpan banyak nilai dalam satu variabel, disusun berurutan berdasarkan index. Index dimulai dari 0, bukan 1.",
    sections: [
      {
        heading: "Dasar Array",
        content: `
          <p><strong>Array</strong> adalah wadah untuk menyimpan banyak nilai dalam satu variabel, disusun berurutan berdasarkan index. Index di <span class="lang-text" data-lang-js="JavaScript" data-lang-py="Python">JavaScript</span> dimulai dari <strong>0, bukan 1</strong>.</p>
          <div class="alert-box tip">
            <span class="icon">💡</span>
            <div><strong>Analogi Loker Bernomor:</strong> Bayangkan sebuah loker penyimpanan. Kotak pertama diberi nomor <code>0</code>, kotak kedua diberi nomor <code>1</code>, kotak ketiga diberi nomor <code>2</code>, dan seterusnya.</div>
          </div>
        `
      },
      {
        heading: "2. Membuat & Mengakses Array",
        content: `
          <p>Berikut cara membuat dan membaca elemen array:</p>
          <div class="code-preview">
            <pre><code class="lang-code-block" data-lang="js">let buah = ["Apel", "Jeruk", "Mangga"];
console.log(buah[0]); // Apel  -> index ke-0
console.log(buah[2]); // Mangga -> index ke-2
console.log(buah.length); // 3 -> jumlah elemen</code>
<code class="lang-code-block" data-lang="py" style="display:none;">buah = ["Apel", "Jeruk", "Mangga"]
print(buah[0])       # Apel  -> index ke-0
print(buah[2])       # Mangga -> index ke-2
print(len(buah))     # 3 -> jumlah elemen</code></pre>
          </div>
        `
      },
      {
        heading: "3. Mengulang Isi Array dengan For",
        content: `
          <p>Untuk membaca seluruh isi array secara otomatis dari elemen pertama hingga terakhir, gunakan perulangan <code>for</code>:</p>
          <div class="code-preview">
            <pre><code class="lang-code-block" data-lang="js">let nilai = [80, 90, 75, 60];
for (let i = 0; i < nilai.length; i++) {
  console.log("Data ke-" + (i + 1) + ": " + nilai[i]);
}</code>
<code class="lang-code-block" data-lang="py" style="display:none;">nilai = [80, 90, 75, 60]
for i in range(len(nilai)):
    print("Data ke-" + str(i + 1) + ": " + str(nilai[i]))</code></pre>
          </div>
        `
      },
      {
        heading: "4. Array 2 Dimensi (Matriks)",
        content: `
          <p><strong>Array 2 Dimensi (Matriks)</strong> adalah array di dalam array yang memiliki baris dan kolom:</p>
          <div class="code-preview">
            <pre><code class="lang-code-block" data-lang="js">let matriks = [
  [1, 2, 3],
  [4, 5, 6]
];
console.log(matriks[0][2]); // 3 -> baris 0, kolom 2
console.log(matriks[1][0]); // 4 -> baris 1, kolom 0</code>
<code class="lang-code-block" data-lang="py" style="display:none;">matriks = [
    [1, 2, 3],
    [4, 5, 6]
]
print(matriks[0][2]) # 3 -> baris 0, kolom 2
print(matriks[1][0]) # 4 -> baris 1, kolom 0</code></pre>
          </div>
        `
      },
      {
        heading: "5. Operasi Penjumlahan dalam Array",
        content: `
          <p>Kita dapat melakukan operasi aritmatika langsung antar elemen array:</p>
          <div class="code-preview">
            <pre><code class="lang-code-block" data-lang="js">let A = [10, 2, 30, 4];
let Jumlah = A[1] + A[3];
console.log("Jumlah = A[1] + A[3] -> " + Jumlah); // 2 + 4 = 6</code>
<code class="lang-code-block" data-lang="py" style="display:none;">A = [10, 2, 30, 4]
Jumlah = A[1] + A[3]
print("Jumlah = A[1] + A[3] -> " + str(Jumlah)) # 2 + 4 = 6</code></pre>
          </div>
        `
      }
    ],
    interactiveTool: "1d-visualizer",
    cobaSendiri: {
      id: "coba_siswa",
      title: "Cetak semua nama siswa",
      description: "Buat array siswa berisi 5 nama, lalu cetak dengan format <code>1. Nama</code> menggunakan for loop.",
      starterCodeJs: `let siswa = ["Andi", "Budi", "Citra", "Dewi", "Eka"];

// tulis kode kamu di sini
for (let i = 0; i < siswa.length; i++) {
  console.log((i + 1) + ". " + siswa[i]);
}`,
      starterCodePy: `siswa = ["Andi", "Budi", "Citra", "Dewi", "Eka"]

# tulis kode kamu di sini
for i in range(len(siswa)):
    print(str(i + 1) + ". " + siswa[i])`,
      hint: "Gunakan perulangan for dengan variabel `i` dari 0 sampai panjang array. Cetak nomor urut `(i + 1)` diikuti nama siswa `siswa[i]`."
    }
  },

  {
    id: "modul-2",
    badge: "2. Nested If",
    title: "Nested If (Pengondisian Bertingkat)",
    subtitle: "Satu pernyataan if berada di dalam blok if atau else lainnya untuk pengambilan keputusan kompleks",
    readTime: "12 menit baca & praktik",
    summary: "Nested if memungkinkan pengambilan keputusan berlapis ketika sebuah keputusan bergantung pada hasil keputusan sebelumnya. Pelajari cara kerja, algoritma predikat nilai akhir, dan sistem rule-based.",
    sections: [
      {
        heading: "1. Pengertian & Cara Kerja Nested If",
        content: `
          <p><strong>Nested if</strong> adalah sebuah struktur pengondisian di dalam pemrograman. Satu pernyataan <code>if</code> berada di dalam blok <code>if</code> atau <code>else</code> lainnya, sehingga memungkinkan pengambilan keputusan yang lebih kompleks dan bertingkat.</p>
          <p>Struktur ini berguna ketika sebuah keputusan bergantung pada hasil dari keputusan sebelumnya.</p>
          <div class="alert-box tip">
            <span class="icon">🔄</span>
            <div><strong>Cara Kerja:</strong> Ketika program menemukan pernyataan if, program memeriksa apakah kondisi tersebut benar atau salah. Jika benar, kode di dalam blok if dijalankan. Jika di dalamnya terdapat if lain, program lanjut memeriksa kondisi baru tersebut. Jika kondisi awal tidak terpenuhi, program beralih ke blok else.</div>
          </div>
        `
      },
      {
        heading: "2. Bentuk Algoritma Nested If",
        content: `
          <div class="code-preview">
            <pre><code>if (kondisi pertama) then
    if (kondisi kedua) then
        ……………..
        ……………..
    endIf
endIf</code></pre>
          </div>
        `
      },
      {
        heading: "3. Contoh Algoritma Prediksi Nilai Akhir",
        content: `
          <div class="code-preview">
            <pre><code class="lang-code-block" data-lang="js">let nilai = 82;
let predikat = "";

if (nilai >= 90) {
  predikat = "A";
} else if (nilai >= 75) {
  predikat = "B";
} else if (nilai >= 60) {
  predikat = "C";
} else {
  predikat = "D";
}

console.log("Predikat nilai: " + predikat); // Output: B</code>
<code class="lang-code-block" data-lang="py" style="display:none;">nilai = 82

if nilai >= 90:
    predikat = "A"
elif nilai >= 75:
    predikat = "B"
elif nilai >= 60:
    predikat = "C"
else:
    predikat = "D"

print("Predikat nilai: " + predikat) # Output: B</code></pre>
          </div>
        `
      },
      {
        heading: "4. Algoritma Rule-Based Kecerdasan Artifisial",
        content: `
          <p>Sistem berbasis aturan (<em>Rule-Based AI</em>) menggunakan struktur nested if bertingkat untuk mengambil keputusan medis berdasarkan suhu badan, gejala batuk, dan sakit kepala:</p>
          <div class="code-preview">
            <pre><code class="lang-code-block" data-lang="js">let suhubadan = 38.2;
let batuk = "ya";
let sakitkepala = "ya";

if (suhubadan > 37.5) {
  if (batuk === "ya") {
    if (sakitkepala === "ya") {
      console.log("Diagnosa: Flu atau Infeksi Virus");
    } else {
      console.log("Diagnosa: Demam dan Batuk");
    }
  } else {
    if (sakitkepala === "ya") {
      console.log("Diagnosa: Demam biasa");
    } else {
      console.log("Diagnosa: Demam ringan");
    }
  }
} else {
  console.log("Kondisi suhu normal.");
}</code>
<code class="lang-code-block" data-lang="py" style="display:none;">suhubadan = 38.2
batuk = "ya"
sakitkepala = "ya"

if suhubadan > 37.5:
    if batuk == "ya":
        if sakitkepala == "ya":
            print("Diagnosa: Flu atau Infeksi Virus")
        else:
            print("Diagnosa: Demam dan Batuk")
    else:
        if sakitkepala == "ya":
            print("Diagnosa: Demam biasa")
        else:
            print("Diagnosa: Demam ringan")
else:
    print("Kondisi suhu normal.")</code></pre>
          </div>
        `
      }
    ],
    interactiveTool: "nested-if-simulator",
    cobaSendiri: {
      id: "coba_nested_if",
      title: "Coba sendiri: Pengecekan Kelulusan Bertingkat",
      description: "Cek kelulusan peserta: jika kehadiran >= 80%, periksa nilai jika >= 75 maka 'LULUS', selain itu 'TIDAK LULUS'.",
      starterCodeJs: `let nilai = 85;
let kehadiran = 90;

// Gunakan Nested If:
if (kehadiran >= 80) {
  if (nilai >= 75) {
    console.log("Status: LULUS!");
  } else {
    console.log("Status: TIDAK LULUS (Nilai kurang)");
  }
} else {
  console.log("Status: TIDAK LULUS (Kehadiran kurang)");
}`,
      starterCodePy: `nilai = 85
kehadiran = 90

# Gunakan Nested If di Python:
if kehadiran >= 80:
    if nilai >= 75:
        print("Status: LULUS!")
    else:
        print("Status: TIDAK LULUS (Nilai kurang)")
else:
    print("Status: TIDAK LULUS (Kehadiran kurang)")`,
      hint: "Periksa `kehadiran >= 80` di tingkat luar. Di dalam bloknya, buat kondisi kedua `if (nilai >= 75)` untuk menentukan status kelulusan."
    }
  },

  {
    id: "modul-3",
    badge: "3. Nested Loop",
    title: "Nested Loop (Pengulangan Bersarang)",
    subtitle: "Satu pengulangan di dalam pengulangan lainnya untuk tabel perkalian, matriks, searching, dan sorting",
    readTime: "15 menit baca & praktik",
    summary: "Saat loop luar berjalan sekali, loop dalam berjalan sepenuhnya sebelum loop luar berlanjut. Pelajari penerapannya pada tabel perkalian, matriks 2D, sequential search, dan sorting.",
    sections: [
      {
        heading: "1. Pengertian & Cara Kerja Nested Loop",
        content: `
          <p><strong>Pengulangan bersarang atau nested loop</strong> adalah struktur kontrol yang terdiri atas satu pengulangan (loop) di dalam pengulangan lainnya.</p>
          <p>Saat loop luar berjalan sekali, loop dalam akan berjalan sepenuhnya sebelum loop luar melanjutkan ke iterasi berikutnya.</p>
          <div class="code-preview">
            <pre><code>for i = 1 to n do
    for j = 1 to n do
        ……………..
        ……………..
    endFor
endFor</code></pre>
          </div>
        `
      },
      {
        heading: "2. Contoh: Algoritma Cetak Tabel Perkalian",
        content: `
          <p>Mencetak hasil perkalian dari 1 hingga 3 terhadap 1 hingga 5 menghasilkan:</p>
          <div class="table-responsive">
            <table class="modern-table" style="text-align: center;">
              <tbody>
                <tr><td><strong>1</strong></td><td>2</td><td>3</td><td>4</td><td>5</td></tr>
                <tr><td><strong>2</strong></td><td>4</td><td>6</td><td>8</td><td>10</td></tr>
                <tr><td><strong>3</strong></td><td>6</td><td>9</td><td>12</td><td>15</td></tr>
              </tbody>
            </table>
          </div>
          <div class="code-preview">
            <pre><code class="lang-code-block" data-lang="js">for (let i = 1; i <= 3; i++) {
  let baris = "";
  for (let j = 1; j <= 5; j++) {
    let hasil = i * j;
    baris += hasil + " ";
  }
  console.log(baris);
}</code>
<code class="lang-code-block" data-lang="py" style="display:none;">for i in range(1, 4):
    baris = ""
    for j in range(1, 6):
        hasil = i * j
        baris += str(hasil) + " "
    print(baris)</code></pre>
          </div>
        `
      },
      {
        heading: "3. Penelusuran Matriks 2 Dimensi (Baris & Kolom)",
        content: `
          <p>Kombinasi nested loop sangat ampuh untuk membaca koordinat matriks 2 dimensi baris demi baris:</p>
          <div class="code-preview">
            <pre><code class="lang-code-block" data-lang="js">let matriks = [
  [10, 20, 30],
  [40, 50, 60]
];

for (let i = 0; i < matriks.length; i++) {
  for (let j = 0; j < matriks[i].length; j++) {
    console.log("Matriks [" + i + "][" + j + "] = " + matriks[i][j]);
  }
}</code>
<code class="lang-code-block" data-lang="py" style="display:none;">matriks = [
    [10, 20, 30],
    [40, 50, 60]
]

for i in range(len(matriks)):
    for j in range(len(matriks[i])):
        print("Matriks [" + str(i) + "][" + str(j) + "] = " + str(matriks[i][j]))</code></pre>
          </div>
        `
      },
      {
        heading: "4. Algoritma Searching & Sorting pada Array",
        content: `
          <p><strong>Sequential Search:</strong> Memeriksa elemen satu per satu dari awal sampai ketemu.</p>
          <p><strong>Binary Search:</strong> Membagi dua array secara berulang pada data yang sudah terurut.</p>
          <p><strong>Selection Sort:</strong> Memilih elemen terkecil lalu menukarnya ke posisi awal.</p>
          <p><strong>Insertion Sort:</strong> Menyisipkan elemen ke posisi yang tepat seperti menyusun kartu di tangan.</p>
        `
      }
    ],
    interactiveTool: "nested-loop-visualizer",
    cobaSendiri: {
      id: "coba_perkalian",
      title: "Coba sendiri: Cetak Pola Perkalian",
      description: "Gunakan nested loop for i dan for j untuk mencetak tabel perkalian 1 s.d. 3 dikali 1 s.d. 3.",
      starterCodeJs: `for (let i = 1; i <= 3; i++) {
  let baris = "";
  for (let j = 1; j <= 3; j++) {
    baris += (i * j) + " ";
  }
  console.log(baris);
}`,
      starterCodePy: `for i in range(1, 4):
    baris = ""
    for j in range(1, 4):
        baris += str(i * j) + " "
    print(baris)`,
      hint: "Outer loop `for i` mengontrol baris dari 1 sampai 3. Inner loop `for j` mengontrol kolom dari 1 sampai 3. Cetak hasil perkalian `i * j`."
    }
  },

  {
    id: "modul-4",
    badge: "4. Latihan Praktik",
    title: "Latihan Praktik Koding",
    subtitle: "Praktekkan langsung keahlian koding Anda dengan sistem verifikasi otomatis!",
    readTime: "Praktik Mengetik & Uji Solusi",
    summary: "Selesaikan 6 tantangan koding terstruktur: operasi array, evaluasi kelulusan nested if, predikat nilai, tabel perkalian matriks, sequential search, dan sistem rule-based diagnosis AI.",
    sections: [
      {
        heading: "Ayo Berlatih! Ruang Latihan Koding Mandiri",
        content: `
          <p>Pilih nomor latihan di bawah ini untuk mulai mengetik kode Anda dan mengujinya dengan tombol <strong>"🧪 Cek Jawaban & Uji Solusi"</strong>:</p>
          <ul>
            <li><strong>Latihan 1:</strong> Operasi Penjumlahan dalam Array</li>
            <li><strong>Latihan 2:</strong> Evaluasi Kelulusan Siswa (Nested If)</li>
            <li><strong>Latihan 3:</strong> Algoritma Predikat Nilai Akhir</li>
            <li><strong>Latihan 4:</strong> Nested Loop Cetak Tabel Perkalian Matriks</li>
            <li><strong>Latihan 5:</strong> Algoritma Pencarian Sequential Search pada Array</li>
            <li><strong>Latihan 6:</strong> Algoritma Rule-Based Diagnosa Kesehatan AI</li>
            <li><strong>Latihan 7:</strong> Algoritma Pencarian Binary Search pada Array Terurut</li>
            <li><strong>Latihan 8:</strong> Algoritma Pengurutan Selection Sort pada Array</li>
          </ul>
        `
      }
    ],
    interactiveTool: "coding-lab"
  },

  {
    id: "modul-searching",
    badge: "5. Sequential Search",
    title: "Algoritma Pencarian - Sequential Search (Linear Search)",
    subtitle: "Sequential Search (Linear Search) memeriksa elemen array satu per satu dari indeks pertama sampai dengan elemen terakhir",
    readTime: "12 menit baca & praktik",
    summary: "Sequential Search atau Linear Search adalah algoritma pencarian dengan memeriksa elemen array satu per satu dari indeks ke-0 hingga indeks terakhir. Pencarian berhasil saat elemen sama dengan nilai x yang dicari.",
    sections: [
      {
        heading: "1. Pengertian Sequential Search (Linear Search)",
        content: `
          <p><strong>Sequential search</strong> atau sering disebut juga sebagai <strong>linear search</strong> adalah salah satu algoritma pencarian paling sederhana yang digunakan untuk mencari suatu elemen dalam sebuah struktur data seperti array.</p>
          <p>Algoritma ini bekerja dengan cara memeriksa elemen <strong>satu per satu</strong>, dimulai dari indeks pertama sampai dengan elemen terakhir.</p>
          <div class="alert-box tip">
            <span class="icon">🔍</span>
            <div><strong>Cara Kerja:</strong> Pencarian dimulai dengan membandingkan elemen pertama dengan nilai yang dicari. Jika berhasil, maka pencarian selesai. Jika tidak, algoritma melanjutkan ke elemen berikutnya dan mengulangi proses tersebut sampai dengan indeks terakhir. Jika sampai dengan indeks terakhir tidak ditemukan, maka hasilnya adalah <em>&ldquo;tidak ditemukan&rdquo;</em>.</div>
          </div>
        `
      },
      {
        heading: "2. Contoh & Notasi Algoritma SequentialSearch",
        content: `
          <p>Jika diketahui ketentuan data sebagai berikut:</p>
          <ul>
            <li><strong>Data array:</strong> <code>A = [1, 5, 10, 7, 15]</code></li>
            <li><strong>n</strong> adalah banyaknya data, yaitu <code>5</code>.</li>
            <li><strong>x</strong> adalah nilai yang dicari.</li>
            <li><strong>i</strong> adalah indeks array.</li>
            <li><strong>posisi</strong> adalah posisi elemen array.</li>
          </ul>

          <div class="code-preview">
            <pre><code>Algoritma SequentialSearch
Kamus
  A : array of integer
  n : integer
  x : integer // nilai yang dicari
  i : integer // indeks array
  posisi : integer
Deskripsi
  // Data A
  A[0] = 1
  A[1] = 5
  A[2] = 10
  A[3] = 7
  A[4] = 15
  // Jumlah Elemen A
  n = 5
  Output("Nilai yang dicari?")
  Input(x)
  posisi = -1
  for i = 0 to n - 1 do
      if A[i] = x then
          posisi = i
          Output("Ketemu, nilai yang dicari berada pada indeks ke-", posisi)
          break
      endIf
  endFor
  if posisi = -1 then
      Output("Tidak ketemu")
  endIf
EndAlgoritma</code></pre>
          </div>
        `
      },
      {
        heading: "3. Implementasi Program dalam JavaScript dan Python",
        content: `
          <p>Berikut implementasi algoritma Sequential Search di atas menggunakan <span class="lang-text" data-lang-js="JavaScript" data-lang-py="Python">JavaScript</span>:</p>
          <div class="code-preview">
            <pre><code class="lang-code-block" data-lang="js">// Data A dan Jumlah Elemen n
let A = [1, 5, 10, 7, 15];
let n = 5;
let x = 7; // nilai yang dicari
let posisi = -1;

for (let i = 0; i < n; i++) {
  if (A[i] === x) {
    posisi = i;
    console.log("Ketemu, nilai yang dicari berada pada indeks ke-" + posisi);
    break;
  }
}

if (posisi === -1) {
  console.log("Tidak ketemu");
}</code>
<code class="lang-code-block" data-lang="py" style="display:none;"># Data A dan Jumlah Elemen n
A = [1, 5, 10, 7, 15]
n = 5
x = 7  # nilai yang dicari
posisi = -1

for i in range(n):
    if A[i] == x:
        posisi = i
        print("Ketemu, nilai yang dicari berada pada indeks ke-" + str(posisi))
        break

if posisi == -1:
    print("Tidak ketemu")</code></pre>
          </div>
        `
      },
      {
        heading: "4. Analisis & Karakteristik Algoritma",
        content: `
          <p>Karakteristik penting dari algoritma Sequential Search:</p>
          <ul>
            <li><strong>Fleksibilitas Data:</strong> Dapat dijalankan pada array yang elemennya belum terurut maupun sudah terurut.</li>
            <li><strong>Kasus Terbaik (Best Case):</strong> Ketika nilai yang dicari berada pada indeks pertama (<code>A[0]</code>), proses selesai hanya dalam 1 langkah ($O(1)$).</li>
            <li><strong>Kasus Terburuk (Worst Case):</strong> Ketika nilai yang dicari berada pada elemen paling akhir (<code>A[n - 1]</code>) atau tidak ditemukan sama sekali di dalam array, proses memeriksa seluruh $n$ elemen ($O(n)$).</li>
          </ul>
        `
      }
    ],
    interactiveTool: "sequential-search-simulator",
    cobaSendiri: {
      id: "coba_searching",
      title: "Coba sendiri: Algoritma Sequential Search pada Array A",
      description: "Uji pencarian nilai <code>x = 7</code> atau ubah nilai <code>x</code> untuk melihat apakah program menghasilkan indeks yang tepat atau 'Tidak ketemu'.",
      starterCodeJs: `let A = [1, 5, 10, 7, 15];
let n = 5;
let x = 7; // ubah nilai ini untuk mencoba angka lain
let posisi = -1;

for (let i = 0; i < n; i++) {
  if (A[i] === x) {
    posisi = i;
    console.log("Ketemu, nilai yang dicari berada pada indeks ke-" + posisi);
    break;
  }
}

if (posisi === -1) {
  console.log("Tidak ketemu");
}`,
      starterCodePy: `A = [1, 5, 10, 7, 15]
n = 5
x = 7  # ubah nilai ini untuk mencoba angka lain
posisi = -1

for i in range(n):
    if A[i] == x:
        posisi = i
        print("Ketemu, nilai yang dicari berada pada indeks ke-" + str(posisi))
        break

if posisi == -1:
    print("Tidak ketemu")`,
      hint: "Periksa kondisi `A[i] === x` di dalam loop for. Jika cocok, simpan `posisi = i` lalu panggil `break`. Setelah loop berakhir, jika `posisi === -1` cetak 'Tidak ketemu'."
    }
  },

  {
    id: "modul-binary-search",
    badge: "6. Binary Search",
    title: "Binary Search (Pencarian Biner)",
    subtitle: "Algoritma pencarian efisien berkecepatan tinggi O(log n) dengan membagi array menjadi dua bagian berulang pada data terurut",
    readTime: "15 menit baca & animasi interaktif",
    summary: "Binary search adalah algoritma pencarian yang efisien untuk menemukan posisi suatu nilai dalam array yang telah diurutkan. Algoritma ini bekerja dengan membagi array menjadi dua bagian secara berulang, lalu membandingkan nilai yang dicari dengan elemen tengah array.",
    sections: [
      {
        heading: "1. Pengertian & Prinsip Kerja Binary Search",
        content: `
          <p><strong>Binary search</strong> adalah algoritma pencarian yang efisien untuk menemukan posisi suatu nilai dalam array yang <strong>telah diurutkan</strong>.</p>
          <p>Algoritma ini bekerja dengan teknik <em>Divide and Conquer</em> (membagi array menjadi dua bagian secara berulang), lalu membandingkan nilai yang dicari (<code>x</code>) dengan elemen tengah array (<code>A[tengah]</code>):</p>
          <ul>
            <li>Jika nilai yang dicari sama dengan elemen tengah (<code>A[tengah] == x</code>), pencarian berhasil dan indeks tengah disimpan sebagai posisi hasil pencarian.</li>
            <li>Jika nilai yang dicari <strong>lebih kecil</strong> dari elemen tengah (<code>x &lt; A[tengah]</code>), pencarian dilanjutkan ke bagian <strong>kiri</strong> dengan memperbarui batas kanan: <code>akhir = tengah - 1</code>.</li>
            <li>Jika nilai yang dicari <strong>lebih besar</strong> dari elemen tengah (<code>x &gt; A[tengah]</code>), pencarian dilanjutkan ke bagian <strong>kanan</strong> dengan memperbarui batas kiri: <code>awal = tengah + 1</code>.</li>
          </ul>
          <p>Proses ini terus berulang selama <code>awal &lt;= akhir</code> hingga nilai ditemukan atau seluruh bagian sudah diperiksa.</p>

          <div class="alert-box tip">
            <span class="icon">💡</span>
            <div><strong>Prasyarat Mutlak: Data Harus Terurut!</strong> Binary search hanya dapat berjalan dengan benar jika data array telah diurutkan (ascending / membesar). Jika array masih acak, pemotongan separuh bagian array akan membuang data yang mungkin berisi angka yang dicari.</div>
          </div>

          <div class="alert-box warning" style="margin-top: 1rem;">
            <span class="icon">⚠️</span>
            <div>
              <strong>Catatan Telaah Buku Teks SMA Kelas X (Hal. 52):</strong><br>
              Pada teks materi buku SMA tertulis judul notasi <em>"Algoritma SequentialSearch"</em> dan data contoh <code>A = [1, 5, 10, 7, 15]</code>.
              Perhatikan bahwa angka <strong>10 mendahului 7</strong> (belum terurut).
              Agar Binary Search menemukan angka 7 dengan benar, data harus diurutkan terlebih dahulu menjadi <code>A = [1, 5, 7, 10, 15]</code>.
              Pada simulator interaktif di atas, Anda dapat mencoba urutan yang sudah diperbaiki maupun bereksperimen dengan data acak buku asli untuk melihat efek kegagalannya secara nyata!
            </div>
          </div>
        `
      },
      {
        heading: "2. Notasi Algoritma Pseudocode (Kamus & Deskripsi)",
        content: `
          <p>Notasi algoritma pencarian Binary Search standar buku teks SMA Kelas X:</p>
          <div class="code-preview">
            <pre><code>Algoritma BinarySearch
Kamus
  A : array of integer
  n : integer
  x : integer // nilai yang dicari
  awal : integer
  akhir : integer
  tengah : integer
  posisi : integer
Deskripsi
  // Data A (Array terurut)
  A[0] = 1
  A[1] = 5
  A[2] = 7
  A[3] = 10
  A[4] = 15
  // Jumlah Elemen A
  n = 5
  awal = 0
  akhir = n - 1
  posisi = -1
  Output("Nilai yang dicari?")
  Input(x)
  while (awal <= akhir) do
      tengah = (awal + akhir) div 2
      if A[tengah] = x then
          posisi = tengah
          Output("Ketemu, nilai yang dicari berada pada indeks ke-", posisi)
          break
      else if x < A[tengah] then
          akhir = tengah - 1
      else
          awal = tengah + 1
      endIf
  endWhile
  if posisi = -1 then
      Output("Tidak ketemu")
  endIf
EndAlgoritma</code></pre>
          </div>
        `
      },
      {
        heading: "3. Implementasi Program dalam JavaScript dan Python",
        content: `
          <p>Berikut implementasi kode algoritma Binary Search lengkap dalam <span class="lang-text" data-lang-js="JavaScript" data-lang-py="Python">JavaScript</span>:</p>
          <div class="code-preview">
            <pre><code class="lang-code-block" data-lang="js">// Data A (Array terurut) dan Jumlah Elemen n
let A = [1, 5, 7, 10, 15];
let n = 5;
let x = 7; // nilai yang dicari
let awal = 0;
let akhir = n - 1;
let posisi = -1;

while (awal <= akhir) {
  // Hitung indeks tengah dengan pembagian bulat (div)
  let tengah = Math.floor((awal + akhir) / 2);

  if (A[tengah] === x) {
    posisi = tengah;
    console.log("Ketemu, nilai yang dicari berada pada indeks ke-" + posisi);
    break;
  } else if (x < A[tengah]) {
    // Nilai ada di sebelah kiri: geser batas akhir
    akhir = tengah - 1;
  } else {
    // Nilai ada di sebelah kanan: geser batas awal
    awal = tengah + 1;
  }
}

if (posisi === -1) {
  console.log("Tidak ketemu");
}</code>
<code class="lang-code-block" data-lang="py" style="display:none;"># Data A (Array terurut) dan Jumlah Elemen n
A = [1, 5, 7, 10, 15]
n = 5
x = 7  # nilai yang dicari
awal = 0
akhir = n - 1
posisi = -1

while awal <= akhir:
    # Hitung indeks tengah dengan integer division (//)
    tengah = (awal + akhir) // 2

    if A[tengah] == x:
        posisi = tengah
        print("Ketemu, nilai yang dicari berada pada indeks ke-" + str(posisi))
        break
    elif x < A[tengah]:
        # Nilai ada di sebelah kiri: geser batas akhir
        akhir = tengah - 1
    else:
        # Nilai ada di sebelah kanan: geser batas awal
        awal = tengah + 1

if posisi == -1:
    print("Tidak ketemu")</code></pre>
          </div>
        `
      },
      {
        heading: "4. Tabel 2.1 Perbandingan Sequential Search dan Binary Search",
        content: `
          <p>Tabel komparasi mendalam antara Sequential Search (Linear Search) dan Binary Search:</p>
          <div class="table-responsive">
            <table class="modern-table">
              <thead>
                <tr>
                  <th style="width: 25%;">Kriteria Perbandingan</th>
                  <th style="width: 37.5%; color: var(--accent-amber);">Sequential Search (Linear)</th>
                  <th style="width: 37.5%; color: var(--accent-cyan);">Binary Search (Pencarian Biner)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Prasyarat Kondisi Data</strong></td>
                  <td>Bisa pada data <strong>acak / belum terurut</strong> maupun sudah terurut</td>
                  <td><span class="badge-pill badge-primary" style="font-size: 0.75rem;">WAJIB Terurut (Sorted)</span> (misal urutan menaik/ascending)</td>
                </tr>
                <tr>
                  <td><strong>Strategi Penelusuran</strong></td>
                  <td>Memeriksa elemen satu per satu dari indeks 0 hingga indeks terakhir</td>
                  <td>Membagi dua array secara berulang (<em>Divide and Conquer</em>) dari titik tengah</td>
                </tr>
                <tr>
                  <td><strong>Variabel Pointer Indeks</strong></td>
                  <td>1 variabel pointer indeks: <code>i</code></td>
                  <td>3 variabel pointer: <code>awal</code>, <code>akhir</code>, dan <code>tengah</code></td>
                </tr>
                <tr>
                  <td><strong>Kasus Terbaik (Best Case)</strong></td>
                  <td>$O(1)$ — jika target berada di indeks pertama <code>A[0]</code></td>
                  <td>$O(1)$ — jika target tepat berada di elemen tengah pertama</td>
                </tr>
                <tr>
                  <td><strong>Kasus Terburuk (Worst Case)</strong></td>
                  <td><strong>$O(n)$</strong> — memeriksa seluruh $n$ elemen</td>
                  <td><strong>$O(\\log_2 n)$</strong> — pembagian eksponensial separuh array</td>
                </tr>
                <tr>
                  <td><strong>Maksimal Langkah pada 100 Data</strong></td>
                  <td>100 perbandingan</td>
                  <td>Maksimal <strong>7 langkah</strong> (karena $2^7 = 128$)</td>
                </tr>
                <tr>
                  <td><strong>Maksimal Langkah pada 1.000 Data</strong></td>
                  <td>1.000 perbandingan</td>
                  <td>Maksimal <strong>10 langkah</strong> (karena $2^{10} = 1.024$)</td>
                </tr>
                <tr>
                  <td><strong>Maksimal Langkah pada 1.000.000 Data</strong></td>
                  <td>1.000.000 perbandingan</td>
                  <td>Maksimal <strong>20 langkah</strong> (karena $2^{20} \\approx 1.048.576$)</td>
                </tr>
                <tr>
                  <td><strong>Kelebihan Utama</strong></td>
                  <td>Algoritma sederhana, tidak membutuhkan tahap pengurutan data terlebih dahulu</td>
                  <td>Sangat cepat dan efisien pada data berukuran masif/jutaan data</td>
                </tr>
                <tr>
                  <td><strong>Kekurangan Utama</strong></td>
                  <td>Sangat lambat jika volume data sangat banyak</td>
                  <td>Jika data belum terurut, wajib diurutkan (*sorting*) terlebih dahulu</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "5. Analisis Efisiensi Waktu: Mengapa O(log n) Sangat Cepat?",
        content: `
          <p>Pada setiap putaran <code>while</code>, Binary Search selalu membuang <strong>50% (separuh)</strong> data yang tersisa:</p>
          <div class="alert-box tip">
            <span class="icon">⚡</span>
            <div>
              <strong>Ilustrasi Pemotongan Ukuran Data:</strong><br>
              Jika terdapat <strong>1.000.000 data</strong>:<br>
              Langkah 1: sisa 500.000 data &rarr; Langkah 2: sisa 250.000 data &rarr; Langkah 3: sisa 125.000 data &rarr; ... &rarr; <strong>Langkah ke-20: tersisa 1 data!</strong><br>
              Itulah alasan mengapa Binary Search menjadi salah satu algoritma paling penting di dunia ilmu komputer dan kecerdasan artifisial.
            </div>
          </div>
        `
      }
    ],
    interactiveTool: "binary-search-simulator",
    cobaSendiri: {
      id: "coba_binary_search",
      title: "Coba sendiri: Algoritma Binary Search pada Array Terurut",
      description: "Jalankan kode Binary Search pada array <code>A = [1, 5, 7, 10, 15]</code> untuk mencari nilai <code>x = 7</code>. Coba juga ganti nilai <code>x</code> dengan <code>10</code>, <code>15</code>, <code>1</code>, atau <code>99</code>.",
      starterCodeJs: `let A = [1, 5, 7, 10, 15];
let n = 5;
let x = 7; // coba ubah ke 10, 15, atau 99
let awal = 0;
let akhir = n - 1;
let posisi = -1;

while (awal <= akhir) {
  let tengah = Math.floor((awal + akhir) / 2);
  console.log("Cek tengah: indeks " + tengah + " (nilai: " + A[tengah] + ")");

  if (A[tengah] === x) {
    posisi = tengah;
    console.log("Ketemu, nilai yang dicari berada pada indeks ke-" + posisi);
    break;
  } else if (x < A[tengah]) {
    akhir = tengah - 1;
  } else {
    awal = tengah + 1;
  }
}

if (posisi === -1) {
  console.log("Tidak ketemu");
}`,
      starterCodePy: `A = [1, 5, 7, 10, 15]
n = 5
x = 7  # coba ubah ke 10, 15, atau 99
awal = 0
akhir = n - 1
posisi = -1

while awal <= akhir:
    tengah = (awal + akhir) // 2
    print("Cek tengah: indeks", tengah, "(nilai:", A[tengah], ")")

    if A[tengah] == x:
        posisi = tengah
        print("Ketemu, nilai yang dicari berada pada indeks ke-" + str(posisi))
        break
    elif x < A[tengah]:
        akhir = tengah - 1
    else:
        awal = tengah + 1

if posisi == -1:
    print("Tidak ketemu")`,
      hint: "Gunakan `while (awal <= akhir)` dan hitung `tengah = Math.floor((awal + akhir) / 2)`. Jika `x < A[tengah]`, ubah `akhir = tengah - 1`. Jika `x > A[tengah]`, ubah `awal = tengah + 1`."
    }
  },

  {
    id: "modul-selection-sort",
    badge: "7. Selection Sort",
    title: "Selection Sort (Pengurutan Pilihan)",
    subtitle: "Algoritma pengurutan sederhana yang memilih nilai minimum dari sisa data belum terurut lalu menukarnya ke posisi awal",
    readTime: "15 menit baca & animasi interaktif",
    summary: "Selection sort adalah salah satu algoritma pengurutan (sorting) sederhana yang bekerja dengan cara memilih elemen terkecil atau terbesar dari data yang belum terurut, lalu menukarnya dengan elemen di posisi awal. Proses ini diulangi untuk bagian data yang tersisa hingga seluruh data terurut.",
    sections: [
      {
        heading: "1. Pengertian & Prinsip Kerja Selection Sort",
        content: `
          <p><strong>Selection sort</strong> adalah salah satu algoritma pengurutan (<em>sorting</em>) sederhana yang bekerja dengan cara <strong>memilih elemen terkecil atau terbesar</strong> (tergantung urutan yang diinginkan, ascending atau descending) dari data yang belum terurut, lalu <strong>menukarnya dengan elemen di posisi awal</strong>.</p>
          <p>Proses ini diulangi untuk bagian data yang tersisa hingga seluruh data terurut.</p>

          <div class="alert-box tip">
            <span class="icon">🔄</span>
            <div>
              <strong>Konsep Dua Bagian Array:</strong><br>
              Pada setiap langkah, array terbagi menjadi 2 bagian:
              <ol style="margin-left: 1.25rem; margin-top: 0.35rem;">
                <li><strong>Bagian Terurut (Sorted Sub-array):</strong> Berada di sebelah kiri, bertambah 1 elemen di setiap putaran.</li>
                <li><strong>Bagian Belum Terurut (Unsorted Sub-array):</strong> Berada di sebelah kanan, tempat kita mencari nilai minimum untuk ditukar ke posisi depan.</li>
              </ol>
            </div>
          </div>
        `
      },
      {
        heading: "2. Contoh Penelusuran Langkah demi Langkah (Buku SMA Hal. 54)",
        content: `
          <p>Jika kamu memiliki array: <code>A = [6, 3, 8, 5, 2]</code> dengan panjang $n = 5$ data:</p>
          <p>Berikut langkah-langkah Selection Sort untuk mengurutkan secara membesar (<em>ascending</em>):</p>
          
          <div class="card-step-walkthrough" style="display: flex; flex-direction: column; gap: 0.75rem; margin: 1rem 0;">
            <div class="alert-box tip" style="background: rgba(56, 189, 248, 0.08); border-color: rgba(56, 189, 248, 0.3);">
              <div>
                <strong>a. Putaran ke-1 (i = 0):</strong><br>
                Cari nilai terkecil dari indeks <code>0</code> hingga akhir. Didapat hasil angka <strong>2</strong> yang paling kecil (di indeks 4), maka <strong>tukar dengan posisi pertama (indeks 0 yang bernilai 6)</strong>.<br>
                <span class="badge-pill badge-success" style="margin-top: 0.35rem; display: inline-block;">Hasil: [2, 3, 8, 5, 6]</span> (Angka 2 kini sudah berada di tempat yang benar).
              </div>
            </div>

            <div class="alert-box tip" style="background: rgba(16, 185, 129, 0.08); border-color: rgba(16, 185, 129, 0.3);">
              <div>
                <strong>b. Putaran ke-2 (i = 1):</strong><br>
                Cari nilai terkecil dari indeks <code>1</code> hingga akhir. Didapat hasil angka <strong>3</strong> (sudah berada di indeks 1), sehingga <strong>tidak perlu ditukar</strong>.<br>
                <span class="badge-pill badge-success" style="margin-top: 0.35rem; display: inline-block;">Hasil: [2, 3, 8, 5, 6]</span> (Angka 2 dan 3 sudah terurut).
              </div>
            </div>

            <div class="alert-box tip" style="background: rgba(245, 158, 11, 0.08); border-color: rgba(245, 158, 11, 0.3);">
              <div>
                <strong>c. Putaran ke-3 (i = 2):</strong><br>
                Cari nilai terkecil dari indeks <code>2</code> hingga akhir. Didapat hasil angka <strong>5</strong> (di indeks 3), maka <strong>tukar dengan indeks ke-2 (yang bernilai 8)</strong>.<br>
                <span class="badge-pill badge-success" style="margin-top: 0.35rem; display: inline-block;">Hasil: [2, 3, 5, 8, 6]</span> (Angka 2, 3, 5 sudah terurut).
              </div>
            </div>

            <div class="alert-box tip" style="background: rgba(168, 85, 247, 0.08); border-color: rgba(168, 85, 247, 0.3);">
              <div>
                <strong>d. Putaran ke-4 (i = 3):</strong><br>
                Cari nilai terkecil dari indeks <code>3</code> hingga akhir. Didapat hasil angka <strong>6</strong> (di indeks 4), maka <strong>tukar dengan indeks ke-3 (yang bernilai 8)</strong>.<br>
                <span class="badge-pill badge-success" style="margin-top: 0.35rem; display: inline-block;">Hasil: [2, 3, 5, 6, 8]</span> (Array kini 100% terurut sempurna!).
              </div>
            </div>
          </div>

          <p>Karena 4 elemen pertama sudah berada pada posisi yang tepat, maka elemen terakhir (angka 8 di indeks 4) secara otomatis pasti merupakan nilai terbesar dan tidak perlu diperiksa lagi.</p>
        `
      },
      {
        heading: "3. Notasi Algoritma Pseudocode (Kamus & Deskripsi)",
        content: `
          <p>Notasi pseudocode algoritma Selection Sort menggunakan struktur <em>Nested Loop</em> (Pengulangan Bersarang):</p>
          <div class="code-preview">
            <pre><code>Algoritma SelectionSort
Kamus
  A : array of integer
  n : integer
  i : integer // pengulangan luar (indeks posisi awal penukaran)
  j : integer // pengulangan dalam (pemindaian nilai minimum)
  min_idx : integer // indeks elemen dengan nilai terkecil
  temp : integer // variabel sementara untuk pertukaran (swap)
Deskripsi
  // Inisialisasi Data A
  A[0] = 6
  A[1] = 3
  A[2] = 8
  A[3] = 5
  A[4] = 2
  n = 5

  for i = 0 to n - 2 do
      min_idx = i
      // Cari nilai terkecil di sisa array belum terurut
      for j = i + 1 to n - 1 do
          if A[j] < A[min_idx] then
              min_idx = j
          endIf
      endFor

      // Tukar elemen terkecil dengan elemen pada indeks i
      if min_idx != i then
          temp = A[i]
          A[i] = A[min_idx]
          A[min_idx] = temp
      endIf
  endFor

  Output("Array Terurut:", A)
EndAlgoritma</code></pre>
          </div>
        `
      },
      {
        heading: "4. Implementasi Program dalam JavaScript dan Python",
        content: `
          <p>Berikut implementasi algoritma Selection Sort lengkap dalam <span class="lang-text" data-lang-js="JavaScript" data-lang-py="Python">JavaScript</span>:</p>
          <div class="code-preview">
            <pre><code class="lang-code-block" data-lang="js">let A = [6, 3, 8, 5, 2];
let n = A.length;

console.log("Array awal:", A);

for (let i = 0; i < n - 1; i++) {
  let min_idx = i;

  // Loop dalam: cari nilai terkecil dari i + 1 sampai n - 1
  for (let j = i + 1; j < n; j++) {
    if (A[j] < A[min_idx]) {
      min_idx = j;
    }
  }

  // Jika nilai terkecil bukan di posisi i, tukar!
  if (min_idx !== i) {
    let temp = A[i];
    A[i] = A[min_idx];
    A[min_idx] = temp;
    console.log("Putaran ke-" + (i + 1) + " (tukar " + temp + " dengan " + A[i] + "):", A);
  } else {
    console.log("Putaran ke-" + (i + 1) + " (tidak perlu tukar):", A);
  }
}

console.log("Hasil akhir terurut:", A);</code>
<code class="lang-code-block" data-lang="py" style="display:none;">A = [6, 3, 8, 5, 2]
n = len(A)

print("Array awal:", A)

for i in range(n - 1):
    min_idx = i

    # Loop dalam: cari nilai terkecil dari i + 1 sampai n - 1
    for j in range(i + 1, n):
        if A[j] < A[min_idx]:
            min_idx = j

    # Jika nilai terkecil bukan di posisi i, tukar menggunakan tuple swap Python!
    if min_idx != i:
        temp = A[i]
        A[i], A[min_idx] = A[min_idx], A[i]
        print(f"Putaran ke-{i + 1} (tukar {temp} dengan {A[i]}):", A)
    else:
        print(f"Putaran ke-{i + 1} (tidak perlu tukar):", A)

print("Hasil akhir terurut:", A)</code></pre>
          </div>
        `
      },
      {
        heading: "5. Analisis Kompleksitas & Karakteristik Algoritma",
        content: `
          <p>Karakteristik penting dari algoritma Selection Sort:</p>
          <ul>
            <li><strong>Kompleksitas Waktu $O(n^2)$:</strong> Karena menggunakan pengulangan bersarang (outer loop dan inner loop), jumlah perbandingan yang dilakukan adalah $\\frac{n(n-1)}{2}$. Untuk $n=5$, perbandingannya adalah $4 + 3 + 2 + 1 = 10$ kali perbandingan.</li>
            <li><strong>Jumlah Pertukaran Minimal:</strong> Salah satu keunggulan terbesar Selection Sort dibanding algoritma lain (seperti Bubble Sort) adalah jumlah operasi penukaran (<em>swap</em>) maksimal hanya <strong>$n - 1$ kali</strong>, sehingga sangat hemat operasi tulis memori.</li>
            <li><strong>In-Place Algorithm:</strong> Tidak membutuhkan array tambahan (memori tambahan $O(1)$) karena pertukaran dilakukan langsung di dalam array yang sama.</li>
          </ul>
        `
      }
    ],
    interactiveTool: "selection-sort-simulator",
    cobaSendiri: {
      id: "coba_selection_sort",
      title: "Coba sendiri: Algoritma Selection Sort pada Array A = [6, 3, 8, 5, 2]",
      description: "Jalankan kode Selection Sort untuk melihat log pertukaran data tiap putaran hingga array terurut menjadi <code>[2, 3, 5, 6, 8]</code>. Coba juga ubah angka dalam array dengan angka acak buatanmu sendiri.",
      starterCodeJs: `let A = [6, 3, 8, 5, 2];
let n = A.length;

for (let i = 0; i < n - 1; i++) {
  let min_idx = i;
  for (let j = i + 1; j < n; j++) {
    if (A[j] < A[min_idx]) {
      min_idx = j;
    }
  }
  if (min_idx !== i) {
    let temp = A[i];
    A[i] = A[min_idx];
    A[min_idx] = temp;
  }
  console.log("Langkah ke-" + (i + 1) + ": " + JSON.stringify(A));
}

console.log("Selesai! Array terurut: " + JSON.stringify(A));`,
      starterCodePy: `A = [6, 3, 8, 5, 2]
n = len(A)

for i in range(n - 1):
    min_idx = i
    for j in range(i + 1, n):
        if A[j] < A[min_idx]:
            min_idx = j
    if min_idx != i:
        A[i], A[min_idx] = A[min_idx], A[i]
    print("Langkah ke-" + str(i + 1) + ": " + str(A))

print("Selesai! Array terurut: " + str(A))`,
      hint: "Perhatikan inner loop `for (let j = i + 1; j < n; j++)` untuk mencari nilai minimum. Setelah loop dalam selesai, lakukan pertukaran nilai `A[i]` dengan `A[min_idx]` jika `min_idx !== i`."
    }
  }
];

// 8 Latihan Lengkap Terintegrasi (Dual Language Support: JS & Python)
const PRACTICE_EXERCISES = [
  {
    id: "latihan-1",
    level: "Dasar Array",
    category: "Operasi Penjumlahan Array",
    title: "Latihan 1: Operasi Penjumlahan dalam Array",
    description: `
      Tantangan Operasi Array:<br>
      Diketahui array <code>A = [10, 2, 30, 4]</code>.<br>
      Buatlah fungsi <code>operasi_array(A)</code> yang melakukan langkah berikut:
      <ol>
        <li>Hitung <code>jumlah = A[1] + A[3]</code> (menjumlahkan elemen indeks ke-1 dan indeks ke-3).</li>
        <li>Ganti nilai elemen pada indeks ke-0 (<code>A[0]</code>) dengan nilai <code>jumlah</code> tersebut.</li>
        <li>Kembalikan (return) array <code>A</code> yang sudah dimodifikasi.</li>
      </ol>
    `,
    starterCode: `function operasi_array(A) {
  // 1. Hitung jumlah elemen indeks ke-1 dan indeks ke-3:
  let jumlah = A[1] + A[3];
  
  // 2. Ganti A[0] dengan hasil jumlah:
  A[0] = jumlah;
  
  // 3. Kembalikan array A:
  return A;
}`,
    starterCodePy: `def operasi_array(A):
    # 1. Hitung jumlah elemen indeks ke-1 dan indeks ke-3:
    jumlah = A[1] + A[3]
    
    # 2. Ganti A[0] dengan hasil jumlah:
    A[0] = jumlah
    
    # 3. Kembalikan array A:
    return A
`,
    solution: `function operasi_array(A) {
  let jumlah = A[1] + A[3];
  A[0] = jumlah;
  return A;
}`,
    solutionPy: `def operasi_array(A):
    jumlah = A[1] + A[3]
    A[0] = jumlah
    return A
`,
    hint: "Tuliskan: `jumlah = A[1] + A[3]; A[0] = jumlah; return A;`",
    testCases: [
      {
        input: [[10, 2, 30, 4]],
        expected: [6, 2, 30, 4],
        description: "A[1]=2 ditambah A[3]=4 menghasilkan 6, lalu disimpan di A[0]"
      },
      {
        input: [[0, 15, 20, 25]],
        expected: [40, 15, 20, 25],
        description: "A[1]=15 ditambah A[3]=25 menghasilkan 40 disimpan di A[0]"
      }
    ]
  },

  {
    id: "latihan-2",
    level: "Aktivitas Logika",
    category: "Nested If Kelulusan",
    title: "Latihan 2: Evaluasi Kelulusan Siswa (Nested If)",
    description: `
      Selesaikan evaluasi kelulusan peserta didik berikut:<br>
      Buatlah fungsi <code>cek_kelulusan(nilai, kehadiran)</code> yang menentukan kelulusan peserta didik dengan ketentuan <strong>Nested If</strong>:
      <ul>
        <li>Ketentuan a: Nilai akhir minimal 75.</li>
        <li>Ketentuan b: Kehadiran minimal 80%.</li>
        <li>Ketentuan c: Jika nilai antara 70–74, maka peserta didik <strong>tetap lulus jika kehadiran di atas 90%</strong> (karena dianggap rajin). Kembalikan string <code>"LULUS (DISPENSASI RAJIN)"</code>.</li>
        <li>Jika syarat reguler terpenuhi (nilai &ge; 75 dan kehadiran &ge; 80%), kembalikan string <code>"LULUS"</code>.</li>
        <li>Jika salah satu tidak memenuhi, kembalikan string <code>"TIDAK LULUS"</code>.</li>
      </ul>
    `,
    starterCode: `function cek_kelulusan(nilai, kehadiran) {
  if (kehadiran >= 80) {
    if (nilai >= 75) {
      return "LULUS";
    } else {
      if (nilai >= 70 && kehadiran > 90) {
        return "LULUS (DISPENSASI RAJIN)";
      } else {
        return "TIDAK LULUS";
      }
    }
  } else {
    if (nilai >= 70 && kehadiran > 90) {
      return "LULUS (DISPENSASI RAJIN)";
    } else {
      return "TIDAK LULUS";
    }
  }
}`,
    starterCodePy: `def cek_kelulusan(nilai, kehadiran):
    if kehadiran >= 80:
        if nilai >= 75:
            return "LULUS"
        else:
            if nilai >= 70 and kehadiran > 90:
                return "LULUS (DISPENSASI RAJIN)"
            else:
                return "TIDAK LULUS"
    else:
        if nilai >= 70 and kehadiran > 90:
            return "LULUS (DISPENSASI RAJIN)"
        else:
            return "TIDAK LULUS"
`,
    solution: `function cek_kelulusan(nilai, kehadiran) {
  if (kehadiran >= 80) {
    if (nilai >= 75) {
      return "LULUS";
    } else {
      if (nilai >= 70 && kehadiran > 90) {
        return "LULUS (DISPENSASI RAJIN)";
      } else {
        return "TIDAK LULUS";
      }
    }
  } else {
    if (nilai >= 70 && kehadiran > 90) {
      return "LULUS (DISPENSASI RAJIN)";
    } else {
      return "TIDAK LULUS";
    }
  }
}`,
    solutionPy: `def cek_kelulusan(nilai, kehadiran):
    if kehadiran >= 80:
        if nilai >= 75:
            return "LULUS"
        else:
            if nilai >= 70 and kehadiran > 90:
                return "LULUS (DISPENSASI RAJIN)"
            else:
                return "TIDAK LULUS"
    else:
        if nilai >= 70 and kehadiran > 90:
            return "LULUS (DISPENSASI RAJIN)"
        else:
            return "TIDAK LULUS"
`,
    hint: "Periksa: jika nilai >= 75 dan kehadiran >= 80 kembalikan 'LULUS'. Jika nilai antara 70-74 dan kehadiran > 90 kembalikan 'LULUS (DISPENSASI RAJIN)'. Selain itu 'TIDAK LULUS'.",
    testCases: [
      {
        input: [85, 85],
        expected: "LULUS",
        description: "Nilai 85 (>=75) dan kehadiran 85% (>=80%) -> LULUS"
      },
      {
        input: [72, 95],
        expected: "LULUS (DISPENSASI RAJIN)",
        description: "Nilai 72 (70-74) dengan kehadiran 95% (>90%) -> LULUS (DISPENSASI RAJIN)"
      },
      {
        input: [65, 95],
        expected: "TIDAK LULUS",
        description: "Nilai 65 (<70) tidak memenuhi dispensasi -> TIDAK LULUS"
      },
      {
        input: [90, 70],
        expected: "TIDAK LULUS",
        description: "Nilai tinggi 90 tapi kehadiran hanya 70% (<80%) -> TIDAK LULUS"
      }
    ]
  },

  {
    id: "latihan-3",
    level: "Algoritma Pemrograman",
    category: "Predikat Nilai Akhir",
    title: "Latihan 3: Algoritma Predikat Nilai Akhir",
    description: `
      Selesaikan algoritma penentuan predikat nilai berikut:<br>
      Buatlah fungsi <code>predikat_nilai(nilai)</code> yang menerima input sebuah bilangan bulat <code>nilai</code> ujian dan mengembalikan predikat huruf dengan aturan:
      <ul>
        <li>Jika <code>nilai >= 90</code>, kembalikan <code>"A"</code></li>
        <li>Jika <code>nilai >= 75</code>, kembalikan <code>"B"</code></li>
        <li>Jika <code>nilai >= 60</code>, kembalikan <code>"C"</code></li>
        <li>Selain itu (di bawah 60), kembalikan <code>"D"</code></li>
      </ul>
    `,
    starterCode: `function predikat_nilai(nilai) {
  if (nilai >= 90) {
    return "A";
  } else if (nilai >= 75) {
    return "B";
  } else if (nilai >= 60) {
    return "C";
  } else {
    return "D";
  }
}`,
    starterCodePy: `def predikat_nilai(nilai):
    if nilai >= 90:
        return "A"
    elif nilai >= 75:
        return "B"
    elif nilai >= 60:
        return "C"
    else:
        return "D"
`,
    solution: `function predikat_nilai(nilai) {
  if (nilai >= 90) {
    return "A";
  } else if (nilai >= 75) {
    return "B";
  } else if (nilai >= 60) {
    return "C";
  } else {
    return "D";
  }
}`,
    solutionPy: `def predikat_nilai(nilai):
    if nilai >= 90:
        return "A"
    elif nilai >= 75:
        return "B"
    elif nilai >= 60:
        return "C"
    else:
        return "D"
`,
    hint: "Gunakan percabangan bertingkat if - else if - else untuk mengecek batas 90, 75, dan 60.",
    testCases: [
      { input: [95], expected: "A", description: "Nilai 95 mendapat predikat A" },
      { input: [80], expected: "B", description: "Nilai 80 mendapat predikat B" },
      { input: [65], expected: "C", description: "Nilai 65 mendapat predikat C" },
      { input: [50], expected: "D", description: "Nilai 50 mendapat predikat D" }
    ]
  },

  {
    id: "latihan-4",
    level: "Nested Loop",
    category: "Tabel Perkalian Matriks",
    title: "Latihan 4: Nested Loop Cetak Tabel Perkalian",
    description: `
      Buat algoritma pencetakan tabel perkalian berikut:<br>
      Buatlah fungsi <code>buat_tabel_perkalian(baris, kolom)</code> yang menghasilkan sebuah matriks 2D berisi hasil perkalian <code>i * j</code>.<br>
      Perulangan luar <code>i</code> berjalan dari 1 hingga <code>baris</code>.<br>
      Perulangan dalam <code>j</code> berjalan dari 1 hingga <code>kolom</code>.<br><br>
      <strong>Contoh:</strong><br>
      Jika <code>baris = 3</code> dan <code>kolom = 5</code>, maka fungsi mengembalikan matriks 3 baris x 5 kolom:<br>
      <code>[[1, 2, 3, 4, 5], [2, 4, 6, 8, 10], [3, 6, 9, 12, 15]]</code>
    `,
    starterCode: `function buat_tabel_perkalian(baris, kolom) {
  let matriks = [];

  for (let i = 1; i <= baris; i++) {
    let barisIni = [];
    for (let j = 1; j <= kolom; j++) {
      barisIni.push(i * j);
    }
    matriks.push(barisIni);
  }

  return matriks;
}`,
    starterCodePy: `def buat_tabel_perkalian(baris, kolom):
    matriks = []
    for i in range(1, baris + 1):
        baris_ini = []
        for j in range(1, kolom + 1):
            baris_ini.append(i * j)
        matriks.append(baris_ini)
    return matriks
`,
    solution: `function buat_tabel_perkalian(baris, kolom) {
  let matriks = [];
  for (let i = 1; i <= baris; i++) {
    let barisIni = [];
    for (let j = 1; j <= kolom; j++) {
      barisIni.push(i * j);
    }
    matriks.push(barisIni);
  }
  return matriks;
}`,
    solutionPy: `def buat_tabel_perkalian(baris, kolom):
    matriks = []
    for i in range(1, baris + 1):
        baris_ini = []
        for j in range(1, kolom + 1):
            baris_ini.append(i * j)
        matriks.append(baris_ini)
    return matriks
`,
    hint: "Gunakan loop luar dari 1 s.d. baris, dan loop dalam dari 1 s.d. kolom. Simpan `i * j` ke dalam array baris lalu push ke matriks.",
    testCases: [
      {
        input: [3, 5],
        expected: [
          [1, 2, 3, 4, 5],
          [2, 4, 6, 8, 10],
          [3, 6, 9, 12, 15]
        ],
        description: "Tabel perkalian 1-3 terhadap 1-5"
      },
      {
        input: [2, 2],
        expected: [
          [1, 2],
          [2, 4]
        ],
        description: "Tabel perkalian kecil 2x2"
      }
    ]
  },

  {
    id: "latihan-5",
    level: "Algoritma Pencarian",
    category: "Sequential Search",
    title: "Latihan 5: Algoritma Sequential Search pada Array",
    description: `
      Implementasikan algoritma Sequential Search berikut:<br>
      Buatlah fungsi <code>sequential_search(A, x)</code> yang mencari suatu nilai <code>x</code> di dalam array <code>A</code>.<br>
      <ul>
        <li>Periksa elemen satu per satu dari indeks ke-0 hingga akhir.</li>
        <li>Jika ditemukan (<code>A[i] === x</code>), langsung kembalikan nomor indeksnya <code>i</code>.</li>
        <li>Jika sampai akhir elemen tidak ditemukan, kembalikan nilai <code>-1</code>.</li>
      </ul>
      <strong>Contoh:</strong><br>
      Array <code>A = [1, 5, 10, 7, 15]</code>, mencari <code>x = 10</code> &rarr; Output: <code>2</code> (karena berada pada indeks ke-2).
    `,
    starterCode: `function sequential_search(A, x) {
  let posisi = -1;

  for (let i = 0; i < A.length; i++) {
    if (A[i] === x) {
      posisi = i;
      break;
    }
  }

  return posisi;
}`,
    starterCodePy: `def sequential_search(A, x):
    posisi = -1
    for i in range(len(A)):
        if A[i] == x:
            posisi = i
            break
    return posisi
`,
    solution: `function sequential_search(A, x) {
  let posisi = -1;
  for (let i = 0; i < A.length; i++) {
    if (A[i] === x) {
      posisi = i;
      break;
    }
  }
  return posisi;
}`,
    solutionPy: `def sequential_search(A, x):
    posisi = -1
    for i in range(len(A)):
        if A[i] == x:
            posisi = i
            break
    return posisi
`,
    hint: "Gunakan loop `for` dan bandingkan `if (A[i] === x) return i`. Jika selesai loop tidak ketemu, kembalikan `-1`.",
    testCases: [
      {
        input: [[1, 5, 10, 7, 15], 10],
        expected: 2,
        description: "Elemen 10 ditemukan pada indeks ke-2"
      },
      {
        input: [[1, 5, 10, 7, 15], 99],
        expected: -1,
        description: "Elemen 99 tidak ada di dalam array -> mengembalikan -1"
      }
    ]
  },

  {
    id: "latihan-6",
    level: "Kecerdasan Artifisial",
    category: "Rule-Based Expert System",
    title: "Latihan 6: Algoritma Rule-Based Diagnosa Kesehatan AI",
    description: `
      Implementasikan sistem pakar inferensi AI berikut:<br>
      Buatlah fungsi <code>diagnosa_kesehatan(suhubadan, batuk, sakitkepala)</code> yang menghasilkan keputusan diagnosa berdasarkan aturan sistem pakar:
      <ul>
        <li>Jika <code>suhubadan > 37.5</code>:
          <ul>
            <li>Jika <code>batuk === "ya"</code>: jika <code>sakitkepala === "ya"</code> &rarr; <code>"Flu atau Infeksi Virus"</code>, selain itu &rarr; <code>"Demam dan Batuk"</code></li>
            <li>Jika tidak batuk: jika <code>sakitkepala === "ya"</code> &rarr; <code>"Demam biasa"</code>, selain itu &rarr; <code>"Demam ringan"</code></li>
          </ul>
        </li>
        <li>Jika <code>suhubadan <= 37.5</code>:
          <ul>
            <li>Jika <code>batuk === "ya"</code>: jika <code>sakitkepala === "ya"</code> &rarr; <code>"Kelelahan"</code>, selain itu &rarr; <code>"Batuk ringan"</code></li>
            <li>Jika tidak batuk: jika <code>sakitkepala === "ya"</code> &rarr; <code>"Sakit kepala ringan"</code>, selain itu &rarr; <code>"Kondisi sehat"</code></li>
          </ul>
        </li>
      </ul>
    `,
    starterCode: `function diagnosa_kesehatan(suhubadan, batuk, sakitkepala) {
  if (suhubadan > 37.5) {
    if (batuk === "ya") {
      if (sakitkepala === "ya") {
        return "Flu atau Infeksi Virus";
      } else {
        return "Demam dan Batuk";
      }
    } else {
      if (sakitkepala === "ya") {
        return "Demam biasa";
      } else {
        return "Demam ringan";
      }
    }
  } else {
    if (batuk === "ya") {
      if (sakitkepala === "ya") {
        return "Kelelahan";
      } else {
        return "Batuk ringan";
      }
    } else {
      if (sakitkepala === "ya") {
        return "Sakit kepala ringan";
      } else {
        return "Kondisi sehat";
      }
    }
  }
}`,
    starterCodePy: `def diagnosa_kesehatan(suhubadan, batuk, sakitkepala):
    if suhubadan > 37.5:
        if batuk == "ya":
            if sakitkepala == "ya":
                return "Flu atau Infeksi Virus"
            else:
                return "Demam dan Batuk"
        else:
            if sakitkepala == "ya":
                return "Demam biasa"
            else:
                return "Demam ringan"
    else:
        if batuk == "ya":
            if sakitkepala == "ya":
                return "Kelelahan"
            else:
                return "Batuk ringan"
        else:
            if sakitkepala == "ya":
                return "Sakit kepala ringan"
            else:
                return "Kondisi sehat"
`,
    solution: `function diagnosa_kesehatan(suhubadan, batuk, sakitkepala) {
  if (suhubadan > 37.5) {
    if (batuk === "ya") {
      if (sakitkepala === "ya") {
        return "Flu atau Infeksi Virus";
      } else {
        return "Demam dan Batuk";
      }
    } else {
      if (sakitkepala === "ya") {
        return "Demam biasa";
      } else {
        return "Demam ringan";
      }
    }
  } else {
    if (batuk === "ya") {
      if (sakitkepala === "ya") {
        return "Kelelahan";
      } else {
        return "Batuk ringan";
      }
    } else {
      if (sakitkepala === "ya") {
        return "Sakit kepala ringan";
      } else {
        return "Kondisi sehat";
      }
    }
  }
}`,
    solutionPy: `def diagnosa_kesehatan(suhubadan, batuk, sakitkepala):
    if suhubadan > 37.5:
        if batuk == "ya":
            if sakitkepala == "ya":
                return "Flu atau Infeksi Virus"
            else:
                return "Demam dan Batuk"
        else:
            if sakitkepala == "ya":
                return "Demam biasa"
            else:
                return "Demam ringan"
    else:
        if batuk == "ya":
            if sakitkepala == "ya":
                return "Kelelahan"
            else:
                return "Batuk ringan"
        else:
            if sakitkepala == "ya":
                return "Sakit kepala ringan"
            else:
                return "Kondisi sehat"
`,
    hint: "Susun 3 tingkat if di dalam if untuk suhu tinggi (> 37.5), dan 3 tingkat if di dalam blok else untuk suhu normal.",
    testCases: [
      {
        input: [38.2, "ya", "ya"],
        expected: "Flu atau Infeksi Virus",
        description: "Suhu > 37.5, batuk ya, sakit kepala ya -> Flu atau Infeksi Virus"
      },
      {
        input: [36.5, "tidak", "tidak"],
        expected: "Kondisi sehat",
        description: "Suhu normal, tidak batuk, tidak sakit kepala -> Kondisi sehat"
      },
      {
        input: [38.0, "tidak", "ya"],
        expected: "Demam biasa",
        description: "Suhu > 37.5, tidak batuk tapi sakit kepala -> Demam biasa"
      },
      {
        input: [36.8, "ya", "ya"],
        expected: "Kelelahan",
        description: "Suhu normal, batuk ya, sakit kepala ya -> Kelelahan"
      }
    ]
  },

  {
    id: "latihan-7",
    level: "Algoritma Pencarian",
    category: "Binary Search",
    title: "Latihan 7: Algoritma Pencarian Binary Search pada Array Terurut",
    description: `
      Tantangan Pemrograman Binary Search:<br>
      Diketahui array bilangan bulat yang telah terurut (sorted) <code>A</code> dan sebuah target nilai yang dicari <code>x</code>.<br>
      Buatlah fungsi <code>binary_search(A, x)</code> yang mengimplementasikan algoritma Binary Search dengan ketentuan:
      <ul>
        <li>Inisialisasi batas: <code>awal = 0</code>, <code>akhir = A.length - 1</code>, dan <code>posisi = -1</code>.</li>
        <li>Lakukan perulangan selama <code>awal &lt;= akhir</code>.</li>
        <li>Di dalam loop, hitung indeks elemen tengah: <code>tengah = Math.floor((awal + akhir) / 2)</code> (atau <code>(awal + akhir) // 2</code> di Python).</li>
        <li>Jika <code>A[tengah] === x</code>, simpan <code>posisi = tengah</code> lalu hentikan loop (<code>break</code>).</li>
        <li>Jika <code>x &lt; A[tengah]</code>, geser batas akhir: <code>akhir = tengah - 1</code>.</li>
        <li>Jika <code>x &gt; A[tengah]</code>, geser batas awal: <code>awal = tengah + 1</code>.</li>
        <li>Kembalikan nilai <code>posisi</code> (menghasilkan indeks elemen jika ketemu, atau <code>-1</code> jika tidak ditemukan).</li>
      </ul>
    `,
    starterCode: `function binary_search(A, x) {
  let awal = 0;
  let akhir = A.length - 1;
  let posisi = -1;

  while (awal <= akhir) {
    let tengah = Math.floor((awal + akhir) / 2);

    if (A[tengah] === x) {
      posisi = tengah;
      break;
    } else if (x < A[tengah]) {
      akhir = tengah - 1;
    } else {
      awal = tengah + 1;
    }
  }

  return posisi;
}`,
    starterCodePy: `def binary_search(A, x):
    awal = 0
    akhir = len(A) - 1
    posisi = -1

    while awal <= akhir:
        tengah = (awal + akhir) // 2

        if A[tengah] == x:
            posisi = tengah
            break
        elif x < A[tengah]:
            akhir = tengah - 1
        else:
            awal = tengah + 1

    return posisi
`,
    solution: `function binary_search(A, x) {
  let awal = 0;
  let akhir = A.length - 1;
  let posisi = -1;

  while (awal <= akhir) {
    let tengah = Math.floor((awal + akhir) / 2);
    if (A[tengah] === x) {
      posisi = tengah;
      break;
    } else if (x < A[tengah]) {
      akhir = tengah - 1;
    } else {
      awal = tengah + 1;
    }
  }

  return posisi;
}`,
    solutionPy: `def binary_search(A, x):
    awal = 0
    akhir = len(A) - 1
    posisi = -1

    while awal <= akhir:
        tengah = (awal + akhir) // 2
        if A[tengah] == x:
            posisi = tengah
            break
        elif x < A[tengah]:
            akhir = tengah - 1
        else:
            awal = tengah + 1

    return posisi
`,
    hint: "Gunakan loop `while (awal <= akhir)` dan perbarui `akhir = tengah - 1` jika `x < A[tengah]`, atau `awal = tengah + 1` jika `x > A[tengah]`. Kembalikan `posisi`.",
    testCases: [
      {
        input: [[1, 5, 7, 10, 15], 7],
        expected: 2,
        description: "Elemen tengah x=7 ditemukan tepat di indeks ke-2"
      },
      {
        input: [[1, 5, 7, 10, 15], 1],
        expected: 0,
        description: "Elemen x=1 ditemukan pada indeks ke-0 (ujung kiri)"
      },
      {
        input: [[1, 5, 7, 10, 15], 15],
        expected: 4,
        description: "Elemen x=15 ditemukan pada indeks ke-4 (ujung kanan)"
      },
      {
        input: [[1, 5, 7, 10, 15], 10],
        expected: 3,
        description: "Elemen x=10 ditemukan pada indeks ke-3"
      },
      {
        input: [[1, 5, 7, 10, 15], 99],
        expected: -1,
        description: "Elemen x=99 tidak ada di dalam array -> mengembalikan -1"
      }
    ]
  },

  {
    id: "latihan-8",
    level: "Algoritma Pengurutan",
    category: "Selection Sort",
    title: "Latihan 8: Algoritma Pengurutan Selection Sort pada Array",
    description: `
      Tantangan Pemrograman Selection Sort:<br>
      Diketahui array bilangan bulat acak <code>A</code>.<br>
      Buatlah fungsi <code>selection_sort(A)</code> yang mengurutkan array tersebut secara menaik (<em>ascending</em>) menggunakan algoritma Selection Sort dengan ketentuan:
      <ul>
        <li>Gunakan pengulangan luar <code>for i = 0</code> hingga <code>A.length - 2</code>.</li>
        <li>Inisialisasi <code>min_idx = i</code> pada setiap awal putaran luar.</li>
        <li>Gunakan pengulangan dalam <code>for j = i + 1</code> hingga <code>A.length - 1</code> untuk mencari indeks elemen dengan nilai terkecil. Jika <code>A[j] &lt; A[min_idx]</code>, perbarui <code>min_idx = j</code>.</li>
        <li>Setelah loop dalam selesai, jika <code>min_idx !== i</code>, tukar elemen pada <code>A[i]</code> dengan elemen pada <code>A[min_idx]</code>.</li>
        <li>Kembalikan (return) array <code>A</code> yang telah terurut.</li>
      </ul>
    `,
    starterCode: `function selection_sort(A) {
  let n = A.length;

  for (let i = 0; i < n - 1; i++) {
    let min_idx = i;

    for (let j = i + 1; j < n; j++) {
      if (A[j] < A[min_idx]) {
        min_idx = j;
      }
    }

    if (min_idx !== i) {
      let temp = A[i];
      A[i] = A[min_idx];
      A[min_idx] = temp;
    }
  }

  return A;
}`,
    starterCodePy: `def selection_sort(A):
    n = len(A)

    for i in range(n - 1):
        min_idx = i

        for j in range(i + 1, n):
            if A[j] < A[min_idx]:
                min_idx = j

        if min_idx != i:
            A[i], A[min_idx] = A[min_idx], A[i]

    return A
`,
    solution: `function selection_sort(A) {
  let n = A.length;
  for (let i = 0; i < n - 1; i++) {
    let min_idx = i;
    for (let j = i + 1; j < n; j++) {
      if (A[j] < A[min_idx]) {
        min_idx = j;
      }
    }
    if (min_idx !== i) {
      let temp = A[i];
      A[i] = A[min_idx];
      A[min_idx] = temp;
    }
  }
  return A;
}`,
    solutionPy: `def selection_sort(A):
    n = len(A)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if A[j] < A[min_idx]:
                min_idx = j
        if min_idx != i:
            A[i], A[min_idx] = A[min_idx], A[i]
    return A
`,
    hint: "Gunakan loop luar `for i` dari 0 sampai n-2, tentukan `min_idx = i`. Cari nilai terkecil di loop dalam `for j = i + 1` sampai n-1. Jika `min_idx !== i`, tukar `A[i]` dengan `A[min_idx]`. Kembalikan array `A`.",
    testCases: [
      {
        input: [[6, 3, 8, 5, 2]],
        expected: [2, 3, 5, 6, 8],
        description: "Mengurutkan array buku SMA [6, 3, 8, 5, 2] -> [2, 3, 5, 6, 8]"
      },
      {
        input: [[9, 4, 1, 7]],
        expected: [1, 4, 7, 9],
        description: "Mengurutkan array 4 elemen [9, 4, 1, 7] -> [1, 4, 7, 9]"
      },
      {
        input: [[5, 4, 3, 2, 1]],
        expected: [1, 2, 3, 4, 5],
        description: "Mengurutkan array terbalik total [5, 4, 3, 2, 1] -> [1, 2, 3, 4, 5]"
      },
      {
        input: [[10, 20, 30]],
        expected: [10, 20, 30],
        description: "Array yang sudah terurut tetap terurut [10, 20, 30]"
      }
    ]
  }
];
