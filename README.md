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
   - 7 tantangan koding mandiri langsung di browser dengan verifikasi otomatis (*unit tests*):
     - **Latihan 1:** Operasi Penjumlahan dalam Array
     - **Latihan 2:** Evaluasi Kelulusan Siswa (Nested If)
     - **Latihan 3:** Algoritma Predikat Nilai Akhir
     - **Latihan 4:** Nested Loop Cetak Tabel Perkalian Matriks
     - **Latihan 5:** Algoritma Pencarian Sequential Search pada Array
     - **Latihan 6:** Algoritma Rule-Based Diagnosa Kesehatan AI
     - **Latihan 7:** Algoritma Pencarian Binary Search pada Array Terurut

5. **5. Sequential Search (Linear Search)**
   - Pengertian Sequential Search dan cara kerja membandingkan elemen satu per satu.
   - Contoh kasus pencarian data pada array `A = [1, 5, 10, 7, 15]` dengan target `x`.
   - Notasi algoritma pseudocode (Kamus & Deskripsi).
   - Implementasi kode nyata dalam JavaScript dan Python.
   - Analisis performa: *Best Case* $O(1)$ dan *Worst Case* $O(n)$.
   - Simulator visualisasi pencarian sequential interaktif langkah demi langkah & box *"Coba sendiri"*.

6. **6. Binary Search (Pencarian Biner)**
   - Pengertian Binary Search dengan metode *Divide and Conquer* (membagi array menjadi dua bagian berulang).
   - Prasyarat mutlak: array wajib terurut (*sorted*), beserta telaah edukatif terhadap contoh data buku teks SMA Kelas X (`[1, 5, 10, 7, 15]` vs `[1, 5, 7, 10, 15]`).
   - Notasi algoritma pseudocode standar SMA (Kamus, Deskripsi, perulangan `while (awal <= akhir)`, dan pembagian `div 2`).
   - Implementasi kode nyata dalam JavaScript dan Python.
   - **Tabel 2.1 Perbandingan Lengkap:** Komparasi Sequential Search vs. Binary Search (Prasyarat data, metode, variabel pointer, Best Case, Worst Case $O(\log n)$, langkah pada 100 s.d. 1.000.000 data).
   - **Simulator Animasi Interaktif:** Visualisasi 3 pointer dinamis (`awal`, `tengah`, `akhir`), penanda eliminasi separuh data (*eliminated overlay*), kartu kalkulasi rumus titik tengah, kartu percabangan keputusan if-else, tombol langkah maju/mundur (*step-by-step & undo*), putar otomatis, preset dataset (Standar SMA, 10 Elemen, dan Uji Data Acak), serta box *"Coba sendiri"*.

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
