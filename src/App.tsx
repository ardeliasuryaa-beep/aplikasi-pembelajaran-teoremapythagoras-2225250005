import { useState } from "react";
import "./App.css";

type Page =
  | "home"
  | "pretest"
  | "materi"
  | "eksplorasi"
  | "latihan"
  | "kalkulator"
  | "game"
  | "posttest"
  | "refleksi";

type Question = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

const questions: Question[] = [
  {
    question:
      "Sebuah segitiga memiliki sisi 6 cm, 8 cm, dan 10 cm. Sisi manakah yang merupakan sisi miring?",
    options: ["6 cm", "8 cm", "10 cm", "Semua sisi"],
    answer: 2,
    explanation:
      "Sisi miring adalah sisi yang berhadapan dengan sudut 90° dan merupakan sisi terpanjang, yaitu 10 cm.",
  },
  {
    question:
      "Jika a = 6 dan b = 8 pada segitiga siku-siku, berapakah nilai c?",
    options: ["10", "12", "14", "16"],
    answer: 0,
    explanation: "6² + 8² = 36 + 64 = 100, sehingga c = √100 = 10.",
  },
  {
    question:
      "Manakah hubungan yang benar pada segitiga siku-siku?",
    options: ["a + b = c", "a² + b² = c²", "a² + c² = b²", "a + b + c = 90"],
    answer: 1,
    explanation:
      "Teorema Pythagoras menyatakan bahwa a² + b² = c².",
  },
  {
    question:
      "Sebuah taman berukuran panjang 12 m dan lebar 5 m. Berapa panjang diagonal taman?",
    options: ["13 m", "15 m", "17 m", "20 m"],
    answer: 0,
    explanation:
      "12² + 5² = 144 + 25 = 169, sehingga diagonal = √169 = 13 m.",
  },
  {
    question:
      "Seorang siswa mengatakan 6² + 8² = 14². Apa kesalahannya?",
    options: [
      "Salah menggunakan konsep kuadrat",
      "Tidak ada kesalahan",
      "Salah menentukan sudut",
      "Salah menggambar segitiga",
    ],
    answer: 0,
    explanation:
      "6² + 8² = 100, sedangkan 14² = 196. Kesalahannya adalah menganggap (a + b)² = a² + b².",
  },
];

