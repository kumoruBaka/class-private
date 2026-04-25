# かな学習 (Kana Gakushuu) — Belajar Hiragana & Katakana 7 Hari

![Japanese Learning Hero](./japanese_learning_hero_1777129860275.png)

Sebuah aplikasi web interaktif premium yang dirancang untuk membantu pemula menguasai sistem tulisan Jepang (Hiragana & Katakana) secara sistematis dalam waktu 7 hari.

## ✨ Fitur Utama

- **Kurikulum Terstruktur (7 Hari)**: Pembelajaran yang dibagi per baris huruf untuk memastikan retensi memori yang optimal.
- **Kartu Karakter Interaktif**: Klik pada karakter untuk melihat mnemonik visual, jumlah goresan, dan tips menghafal.
- **Audio Pengucapan (Native TTS)**: Dengar pengucapan asli Jepang langsung dari browser Anda untuk setiap huruf.
- **Sistem Pelacakan Mastery (Individual Checklist)**: Tandai setiap huruf yang sudah Anda kuasai 100% untuk memantau progres detail.
- **Kuis Membaca Dinamis**: Uji kemampuan membaca Anda dengan kuis pilihan ganda yang diacak secara otomatis.
- **Latihan Menulis (Canvas)**: Berlatih menulis langsung di layar dengan bantuan grid dan panduan karakter.
- **Modul Flashcard Mandiri**: Aplikasi terpisah (`flashcards.html`) untuk sesi belajar cepat dan acak.
- **Latihan Soal Katakana**: Kumpulan soal pilihan ganda (`katakana_quiz.md`) untuk penguasaan kata serapan asing.

## 🛠️ Stack Teknologi

- **Frontend**: HTML5 Modern, Vanilla CSS3 (Custom Design System), JavaScript (ES6+).
- **Desain**: Zen-inspired Dark Theme dengan efek Glassmorphism dan Sakura accents.
- **Penyimpanan**: Local Storage (Data progres tidak hilang meski browser ditutup).
- **Audio**: Web Speech API (Sintesis suara bahasa Jepang).

## 📂 Struktur Proyek

```text
├── index.html          # Halaman utama aplikasi (Dashboard & Kurikulum)
├── index.css           # Sistem desain premium dan animasi
├── app.js              # Logika aplikasi interaktif dan manajemen state
├── data.js             # Data kurikulum, mnemonik, dan kosakata
├── flashcards.html     # Modul Flashcard minimalis mandiri
├── katakana_quiz.md    # Bank soal latihan Katakana
└── README.md           # Dokumentasi proyek
```

## 🚀 Cara Menjalankan

1. Clone atau download seluruh file dalam proyek ini.
2. Buka file `index.html` langsung di browser Anda, atau gunakan server lokal (seperti Live Server atau Python `-m http.server`).
3. Mulailah dari **Hari 1** dan ikuti panduan target harian.

## 💡 Tips Belajar

- **Gunakan Audio**: Selalu dengarkan pengucapannya saat pertama kali mempelajari huruf baru.
- **Latihan Menulis**: Jangan hanya melihat; gunakan fitur canvas untuk melatih memori otot Anda.
- **Review Berulang**: Gunakan `flashcards.html` setiap pagi sebelum memulai materi hari baru.

---

## Contributors
