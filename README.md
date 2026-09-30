# 🧩 Belajar Array - Platform Pembelajaran Interaktif
*by Muhammad Anhar Solihin*

Platform web pembelajaran interaktif materi **Array / List**, **Pengondisian Bertingkat (Nested If)**, dan **Pengulangan Bersarang (Nested Loop)**.

Dilengkapi dengan editor kode mandiri, visualisasi memori dinamis, pengetesan otomatis (*automated unit tests*), dan dukungan dual-bahasa (**JavaScript ⚡** dan **Python 🐍**).

---

## 📚 Menu & Struktur Kurikulum

1. **1. Dasar Array**
   - Pengertian array dan konsep indeks mulai dari 0.
   - Cara membuat dan mengakses elemen array.
   - Perulangan isi array menggunakan loop `for`.
   - Konsep matriks / Array 2 Dimensi.
   - Operasi penjumlahan elemen array (`A[1] + A[3]`).
   - Visualizer memori interaktif & box tantangan *"Coba sendiri: Cetak semua nama siswa"*.

2. **2. Nested If (Pengondisian Bertingkat)**
   - Pengertian percabangan di dalam percabangan.
   - Bentuk algoritma dan cara kerja pohon keputusan (*decision tree*).
   - Contoh penentuan predikat nilai (A, B, C, D).
   - Contoh sistem pakar *rule-based* diagnosa kesehatan AI.
   - Simulator interaktif kondisi kelulusan.

3. **3. Nested Loop (Pengulangan Bersarang)**
   - Pengertian *outer loop* dan *inner loop*.
   - Algoritma pembuatan tabel perkalian matriks ($1 \times 1$ s.d. $3 \times 5$).
   - Penelusuran koordinat baris & kolom matriks 2D.
   - Konsep algoritma *Searching* (*Sequential Search*, *Binary Search*) dan *Sorting* (*Selection*, *Insertion*).
   - Simulator visualisasi traversal sel matriks.

4. **4. Latihan Praktik Koding**
   - 11 tantangan koding mandiri langsung di browser dengan verifikasi otomatis (*unit tests*):
     - **Latihan 1:** Operasi Penjumlahan dalam Array
     - **Latihan 2:** Evaluasi Kelulusan Siswa (Nested If)
     - **Latihan 3:** Algoritma Predikat Nilai Akhir
     - **Latihan 4:** Nested Loop Cetak Tabel Perkalian Matriks
     - **Latihan 5:** Algoritma Pencarian Sequential Search pada Array
     - **Latihan 6:** Algoritma Rule-Based Diagnosa Kesehatan AI
     - **Latihan 7:** Algoritma Pencarian Binary Search pada Array Terurut
     - **Latihan 8:** Algoritma Pengurutan Selection Sort pada Array
     - **Latihan 9:** Algoritma Pengurutan Insertion Sort pada Array
     - **Latihan 10:** Algoritma Decision Tree Klasifikasi Jenis Hewan
     - **Latihan 11:** Algoritma Regresi Linear (Prediksi Nilai Berdasarkan Jam Belajar)

5. **5. Sequential Search (Linear Search)**
   - Pengertian Sequential Search dan cara kerja membandingkan elemen satu per satu.
   - Video pembelajaran visual interaktif konsep dan cara kerja Sequential Search.
   - Contoh kasus pencarian data pada array `A = [1, 5, 10, 7, 15]` dengan target `x`.
   - Notasi algoritma pseudocode (Kamus & Deskripsi).
   - Implementasi kode nyata dalam JavaScript dan Python.
   - Analisis performa: *Best Case* $O(1)$ dan *Worst Case* $O(n)$.
   - Simulator visualisasi pencarian sequential interaktif langkah demi langkah & box *"Coba sendiri"*.

