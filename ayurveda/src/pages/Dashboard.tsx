import { Link } from "react-router-dom"
import { useApp } from "../context/AppContext"

interface StatProps {
  label: string;
  value: number;
  emoji: string;
}

function Stat({ label, value, emoji }: StatProps) {
  return (
    <div className="card" style={{ padding: "18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div className="subtle">{label}</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
        </div>
        <div style={{ fontSize: 28 }}>{emoji}</div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { patients, charts, recipes, appointments } = useApp()
  return (
    <>
      <div className="page-header">
        <h2 className="h1" style={{ margin: 0 }}>
          Dashboard
        </h2>
        <div style={{ display: "flex", gap: 8 }}>
          <Link to="/patients" className="button">
            Add Patient
          </Link>
          <Link to="/diet-chart" className="button secondary">
            Create Diet Chart
          </Link>
        </div>
      </div>

      <div className="grid cols-4">
        <Stat label="Patients" value={patients.length} emoji="🧑‍🤝‍🧑" />
        <Stat label="Diet Charts" value={charts.length} emoji="🍽️" />
        <Stat label="Recipes" value={recipes.length} emoji="📘" />
        <Stat label="Appointments" value={appointments.length} emoji="🗓️" />
      </div>

      <div className="grid cols-2">
        <div className="card" style={{ padding: "18px" }}>
          <h3 style={{ marginTop: 0 }}>Quick Links</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <Link className="tag" to="/food-db">
              <span className="badge-dot" style={{ background: "var(--brand)" }} /> Food Database
            </Link>
            <Link className="tag" to="/recipes">
              <span className="badge-dot" style={{ background: "var(--accent)" }} /> Build Recipe
            </Link>
            <Link className="tag" to="/reports">
              <span className="badge-dot" style={{ background: "#17a673" }} /> Reports
            </Link>
            <Link className="tag" to="/dosha-quiz">
              <span className="badge-dot" style={{ background: "#e25656" }} /> Dosha Quiz
            </Link>
          </div>
        </div>

        <div className="card" style={{ padding: "18px" }}>
          <h3 style={{ marginTop: 0 }}>What's New</h3>
          <ul>
            <li>Interactive meal macros with instant Ayurvedic compatibility badges.</li>
            <li>Printable diet chart layout with clean typography.</li>
            <li>Appointments with patient linking and visit purpose.</li>
          </ul>
        </div>
      </div>
    </>
  )
}
