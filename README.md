
# E-ASTEKPAM - Aplikasi Laporan Harian Elektronik

[![Lisensi](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

E-ASTEKPAM adalah aplikasi web modern yang dirancang untuk menyederhanakan dan mengotomatiskan proses pelaporan harian di Rumah Tahanan Negara (Rutan) Kelas IIB Wonosobo. Aplikasi ini dibangun dengan Next.js, React, dan ShadCN UI, dengan fokus pada antarmuka yang intuitif dan alur kerja yang efisien.

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Tumpukan Teknologi](#tumpukan-teknologi)
- [Memulai](#memulai)
  - [Prasyarat](#prasyarat)
  - [Instalasi](#instalasi)
  - [Menjalankan Server Pengembangan](#menjalankan-server-pengembangan)
- [Struktur Proyek](#struktur-proyek)
- [Gaya dan Desain](#gaya-dan-desain)
- [Fungsionalitas Utama](#fungsionalitas-utama)
  - [Input Data Harian](#input-data-harian)
  - [Seleksi Personil](#seleksi-personil)
  - [Pembuatan Laporan](#pembuatan-laporan)
  - [Penyimpanan & Email Laporan](#penyimpanan--email-laporan)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## Fitur Utama

-   **Formulir Input Data Dinamis**: Formulir yang mudah digunakan untuk memasukkan data harian terkait jumlah penghuni, penugasan personil, dan pengecekan inventaris.
-   **Seleksi Personil yang Efisien**: Dropdown menu yang terisi data dari `master_data_pegawai` (disimulasikan) dan data Rupam statis untuk pemilihan Karupam, Anggota Rupam, dan Petugas P2U.
-   **Pembuatan Laporan Otomatis**: Generasi laporan harian dalam format teks standar berdasarkan data yang dimasukkan.
-   **Penyimpanan Laporan**: Simulasi penyimpanan laporan yang dihasilkan sebagai file `.txt` (konsep untuk Firebase Storage).
-   **Pengiriman Laporan via Email**: Fungsionalitas untuk mengirim laporan yang dihasilkan sebagai lampiran email ke penerima yang ditunjuk (disimulasikan).
-   **Antarmuka Pengguna Modern**: Dibangun dengan ShadCN UI dan Tailwind CSS untuk tampilan yang bersih, responsif, dan profesional.
-   **Mode Terang/Gelap**: Dukungan untuk tema terang dan gelap yang dapat disesuaikan oleh pengguna.

## Tumpukan Teknologi

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Library UI**: [React](https://reactjs.org/)
-   **Komponen UI**: [ShadCN UI](https://ui.shadcn.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Manajemen Form**: [React Hook Form](https://react-hook-form.com/)
-   **Validasi Skema**: [Zod](https://zod.dev/)
-   **Manajemen Tanggal**: [date-fns](https://date-fns.org/)
-   **Ikon**: [Lucide React](https://lucide.dev/)
-   **GenAI (Konsep)**: [Genkit](https://firebase.google.com/docs/genkit) (terintegrasi, belum diimplementasikan secara fungsional)
-   **Backend & Database (Konsep)**: Firebase (Authentication, Firestore, Storage) - saat ini disimulasikan dalam `src/lib/actions.ts`.

## Memulai

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

### Prasyarat

-   Node.js (versi 18.x atau lebih tinggi direkomendasikan)
-   npm atau yarn

### Instalasi

1.  **Clone repositori ini:**
    ```bash
    git clone https://link-ke-repositori-anda.git
    cd nama-direktori-proyek
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    # atau
    yarn install
    ```

3.  **Konfigurasi Firebase (Opsional untuk pengembangan lokal dengan simulasi):**
    Untuk fungsionalitas Firebase penuh (jika simulasi tidak digunakan), Anda perlu membuat proyek Firebase dan mengkonfigurasi kredensial di file `.env.local`. Namun, untuk saat ini, fungsionalitas backend disimulasikan.

### Menjalankan Server Pengembangan

Untuk memulai server pengembangan Next.js:

```bash
npm run dev
# atau
yarn dev
```

Aplikasi akan tersedia di `http://localhost:9002` (atau port lain jika 9002 sudah digunakan).

## Struktur Proyek

Berikut adalah gambaran umum struktur direktori utama dalam proyek ini:

```
e-astekpam/
├── src/
│   ├── app/                # Halaman dan routing Next.js App Router
│   │   ├── dashboard/      # Halaman utama aplikasi
│   │   └── layout.tsx      # Tata letak utama aplikasi
│   │   └── page.tsx        # Halaman awal (redirect ke dashboard)
│   │   └── globals.css     # CSS global dan variabel tema ShadCN
│   ├── components/         # Komponen React yang dapat digunakan kembali
│   │   ├── dashboard/      # Komponen spesifik untuk dashboard
│   │   ├── forms/          # Komponen formulir dan bagian-bagiannya
│   │   ├── layout/         # Komponen tata letak (Header, Footer)
│   │   └── ui/             # Komponen ShadCN UI
│   ├── hooks/              # Custom React Hooks (misalnya, useToast, useIsMobile)
│   ├── lib/                # Utilitas, data master, dan logika bisnis
│   │   ├── actions.ts      # Server Actions (simulasi backend)
│   │   ├── report-generator.ts # Logika pembuatan teks laporan
│   │   └── utils.ts        # Fungsi utilitas umum (misalnya, cn)
│   │   └── *.json          # File data statis (rupam, piket)
│   ├── types/              # Definisi TypeScript (Zod schema, interface)
│   ├── ai/                 # Fungsionalitas terkait Genkit (konsep)
│   │   ├── genkit.ts       # Inisialisasi Genkit
│   │   └── dev.ts          # File pengembangan Genkit
├── public/                 # Aset statis
├── next.config.ts          # Konfigurasi Next.js
├── package.json            # Dependensi dan skrip proyek
├── tsconfig.json           # Konfigurasi TypeScript
└── README.md               # File ini
```

## Gaya dan Desain

Aplikasi ini dirancang dengan estetika yang bersih dan profesional, dengan panduan gaya sebagai berikut:

-   **Warna Primer**: Biru lembut (`#A0C4FF`) untuk menciptakan rasa tenang dan handal.
-   **Warna Latar Belakang**: Biru sangat muda (`#F0F8FF`) untuk tampilan yang kohesif.
-   **Warna Aksen**: Violet lembut (`#BDB2FF`) untuk elemen interaktif.
-   **Font Utama**: 'PT Sans' (sans-serif) untuk nuansa modern dan mudah dibaca.

Styling diimplementasikan menggunakan Tailwind CSS dan dikelola melalui variabel tema ShadCN UI di `src/app/globals.css`.

## Fungsionalitas Utama

### Input Data Harian
Formulir input data harian yang intuitif memungkinkan pengguna untuk memasukkan informasi penting seperti:
- Jumlah Tahanan (Laki-laki, Perempuan)
- Jumlah Narapidana (Laki-laki, Perempuan)
- Jumlah WBP di Dalam dan di Luar Rutan
- Informasi pergantian shift (Pagi-Siang, Siang-Malam, Malam-Pagi)

### Seleksi Personil
Pemilihan personil untuk berbagai pos dan shift dipermudah melalui:
- **RUPAM (Regu Pengamanan)**: Pemilihan Rupam untuk shift Pagi, Siang, dan Malam. Detail Karupam, Anggota, dan Petugas P2U akan otomatis ditampilkan berdasarkan Rupam yang dipilih dari `rupam-data.json`.
- **Petugas Piket**: Pemilihan petugas untuk Perwira Piket, Piket Dapur, Piket Blok Wanita, Piket Staff KPR, dan Piket Staff Siang dari daftar yang tersedia di `categorized-piket-personnel.json`.

### Pembuatan Laporan
Setelah semua data relevan dimasukkan, aplikasi secara otomatis menghasilkan laporan harian dalam format teks standar yang siap digunakan. Format laporan mencakup:
- Kop laporan dengan tanggal dan waktu.
- Rincian data penghuni.
- Rincian personil pengamanan (RUPAM dan Petugas Piket).
- Rincian inventaris regu pengamanan.
- Catatan kejadian penting (jika ada).
- Pernyataan penutup mengenai situasi keamanan.

### Penyimpanan & Email Laporan
- **Penyimpanan (Simulasi)**: Laporan yang dihasilkan disimulasikan untuk disimpan di Firebase Storage.
- **Email (Simulasi)**: Terdapat fungsionalitas untuk mengirim laporan sebagai lampiran email ke alamat yang ditentukan.

## Kontribusi

Saat ini, kontribusi tidak dibuka untuk umum. Namun, jika Anda memiliki saran atau menemukan bug, silakan buat *Issue* di repositori GitHub proyek ini.

## Lisensi

Proyek ini dilisensikan di bawah [Lisensi MIT](LICENSE).
```
