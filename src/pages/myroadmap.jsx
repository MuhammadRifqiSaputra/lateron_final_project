import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Sesuaikan dengan path file logo kamu
import l2 from "../assets/logo2.jpg";  // Sesuaikan dengan path file logo footer kamu

// ================= SIMULASI PENGAMBILAN PROFILE USER =================
// Ubah string di bawah ini ke: "TOEFL", "JLPT", "HSK", "TOPIK", atau "CAE" 
// untuk melihat seluruh struktur minggu dan materi harian berubah secara otomatis.
const TARGET_TEST_FROM_PROFILE = "IELTS";

// ================= DATA MASTER SILABUS 4 MINGGU (6 JENIS TES) =================
const ROADMAP_DICTIONARY = {
  IELTS: [
    {
      id: 1,
      title: "Simple Present Tense & Speaking Foundation",
      weekLabel: "Minggu 1",
      desc: "Pelajari bagaimana menyatakan fakta ilmiah, rutinitas sehari-hari, dan general truths yang sangat krusial untuk mendongkrak skor grammar dasar Anda.",
      progress: 100,
      days: [
        {
          id: 1, label: "Hari 1", title: "Introduction to Simple Present",
          description: "Hari pertama berfokus pada pemahaman dasar kapan kita harus menggunakan Simple Present Tense dalam tes IELTS, terutama untuk menceritakan fakta ilmiah, rutinitas, dan general truths.",
          points: ["Memahami fungsi utama Simple Present Tense", "Membedakan antara kalimat fakta (fakta umum) dan kebiasaan (routines)", "Mengenal penanda waktu dasar (every day, always, usually)", "Analisis penggunaan Present Tense pada IELTS Writing Task 1 (fakta grafik)"],
          formula: "Subject + Verb 1 (s/es) + Object / Complement",
          examples: ["The sun rises in the east (Fakta ilmiah).", "I prepare for the IELTS test every morning (Rutinitas).", "Water boils at 100 degrees Celsius (General truth)."]
        },
        {
          id: 2, label: "Hari 2", title: "Subject & Verb Basics",
          description: "Kunci utama dari Present Tense adalah kesesuaian antara subjek dan kata kerja (Subject-Verb Agreement). Hari ini kita membedakan perlakuan kata kerja untuk subjek tunggal dan jamak.",
          points: ["Mengidentifikasi subjek tunggal (Singular) dan jamak (Plural)", "Aturan dasar kata kerja dasar (Base Form Verb) tanpa imbuhan", "Kapan kata kerja tidak perlu ditambahkan akhiran s/es", "Menghindari error mendasar pada IELTS Speaking Section"],
          formula: "I / You / We / They + Verb 1 (Tanpa s/es)",
          examples: ["They study English grammar together.", "We write essays every week to improve our score.", "Many students choose IELTS over TOEFL nowadays."]
        },
        {
          id: 3, label: "Hari 3", title: "He / She / It (IMPORTANT)",
          description: "Bagian paling krusial yang sering menjadi jebakan nilai. Subjek orang ketiga tunggal membutuhkan perubahan akhiran kata kerja yang spesifik.",
          points: ["Aturan penambahan akhiran -s, -es, atau -ies pada kata kerja", "Perubahan kata kerja berakhiran huruf 'y' (study -> studies, play -> plays)", "Pengecualian kata kerja ireguler khusus seperti 'have' menjadi 'has'", "Latihan ketelitian tulisan untuk menghindari pengurangan skor di Writing Task 2"],
          formula: "He / She / It + Verb 1 (+s/es/ies)",
          examples: ["She speaks English fluently in the interview.", "The university offers a great scholarship program.", "He goes to the library to practice listening sections."]
        },
        {
          id: 4, label: "Hari 4", title: "Negative Sentences",
          description: "Hari ini kita belajar bagaimana menyangkal atau membuat kalimat negatif. Kita akan mulai menggunakan kata kerja bantu (auxiliary verb) 'do' dan 'does'.",
          points: ["Memahami fungsi kata bantu 'Do Not' (Don't) dan 'Does Not' (Doesn't)", "Aturan penting: Kata kerja kembali ke bentuk dasar setelah 'does not'", "Membuat kalimat sanggahan formal untuk kebutuhan akademis", "Strategi merespon pertanyaan negatif pada wawancara Speaking"],
          formula: "Subjek + Do / Does + NOT + Verb 1 (Bentuk Dasar)",
          examples: ["I do not agree with the government's education policy.", "She does not live in London at the moment.", "The research does not support the initial hypothesis."]
        },
        {
          id: 5, label: "Hari 5", title: "Questions (Interrogative)",
          description: "Bagian ini sangat berguna untuk menghadapi IELTS Speaking Part 3, di mana kita harus memahami struktur kalimat tanya dengan benar, baik Yes/No Questions maupun WH- Questions.",
          points: ["Menyusun kalimat tanya Yes/No menggunakan Do dan Does di depan kalimat", "Mempelajari struktur kalimat tanya menggunakan 5W+1H (What, Where, Why, etc.)", "Intonasi yang benar saat melontarkan pertanyaan dalam bahasa Inggris", "Cara menjawab pertanyaan interviewer dengan struktur gramatikal yang tepat"],
          formula: "Do / Does + Subject + Verb 1 + ? atau Wh- Word + Do/Does + Subject + Verb 1 + ?",
          examples: ["Do you practice listening sections every day?", "Where does the examiner usually conduct the test?", "Why do many candidates fail to get band 7?"]
        },
        {
          id: 6, label: "Hari 6", title: "Adverbs of Frequency",
          description: "Untuk memperkaya variasi kalimat (Lexical Resource) di IELTS, kita perlu menambahkan kata keterangan seberapa sering sebuah aktivitas dilakukan.",
          points: ["Mengenal tingkatan Adverbs of Frequency (Always, Usually, Often, Sometimes, Seldom, Never)", "Aturan posisi penempatan Adverb sebelum kata kerja utama (Verb)", "Aturan posisi penempatan Adverb setelah kata kerja bantu 'To Be' (am/is/are)", "Meningkatkan variasi kosakata agar struktur kalimat tidak membosankan"],
          formula: "Subject + Adverb of Frequency + Verb 1 atau Subject + To Be + Adverb",
          examples: ["I always review my vocabulary list before sleeping.", "She is often nervous during the speaking simulator.", "They seldom make grammatical errors in writing."]
        },
        {
          id: 7, label: "Hari 7", title: "Practice Lesson",
          description: "Hari terakhir adalah waktu untuk menguji pemahaman totalmu. Materi hari ini menggabungkan semua aturan dari Hari 1 hingga Hari 6 sebelum kamu mengambil kuis evaluasi.",
          points: ["Review komprehensif seluruh materi Simple Present Tense", "Mendeteksi kesalahan penulisan (error correction exercise)", "Simulasi penggabungan kalimat positif, negatif, dan tanya secara lisan", "Persiapan mental dan pemantapan materi sebelum menekan tombol 'Start Quiz'"],
          formula: "Review Komprehensif: Gabungan Semua Rumus Hari 1 - Hari 6",
          examples: ["Positive: He scores band 8.0.", "Negative: He does not score band 8.0.", "Interrogative: Does he score band 8.0?"]
        }
      ]
    },
    {
      id: 2,
      title: "Simple Past Tense & Narrating Experiences",
      weekLabel: "Minggu 2",
      desc: "Membahas tuntas menceritakan kejadian masa lampau untuk kebutuhan performa prima di IELTS Speaking Part 2 dan penulisan laporan data historis.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Regular vs Irregular Past Verbs",
          description: "Memahami perubahan bentuk kata kerja lampau baik yang berakhiran -ed maupun yang berubah total (irregular).",
          points: ["Menguasai perubahan kata kerja reguler", "Menghafal irregular verbs krusial untuk ujian", "Menghindari pencampuran tenses masa kini dan lampau"],
          formula: "Subject + Verb 2 + Object / Complement",
          examples: ["The government increased the budget last year.", "I took my first mock test two weeks ago."]
        },
        {
          id: 2, label: "Hari 2", title: "Past Continuous Interruption",
          description: "Menyusun struktur kalimat kompleks yang menggabungkan aktivitas yang sedang berlangsung di masa lalu dengan interupsi mendadak.",
          points: ["Penggunaan was/were sesuai subjek", "Menghubungkan dua klausa menggunakan 'when' atau 'while'"],
          formula: "Subject + Was/Were + Verb-ing + when + Subject + Verb 2",
          examples: ["I was writing the essay when the alarm went off.", "While they were discussing the prompt, the examiner walked in."]
        }
      ]
    },
    {
      id: 3,
      title: "Reading Comprehension - Skimming & Scanning",
      weekLabel: "Minggu 3",
      desc: "Fokus mengasah teknik membaca cepat tanpa kehilangan poin gagasan utama untuk mengatasi batasan waktu ketat teks akademik.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Skimming for Main Ideas",
          description: "Membaca teks secara sekilas dalam hitungan detik untuk menangkap inti dari sebuah paragraf tanpa membaca kata demi kata.",
          points: ["Membaca kalimat pertama dan terakhir paragraf", "Mengabaikan detail teknis dan berfokus pada topik besar"],
          formula: "Skimming Strategy == Reading Header + First Sentence + Last Sentence",
          examples: ["Paragraph A discusses climate shifts; detailed dates can be skipped initially."]
        },
        {
          id: 2, label: "Hari 2", title: "Scanning for Specific Keywords",
          description: "Teknik mencari kata kunci spesifik seperti angka, nama orang, lokasi, atau istilah ilmiah dalam teks bacaan panjang.",
          points: ["Menggerakkan mata secara zigzag mencari pola huruf kapital atau angka", "Menandai kata kunci penunjuk soal"],
          formula: "Scanning Target == Scan for Numbers, Capital Letters, or Italics",
          examples: ["Finding '1984' or 'Professor Smith' instantly within a 500-word page."]
        }
      ]
    },
    {
      id: 4,
      title: "Listening Section - Core Signal Words",
      weekLabel: "Minggu 4",
      desc: "Melatih kepekaan pendengaran menangkap kata kunci penting dan perubahan opini di tengah-tengah percakapan audio.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Identifying Synonyms in Audio",
          description: "Mendeteksi jebakan di mana kata di kertas soal sering kali diucapkan menggunakan sinonim yang berbeda pada audio.",
          points: ["Membiasakan diri dengan parafrase penutur asli", "Mencatat kata kunci sebelum audio diputar"],
          formula: "Audio Text (Synonym) == Question Keyword (Target Match)",
          examples: ["Audio says 'highly sophisticated', Question says 'advanced technology'."]
        },
        {
          id: 2, label: "Hari 2", title: "Tracking Contrast Signpost Words",
          description: "Waspada terhadap kata peralihan yang membatalkan pernyataan sebelumnya secara mendadak.",
          points: ["Mengenali kata transisi (However, But, Although, On the other hand)", "Menentukan jawaban final setelah kontras diucapkan"],
          formula: "Statement A + BUT + Statement B (Statement B is usually the answer)",
          examples: ["'I wanted to block out Thursday, but Friday is much better.' -> Answer: Friday."]
        }
      ]
    }
  ],
  TOEFL: [
    {
      id: 1,
      title: "Structure & Written Expression - Sentence Core",
      weekLabel: "Minggu 1",
      desc: "Mengasah kemampuan mengenali pondasi kalimat bahasa Inggris baku yang lengkap secara struktural untuk TOEFL ITP Section 2.",
      progress: 100,
      days: [
        {
          id: 1, label: "Hari 1", title: "Missing Subject and Verb Mechanics",
          description: "Memastikan setiap kalimat mandiri memiliki komponen subjek dan kata kerja utama yang valid.",
          points: ["Mendeteksi kalimat rumpang tanpa subjek", "Menemukan kata kerja utama tersembunyi"],
          formula: "1 Independent Clause == 1 Subject + 1 Verb",
          examples: ["____ was backed up for miles on the freeway. (A) Yesterday (B) Traffic [Benar: B]"]
        },
        {
          id: 2, label: "Hari 2", title: "Objects of Prepositions Pitfalls",
          description: "Menghindari jebakan kata benda yang mengekor setelah preposisi dan sering mengecoh sebagai subjek utama.",
          points: ["Mengisolasi frase preposisi (in, at, under, behind)", "Mencari subjek asli di luar lingkaran preposisi"],
          formula: "Preposition + Noun == Object of Preposition (Not a Subject)",
          examples: ["To the graduate students ____ offered a grant. (A) the dean (B) was [Benar: A]"]
        }
      ]
    },
    {
      id: 2,
      title: "Structure - Multiple Clauses & Connectors",
      weekLabel: "Minggu 2",
      desc: "Menguasai penggabungan beberapa klausa menggunakan kata hubung koordinatif dan adverbial dengan tepat.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Coordinate Connectors Alignment",
          description: "Menggunakan kata hubung and, but, or, so, yet untuk merangkai dua klausa setara.",
          points: ["Menempatkan tanda koma sebelum kata hubung", "Memastikan keseimbangan struktur klausa"],
          formula: "Subject + Verb , [and/but/or/so] + Subject + Verb",
          examples: ["The power went out, so the computer shut down unexpectedly."]
        },
        {
          id: 2, label: "Hari 2", title: "Adverb Time & Cause Connectors",
          description: "Memahami pemindahan posisi connector waktu di awal atau di tengah kalimat majemuk.",
          points: ["Pemberian koma jika connector di awal kalimat", "Mengenali kata hubung (before, since, because, although)"],
          formula: "Connector + Subject + Verb , Subject + Verb",
          examples: ["Because the report was late, the director requested a meeting."]
        }
      ]
    },
    {
      id: 3,
      title: "Listening - Short Dialogues & Inferences",
      weekLabel: "Minggu 3",
      desc: "Mempelajari strategi mendengarkan baris kedua pada dialog pendek untuk menarik kesimpulan makna tersirat.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Focusing on the Second Line",
          description: "Kunci utama dialog pendek TOEFL hampir selalu berada pada respons pembicara kedua.",
          points: ["Menaruh perhatian penuh pada pembicara terakhir", "Mengabaikan repetisi di pembicara pertama"],
          formula: "Speaker 1 + SPEAKER 2 (Main Focus) == Location of Answer Key",
          examples: ["Man: 'Are you ready?' Woman: 'I haven't even started yet.' -> Meaning: She is not ready."]
        }
      ]
    },
    {
      id: 4,
      title: "Reading Comprehension - Vocabulary in Context",
      weekLabel: "Minggu 4",
      desc: "Menembak arti kosakata asing dalam bacaan menggunakan petunjuk kontekstual di sekitarnya.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Structural Context Clues",
          description: "Melihat tanda baca khusus seperti koma, tanda kurung, atau dashes sebagai indikator definisi kata.",
          points: ["Mendeteksi appositive penjelas arti", "Membaca jeli kalimat pendukung kosakata terkait"],
          formula: "Unknown Word , [Definition/Synonym] , or (Definition)",
          examples: ["The appraisal, or valuation, of the property took three business days."]
        }
      ]
    }
  ],
  JLPT: [
    {
      id: 1,
      title: "Gengo Chishiki - Tata Bahasa & Partikel N5",
      weekLabel: "Minggu 1",
      desc: "Penguasaan susunan kalimat dasar bahasa Jepang, penanda topik, subjek, serta objek partikel.",
      progress: 100,
      days: [
        {
          id: 1, label: "Hari 1", title: "Partikel Wa (は) & Ga (が) Mastery",
          description: "Membedakan penekanan topik pembicaraan umum dengan penegasan subjek spesifik.",
          points: ["Menggunakan Wa untuk subjek utama", "Menggunakan Ga untuk keberadaan benda atau kata sifat"],
          formula: "[Topik] + は + [Predikat] です  /  [Subjek] + が + います/あります",
          examples: ["わたしは アマンダ です。", "つくえの上に 本が あります。"]
        }
      ]
    },
    {
      id: 2,
      title: "Katakana & Huruf Kanji Dasar N5",
      weekLabel: "Minggu 2",
      desc: "Mengenali kosakata serapan asing serta simbol kanji alam dan angka yang kerap muncul di lembar ujian.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Katakana Loanwords Identification",
          description: "Melatih pelafalan kata serapan barat ke fonetik Jepang agar mudah ditebak maknanya.",
          points: ["Membaca kombinasi huruf Katakana panjang", "Menghubungkan arti kata dengan bahasa Inggris asli"],
          formula: "Katakana Characters == Foreign Words Translation",
          examples: ["トイレ (Toire) = Toilet", "コンピューター (Konpyuutaroo) = Computer"]
        }
      ]
    },
    {
      id: 3,
      title: "Dokkai - Membaca Pola Kalimat Pendek",
      weekLabel: "Minggu 3",
      desc: "Strategi membaca memo, pengumuman, dan cerita pendek dalam aksara Hiragana serta Kanji dasar.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Finding the Core Verb at the End",
          description: "Memahami struktur bahasa Jepang di mana kata kerja utama selalu diletakkan di akhir kalimat.",
          points: ["Memotong kalimat per partikel", "Langsung melompat ke akhir kalimat untuk mengetahui tindakan"],
          formula: "Subject + Object + VERB (At the very end)",
          examples: ["kore wa kinou gakkou de kaimashita (Ini kemarin dibeli di sekolah)."]
        }
      ]
    },
    {
      id: 4,
      title: "Choukai - Ujian Mendengarkan Respon Cepat",
      weekLabel: "Minggu 4",
      desc: "Melatih pendengaran untuk menangkap instruksi arah, waktu, dan jam dalam situasi sehari-hari.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Time and Counting Units Listen",
          description: "Menyaring angka penunjuk jam, hari, dan jumlah barang yang sering dimanipulasi di pilihan jawaban.",
          points: ["Menghafal pengecualian hitungan (Yokka, Itsuandtsu)", "Fokus pada perubahan keputusan pembicara"],
          formula: "Number + Counter Suffix (Ji, Fun, Nin, Mai)",
          examples: ["Sannin (3 orang), Gatsu (Bulan), Nanji (Jam berapa)."]
        }
      ]
    }
  ],
  HSK: [
    {
      id: 1,
      title: "Pinyin Phonetics & Sentence Structure 1",
      weekLabel: "Minggu 1",
      desc: "Mempelajari intonasi nada mandarin, inisial, final, serta urutan struktur subjek-predikat-objek standar.",
      progress: 100,
      days: [
        {
          id: 1, label: "Hari 1", title: "Four Core Tones & SVO Order",
          description: "Penguasaan mutlak 4 nada dasar vokal agar tidak keliru arti saat tes lisan maupun mendengar.",
          points: ["Melatih intonasi datar, naik, ayun, dan turun", "Menyusun klausa dasar mandarin"],
          formula: "Subject + Verb + Object (No Verb Tense Changes)",
          examples: ["我爱汉语 (Wǒ ài Hànyǔ - Saya cinta bahasa Mandarin)."]
        }
      ]
    },
    {
      id: 2,
      title: "Time Expressions & Modifiers Position",
      weekLabel: "Minggu 2",
      desc: "Meletakkan penunjuk waktu dan kata keterangan sebelum kata kerja sesuai tata bahasa Mandarin baku.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Time-When Placement Rule",
          description: "Aturan ketat penempatan keterangan waktu yang dilarang keras ditaruh di akhir kalimat.",
          points: ["Menaruh keterangan waktu tepat sebelum/sesudah subjek", "Membedakan durasi waktu dengan titik waktu"],
          formula: "Subject + Time When + Verb + Object",
          examples: ["我明天去学校 (Wǒ míngtiān qù xuéxiào - Saya besok pergi ke sekolah)."]
        }
      ]
    },
    {
      id: 3,
      title: "Listening - Image Matching Validation",
      weekLabel: "Minggu 3",
      desc: "Taktik mencocokkan dialog pendek audio HSK dengan gambar visual petunjuk yang tersedia secara akurat.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Action Verbs Matching Focus",
          description: "Menjaring kata kerja aksi utama dari rekaman suara untuk mencocokkan objek gambar.",
          points: ["Menandai kata benda dominan", "Menghubungkan kata kerja seperti Xie, Chi, Kan dengan visual"],
          formula: "Audio Key Action == Image Representation",
          examples: ["Hearing 'Xie zi' (Menulis kata) -> Match image of a person writing."]
        }
      ]
    },
    {
      id: 4,
      title: "Reading - Sentence Completion Patterns",
      weekLabel: "Minggu 4",
      desc: "Mengisi kekosongan teks menggunakan pilihan kata benda, sifat, atau tugas yang tepat berdasarkan kategori gramatikal.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Measure Words Selection Track",
          description: "Memilih kata bantu bilangan yang cocok berpasangan dengan kata benda target.",
          points: ["Mengenal kata bantu umum Ge, Ben, Zhi", "Menganalisis jenis benda setelah ruang kosong"],
          formula: "Number / Demonstrative + MEASURE WORD + Noun",
          examples: ["一本书 (Yì běn shū - Sebuah buku), 这个人 (Zhè ge rén)."]
        }
      ]
    }
  ],
  TOPIK: [
    {
      id: 1,
      title: "Korean Sentence Structure & Subject Particles",
      weekLabel: "Minggu 1",
      desc: "Transisi alur berpikir ke pola kalimat SOV (Subjek-Objek-Predikat) dan penempelan partikel vokal/konsonan.",
      progress: 100,
      days: [
        {
          id: 1, label: "Hari 1", title: "SOV Realignment & Eun/Neun",
          description: "Memahami struktur dasar kalimat Korea di mana kata kerja wajib ditaruh di bagian paling belakang.",
          points: ["Menempelkan Eun/Neun pada subjek utama/topik", "Memastikan objek mendahului kata kerja"],
          formula: "Subject +은/는 + Object + 을/를 + Verb/Adjective",
          examples: ["저는 한국어를 공부합니다 (Saya belajar bahasa Korea)."]
        }
      ]
    },
    {
      id: 2,
      title: "Honorifics & Formal Ending Conjugation",
      weekLabel: "Minggu 2",
      desc: "Mengubah kata kerja dasar ke bentuk formal sopan (Ayo/Oyo dan Sumnida) yang mutlak dipakai dalam teks ujian TOPIK.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "De-stemming Verbs & Sumnida Fitting",
          description: "Menghilangkan akhiran 'Da' pada kata kerja dasar dan menggantinya dengan akhiran formal resmi.",
          points: ["Mendeteksi batchim (konsonan bawah) kata kerja", "Memilih akhiran -sumnida atau -bni-da"],
          formula: "Verb Stem (With Batchim) + 습니다  /  (No Batchim) + ㅂ니다",
          examples: ["먹다 -> 먹습니다 (Makan)", "가다 -> 갑니다 (Pergi)"]
        }
      ]
    },
    {
      id: 3,
      title: "Listening - Situational Dialogue Tracking",
      weekLabel: "Minggu 3",
      desc: "Menganalisis lokasi, topik pembicaraan, dan hubungan antar pembicara di dalam rekaman audio pendek.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Identifying Common Place Vocab",
          description: "Menangkap kata penunjuk lokasi umum melalui kosa kata aktivitas penunjang di percakapan.",
          points: ["Mendengar kata kunci seperti gyeolje (bayar), chaek (buku)", "Menyimpulkan lokasi toko atau perpustakaan"],
          formula: "Activity Clues == Spatial Location Inference",
          examples: ["Hearing 'Upyo' (Perangko) and 'Pyeonji' (Surat) -> Location: Ucheguk (Kantor Pos)."]
        }
      ]
    },
    {
      id: 4,
      title: "Reading - Contextual Adverbs & Connectors",
      weekLabel: "Minggu 4",
      desc: "Menghubungkan dua buah kalimat terpisah menggunakan kata sambung sebab-akibat atau pertentangan yang serasi.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Geureona vs Geurigo Context Analysis",
          description: "Memilih konjungsi awal kalimat yang tepat sesuai dengan korelasi logika kalimat satu dan dua.",
          points: ["Mendeteksi kontradiksi makna antar kalimat", "Mengenali fungsi Geureona, Geureomyon, Geurigo"],
          formula: "Sentence 1. + [Adverb Connector] + Sentence 2.",
          examples: ["비가 오다. (Geureona) berselancar tetap menyenangkan."]
        }
      ]
    }
  ],
  CAE: [
    {
      id: 1,
      title: "Use of English - Key Word Transformation",
      weekLabel: "Minggu 1",
      desc: "Melatih ketajaman gramatikal tingkat C1 melalui metode merombak struktur sintaks tanpa mengubah esensi makna asli.",
      progress: 100,
      days: [
        {
          id: 1, label: "Hari 1", title: "Inversion & Phrasal Verbs Constraints",
          description: "Menulis ulang kalimat target menggunakan kata kunci wajib berkisar antara 3 sampai 6 kata saja.",
          points: ["Menguasai struktur inversi formal penekanan", "Mempertahankan keselarasan tenses asal"],
          formula: "Original Sentence -> [Given Keyword (Unchanged)] -> New Identical Sentence",
          examples: ["'Joan found it difficult to decide.' -> CHOSEN -> 'Joan had difficulty in choosing what to do.'"]
        }
      ]
    },
    {
      id: 2,
      title: "Reading - Multiple Matching Strategies",
      weekLabel: "Minggu 2",
      desc: "Mencocokkan sekumpulan pertanyaan opini dengan cuplikan teks artikel opini dari beberapa penulis berbeda.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Identifying Paraphrased Opinions",
          description: "Mendeteksi parafrase kalimat abstrak tingkat tinggi untuk menemukan kesamaan pandangan antar komentator.",
          points: ["Mengisolasi kata kunci emosi/argumen teks", "Menghindari jebakan kecocokan kata verbal semu"],
          formula: "Abstract Prompt Statement == Highly Parafrased Text Chunk",
          examples: ["Prompt: 'Shares writer's skeptical view.' -> Text: 'He is deeply unconvinced about the outcome.'"]
        }
      ]
    },
    {
      id: 3,
      title: "Writing - Formal Essay & Proposal Cohesion",
      weekLabel: "Minggu 3",
      desc: "Menyusun teks proposal atau esai ekspositori C1 dengan tingkat kejelasan argumen dan struktur tata bahasa tingkat tinggi.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Advanced Inversion for Impact",
          description: "Mengaplikasikan pola kalimat inversi negatif di awal paragraf untuk mendongkrak penilaian kriteria fleksibilitas struktur.",
          points: ["Memindahkan adverb negatif ke depan", "Membalik susunan subjek dan kata kerja bantu"],
          formula: "Rarely / Seldom / Not only + Auxiliary + Subject + Main Verb",
          examples: ["Seldom have I witnessed such an outstanding display of academic excellence."]
        }
      ]
    },
    {
      id: 4,
      title: "Listening - Multiple Choice Nuances",
      weekLabel: "Minggu 4",
      desc: "Menguraikan makna monolog panjang tentang topik sosiologi atau profesional yang sarat akan metafora penutur asli.",
      progress: 0,
      days: [
        {
          id: 1, label: "Hari 1", title: "Decoding Speaker Nuance & Attitude",
          description: "Menangkap sikap asli, perasaan terselubung, atau kesepakatan tersirat dari dua pembicara profesional.",
          points: ["Menganalisis intonasi sarkasme atau keraguan", "Melihat kesimpulan besar di akhir diskusi"],
          formula: "Literal Speech Verbalizing != Underlying Speaker Stance",
          examples: ["Speaker says 'Right, as if that would ever work' -> Meaning: He thinks it will fail."]
        }
      ]
    }
  ]
};

