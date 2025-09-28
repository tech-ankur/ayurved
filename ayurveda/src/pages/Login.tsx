"use client"

import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { useApp } from "../context/AppContext"

export default function Login() {
  const [username, setU] = useState("")
  const [password, setP] = useState("")
  const nav = useNavigate()
  const loc = useLocation()
  const { login } = useApp()

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (login(username, password)) {
      nav((loc.state as any)?.from?.pathname || "/dashboard")
    }
  }

  return (
    <div className="container" style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
      <div className="card" style={{ padding: "32px", width: "min(420px, 92vw)" }}>
        <div style={{ display: "grid", gap: 16 }}>
          <h2 style={{ margin: 0 }}>Login</h2>
          <div className="subtle">Welcome back, please sign in.</div>
          <form onSubmit={submit} className="grid" style={{ gap: 12 }}>
            <input className="input" placeholder="Username" value={username} onChange={(e) => setU(e.target.value)} />
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setP(e.target.value)}
            />
            <button className="button" type="submit">
              Login
            </button>
          </form>
          <div className="subtle">Tip: Use any username/password to continue.</div>
          <Link className="button secondary" to="/dosha-quiz">
            Try Dosha Quiz first
          </Link>
        </div>
      </div>
    </div>
  )
}
