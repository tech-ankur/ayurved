"use client"

import { useState } from "react"

interface Question {
  id: string;
  text: string;
  options: [string, string][];
}

interface Answers {
  [key: string]: string;
}

interface Score {
  [key: string]: number;
}

const qs: Question[] = [
  {
    id: "q1",
    text: "My body frame is:",
    options: [
      ["Light & thin", "Vata"],
      ["Medium & warm", "Pitta"],
      ["Solid & sturdy", "Kapha"],
    ],
  },
  {
    id: "q2",
    text: "My digestion is:",
    options: [
      ["Irregular", "Vata"],
      ["Strong but sensitive", "Pitta"],
      ["Slow but steady", "Kapha"],
    ],
  },
  {
    id: "q3",
    text: "My skin tends to be:",
    options: [
      ["Dry & rough", "Vata"],
      ["Warm & oily", "Pitta"],
      ["Smooth & moist", "Kapha"],
    ],
  },
  {
    id: "q4",
    text: "My mind is usually:",
    options: [
      ["Quick & restless", "Vata"],
      ["Focused & intense", "Pitta"],
      ["Calm & steady", "Kapha"],
    ],
  },
]

export default function DoshaQuiz() {
  const [answers, setAns] = useState<Answers>({})
  const score: Score = Object.values(answers).reduce((m, d) => ({ ...m, [d]: (m[d] || 0) + 1 }), {} as Score)
  const result = Object.entries(score).sort((a, b) => b[1] - a[1])[0]?.[0]

  return (
    <>
      <div className="page-header">
        <h2 className="h1" style={{ margin: 0 }}>
          Dosha Quiz
        </h2>
        <div className="subtle">A light, non-diagnostic guide to your tendencies.</div>
      </div>

      <div className="grid">
        {qs.map((q) => (
          <div key={q.id} className="card" style={{ padding: "16px" }}>
            <strong>{q.text}</strong>
            <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
              {q.options.map(([label, val]) => (
                <label key={label} className="tag" style={{ cursor: "pointer" }}>
                  <input
                    type="radio"
                    name={q.id}
                    checked={answers[q.id] === val}
                    onChange={() => setAns({ ...answers, [q.id]: val })}
                  />{" "}
                  {label}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: "16px" }}>
        <h3 style={{ marginTop: 0 }}>Result</h3>
        {result ? (
          <div>
            Your dominant dosha appears to be <strong>{result}</strong>.
          </div>
        ) : (
          <div className="subtle">Answer the questions to see your result.</div>
        )}
      </div>
    </>
  )
}