6. **6. Binary Search (Pencarian Biner)**
   - Pengertian Binary Search dengan metode *Divide and Conquer* (membagi array menjadi dua bagian berulang).
   - Video pembelajaran visual interaktif konsep dan simulasi pencarian Binary Search.
   - Prasyarat mutlak: array wajib terurut (*sorted*), beserta telaah edukatif terhadap contoh data buku teks SMA Kelas X (`[1, 5, 10, 7, 15]` vs `[1, 5, 7, 10, 15]`).
   - Notasi algoritma pseudocode standar SMA (Kamus, Deskripsi, perulangan `while (awal <= akhir)`, dan pembagian `div 2`).
   - Implementasi kode nyata dalam JavaScript dan Python.
   - **Tabel 2.1 Perbandingan Lengkap:** Komparasi Sequential Search vs. Binary Search (Prasyarat data, metode, variabel pointer, Best Case, Worst Case $O(\log n)$, langkah pada 100 s.d. 1.000.000 data).
   - **Simulator Animasi Interaktif:** Visualisasi 3 pointer dinamis (`awal`, `tengah`, `akhir`), penanda eliminasi separuh data (*eliminated overlay*), kartu kalkulasi rumus titik tengah, kartu percabangan keputusan if-else, tombol langkah maju/mundur (*step-by-step & undo*), putar otomatis, preset dataset (Standar SMA, 10 Elemen, dan Uji Data Acak), serta box *"Coba sendiri"*.

7. **7. Selection Sort (Pengurutan Pilihan)**
   - Pengertian Selection Sort: memilih elemen terkecil dari data yang belum terurut lalu menukarnya ke posisi awal.
   - Langkah penelusuran (a s.d. d) pada array buku teks SMA Kelas X Hal. 54 `[6, 3, 8, 5, 2]`.
   - Notasi algoritma pseudocode dengan pengulangan bersarang (*nested loop*): outer loop `for i = 0 to n - 2` dan inner loop `for j = i + 1 to n - 1`.
   - Implementasi kode nyata dalam JavaScript dan Python (termasuk teknik tuple swap Python).
   - Analisis kompleksitas $O(n^2)$ dan keunggulan jumlah penukaran (swap) minimal maksimal hanya $n - 1$ kali.
   - **Simulator Animasi Interaktif:** Mini bar tinggi visual proporsional, penanda bagian terurut (hijau) vs belum terurut, pointer target swap `i` dan nilai minimum `min_idx`, animasi pertukaran nilai (swap), tombol langkah maju/mundur (*step-by-step & undo*), putar otomatis, multi-dataset (Buku SMA, Terbalik, Acak, dan Kustom), kartu status putaran, trace table lengkap, serta box *"Coba sendiri"*.

8. **8. Insertion Sort (Pengurutan Penyisipan)**
   - Pengertian Insertion Sort: bekerja seperti seseorang menyusun kartu di tangan saat bermain kartu, menyisipkan elemen satu per satu ke posisi yang tepat.
   - Langkah penelusuran (Langkah 1 s.d. 4) pada array buku teks SMA Kelas X Hal. 55 `[5, 2, 4, 6, 1]`.
   - Notasi algoritma pseudocode standar SMA dengan variabel kunci `key`, perbandingan mundur, dan pergeseran elemen ke kanan.
   - Implementasi kode nyata dalam JavaScript dan Python.
   - **Tabel 2.2 Perbandingan Lengkap:** Komparasi Selection Sort vs. Insertion Sort (Metode pengurutan, cara kerja, jumlah pertukaran/pergeseran, Best Case $O(n)$, kestabilan, dan analogi dunia nyata).
   - **Simulator Animasi Interaktif:** Visualisasi metafora kartu remi, kartu aktif `key` terangkat (*card lift*), animasi pergeseran elemen ke kanan, penanda posisi sisip, tombol langkah maju/mundur (*step-by-step & undo*), putar otomatis, multi-dataset (Buku SMA, Terbalik, Acak, dan Kustom), kartu evaluasi perbandingan, trace table lengkap, serta box *"Coba sendiri"*.