export default function MyRoadmap() {
  const navigate = useNavigate();

  // 1. VIEW STATE CONTROL
  const [viewMode, setViewMode] = useState("list"); // "list" atau "detail"
  const [selectedWeek, setSelectedWeek] = useState(null);

  // 2. STATE UTAMA DATA ROADMAP - OTOMATIS BERUBAH TOTAL SESUAI TARGET TES DARI PROFILE
  const [weeksData, setWeeksData] = useState(() => {
    return ROADMAP_DICTIONARY[TARGET_TEST_FROM_PROFILE] || [];
  });

  // 3. INTERNAL NAVIGATION STATE
  const [activeDay, setActiveDay] = useState(1);

  // 4. HITUNG TOTAL PROGRES KESELURUHAN SECARA OTOMATIS
  const totalWeeks = weeksData.length;
  const totalProgressSum = weeksData.reduce((sum, item) => sum + item.progress, 0);
  const overallPercentage = totalWeeks > 0 ? Math.round(totalProgressSum / totalWeeks) : 0;

  // 5. ACTION HANDLER MASUK KE DETAIL
  const handleOpenDetail = (week) => {
    if (!week.days || week.days.length === 0) {
      alert(`Materi detail untuk ${week.weekLabel} sedang disiapkan!`);
      return;
    }
    setSelectedWeek(week);
    setActiveDay(1); 
    setViewMode("detail");
  };

  // 6. ACTION HANDLER SELESAI KUIS (UPDATE PROGRESS SECARA MUTABLE)
  const handleFinishQuiz = () => {
    if (!selectedWeek) return;

    setWeeksData((prevData) =>
      prevData.map((w) => {
        if (w.id === selectedWeek.id) {
          const nextProgress = w.progress === 0 ? 60 : 100;
          // Selaraskan state selectedWeek yang sedang aktif dibaca di layar detail
          setSelectedWeek({ ...w, progress: nextProgress });
          return { ...w, progress: nextProgress };
        }
        return w;
      })
    );

    alert(`Kuis Mingguan ${TARGET_TEST_FROM_PROFILE} Selesai! Progress belajar Anda otomatis bertambah.`);
    setViewMode("list"); 
  };

  return (
    <div className="min-h-screen bg-white antialiased flex flex-col justify-between">
      
      {/* ================= NAVBAR GLOBAL ================= */}
      <nav className="bg-[#2471A3] flex items-center justify-between px-16 py-4 sticky top-0 z-50 shadow-sm text-white">
        <div className="shrink-0 cursor-pointer" onClick={() => { setViewMode("list"); navigate("/dashboard"); }}>
          <img src={logo} alt="Lateron" className="w-[100px] h-auto object-contain brightness-0 invert" />
        </div>
        
        <div className="flex items-center gap-8 text-[15px] opacity-90">
          <Link to="/dashboard" className="hover:underline">Home</Link>
          <Link to="/generate" className="hover:underline">Generate</Link>
          <button onClick={() => setViewMode("list")} className="font-bold border-b-2 border-white pb-1 bg-transparent text-white cursor-pointer">My Roadmap</button>
          <Link to="/profile" className="hover:underline">Profile</Link>
        </div>
      </nav>

      {/* ================= CONTENT AREA ================= */}
      
      {viewMode === "list" ? (
        /* ---------------- TAMPILAN 1: UTAMA / LIST MINGGUAN ---------------- */
        <main className="max-w-6xl w-full mx-auto px-8 py-12 flex-grow">
          
          {/* Header Ringkasan */}
          <div className="flex justify-between items-start border-b border-gray-100 pb-8 mb-12">
            <div>
              <h1 className="text-[32px] font-bold text-[#143F5E] mb-1">My Learning Roadmap</h1>
              <p className="text-[14px] text-gray-400 font-medium tracking-wide uppercase">
                Kategori Target: <span className="text-[#2471A3] font-bold">{TARGET_TEST_FROM_PROFILE} Preparation</span> &bull; {totalWeeks} Weeks Plan
              </p>
            </div>
            <div className="text-right">
              <h2 className="text-[40px] font-bold text-[#76D7C4] leading-none mb-1">{overallPercentage}%</h2>
              <p className="text-[16px] font-bold text-[#76D7C4] mb-1">Completed</p>
              <p className="text-[13px] text-[#2471A3] italic font-medium">You are getting closer to your goal.</p>
            </div>
          </div>

          {/* Timeline Wrapper */}
          <div className="relative pl-4">
            {weeksData.map((item, index) => {
              const isCompleted = item.progress === 100;
              const isOngoing = item.progress > 0 && item.progress < 100;
              const isLocked = item.progress === 0;

              return (
                <div key={item.id} className="flex items-start gap-12 relative pb-16 last:pb-0">
                  {index !== weeksData.length - 1 && (
                    <div className="absolute left-[15px] top-8 bottom-0 w-[1.5px] bg-gray-200 z-0" />
                  )}

                  <div className="relative z-10 flex items-center gap-6 w-[130px] shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted ? "bg-[#2471A3] border-[#2471A3]" : "bg-[#EAF2F8] border-white"
                    }`}>
                      {isCompleted ? (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <div className={`w-2.5 h-2.5 rounded-full ${isOngoing ? "bg-[#2471A3]" : "bg-white"}`} />
                      )}
                    </div>
                    <span className={`text-[16px] font-bold ${isLocked ? "text-gray-400" : "text-[#143F5E]"}`}>
                      {item.weekLabel}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className={`text-[18px] font-bold mb-2 ${isLocked ? "text-gray-400" : "text-[#143F5E]"}`}>
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-gray-400 leading-relaxed mb-4 text-justify">
                      {item.desc}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-[13px] font-bold text-gray-400 w-8">{item.progress}%</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#76D7C4] rounded-full transition-all duration-500" 
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-[140px] shrink-0 text-right pt-2">
                    <button
                      onClick={() => handleOpenDetail(item)}
                      className={`w-full text-[14px] font-semibold py-2.5 px-6 rounded-full transition-all cursor-pointer ${
                        isLocked
                          ? "bg-[#9FB5C4] text-white hover:bg-gray-400"
                          : "bg-[#2471A3] text-white hover:bg-[#1C5D86]"
                      }`}
                    >
                      {isLocked ? "Mulai" : "Tinjau Ulang"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      ) : (
        /* ---------------- TAMPILAN 2: DETAIL HARIAN ---------------- */
        <main className="max-w-7xl w-full mx-auto px-16 py-10 flex-grow flex gap-16">
          
          {/* Sidebar Navigasi Hari */}
          <div className="w-[26%] shrink-0 border-r border-gray-100 pr-10">
            <button 
              onClick={() => setViewMode("list")}
              className="flex items-center gap-2 text-[14px] text-gray-700 font-semibold hover:text-[#2471A3] transition-colors mb-8 bg-transparent border-none cursor-pointer"
            >
              <span>&larr;</span> Kembali ke roadmap
            </button>

            <h2 className="text-[20px] font-bold text-[#143F5E] mb-1">Rencana Belajar</h2>
            <p className="text-[13px] text-gray-400 mb-8">{selectedWeek?.days.length} materi aktif siap dipelajari</p>

            <div className="flex flex-col gap-1.5">
              {selectedWeek?.days.map((day) => {
                const isActive = activeDay === day.id;
                return (
                  <div
                    key={day.id}
                    onClick={() => setActiveDay(day.id)}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      isActive ? "bg-[#D6EAF8] text-[#143F5E]" : "bg-white hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    <p className={`text-[11px] font-semibold mb-1 ${isActive ? "text-[#2471A3]" : "text-gray-400"}`}>
                      {day.label}
                    </p>
                    <p className="text-[14px] font-bold leading-snug">{day.title}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Area Konten Kanan Dinamis */}
          {(() => {
            const currentDayData = selectedWeek?.days.find(d => d.id === activeDay);
            return (
              <div className="flex-1 pl-4 pt-10">
                <p className="text-[13px] text-gray-400 font-semibold mb-1">
                  {selectedWeek?.weekLabel} &bull; Hari {activeDay}
                </p>
                <h1 className="text-[24px] font-bold text-[#143F5E] mb-2">
                  {currentDayData?.title}
                </h1>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-8 text-justify">
                  {currentDayData?.description}
                </p>

                {/* Section: What You Will Learn */}
                <div className="mb-8">
                  <h3 className="text-[15px] font-bold text-[#143F5E] mb-3">What You Will Learn</h3>
                  <ul className="list-disc list-inside text-[13px] text-gray-600 space-y-2 pl-1">
                    {currentDayData?.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>

                {/* Section: Learning Material */}
                <div className="mb-8">
                  <h3 className="text-[15px] font-bold text-[#143F5E] mb-3">Learning Material</h3>
                  <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
                    Pelajari dan ingat pola struktur rumus penting di bawah ini dengan seksama.
                  </p>
                  <div className="w-full bg-[#D6EAF8] text-[#143F5E] font-bold text-[15px] py-4 rounded-xl text-center shadow-xs select-all">
                    {currentDayData?.formula}
                  </div>
                </div>

                {/* Section: Example Sentences */}
                <div className="mb-12">
                  <h3 className="text-[15px] font-bold text-[#143F5E] mb-3">Example Sentences</h3>
                  <ul className="list-disc list-inside text-[13px] text-gray-600 space-y-2.5 pl-1">
                    {currentDayData?.examples.map((ex, index) => (
                      <li key={index} className="italic text-gray-700">"{ex}"</li>
                    ))}
                  </ul>
                </div>

                {/* Tombol Pemicu Kuis */}
                <div className="flex justify-end">
                  <button 
                    onClick={handleFinishQuiz}
                    className="bg-[#2471A3] text-white text-[14px] font-semibold px-8 py-3 rounded-full hover:bg-[#1C5D86] transition-colors shadow-md cursor-pointer"
                  >
                    Start {TARGET_TEST_FROM_PROFILE} Quiz
                  </button>
                </div>
              </div>
            );
          })()}
        </main>
      )}

      {/* ================= GLOBAL FOOTER ================= */}
      <footer className="px-16 pt-14 pb-8 bg-[#EBF2F7] w-full">
        <div className="flex justify-between mb-10 max-w-6xl mx-auto">
          <div className="w-[30%]">
            <img src={l2} alt="Lateron" className="w-[90px] h-auto object-contain mb-4" />
            <p className="text-[13px] text-[#5A92B5] leading-relaxed">
              Helping learners achieve their language goals with personalized roadmaps and smarter preparation.
            </p>
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#143F5E] mb-4">Quick Links</p>
            {["Home", "About Us", "Roadmap", "Dashboard"].map((l) => (
              <button key={l} onClick={() => setViewMode("list")} className="block text-[13px] text-[#5A92B5] mb-2.5 hover:text-[#2471A3] bg-transparent p-0 border-none transition-colors cursor-pointer">{l}</button>
            ))}
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#143F5E] mb-4">Support</p>
            {["Language Test", "Progress Tracker", "Contact", "FAQ"].map((l) => (
              <Link key={l} to="/dashboard" className="block text-[13px] text-[#5A92B5] mb-2.5 hover:text-[#2471A3] transition-colors">{l}</Link>
            ))}
          </div>
        </div>
        <div className="border-t border-slate-300/40 pt-6">
          <p className="text-center text-[12px] text-[#5A92B5]">
            © 2026 Lateron. All Rights Reserved. Your Language Learning Partner.
          </p>
        </div>
      </footer>

    </div>
  );
}