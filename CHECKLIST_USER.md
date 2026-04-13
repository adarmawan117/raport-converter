# ✅ CHECKLIST TESTING MANUAL — Converter Nilai Raport V2 Web

> Dokumen ini berisi daftar item yang perlu diuji secara **manual** oleh pengguna sebelum aplikasi dinyatakan siap digunakan.
> Tandai setiap item dengan status sesuai hasil pengujian.

---

## 🖥️ Tampilan & Navigasi

| # | Item | Status |
|---|------|--------|
| N-01 | Navbar tampil dengan branding `Converter Nilai Raport` dan badge `V2.0 Web` | ✅ OK |
| N-02 | Dua tab tersedia: **📊 Menu Nilai** dan **📈 Menu Rata-Rata** | ✅ OK |
| N-03 | Klik antar tab berpindah halaman tanpa error | ✅ OK |
| N-04 | **Step Indicator** (lingkaran langkah 1-2-3) terlihat dan berubah sesuai progress | ✅ OK |
| N-05 | Footer muncul di bagian bawah dengan teks `Team ADR Programming` | ✅ OK |

---

## 📊 Menu Nilai

### 🔷 Template Download

| # | Item | Status |
|---|------|--------|
| A-01 | Klik tombol **"⬇️ Download Template"** → file `template_nilai.xlsx` berhasil terunduh | ✅ OK |
| A-02 | Buka file template di Excel/Notepad, format kolom benar: `Nama Siswa \| Nilai 1 \| Nilai 2 \| ... \| Nilai N` | ⬜ Belum |
| A-03 | Template berisi 3 baris contoh data siswa | ⬜ Belum |

### 🔷 Upload File

| # | Item | Status |
|---|------|--------|
| A-04 | Upload file template (klik zona upload) → file diterima dan muncul info nama + ukuran | ✅ OK |
| A-05 | Drag & drop file ke zona upload → berfungsi sama | ⬜ Belum |
| A-06 | Tabel preview input muncul dengan kolom `Nama Siswa`, `Nilai 1`, `Nilai 2`, dst | ⬜ Belum |
| A-07 | Stats chip menampilkan jumlah siswa dan jumlah kolom nilai yang benar | ⬜ Belum |
| A-08 | Tombol **✕** di file preview berfungsi untuk menghapus file dan mereset halaman | ⬜ Belum |

### 🔷 Proses & Output

| # | Item | Status |
|---|------|--------|
| A-09 | Klik **"⚡ Proses & Generate Output"** → tabel output muncul di kolom kanan | ✅ OK |
| A-10 | Format output benar: Nama siswa di baris pertama, nilai berikutnya mengisi baris di bawah dengan kolom nama **kosong** | ⬜ Belum |
| A-11 | Contoh output yang diharapkan: `AHMAD FAUZI \| 85` → `(kosong) \| 90` → `(kosong) \| 88` → `BUDI SANTOSO \| 78` | ⬜ Belum |
| A-12 | Jumlah baris output sesuai (total semua nilai dari semua siswa + 1 header) | ⬜ Belum |
| A-13 | Step Indicator berpindah ke langkah ke-3 setelah proses berhasil | ⬜ Belum |

### 🔷 Download Hasil

| # | Item | Status |
|---|------|--------|
| A-14 | Klik **"⬇️ Download CSV"** → file `hasil_nilai.csv` terunduh | ✅ OK |
| A-15 | Buka `hasil_nilai.csv` di Excel/Notepad, isi dan format output sesuai yang diharapkan | ⬜ Belum |
| A-16 | Klik **"📊 Download Excel"** → file `hasil_nilai.xlsx` terunduh | ✅ OK |
| A-17 | Buka `hasil_nilai.xlsx` di Excel, konten benar dan bisa dibaca | ⬜ Belum |

### 🔷 Validasi Error

| # | Item | Status |
|---|------|--------|
| A-18 | Tombol **"Proses"** tidak bisa diklik (disabled) sebelum ada file yang diupload | ✅ OK |

---

## 📈 Menu Rata-Rata

### 🔷 Template Download

| # | Item | Status |
|---|------|--------|
| B-01 | Klik tombol **"⬇️ Download Template"** di tab Rata-Rata → file `template_rata_rata.xlsx` terunduh | ⬜ Belum |
| B-02 | Buka template, format kolom benar: `Nama Siswa \| Rata-Rata 1 \| Rata-Rata 2 \| ... \| Rata-Rata N` | ⬜ Belum |

