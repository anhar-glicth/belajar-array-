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
    print(f"Data ke-{i + 1}: {nilai[i]}")</code></pre>
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
print(f"Jumlah = A[1] + A[3] -> {Jumlah}") # 2 + 4 = 6</code></pre>
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
    print(f"{i + 1}. {siswa[i]}")`,
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

print(f"Predikat nilai: {predikat}") # Output: B</code></pre>
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
        baris += f"{hasil} "
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
        print(f"Matriks [{i}][{j}] = {matriks[i][j]}")</code></pre>
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
        baris += f"{i * j} "
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
          </ul>
        `
      }
    ],
    interactiveTool: "coding-lab"
  },

  {
    id: "modul-searching",
    badge: "5. Algoritma Pencarian",
    title: "Algoritma Pencarian (Searching) - Sequential Search",
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
        print(f"Ketemu, nilai yang dicari berada pada indeks ke-{posisi}")
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
        print(f"Ketemu, nilai yang dicari berada pada indeks ke-{posisi}")
        break

if posisi == -1:
    print("Tidak ketemu")`,
      hint: "Periksa kondisi `A[i] === x` di dalam loop for. Jika cocok, simpan `posisi = i` lalu panggil `break`. Setelah loop berakhir, jika `posisi === -1` cetak 'Tidak ketemu'."
    }
  }
];

// 6 Latihan Lengkap Terintegrasi (Dual Language Support: JS & Python)
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
  }
];
