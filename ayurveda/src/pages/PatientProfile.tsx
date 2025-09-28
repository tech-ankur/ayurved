"use client"
import { useParams } from "react-router-dom"
import { useApp } from "../context/AppContext"

export default function PatientProfile() {
  const { id } = useParams()
  const { patients, updatePatient } = useApp()
  const p = patients.find((x) => x.id === id)

  if (!p) return <div className="subtle">Patient not found</div>

  function patch(field: string, value: any) {
    if (p) {
      updatePatient(p.id, { [field]: value })
    }
  }

  return (
    <>
      <div className="page-header">
        <h2 className="h1" style={{ margin: 0 }}>
          Patient Profile
        </h2>
        <div className="tag">
          <span className="badge-dot" style={{ background: "var(--brand)" }} /> {p.dosha} type
        </div>
      </div>

      <div className="grid cols-3">
        <div className="card" style={{ padding: "18px" }}>
          <h3 style={{ marginTop: 0 }}>{p.name}</h3>
          <div className="grid" style={{ gap: 10 }}>
            <label>
              Age
              <input className="input" value={p.age} onChange={(e) => patch("age", +e.target.value)} />
            </label>
            <label>
              Gender
              <select className="select" value={p.gender} onChange={(e) => patch("gender", e.target.value)}>
                <option>M</option>
                <option>F</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Weight (kg)
              <input className="input" value={p.weight} onChange={(e) => patch("weight", +e.target.value)} />
            </label>
            <label>
              Dietary Habits
              <input className="input" value={p.habits} onChange={(e) => patch("habits", e.target.value)} />
            </label>
            <label>
              Meal Frequency
              <input className="input" value={p.mealsPerDay} onChange={(e) => patch("mealsPerDay", +e.target.value)} />
            </label>
            <label>
              Bowel Movements
              <input className="input" value={p.bowel} onChange={(e) => patch("bowel", e.target.value)} />
            </label>
            <label>
              Water Intake (glasses)
              <input className="input" value={p.water} onChange={(e) => patch("water", +e.target.value)} />
            </label>
          </div>
        </div>

        <div className="card" style={{ padding: "18px" }}>
          <h3 style={{ marginTop: 0 }}>Ayurvedic Profile</h3>
          <div className="grid" style={{ gap: 8 }}>
            <label>
              Primary Dosha
              <select className="select" value={p.dosha} onChange={(e) => patch("dosha", e.target.value)}>
                <option>Vata</option>
                <option>Pitta</option>
                <option>Kapha</option>
              </select>
            </label>
            <div className="subtle">Recommendations auto-adjust in Diet Chart builder.</div>
          </div>
        </div>

        <div className="card" style={{ padding: "18px" }}>
          <h3 style={{ marginTop: 0 }}>Quick Actions</h3>
          <ul>
            <li>Create a new Diet Chart tailored to {p.dosha}.</li>
            <li>Attach recipes and print ready-to-share plan.</li>
            <li>Track water intake and bowel movement notes.</li>
          </ul>
        </div>
      </div>
    </>
  )
}