9. **9. Decision Tree (Pohon Keputusan)**
   - Pengertian Decision Tree: metode atau algoritma yang menggunakan struktur berbentuk pohon untuk membantu pengambilan keputusan atau prediksi (Buku Teks SMA Kelas X Hal. 59).
   - Tiga komponen utama pohon keputusan:
     1. **Root Node:** Pertanyaan pertama pada pohon keputusan, tempat memulai proses memilih.
     2. **Decision Node:** Pertanyaan lanjutan yang muncul setelah jawaban dari root node atau pertanyaan sebelumnya.
     3. **Leaf Node:** Hasil akhir dari proses untuk menentukan keputusan.
   - Studi kasus dunia nyata: **"Mengelompokkan Jenis Hewan"** (Burung/Unggas, Ikan, Reptil/Amfibi, Mamalia Air, dan Mamalia Darat).
   - Pemetaan ke kode program nyata dengan *Nested If* (JavaScript & Python).
   - **Simulator Animasi Interaktif:** Pohon hierarki visual bercabang dengan penanda glowing aktif untuk Root Node, Decision Node, dan Leaf Node, mode pemilihan hewan preset instan (Ayam, Ikan Mas, Ular, Paus, Kucing), mode kuis tanya-jawab langkah demi langkah ("Ya" / "Tidak"), breadcrumb jalur keputusan, penjelajah kode percabangan bertingkat live, serta box *"Coba sendiri"*.

10. **10. Regresi Linear (Linear Regression & Machine Learning)**
    - Pengertian Regresi Linear sebagai metode *Supervised Learning* untuk memprediksi nilai kontinu berdasarkan variabel independen $X$.
    - Perbedaan mendasar antara *Regression* (memprediksi nilai kuantitas kontinu) dan *Classification* (memprediksi kategori/label).
    - Pemodelan matematis garis lurus: $\hat{y} = mx + c$ (atau $y = ax + b$).
    - Metode **Ordinary Least Squares (OLS)**: rumus perhitungan kemiringan (*slope* $m$) dan titik potong (*intercept* $c$).
    - Evaluasi performa model: Residu ($e_i = y_i - \hat{y}_i$), Mean Squared Error (MSE), Root Mean Squared Error (RMSE), serta Koefisien Determinasi ($R^2$ Score).
    - Contoh studi kasus terstruktur dengan tabel manual: Jam Belajar vs Nilai Ujian, Pengalaman Kerja vs Gaji, dan Suhu vs Penjualan Es Krim.
    - Implementasi algoritma OLS murni berbasis array dan looping dalam JavaScript dan Python.
    - **Simulator Interaktif:** Diagram pencaran (*scatter plot*) SVG dinamis dengan garis regresi best-fit glow, visualisasi garis residu galat putus-putus merah, fitur **klik di mana saja pada grafik untuk menambah titik data instan**, kalkulator prediksi nilai baru dengan uraian rumus, kartu metrik AI real-time ($m$, $c$, $R^2$, RMSE), pemilihan preset multi-dataset, tabel data interaktif dengan fitur hapus baris, serta box *"Coba sendiri"*.

---

## ✨ Fitur Unggulan

- **Dual-Engine (JavaScript & Python):** Siswa dapat beralih bahasa kapan saja hanya dengan 1 klik.
- **Eksekusi 100% di Browser:** Menggunakan JavaScript Native dan Skulpt Python Engine tanpa perlu install compiler di PC siswa.
- **🌓 Tema Gelap / Terang (Dark / Light Mode):** Tampilan ramah mata dengan kontras tinggi di setiap tema.
- **💻 Sandbox Bebas:** Ruang bereksperimen mengetik dan menjalankan kode apa saja.
- **🎓 E-Sertifikat Kelulusan:** Terbuka otomatis setelah siswa menyelesaikan minimal 4 latihan dan dapat langsung dicetak atau disimpan sebagai PDF.

---

## 🚀 Cara Menjalankan Secara Lokal

Cukup buka file `index.html` di browser web favorit Anda, atau gunakan web server lokal (seperti XAMPP, Live Server, atau Python):

```bash
# Menggunakan Python HTTP Server
python -m http.server 3000
```

Buka browser di `http://localhost:3000/`.
