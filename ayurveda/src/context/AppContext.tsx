"use client"

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react"
import { uid } from "../utils/uid"
import { foods as seedFoods, Food as FoodType } from "../data/foods"

// Types
interface User {
  name: string;
  username: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "M" | "F" | "Other";
  weight: number;
  habits: string;
  mealsPerDay: number;
  bowel: string;
  water: number;
  dosha: string;
}

interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  [key: string]: any;
}


interface Chart {
  id: string;
  patientId: string;
  date: string;
  meals: {
    breakfast: any[];
    lunch: any[];
    dinner: any[];
  };
  totals: any;
}

interface Appointment {
  id: string;
  patientId: string;
  date: string;
  time: string;
  purpose: string;
  [key: string]: any;
}

type Food = FoodType;

interface AppState {
  user: User | null;
  patients: Patient[];
  recipes: Recipe[];
  charts: Chart[];
  appointments: Appointment[];
  foods: Food[];
}

interface AppContextType extends AppState {
  // auth
  login: (username: string, password: string) => boolean;
  logout: () => void;

  // patients
  addPatient: (data: Omit<Patient, 'id'>) => void;
  updatePatient: (id: string, patch: Partial<Patient>) => void;
  deletePatient: (id: string) => void;

  // recipes
  addRecipe: (recipe: Omit<Recipe, 'id'>) => void;
  deleteRecipe: (id: string) => void;

  // charts
  addChart: (chart: Omit<Chart, 'id'>) => void;
  deleteChart: (id: string) => void;

  // appointments
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  deleteAppointment: (id: string) => void;

  // foods
  addFood: (food: Omit<Food, 'id'>) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppCtx = createContext<AppContextType | null>(null)

const LS_KEY = "ayurveda-app-state-v1"

const defaultState: AppState = {
  user: null,
  patients: [
    {
      id: "p1",
      name: "John Doe",
      age: 34,
      gender: "M",
      weight: 76,
      habits: "Vegetarian",
      mealsPerDay: 3,
      bowel: "Regular",
      water: 8,
      dosha: "Pitta",
    },
    {
      id: "p2",
      name: "Jane Doe",
      age: 28,
      gender: "F",
      weight: 58,
      habits: "Mixed",
      mealsPerDay: 4,
      bowel: "Occasional constipation",
      water: 6,
      dosha: "Vata",
    },
  ],
  recipes: [],
  charts: [], // {id, patientId, date, meals:{breakfast:[], lunch:[], dinner:[]}, totals}
  appointments: [],
  foods: seedFoods,
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(LS_KEY)
    return saved ? JSON.parse(saved) : defaultState
  })

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(state))
  }, [state])

  const api = useMemo(
    () => ({
      // auth
      login: (username: string, password: string): boolean => {
        if (username && password) setState((s) => ({ ...s, user: { name: "Dr. Smith", username } }))
        return !!(username && password)
      },
      logout: () => setState((s) => ({ ...s, user: null })),

      // patients
      addPatient: (data: Omit<Patient, 'id'>) => setState((s) => ({ ...s, patients: [...s.patients, { id: uid(), ...data }] })),
      updatePatient: (id: string, patch: Partial<Patient>) =>
        setState((s) => ({ ...s, patients: s.patients.map((p) => (p.id === id ? { ...p, ...patch } : p)) })),
      deletePatient: (id: string) => setState((s) => ({ ...s, patients: s.patients.filter((p) => p.id !== id) })),

      // recipes
      addRecipe: (r: Omit<Recipe, 'id'>) => setState((s) => ({ ...s, recipes: [...s.recipes, { id: uid(), ...r } as Recipe] })),
      deleteRecipe: (id: string) => setState((s) => ({ ...s, recipes: s.recipes.filter((r) => r.id !== id) })),

      // charts
      addChart: (c: Omit<Chart, 'id'>) => setState((s) => ({ ...s, charts: [...s.charts, { id: uid(), ...c } as Chart] })),
      deleteChart: (id: string) => setState((s) => ({ ...s, charts: s.charts.filter((c) => c.id !== id) })),

      // appointments
      addAppointment: (a: Omit<Appointment, 'id'>) => setState((s) => ({ ...s, appointments: [...s.appointments, { id: uid(), ...a } as Appointment] })),
      deleteAppointment: (id: string) => setState((s) => ({ ...s, appointments: s.appointments.filter((a) => a.id !== id) })),

      // foods
      addFood: (f: Omit<Food, 'id'>) => setState((s) => ({ ...s, foods: [...s.foods, { id: uid(), ...f } as Food] })),
    }),
    [],
  )

  const value = useMemo(() => ({ ...state, ...api }), [state, api])
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

export function useApp(): AppContextType {
  const context = useContext(AppCtx)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
