
import { useEffect, useState } from 'react'

type Page = 'home' | 'materi' | 'sisi' | 'kalkulator' | 'game' | 'refleksi'

const questions = [
  { q: 'Sebuah segitiga siku-siku memiliki sisi tegak 3 cm dan alas 4 cm. Berapa sisi miringnya?', options: ['5 cm', '6 cm', '7 cm', '8 cm'], answer: 0, explain: 'c = √(3² + 4²) = √25 = 5 cm.' },
  { q: 'Sisi miring pada segitiga siku-siku disebut juga ...', options: ['Alas', 'Hipotenusa', 'Tinggi', 'Median'], answer: 1, explain: 'Hipotenusa adalah sisi yang berhadapan dengan sudut siku-siku.' },
  { q: 'Jika sisi siku-siku adalah 6 cm dan 8 cm, sisi miringnya adalah ...', options: ['9 cm', '12 cm', '10 cm', '14 cm'], answer: 2, explain: 'c = √(36 + 64) = √100 = 10 cm.' },
  { q: 'Rumus Teorema Pythagoras yang benar adalah ...', options: ['a + b = c', 'a² + b² = c²', 'a² - b² = c²', 'a × b = c'], answer: 1, explain: 'Jumlah kuadrat kedua sisi siku-siku sama dengan kuadrat sisi miring.' },
  { q: 'Sisi miring sebuah segitiga 13 cm dan salah satu sisi siku-sikunya 5 cm. Sisi lainnya adalah ...', options: ['8 cm', '10 cm', '12 cm', '14 cm'], answer: 2, explain: 'b = √(13² - 5²) = √144 = 12 cm.' },
  { q: 'Segitiga siku-siku memiliki alas 9 cm dan tinggi 12 cm. Sisi miringnya adalah ...', options: ['13 cm', '15 cm', '18 cm', '21 cm'], answer: 1, explain: 'c = √(81 + 144) = √225 = 15 cm.' },
  { q: 'Sebuah tangga panjangnya 10 meter disandarkan pada tembok. Jarak kaki tangga dari tembok 6 meter. Tinggi yang dicapai adalah ...', options: ['4 m', '6 m', '8 m', '9 m'], answer: 2, explain: 'Tinggi = √(10² - 6²) = √64 = 8 meter.' },
  { q: 'Manakah kelompok panjang sisi yang membentuk segitiga siku-siku?', options: ['2, 3, 4', '5, 12, 13', '4, 5, 6', '3, 4, 6'], answer: 1, explain: '5² + 12² = 25 + 144 = 169 = 13².' },
  { q: 'Jika kedua sisi siku-siku masing-masing 5 cm dan 5 cm, sisi miringnya adalah ...', options: ['5√2 cm', '5 cm', '10 cm', '25 cm'], answer: 0, explain: 'c = √(25 + 25) = √50 = 5√2 cm.' },
  { q: 'Sebuah lapangan berbentuk persegi panjang berukuran 9 m × 12 m. Panjang diagonalnya adalah ...', options: ['13 m', '14 m', '15 m', '16 m'], answer: 2, explain: 'Diagonal = √(9² + 12²) = √225 = 15 meter.' },
]

const lessons = [
  {
    title: 'Mengenal Segitiga Siku-Siku',
    desc: 'Segitiga siku-siku adalah segitiga yang memiliki satu sudut sebesar 90 derajat.',
    fact: 'Jumlah seluruh sudut segitiga adalah 180 derajat.',
    formula: 'Sudut siku-siku = 90°',
  },
  {
    title: 'Mengenal Ketiga Sisi',
    desc: 'Segitiga siku-siku memiliki dua sisi yang membentuk sudut 90 derajat dan satu sisi yang berada di hadapan sudut tersebut.',
    fact: 'Sisi miring merupakan sisi terpanjang dalam segitiga siku-siku.',
    formula: 'Alas · Tinggi · Sisi miring',
  },
  {
    title: 'Rumus Pythagoras',
    desc: 'Jumlah kuadrat panjang kedua sisi siku-siku sama dengan kuadrat panjang sisi miring.',
    fact: 'Gunakan rumus ini hanya pada segitiga siku-siku.',
    formula: 'a² + b² = c²',
  },
  {
    title: 'Contoh Perhitungan',
    desc: 'Sebuah segitiga memiliki sisi siku-siku 3 cm dan 4 cm. Kita akan mencari panjang sisi miringnya.',
    fact: 'Hasil perhitungan adalah 5 cm.',
    formula: 'c = √(3² + 4²) = 5 cm',
  },
]

