# Context Handoff: Converter Nilai Raport V2.0 Web

## 📌 Deskripsi Singkat Aplikasi
Aplikasi ini adalah utilitas berbasis **React.js + Vite** yang dirancang untuk pihak sekolah. Aplikasi ini membantu mengonversi file master nilai Excel/CSV (format rentang baris x kolom standar) menjadi format raport *flattened* atau satu arah: (Satu baris pertama berisi **Nama**, dilanjutkan baris-baris berikutnya yang murni berisi **Daftar Nilai Siswa** menurun ke bawah secara vertikal dengan kolom Nama dikosongkan). 

## 🚀 Status *Milestone* Terkini
1. **Refactoring UI Kosmetik Ciamik**: Seluruh aset antarmuka/emoji usang sudah diganti total menjadi ikon **Lucide-React**. Instruksi panduan di web-app yang bertele-tele sudah dipangkas bersih.  
2. **Penyederhanaan Arsitektur (Fokus MVP)**: Menu tab "Rata-Rata" yang rencananya akan ditambahkan, **sudah resmi dihapus bersih tanpa sisa** (baik *file* komponen halamannya maupun seluruh logika *parser*-nya di `App.jsx` dan `utils.js`). Aplikasi sekarang murni hanya *One-Page Application* dengan beban navigasi nol.  
3. **Anti-Header Blocker Langsung pada Mesin Inti**: Baris _Header_ (seperti `['Nama Siswa', 'Nilai 1']`) sudah berhasil distrilisasi dari output akhir karena fungsi *core parser* di `src/utils.js` telah diperkokoh dengan *hard-blocker* pembacaan string. Fitur *Download Template* sekarang murni menggunakan file `template_nilai.xlsx` untuk mencegah *mangling format delimiter* akibat ekspor manual Excel.  
4. **Validasi Quality Assurance**: Semua poin uji fungsional di `CHECKLIST_USER.md` **resmi lulus (`✅ OK`)** oleh end-user secara manual.  

## 📂 Struktur Utama Relevan
- **`src/App.jsx`**: Layout global, memblokir penggunaan tab navigasi yang tidak perlu dan langsung menampilkan `<NilaiPage />`.  
- **`src/pages/NilaiPage.jsx`**: *Single-page component* berisi Zona Upload, render Tabel Preview (Input Data), Tombol Proses eksekutor, serta rendering Tabel Preview akhir sebelum *Download Output*.
- **`src/utils.js`**: Ujung tombak logika parsing Excel dan rekonstruksi array `processNilai()`. Semua _logic_ yang terpengaruh Rata-Rata dibuang eksklusif dari file ini.

## 🎯 Instruksi Untuk *Agent* yang Mengambil Alih
Kami menutup percakapan (/sesi agen sebelumnya) akibat adanya restrukturisasi *Workspace Folder* oleh pemrogram fisik yang memicu limitasi otorisasi pembacaan memori (path Cwd pada terminal command Agent).
Silakan sapa user Anda, periksa dokumen ini jika disinggung, dan lanjutkan ke tahap:
1. **Production Build** (`npm run build`).
2. Proses persiapan Deployment.
3. Penyesuaian konfigurasi vite (`vite.config.js` untuk penyesuaian domain root) jika perilisannya berbasis _subdirectory_.
