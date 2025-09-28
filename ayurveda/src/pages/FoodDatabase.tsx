"use client"

import { useMemo, useState } from "react"
import { useApp } from "../context/AppContext"

export default function FoodDatabase() {
  const { foods } = useApp()
  const [q, setQ] = useState("")
  const [filterDosha, setFD] = useState("any")

  const data = useMemo(() => {
    const t = q.trim().toLowerCase()
    return foods.filter((f) => {
      const okText = !t || f.name.toLowerCase().includes(t)
      const okDosha = filterDosha === "any" || f.dosha?.[filterDosha as keyof typeof f.dosha]?.includes("pacifies")
      return okText && okDosha
    })
  }, [foods, q, filterDosha])

  return (
    <>
      <div className="page-header">
        <h2 className="h1" style={{ margin: 0 }}>
          Food Database
        </h2>
        <div className="subtle">Search foods and view Ayurvedic properties.</div>
      </div>

      <div className="card" style={{ padding: "18px" }}>
        <div className="grid cols-3">
          <input className="input" placeholder="Search foods..." value={q} onChange={(e) => setQ(e.target.value)} />
          <select className="select" value={filterDosha} onChange={(e) => setFD(e.target.value)}>
            <option value="any">Any Dosha</option>
            <option value="vata">Pacifies Vata</option>
            <option value="pitta">Pacifies Pitta</option>
            <option value="kapha">Pacifies Kapha</option>
          </select>
          <div className="subtle">
            Showing {data.length} of {foods.length}
          </div>
        </div>
      </div>

      <div className="grid cols-3">
        {data.map((f) => (
          <div key={f.id} className="card" style={{ padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{f.name}</strong>
              <span className="tag">{f.virya}</span>
            </div>
            <div className="subtle" style={{ marginTop: 6 }}>
              {f.guna} • {f.rasa.join(", ")}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <span className="tag">Cals {f.calories}</span>
              <span className="tag">P {f.protein}g</span>
              <span className="tag">C {f.carbs}g</span>
              <span className="tag">F {f.fats}g</span>
            </div>
            <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
              <span className="tag">
                <span className="badge-dot" style={{ background: "#7aa8a4" }} /> Vata: {f.dosha.vata}
              </span>
              <span className="tag">
                <span className="badge-dot" style={{ background: "#eaa55a" }} /> Pitta: {f.dosha.pitta}
              </span>
              <span className="tag">
                <span className="badge-dot" style={{ background: "#8fcf9d" }} /> Kapha: {f.dosha.kapha}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
