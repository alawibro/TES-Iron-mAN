// Semua teks situs ada di sini. Ganti isi file ini untuk mengubah konten.

export const BRAND = "Bro Alwi";
export const TAGLINE = "Ganti dengan deskripsi singkat tentang brand Anda.";

// Frame hero: public/frames/frame_0001.jpg ... frame_0169.jpg (diambil dari video)
export const FRAME_COUNT = 169;
export const framePath = (n: number) =>
  `/frames/frame_${String(n).padStart(4, "0")}.jpg`;

// Teks yang muncul saat scroll. show/hide adalah rentang progres 0–1.
export const BEATS = [
  {
    id: "b1",
    show: 0.1,
    hide: 0.3,
    label: "01 — Pembuka",
    quote: "Ganti dengan pesan pembuka brand Anda.",
  },
  {
    id: "b2",
    show: 0.35,
    hide: 0.55,
    label: "02 — Inti",
    quote: "Ceritakan keunggulan utama di sini.",
  },
  {
    id: "b3",
    show: 0.6,
    hide: 0.8,
    label: "03 — Penutup",
    quote: "Akhiri dengan ajakan yang jelas.",
  },
];

export const FEATURES = [
  { title: "Fitur pertama", body: "Deskripsi placeholder untuk fitur pertama." },
  { title: "Fitur kedua", body: "Deskripsi placeholder untuk fitur kedua." },
  { title: "Fitur ketiga", body: "Deskripsi placeholder untuk fitur ketiga." },
  { title: "Fitur keempat", body: "Deskripsi placeholder untuk fitur keempat." },
];

export const FAQ = [
  {
    q: "Pertanyaan pertama?",
    a: "Jawaban placeholder untuk pertanyaan pertama.",
  },
  {
    q: "Pertanyaan kedua?",
    a: "Jawaban placeholder untuk pertanyaan kedua.",
  },
  {
    q: "Pertanyaan ketiga?",
    a: "Jawaban placeholder untuk pertanyaan ketiga.",
  },
];
