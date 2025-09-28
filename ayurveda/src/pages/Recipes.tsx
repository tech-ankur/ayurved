"use client"

import { useMemo, useState } from "react"
import { useApp } from "../context/AppContext"
import { Food } from "../data/foods"

export default function Recipes() {
  const { foods, recipes, addRecipe, deleteRecipe } = useApp()
  const [name, setName] = useState("")
  const [items, setItems] = useState<Food[]>([]) // array of foods
  const [q, setQ] = useState("")

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    return foods.filter((f) => !t || f.name.toLowerCase().includes(t))
  }, [foods, q])

  const totals = useMemo(() => {
    return items.reduce(
      (s, f) => ({
        calories: s.calories + f.calories,
        protein: s.protein + f.protein,
        carbs: s.carbs + f.carbs,
        fats: s.fats + f.fats,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 },
    )
  }, [items])

  function add(f: Food) {
    setItems((arr) => [...arr, f])
  }
  function save() {
    if (!name) return
    addRecipe({ name, items, totals })
    setName("")
    setItems([])
  }

  return (
    <>
      <div className="page-header">
        <h2 className="h1" style={{ margin: 0 }}>
          Recipe Builder
        </h2>
        <div className="subtle">Sum nutrients and reuse in diet charts.</div>
      </div>

      <div className="grid cols-2">
        <div className="card" style={{ padding: "16px" }}>
          <h3 style={{ marginTop: 0 }}>Create Recipe</h3>
          <input className="input" placeholder="Recipe name" value={name} onChange={(e) => setName(e.target.value)} />
          <div style={{ height: 8 }} />
          <input className="input" placeholder="Search foods..." value={q} onChange={(e) => setQ(e.target.value)} />
          <div className="grid cols-2" style={{ marginTop: 12 }}>
            {filtered.map((f) => (
              <button key={f.id} className="card" style={{ padding: 12, textAlign: "left" }} onClick={() => add(f)}>
                <strong>{f.name}</strong>
                <div className="subtle">
                  C {f.calories} • P {f.protein} • C {f.carbs} • F {f.fats}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: "16px" }}>
          <h3 style={{ marginTop: 0 }}>Ingredients</h3>
          <ul style={{ margin: "8px 0", paddingLeft: 18 }}>
            {items.map((f, i) => (
              <li key={i}>{f.name}</li>
            ))}
          </ul>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="tag">Cals {totals.calories.toFixed(0)}</span>
            <span className="tag">P {totals.protein.toFixed(1)}</span>
            <span className="tag">C {totals.carbs.toFixed(1)}</span>
            <span className="tag">F {totals.fats.toFixed(1)}</span>
          </div>
          <button className="button" style={{ marginTop: 12 }} onClick={save}>
            Save Recipe
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: "16px" }}>
        <h3 style={{ marginTop: 0 }}>Saved Recipes</h3>
        <div className="grid cols-3">
          {recipes.map((r) => (
            <div key={r.id} className="card" style={{ padding: "12px" }}>
              <strong>{r.name}</strong>
              <div className="subtle">
                C {r.totals.calories.toFixed(0)} • P {r.totals.protein.toFixed(1)} • C {r.totals.carbs.toFixed(1)} • F{" "}
                {r.totals.fats.toFixed(1)}
              </div>
              <button className="button ghost" style={{ marginTop: 8 }} onClick={() => deleteRecipe(r.id)}>
                Delete
              </button>
            </div>
          ))}
          {!recipes.length && <div className="subtle">No recipes yet.</div>}
        </div>
      </div>
    </>
  )
}
