
import { useState } from "react";
import "./App.css";

type Page =
  | "beranda"
  | "materi"
  | "sisi"
  | "latihan"
  | "tutor"
  | "kalkulator"
  | "refleksi";

type ChatMessage = {
  role: "user" | "tutor";
  text: string;
};

function App() {
  const [page, setPage] = useState<Page>("beranda");
  const [userName, setUserName] = useState("Pelajar");

  // KALKULATOR
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const x = Number(a);
    const y = Number(b);

    if (
      !a ||
      !b ||
      !Number.isFinite(x) ||
      !Number.isFinite(y) ||
      x <= 0 ||
      y <= 0
    ) {
      setResult(null);
      return;
    }

    setResult(Number(Math.sqrt(x * x + y * y).toFixed(2)));
  };

  // TUTOR PINTAR
  const [question, setQuestion] = useState("");
  const [thinking, setThinking] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "tutor",
      text:
        "Halo! Selamat datang di Tutor Pintar GEOLINE! 🌸\n\n" +
        "Aku siap menemanimu belajar Teorema Pythagoras. " +
        "Kamu bebas bertanya menggunakan bahasamu sendiri. " +
        "Apa yang ingin kamu pahami hari ini?"
    }
  ]);

  const answerQuestion = (raw: string): string => {
    const q = raw.toLowerCase()
      .replace(/[?!.,]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const has = (...words: string[]) =>
      words.some(word => q.includes(word));

    const topics = [
      "pythagoras", "segitiga", "sisi", "miring",
      "hipotenusa", "rumus", "kuadrat", "akar",
      "siku", "derajat", "cm", "meter", "panjang",
      "luas", "keliling", "hitung", "contoh", "soal",
      "matematika", "persegi", "diagonal", "bilangan",
      "jarak", "a2", "b2", "c2", "6", "8", "5",
      "10", "12", "13", "15", "sudut"
    ];

    const relevant = topics.some(word => q.includes(word));

    if (has("halo", "hai", "assalamualaikum")) {
      return "Halo juga! 🌷 Senang bertemu denganmu. Ada yang ingin kamu tanyakan tentang Teorema Pythagoras?";
    }

    if (has("terima kasih", "makasih", "thanks")) {
      return "Sama-sama! 💗 Tetap semangat belajar ya. Ingat, memahami proses berpikir jauh lebih penting daripada sekadar mendapatkan jawaban.";
    }

    if (!relevant) {
      return "Maaf ya! 🌸 Tutor Pintar GEOLINE khusus membantu kamu mempelajari Teorema Pythagoras. Kamu bisa bertanya tentang segitiga siku-siku, sisi miring, rumus, cara menghitung, dan contoh soal. Yuk, kita kembali belajar matematika!";
    }

    if (has("apa itu", "pengertian", "definisi", "maksud")) {
      return (
        "Teorema Pythagoras adalah aturan matematika yang menjelaskan hubungan antara panjang ketiga sisi segitiga siku-siku.\n\n" +
        "Rumusnya adalah:\n\n" +
        "a² + b² = c²\n\n" +
        "Keterangan:\n" +
        "• a dan b adalah sisi siku-siku.\n" +
        "• c adalah sisi miring.\n\n" +
        "Coba pikirkan, mengapa teorema ini digunakan pada segitiga siku-siku?"
      );
    }

    if (has("sisi miring", "hipotenusa", "sisi terpanjang")) {
      return (
        "Sisi miring disebut juga hipotenusa. Sisi ini berada tepat di depan sudut 90° dan merupakan sisi terpanjang pada segitiga siku-siku.\n\n" +
        "Coba perhatikan sebuah segitiga. Menurutmu, bagaimana cara menemukan sisi miring jika posisi gambarnya diputar?"
      );
    }

    if (has("sisi a", "sisi b", "sisi siku", "membedakan sisi")) {
      return (
        "Sisi a dan b merupakan dua sisi yang membentuk sudut 90°. Sementara itu, sisi c adalah sisi miring yang berada di depan sudut 90°.\n\n" +
        "Ingat, nama a dan b dapat saling bertukar, tetapi c tetap merupakan sisi miring.\n\n" +
        "Sekarang, bisakah kamu menjelaskan bagaimana cara menemukan sudut 90°?"
      );
    }

    if (has("rumus", "a2", "b2", "c2")) {
      return (
        "Rumus utama Teorema Pythagoras adalah:\n\n" +
        "a² + b² = c²\n\n" +
        "Keterangan:\n" +
        "• a = sisi siku-siku pertama.\n" +
        "• b = sisi siku-siku kedua.\n" +
        "• c = sisi miring.\n\n" +
        "Jika mencari sisi miring, jumlahkan kuadrat kedua sisi siku-siku, kemudian akarkan hasilnya."
      );
    }

    if (has("6") && has("8")) {
      return (
        "Yuk, kita kerjakan bersama! 🌷\n\n" +
        "Diketahui:\n" +
        "a = 6 cm\n" +
        "b = 8 cm\n\n" +
        "Gunakan rumus:\n" +
        "c² = 6² + 8²\n" +
        "c² = 36 + 64\n\n" +
        "Sekarang coba hitung hasil penjumlahannya. Berapa hasil 36 + 64?"
      );
    }

    if (has("akar", "akar kuadrat", "sqrt")) {
      return (
        "Akar kuadrat merupakan operasi kebalikan dari menguadratkan bilangan.\n\n" +
        "Contohnya:\n" +
        "√25 = 5 karena 5 × 5 = 25.\n\n" +
        "Dalam Teorema Pythagoras, akar digunakan untuk memperoleh panjang sisi dari nilai kuadratnya.\n\n" +
        "Coba sebutkan bilangan lain yang akar kuadratnya merupakan bilangan bulat!"
      );
    }

    if (has("sudut", "90 derajat", "siku-siku")) {
      return (
        "Sudut siku-siku adalah sudut yang besarnya tepat 90°.\n\n" +
        "Pada segitiga siku-siku, dua sisi membentuk sudut 90°. Sisi yang berada di depan sudut tersebut adalah sisi miring.\n\n" +
        "Jika segitiga diputar, apakah besar sudut 90° akan berubah?"
      );
    }

    if (has("luas", "persegi")) {
      return (
        "Teorema Pythagoras juga dapat dipahami melalui luas persegi yang dibangun pada ketiga sisi segitiga siku-siku.\n\n" +
        "Luas persegi pada sisi a ditambah luas persegi pada sisi b sama dengan luas persegi pada sisi c.\n\n" +
        "Hubungannya dinyatakan dengan a² + b² = c²."
      );
    }

    if (has("bingung", "sulit", "susah", "tidak paham", "gak paham", "nggak ngerti")) {
      return (
        "Tidak apa-apa, kita belajar pelan-pelan! 💗\n\n" +
        "Mulai dari konsep sederhana dahulu. Segitiga siku-siku memiliki satu sudut sebesar 90°.\n\n" +
        "Coba jawab: apakah kamu sudah bisa membedakan dua sisi yang membentuk sudut 90° dengan sisi yang berada di depannya?"
      );
    }

    if (has("contoh", "soal")) {
      return (
        "Yuk, coba soal berikut!\n\n" +
        "Sebuah segitiga siku-siku mempunyai panjang sisi 5 cm dan 12 cm. Tentukan panjang sisi miringnya.\n\n" +
        "Petunjuk:\n" +
        "c² = 5² + 12²\n\n" +
        "Coba hitung kuadrat kedua sisi terlebih dahulu!"
      );
    }

    if (has("mencari", "menghitung", "bagaimana", "cara", "langkah")) {
      return (
        "Mari kita selesaikan secara bertahap! 🌸\n\n" +
        "1. Perhatikan informasi pada soal.\n" +
        "2. Tentukan sudut 90°.\n" +
        "3. Kenali sisi yang sudah diketahui.\n" +
        "4. Tentukan sisi yang ingin dicari.\n" +
        "5. Gunakan rumus yang sesuai.\n" +
        "6. Periksa kembali hasil perhitungan.\n\n" +
        "Sekarang, informasi apa yang sudah diketahui dari soalmu?"
      );
    }

    return (
      "Pertanyaan menarik! 🌷\n\n" +
      "Mari kita hubungkan pertanyaanmu dengan Teorema Pythagoras.\n\n" +
      "Apakah kamu sedang membahas pengertian, rumus, sisi segitiga, atau perhitungan panjang sisi? Ceritakan sedikit lagi agar aku bisa membimbingmu."
    );
  };

  const askTutor = () => {
    const text = question.trim();

    if (!text || thinking) return;

    setMessages(prev => [
      ...prev,
      { role: "user", text }
    ]);

    setQuestion("");
    setThinking(true);

    window.setTimeout(() => {
      const response = answerQuestion(text);

      setMessages(prev => [
        ...prev,
        { role: "tutor", text: response }
      ]);

      setThinking(false);
    }, 500);
  };

  const clearChat = () => {
    setMessages([
      {
        role: "tutor",
        text: "Halo! Mari mulai percakapan baru. Apa yang ingin kamu pelajari tentang Teorema Pythagoras?"
      }
    ]);
  };

  const menu: [Page, string, string][] = [
    ["beranda", "⌂", "Beranda"],
    ["materi", "▤", "Materi Belajar"],
    ["sisi", "△", "Mengenal Sisi"],
    ["latihan", "✓", "Latihan"],
    ["tutor", "✦", "Tutor Pintar"],
    ["kalkulator", "＋", "Kalkulator"],
    ["refleksi", "♡", "Refleksi"]
  ];

  return (
    <div className="geoline-app">

      {/* HEADER */}
      <header className="geoline-header">
        <div className="brand">
          <div className="brand-icon">G</div>
          <div>
            <h1>GEOLINE</h1>
            <p>MATHEMATICS LEARNING SPACE</p>
          </div>
        </div>
      </header>

      {/* LAYOUT */}
      <div className="geoline-layout">

        {/* SIDEBAR */}
        <aside className="sidebar">

          <div className="profile-card">
            <div className="profile-icon">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <strong>{userName}</strong>
              <small>PELAJAR GEOLINE</small>
            </div>
          </div>

          <div className="sidebar-title">
            LEARNING SPACE
          </div>

          <nav>
            {menu.map(([id, icon, label]) => (
              <button
                key={id}
                className={page === id ? "nav-item active" : "nav-item"}
                onClick={() => setPage(id)}
              >
                <span>{icon}</span>
                {label}
              </button>
            ))}
          </nav>

          <div className="journey">
            <div className="sidebar-title">
              YOUR LEARNING JOURNEY
            </div>
            <input
              value={userName}
              onChange={e => setUserName(e.target.value || "Pelajar")}
              placeholder="Nama pengguna"
            />
          </div>

        </aside>

        {/* MAIN CONTENT */}
        <main className="main-content">

          {/* BERANDA */}
          {page === "beranda" && (
            <section>
              <div className="eyebrow">WELCOME TO GEOLINE</div>

              <h2>
                Belajar Teorema
                <span> Pythagoras</span>
                dengan cara yang bermakna.
              </h2>

              <p className="lead">
                Eksplorasi konsep, pahami hubungan sisi segitiga siku-siku,
                coba berbagai strategi, lalu jelaskan alasanmu.
              </p>

              <div className="home-grid">

                <div className="learning-card">
                  <div className="card-icon">△</div>
                  <h3>Mulai dari konsep</h3>
                  <p>
                    Kenali segitiga siku-siku, sisi siku-siku,
                    dan sisi miring sebelum menggunakan rumus.
                  </p>
                  <button onClick={() => setPage("materi")}>
                    Pelajari materi →
                  </button>
                </div>

                <div className="learning-card">
                  <div className="card-icon">?</div>
                  <h3>Coba dan jelaskan</h3>
                  <p>
                    Kerjakan masalah matematika dan pikirkan
                    mengapa strategi tersebut dapat digunakan.
                  </p>
                  <button onClick={() => setPage("latihan")}>
                    Mulai latihan →
                  </button>
                </div>

                <div className="learning-card">
                  <div className="card-icon">✦</div>
                  <h3>Tutor Pintar</h3>
                  <p>
                    Tanyakan materi Pythagoras menggunakan
                    bahasamu sendiri.
                  </p>
                  <button onClick={() => setPage("tutor")}>
                    Tanya tutor →
                  </button>
                </div>

              </div>

              <div className="rmt-box">
                <div className="rmt-label">
                  RIGOROUS MATHEMATICAL THINKING
                </div>
                <h3>
                  Bukan hanya mendapatkan jawaban,
                  <span> tetapi memahami alasannya.</span>
                </h3>
                <p>
                  Dalam GEOLINE, kamu diajak memahami konsep,
                  menggunakan strategi, memeriksa hasil,
                  dan menjelaskan alasan dari penyelesaianmu.
                </p>
              </div>
            </section>
          )}

          {/* MATERI */}
          {page === "materi" && (
            <section>
              <div className="eyebrow">LEARN · 01</div>
              <h2>
                Mengenal Teorema <span>Pythagoras</span>
              </h2>

              <div className="material-card">
                <h3>Segitiga siku-siku</h3>
                <p>
                  Segitiga siku-siku adalah segitiga
                  yang memiliki satu sudut sebesar 90°.
                </p>

                <div className="triangle">
                  <div className="triangle-shape">
                    <span className="side-a">a</span>
                    <span className="side-b">b</span>
                    <span className="side-c">c</span>
                    <span className="angle">90°</span>
                  </div>
                </div>

                <div className="point-box">
                  <strong>✦ Poin penting</strong>
                  <p>
                    Sisi yang berada di depan sudut 90°
                    disebut sisi miring atau hipotenusa.
                  </p>
                </div>
              </div>

              <div className="formula-box">
                <small>KONSEP UTAMA</small>
                <strong>a² + b² = c²</strong>
                <p>
                  Jika dua sisi siku-siku diketahui,
                  panjang sisi miring dapat dicari
                  dengan Teorema Pythagoras.
                </p>
              </div>
            </section>
          )}

          {/* MENGENAL SISI */}
          {page === "sisi" && (
            <section>
              <div className="eyebrow">EXPLORE · 02</div>
              <h2>Mengenal <span>Sisi Segitiga</span></h2>

              <p className="lead">
                Perhatikan posisi sudut 90° sebelum menentukan
                nama setiap sisi.
              </p>

              <div className="side-grid">

                <div className="side-card">
                  <div className="big-letter">a</div>
                  <h3>Sisi siku-siku</h3>
                  <p>
                    Sisi yang membentuk sudut 90°
                    dengan sisi siku-siku lainnya.
                  </p>
                </div>

                <div className="side-card">
                  <div className="big-letter">b</div>
                  <h3>Sisi siku-siku</h3>
                  <p>
                    Sisi yang membentuk sudut 90°
                    dengan sisi siku-siku lainnya.
                  </p>
                </div>

                <div className="side-card highlighted">
                  <div className="big-letter">c</div>
                  <h3>Hipotenusa</h3>
                  <p>
                    Sisi terpanjang yang berada tepat
                    di depan sudut 90°.
                  </p>
                </div>

              </div>

              <div className="thinking-box">
                <strong>💭 Coba pikirkan</strong>
                <p>
                  Jika posisi segitiga diputar, apakah nama sisi
                  miring tetap ditentukan berdasarkan posisi gambar
                  atau berdasarkan sudut 90°?
                </p>
              </div>
            </section>
          )}

          {/* LATIHAN */}
          {page === "latihan" && (
            <section>
              <div className="eyebrow">PRACTICE · 03</div>
              <h2>Latihan <span>Matematika</span></h2>

              <p className="lead">
                Jangan hanya mencari hasil.
                Pikirkan strategi yang kamu gunakan.
              </p>

              <div className="question-card">
                <div className="question-number">SOAL 01</div>

                <h3>
                  Sebuah segitiga siku-siku memiliki
                  sisi siku-siku 6 cm dan 8 cm.
                  Berapa panjang sisi miringnya?
                </h3>

                <div className="answer-options">
                  <button onClick={() => setPage("tutor")}>A. 9 cm</button>
                  <button onClick={() => setPage("tutor")}>B. 10 cm</button>
                  <button onClick={() => setPage("tutor")}>C. 12 cm</button>
                  <button onClick={() => setPage("tutor")}>D. 14 cm</button>
                </div>

                <div className="hint">
                  💡 Petunjuk: gunakan hubungan a² + b² = c².
                </div>
              </div>

              <div className="thinking-box">
                <strong>✦ Jelaskan strategimu</strong>
                <p>
                  Setelah mendapatkan jawaban, coba jelaskan
                  langkah perhitunganmu dengan kata-katamu sendiri.
                </p>
                <textarea
                  rows={5}
                  placeholder="Tuliskan cara berpikirmu di sini..."
                />
              </div>
            </section>
          )}

          {/* TUTOR PINTAR */}
          {page === "tutor" && (
            <section>
              <div className="eyebrow">SMART TUTOR · 04</div>
              <h2>Tutor Pintar <span>GEOLINE</span></h2>

              <p className="lead">
                Bebas bertanya menggunakan bahasamu sendiri.
                Tutor akan membantumu memahami Teorema Pythagoras.
              </p>

              <div className="ai-tutor-card">

                <div className="ai-header">
                  <div className="ai-avatar">✦</div>
                  <div>
                    <h3>Tutor Pintar GEOLINE</h3>
                    <p>Pendamping belajar Teorema Pythagoras</p>
                  </div>
                  <button
                    onClick={clearChat}
                    className="music-mute"
                    aria-label="Mulai percakapan baru"
                  >
                    ↻
                  </button>
                </div>

                <div className="ai-guidance">
                  <strong>💡 Ayo belajar bersama!</strong>
                  <p>
                    Ketik pertanyaanmu sendiri.
                    Kamu juga boleh bertanya jika masih bingung.
                  </p>
                </div>

                <div className="chat-messages">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={
                        message.role === "user"
                          ? "chat-user"
                          : "chat-tutor"
                      }
                    >
                      <strong>
                        {message.role === "user"
                          ? userName
                          : "✦ Tutor GEOLINE"}
                      </strong>
                      <p>{message.text}</p>
                    </div>
                  ))}

                  {thinking && (
                    <div className="chat-tutor">
                      <strong>✦ Tutor GEOLINE</strong>
                      <p>Sedang menyiapkan petunjuk...</p>
                    </div>
                  )}
                </div>

                <label className="ai-label">
                  Pertanyaanmu
                </label>

                <textarea
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      askTutor();
                    }
                  }}
                  placeholder="Contoh: Kak, bagaimana cara mencari sisi miring?"
                  rows={3}
                />

                <button
                  className="ai-ask-button"
                  onClick={askTutor}
                  disabled={thinking || !question.trim()}
                >
                  {thinking
                    ? "Tutor sedang berpikir..."
                    : "✦ Kirim pertanyaan"}
                </button>

                <div className="rmt-box ai-rmt">
                  <div className="rmt-label">RMT APPROACH</div>
                  <h3>Belajar melalui proses berpikir.</h3>
                  <p>
                    Tutor memberikan pertanyaan pemantik dan petunjuk
                    agar siswa memahami konsep, menyusun strategi,
                    melakukan perhitungan, dan mengevaluasi jawaban.
                  </p>
                </div>

              </div>
            </section>
          )}

          {/* KALKULATOR */}
          {page === "kalkulator" && (
            <section>
              <div className="eyebrow">TOOLS · 05</div>
              <h2>Kalkulator <span>Pythagoras</span></h2>

              <p className="lead">
                Masukkan dua sisi siku-siku untuk mencari sisi miring.
              </p>

              <div className="calculator-card">
                <label>
                  Panjang sisi a
                  <input
                    type="number"
                    min="0"
                    value={a}
                    onChange={e => setA(e.target.value)}
                    placeholder="Contoh: 6"
                  />
                </label>

                <label>
                  Panjang sisi b
                  <input
                    type="number"
                    min="0"
                    value={b}
                    onChange={e => setB(e.target.value)}
                    placeholder="Contoh: 8"
                  />
                </label>

                <button
                  className="calculate-button"
                  onClick={calculate}
                >
                  Hitung sisi miring
                </button>

                {result !== null && (
                  <div className="result-box">
                    <small>HASIL PERHITUNGAN</small>
                    <strong>c = {result}</strong>
                    <p>c = √(a² + b²)</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* REFLEKSI */}
          {page === "refleksi" && (
            <section>
              <div className="eyebrow">REFLECTION · 06</div>
              <h2>Refleksi <span>Belajarmu</span></h2>

              <p className="lead">
                Pikirkan kembali apa yang sudah kamu pahami.
              </p>

              <div className="reflection-grid">

                <div className="reflection-card">
                  <strong>01</strong>
                  <h3>Apa yang sudah kupahami?</h3>
                  <textarea rows={6} placeholder="Tuliskan pemahamanmu..." />
                </div>

                <div className="reflection-card">
                  <strong>02</strong>
                  <h3>Bagian mana yang masih sulit?</h3>
                  <textarea
                    rows={6}
                    placeholder="Tuliskan bagian yang masih membingungkan..."
                  />
                </div>

                <div className="reflection-card">
                  <strong>03</strong>
                  <h3>Strategi apa yang membantuku?</h3>
                  <textarea
                    rows={6}
                    placeholder="Tuliskan strategi yang kamu gunakan..."
                  />
                </div>

              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  );
}

export default App;
