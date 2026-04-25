/**
 * ======================================================
 *  かな学習 — Complete 7-Day Curriculum Data
 *  Hiragana & Katakana learning structured by day
 * ======================================================
 */

const CURRICULUM = [
  // ===========================
  //  DAY 1 — Vowels (あ行)
  // ===========================
  {
    day: 1,
    title: "Huruf Vokal dasar (あ行)",
    description: "Hari pertama: Fondasi paling penting — 5 huruf vokal yang menjadi dasar seluruh sistem kana.",
    objectives: [
      "Menghafal 5 huruf vokal Hiragana: あ い う え お",
      "Menghafal 5 huruf vokal Katakana: ア イ ウ エ オ",
      "Melatih penulisan stroke order yang benar",
      "Menghafal 8 kosakata dasar"
    ],
    hiragana: [
      { char: "あ", romaji: "a", strokes: 3, hint: "Seperti huruf 'a' yang artistik" },
      { char: "い", romaji: "i", strokes: 2, hint: "Dua garis seperti tanda kutip" },
      { char: "う", romaji: "u", strokes: 2, hint: "Angka 3 yang dibuka" },
      { char: "え", romaji: "e", strokes: 2, hint: "Seperti salib dengan ekor" },
      { char: "お", romaji: "o", strokes: 3, hint: "Seperti orang membungkuk" }
    ],
    katakana: [
      { char: "ア", romaji: "a", strokes: 2, hint: "Seperti huruf 'T' miring" },
      { char: "イ", romaji: "i", strokes: 2, hint: "Seperti orang berdiri" },
      { char: "ウ", romaji: "u", strokes: 3, hint: "Seperti kotak terbuka di atas" },
      { char: "エ", romaji: "e", strokes: 3, hint: "Seperti huruf 'I' kapital" },
      { char: "オ", romaji: "o", strokes: 3, hint: "Seperti salib dengan garis melengkung" }
    ],
    vocabulary: [
      { word: "あい", reading: "ai", meaning: "cinta", example: "あいしてる (aishiteru) — aku cinta kamu" },
      { word: "いえ", reading: "ie", meaning: "rumah", example: "いえにいる (ie ni iru) — ada di rumah" },
      { word: "うえ", reading: "ue", meaning: "atas", example: "うえにある (ue ni aru) — ada di atas" },
      { word: "あおい", reading: "aoi", meaning: "biru", example: "あおいそら (aoi sora) — langit biru" },
      { word: "いう", reading: "iu", meaning: "berkata", example: "なにをいう (nani wo iu) — berkata apa" },
      { word: "おい", reading: "oi", meaning: "keponakan (laki-laki)", example: "おいさん (oi-san)" },
      { word: "アイス", reading: "aisu", meaning: "es krim", example: "アイスをたべる — makan es krim" },
      { word: "エア", reading: "ea", meaning: "udara (dari 'air')", example: "エアコン (eakon) — AC" }
    ]
  },

  // ===========================
  //  DAY 2 — Ka & Sa rows (か行・さ行)
  // ===========================
  {
    day: 2,
    title: "Baris Ka dan Sa (か行・さ行)",
    description: "Dua baris konsonan pertama — ka, ki, ku, ke, ko dan sa, shi, su, se, so.",
    objectives: [
      "Menghafal 10 Hiragana baris か dan さ",
      "Menghafal 10 Katakana baris カ dan サ",
      "Latihan membedakan huruf yang mirip",
      "Menghafal 12 kosakata baru"
    ],
    hiragana: [
      { char: "か", romaji: "ka", strokes: 3, hint: "Seperti pedang samurai" },
      { char: "き", romaji: "ki", strokes: 4, hint: "Seperti kunci (key)" },
      { char: "く", romaji: "ku", strokes: 1, hint: "Seperti sudut/panah ke kiri" },
      { char: "け", romaji: "ke", strokes: 3, hint: "Seperti pintu terbuka" },
      { char: "こ", romaji: "ko", strokes: 2, hint: "Dua garis horizontal" },
      { char: "さ", romaji: "sa", strokes: 3, hint: "Seperti wajah tersenyum" },
      { char: "し", romaji: "shi", strokes: 1, hint: "Seperti kail memancing" },
      { char: "す", romaji: "su", strokes: 2, hint: "Seperti angka 4 dengan lingkaran" },
      { char: "せ", romaji: "se", strokes: 3, hint: "Seperti tangan menunjuk" },
      { char: "そ", romaji: "so", strokes: 1, hint: "Seperti zigzag menurun" }
    ],
    katakana: [
      { char: "カ", romaji: "ka", strokes: 2, hint: "Seperti pisau" },
      { char: "キ", romaji: "ki", strokes: 3, hint: "Seperti kunci vertikal" },
      { char: "ク", romaji: "ku", strokes: 2, hint: "Seperti sudut runcing" },
      { char: "ケ", romaji: "ke", strokes: 3, hint: "Seperti 'K' yang disederhanakan" },
      { char: "コ", romaji: "ko", strokes: 2, hint: "Seperti kotak terbuka samping" },
      { char: "サ", romaji: "sa", strokes: 3, hint: "Seperti garpu terbalik" },
      { char: "シ", romaji: "shi", strokes: 3, hint: "Tiga titik — senyum :)" },
      { char: "ス", romaji: "su", strokes: 2, hint: "Seperti angsa" },
      { char: "セ", romaji: "se", strokes: 2, hint: "Seperti panah patah" },
      { char: "ソ", romaji: "so", strokes: 2, hint: "Dua goresan ke kanan bawah" }
    ],
    vocabulary: [
      { word: "さかな", reading: "sakana", meaning: "ikan", example: "さかなをたべる — makan ikan" },
      { word: "すし", reading: "sushi", meaning: "sushi", example: "すしがすき — suka sushi" },
      { word: "あさ", reading: "asa", meaning: "pagi", example: "あさごはん — sarapan pagi" },
      { word: "かさ", reading: "kasa", meaning: "payung", example: "かさをさす — membuka payung" },
      { word: "せかい", reading: "sekai", meaning: "dunia", example: "せかいいち — terbaik di dunia" },
      { word: "こえ", reading: "koe", meaning: "suara", example: "こえがおおきい — suara besar" },
      { word: "くうき", reading: "kuuki", meaning: "udara", example: "くうきがきれい — udara bersih" },
      { word: "かお", reading: "kao", meaning: "wajah", example: "かおをあらう — mencuci muka" },
      { word: "コーヒー", reading: "koohii", meaning: "kopi", example: "コーヒーをのむ — minum kopi" },
      { word: "ケーキ", reading: "keeki", meaning: "kue", example: "ケーキがおいしい — kuenya enak" },
      { word: "スキー", reading: "sukii", meaning: "ski", example: "スキーにいく — pergi ski" },
      { word: "カサ", reading: "kasa", meaning: "payung (katakana ver.)", example: "" }
    ]
  },

  // ===========================
  //  DAY 3 — Ta & Na rows (た行・な行)
  // ===========================
  {
    day: 3,
    title: "Baris Ta dan Na (た行・な行)",
    description: "Melanjutkan dengan baris Ta dan Na — termasuk huruf 'chi' dan 'tsu' yang sering membingungkan.",
    objectives: [
      "Menghafal 10 Hiragana baris た dan な",
      "Menghafal 10 Katakana baris タ dan ナ",
      "Membedakan ち (chi) vs さ (sa), つ (tsu) vs す (su)",
      "Menghafal 12 kosakata baru"
    ],
    hiragana: [
      { char: "た", romaji: "ta", strokes: 4, hint: "Seperti 'ta' dengan palang" },
      { char: "ち", romaji: "chi", strokes: 2, hint: "Seperti angka 5" },
      { char: "つ", romaji: "tsu", strokes: 1, hint: "Seperti huruf U berbaring" },
      { char: "て", romaji: "te", strokes: 1, hint: "Seperti tangan terbuka" },
      { char: "と", romaji: "to", strokes: 2, hint: "Seperti jari kaki" },
      { char: "な", romaji: "na", strokes: 4, hint: "Seperti simpul tali" },
      { char: "に", romaji: "ni", strokes: 3, hint: "Seperti wajah dengan senyum" },
      { char: "ぬ", romaji: "nu", strokes: 2, hint: "Seperti pretzel" },
      { char: "ね", romaji: "ne", strokes: 2, hint: "Seperti kucing melingkar" },
      { char: "の", romaji: "no", strokes: 1, hint: "Seperti spiral — 'no' means 'of'" }
    ],
    katakana: [
      { char: "タ", romaji: "ta", strokes: 3, hint: "Seperti salib dengan kemiringan" },
      { char: "チ", romaji: "chi", strokes: 3, hint: "Seperti nomor 千" },
      { char: "ツ", romaji: "tsu", strokes: 3, hint: "Tiga titik — senyum ke atas" },
      { char: "テ", romaji: "te", strokes: 3, hint: "Seperti meja" },
      { char: "ト", romaji: "to", strokes: 2, hint: "Seperti tiang bendera" },
      { char: "ナ", romaji: "na", strokes: 2, hint: "Seperti salib miring" },
      { char: "ニ", romaji: "ni", strokes: 2, hint: "Dua garis horizontal (= 二)" },
      { char: "ヌ", romaji: "nu", strokes: 2, hint: "Seperti huruf X unik" },
      { char: "ネ", romaji: "ne", strokes: 4, hint: "Seperti pohon kecil" },
      { char: "ノ", romaji: "no", strokes: 1, hint: "Satu garis diagonal" }
    ],
    vocabulary: [
      { word: "たなか", reading: "tanaka", meaning: "Tanaka (nama orang)", example: "たなかさん — Pak/Bu Tanaka" },
      { word: "ちち", reading: "chichi", meaning: "ayah", example: "ちちのくるま — mobil ayah" },
      { word: "つき", reading: "tsuki", meaning: "bulan", example: "つきがきれい — bulan indah" },
      { word: "てがみ", reading: "tegami", meaning: "surat", example: "てがみをかく — menulis surat" },
      { word: "ともだち", reading: "tomodachi", meaning: "teman", example: "ともだちにあう — bertemu teman" },
      { word: "なつ", reading: "natsu", meaning: "musim panas", example: "なつがすき — suka musim panas" },
      { word: "にく", reading: "niku", meaning: "daging", example: "にくをたべる — makan daging" },
      { word: "ねこ", reading: "neko", meaning: "kucing", example: "ねこがいる — ada kucing" },
      { word: "のこす", reading: "nokosu", meaning: "menyisakan", example: "たべものをのこす — menyisakan makanan" },
      { word: "ノート", reading: "nooto", meaning: "catatan/buku tulis", example: "ノートにかく — menulis di buku tulis" },
      { word: "テスト", reading: "tesuto", meaning: "ujian/tes", example: "テストがある — ada ujian" },
      { word: "ナイフ", reading: "naifu", meaning: "pisau", example: "ナイフできる — memotong dengan pisau" }
    ]
  },

  // ===========================
  //  DAY 4 — Ha & Ma rows (は行・ま行)
  // ===========================
  {
    day: 4,
    title: "Baris Ha dan Ma (は行・ま行)",
    description: "Baris Ha termasuk huruf spesial 'は' yang bisa dibaca 'wa' saat jadi partikel, dan ふ (fu) yang unik.",
    objectives: [
      "Menghafal 10 Hiragana baris は dan ま",
      "Menghafal 10 Katakana baris ハ dan マ",
      "Memahami は sebagai partikel (dibaca 'wa')",
      "Menghafal 12 kosakata baru"
    ],
    hiragana: [
      { char: "は", romaji: "ha", strokes: 3, hint: "⚠️ Dibaca 'wa' saat jadi partikel" },
      { char: "ひ", romaji: "hi", strokes: 1, hint: "Seperti senyum lebar" },
      { char: "ふ", romaji: "fu", strokes: 4, hint: "Seperti Fuji-san (gunung)" },
      { char: "へ", romaji: "he", strokes: 1, hint: "Seperti atap rumah" },
      { char: "ほ", romaji: "ho", strokes: 4, hint: "Seperti は dengan garis extra" },
      { char: "ま", romaji: "ma", strokes: 3, hint: "Seperti は tanpa kaki kanan panjang" },
      { char: "み", romaji: "mi", strokes: 2, hint: "Seperti angka 21 bersambung" },
      { char: "む", romaji: "mu", strokes: 3, hint: "Seperti sapi (moo)" },
      { char: "め", romaji: "me", strokes: 2, hint: "Seperti mata (me = mata)" },
      { char: "も", romaji: "mo", strokes: 3, hint: "Seperti pancing dengan umpan" }
    ],
    katakana: [
      { char: "ハ", romaji: "ha", strokes: 2, hint: "Seperti 八 (delapan)" },
      { char: "ヒ", romaji: "hi", strokes: 2, hint: "Seperti senyum ke samping" },
      { char: "フ", romaji: "fu", strokes: 1, hint: "Seperti topi" },
      { char: "ヘ", romaji: "he", strokes: 1, hint: "Sama persis dengan へ hiragana!" },
      { char: "ホ", romaji: "ho", strokes: 4, hint: "Seperti pohon Natal" },
      { char: "マ", romaji: "ma", strokes: 2, hint: "Seperti sudut menurun" },
      { char: "ミ", romaji: "mi", strokes: 3, hint: "Tiga garis miring" },
      { char: "ム", romaji: "mu", strokes: 2, hint: "Seperti segitiga terbuka" },
      { char: "メ", romaji: "me", strokes: 2, hint: "Seperti huruf X" },
      { char: "モ", romaji: "mo", strokes: 3, hint: "Seperti huruf E terbalik" }
    ],
    vocabulary: [
      { word: "はな", reading: "hana", meaning: "bunga / hidung", example: "はながきれい — bunganya cantik" },
      { word: "ひと", reading: "hito", meaning: "orang", example: "あのひと — orang itu" },
      { word: "ふね", reading: "fune", meaning: "kapal", example: "ふねにのる — naik kapal" },
      { word: "ほし", reading: "hoshi", meaning: "bintang", example: "ほしがみえる — bisa lihat bintang" },
      { word: "まち", reading: "machi", meaning: "kota", example: "まちをあるく — berjalan di kota" },
      { word: "みず", reading: "mizu", meaning: "air", example: "みずをのむ — minum air" },
      { word: "むし", reading: "mushi", meaning: "serangga", example: "むしがいる — ada serangga" },
      { word: "めし", reading: "meshi", meaning: "nasi / makanan", example: "めしをくう — makan nasi" },
      { word: "もの", reading: "mono", meaning: "benda / hal", example: "たべもの — makanan" },
      { word: "ハム", reading: "hamu", meaning: "ham", example: "ハムサンド — sandwich ham" },
      { word: "ホテル", reading: "hoteru", meaning: "hotel", example: "ホテルにとまる — menginap di hotel" },
      { word: "メモ", reading: "memo", meaning: "memo/catatan", example: "メモをとる — mencatat" }
    ]
  },

  // ===========================
  //  DAY 5 — Ya, Ra, Wa rows + N (や行・ら行・わ行・ん)
  // ===========================
  {
    day: 5,
    title: "Baris Ya, Ra, Wa & N (や行・ら行・わ行・ん)",
    description: "Hari terakhir mempelajari huruf dasar — termasuk ん yang merupakan satu-satunya konsonan tunggal dalam bahasa Jepang.",
    objectives: [
      "Menghafal Hiragana: や ゆ よ ら り る れ ろ わ を ん",
      "Menghafal Katakana: ヤ ユ ヨ ラ リ ル レ ロ ワ ヲ ン",
      "Memahami penggunaan を (wo) sebagai partikel objek",
      "Menghafal 12 kosakata baru"
    ],
    hiragana: [
      { char: "や", romaji: "ya", strokes: 3, hint: "Seperti jangkar kapal" },
      { char: "ゆ", romaji: "yu", strokes: 2, hint: "Seperti ikan berenang" },
      { char: "よ", romaji: "yo", strokes: 2, hint: "Seperti tanda tanya tanpa titik" },
      { char: "ら", romaji: "ra", strokes: 2, hint: "Seperti huruf '5' termodifikasi" },
      { char: "り", romaji: "ri", strokes: 2, hint: "Seperti pita yang turun" },
      { char: "る", romaji: "ru", strokes: 1, hint: "Seperti lingkaran dengan ekor" },
      { char: "れ", romaji: "re", strokes: 2, hint: "Mirip ね tapi lebih terbuka" },
      { char: "ろ", romaji: "ro", strokes: 1, hint: "Seperti angka 3 setengah" },
      { char: "わ", romaji: "wa", strokes: 2, hint: "Mirip れ tanpa garis kiri" },
      { char: "を", romaji: "wo", strokes: 3, hint: "⚠️ Hanya dipakai sebagai partikel objek" },
      { char: "ん", romaji: "n", strokes: 1, hint: "Satu-satunya huruf konsonan tunggal!" }
    ],
    katakana: [
      { char: "ヤ", romaji: "ya", strokes: 2, hint: "Seperti panah ke samping" },
      { char: "ユ", romaji: "yu", strokes: 2, hint: "Seperti kotak terbuka" },
      { char: "ヨ", romaji: "yo", strokes: 3, hint: "Seperti huruf E terbalik" },
      { char: "ラ", romaji: "ra", strokes: 2, hint: "Seperti huruf '7' dengan ekor" },
      { char: "リ", romaji: "ri", strokes: 2, hint: "Dua garis vertikal" },
      { char: "ル", romaji: "ru", strokes: 2, hint: "Seperti akar tanaman" },
      { char: "レ", romaji: "re", strokes: 1, hint: "Satu garis melengkung naik" },
      { char: "ロ", romaji: "ro", strokes: 3, hint: "Seperti kotak (= 口)" },
      { char: "ワ", romaji: "wa", strokes: 2, hint: "Seperti ウ tanpa garis atas" },
      { char: "ヲ", romaji: "wo", strokes: 3, hint: "⚠️ Jarang dipakai, hanya partikel" },
      { char: "ン", romaji: "n", strokes: 2, hint: "Seperti ソ tapi berbeda arah" }
    ],
    vocabulary: [
      { word: "やま", reading: "yama", meaning: "gunung", example: "やまにのぼる — mendaki gunung" },
      { word: "ゆき", reading: "yuki", meaning: "salju", example: "ゆきがふる — salju turun" },
      { word: "よる", reading: "yoru", meaning: "malam", example: "よるになる — menjadi malam" },
      { word: "りんご", reading: "ringo", meaning: "apel", example: "りんごをたべる — makan apel" },
      { word: "ろく", reading: "roku", meaning: "enam", example: "ろくじ — jam enam" },
      { word: "わたし", reading: "watashi", meaning: "saya", example: "わたしはがくせい — saya pelajar" },
      { word: "にほん", reading: "nihon", meaning: "Jepang", example: "にほんごをべんきょうする — belajar bahasa Jepang" },
      { word: "ほん", reading: "hon", meaning: "buku", example: "ほんをよむ — membaca buku" },
      { word: "ラーメン", reading: "raamen", meaning: "ramen", example: "ラーメンをたべる — makan ramen" },
      { word: "レストラン", reading: "resutoran", meaning: "restoran", example: "レストランにいく — pergi ke restoran" },
      { word: "ワイン", reading: "wain", meaning: "wine/anggur", example: "ワインをのむ — minum wine" },
      { word: "リモコン", reading: "rimokon", meaning: "remote control", example: "リモコンをとる — mengambil remote" }
    ]
  },

  // ===========================
  //  DAY 6 — Dakuten & Handakuten (濁点・半濁点)
  // ===========================
  {
    day: 6,
    title: "Dakuten & Handakuten (濁点・半濁点)",
    description: "Menambahkan tanda dakuten (゛) dan handakuten (゜) untuk mengubah bunyi konsonan — ga, za, da, ba, pa.",
    objectives: [
      "Memahami dakuten (゛) mengubah k→g, s→z, t→d, h→b",
      "Memahami handakuten (゜) mengubah h→p",
      "Menghafal semua variasi dakuten/handakuten Hiragana & Katakana",
      "Menghafal 14 kosakata baru"
    ],
    hiragana: [
      { char: "が", romaji: "ga", strokes: 4, hint: "か + ゛= ga" },
      { char: "ぎ", romaji: "gi", strokes: 5, hint: "き + ゛= gi" },
      { char: "ぐ", romaji: "gu", strokes: 2, hint: "く + ゛= gu" },
      { char: "げ", romaji: "ge", strokes: 4, hint: "け + ゛= ge" },
      { char: "ご", romaji: "go", strokes: 3, hint: "こ + ゛= go" },
      { char: "ざ", romaji: "za", strokes: 4, hint: "さ + ゛= za" },
      { char: "じ", romaji: "ji", strokes: 2, hint: "し + ゛= ji" },
      { char: "ず", romaji: "zu", strokes: 3, hint: "す + ゛= zu" },
      { char: "ぜ", romaji: "ze", strokes: 4, hint: "せ + ゛= ze" },
      { char: "ぞ", romaji: "zo", strokes: 2, hint: "そ + ゛= zo" },
      { char: "だ", romaji: "da", strokes: 5, hint: "た + ゛= da" },
      { char: "ぢ", romaji: "di/ji", strokes: 3, hint: "ち + ゛(jarang dipakai)" },
      { char: "づ", romaji: "du/zu", strokes: 2, hint: "つ + ゛(jarang dipakai)" },
      { char: "で", romaji: "de", strokes: 2, hint: "て + ゛= de" },
      { char: "ど", romaji: "do", strokes: 3, hint: "と + ゛= do" },
      { char: "ば", romaji: "ba", strokes: 4, hint: "は + ゛= ba" },
      { char: "び", romaji: "bi", strokes: 2, hint: "ひ + ゛= bi" },
      { char: "ぶ", romaji: "bu", strokes: 5, hint: "ふ + ゛= bu" },
      { char: "べ", romaji: "be", strokes: 2, hint: "へ + ゛= be" },
      { char: "ぼ", romaji: "bo", strokes: 5, hint: "ほ + ゛= bo" },
      { char: "ぱ", romaji: "pa", strokes: 4, hint: "は + ゜= pa" },
      { char: "ぴ", romaji: "pi", strokes: 2, hint: "ひ + ゜= pi" },
      { char: "ぷ", romaji: "pu", strokes: 5, hint: "ふ + ゜= pu" },
      { char: "ぺ", romaji: "pe", strokes: 2, hint: "へ + ゜= pe" },
      { char: "ぽ", romaji: "po", strokes: 5, hint: "ほ + ゜= po" }
    ],
    katakana: [
      { char: "ガ", romaji: "ga", strokes: 3, hint: "カ + ゛" },
      { char: "ギ", romaji: "gi", strokes: 4, hint: "キ + ゛" },
      { char: "グ", romaji: "gu", strokes: 3, hint: "ク + ゛" },
      { char: "ゲ", romaji: "ge", strokes: 4, hint: "ケ + ゛" },
      { char: "ゴ", romaji: "go", strokes: 3, hint: "コ + ゛" },
      { char: "ザ", romaji: "za", strokes: 4, hint: "サ + ゛" },
      { char: "ジ", romaji: "ji", strokes: 4, hint: "シ + ゛" },
      { char: "ズ", romaji: "zu", strokes: 3, hint: "ス + ゛" },
      { char: "ゼ", romaji: "ze", strokes: 3, hint: "セ + ゛" },
      { char: "ゾ", romaji: "zo", strokes: 3, hint: "ソ + ゛" },
      { char: "ダ", romaji: "da", strokes: 4, hint: "タ + ゛" },
      { char: "ヂ", romaji: "di/ji", strokes: 4, hint: "チ + ゛" },
      { char: "ヅ", romaji: "du/zu", strokes: 4, hint: "ツ + ゛" },
      { char: "デ", romaji: "de", strokes: 4, hint: "テ + ゛" },
      { char: "ド", romaji: "do", strokes: 3, hint: "ト + ゛" },
      { char: "バ", romaji: "ba", strokes: 3, hint: "ハ + ゛" },
      { char: "ビ", romaji: "bi", strokes: 3, hint: "ヒ + ゛" },
      { char: "ブ", romaji: "bu", strokes: 2, hint: "フ + ゛" },
      { char: "ベ", romaji: "be", strokes: 2, hint: "ヘ + ゛" },
      { char: "ボ", romaji: "bo", strokes: 5, hint: "ホ + ゛" },
      { char: "パ", romaji: "pa", strokes: 3, hint: "ハ + ゜" },
      { char: "ピ", romaji: "pi", strokes: 3, hint: "ヒ + ゜" },
      { char: "プ", romaji: "pu", strokes: 2, hint: "フ + ゜" },
      { char: "ペ", romaji: "pe", strokes: 2, hint: "ヘ + ゜" },
      { char: "ポ", romaji: "po", strokes: 5, hint: "ホ + ゜" }
    ],
    vocabulary: [
      { word: "がっこう", reading: "gakkou", meaning: "sekolah", example: "がっこうにいく — pergi ke sekolah" },
      { word: "ぎんこう", reading: "ginkou", meaning: "bank", example: "ぎんこうにいく — pergi ke bank" },
      { word: "ざっし", reading: "zasshi", meaning: "majalah", example: "ざっしをよむ — membaca majalah" },
      { word: "じかん", reading: "jikan", meaning: "waktu", example: "じかんがない — tidak ada waktu" },
      { word: "でんわ", reading: "denwa", meaning: "telepon", example: "でんわをかける — menelepon" },
      { word: "どうぶつ", reading: "doubutsu", meaning: "binatang", example: "どうぶつえん — kebun binatang" },
      { word: "ばんごはん", reading: "bangohan", meaning: "makan malam", example: "ばんごはんをたべる — makan malam" },
      { word: "びょういん", reading: "byouin", meaning: "rumah sakit", example: "びょういんにいく — pergi ke RS" },
      { word: "ぱん", reading: "pan", meaning: "roti", example: "ぱんをたべる — makan roti" },
      { word: "ゲーム", reading: "geemu", meaning: "game", example: "ゲームをする — bermain game" },
      { word: "バス", reading: "basu", meaning: "bus", example: "バスにのる — naik bus" },
      { word: "ビール", reading: "biiru", meaning: "bir", example: "ビールをのむ — minum bir" },
      { word: "パン", reading: "pan", meaning: "roti (katakana)", example: "パンやさん — toko roti" },
      { word: "ドア", reading: "doa", meaning: "pintu", example: "ドアをあける — membuka pintu" }
    ]
  },

  // ===========================
  //  DAY 7 — Combination Sounds (拗音) + Review
  // ===========================
  {
    day: 7,
    title: "Kombinasi & Review Total (拗音 + 総復習)",
    description: "Hari terakhir: Pelajari bunyi kombinasi (ya, yu, yo kecil) dan review seluruh huruf yang sudah dipelajari.",
    objectives: [
      "Memahami kombinasi yōon: きゃ きゅ きょ dll.",
      "Menghafal semua 33 kombinasi Hiragana & Katakana",
      "Review total seluruh huruf",
      "Menghafal 14 kosakata percakapan sehari-hari"
    ],
    hiragana: [
      { char: "きゃ", romaji: "kya", strokes: 0, hint: "き + small や" },
      { char: "きゅ", romaji: "kyu", strokes: 0, hint: "き + small ゆ" },
      { char: "きょ", romaji: "kyo", strokes: 0, hint: "き + small よ" },
      { char: "しゃ", romaji: "sha", strokes: 0, hint: "し + small や" },
      { char: "しゅ", romaji: "shu", strokes: 0, hint: "し + small ゆ" },
      { char: "しょ", romaji: "sho", strokes: 0, hint: "し + small よ" },
      { char: "ちゃ", romaji: "cha", strokes: 0, hint: "ち + small や" },
      { char: "ちゅ", romaji: "chu", strokes: 0, hint: "ち + small ゆ" },
      { char: "ちょ", romaji: "cho", strokes: 0, hint: "ち + small よ" },
      { char: "にゃ", romaji: "nya", strokes: 0, hint: "に + small や ← ini favorit Vanilla, nya" },
      { char: "にゅ", romaji: "nyu", strokes: 0, hint: "に + small ゆ" },
      { char: "にょ", romaji: "nyo", strokes: 0, hint: "に + small よ" },
      { char: "ひゃ", romaji: "hya", strokes: 0, hint: "ひ + small や" },
      { char: "ひゅ", romaji: "hyu", strokes: 0, hint: "ひ + small ゆ" },
      { char: "ひょ", romaji: "hyo", strokes: 0, hint: "ひ + small よ" },
      { char: "みゃ", romaji: "mya", strokes: 0, hint: "み + small や" },
      { char: "みゅ", romaji: "myu", strokes: 0, hint: "み + small ゆ" },
      { char: "みょ", romaji: "myo", strokes: 0, hint: "み + small よ" },
      { char: "りゃ", romaji: "rya", strokes: 0, hint: "り + small や" },
      { char: "りゅ", romaji: "ryu", strokes: 0, hint: "り + small ゆ" },
      { char: "りょ", romaji: "ryo", strokes: 0, hint: "り + small よ" },
      { char: "ぎゃ", romaji: "gya", strokes: 0, hint: "ぎ + small や" },
      { char: "じゃ", romaji: "ja", strokes: 0, hint: "じ + small や" },
      { char: "びゃ", romaji: "bya", strokes: 0, hint: "び + small や" },
      { char: "ぴゃ", romaji: "pya", strokes: 0, hint: "ぴ + small や" }
    ],
    katakana: [
      { char: "キャ", romaji: "kya", strokes: 0, hint: "キ + small ヤ" },
      { char: "キュ", romaji: "kyu", strokes: 0, hint: "キ + small ユ" },
      { char: "キョ", romaji: "kyo", strokes: 0, hint: "キ + small ヨ" },
      { char: "シャ", romaji: "sha", strokes: 0, hint: "シ + small ヤ" },
      { char: "シュ", romaji: "shu", strokes: 0, hint: "シ + small ユ" },
      { char: "ショ", romaji: "sho", strokes: 0, hint: "シ + small ヨ" },
      { char: "チャ", romaji: "cha", strokes: 0, hint: "チ + small ヤ" },
      { char: "チュ", romaji: "chu", strokes: 0, hint: "チ + small ユ" },
      { char: "チョ", romaji: "cho", strokes: 0, hint: "チ + small ヨ" },
      { char: "ニャ", romaji: "nya", strokes: 0, hint: "ニ + small ヤ ← にゃ！" },
      { char: "ニュ", romaji: "nyu", strokes: 0, hint: "ニ + small ユ" },
      { char: "ニョ", romaji: "nyo", strokes: 0, hint: "ニ + small ヨ" },
      { char: "ヒャ", romaji: "hya", strokes: 0, hint: "ヒ + small ヤ" },
      { char: "ヒュ", romaji: "hyu", strokes: 0, hint: "ヒ + small ユ" },
      { char: "ヒョ", romaji: "hyo", strokes: 0, hint: "ヒ + small ヨ" },
      { char: "ミャ", romaji: "mya", strokes: 0, hint: "ミ + small ヤ" },
      { char: "ミュ", romaji: "myu", strokes: 0, hint: "ミ + small ユ" },
      { char: "ミョ", romaji: "myo", strokes: 0, hint: "ミ + small ヨ" },
      { char: "リャ", romaji: "rya", strokes: 0, hint: "リ + small ヤ" },
      { char: "リュ", romaji: "ryu", strokes: 0, hint: "リ + small ユ" },
      { char: "リョ", romaji: "ryo", strokes: 0, hint: "リ + small ヨ" },
      { char: "ギャ", romaji: "gya", strokes: 0, hint: "ギ + small ヤ" },
      { char: "ジャ", romaji: "ja", strokes: 0, hint: "ジ + small ヤ" },
      { char: "ビャ", romaji: "bya", strokes: 0, hint: "ビ + small ヤ" },
      { char: "ピャ", romaji: "pya", strokes: 0, hint: "ピ + small ヤ" }
    ],
    vocabulary: [
      { word: "きょう", reading: "kyou", meaning: "hari ini", example: "きょうはいいてんき — cuaca hari ini bagus" },
      { word: "しゃしん", reading: "shashin", meaning: "foto", example: "しゃしんをとる — mengambil foto" },
      { word: "ちゅうごく", reading: "chuugoku", meaning: "Tiongkok", example: "ちゅうごくにいく — pergi ke Tiongkok" },
      { word: "びょうき", reading: "byouki", meaning: "sakit", example: "びょうきになる — menjadi sakit" },
      { word: "りょこう", reading: "ryokou", meaning: "perjalanan", example: "りょこうにいく — pergi bepergian" },
      { word: "じゃあね", reading: "jaane", meaning: "sampai jumpa", example: "じゃあね！ — sampai jumpa!" },
      { word: "おちゃ", reading: "ocha", meaning: "teh", example: "おちゃをのむ — minum teh" },
      { word: "きょうしつ", reading: "kyoushitsu", meaning: "ruang kelas", example: "きょうしつにいく — pergi ke kelas" },
      { word: "しょくじ", reading: "shokuji", meaning: "makan/hidangan", example: "しょくじをする — makan" },
      { word: "にゅうがく", reading: "nyuugaku", meaning: "masuk sekolah", example: "にゅうがくする — masuk sekolah" },
      { word: "ギョーザ", reading: "gyooza", meaning: "gyoza/dumpling", example: "ギョーザをたべる — makan gyoza" },
      { word: "ジュース", reading: "juusu", meaning: "jus", example: "ジュースをのむ — minum jus" },
      { word: "チョコレート", reading: "chokoreeto", meaning: "cokelat", example: "チョコレートがすき — suka cokelat" },
      { word: "シャツ", reading: "shatsu", meaning: "kemeja", example: "シャツをきる — memakai kemeja" }
    ]
  }
];
