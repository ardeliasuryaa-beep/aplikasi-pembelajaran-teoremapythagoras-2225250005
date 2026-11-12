
import { useState } from 'react'

type MateriProps = {
  onBack: () => void
}

const lessons = [
  {
    title: 'Mengenal Segitiga Siku-Siku',
    subtitle: 'Memahami bentuk dan ciri-cirinya',
    description:
      'Segitiga siku-siku adalah segitiga yang memiliki satu sudut sebesar 90°. Sudut siku-siku menjadi petunjuk penting untuk mengenali segitiga yang menggunakan Teorema Pythagoras.',
    fact: 'Jumlah ketiga sudut dalam setiap segitiga adalah 180°.',
  },
  {
    title: 'Mengenal Ketiga Sisi',
    subtitle: 'Alas, sisi tegak, dan sisi miring',
    description:
      'Segitiga siku-siku memiliki dua sisi yang membentuk sudut 90° dan satu sisi yang berada di hadapan sudut 90°.',
    fact: 'Sisi miring selalu berada di hadapan sudut siku-siku dan merupakan sisi terpanjang.',
  },
  {
    title: 'Memahami Rumus Pythagoras',
    subtitle: 'Hubungan kuadrat ketiga sisi',
    description:
      'Pada segitiga siku-siku, jumlah kuadrat panjang kedua sisi yang membentuk sudut siku-siku sama dengan kuadrat panjang sisi miring.',
    fact: 'Rumus: a² + b² = c², dengan c sebagai sisi miring.',
  },
  {
    title: 'Contoh Perhitungan',
    subtitle: 'Menyelesaikan soal secara bertahap',
    description:
      'Sebuah segitiga siku-siku memiliki panjang sisi tegak 3 cm dan alas 4 cm. Kita dapat menentukan sisi miring menggunakan Teorema Pythagoras.',
    fact: '3² + 4² = 9 + 16 = 25, sehingga sisi miringnya adalah 5 cm.',
  },
]

