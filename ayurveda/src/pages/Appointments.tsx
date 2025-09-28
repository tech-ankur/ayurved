"use client"

import { useMemo, useState } from "react"
import { useApp } from "../context/AppContext"

interface AppointmentForm {
  patientId: string;
  date: string;
  purpose: string;
}

export default function Appointments() {
  const { patients, appointments, addAppointment, deleteAppointment } = useApp()
  const [form, setForm] = useState<AppointmentForm>({ 
    patientId: patients[0]?.id || "", 
    date: "", 
    purpose: "Consultation" 
  })
  const list = useMemo(() => appointments.slice().sort((a, b) => a.date.localeCompare(b.date)), [appointments])

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!form.date || !form.patientId) return
    addAppointment(form)
    setForm({ patientId: patients[0]?.id || "", date: "", purpose: "Consultation" })
  }

  return (
    <>
      <div className="page-header">
        <h2 className="h1" style={{ margin: 0 }}>
          Appointments
        </h2>
        <div className="subtle">Schedule and track patient visits.</div>
      </div>

      <div className="grid cols-2">
        <div className="card" style={{ padding: "16px" }}>
          <h3 style={{ marginTop: 0 }}>New Appointment</h3>
          <form className="grid" style={{ gap: 12 }} onSubmit={submit}>
            <label>
              Patient
              <select
                className="select"
                value={form.patientId}
                onChange={(e) => setForm({ ...form, patientId: e.target.value })}
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Date & Time
              <input
                className="input"
                type="datetime-local"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </label>
            <label>
              Purpose
              <input
                className="input"
                value={form.purpose}
                onChange={(e) => setForm({ ...form, purpose: e.target.value })}
              />
            </label>
            <button className="button">Add</button>
          </form>
        </div>

        <div className="card" style={{ padding: "16px" }}>
          <h3 style={{ marginTop: 0 }}>Upcoming</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Purpose</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {list.map((a) => {
                const p = patients.find((x) => x.id === a.patientId)
                return (
                  <tr key={a.id}>
                    <td>{p?.name || "—"}</td>
                    <td>{a.date.replace("T", " ")}</td>
                    <td>{a.purpose}</td>
                    <td>
                      <button className="button ghost" onClick={() => deleteAppointment(a.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
              {!list.length && (
                <tr>
                  <td colSpan={4} className="subtle">
                    No appointments
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
