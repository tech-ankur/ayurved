"use client"

import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useApp } from "../context/AppContext"

interface PatientForm {
  name: string;
  age: string;
  gender: "M" | "F" | "Other";
  weight: string;
  habits: string;
  mealsPerDay: number;
  bowel: string;
  water: number;
  dosha: "Vata" | "Pitta" | "Kapha";
}

export default function Patients() {
  const { patients, addPatient, deletePatient } = useApp()
  const [q, setQ] = useState("")
  const [form, setForm] = useState<PatientForm>({
    name: "",
    age: "",
    gender: "M",
    weight: "",
    habits: "",
    mealsPerDay: 3,
    bowel: "",
    water: 8,
    dosha: "Vata",
  })

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    return t ? patients.filter((p) => p.name.toLowerCase().includes(t)) : patients
  }, [q, patients])

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!form.name) return
    addPatient({ 
      ...form, 
      age: +form.age, 
      weight: +form.weight, 
      mealsPerDay: +form.mealsPerDay, 
      water: +form.water 
    })
    setForm({
      name: "",
      age: "",
      gender: "M",
      weight: "",
      habits: "",
      mealsPerDay: 3,
      bowel: "",
      water: 8,
      dosha: "Vata",
    })
  }

  return (
    <>
      <div className="page-header">
        <h2 className="h1" style={{ margin: 0 }}>
          Patient Management
        </h2>
        <div className="subtle">Search and manage patient records.</div>
      </div>

      <div className="grid cols-2">
        <div className="card" style={{ padding: "18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
            <input
              className="input"
              placeholder="Search patients..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <span className="kbd">/</span>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <Link to={`/patients/${p.id}`}>{p.name}</Link>
                  </td>
                  <td>{p.age}</td>
                  <td>{p.gender}</td>
                  <td style={{ display: "flex", gap: 8 }}>
                    <Link className="button secondary" to={`/patients/${p.id}`}>
                      Profile
                    </Link>
                    <button className="button ghost" onClick={() => deletePatient(p.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!filtered.length && (
                <tr>
                  <td colSpan={4} className="subtle">
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="card" style={{ padding: "18px" }}>
          <h3 style={{ marginTop: 0 }}>Add Patient</h3>
          <form className="grid" style={{ gap: 12 }} onSubmit={submit}>
            <input
              className="input"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <div className="grid cols-2">
              <input
                className="input"
                placeholder="Age"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
              />
              <select
                className="select"
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value as "M" | "F" | "Other" })}
              >
                <option>M</option>
                <option>F</option>
                <option>Other</option>
              </select>
            </div>
            <div className="grid cols-2">
              <input
                className="input"
                placeholder="Weight (kg)"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
              />
              <input
                className="input"
                placeholder="Meals per day"
                value={form.mealsPerDay}
                onChange={(e) => setForm({ ...form, mealsPerDay: +e.target.value })}
              />
            </div>
            <input
              className="input"
              placeholder="Dietary habits"
              value={form.habits}
              onChange={(e) => setForm({ ...form, habits: e.target.value })}
            />
            <input
              className="input"
              placeholder="Bowel movements"
              value={form.bowel}
              onChange={(e) => setForm({ ...form, bowel: e.target.value })}
            />
            <div className="grid cols-2">
              <input
                className="input"
                placeholder="Water intake (glasses)"
                value={form.water}
                onChange={(e) => setForm({ ...form, water: +e.target.value })}
              />
              <select
                className="select"
                value={form.dosha}
                onChange={(e) => setForm({ ...form, dosha: e.target.value as "Vata" | "Pitta" | "Kapha" })}
              >
                <option>Vata</option>
                <option>Pitta</option>
                <option>Kapha</option>
              </select>
            </div>
            <button className="button">Save Patient</button>
          </form>
        </div>
      </div>
    </>
  )
}