function App() {
  const [name, setName] = useState(() => localStorage.getItem('pythagoras-name') || '')
  const [nameInput, setNameInput] = useState('')
  const [page, setPage] = useState<Page>('home')
  const [sound, setSound] = useState(true)
  const [music, setMusic] = useState(false)

  const [completed, setCompleted] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('geoline-completed') || '[]')
    } catch {
      return []
    }
  })

  const [score, setScore] = useState(() => Number(localStorage.getItem('geoline-score') || 0))

  const [lesson, setLesson] = useState(0)
  const [lessonAnswer, setLessonAnswer] = useState('')
  const [lessonFeedback, setLessonFeedback] = useState('')

  const [sideAnswer, setSideAnswer] = useState('')
  const [sideFeedback, setSideFeedback] = useState('')

  const [calcMode, setCalcMode] = useState<'miring' | 'alas' | 'tinggi'>('miring')
  const [calcA, setCalcA] = useState('')
  const [calcB, setCalcB] = useState('')
  const [calcResult, setCalcResult] = useState<number | null>(null)
  const [calcError, setCalcError] = useState('')

  const [gameLength, setGameLength] = useState(5)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameIndex, setGameIndex] = useState(0)
  const [gameScore, setGameScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [gameFinished, setGameFinished] = useState(false)

  const [reflection, setReflection] = useState('')

  useEffect(() => {
    localStorage.setItem('pythagoras-name', name)
  }, [name])

  useEffect(() => {
    localStorage.setItem('geoline-completed', JSON.stringify(completed))
  }, [completed])

  useEffect(() => {
    localStorage.setItem('geoline-score', String(score))
  }, [score])

  // Audio effects
  const playSound = (type: 'tap' | 'correct' | 'wrong' | 'finish') => {
    if (!sound) return
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      const ctx = new AudioContextClass()
      const oscillator = ctx.createOscillator()
      const gain = ctx.createGain()

      const frequencies = {
        tap: 500,
        correct: 760,
        wrong: 220,
        finish: 920,
      }

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(frequencies[type], ctx.currentTime)
      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)

      oscillator.connect(gain)
      gain.connect(ctx.destination)
      oscillator.start()
      oscillator.stop(ctx.currentTime + 0.3)
      oscillator.onended = () => ctx.close()
    } catch {
      // Audio tidak tersedia pada browser ini.
    }
  }

  // Musik latar sintetis
  useEffect(() => {
    if (!music) return

    let ctx: AudioContext | null = null
    let oscillator: OscillatorNode | null = null
    let gain: GainNode | null = null

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      ctx = new AudioContextClass()
      oscillator = ctx.createOscillator()
      gain = ctx.createGain()

      oscillator.type = 'sine'
      oscillator.frequency.value = 174
      gain.gain.value = 0.012

      oscillator.connect(gain)
      gain.connect(ctx.destination)
      oscillator.start()
    } catch {
      // Audio tidak tersedia.
    }

    return () => {
      try {
        oscillator?.stop()
        void ctx?.close()
      } catch {
        // Abaikan jika audio sudah berhenti.
      }
    }
  }, [music])

  const navigate = (destination: Page) => {
    playSound('tap')
    setPage(destination)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const startApp = () => {
    if (!nameInput.trim()) return
    setName(nameInput.trim())
    navigate('home')
  }

  const markLesson = () => {
    setCompleted((old) => old.includes(lesson) ? old : [...old, lesson])
    setLessonFeedback('Materi berhasil ditandai selesai. Bagus!')
    playSound('correct')
  }

  const calculate = () => {
    const a = Number(calcA)
    const b = Number(calcB)

    setCalcError('')
    setCalcResult(null)

    if (!calcA.trim() || !calcB.trim() || !Number.isFinite(a) || !Number.isFinite(b) || a <= 0 || b <= 0) {
      setCalcError('Masukkan dua nilai positif yang valid.')
      return
    }

    let result = 0

    if (calcMode === 'miring') {
      result = Math.sqrt(a * a + b * b)
    } else if (calcMode === 'alas') {
      if (a <= b) {
        setCalcError('Sisi miring harus lebih panjang daripada sisi tegak.')
        return
      }
      result = Math.sqrt(a * a - b * b)
    } else {
      if (a <= b) {
        setCalcError('Sisi miring harus lebih panjang daripada sisi alas.')
        return
      }
      result = Math.sqrt(a * a - b * b)
    }

    setCalcResult(result)
    playSound('correct')
  }

  const startGame = () => {
    setGameStarted(true)
    setGameFinished(false)
    setGameIndex(0)
    setGameScore(0)
    setSelectedAnswer(null)
    playSound('tap')
  }

  const answerGame = (index: number) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(index)

    if (index === questions[gameIndex].answer) {
      setGameScore((old) => old + 20)
      playSound('correct')
    } else {
      playSound('wrong')
    }
  }

  const nextQuestion = () => {
    if (gameIndex + 1 >= gameLength) {
      setGameFinished(true)
      setScore((old) => old + gameScore)
      playSound('finish')
    } else {
      setGameIndex((old) => old + 1)
      setSelectedAnswer(null)
      playSound('tap')
    }
  }

  const progress = Math.round((completed.length / lessons.length) * 100)

  const menu: { id: Page; icon: string; title: string; description: string }[] = [
    { id: 'home', icon: '⌂', title: 'Beranda', description: 'Ruang belajarmu' },
    { id: 'materi', icon: '▤', title: 'Materi Belajar', description: 'Pelajari konsep Pythagoras' },
    { id: 'sisi', icon: '△', title: 'Mengenal Sisi', description: 'Eksplorasi sisi segitiga' },
    { id: 'kalkulator', icon: '＋', title: 'Kalkulator', description: 'Hitung panjang sisi' },
    { id: 'game', icon: '✧', title: 'Game Tantangan', description: 'Uji kemampuanmu' },
    { id: 'refleksi', icon: '♡', title: 'Refleksi', description: 'Evaluasi belajarmu' },
  ]

  if (!name) {
    return (
      <div className="geoline">
        <style>{styles}</style>
        <header className="header">
          <div className="brand"><span className="brand-icon">G</span><span>GEO<span className="accent">LINE</span></span></div>
        </header>
        <main className="welcome">
          <div className="welcome-card">
            <div className="welcome-symbol">△</div>
            <span className="eyebrow">MATHEMATICS LEARNING SPACE</span>
            <h1>Selamat datang di <span>GEOLINE.</span></h1>
            <p>Ruang belajar matematika yang mengajakmu memahami, mencoba, dan menemukan hal baru.</p>
            <form onSubmit={(e) => { e.preventDefault(); startApp() }}>
              <label htmlFor="student">SIAPA NAMAMU?</label>
              <input id="student" value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="Tulis nama panggilanmu..." maxLength={24} />
              <button className="primary" type="submit" disabled={!nameInput.trim()}>Mulai perjalanan →</button>
            </form>
            <small>GRADE VIII · TEOREMA PYTHAGORAS</small>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="geoline">
      <style>{styles}</style>

      <header className="header">
        <button className="brand" onClick={() => navigate('home')}>
          <span className="brand-icon">G</span>
          <span>GEO<span className="accent">LINE</span><small>MATHEMATICS LEARNING SPACE</small></span>
        </button>
        <div className="audio-controls">
          <button className={sound ? 'audio active' : 'audio'} onClick={() => setSound(!sound)} title="Efek suara">{sound ? '♫' : '♪'}</button>
          <button className={music ? 'audio active' : 'audio'} onClick={() => setMusic(!music)} title="Musik latar">{music ? '♪' : '♫'}</button>
        </div>
      </header>

      <div className="app-layout">
        <aside className="sidebar">
          <div className="student-profile">
            <div className="avatar">{name.charAt(0).toUpperCase()}</div>
            <div><strong>{name}</strong><small>PELAJAR GEOLINE</small></div>
          </div>
          <span className="side-caption">LEARNING SPACE</span>
          {menu.map((item) => (
            <button key={item.id} onClick={() => navigate(item.id)} className={page === item.id ? 'nav-link selected' : 'nav-link'}>
              <span>{item.icon}</span>{item.title}
            </button>
          ))}
          <div className="sidebar-bottom">
            <span>YOUR LEARNING JOURNEY</span>
            <button onClick={() => { localStorage.removeItem('pythagoras-name'); setName(''); setNameInput('') }}>Ganti nama pengguna ↗</button>
          </div>
        </aside>

        <main className="content">

          {page === 'home' && (
            <>
              <div className="page-heading">
                <div><span className="eyebrow">PERSONAL LEARNING DASHBOARD</span><h1>Halo, <span>{name}!</span></h1><p>Setiap langkah kecil membawamu lebih dekat pada pemahaman.</p></div>
                <div className="heading-avatar">{name.charAt(0).toUpperCase()}</div>
              </div>

              <section className="hero">
                <div className="hero-copy">
                  <span className="eyebrow">FEATURED LESSON · GRADE VIII</span>
                  <h2>Discover the<br />Pythagorean Theorem.</h2>
                  <p>Jelajahi hubungan ketiga sisi segitiga siku-siku melalui visualisasi dan aktivitas interaktif.</p>
                  <button className="primary" onClick={() => navigate('materi')}>Mulai pembelajaran →</button>
                </div>
                <div className="triangle-art">
                  <svg viewBox="0 0 240 210">
                    <path d="M35 175 L35 25 L215 175 Z" fill="#e6dbea" stroke="#82718f" strokeWidth="3" />
                    <path d="M35 155 L55 155 L55 175" fill="none" stroke="#b982a0" strokeWidth="3" />
                    <text x="16" y="105" fill="#625473" fontSize="14">a</text>
                    <text x="120" y="194" fill="#625473" fontSize="14">b</text>
                    <text x="135" y="90" fill="#a47796" fontSize="14">c</text>
                  </svg>
                  <span>EXPLORE GEOMETRY</span>
                </div>
              </section>

              <section className="progress-card">
                <div><span className="eyebrow">YOUR PROGRESS</span><h3>Perjalanan belajarmu</h3><p>{completed.length} dari 4 materi telah diselesaikan.</p></div>
                <strong>{progress}%</strong>
                <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
              </section>

              <div className="section-title"><div><span className="eyebrow">EXPLORE & LEARN</span><h2>Ruang Belajarmu</h2></div><span>06 MODULES</span></div>
              <div className="module-grid">
                {menu.filter((m) => m.id !== 'home').map((item, index) => (
                  <button className={`module-card card-${index}`} key={item.id} onClick={() => navigate(item.id)}>
                    <span className="module-icon">{item.icon}</span>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                    <span className="module-arrow">Jelajahi →</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {page === 'materi' && (
            <>
              <div className="page-heading"><div><span className="eyebrow">LEARNING MODULE · 01</span><h1>Materi <span>Pythagoras.</span></h1><p>Pelajari konsep melalui langkah-langkah sederhana.</p></div></div>
              <div className="lesson-tabs">
                {lessons.map((l, i) => <button className={lesson === i ? 'lesson-tab active' : 'lesson-tab'} onClick={() => { setLesson(i); setLessonFeedback(''); setLessonAnswer('') }} key={l.title}><span>{i + 1}</span>{l.title}</button>)}
              </div>
              <section className="lesson-card">
                <span className="eyebrow">TAHAP {lesson + 1} DARI 4</span>
                <h2>{lessons[lesson].title}</h2>
                <p>{lessons[lesson].desc}</p>
                <div className="diagram">
                  <svg viewBox="0 0 400 260">
                    <path d="M65 215 L65 30 L340 215 Z" fill="#eadfec" stroke="#82718f" strokeWidth="4" />
                    <path d="M65 190 L90 190 L90 215" fill="none" stroke="#b982a0" strokeWidth="3" />
                    <text x="45" y="125" fill="#625473" fontSize="18">a</text>
                    <text x="190" y="242" fill="#625473" fontSize="18">b</text>
                    <text x="225" y="115" fill="#a47796" fontSize="18">c</text>
                    <text x="95" y="205" fill="#82718f" fontSize="11">90°</text>
                  </svg>
                </div>
                <div className="fact"><strong>✦ Poin penting</strong><p>{lessons[lesson].fact}</p></div>
                <div className="formula"><span>KONSEP UTAMA</span><strong>{lessons[lesson].formula}</strong></div>
                {lesson === 3 && <div className="exercise"><h3>Latihan pemahaman</h3><p>Jika sisi siku-siku adalah 3 cm dan 4 cm, berapa sisi miringnya?</p><input value={lessonAnswer} onChange={(e) => setLessonAnswer(e.target.value)} placeholder="Masukkan jawaban (cm)" /><button onClick={() => { const ok = lessonAnswer.trim() === '5'; setLessonFeedback(ok ? 'Benar! Jawabannya 5 cm. Hebat!' : 'Belum tepat. Coba hitung √(3² + 4²).'); playSound(ok ? 'correct' : 'wrong') }}>Periksa jawaban</button><p>{lessonFeedback}</p></div>}
                <div className="lesson-footer">
                  <button disabled={lesson === 0} onClick={() => { setLesson(lesson - 1); setLessonFeedback('') }}>← Sebelumnya</button>
                  {lesson < 3 ? <button className="primary" onClick={() => { setLesson(lesson + 1); setLessonFeedback(''); setLessonAnswer('') }}>Berikutnya →</button> : <button className="primary" onClick={markLesson}>Tandai materi selesai ✓</button>}
                </div>
                {lessonFeedback && lesson === 3 && <p className="feedback">{lessonFeedback}</p>}
                {lessonFeedback && lessonFeedback.includes('Materi berhasil') && <p className="feedback">{lessonFeedback}</p>}
              </section>
            </>
          )}

          {page === 'sisi' && (
            <>
              <div className="page-heading"><div><span className="eyebrow">INTERACTIVE EXPLORATION · 02</span><h1>Mengenal <span>Sisi Segitiga.</span></h1><p>Sentuh bagian segitiga untuk mengenali setiap sisinya.</p></div></div>
              <section className="lesson-card">
                <h2>Bagian manakah yang ingin kamu kenali?</h2>
                <div className="side-diagram">
                  <svg viewBox="0 0 400 280">
                    <path d="M75 230 L75 30 L335 230 Z" fill="#eee6f1" stroke="#82718f" strokeWidth="4" />
                    <path d="M75 205 L100 205 L100 230" fill="none" stroke="#b982a0" strokeWidth="3" />
                    <text x="35" y="130" fill="#625473" fontSize="14">Tegak</text>
                    <text x="195" y="260" fill="#625473" fontSize="14">Alas</text>
                    <text x="225" y="100" fill="#a47796" fontSize="14">Miring</text>
                  </svg>
                </div>
                <div className="side-options">
                  {['Alas', 'Tegak', 'Miring'].map((item) => <button key={item} onClick={() => { setSideAnswer(item); setSideFeedback(item === 'Miring' ? 'Benar! Sisi miring berada di hadapan sudut siku-siku.' : item === 'Alas' ? 'Benar! Sisi alas adalah salah satu sisi yang membentuk sudut siku-siku.' : 'Benar! Sisi tegak adalah sisi yang membentuk sudut siku-siku bersama alas.'); playSound('correct') }}>{item}</button>)}
                </div>
                {sideAnswer && <div className="fact"><strong>✓ {sideAnswer}</strong><p>{sideFeedback}</p></div>}
                <p className="hint">Petunjuk: sudut siku-siku berada di pojok kiri bawah ilustrasi.</p>
              </section>
            </>
          )}

          {page === 'kalkulator' && (
            <>
              <div className="page-heading"><div><span className="eyebrow">MATHEMATICAL TOOL · 03</span><h1>Kalkulator <span>Pythagoras.</span></h1><p>Hitung panjang sisi segitiga dan pelajari langkahnya.</p></div></div>
              <section className="lesson-card calculator">
                <h2>Pilih sisi yang ingin dicari</h2>
                <div className="calc-tabs">
                  <button className={calcMode === 'miring' ? 'active' : ''} onClick={() => { setCalcMode('miring'); setCalcResult(null); setCalcError('') }}>Sisi miring (c)</button>
                  <button className={calcMode === 'alas' ? 'active' : ''} onClick={() => { setCalcMode('alas'); setCalcResult(null); setCalcError('') }}>Sisi alas (a)</button>
                  <button className={calcMode === 'tinggi' ? 'active' : ''} onClick={() => { setCalcMode('tinggi'); setCalcResult(null); setCalcError('') }}>Sisi tegak (b)</button>
                </div>
                <div className="calc-inputs">
                  <label>{calcMode === 'miring' ? 'Panjang sisi alas (a)' : 'Panjang sisi miring (c)'}<input type="number" min="0" value={calcA} onChange={(e) => { setCalcA(e.target.value); setCalcResult(null) }} placeholder="Contoh: 3" /></label>
                  <label>{calcMode === 'miring' ? 'Panjang sisi tegak (b)' : calcMode === 'alas' ? 'Panjang sisi tegak (b)' : 'Panjang sisi alas (a)'}<input type="number" min="0" value={calcB} onChange={(e) => { setCalcB(e.target.value); setCalcResult(null) }} placeholder="Contoh: 4" /></label>
                </div>
                <button className="primary calc-button" onClick={calculate}>Hitung sekarang →</button>
                <button className="secondary" onClick={() => { setCalcA(''); setCalcB(''); setCalcResult(null); setCalcError('') }}>Reset perhitungan</button>
                {calcError && <p className="error">{calcError}</p>}
                {calcResult !== null && <div className="calc-result"><span>HASIL PERHITUNGAN</span><strong>{calcResult.toFixed(2).replace(/\.?0+$/, '')} cm</strong><p>{calcMode === 'miring' ? `c = √(${calcA}² + ${calcB}²)` : `Sisi yang dicari = √(${calcA}² - ${calcB}²)`}</p><p>Hasil diperoleh dengan menggunakan Teorema Pythagoras.</p></div>}
              </section>
            </>
          )}

          {page === 'game' && (
            <>
              <div className="page-heading"><div><span className="eyebrow">PLAY & CHALLENGE · 04</span><h1>Tantangan <span>Pythagoras.</span></h1><p>Uji pemahamanmu dan kumpulkan poin!</p></div></div>
              {!gameStarted ? (
                <section className="lesson-card game-intro"><div className="game-symbol">✧</div><h2>Siap menerima tantangan?</h2><p>Jawab soal matematika, kumpulkan poin, dan baca pembahasan setiap jawaban.</p><div className="game-choice"><button className={gameLength === 5 ? 'active' : ''} onClick={() => setGameLength(5)}>5 Soal</button><button className={gameLength === 10 ? 'active' : ''} onClick={() => setGameLength(10)}>10 Soal</button></div><button className="primary" onClick={startGame}>Mulai permainan →</button></section>
              ) : gameFinished ? (
                <section className="lesson-card game-intro"><div className="game-symbol">🏆</div><span className="eyebrow">CHALLENGE COMPLETED</span><h2>Hebat, {name}!</h2><div className="final-score">{gameScore}<small> POIN</small></div><p>Kamu telah menyelesaikan {gameLength} soal tantangan.</p><button className="primary" onClick={() => { setGameStarted(false); setGameFinished(false) }}>Main lagi ↻</button><button className="secondary" onClick={() => navigate('refleksi')}>Lihat refleksi belajar</button></section>
              ) : (
                <section className="lesson-card">
                  <div className="game-status"><span>SOAL {gameIndex + 1} / {gameLength}</span><strong>{gameScore} POIN</strong></div>
                  <div className="progress-track"><span style={{ width: `${((gameIndex + 1) / gameLength) * 100}%` }} /></div>
                  <h2 className="question">{questions[gameIndex].q}</h2>
                  <div className="answer-options">{questions[gameIndex].options.map((option, i) => <button disabled={selectedAnswer !== null} className={selectedAnswer === i ? i === questions[gameIndex].answer ? 'right' : 'wrong' : selectedAnswer !== null && i === questions[gameIndex].answer ? 'right' : ''} onClick={() => answerGame(i)} key={option}>{String.fromCharCode(65 + i)}. {option}</button>)}</div>
                  {selectedAnswer !== null && <div className="fact"><strong>{selectedAnswer === questions[gameIndex].answer ? '✓ Jawaban benar!' : 'Belum tepat!'}</strong><p>{questions[gameIndex].explain}</p><button className="primary" onClick={nextQuestion}>{gameIndex + 1 === gameLength ? 'Lihat hasil →' : 'Soal berikutnya →'}</button></div>}
                </section>
              )}
            </>
          )}

          {page === 'refleksi' && (
            <>
              <div className="page-heading"><div><span className="eyebrow">LEARNING REFLECTION · 05</span><h1>Refleksi <span>Belajar.</span></h1><p>Lihat perjalanan dan perkembangan belajarmu.</p></div></div>
              <section className="stats-grid">
                <div className="stat-card"><span>MATERI SELESAI</span><strong>{completed.length}/4</strong></div>
                <div className="stat-card"><span>PROGRES BELAJAR</span><strong>{progress}%</strong></div>
                <div className="stat-card"><span>TOTAL POIN</span><strong>{score}</strong></div>
              </section>
              <section className="lesson-card">
                <h2>Perjalanan belajarmu</h2>
                <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
                {lessons.map((l, i) => <div className="reflection-item" key={l.title}><span>{completed.includes(i) ? '✓' : i + 1}</span><strong>{l.title}</strong><small>{completed.includes(i) ? 'Selesai' : 'Belum selesai'}</small></div>)}
                <div className="exercise"><h3>Bagaimana pengalaman belajarmu?</h3><p>Tuliskan hal yang sudah kamu pahami atau bagian yang masih membingungkan.</p><textarea value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="Tulis refleksimu di sini..." /><p>{reflection.length} karakter</p></div>
                <button className="primary" onClick={() => { localStorage.setItem('geoline-reflection', reflection); playSound('correct'); alert('Refleksimu berhasil disimpan!') }}>Simpan refleksi</button>
              </section>
            </>
          )}
        </main>
      </div>

      <footer className="footer"><strong>GEOLINE</strong> · MATHEMATICS · EXPLORATION · DISCOVERY</footer>
    </div>
  )
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&display=swap');

*{box-sizing:border-box}
body{margin:0;background:#f7f5f8;font-family:'Nunito',sans-serif;color:#42475d}
button,input,textarea{font:inherit}
button{cursor:pointer}
button:disabled{opacity:.5;cursor:not-allowed}
.geoline{min-height:100vh;background:#f8f7f8}
.header{height:76px;padding:0 clamp(18px,5vw,75px);display:flex;align-items:center;justify-content:space-between;background:#fffefd;border-bottom:1px solid #ebe5ed;position:sticky;top:0;z-index:20}
.brand{display:flex;align-items:center;gap:12px;border:0;background:none;color:#42475d;font:600 25px 'Fredoka',sans-serif;letter-spacing:1px;text-align:left}
.brand small{display:block;font:800 8px 'DM Sans',sans-serif;letter-spacing:1.5px;color:#9993a1}
.brand-icon{width:43px;height:43px;display:grid;place-items:center;background:#eee6f2;border:1px solid #e2d7e9;border-radius:14px;color:#82718f}
.accent{color:#a77e9c}
.audio-controls{display:flex;gap:10px}
.audio{width:40px;height:40px;border:1px solid #e9e2ec;border-radius:12px;background:white;color:#82718f}
.audio.active{background:#eee7f2}
.app-layout{max-width:1500px;margin:auto;padding:30px clamp(14px,4vw,55px);display:grid;grid-template-columns:225px minmax(0,1fr);gap:28px}
.sidebar{position:sticky;top:96px;height:calc(100vh - 120px);min-height:530px;padding:17px 13px;background:#fffefd;border:1px solid #ebe5ed;border-radius:17px;display:flex;flex-direction:column;gap:7px}
.student-profile{display:flex;align-items:center;gap:10px;padding:8px 5px 20px;border-bottom:1px solid #eee9ef;margin-bottom:9px}
.avatar,.heading-avatar{width:42px;height:42px;display:grid;place-items:center;border-radius:13px;background:#eee6f2;color:#82718f;font:600 21px 'Fredoka',sans-serif}
.student-profile strong,.student-profile small{display:block}
.student-profile strong{font-size:13px}
.student-profile small{font-size:8px;color:#a095a6;letter-spacing:1px;margin-top:4px}
.side-caption,.sidebar-bottom>span{font:800 8px 'DM Sans',sans-serif;color:#a095a6;letter-spacing:1.5px;padding:9px}
.nav-link{height:43px;display:flex;align-items:center;gap:12px;padding:0 11px;background:transparent;border:1px solid transparent;border-radius:10px;color:#777b89;text-align:left;font-size:12px;font-weight:800}
.nav-link>span{width:22px;text-align:center;font-size:19px;color:#82718f}
.nav-link:hover,.nav-link.selected{background:#eee7f2;color:#746282;border-color:#e9deed}
.sidebar-bottom{margin-top:auto;border-top:1px solid #eee9ef;padding-top:15px}
.sidebar-bottom button{display:block;margin:12px 8px 0;border:0;background:none;color:#82718f;font-size:10px}
.content{min-width:0;animation:appear .3s ease}
@keyframes appear{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.page-heading{display:flex;justify-content:space-between;align-items:center;margin:9px 0 25px}
.eyebrow{font:800 9px 'DM Sans',sans-serif;color:#a080a0;letter-spacing:1.8px}
.page-heading h1{font:600 clamp(29px,4vw,40px) 'Fredoka',sans-serif;margin:10px 0 5px;color:#42475d}
.page-heading h1 span{color:#a77e9c}
.page-heading p{font-size:12px;color:#90909a}
.heading-avatar{width:55px;height:55px;font-size:25px;border-radius:17px}
.hero{min-height:290px;padding:34px 37px;display:flex;align-items:center;justify-content:space-between;gap:15px;overflow:hidden;position:relative;border:1px solid #e4d9e9;border-radius:22px;background:radial-gradient(circle at 80% 35%,#e4d8ec,transparent 34%),linear-gradient(110deg,#f0e9f3,#f5edf2 60%,#eae2ef)}
.hero-copy{max-width:450px;position:relative;z-index:2}
.hero h2{font:600 clamp(29px,3.5vw,43px)/1.12 'Fredoka',sans-serif;margin:15px 0;color:#42475d}
.hero p{font-size:12px;line-height:1.9;color:#7f8290;max-width:380px}
.primary{min-height:43px;padding:0 20px;border:0;border-radius:10px;background:#82718f;color:white;font-weight:800;font-size:11px;transition:.2s}
.primary:hover{background:#6e5e80;transform:translateY(-2px)}
.triangle-art{width:240px;flex-shrink:0;padding:12px;background:#ffffff50;border:1px solid #ffffff80;border-radius:23px}
.triangle-art svg{width:100%}
.triangle-art>span{display:block;text-align:center;font:800 8px 'DM Sans';letter-spacing:1.5px;color:#95849d}
.progress-card{margin:20px 0 31px;padding:22px 24px;display:grid;grid-template-columns:1fr auto;gap:6px 15px;border:1px solid #ebe5ed;border-radius:16px;background:white}
.progress-card h3{margin:8px 0 4px;font:600 21px 'Fredoka'}
.progress-card p{margin:0;color:#96909c;font-size:11px}
.progress-card>strong{grid-column:2;grid-row:1/3;align-self:center;font:600 29px 'Fredoka';color:#82718f}
.progress-track{height:7px;grid-column:1/-1;margin-top:12px;background:#eee9f0;border-radius:20px;overflow:hidden}
.progress-track span{display:block;height:100%;background:linear-gradient(90deg,#a99ac0,#c99db8);border-radius:20px;transition:width .3s}
.section-title{display:flex;justify-content:space-between;align-items:end;margin-bottom:16px}
.section-title h2{font:600 25px 'Fredoka';margin:6px 0}
.section-title>span{font:800 8px 'DM Sans';color:#a095a6;letter-spacing:1.5px}
.module-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}
.module-card{min-height:165px;padding:18px;display:flex;flex-direction:column;align-items:flex-start;text-align:left;background:#fffefd;border:1px solid #ebe5ed;border-radius:15px;transition:.25s}
.module-card:hover{transform:translateY(-4px);border-color:#cbbbd5;box-shadow:0 12px 25px #66557012}
.module-icon{width:38px;height:38px;display:grid;place-items:center;background:#eee7f1;color:#82718f;border-radius:12px;font-size:20px;margin-bottom:12px}
.module-card strong{font-size:13px}
.module-card p{font-size:10px;color:#93919c}
.module-arrow{margin-top:auto;color:#82718f;font-size:10px;font-weight:800}
.card-1{background:#fbf5f8}.card-2{background:#f5f6f8}.card-3{background:#f7f0f5}
.lesson-tabs{display:flex;gap:8px;overflow-x:auto;margin-bottom:17px;padding-bottom:5px}
.lesson-tab{min-width:130px;padding:10px;border:1px solid #ebe5ed;border-radius:10px;background:white;color:#777b89;font-size:10px}
.lesson-tab span{display:inline-grid;place-items:center;width:22px;height:22px;margin-right:7px;border-radius:7px;background:#eee7f2;color:#82718f}
.lesson-tab.active{background:#eee7f2;border-color:#d9cce1;color:#746282;font-weight:800}
.lesson-card{padding:25px;background:white;border:1px solid #ebe5ed;border-radius:17px}
.lesson-card h2{font:600 25px 'Fredoka';color:#465064;margin:10px 0}
.lesson-card>p{font-size:12px;line-height:1.9;color:#777b89}
.diagram,.side-diagram{padding:15px;margin:18px 0;background:#faf8fb;border:1px solid #eee7f0;border-radius:13px;text-align:center}
.diagram svg,.side-diagram svg{width:min(100%,400px);max-height:270px}
.fact{padding:15px;margin:17px 0;background:#f1edf4;border-left:3px solid #a99ac0;border-radius:9px}
.fact strong{font-size:12px;color:#756287}
.fact p{font-size:11px;line-height:1.8;color:#655d70}
.formula{padding:20px;background:linear-gradient(120deg,#f1eaf3,#faf2f5);border:1px solid #e7dce9;border-radius:12px;text-align:center}
.formula span,.calc-result>span{display:block;font:800 9px 'DM Sans';letter-spacing:1.5px;color:#95839c}
.formula strong{display:block;margin:12px;font:600 35px 'Fredoka';color:#756287}
.exercise{padding:17px;margin:18px 0;background:#fbf8f5;border:1px solid #eee7e7;border-radius:12px}
.exercise h3{font:600 18px 'Fredoka';margin:4px 0}
.exercise p{font-size:11px;color:#858394;line-height:1.8}
.exercise input,.exercise textarea,.calc-inputs input{width:100%;padding:12px;border:1px solid #e6dfe7;border-radius:9px;background:white;color:#42475d;outline:none}
.exercise textarea{min-height:100px;resize:vertical}
.exercise button{margin-top:10px;padding:11px 15px;border:0;border-radius:9px;background:#82718f;color:white;font-weight:800;font-size:11px}
.lesson-footer{display:flex;justify-content:space-between;gap:10px;margin-top:23px;padding-top:17px;border-top:1px solid #eee8ef}
.lesson-footer>button:not(.primary),.secondary{padding:0 15px;min-height:42px;border:1px solid #e7dfe9;border-radius:9px;background:white;color:#82718f;font-size:10px;font-weight:800}
.feedback{color:#63876a;font-size:11px}
.side-options,.calc-tabs,.game-choice{display:flex;flex-wrap:wrap;gap:10px;margin:15px 0}
.side-options button,.calc-tabs button,.game-choice button{padding:12px 19px;border:1px solid #e7dfe9;border-radius:10px;background:white;color:#82718f;font-size:11px;font-weight:800}
.side-options button:hover,.calc-tabs button.active,.game-choice button.active{background:#eee7f2;border-color:#cdbed8}
.hint{font-size:10px;color:#a095a6}
.calculator .calc-tabs button{flex:1}
.calc-inputs{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:20px 0}
.calc-inputs label{display:flex;flex-direction:column;gap:8px;font-size:11px;color:#756287;font-weight:800}
.calc-button{display:block;width:100%;margin-bottom:10px}
.secondary{width:100%}
.calc-result{margin-top:20px;padding:22px;text-align:center;background:#f1edf4;border-radius:12px}
.calc-result strong{display:block;margin:10px;font:600 37px 'Fredoka';color:#756287}
.calc-result p{font-size:11px;color:#777b89}
.error{color:#a14f65;font-size:11px}
.game-intro{text-align:center;padding:35px}
.game-symbol{font-size:48px;color:#a77e9c;margin:10px}
.game-intro p{max-width:420px;margin:12px auto 20px}
.game-choice{justify-content:center}
.game-intro .primary{margin-top:10px}
.final-score{font:600 50px 'Fredoka';color:#82718f;margin:20px}
.final-score small{font-size:14px}
.game-status{display:flex;justify-content:space-between;font:800 10px 'DM Sans';color:#82718f}
.question{margin:25px 0;line-height:1.5}
.answer-options{display:grid;gap:10px}
.answer-options button{padding:15px;text-align:left;border:1px solid #e8e1e9;border-radius:10px;background:#fcfafc;color:#56566a;font-size:12px}
.answer-options button:hover{border-color:#bba8c8}
.answer-options button.right{background:#e8f3ea;border-color:#a3c5a9;color:#416b4b}
.answer-options button.wrong{background:#f8ebee;border-color:#dfb2bf;color:#92576b}
.answer-options button:disabled{cursor:default}
.answer-options+.fact button{margin-top:10px}
.stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:18px}
.stat-card{padding:20px;background:white;border:1px solid #ebe5ed;border-radius:13px}
.stat-card span{display:block;font:800 8px 'DM Sans';color:#a095a6;letter-spacing:1px}
.stat-card strong{display:block;margin-top:12px;font:600 29px 'Fredoka';color:#82718f}
.reflection-item{display:flex;align-items:center;gap:12px;padding:13px 0;border-bottom:1px solid #eee8ef}
.reflection-item>span{width:27px;height:27px;display:grid;place-items:center;background:#eee7f2;color:#82718f;border-radius:8px;font-weight:800}
.reflection-item strong{font-size:11px;flex:1}
.reflection-item small{font-size:9px;color:#999}
.footer{text-align:center;padding:19px;background:white;border-top:1px solid #eee9ef;color:#aaa2ad;font:800 8px 'DM Sans';letter-spacing:1.5px}
.footer strong{color:#82718f}
.welcome{min-height:calc(100vh - 76px);padding:25px;display:grid;place-items:center;background:radial-gradient(circle at 20% 20%,#eae1f0,transparent 30%),radial-gradient(circle at 85% 80%,#f0e2eb,transparent 27%),#f8f7f8}
.welcome-card{width:min(100%,510px);padding:45px 40px;text-align:center;background:#fffefd;border:1px solid #e9e1eb;border-radius:24px;box-shadow:0 25px 70px #63536c12}
.welcome-symbol{width:75px;height:75px;margin:0 auto 22px;display:grid;place-items:center;border-radius:22px;background:#eee6f2;color:#82718f;font-size:44px}
.welcome-card h1{font:600 36px 'Fredoka';color:#42475d}
.welcome-card h1 span{color:#a77e9c}
.welcome-card>p{font-size:12px;color:#858394;line-height:1.9}
.welcome-card form{text-align:left;display:grid;gap:12px;margin-top:25px}
.welcome-card label{font:800 9px 'DM Sans';letter-spacing:1.3px;color:#82718f}
.welcome-card input{height:49px;padding:0 14px;border:1px solid #e7dfe9;border-radius:10px;outline:none}
.welcome-card small{display:block;margin-top:23px;font:800 8px 'DM Sans';letter-spacing:1.4px;color:#aaa0ae}
@media(max-width:850px){.app-layout{grid-template-columns:190px minmax(0,1fr);gap:15px;padding:20px 13px}.hero{padding:25px}.triangle-art{width:200px}}
@media(max-width:620px){.header{height:65px;padding:0 14px}.brand{font-size:21px}.brand-icon{width:37px;height:37px}.app-layout{display:flex;flex-direction:column;padding:12px 12px 30px;gap:15px}.sidebar{position:sticky;top:65px;z-index:10;width:100%;height:auto;min-height:0;flex-direction:row;overflow-x:auto;padding:7px;gap:5px;scrollbar-width:none}.sidebar::-webkit-scrollbar{display:none}.student-profile,.side-caption,.sidebar-bottom{display:none}.nav-link{flex-shrink:0;height:39px;padding:0 10px;white-space:nowrap;font-size:10px}.nav-link>span{font-size:15px}.page-heading{margin:10px 0 19px}.page-heading h1{font-size:28px}.heading-avatar{width:43px;height:43px}.hero{min-height:230px;padding:19px 15px}.hero-copy{max-width:68%}.hero h2{font-size:25px}.hero p{font-size:10px}.hero .primary{padding:0 12px;font-size:10px}.triangle-art{width:32%;padding:5px}.triangle-art>span{font-size:6px}.module-grid{gap:9px}.module-card{padding:13px;min-height:155px}.module-card strong{font-size:11px}.module-card p{font-size:9px}.lesson-card{padding:17px}.lesson-card h2{font-size:21px}.calc-inputs{grid-template-columns:1fr}.calc-tabs button{flex:1;min-width:95px}.stats-grid{gap:7px}.stat-card{padding:12px}.stat-card span{font-size:7px}.stat-card strong{font-size:23px}.welcome-card{padding:34px 22px}.welcome-card h1{font-size:30px}.lesson-footer button{padding:0 10px;font-size:9px}}
@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important}}
`

export default App