function App() {
  const [name, setName] = useState(
    localStorage.getItem("geoline-name") || ""
  );
  const [started, setStarted] = useState(
    Boolean(localStorage.getItem("geoline-name"))
  );

  const [page, setPage] = useState<Page>("home");
  const [sound, setSound] = useState(true);

  const [pretestScore, setPretestScore] = useState<number | null>(null);
  const [posttestScore, setPosttestScore] = useState<number | null>(null);

  const [answer, setAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [exerciseScore, setExerciseScore] = useState(0);

  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [calcResult, setCalcResult] = useState("");

  const [gameStarted, setGameStarted] = useState(false);
  const [gameIndex, setGameIndex] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [gameAnswer, setGameAnswer] = useState<number | null>(null);

  const [reflection, setReflection] = useState("");

  const menu = [
    { id: "home", icon: "⌂", label: "Beranda" },
    { id: "pretest", icon: "◇", label: "Pre-Test" },
    { id: "materi", icon: "▤", label: "Materi Belajar" },
    { id: "eksplorasi", icon: "△", label: "Eksplorasi" },
    { id: "latihan", icon: "✎", label: "Latihan Soal" },
    { id: "kalkulator", icon: "＋", label: "Kalkulator" },
    { id: "game", icon: "✦", label: "Game Tantangan" },
    { id: "posttest", icon: "✓", label: "Post-Test" },
    { id: "refleksi", icon: "♡", label: "Refleksi" },
  ] as const;

  const startApp = () => {
    const clean = name.trim();

    if (!clean) return;

    localStorage.setItem("geoline-name", clean);
    setName(clean);
    setStarted(true);
  };

  const changeName = () => {
    localStorage.removeItem("geoline-name");
    setName("");
    setStarted(false);
    setPage("home");
  };

  const calculate = () => {
    const x = Number(a);
    const y = Number(b);

    if (!x || !y) {
      setCalcResult("Masukkan nilai a dan b terlebih dahulu.");
      return;
    }

    const result = Math.sqrt(x * x + y * y);

    setCalcResult(`c = ${Number(result.toFixed(2))}`);
  };

  const answerExercise = (index: number) => {
    setAnswer(index);
    setShowExplanation(true);

    if (index === questions[exerciseIndex].answer) {
      setExerciseScore((score) => score + 1);
    }
  };

  const nextExercise = () => {
    setAnswer(null);
    setShowExplanation(false);

    if (exerciseIndex < questions.length - 1) {
      setExerciseIndex((index) => index + 1);
    } else {
      setExerciseIndex(0);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setGameIndex(0);
    setGameScore(0);
    setGameAnswer(null);
  };

  const answerGame = (index: number) => {
    setGameAnswer(index);

    if (index === questions[gameIndex].answer) {
      setGameScore((score) => score + 10);
    }
  };

  const nextGame = () => {
    setGameAnswer(null);

    if (gameIndex < 4) {
      setGameIndex((index) => index + 1);
    } else {
      setGameStarted(false);
    }
  };

  const renderHome = () => (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">PERSONAL LEARNING SPACE</span>
          <h1>
            Selamat belajar, <span>{name}.</span>
          </h1>
          <p>
            Bangun pemahaman matematika melalui eksplorasi, pola, latihan,
            dan penalaran.
          </p>
        </div>

        <div className="profile">
          {name.charAt(0).toUpperCase()}
        </div>
      </div>

      <section className="hero">
        <div className="hero-text">
          <span className="eyebrow">GRADE VIII · RMT LEARNING PATH</span>

          <h2>
            Temukan hubungan
            <br />
            dalam Teorema Pythagoras.
          </h2>

          <p>
            Jangan hanya menghafal rumus. Amati, temukan pola, jelaskan
            alasanmu, lalu gunakan konsep untuk memecahkan masalah.
          </p>

          <button onClick={() => setPage("pretest")}>
            Mulai Perjalanan →
          </button>
        </div>

        <div className="hero-triangle">
          <svg viewBox="0 0 240 190">
            <polygon
              points="35,150 35,30 205,150"
              className="triangle-fill"
            />
            <line x1="35" y1="30" x2="35" y2="150" />
            <line x1="35" y1="150" x2="205" y2="150" />
            <line x1="35" y1="30" x2="205" y2="150" />

            <text x="15" y="95">
              a
            </text>
            <text x="115" y="173">
              b
            </text>
            <text x="120" y="78">
              c
            </text>
          </svg>
        </div>
      </section>

      <div className="rmt-path">
        <span className="eyebrow">RMT LEARNING PATH</span>

        <div className="path-grid">
          <div className="path-card">
            <b>01</b>
            <h3>Amati</h3>
            <p>Mengenali informasi, bentuk, ukuran, dan situasi.</p>
          </div>

          <div className="path-card">
            <b>02</b>
            <h3>Hubungkan</h3>
            <p>Mencari hubungan dan pola dari beberapa contoh.</p>
          </div>

          <div className="path-card">
            <b>03</b>
            <h3>Bangun Konsep</h3>
            <p>Menghubungkan pola dengan simbol dan rumus.</p>
          </div>

          <div className="path-card">
            <b>04</b>
            <h3>Terapkan</h3>
            <p>Menggunakan konsep dalam masalah baru.</p>
          </div>
        </div>
      </div>

      <div className="progress-card">
        <div>
          <span className="eyebrow">YOUR PROGRESS</span>
          <h3>Perjalanan belajarmu</h3>
          <p>
            {pretestScore !== null
              ? `Pre-Test: ${pretestScore}/5`
              : "Mulai dari Pre-Test untuk mengetahui kemampuan awalmu."}
          </p>
        </div>

        <strong>
          {posttestScore !== null
            ? `${Math.round((posttestScore / 5) * 100)}%`
            : "0%"}
        </strong>
      </div>
    </>
  );

  const renderPretest = () => (
    <LearningPage
      eyebrow="01 · INITIAL THINKING"
      title="Pre-Test"
      subtitle="Coba gunakan pengetahuan awalmu sebelum mempelajari konsep."
    >
      <div className="test-info">
        <b>Tujuan Pre-Test</b>
        <p>
          Tidak perlu takut salah. Jawabanmu digunakan untuk melihat
          pengetahuan awal sebelum pembelajaran.
        </p>
      </div>

      <QuestionBox
        question={questions[0]}
        answer={answer}
        onAnswer={(index) => {
          setAnswer(index);
          setShowExplanation(true);
        }}
        showExplanation={showExplanation}
      />

      {showExplanation && (
        <button
          className="primary-button"
          onClick={() => {
            setPretestScore(
              answer === questions[0].answer ? 1 : 0
            );
            setAnswer(null);
            setShowExplanation(false);
            setPage("materi");
          }}
        >
          Lanjut ke Materi →
        </button>
      )}
    </LearningPage>
  );

  const renderMateri = () => (
    <LearningPage
      eyebrow="02 · BUILD THE CONCEPT"
      title="Materi Teorema Pythagoras"
      subtitle="Bangun konsep dari bentuk, hubungan, pola, dan simbol."
    >
      <div className="concept-card">
        <span className="concept-number">01</span>
        <h2>Segitiga Siku-Siku</h2>

        <p>
          Segitiga siku-siku adalah segitiga yang memiliki satu sudut
          sebesar 90°.
        </p>

        <div className="large-triangle">
          <svg viewBox="0 0 500 300">
            <polygon
              points="80,240 80,50 420,240"
              className="triangle-fill"
            />

            <line x1="80" y1="50" x2="80" y2="240" />
            <line x1="80" y1="240" x2="420" y2="240" />
            <line x1="80" y1="50" x2="420" y2="240" />

            <text x="55" y="150">
              a
            </text>
            <text x="240" y="265">
              b
            </text>
            <text x="250" y="125">
              c
            </text>
          </svg>
        </div>
      </div>

      <div className="concept-grid">
        <div>
          <span>a</span>
          <h3>Sisi tegak</h3>
          <p>Salah satu sisi yang membentuk sudut siku-siku.</p>
        </div>

        <div>
          <span>b</span>
          <h3>Sisi alas</h3>
          <p>Sisi yang juga membentuk sudut 90°.</p>
        </div>

        <div>
          <span>c</span>
          <h3>Sisi miring</h3>
          <p>Sisi terpanjang dan berhadapan dengan sudut 90°.</p>
        </div>
      </div>

      <div className="discovery-card">
        <span className="eyebrow">TEMUKAN HUBUNGANNYA</span>

        <h2>
          3² + 4² = 5²
        </h2>

        <p>
          Coba perhatikan hubungan antara 3, 4, dan 5. Sekarang bandingkan
          dengan 6, 8, dan 10.
        </p>

        <div className="equations">
          <span>3² + 4² = 5²</span>
          <span>6² + 8² = 10²</span>
          <span>5² + 12² = 13²</span>
        </div>

        <button
          className="primary-button"
          onClick={() => setPage("eksplorasi")}
        >
          Temukan Polanya →
        </button>
      </div>
    </LearningPage>
  );

  const renderEksplorasi = () => (
    <LearningPage
      eyebrow="03 · EXPLORE RELATIONSHIPS"
      title="Eksplorasi & Temukan Pola"
      subtitle="Ubah panjang sisi dan amati bagaimana hubungan antar sisi berubah."
    >
      <div className="explorer">
        <div className="explorer-controls">
          <label>
            Nilai a
            <input
              type="number"
              min="1"
              value={a}
              onChange={(e) => setA(e.target.value)}
              placeholder="Contoh: 6"
            />
          </label>

          <label>
            Nilai b
            <input
              type="number"
              min="1"
              value={b}
              onChange={(e) => setB(e.target.value)}
              placeholder="Contoh: 8"
            />
          </label>
        </div>

        <div className="explorer-result">
          {a && b ? (
            <>
              <span>Hubungan yang terbentuk</span>
              <strong>
                {a}² + {b}² = c²
              </strong>

              <p>
                c = √({a}² + {b}²)
              </p>

              <button
                className="primary-button"
                onClick={() => {
                  const x = Number(a);
                  const y = Number(b);
                  const c = Math.sqrt(x * x + y * y);

                  setCalcResult(`Jika a = ${x} dan b = ${y}, maka c ≈ ${c.toFixed(2)}`);
                }}
              >
                Hitung dan Amati
              </button>

              {calcResult && (
                <div className="feedback">
                  {calcResult}
                </div>
              )}
            </>
          ) : (
            <strong>Masukkan nilai a dan b.</strong>
          )}
        </div>
      </div>

      <div className="pattern-card">
        <span className="eyebrow">AMATI POLANYA</span>

        <div className="pattern-table">
          <div>
            <b>a</b>
            <b>b</b>
            <b>c</b>
          </div>

          <div>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>

          <div>
            <span>6</span>
            <span>8</span>
            <span>10</span>
          </div>

          <div>
            <span>5</span>
            <span>12</span>
            <span>13</span>
          </div>
        </div>

        <h2>Apakah kamu menemukan hubungan yang sama?</h2>

        <p>
          Pada setiap contoh, kuadrat dua sisi yang membentuk sudut siku-siku
          memiliki hubungan dengan kuadrat sisi miring.
        </p>

        <div className="formula">
          a² + b² = c²
        </div>
      </div>
    </LearningPage>
  );

  const renderLatihan = () => {
    const current = questions[exerciseIndex];

    return (
      <LearningPage
        eyebrow="04 · PRACTICE & REASONING"
        title="Latihan Soal"
        subtitle="Tidak hanya mencari jawaban. Jelaskan bagaimana kamu berpikir."
      >
        <div className="exercise-progress">
          Soal {exerciseIndex + 1} dari {questions.length}
        </div>

        <QuestionBox
          question={current}
          answer={answer}
          onAnswer={answerExercise}
          showExplanation={showExplanation}
        />

        {showExplanation && (
          <>
            <div className="reasoning-box">
              <span className="eyebrow">JELASKAN CARAKU</span>

              <h3>
                Mengapa kamu memilih jawaban tersebut?
              </h3>

              <textarea
                placeholder="Tuliskan langkah atau alasanmu di sini..."
              />
            </div>

            <button
              className="primary-button"
              onClick={nextExercise}
            >
              {exerciseIndex === questions.length - 1
                ? "Ulangi Latihan"
                : "Soal Berikutnya →"}
            </button>
          </>
        )}

        <div className="score-mini">
          Skor latihan sementara: <strong>{exerciseScore}</strong>
        </div>
      </LearningPage>
    );
  };

  const renderCalculator = () => (
    <LearningPage
      eyebrow="05 · MATHEMATICAL TOOL"
      title="Kalkulator Pythagoras"
      subtitle="Gunakan alat bantu untuk mengecek perhitunganmu."
    >
      <div className="calculator">
        <div className="calc-title">
          <span>△</span>
          <h2>Cari sisi miring</h2>
        </div>

        <label>
          Sisi a
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="Masukkan a"
          />
        </label>

        <label>
          Sisi b
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder="Masukkan b"
          />
        </label>

        <button className="primary-button" onClick={calculate}>
          Hitung c
        </button>

        {calcResult && (
          <div className="calculator-result">
            <span>Hasil</span>
            <strong>{calcResult}</strong>
          </div>
        )}

        <div className="formula">
          c = √(a² + b²)
        </div>
      </div>
    </LearningPage>
  );

  const renderGame = () => {
    if (!gameStarted) {
      return (
        <LearningPage
          eyebrow="06 · PLAY & CHALLENGE"
          title="Tantangan Pythagoras"
          subtitle="Gunakan pemahamanmu untuk mengumpulkan XP."
        >
          <div className="game-start">
            <div className="game-icon">✦</div>

            <h2>Siap menerima tantangan?</h2>

            <p>
              Jawab 5 soal. Setiap jawaban benar memberikan 10 XP.
            </p>

            <button
              className="primary-button"
              onClick={startGame}
            >
              Mulai Permainan →
            </button>
          </div>
        </LearningPage>
      );
    }

    const current = questions[gameIndex];

    return (
      <LearningPage
        eyebrow={`CHALLENGE · ${gameIndex + 1}/5`}
        title="Tantangan Pythagoras"
        subtitle={`XP kamu: ${gameScore}`}
      >
        <QuestionBox
          question={current}
          answer={gameAnswer}
          onAnswer={answerGame}
          showExplanation={gameAnswer !== null}
        />

        {gameAnswer !== null && (
          <button
            className="primary-button"
            onClick={nextGame}
          >
            {gameIndex === 4
              ? `Selesai · ${gameScore} XP`
              : "Lanjut →"}
          </button>
        )}
      </LearningPage>
    );
  };

  const renderPosttest = () => (
    <LearningPage
      eyebrow="07 · FINAL ASSESSMENT"
      title="Post-Test"
      subtitle="Uji kembali pemahamanmu setelah menyelesaikan pembelajaran."
    >
      <QuestionBox
        question={questions[3]}
        answer={answer}
        onAnswer={(index) => {
          setAnswer(index);
          setShowExplanation(true);
        }}
        showExplanation={showExplanation}
      />

      {showExplanation && (
        <div>
          <div className="result-banner">
            {answer === questions[3].answer
              ? "Jawabanmu benar! Pemahamanmu semakin kuat."
              : "Belum tepat. Baca kembali pembahasannya dan coba lagi."}
          </div>

          <button
            className="primary-button"
            onClick={() => {
              setPosttestScore(
                answer === questions[3].answer ? 5 : 2
              );
              setPage("refleksi");
            }}
          >
            Lanjut ke Refleksi →
          </button>
        </div>
      )}
    </LearningPage>
  );

  const renderRefleksi = () => (
    <LearningPage
      eyebrow="08 · REFLECTION"
      title="Refleksi Belajar"
      subtitle="Pikirkan kembali bagaimana pemahamanmu terbentuk."
    >
      <div className="reflection-grid">
        <div className="reflection-card">
          <span>01</span>
          <h3>Apa yang kamu pahami?</h3>
          <p>
            Jelaskan dengan bahasamu sendiri apa yang dimaksud dengan
            Teorema Pythagoras.
          </p>
        </div>

        <div className="reflection-card">
          <span>02</span>
          <h3>Hubungan apa yang kamu temukan?</h3>
          <p>
            Jelaskan hubungan antara sisi a, b, dan c.
          </p>
        </div>

        <div className="reflection-card">
          <span>03</span>
          <h3>Bagaimana kamu mengetahui jawabanmu benar?</h3>
          <p>
            Jelaskan langkah atau alasan yang kamu gunakan.
          </p>
        </div>
      </div>

      <textarea
        className="reflection-input"
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder="Tuliskan refleksimu di sini..."
      />

      <button
        className="primary-button"
        onClick={() => alert("Refleksi tersimpan. Bagus!")}
      >
        Simpan Refleksi
      </button>

      <div className="final-card">
        <span className="eyebrow">YOUR LEARNING JOURNEY</span>
        <h2>Hebat, {name}!</h2>

        <p>
          Kamu sudah melalui proses mengamati, menemukan hubungan,
          membangun konsep, berlatih, dan menerapkan Teorema Pythagoras.
        </p>
      </div>
    </LearningPage>
  );

  const renderPage = () => {
    switch (page) {
      case "home":
        return renderHome();
      case "pretest":
        return renderPretest();
      case "materi":
        return renderMateri();
      case "eksplorasi":
        return renderEksplorasi();
      case "latihan":
        return renderLatihan();
      case "kalkulator":
        return renderCalculator();
      case "game":
        return renderGame();
      case "posttest":
        return renderPosttest();
      case "refleksi":
        return renderRefleksi();
    }
  };

  if (!started) {
    return (
      <main className="welcome-screen">
        <div className="welcome-card">
          <div className="brand-large">
            <span>△</span>
            <div>
              <strong>
                GEO<span>LINE</span>
              </strong>
              <small>MATHEMATICS LEARNING SPACE</small>
            </div>
          </div>

          <span className="eyebrow">WELCOME TO YOUR LEARNING SPACE</span>

          <h1>
            Belajar Pythagoras
            <br />
            dengan <span>cara berpikir.</span>
          </h1>

          <p>
            Eksplorasi konsep, temukan pola, jelaskan alasanmu, dan
            selesaikan masalah matematika.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              startApp();
            }}
          >
            <label>Nama panggilanmu</label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tulis namamu..."
              maxLength={24}
            />

            <button
              className="primary-button full"
              type="submit"
              disabled={!name.trim()}
            >
              Mulai Belajar →
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="app">
      <header className="topbar">
        <button
          className="logo"
          onClick={() => setPage("home")}
        >
          <span>△</span>

          <div>
            <strong>
              GEO<span>LINE</span>
            </strong>
            <small>MATHEMATICS LEARNING SPACE</small>
          </div>
        </button>

        <div className="top-actions">
          <button
            onClick={() => setSound(!sound)}
            className="sound-button"
          >
            {sound ? "♫" : "♪"}
          </button>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <div className="user-card">
            <div className="avatar">
              {name.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{name}</strong>
              <small>PELAJAR GEOLINE</small>
            </div>
          </div>

          <span className="side-title">LEARNING SPACE</span>

          <nav>
            {menu.map((item) => (
              <button
                key={item.id}
                className={
                  page === item.id
                    ? "side-link active"
                    : "side-link"
                }
                onClick={() => {
                  setPage(item.id);
                  setAnswer(null);
                  setShowExplanation(false);
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="side-footer">
            <span>YOUR LEARNING JOURNEY</span>

            <button onClick={changeName}>
              Ganti nama pengguna →
            </button>
          </div>
        </aside>

        <section className="content">{renderPage()}</section>
      </div>
    </main>
  );
}

function LearningPage({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="page-title">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      {children}
    </>
  );
}

function QuestionBox({
  question,
  answer,
  onAnswer,
  showExplanation,
}: {
  question: Question;
  answer: number | null;
  onAnswer: (index: number) => void;
  showExplanation: boolean;
}) {
  return (
    <div className="question-card">
      <span className="eyebrow">THINK & REASON</span>

      <h2>{question.question}</h2>

      <div className="options">
        {question.options.map((option, index) => {
          let className = "option";

          if (answer !== null) {
            if (index === question.answer) {
              className += " correct";
            } else if (index === answer) {
              className += " wrong";
            }
          }

          return (
            <button
              key={option}
              className={className}
              onClick={() => onAnswer(index)}
              disabled={answer !== null}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              {option}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className="explanation">
          <strong>Pembahasan</strong>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
}

export default App;