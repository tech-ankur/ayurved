"use client"

import { useMemo, useState } from "react"
import { useApp } from "../context/AppContext"
import DonutChart from "../components/charts/DonutChart"

export default function Reports() {
  const { patients, charts } = useApp()
  const [pid, setPid] = useState(patients[0]?.id || "")
  const recent = useMemo(() => {
    const list = charts.filter((c) => c.patientId === pid).sort((a, b) => b.date.localeCompare(a.date))
    return list[0]
  }, [charts, pid])

  const data = recent
    ? [
        { label: "Protein", value: +recent.totals.protein.toFixed(1), color: "#17a673" },
        { label: "Carbs", value: +recent.totals.carbs.toFixed(1), color: "#0f766e" },
        { label: "Fats", value: +recent.totals.fats.toFixed(1), color: "#e07a1f" },
      ]
    : []

  const p = patients.find((x) => x.id === pid)

  return (
    <>
      <div className="page-header">
        <h2 className="h1" style={{ margin: 0 }}>
          Reports
        </h2>
        <div className="subtle">Select a patient to view the latest chart.</div>
      </div>

      <div className="card" style={{ padding: "16px" }}>
        <div className="grid cols-3">
          <label>
            Patient
            <select className="select" value={pid} onChange={(e) => setPid(e.target.value)}>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <div className="subtle">Latest chart date: {recent?.date || "—"}</div>
          <div className="subtle">Water Intake: {p?.water ?? "—"} glasses/day</div>
        </div>
      </div>

      <div className="grid cols-2">
        <div className="card" style={{ padding: "16px" }}>
          <h3 style={{ marginTop: 0 }}>Macro Distribution</h3>
          {recent ? (
            <DonutChart data={data} size={260} thickness={34} />
          ) : (
            <div className="subtle">No chart available for this patient.</div>
          )}
        </div>

        <div className="card" style={{ padding: "16px" }}>
          <h3 style={{ marginTop: 0 }}>Insights</h3>
          {recent ? (
            <ul>
              <li>Calories: {recent.totals.calories.toFixed(0)} kcal</li>
              <li>Protein ideal for {p?.dosha} if balanced with warming spices.</li>
              <li>Encourage {p?.water}+ glasses water and mindful eating.</li>
            </ul>
          ) : (
            <div className="subtle">Insights appear after you create a chart.</div>
          )}
        </div>
      </div>
    </>
  )
}