### 🔷 Upload File & Konfigurasi

| # | Item | Status |
|---|------|--------|
| B-03 | Upload template rata-rata → file diterima, preview tabel muncul | ⬜ Belum |
| B-04 | Spinner **"Banyak rata-rata per siswa"** otomatis terisi sesuai jumlah kolom di file | ⬜ Belum |
| B-05 | Tombol **`+`** dan **`−`** di spinner mengubah nilai qty | ⬜ Belum |
| B-06 | Input manual angka di spinner berfungsi | ⬜ Belum |
| B-07 | Nilai qty minimal 1 dan maksimal 100 (tidak bisa melewati batas) | ⬜ Belum |

### 🔷 Proses & Output

| # | Item | Status |
|---|------|--------|
| B-08 | Klik **"⚡ Proses & Generate Output"** → tabel output muncul | ⬜ Belum |
| B-09 | Format output sama seperti Menu Nilai: nama di baris pertama, rata-rata di bawahnya (kolom nama kosong) | ⬜ Belum |
| B-10 | Jumlah rata-rata per siswa sesuai dengan nilai `qty` yang dipilih | ⬜ Belum |

### 🔷 Download Hasil

| # | Item | Status |
|---|------|--------|
| B-11 | Klik **"⬇️ Download CSV"** → file `hasil_rata_rata.csv` terunduh | ⬜ Belum |
| B-12 | Klik **"📊 Download Excel"** → file `hasil_rata_rata.xlsx` terunduh | ⬜ Belum |
| B-13 | Kedua file berisi data yang benar sesuai format output yang diharapkan | ⬜ Belum |

---

## 🔔 Notifikasi Toast

| # | Item | Status |
|---|------|--------|
| C-01 | Upload file berhasil → muncul **toast hijau** dengan info jumlah siswa | ✅ OK |
| C-02 | Klik Download Template → muncul **toast biru** | ⬜ Belum |
| C-03 | Proses berhasil → muncul **toast hijau** dengan info jumlah baris output | ⬜ Belum |
| C-04 | Download CSV/Excel berhasil → muncul **toast hijau** | ⬜ Belum |
| C-05 | Toast hilang otomatis setelah ±3.5 detik | ⬜ Belum |

---

## 📋 Status Pengujian

| ID | Kategori | Deskripsi Singkat | Status |
|----|----------|-------------------|--------|
| N-01 | Tampilan | Navbar & branding | ✅ OK |
| N-02 | Tampilan | Dua tab navigasi tersedia | ✅ OK |
| N-03 | Tampilan | Perpindahan tab tanpa error | ✅ OK |
| N-04 | Tampilan | Step Indicator berfungsi | ✅ OK |
| N-05 | Tampilan | Footer tampil | ✅ OK |
| A-01 | Nilai | Download template Excel (.xlsx) | ✅ OK |
| A-04 | Nilai | Upload file & preview | ✅ OK |
| A-09 | Nilai | Proses & output benar | ✅ OK |
| A-14 | Nilai | Download CSV hasil | ✅ OK |
| A-16 | Nilai | Download Excel hasil | ✅ OK |
| A-18 | Nilai | Tombol disabled jika belum upload | ✅ OK |
| B-01 | Rata-Rata | Download template Excel (.xlsx) | ⬜ Belum |
| B-03 | Rata-Rata | Upload & preview | ⬜ Belum |
| B-04 | Rata-Rata | Spinner qty otomatis | ⬜ Belum |
| B-08 | Rata-Rata | Proses & output benar | ⬜ Belum |
| B-11 | Rata-Rata | Download CSV & Excel hasil | ⬜ Belum |
| C-01 | Toast | Notifikasi muncul & hilang otomatis | ✅ OK |

> **Keterangan status:** ⬜ Belum &nbsp;|&nbsp; ✅ OK &nbsp;|&nbsp; ❌ Bug/Error &nbsp;|&nbsp; ⚠️ Perlu Perbaikan Minor

---

> **Catatan:** Laporkan setiap item ❌ atau ⚠️ kepada developer agar segera diperbaiki sebelum rilis.