export default function Materi({ onBack }: MateriProps) {
  const [current, setCurrent] = useState(0)
  const [showExample, setShowExample] = useState(false)
  const [answer, setAnswer] = useState('')
  const [checked, setChecked] = useState(false)

  const lesson = lessons[current]
  const correct = answer === '5'

  const nextLesson = () => {
    setCurrent((value) => Math.min(value + 1, lessons.length - 1))
    setShowExample(false)
    setAnswer('')
    setChecked(false)
  }

  const previousLesson = () => {
    setCurrent((value) => Math.max(value - 1, 0))
    setShowExample(false)
    setAnswer('')
    setChecked(false)
  }

  return (
    <main className="materi-page">
      <div className="materi-top">
        <button className="materi-back" onClick={onBack}>
          ← Kembali ke beranda
        </button>
        <span className="materi-label">GEOLINE · GRADE VIII</span>
      </div>

      <header className="materi-heading">
        <span className="section-kicker">MATHEMATICS LEARNING MODULE</span>
        <h1>Teorema <span>Pythagoras</span></h1>
        <p>
          Pelajari hubungan sisi-sisi segitiga siku-siku melalui
          pengamatan, visualisasi, dan latihan.
        </p>
      </header>

      <div className="materi-progress">
        <div>
          <span>TAHAP PEMBELAJARAN</span>
          <strong>{current + 1} dari {lessons.length}</strong>
        </div>
        <div className="materi-progress-track">
          <span style={{ width: `${((current + 1) / lessons.length) * 100}%` }} />
        </div>
      </div>

      <div className="materi-layout">
        <aside className="materi-list">
          <span className="materi-list-title">DAFTAR MATERI</span>
          {lessons.map((item, index) => (
            <button
              key={item.title}
              onClick={() => {
                setCurrent(index)
                setShowExample(false)
                setAnswer('')
                setChecked(false)
              }}
              className={current === index ? 'materi-step active' : 'materi-step'}
            >
              <span className="step-number">{index + 1}</span>
              <span>{item.title}</span>
            </button>
          ))}
        </aside>

        <section className="materi-content">
          <div className="materi-content-heading">
            <span className="section-kicker">LESSON {String(current + 1).padStart(2, '0')}</span>
            <h2>{lesson.title}</h2>
            <p>{lesson.subtitle}</p>
          </div>

          <div className="triangle-visual">
            <svg viewBox="0 0 460 310" role="img" aria-label="Ilustrasi segitiga siku-siku dengan sudut 90 derajat">
              <defs>
                <linearGradient id="triangleFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e9dfee" />
                  <stop offset="100%" stopColor="#f5e8ef" />
                </linearGradient>
              </defs>
              <path d="M85 250 L85 45 L365 250 Z"
                fill="url(#triangleFill)" stroke="#82718f" strokeWidth="4" strokeLinejoin="round" />
              <path d="M85 222 L113 222 L113 250"
                fill="none" stroke="#b982a0" strokeWidth="3" />
              <circle cx="85" cy="45" r="5" fill="#82718f" />
              <circle cx="85" cy="250" r="5" fill="#82718f" />
              <circle cx="365" cy="250" r="5" fill="#82718f" />
              <text x="58" y="155" fill="#685879" fontSize="17" fontWeight="bold">a</text>
              <text x="222" y="279" fill="#685879" fontSize="17" fontWeight="bold">b</text>
              <text x="245" y="129" fill="#a47796" fontSize="17" fontWeight="bold">c</text>
              <text x="120" y="239" fill="#82718f" fontSize="12">90°</text>
            </svg>
            <span className="visual-caption">ILUSTRASI SEGITIGA SIKU-SIKU</span>
          </div>

          <article className="materi-explanation">
            <h3>Yuk, pahami konsepnya!</h3>
            <p>{lesson.description}</p>
            <div className="materi-fact">
              <span>✦</span>
              <p>{lesson.fact}</p>
            </div>
          </article>

          {current === 2 && (
            <div className="formula-card">
              <span>RUMUS TEOREMA PYTHAGORAS</span>
              <strong>a² + b² = c²</strong>
              <p>a dan b adalah sisi siku-siku, sedangkan c adalah sisi miring.</p>
            </div>
          )}

          {current === 3 && (
            <div className="example-section">
              <button
                className="example-toggle"
                onClick={() => setShowExample(!showExample)}
              >
                {showExample ? 'Sembunyikan langkah penyelesaian' : 'Lihat langkah penyelesaian'}
                <span>{showExample ? '−' : '+'}</span>
              </button>

              {showExample && (
                <div className="example-steps">
                  <p>1. Tuliskan rumus: c² = a² + b²</p>
                  <p>2. Masukkan nilai: c² = 3² + 4²</p>
                  <p>3. Hitung: c² = 9 + 16 = 25</p>
                  <p>4. Akar kuadrat: c = √25 = 5 cm</p>
                  <strong>Jadi, panjang sisi miring adalah 5 cm.</strong>
                </div>
              )}

              <div className="mini-exercise">
                <h3>Cek pemahamanmu</h3>
                <p>Jika sisi siku-sikunya 3 cm dan 4 cm, berapa sisi miringnya?</p>
                <div className="mini-answer">
                  <input
                    value={answer}
                    onChange={(event) => {
                      setAnswer(event.target.value.replace(/[^0-9.]/g, ''))
                      setChecked(false)
                    }}
                    placeholder="Jawaban dalam cm"
                    inputMode="decimal"
                  />
                  <button onClick={() => setChecked(true)} disabled={!answer.trim()}>
                    Periksa
                  </button>
                </div>
                {checked && (
                  <div className={correct ? 'answer-feedback correct' : 'answer-feedback incorrect'}>
                    {correct
                      ? '✓ Benar! Sisi miringnya adalah 5 cm. Hebat!'
                      : 'Belum tepat. Coba gunakan rumus c² = 3² + 4², lalu hitung akar kuadratnya.'}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="materi-navigation">
            <button onClick={previousLesson} disabled={current === 0}>
              ← Sebelumnya
            </button>
            {current < lessons.length - 1 ? (
              <button className="next-lesson" onClick={nextLesson}>
                Materi berikutnya →
              </button>
            ) : (
              <button className="next-lesson" onClick={onBack}>
                Selesai belajar ✓
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
