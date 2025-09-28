import { NavLink } from "react-router-dom"
import { useApp } from "../../context/AppContext"

interface ItemProps {
  to: string;
  label: string;
  emoji: string;
}

function Item({ to, label, emoji }: ItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => "card" + (isActive ? " active" : "")}
      style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}
    >
      <span style={{ fontSize: 18 }}>{emoji}</span>
      <span>{label}</span>
    </NavLink>
  )
}

export default function Sidebar() {
  const { user } = useApp()
  return (
    <aside style={{ padding: "24px", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="card" style={{ padding: "18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "linear-gradient(180deg, var(--brand), var(--brand-600))",
              display: "grid",
              placeItems: "center",
              fontWeight: 700,
            }}
          >
            🧑‍⚕️
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>{user ? `Hello, ${user.name}` : "AyurClinic"}</div>
            <div className="subtle">Ayurvedic Diet Manager</div>
          </div>
        </div>
      </div>

      <div style={{ height: 16 }} />
      <div className="grid">
        <Item to="/dashboard" label="Dashboard" emoji="🏠" />
        <Item to="/patients" label="Patients" emoji="🧑‍🤝‍🧑" />
        <Item to="/diet-chart" label="Diet Charts" emoji="🍽️" />
        <Item to="/food-db" label="Food DB" emoji="🍲" />
        <Item to="/recipes" label="Recipes" emoji="📘" />
        <Item to="/appointments" label="Appointments" emoji="🗓️" />
        <Item to="/reports" label="Reports" emoji="📊" />
        <Item to="/dosha-quiz" label="Dosha Quiz" emoji="🧭" />
        <Item to="/knowledge" label="Knowledge" emoji="📚" />
      </div>

      <div style={{ marginTop: 24 }} className="card">
        <img alt="Wireframe reference" src="/images/wireframe.png" style={{ borderRadius: "12px", width: "100%" }} />
      </div>
    </aside>
  )
}
