"use client"
import { useNavigate } from "react-router-dom"
import { useApp } from "../../context/AppContext"

export default function Header() {
  const { logout, user } = useApp()
  const nav = useNavigate()

  return (
    <header className="page-header">
      <div>
        <h1 className="h1">Ayurvedic Diet Manager</h1>
        <div className="subtle">Holistic plans, modern insights.</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <input
          className="input"
          placeholder="Quick search (press /)"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "/") {
              e.preventDefault()
              e.currentTarget.focus()
            }
          }}
        />
        {user ? (
          <>
            <button className="button secondary" onClick={() => nav("/patients")}>
              Add Patient
            </button>
            <button className="button" onClick={() => nav("/diet-chart")}>
              Create Chart
            </button>
            <button
              className="button ghost"
              onClick={() => {
                logout()
                nav("/login")
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button className="button" onClick={() => nav("/login")}>
            Login
          </button>
        )}
      </div>
    </header>
  )
}
