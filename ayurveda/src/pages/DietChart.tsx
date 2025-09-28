"use client"

import { useMemo, useState } from "react"
import Modal from "../components/common/Modal"
import { useApp } from "../context/AppContext"
import { Food } from "../data/foods"

interface MealEditorProps {
  label: string;
  foods: Food[];
  onAdd: () => void;
  onRemove: (index: number) => void;
}

interface SelectedFoods {
  breakfast: Food[];
  lunch: Food[];
  dinner: Food[];
}

function MealEditor({ label, foods, onAdd, onRemove }: MealEditorProps) {
  const total = foods.reduce(
    (s, f) => ({
      calories: s.calories + f.calories,
      protein: s.protein + f.protein,
      carbs: s.carbs + f.carbs,
      fats: s.fats + f.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 },
  )

  return (
    <div className="card" style={{ padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h4 style={{ margin: 0 }}>{label}</h4>
        <div style={{ display: "flex", gap: 8 }}>
          <span className="tag">Cals {total.calories.toFixed(0)}</span>
          <span className="tag">P {total.protein.toFixed(1)}</span>
          <span className="tag">C {total.carbs.toFixed(1)}</span>
          <span className="tag">F {total.fats.toFixed(1)}</span>
        </div>
      </div>
      <ul style={{ margin: "10px 0", paddingLeft: 18 }}>
        {foods.map((f, i) => (
          <li key={i} style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
            <span>{f.name}</span>
            <button className="button ghost" onClick={() => onRemove(i)}>
              Remove
            </button>
          </li>
        ))}
        {!foods.length && <div className="subtle">No food added yet.</div>}
      </ul>
      <button className="button secondary" onClick={onAdd}>
        Add Food
      </button>
    </div>
  )
}

export default function DietChart() {
  const { patients, foods, addChart } = useApp()
  const [patientId, setPid] = useState(patients[0]?.id || "")
  const [open, setOpen] = useState(false)
  const [mealKey, setMealKey] = useState<keyof SelectedFoods>("breakfast")
  const [selectedFoods, setSel] = useState<SelectedFoods>({ breakfast: [], lunch: [], dinner: [] })
  const [search, setSearch] = useState("")

  const list = useMemo(() => {
    const t = search.trim().toLowerCase()
    return foods.filter((f) => !t || f.name.toLowerCase().includes(t))
  }, [foods, search])

  function openAdd(key: keyof SelectedFoods) {
    setMealKey(key)
    setOpen(true)
  }
  function addFoodToMeal(f: Food) {
    setSel((s) => ({ ...s, [mealKey]: [...s[mealKey], f] }))
  }
  function removeFood(key: keyof SelectedFoods, index: number) {
    setSel((s) => ({ ...s, [key]: s[key].filter((_, i) => i !== index) }))
  }

  const totals = useMemo(() => {
    const flat = [...selectedFoods.breakfast, ...selectedFoods.lunch, ...selectedFoods.dinner]
    return flat.reduce(
      (s, f) => ({
        calories: s.calories + f.calories,
        protein: s.protein + f.protein,
        carbs: s.carbs + f.carbs,
        fats: s.fats + f.fats,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 },
    )
  }, [selectedFoods])

  function save() {
    if (!patientId) return
    addChart({
      patientId,
      date: new Date().toISOString().slice(0, 10),
      meals: selectedFoods,
      totals,
    })
    setSel({ breakfast: [], lunch: [], dinner: [] })
    alert("Diet chart saved!")
  }

  return (
    <>
      <div className="page-header">
        <h2 className="h1" style={{ margin: 0 }}>
          Diet Chart Generator
        </h2>
        <div className="subtle">Balanced by macros and Ayurvedic alignment.</div>
      </div>

      <div className="grid cols-3">
        <div className="card" style={{ padding: "16px" }}>
          <label>
            Patient
            <select className="select" value={patientId} onChange={(e) => setPid(e.target.value)}>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
            <span className="tag">Total Calories: {totals.calories.toFixed(0)}</span>
            <span className="tag">Protein: {totals.protein.toFixed(1)} g</span>
            <span className="tag">Carbs: {totals.carbs.toFixed(1)} g</span>
            <span className="tag">Fats: {totals.fats.toFixed(1)} g</span>
          </div>
          <button className="button" style={{ marginTop: 12 }} onClick={save}>
            Save Chart
          </button>
        </div>

        <MealEditor
          label="Breakfast"
          foods={selectedFoods.breakfast}
          onAdd={() => openAdd("breakfast")}
          onRemove={(i) => removeFood("breakfast", i)}
        />
        <MealEditor
          label="Lunch"
          foods={selectedFoods.lunch}
          onAdd={() => openAdd("lunch")}
          onRemove={(i) => removeFood("lunch", i)}
        />
        <MealEditor
          label="Dinner"
          foods={selectedFoods.dinner}
          onAdd={() => openAdd("dinner")}
          onRemove={(i) => removeFood("dinner", i)}
        />
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={`Add Food to ${mealKey}`}>
        <div className="grid" style={{ gap: 12 }}>
          <input
            className="input"
            placeholder="Search foods..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="grid cols-3">
            {list.map((f) => (
              <button
                key={f.id}
                className="card"
                style={{ padding: "12px", textAlign: "left" }}
                onClick={() => addFoodToMeal(f)}
              >
                <strong>{f.name}</strong>
                <div className="subtle" style={{ marginTop: 4 }}>
                  C {f.calories} • P {f.protein} • C {f.carbs} • F {f.fats}
                </div>
                <div style={{ marginTop: 6, display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {f.rasa.slice(0, 3).map((r: string, i: number) => (
                    <span key={i} className="tag">
                      {r}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </>
  )
}
